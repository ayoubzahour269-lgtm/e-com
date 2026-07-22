// Finalise le candidat gagnant choisi par le critique : rend la créative finie
// (scène IA-embed retenue + typo déterministe).
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProductKit, loadAngles, planConcepts } from "@studio/agents";
import { renderCreative, closeBrowser } from "@studio/render";
import { buildSpec } from "./scenes.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

async function main() {
  const angle = process.argv[2];
  const index = Number(process.argv[3]);
  if (!angle || Number.isNaN(index)) { console.error("Usage: pnpm finalize <angle> <index>"); process.exit(1); }

  const manifest = JSON.parse(readFileSync(join(OUT, `bon-${angle}.json`), "utf8")) as { candidates: string[] };
  const scenePath = manifest.candidates[index];
  if (!scenePath) throw new Error(`Index ${index} hors limites (${manifest.candidates.length} candidats).`);

  const kit = loadProductKit(REPO);
  const plan = planConcepts(kit, loadAngles(REPO), { platforms: ["meta"], angleIds: [angle] });
  const spec = buildSpec(plan[0], kit, scenePath);

  const png = await renderCreative(spec);
  const file = join(OUT, `FINAL-${angle}-4x5.png`);
  writeFileSync(file, png);
  await closeBrowser();
  console.log(`✓ Gagnant [${index}] finalisé → ${file}`);
}

main().catch((e) => { console.error("ÉCHEC:", e); process.exit(1); });
