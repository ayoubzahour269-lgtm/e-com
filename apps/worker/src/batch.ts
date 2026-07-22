// Orchestrateur simple (1 shot par concept). IA-embed : produit fondu dans la scène.
// Pour la fidélité garantie sans babysitting → best-of-N (boN.ts + finalize.ts).
// Lancer avec NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProductKit, loadAngles, planConcepts } from "@studio/agents";
import { KieProvider, CostLedger } from "@studio/generation";
import { renderCreative, closeBrowser } from "@studio/render";
import { scenePromptFor, buildSpec } from "./scenes.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

function kieKey(): string {
  const m = readFileSync(join(REPO, "secrets.env"), "utf8").match(/KIE_API_KEY\s*=\s*(\S+)/);
  if (!m) throw new Error("KIE_API_KEY absent");
  return m[1];
}
async function dl(url: string, file: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} pour ${url}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

async function main() {
  const angleIds = (process.argv[2] || "heritage,offer").split(",");
  const kit = loadProductKit(REPO);
  const plan = planConcepts(kit, loadAngles(REPO), { platforms: ["meta"], angleIds });
  mkdirSync(OUT, { recursive: true });

  const kie = new KieProvider({ apiKey: kieKey() });
  const ledger = new CostLedger();
  console.log(`Solde : ${await kie.credits()} · batch de ${plan.length} : ${angleIds.join(", ")}\n`);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));

  const delivered: { angle: string; file: string }[] = [];
  for (const r of plan) {
    const angle = r.concept.angle;
    process.stdout.write(`■ ${angle} — scène… `);
    try {
      const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt: scenePromptFor(angle), imageUrls: [masterUrl], aspectRatio: "3:4" });
      ledger.record({ model: gen.model, credits: gen.costCredits, taskId: gen.taskId, ok: gen.ok });
      if (!gen.ok || !gen.urls[0]) { console.log(`échec (${gen.error})`); continue; }
      const scenePath = await dl(gen.urls[0], join(OUT, `scene-${angle}.png`));

      const png = await renderCreative(buildSpec(r, kit, scenePath));
      const file = join(OUT, `CREATIVE-${angle}-4x5.png`);
      writeFileSync(file, png);
      delivered.push({ angle, file });
      console.log(`✓ ${gen.costCredits}cr · créative prête`);
    } catch (e) {
      console.log(`erreur (${e instanceof Error ? e.message : String(e)}) — on continue`);
    }
  }
  await closeBrowser();

  console.log(`\n— Plan de test —`);
  delivered.forEach((d, i) => console.log(`  ${i + 1}. ${d.angle.padEnd(12)} Meta 4:5 · variable: ANGLE · métrique: CTR ≥1% / CPA`));
  console.log(`\nCrédits : ${ledger.total()} · Livrées : ${delivered.length}/${plan.length} → ${OUT}`);
}

main().catch((e) => { console.error("ÉCHEC:", e); process.exit(1); });
