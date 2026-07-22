// Best-of-N (phase génération). Produit N candidats IA-embed pour un concept et les sauvegarde.
// Le CRITIQUE DE FIDÉLITÉ est humain aujourd'hui (Claude en session inspecte les candidats) ;
// l'interface FidelityCritic de @studio/generation permet de brancher un modèle vision plus tard.
// Arg optionnel jobId → écrit l'avancement dans out/jobs/<jobId>.json (mode async non bloquant).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProductKit, loadAngles, planConcepts } from "@studio/agents";
import { KieProvider, CostLedger } from "@studio/generation";
import { scenePromptFor } from "./scenes.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");
const JOBS = join(OUT, "jobs");

const ANGLE = process.argv[2] || "heritage";
const N = Number(process.argv[3] || 3);
const JOB_ID = process.argv[4]; // optionnel

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
  if (!res.ok) throw new Error(`download ${res.status} pour ${url}`); // évite d'écrire un corps d'erreur dans le .png
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  writeJob({ id: JOB_ID, type: "bon", angle: ANGLE, total: N, done: 0, status: "running" });

  const kit = loadProductKit(REPO);
  const plan = planConcepts(kit, loadAngles(REPO), { platforms: ["meta"], angleIds: [ANGLE] });
  if (!plan.length) throw new Error(`Angle inconnu: ${ANGLE}`);

  const kie = new KieProvider({ apiKey: kieKey() });
  const ledger = new CostLedger();
  console.log(`Solde : ${await kie.credits()} · best-of-${N} IA-embed pour « ${ANGLE} »`);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));
  const prompt = scenePromptFor(ANGLE);

  const candidates: string[] = [];
  for (let i = 0; i < N; i++) {
    process.stdout.write(`  candidat ${i + 1}/${N}… `);
    // Un candidat qui échoue (exception réseau/kie, download) ne doit PAS tuer le batch.
    try {
      const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt, imageUrls: [masterUrl], aspectRatio: "3:4" });
      ledger.record({ model: gen.model, credits: gen.costCredits, taskId: gen.taskId, ok: gen.ok });
      if (gen.ok && gen.urls[0]) {
        const p = await dl(gen.urls[0], join(OUT, `bon-${ANGLE}-${i}.png`));
        candidates.push(p);
        console.log(`ok (${gen.costCredits}cr)`);
      } else {
        console.log(`échec (${gen.error})`);
      }
    } catch (e) {
      console.log(`erreur (${e instanceof Error ? e.message : String(e)})`);
    }
    writeJob({ done: i + 1, credits: ledger.total(), candidates: candidates.map((c) => c.split("/").pop()) });
  }

  const manifest = join(OUT, `bon-${ANGLE}.json`);
  writeFileSync(manifest, JSON.stringify({ angle: ANGLE, candidates }, null, 2));
  writeJob({ status: "done", candidates: candidates.map((c) => c.split("/").pop()), credits: ledger.total() });

  console.log(`\n${candidates.length} candidats → ${OUT}`);
  candidates.forEach((p, i) => console.log(`  [${i}] ${p}`));
  console.log(`\npuis : pnpm finalize ${ANGLE} <index>   ·   crédits dépensés : ${ledger.total()}`);
}

main().catch((e) => {
  const msg = e instanceof Error ? e.message : String(e);
  writeJob({ status: "failed", error: msg });
  console.error("ÉCHEC:", msg);
  process.exit(1);
});
