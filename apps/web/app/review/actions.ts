"use server";
// Finalise le gagnant choisi : rend la créative finie via le worker (Chromium/Sharp),
// puis copie le résultat dans public/creatives pour l'afficher. Rendu déterministe, 0 crédit.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";
import path from "node:path";

const exec = promisify(execFile);
const REPO = path.join(process.cwd(), "..", "..");

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
