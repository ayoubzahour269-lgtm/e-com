// SPIKE A — preuve du moteur de typographie arabe déterministe.
// Produit de vraies créatives Mechat à partir du copy existant (creative/docs/BRIEF-CREATIFS.md),
// en deux modes : (1) fond studio dégradé (isole la typo), (2) composé sur une photo produit.
// Aucune clé API requise — 100% déterministe et hors-ligne.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderCreative, closeBrowser, MECHAT_PALETTE, type CreativeSpec } from "./index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");
const asset = (p: string) => join(REPO, p);

const specs: CreativeSpec[] = [
  {
    // Reproduit "A-lifestyle" — titre sur fond studio (isole la qualité typo)
    id: "A-editorial-studio",
    format: "meta_4x5",
    template: "editorial",
    lang: "ar",
    dir: "rtl",
    palette: MECHAT_PALETTE,
    titleFont: "amiri",
    kicker: "طقسٌ مغربيٌّ أصيل",
    title: "دقيقتان كل يوم… وشعرٌ يتغيّر",
    subtitle:
      "طقسٌ بسيط كل مساء — دقيقتان تكفيان ليستعيد الشعر امتلاءه ولمعانه مع زيت المشاط الأحمر.",
    offer: { price: "139 ر.س", compareAt: "185", badge: "الدفع عند الاستلام" },
    brandLine: "زيت المشاط الأحمر",
  },
  {
    // Reproduit "B-heritage" — composé sur une VRAIE photo produit
    id: "B-editorial-photo",
    format: "meta_4x5",
    template: "editorial",
    lang: "ar",
    dir: "rtl",
    palette: MECHAT_PALETTE,
    titleFont: "amiri",
    scenePath: asset("assets-v2/mechat-bottle-clean.webp"),
    kicker: "وصفة الأجداد",
    title: "سرٌّ توارثته الأجيال",
    subtitle: "مشاط، كركديه، حنّاء — وصفة مغربية أصيلة بلا بارابين ولا سيليكون.",
    offer: { price: "139 ر.س", compareAt: "185", badge: "الدفع عند الاستلام" },
    brandLine: "زيت المشاط الأحمر",
  },
  {
    // Format story 9:16, titre Reem Kufi (kufi géométrique), composé sur le hero
    id: "C-story-hero",
    format: "story_9x16",
    template: "editorial",
    lang: "ar",
    dir: "rtl",
    palette: MECHAT_PALETTE,
    titleFont: "reemKufi",
    scenePath: asset("assets-v2/mechat-hero-v2.webp"),
    kicker: "٩٠ يومًا من الانتظام",
    title: "الفرق يبدأ من الجذور",
    subtitle: "جذور تتغذّى، تساقط أقل، ولمعان يظهر في المرآة.",
    offer: { price: "139 ر.س", badge: "الدفع عند الاستلام" },
    brandLine: "زيت المشاط الأحمر",
  },
];

async function main() {
  mkdirSync(OUT, { recursive: true });
  console.log("SPIKE A — moteur typographie arabe déterministe\n");
  const t0 = Date.now();
  for (const spec of specs) {
    const start = Date.now();
    const png = await renderCreative(spec);
    const file = join(OUT, `${spec.id}-${spec.format}.png`);
    writeFileSync(file, png);
    console.log(
      `  ✓ ${spec.id.padEnd(20)} ${spec.format.padEnd(10)} ${(png.length / 1024).toFixed(0)}KB  ${Date.now() - start}ms`
    );
  }
  await closeBrowser();
  console.log(`\nTerminé en ${((Date.now() - t0) / 1000).toFixed(1)}s → ${OUT}`);
}

main().catch((e) => {
  console.error("ÉCHEC:", e);
  process.exit(1);
});
