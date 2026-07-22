// BOUCLE COMPLÈTE — scène-produit fidèle (générée par kie.ai, Spike B) + typo arabe
// déterministe (Spike A) = créative FINIE. Le texte va dans l'espace négatif du haut
// (recommandé par l'ArtDirector), le produit reste intact.
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderCreative, closeBrowser, MECHAT_PALETTE, type CreativeSpec } from "./index.js";
import { analyzeScene, evaluatePlacement } from "./artdirector.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");
const scene = join(REPO, "packages/generation/out/edit-0.png"); // scène-produit fidèle (Spike B)

async function main() {
  if (!existsSync(scene)) {
    console.error("Scène introuvable — lance d'abord Spike B (packages/generation).");
    process.exit(1);
  }
  // 1) L'ArtDirector confirme : produit central → texte en HAUT (banner_top).
  const a = await analyzeScene(scene);
  const ed = evaluatePlacement("editorial", a);
  console.log(`ArtDirector: produit ${(a.productSpan.top * 100) | 0}%→${(a.productSpan.bottom * 100) | 0}% · editorial(bas)=${ed.collision ? "collision" : "ok"} → template banner_top (texte en haut)\n`);

  const spec: CreativeSpec = {
    id: "FINAL-mechat-heritage",
    format: "meta_4x5",
    template: "banner_top",
    lang: "ar",
    dir: "rtl",
    palette: MECHAT_PALETTE,
    titleFont: "amiri",
    scenePath: scene,
    kicker: "طقسٌ مغربيٌّ أصيل",
    title: "سرٌّ توارثته الأجيال",
    offer: { price: "139 ر.س", compareAt: "185", badge: "الدفع عند الاستلام" },
    brandLine: "زيت المشاط الأحمر",
  };

  mkdirSync(OUT, { recursive: true });
  const png = await renderCreative(spec);
  const file = join(OUT, "FINAL-mechat-heritage-4x5.png");
  writeFileSync(file, png);
  await closeBrowser();
  console.log(`✓ Créative finie → ${file} (${(png.length / 1024) | 0}KB)`);
}

main().catch((e) => { console.error("ÉCHEC:", e); process.exit(1); });
