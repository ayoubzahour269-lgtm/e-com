// Adaptateur kie.ai — agrégateur (~343 modèles). API exacte issue de docs/HANDOFF.md.
// NB proxy : le fetch natif de Node n'honore HTTPS_PROXY qu'avec NODE_USE_ENV_PROXY=1
// (Node ≥ 22.21). Le runner de génération l'exporte avant d'appeler ces méthodes.
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import type {
  GenProvider,
  GenResult,
  ImageGenRequest,
  VideoGenRequest,
} from "./provider.js";
import { estimateCost } from "./cost.js";

const API = "https://api.kie.ai/api/v1";
const UPLOAD = "https://kieai.redpandaai.co/api/file-stream-upload";

interface KieOptions {
  apiKey: string;
  /** Timeout total du polling (ms). */
  pollTimeoutMs?: number;
}

/** Lit un champ imbriqué sans casser sur du JSON externe non typé. */
function pick(obj: unknown, path: string[]): unknown {
  let cur: unknown = obj;
  for (const k of path) {
    if (cur && typeof cur === "object" && k in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[k];
    } else return undefined;
  }
  return cur;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class KieProvider implements GenProvider {
  readonly name = "kie.ai";
  private apiKey: string;
  private pollTimeoutMs: number;

  constructor(opts: KieOptions) {
    this.apiKey = opts.apiKey;
    this.pollTimeoutMs = opts.pollTimeoutMs ?? 5 * 60_000;
  }

  private headers(json = true): Record<string, string> {
    const h: Record<string, string> = { Authorization: `Bearer ${this.apiKey}` };
    if (json) h["Content-Type"] = "application/json";
    return h;
  }

  private async req(
    url: string,
    init: RequestInit,
    opts: { tries?: number; idempotent?: boolean } = {}
  ): Promise<unknown> {
    const tries = opts.tries ?? 4;
    const idempotent = opts.idempotent ?? true; // GET par défaut ; POST facturés = non-idempotents
    let lastErr: unknown;
    for (let i = 0; i < tries; i++) {
      try {
        // Timeout dur par requête → une connexion pendue ne fige pas la génération au-delà de la deadline.
        const res = await fetch(url, { ...init, signal: AbortSignal.timeout(30_000) });
        if (res.status === 503 || res.status === 429) {
          lastErr = new Error(`HTTP ${res.status} (throttled)`); // rejet serveur = job NON créé → retry sûr même en POST
          if (i < tries - 1) await sleep(2000 * 2 ** i);
          continue;
        }
        const body = (await res.json()) as unknown;
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(body)}`);
        return body;
      } catch (e) {
        lastErr = e;
        if (e instanceof Error && /^HTTP 4\d\d/.test(e.message)) throw e; // 4xx non-throttle = non-retryable
        // POST non-idempotent : ne pas retenter une erreur réseau (le job a pu être créé ET facturé).
        if (!idempotent) throw e;
        if (i < tries - 1) await sleep(2000 * 2 ** i); // pas de backoff inutile après la dernière tentative
      }
    }
    throw lastErr ?? new Error("kie.ai: tentatives épuisées");
  }

  async credits(): Promise<number> {
    const body = await this.req(`${API}/chat/credit`, { headers: this.headers(false) });
    const c = pick(body, ["data", "credit"]) ?? pick(body, ["credit"]) ?? pick(body, ["data"]);
    return typeof c === "number" ? c : Number(c ?? 0);
  }

  async uploadFile(path: string): Promise<string> {
    const buf = await readFile(path);
    const form = new FormData();
    form.append("file", new Blob([buf]), basename(path));
    form.append("uploadPath", "user-uploads");
    const res = await fetch(UPLOAD, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: form,
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) throw new Error(`Upload HTTP ${res.status}`);
    const body = (await res.json()) as unknown;
    const url = pick(body, ["data", "downloadUrl"]);
    if (typeof url !== "string") throw new Error(`Upload échoué: ${JSON.stringify(body)}`);
    return url;
  }

  async generateImage(req: ImageGenRequest): Promise<GenResult> {
    const created = await this.req(`${API}/jobs/createTask`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        model: req.model,
        input: {
          prompt: req.prompt,
          image_urls: req.imageUrls ?? [],
          output_format: req.outputFormat ?? "png",
          image_size: req.aspectRatio ?? "9:16",
        },
      }),
    }, { idempotent: false }); // création facturée → pas de retry réseau (anti double-facturation)
    const taskId = String(pick(created, ["data", "taskId"]) ?? pick(created, ["taskId"]) ?? "");
    if (!taskId) {
      return { ok: false, urls: [], costCredits: 0, model: req.model, error: `createTask sans taskId: ${JSON.stringify(created)}`, raw: created };
    }
    return this.pollImage(taskId, req.model);
  }

  private async pollImage(taskId: string, model: string): Promise<GenResult> {
    const deadline = Date.now() + this.pollTimeoutMs;
    while (Date.now() < deadline) {
      await sleep(3000);
      const info = await this.req(
        `${API}/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`,
        { headers: this.headers(false) }
      );
      const state = String(pick(info, ["data", "state"]) ?? pick(info, ["state"]) ?? "");
      if (state === "success") {
        const rjRaw = pick(info, ["data", "resultJson"]) ?? pick(info, ["resultJson"]);
        let urls: string[] = [];
        try {
          const rj = typeof rjRaw === "string" ? JSON.parse(rjRaw) : rjRaw;
          const u = pick(rj, ["resultUrls"]) ?? pick(rj, ["urls"]);
          if (Array.isArray(u)) urls = u.map(String);
        } catch {
          /* résultat non parsable */
        }
        return { ok: true, urls, costCredits: estimateCost(model), model, taskId, raw: info };
      }
      if (state === "fail") {
        return { ok: false, urls: [], costCredits: 0, model, taskId, error: "state=fail", raw: info };
      }
    }
    return { ok: false, urls: [], costCredits: 0, model, taskId, error: "timeout" };
  }

  async generateVideo(req: VideoGenRequest): Promise<GenResult> {
    const created = await this.req(`${API}/veo/generate`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        prompt: req.prompt,
        model: req.model,
        aspectRatio: req.aspectRatio ?? "9:16",
        imageUrls: req.imageUrls ?? [],
      }),
    }, { idempotent: false }); // création facturée → pas de retry réseau
    const taskId = String(pick(created, ["data", "taskId"]) ?? pick(created, ["taskId"]) ?? "");
    if (!taskId) {
      return { ok: false, urls: [], costCredits: 0, model: req.model, error: `veo/generate sans taskId: ${JSON.stringify(created)}`, raw: created };
    }
    const deadline = Date.now() + this.pollTimeoutMs;
    while (Date.now() < deadline) {
      await sleep(5000);
      const info = await this.req(
        `${API}/veo/record-info?taskId=${encodeURIComponent(taskId)}`,
        { headers: this.headers(false) }
      );
      const flag = pick(info, ["data", "successFlag"]) ?? pick(info, ["successFlag"]);
      if (flag === 1 || flag === "1") {
        const u = pick(info, ["data", "response", "resultUrls"]) ?? pick(info, ["response", "resultUrls"]);
        const urls = Array.isArray(u) ? u.map(String) : [];
        return { ok: true, urls, costCredits: estimateCost(req.model), model: req.model, taskId, raw: info };
      }
      // Branche d'échec terminal (symétrique à pollImage) : ne pas attendre le timeout complet.
      if (flag === 2 || flag === 3 || flag === "2" || flag === "3") {
        return { ok: false, urls: [], costCredits: 0, model: req.model, taskId, error: `veo state=fail (flag ${flag})`, raw: info };
      }
    }
    return { ok: false, urls: [], costCredits: 0, model: req.model, taskId, error: "timeout" };
  }
}
