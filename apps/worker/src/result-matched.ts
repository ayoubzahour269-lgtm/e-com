// Avant/après APPARIÉ : on part de l'image "après" du Product Kit (élément impacté = cheveux)
// et on génère le "avant" par édition ciblée — MÊME scène, seuls les cheveux changent.
// Arg optionnel jobId → écrit l'avancement dans out/jobs/<jobId>.json (mode async).
// Lancer avec NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProductKit } from "@studio/agents";
import { KieProvider, estimateCost } from "@studio/generation";
import { renderBeforeAfter, closeBrowser, MECHAT_PALETTE } from "@studio/render";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");
const JOBS = join(OUT, "jobs");
const JOB_ID = process.argv[3];

function writeJob(patch: Record<string, unknown>) {
  if (!JOB_ID) return;
  mkdirSync(JOBS, { recursive: true });
  const f = join(JOBS, `${JOB_ID}.json`);
  let cur: Record<string, unknown> = {};
  if (existsSync(f)) { try { cur = JSON.parse(readFileSync(f, "utf8")); } catch { /* ignore */ } }
  writeFileSync(f, JSON.stringify({ ...cur, ...patch }, null, 2));
}

function kieKey(): string {
  const m = readFileSync(join(REPO, "secrets.env"), "utf8").match(/KIE_API_KEY\s*=\s*(\S+)/);
  if (!m) throw new Error("KIE_API_KEY absent");
  return m[1];
}
async function dl(url: string, file: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

const PROMPT =
  "Keep EVERYTHING identical to the reference image: the same woman, exact same pose and head position, the same clothing, the same background, the same framing, camera angle and lighting. Change ONLY the hair condition: make the hair look dull, dry, frizzy, thinner, damaged, lifeless and unkempt — the 'before' state of a hair treatment. Do not change anything else. Photorealistic.";

async function main() {
  mkdirSync(OUT, { recursive: true });
  writeJob({ id: JOB_ID, type: "result", total: 1, done: 0, status: "running" });

  const kit = loadProductKit(REPO);
  const afterRel = process.argv[2] || kit.canonical.resultAfter;
  if (!afterRel) throw new Error("Aucune image 'après' (canonical.resultAfter) dans le Product Kit.");
  const title = kit.canonical.resultTitle || "الفرق يبدأ من الجذور";

  const kie = new KieProvider({ apiKey: kieKey() });
  const bal = await kie.credits();
  const need = estimateCost("google/nano-banana-edit");
  console.log(`Solde : ${bal} · besoin ${need} · base(après) : ${afterRel}`);
  if (bal < need) throw new Error(`Solde insuffisant : ${bal} < ${need}.`);

  const afterUrl = await kie.uploadFile(join(REPO, afterRel));
  console.log("Génération du 'avant' apparié…");
  const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt: PROMPT, imageUrls: [afterUrl], aspectRatio: "3:4" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`génération échouée: ${gen.error}`);
  const beforePath = await dl(gen.urls[0], join(OUT, "matched-before.png"));

  const png = await renderBeforeAfter({
    format: "meta_4x5",
    palette: MECHAT_PALETTE,
    beforePath,
    afterPath: join(REPO, afterRel),
    title,
    offer: { price: kit.offer.price, compareAt: kit.offer.compareAt, badge: kit.offer.badge },
    brandLine: kit.brand,
  });
  const file = "RESULT-matched-4x5.png";
  writeFileSync(join(OUT, file), png);
  await closeBrowser();
  writeJob({ status: "done", done: 1, file, credits: gen.costCredits });
  console.log(`✓ ${gen.costCredits}cr → ${join(OUT, file)}`);
}
main().catch((e) => {
  const msg = e instanceof Error ? e.message : String(e);
  writeJob({ status: "failed", error: msg });
  console.error("ÉCHEC:", msg);
  process.exit(1);
});
