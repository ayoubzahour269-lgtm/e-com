// Démo ArtDirector — prouve qu'il détecte la collision qui a gâché l'image B
// (template editorial = texte en bas, PAR-DESSUS un produit centré) et bascule en hero_light.
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeScene, evaluatePlacement, recommendTemplate } from "./artdirector.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const asset = (p: string) => join(REPO, p);
const pct = (n: number) => `${(n * 100).toFixed(0)}%`;

const scenes: [string, string][] = [
  ["assets-v2/mechat-bottle-clean.webp", "flacon carré centré (fond de l'image B fautive)"],
  ["assets-v2/mechat-hero-v2.webp", "hero bouteille (fond image C)"],
  ["creative/bottle_straight.png", "master détouré (produit centré)"],
];

console.log("ArtDirector — détection produit & choix de template\n");
for (const [p, label] of scenes) {
  const a = await analyzeScene(asset(p));
  const ed = evaluatePlacement("editorial", a);
  const hero = evaluatePlacement("hero_light", a);
  const reco = recommendTemplate(a);
  console.log(`• ${label}`);
  console.log(`    produit occupe la travée  ${pct(a.productSpan.top)} → ${pct(a.productSpan.bottom)}   (air: haut ${pct(a.clearance.top)}, bas ${pct(a.clearance.bottom)})`);
  console.log(`    editorial (texte bas)  : ${ed.collision ? `❌ COLLISION (chevauchement ${pct(ed.worstOverlap)}) — le bug de l'image B` : "✅ ok"}`);
  console.log(`    hero_light (haut+bas)  : ${hero.collision ? `❌ collision ${pct(hero.worstOverlap)}` : "✅ ok"}`);
  console.log(`    → RECO ArtDirector : ${reco.template}  (${reco.reason})\n`);
}
