// Créative RÉSULTAT (avant/après) — le money-shot transformation. 0 crédit (assets existants + typo).
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderBeforeAfter, closeBrowser, MECHAT_PALETTE } from "@studio/render";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

async function main() {
  mkdirSync(OUT, { recursive: true });
  const png = await renderBeforeAfter({
    format: "meta_4x5",
    palette: MECHAT_PALETTE,
    beforePath: join(REPO, "assets-v2/mechat-hair-dull.webp"),
    afterPath: join(REPO, "assets/hair-result.webp"),
    title: "الفرق يبدأ من الجذور",
    offer: { price: "139 ر.س", compareAt: "185", badge: "الدفع عند الاستلام" },
    brandLine: "زيت المشاط الأحمر",
  });
  const file = join(OUT, "RESULT-before-after-4x5.png");
  writeFileSync(file, png);
  await closeBrowser();
  console.log(`✓ ${file}`);
}
main().catch((e) => { console.error("ÉCHEC:", e); process.exit(1); });
