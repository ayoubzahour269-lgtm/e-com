// SPOT-LUXE — grand spot beauté façon L'Oréal (codes : noir+or, glamour, beat ingrédients,
// packshot cinéma) construit avec la méthode éprouvée : stills art-directés → animation
// SIMPLE par plan (veo3, produit jamais manipulé) → montage cuts + typo cinéma + audio veo.
// Arc (méthode حكاية, angle identité/empowerment du skill ad-creative-studio) :
//   « هذا ليس مجرد شعر » → « بل تاجٌ يُغذّى كل ليلة » → « وصفة الملكات المغربية » → « عنايةٌ تليق بالتاج »
// Phases (QA entre chacune) : stills | animate | montage
// Lancer avec NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { loadProductKit } from "@studio/agents";
import { KieProvider, CostLedger, estimateCost } from "@studio/generation";
import { renderOverlayLayer, closeBrowser, MECHAT_PALETTE, type CreativeSpec } from "@studio/render";

const exec = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");
const PHASE = process.argv[2] || "stills";

// ————— Les 4 plans (stills dark-luxe → motions simples éprouvées) —————
const LUXE = "Premium luxury beauty commercial, deep black studio background with a subtle warm garnet-red glow, dramatic golden rim lighting, fine golden mist particles, cinematic, photorealistic. ";
const FIDELITY = "Integrate THIS EXACT bottle naturally with realistic reflections and matching light — it must look photographed in the scene, not pasted. Keep the product 100% identical to the reference: shape, red-white-gold label, EVERY letter of the arabic label text, the '250 ml' and the '100% Natural' seal, white screw cap, deep red oil color. ";

interface Shot {
  id: string;
  still: string; // prompt image
  motion: string; // prompt animation (subtile — jamais de manipulation produit)
  needsMaster?: boolean; // compositing du produit exact
  dur: number; // durée au montage (s)
}
const SHOTS: Shot[] = [
  {
    id: "flip",
    still: LUXE + "A woman seen from BEHIND, long voluminous dark brown hair caught mid-flip, strands suspended in the air catching the golden light, elegant silk blouse, no face visible.",
    motion: "The suspended hair settles in ultra slow motion, strands floating down gently, golden particles drifting, light shimmering along the strands. Camera locked, elegant, luxurious. The woman stays still.",
    dur: 3,
  },
  {
    id: "macro",
    still: LUXE + "Extreme macro: a single glistening drop of deep red-gold oil suspended above a rippling dark oil surface, dried hibiscus petals and henna leaves artfully floating, shallow depth of field.",
    motion: "The droplet falls in extreme slow motion into the oil surface creating a soft golden ripple, petals sway gently, light glints. Macro luxury beauty shot.",
    dur: 3,
  },
  {
    id: "shine",
    still: LUXE + "Glossy dark brown wavy hair filling the frame like flowing silk, a wave of warm golden light sweeping across the ultra-shiny healthy strands.",
    motion: "A wave of golden light sweeps slowly across the hair from right to left, the strands shimmer and undulate very subtly like silk in a gentle breeze.",
    dur: 3,
  },
  {
    id: "pack",
    still: FIDELITY + LUXE + "The bottle stands on a round black marble pedestal, scattered dried hibiscus petals at its base, golden dust floating, majestic packshot composition. Keep generous empty negative space in the TOP third for text.",
    motion: "Very slow cinematic push-in toward the bottle, golden particles drift upward, a subtle light shimmer travels across the glass. The bottle stays perfectly still and 100% identical to the image — do not change its label, shape or colors. No text.",
    needsMaster: true,
    dur: 5,
  },
];

// ————— Typo (une phrase connectée traverse le spot) —————
const base = { format: "story_9x16", template: "cinema", lang: "ar", dir: "rtl", palette: MECHAT_PALETTE, titleFont: "amiri", brandLine: "زيت المشاط الأحمر" } as const;
const BEATS: Record<string, Partial<CreativeSpec>> = {
  flip: { title: "هذا ليس مجرد شعر" },
  macro: { title: "بل تاجٌ يُغذّى كل ليلة" },
  shine: { kicker: "مشاط · كركديه · حنّاء", title: "وصفة الملكات المغربية" },
  pack: {
    kicker: "الدفع عند الاستلام",
    title: "عنايةٌ تليق بالتاج",
    offer: { price: "139 ر.س", compareAt: "185", badge: "٣ قوارير" },
    subtitle: "اطلبي الآن",
  },
};

function kieKey(): string {
  const m = readFileSync(join(REPO, "secrets.env"), "utf8").match(/KIE_API_KEY\s*=\s*(\S+)/);
  if (!m) throw new Error("KIE_API_KEY absent");
  return m[1];
}
async function dl(url: string, file: string) {
  const res = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!res.ok) throw new Error(`download ${res.status}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}
async function ff(args: string[]) {
  await exec("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { maxBuffer: 1 << 26 });
}
async function hasAudio(file: string): Promise<boolean> {
  try {
    const { stdout } = await exec("ffprobe", ["-v", "error", "-select_streams", "a", "-show_entries", "stream=codec_type", "-of", "csv=p=0", file]);
    return stdout.trim().length > 0;
  } catch { return false; }
}

async function stills() {
  const kie = new KieProvider({ apiKey: kieKey() });
  const ledger = new CostLedger();
  const bal = await kie.credits();
  const need = SHOTS.length * estimateCost("google/nano-banana-edit"); // 4cr/still (edit et banana même prix)
  console.log(`Solde ${bal} · besoin stills ~${need}`);
  if (bal < need) throw new Error(`Solde insuffisant (${bal} < ${need})`);

  const kit = loadProductKit(REPO);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));

  for (const s of SHOTS) {
    process.stdout.write(`still ${s.id}… `);
    try {
      const gen = await kie.generateImage({
        model: s.needsMaster ? "google/nano-banana-edit" : "google/nano-banana",
        prompt: s.still,
        imageUrls: s.needsMaster ? [masterUrl] : [],
        aspectRatio: "9:16",
      });
      ledger.record({ model: gen.model, credits: gen.costCredits, taskId: gen.taskId, ok: gen.ok });
      if (!gen.ok || !gen.urls[0]) { console.log(`échec (${gen.error})`); continue; }
      await dl(gen.urls[0], join(OUT, `luxe-${s.id}.png`));
      console.log(`ok (${gen.costCredits}cr)`);
    } catch (e) { console.log(`erreur (${e instanceof Error ? e.message : e})`); }
  }
  console.log(`Crédits stills : ${ledger.total()} · → QA visuelle puis phase "animate"`);
}

async function animate() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const ledger = new CostLedger();
  const bal = await kie.credits();
  const need = SHOTS.length * estimateCost("veo3_fast");
  console.log(`Solde ${bal} · besoin animation ~${need}`);
  if (bal < need) throw new Error(`Solde insuffisant (${bal} < ${need})`);

  for (const s of SHOTS) {
    const still = join(OUT, `luxe-${s.id}.png`);
    if (!existsSync(still)) { console.log(`skip ${s.id} (pas de still)`); continue; }
    process.stdout.write(`animate ${s.id}… `);
    try {
      const url = await kie.uploadFile(still);
      const gen = await kie.generateVideo({ model: "veo3_fast", prompt: s.motion, imageUrls: [url], aspectRatio: "9:16" });
      ledger.record({ model: gen.model, credits: gen.costCredits, taskId: gen.taskId, ok: gen.ok });
      if (!gen.ok || !gen.urls[0]) { console.log(`échec (${gen.error})`); continue; }
      await dl(gen.urls[0], join(OUT, `luxe-${s.id}.mp4`));
      console.log(`ok (${gen.costCredits}cr)`);
    } catch (e) { console.log(`erreur (${e instanceof Error ? e.message : e})`); }
  }
  console.log(`Crédits animation : ${ledger.total()} · → QA frames puis phase "montage"`);
}

async function montage() {
  // Couches typo cinéma.
  for (const s of SHOTS) {
    const layer = await renderOverlayLayer({ ...base, id: s.id, ...BEATS[s.id] } as CreativeSpec);
    writeFileSync(join(OUT, `ov-luxe-${s.id}.png`), layer);
  }
  await closeBrowser();

  // Segments : overlay + trim, AUDIO VEO CONSERVÉ (anullsrc si absent).
  const FIT = "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920";
  const segs: string[] = [];
  for (const s of SHOTS) {
    const src = join(OUT, `luxe-${s.id}.mp4`);
    if (!existsSync(src)) throw new Error(`Manque ${src} — lancer la phase "animate"`);
    const seg = join(OUT, `seg-luxe-${s.id}.mp4`);
    const audio = await hasAudio(src);
    const args = ["-i", src, "-i", join(OUT, `ov-luxe-${s.id}.png`)];
    if (!audio) args.push("-f", "lavfi", "-t", String(s.dur), "-i", "anullsrc=r=44100:cl=stereo");
    args.push(
      "-filter_complex", `[0:v]${FIT},setpts=PTS-STARTPTS[v];[v][1:v]overlay=0:0[o]`,
      "-map", "[o]", "-map", audio ? "0:a" : "2:a",
      "-t", String(s.dur), "-r", "24", "-pix_fmt", "yuv420p",
      "-c:v", "libx264", "-c:a", "aac", "-ar", "44100", seg
    );
    await ff(args);
    segs.push(seg);
  }

  // Concat cuts francs + fades (in/out vidéo, fade-out audio).
  const total = SHOTS.reduce((s, x) => s + x.dur, 0);
  const spot = join(OUT, "SPOT-LUXE-mechat.mp4");
  await ff([
    ...segs.flatMap((s) => ["-i", s]),
    "-filter_complex",
    `${segs.map((_, i) => `[${i}:v][${i}:a]`).join("")}concat=n=${segs.length}:v=1:a=1[cv][ca];` +
      `[cv]fade=t=in:st=0:d=0.4,fade=t=out:st=${(total - 0.7).toFixed(1)}:d=0.7[v];` +
      `[ca]afade=t=out:st=${(total - 1).toFixed(1)}:d=1[a]`,
    "-map", "[v]", "-map", "[a]", "-pix_fmt", "yuv420p",
    "-c:v", "libx264", "-c:a", "aac", "-movflags", "+faststart", spot,
  ]);
  console.log(`✓ SPOT (${total}s, audio veo) → ${spot}`);
}

const phases: Record<string, () => Promise<void>> = { stills, animate, montage };
const run = phases[PHASE];
if (!run) { console.error(`Phase inconnue: ${PHASE} (stills|animate|montage)`); process.exit(1); }
run().catch((e) => { console.error("ÉCHEC:", e instanceof Error ? e.message : e); process.exit(1); });
