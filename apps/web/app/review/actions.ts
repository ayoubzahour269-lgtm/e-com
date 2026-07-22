"use server";
// Server actions du studio : lancer une génération (async, non bloquante) + finaliser un gagnant.
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const exec = promisify(execFile);
const REPO = path.join(process.cwd(), "..", "..");
const JOBS = path.join(REPO, "apps/worker/out/jobs");
const PROXY_ENV = { NODE_USE_ENV_PROXY: "1", NODE_EXTRA_CA_CERTS: "/root/.ccr/ca-bundle.crt" };

/**
 * Lance une génération best-of-N (kie.ai) de façon ASYNCHRONE : spawn détaché du worker,
 * retour immédiat d'un jobId. Le worker écrit son avancement dans out/jobs/<jobId>.json.
 * Dépense ~N×4 crédits. Suivi via getJob().
 */
export async function launchBatchAsync(angle: string, n: number) {
  if (!/^[\w-]+$/.test(angle)) return { ok: false as const, error: "angle invalide" };
  const N = Math.min(6, Math.max(1, Math.floor(n) || 3));
  const jobId = randomUUID();
  fs.mkdirSync(JOBS, { recursive: true });
  fs.writeFileSync(
    path.join(JOBS, `${jobId}.json`),
    JSON.stringify({ id: jobId, type: "bon", angle, total: N, done: 0, status: "running" })
  );
  const tsx = path.join(REPO, "apps/worker/node_modules/.bin/tsx");
  const script = path.join(REPO, "apps/worker/src/boN.ts");
  const child = spawn(tsx, [script, angle, String(N), jobId], {
    cwd: path.join(REPO, "apps/worker"),
    detached: true,
    stdio: "ignore",
    env: { ...process.env, ...PROXY_ENV },
  });
  child.unref(); // le job survit à la fin de la requête
  return { ok: true as const, jobId, total: N };
}

/** Lit l'état d'un job de génération. */
export async function getJob(jobId: string) {
  if (!/^[\w-]+$/.test(jobId)) return { status: "failed", error: "id invalide" };
  try {
    return JSON.parse(fs.readFileSync(path.join(JOBS, `${jobId}.json`), "utf8"));
  } catch {
    return { status: "unknown" };
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
