// Montage vidéo — la BONNE méthode : plans simples fidèles + cuts francs + typo incrustée.
// Assemble : plan produit (hook) → plan résultat (bénéfice) → carte d'offre. ffmpeg + render.
// Prérequis : ffmpeg dans le PATH. 0 crédit (réutilise des plans déjà générés).
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { renderOverlayLayer, renderCreative, closeBrowser, MECHAT_PALETTE, type CreativeSpec } from "@studio/render";

const exec = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

const SHOT_A = process.argv[2] || join(OUT, "video-bon-outcome-1.mp4"); // plan produit (hero)
const SHOT_B = process.argv[3] || join(OUT, "video-hair-result.webp.mp4"); // plan résultat (cheveux)
const SEG = "1080:1920"; // 9:16
const FIT = `scale=${SEG.replace(":", ":")}:force_original_aspect_ratio=increase,crop=${SEG}`;

async function ff(args: string[]) {
  await exec("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { maxBuffer: 1 << 26 });
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  for (const s of [SHOT_A, SHOT_B]) if (!existsSync(s)) throw new Error(`Plan manquant : ${s}`);

  const base = { format: "story_9x16", template: "banner_top", lang: "ar", dir: "rtl", palette: MECHAT_PALETTE, titleFont: "amiri", brandLine: "زيت المشاط الأحمر" } as const;

  // 1) Couches typo transparentes (incrustées sur les plans).
  const hook = await renderOverlayLayer({ ...base, id: "hook", kicker: "طقسٌ مغربيٌّ أصيل", title: "لشعرٍ أكثف وأقوى" } as CreativeSpec);
  writeFileSync(join(OUT, "ov-hook.png"), hook);
  const benefit = await renderOverlayLayer({ ...base, id: "benefit", kicker: "٩٠ يومًا من الانتظام", title: "الفرق يبدأ من الجذور" } as CreativeSpec);
  writeFileSync(join(OUT, "ov-benefit.png"), benefit);

  // 2) Carte d'offre (frame opaque de fin) — offre sur le plan résultat.
  const offer = await renderCreative({
    ...base, id: "offer", scenePath: join(REPO, "assets/hair-result.webp"),
    title: "عبوة ٣ قوارير", offer: { price: "139 ر.س", compareAt: "185", badge: "الدفع عند الاستلام" },
  } as CreativeSpec);
  writeFileSync(join(OUT, "ov-offer.png"), offer);
  await closeBrowser();

  // 3) Segments (chacun 4s / 3.5s, 1080x1920, 24fps, cuts francs).
  const segA = join(OUT, "seg-a.mp4"), segB = join(OUT, "seg-b.mp4"), segC = join(OUT, "seg-c.mp4");
  await ff(["-i", SHOT_A, "-i", join(OUT, "ov-hook.png"),
    "-filter_complex", `[0:v]${FIT},setpts=PTS-STARTPTS[v];[v][1:v]overlay=0:0[o]`,
    "-map", "[o]", "-an", "-t", "4", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", segA]);
  await ff(["-i", SHOT_B, "-i", join(OUT, "ov-benefit.png"),
    "-filter_complex", `[0:v]${FIT},setpts=PTS-STARTPTS[v];[v][1:v]overlay=0:0[o]`,
    "-map", "[o]", "-an", "-t", "4", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", segB]);
  await ff(["-loop", "1", "-i", join(OUT, "ov-offer.png"), "-t", "3.5",
    "-vf", FIT, "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", segC]);

  // 4) Concat cuts francs.
  const montage = join(OUT, "MONTAGE-mechat-15s.mp4");
  await ff(["-i", segA, "-i", segB, "-i", segC,
    "-filter_complex", "[0:v][1:v][2:v]concat=n=3:v=1:a=0[v]",
    "-map", "[v]", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-movflags", "+faststart", montage]);

  console.log(`✓ Montage → ${montage}`);
}
main().catch((e) => { console.error("ÉCHEC:", e instanceof Error ? e.message : e); process.exit(1); });
