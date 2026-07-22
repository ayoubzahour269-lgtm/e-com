"use server";
// Finalise le gagnant choisi : rend la créative finie via le worker (Chromium/Sharp),
// puis copie le résultat dans public/creatives pour l'afficher. Rendu déterministe, 0 crédit.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";
import path from "node:path";

const exec = promisify(execFile);
const REPO = path.join(process.cwd(), "..", "..");

/** Lance une génération best-of-N (kie.ai) pour un angle. Dépense ~N×4 crédits. */
export async function launchBatch(angle: string, n: number) {
  if (!/^[\w-]+$/.test(angle)) return { ok: false as const, error: "angle invalide" };
  const N = Math.min(6, Math.max(1, Math.floor(n) || 3));
  const tsx = path.join(REPO, "apps/worker/node_modules/.bin/tsx");
  const script = path.join(REPO, "apps/worker/src/boN.ts");
  try {
    // NB : action bloquante (ok pour l'interne). Pour la prod, passer en job async
    // (file d'attente + polling) car kie.ai peut être lent. Timeout large en attendant.
    await exec(tsx, [script, angle, String(N)], {
      cwd: path.join(REPO, "apps/worker"),
      timeout: 480_000,
      // Le fetch natif de Node n'honore le proxy qu'avec ces variables (cf. README proxy).
      env: { ...process.env, NODE_USE_ENV_PROXY: "1", NODE_EXTRA_CA_CERTS: "/root/.ccr/ca-bundle.crt" },
    });
    const manifest = path.join(REPO, "apps/worker/out", `bon-${angle}.json`);
    const m = JSON.parse(fs.readFileSync(manifest, "utf8"));
    return { ok: true as const, angle, count: (m.candidates || []).length };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function finalizeWinner(angle: string, index: number) {
  if (!/^[\w-]+$/.test(angle) || !Number.isInteger(index) || index < 0) {
    return { ok: false, error: "paramètres invalides" };
  }
  const tsx = path.join(REPO, "apps/worker/node_modules/.bin/tsx");
  const script = path.join(REPO, "apps/worker/src/finalize.ts");
  try {
    await exec(tsx, [script, angle, String(index)], {
      cwd: path.join(REPO, "apps/worker"),
      timeout: 120_000,
    });
    const src = path.join(REPO, "apps/worker/out", `FINAL-${angle}-4x5.png`);
    const destDir = path.join(process.cwd(), "public", "creatives");
    fs.mkdirSync(destDir, { recursive: true });
    const dest = `FINAL-${angle}-4x5.png`;
    fs.copyFileSync(src, path.join(destDir, dest));
    return { ok: true, file: dest, angle };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
