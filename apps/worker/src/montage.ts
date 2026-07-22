// Montage vidéo — storyboard DR (méthode حكاية : une phrase connectée traverse les plans,
// produit + offre en CLÔTURE). Plans simples fidèles + cuts + typo incrustée (ffmpeg).
// Arc : hook (transformation) → mécanisme (racines) → clôture (produit + offre).
// Prérequis : ffmpeg dans le PATH. 0 crédit (réutilise plans + assets existants).
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

const PRODUCT = process.argv[2] || join(OUT, "video-bon-outcome-1.mp4"); // plan produit
const HAIR = process.argv[3] || join(OUT, "video-hair-result.webp.mp4"); // plan résultat cheveux
const MATCHED_BEFORE = join(OUT, "matched-before.png"); // le "avant" apparié (généré par result-matched)
const FIT9 = "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920";

async function ff(args: string[]) {
  await exec("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { maxBuffer: 1 << 26 });
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  for (const s of [PRODUCT, HAIR, MATCHED_BEFORE]) if (!existsSync(s)) throw new Error(`Manque : ${s}`);

  const base = { format: "story_9x16", template: "banner_top", lang: "ar", dir: "rtl", palette: MECHAT_PALETTE, titleFont: "amiri", brandLine: "زيت المشاط الأحمر" } as const;

  // Couches typo (phrase connectée qui traverse les 3 plans).
  const hook = await renderOverlayLayer({ ...base, id: "hook", title: "المشكلة ليست في الشامبو" } as CreativeSpec);
  writeFileSync(join(OUT, "ov-hook.png"), hook);
  const build = await renderOverlayLayer({ ...base, id: "build", title: "بل في جذورٍ تحتاج التغذية" } as CreativeSpec);
  writeFileSync(join(OUT, "ov-build.png"), build);
  const close = await renderOverlayLayer({
    ...base, id: "close", kicker: "وصفة مغربية أصيلة", title: "عبوة العلاج — ٣ قوارير",
    offer: { price: "139 ر.س", compareAt: "185", badge: "الدفع عند الاستلام" },
  } as CreativeSpec);
  writeFileSync(join(OUT, "ov-close.png"), close);

  // Base du plan hook : la transformation avant/après (sans titre/offre → le hook est incrusté par-dessus).
  const baPlain = await renderBeforeAfter({
    format: "meta_4x5", palette: MECHAT_PALETTE,
    beforePath: MATCHED_BEFORE, afterPath: join(REPO, "assets/hair-result.webp"),
    title: "", brandLine: "",
  });
  writeFileSync(join(OUT, "ba-plain.png"), baPlain);
  await closeBrowser();

  const segHook = join(OUT, "seg-hook.mp4"), segBuild = join(OUT, "seg-build.mp4"), segClose = join(OUT, "seg-close.mp4");

  // Plan 1 (hook, 3.5s) : transformation avant/après (4:5) letterboxée en 9:16 (bandes grenat) + hook.
  await ff(["-loop", "1", "-i", join(OUT, "ba-plain.png"), "-i", join(OUT, "ov-hook.png"),
    "-filter_complex", "[0:v]scale=1080:1350,pad=1080:1920:0:285:color=0x1A0B0B[v];[v][1:v]overlay=0:0[o]",
    "-map", "[o]", "-t", "3.5", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", segHook]);

  // Plan 2 (mécanisme, 4s) : cheveux résultat + phrase.
  await ff(["-i", HAIR, "-i", join(OUT, "ov-build.png"),
    "-filter_complex", `[0:v]${FIT9},setpts=PTS-STARTPTS[v];[v][1:v]overlay=0:0[o]`,
    "-map", "[o]", "-an", "-t", "4", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", segBuild]);

  // Plan 3 (clôture, 4s) : PRODUIT + offre + CTA.
  await ff(["-i", PRODUCT, "-i", join(OUT, "ov-close.png"),
    "-filter_complex", `[0:v]${FIT9},setpts=PTS-STARTPTS[v];[v][1:v]overlay=0:0[o]`,
    "-map", "[o]", "-an", "-t", "4", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", segClose]);

  // Concat cuts francs.
  const montage = join(OUT, "MONTAGE-mechat-15s.mp4");
  await ff(["-i", segHook, "-i", segBuild, "-i", segClose,
    "-filter_complex", "[0:v][1:v][2:v]concat=n=3:v=1:a=0[v]",
    "-map", "[v]", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-movflags", "+faststart", montage]);

  console.log(`✓ Montage → ${montage}`);
}
main().catch((e) => { console.error("ÉCHEC:", e instanceof Error ? e.message : e); process.exit(1); });
