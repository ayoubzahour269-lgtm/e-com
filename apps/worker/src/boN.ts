// Best-of-N (phase génération). Produit N candidats IA-embed pour un concept et les sauvegarde.
// Le CRITIQUE DE FIDÉLITÉ est humain aujourd'hui (Claude en session inspecte les candidats) ;
// l'interface FidelityCritic de @studio/generation permet de brancher un modèle vision plus tard.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProductKit, loadAngles, planConcepts } from "@studio/agents";
import { KieProvider, CostLedger } from "@studio/generation";
import { scenePromptFor } from "./scenes.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

function kieKey(): string {
  const m = readFileSync(join(REPO, "secrets.env"), "utf8").match(/KIE_API_KEY\s*=\s*(\S+)/);
  if (!m) throw new Error("KIE_API_KEY absent");
  return m[1];
}
async function dl(url: string, file: string) { writeFileSync(file, Buffer.from(await (await fetch(url)).arrayBuffer())); return file; }

async function main() {
  const angle = process.argv[2] || "heritage";
  const N = Number(process.argv[3] || 3);
  const kit = loadProductKit(REPO);
  const plan = planConcepts(kit, loadAngles(REPO), { platforms: ["meta"], angleIds: [angle] });
  if (!plan.length) throw new Error(`Angle inconnu: ${angle}`);
  mkdirSync(OUT, { recursive: true });

  const kie = new KieProvider({ apiKey: kieKey() });
  const ledger = new CostLedger();
  console.log(`Solde : ${await kie.credits()} · best-of-${N} IA-embed pour « ${angle} »`);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));
  const prompt = scenePromptFor(angle);

  const candidates: string[] = [];
  for (let i = 0; i < N; i++) {
    process.stdout.write(`  candidat ${i + 1}/${N}… `);
    const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt, imageUrls: [masterUrl], aspectRatio: "3:4" });
    ledger.record({ model: gen.model, credits: gen.costCredits, taskId: gen.taskId, ok: gen.ok });
    if (!gen.ok || !gen.urls[0]) { console.log("échec"); continue; }
    const p = await dl(gen.urls[0], join(OUT, `bon-${angle}-${i}.png`));
    candidates.push(p);
    console.log(`ok (${gen.costCredits}cr)`);
  }

  const manifest = join(OUT, `bon-${angle}.json`);
  writeFileSync(manifest, JSON.stringify({ angle, candidates }, null, 2));
  console.log(`\n${candidates.length} candidats → ${OUT}`);
  candidates.forEach((p, i) => console.log(`  [${i}] ${p}`));
  console.log(`\nInspection du critique (label, « 250 ml », sceau, intégration) → choisir l'index gagnant,`);
  console.log(`puis : pnpm finalize ${angle} <index>   ·   crédits dépensés : ${ledger.total()}`);
}

main().catch((e) => { console.error("ÉCHEC:", e); process.exit(1); });
