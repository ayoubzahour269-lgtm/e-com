// Montage vidéo DR — construit selon le skill ad-creative-studio.
// Structure PAS/DR : HOOK (problème/pattern-interrupt) → MÉCANISME → PRODUIT+OFFRE+CTA (clôture).
// Méthode de test du skill : 3 variantes de HOOK (familles distinctes), MÊME corps → hook-testing.
// Phrase connectée (méthode حكاية) + CTA on-screen + COD. Plans fidèles + cuts + typo (ffmpeg).
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { renderOverlayLayer, renderBeforeAfter, closeBrowser, MECHAT_PALETTE, type CreativeSpec } from "@studio/render";

const exec = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

const PRODUCT = join(OUT, "video-bon-outcome-1.mp4");       // plan produit (clôture)
const HAIR = join(OUT, "video-hair-result.webp.mp4");       // plan résultat (mécanisme)
const MATCHED_BEFORE = join(OUT, "matched-before.png");     // "avant" apparié
const FIT9 = "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920";

// 3 HOOKS de familles différentes (contrarian / outcome / pain) — hook-testing du skill.
const HOOKS = [
  { id: "h1", family: "contrarian", title: "المشكلة ليست في الشامبو" },
  { id: "h2", family: "outcome", title: "٩٠ يومًا وتعود الكثافة" },
  { id: "h3", family: "pain", title: "التساقط ليس قدرًا" },
];

const base = { format: "story_9x16", template: "banner_top", lang: "ar", dir: "rtl", palette: MECHAT_PALETTE, titleFont: "amiri", brandLine: "زيت المشاط الأحمر" } as const;

async function ff(args: string[]) {
  await exec("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { maxBuffer: 1 << 26 });
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  for (const s of [PRODUCT, HAIR, MATCHED_BEFORE]) if (!existsSync(s)) throw new Error(`Manque : ${s}`);

  // — Couches typo — corps commun (mécanisme + clôture) + 3 hooks.
  const build = await renderOverlayLayer({ ...base, id: "build", kicker: "مشاط · كركديه · حنّاء", title: "وصفة مغربية تغذّي الجذور" } as CreativeSpec);
  writeFileSync(join(OUT, "ov-build.png"), build);
  const close = await renderOverlayLayer({
    ...base, id: "close", kicker: "الدفع عند الاستلام", title: "اطلبي عبوة العلاج الآن",
    offer: { price: "139 ر.س", compareAt: "185", badge: "٣ قوارير" },
  } as CreativeSpec);
  writeFileSync(join(OUT, "ov-close.png"), close);
  for (const h of HOOKS) {
    const layer = await renderOverlayLayer({ ...base, id: h.id, title: h.title } as CreativeSpec);
    writeFileSync(join(OUT, `ov-${h.id}.png`), layer);
  }

  // Base du hook : transformation avant/après (sans titre/offre → hook incrusté par-dessus).
  const baPlain = await renderBeforeAfter({ format: "meta_4x5", palette: MECHAT_PALETTE, beforePath: MATCHED_BEFORE, afterPath: join(REPO, "assets/hair-result.webp"), title: "", brandLine: "" });
  writeFileSync(join(OUT, "ba-plain.png"), baPlain);
  await closeBrowser();

  // — Segments corps (mécanisme + clôture), communs aux 3 variantes.
  const segBuild = join(OUT, "seg-build.mp4"), segClose = join(OUT, "seg-close.mp4");
  await ff(["-i", HAIR, "-i", join(OUT, "ov-build.png"), "-filter_complex", `[0:v]${FIT9},setpts=PTS-STARTPTS[v];[v][1:v]overlay=0:0[o]`, "-map", "[o]", "-an", "-t", "4", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", segBuild]);
  await ff(["-i", PRODUCT, "-i", join(OUT, "ov-close.png"), "-filter_complex", `[0:v]${FIT9},setpts=PTS-STARTPTS[v];[v][1:v]overlay=0:0[o]`, "-map", "[o]", "-an", "-t", "4.5", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", segClose]);

  // — Un montage par variante de hook (même corps).
  const outputs: string[] = [];
  for (const h of HOOKS) {
    const segHook = join(OUT, `seg-${h.id}.mp4`);
    await ff(["-loop", "1", "-i", join(OUT, "ba-plain.png"), "-i", join(OUT, `ov-${h.id}.png`),
      "-filter_complex", "[0:v]scale=1080:1350,pad=1080:1920:0:285:color=0x1A0B0B[v];[v][1:v]overlay=0:0[o]",
      "-map", "[o]", "-t", "3", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", segHook]);
    const montage = join(OUT, `MONTAGE-${h.id}-${h.family}.mp4`);
    await ff(["-i", segHook, "-i", segBuild, "-i", segClose, "-filter_complex", "[0:v][1:v][2:v]concat=n=3:v=1:a=0[v]", "-map", "[v]", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-movflags", "+faststart", montage]);
    outputs.push(montage);
  }

  console.log("✓ 3 variantes hook-test (même corps) :");
  outputs.forEach((o, i) => console.log(`   ${HOOKS[i].family.padEnd(11)} → ${o}`));
  console.log("\nPlan de test : lancer les 3 à budget égal 48-72h, KPI = hook rate (3s ÷ impressions) ≥ 30%.");
}
main().catch((e) => { console.error("ÉCHEC:", e instanceof Error ? e.message : e); process.exit(1); });
