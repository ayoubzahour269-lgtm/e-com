// Démo — le cerveau d'agence produit un BATCH de concepts diversifiés (Andromeda),
// chacun linté par la policy, à partir du seul Product Kit. Zéro LLM requis.
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProductKit, loadAngles, planConcepts } from "./index.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const kit = loadProductKit(REPO);
const lib = loadAngles(REPO);

const plan = planConcepts(kit, lib, { platforms: ["meta"], n: 5 });

console.log(`Cerveau d'agence — ${plan.length} concepts diversifiés pour « ${kit.brand} »\n`);
for (const r of plan) {
  const c = r.concept;
  const meta = c.copy.find((x) => x.platform === "meta");
  const status = r.clean ? "✅ conforme" : "❌ à corriger";
  console.log(`■ ${c.angle.toUpperCase()} · hook(${c.hookType}) · template ${r.recommendTemplate} · ${status}`);
  console.log(`   hook     : ${c.hook}`);
  if (meta?.primary) console.log(`   primary  : ${meta.primary}`);
  if (meta?.headline) console.log(`   headline : ${meta.headline}`);
  for (const q of r.qa) {
    for (const f of q.findings) {
      console.log(`   ${f.severity === "error" ? "✗" : "~"} [${f.code}]${f.field ? ` ${f.field}` : ""} ${f.excerpt ? `« ${f.excerpt} »` : ""}`);
    }
  }
  console.log();
}
const clean = plan.filter((r) => r.clean).length;
console.log(`→ ${clean}/${plan.length} concepts conformes (0 erreur), prêts à passer en production.`);
