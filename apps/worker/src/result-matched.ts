// Avant/après APPARIÉ : on part d'UNE image (l'"après" = cheveux sains) et on génère le
// "avant" par édition ciblée — MÊME personne/pose/fond/cadrage, SEULS les cheveux changent.
// C'est ce qui rend un avant/après crédible. ~4 crédits.
// Lancer avec NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { KieProvider, estimateCost } from "@studio/generation";
import { renderBeforeAfter, closeBrowser, MECHAT_PALETTE } from "@studio/render";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");
const AFTER = process.argv[2] || "assets/hair-result.webp"; // l'image de référence (cheveux sains)

function kieKey(): string {
  const m = readFileSync(join(REPO, "secrets.env"), "utf8").match(/KIE_API_KEY\s*=\s*(\S+)/);
  if (!m) throw new Error("KIE_API_KEY absent");
  return m[1];
}
async function dl(url: string, file: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

const PROMPT =
  "Keep EVERYTHING identical to the reference image: the same woman, exact same pose and head position, the same cream blazer, the same beige studio background, the same framing, camera angle and lighting. Change ONLY the hair condition: make the hair look dull, dry, frizzy, thinner, damaged, lifeless and unkempt — the 'before' state of a hair treatment. Do not change anything else. Photorealistic.";

async function main() {
  mkdirSync(OUT, { recursive: true });
  const kie = new KieProvider({ apiKey: kieKey() });
  const bal = await kie.credits();
  const need = estimateCost("google/nano-banana-edit");
  console.log(`Solde : ${bal} · besoin ${need} · base(après) : ${AFTER}`);
  if (bal < need) throw new Error(`Solde insuffisant : ${bal} < ${need}.`);

  const afterUrl = await kie.uploadFile(join(REPO, AFTER));
  console.log("Génération du 'avant' apparié (mêmes éléments, cheveux ternes)…");
  const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt: PROMPT, imageUrls: [afterUrl], aspectRatio: "3:4" });
  if (!gen.ok || !gen.urls[0]) { console.error("ÉCHEC:", gen.error); process.exit(1); }
  const beforePath = await dl(gen.urls[0], join(OUT, "matched-before.png"));

  const png = await renderBeforeAfter({
    format: "meta_4x5",
    palette: MECHAT_PALETTE,
    beforePath,
    afterPath: join(REPO, AFTER),
    title: "الفرق يبدأ من الجذور",
    offer: { price: "139 ر.س", compareAt: "185", badge: "الدفع عند الاستلام" },
    brandLine: "زيت المشاط الأحمر",
  });
  const file = join(OUT, "RESULT-matched-4x5.png");
  writeFileSync(file, png);
  await closeBrowser();
  console.log(`✓ ${gen.costCredits}cr → ${file}`);
}
main().catch((e) => { console.error("ÉCHEC:", e instanceof Error ? e.message : e); process.exit(1); });
