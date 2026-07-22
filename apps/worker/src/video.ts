// Vidéo héros (Phase 3) — image-to-video veo3 : on part d'une scène produit DÉJÀ fidèle
// (image fixe) et on ajoute du mouvement cinématique. Le produit reste figé/identique.
// Usage : tsx src/video.ts <image relative au repo> [aspect 9:16|16:9] [model veo3_fast|veo3]
// Lancer avec NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { KieProvider, CostLedger, estimateCost } from "@studio/generation";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

const IMG = process.argv[2] || "apps/worker/out/bon-outcome-1.png";
const ASPECT = (process.argv[3] as "9:16" | "16:9") || "9:16";
const MODEL = process.argv[4] || "veo3_fast";

// Prompt de mouvement — surchargeable via la variable d'env MOTION_PROMPT (pour tester des plans complexes).
const MOTION =
  process.env.MOTION_PROMPT ||
  "Cinematic slow push-in on the bottle with a gentle camera orbit. Golden dust particles drift slowly, soft silk shimmers, warm luxury lighting, shallow depth of field. The product stays perfectly still and 100% identical to the image — do not change its label, shape or color. No text, no captions. Elegant premium beauty commercial, 8 seconds.";

function kieKey(): string {
  const m = readFileSync(join(REPO, "secrets.env"), "utf8").match(/KIE_API_KEY\s*=\s*(\S+)/);
  if (!m) throw new Error("KIE_API_KEY absent");
  return m[1];
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });

  const balance = await kie.credits();
  const need = estimateCost(MODEL);
  console.log(`Solde : ${balance} · besoin ${need} (${MODEL}) · source : ${IMG}`);
  if (balance < need) throw new Error(`Solde insuffisant : ${balance} < ${need}.`);

  const url = await kie.uploadFile(join(REPO, IMG));
  console.log("Image uploadée, génération vidéo (veo, ~1-3 min)…");
  const gen = await kie.generateVideo({ model: MODEL, prompt: MOTION, imageUrls: [url], aspectRatio: ASPECT });
  if (!gen.ok || !gen.urls[0]) { console.error("ÉCHEC:", gen.error); process.exit(1); }

  const res = await fetch(gen.urls[0]);
  if (!res.ok) throw new Error(`download ${res.status}`);
  const file = join(OUT, `video-${basename(IMG, ".png")}.mp4`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ Vidéo ${gen.costCredits}cr → ${file}`);
}

main().catch((e) => { console.error("ÉCHEC:", e instanceof Error ? e.message : e); process.exit(1); });
