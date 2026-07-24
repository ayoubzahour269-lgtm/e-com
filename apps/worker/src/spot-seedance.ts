// SPOT-SEEDANCE — pipeline pub 15-20s à partir de 3 planches storyboard (30 frames) via Kie.ai Seedance 2.
//
// Modèle : bytedance/seedance-2-fast · endpoints jobs/createTask + jobs/recordInfo (confirmés docs.kie.ai).
// Adaptation documentée : Seedance limite à 9 images de réf et les modes sont exclusifs → on pilote chaque
// clip en mode first_frame_url + last_frame_url (bornes de la séquence de 10 frames) + prompt décomposant
// les 10 micro-actions. Sortie 720p 9:16 → upscale propre 1080x1920 à l'assemblage.
//
// Commandes (2 phases, cf. brief) :
//   slice                  → découpe assets/planches/{1,2,3}.* en assets/frames/01..30.png + planche de contrôle
//   plan                   → PHASE A : dry-run, payloads + output/reports/generation_manifest.json (0 crédit, 0 tâche)
//   gen <1|2|3>            → PHASE B : lance le clip n sur Seedance, télécharge output/raw/clip_0n.mp4
//   assemble               → normalise 1080x1920@30 + concat + hold packshot → output/final/ad_oman_17s_1080x1920.mp4
//   contact <mp4>          → planche de contrôle extraite d'une vidéo
// Lancer avec NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { KieProvider } from "@studio/generation";

const exec = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const APP = join(HERE, "..");
const PLANCHES = join(APP, "assets", "planches"); // déposer ici : 1.*, 2.*, 3.*
const FRAMES = join(APP, "assets", "frames");
const OUT_RAW = join(APP, "output", "raw");
const OUT_PROC = join(APP, "output", "processed");
const OUT_FINAL = join(APP, "output", "final");
const REPORTS = join(APP, "output", "reports");
for (const d of [FRAMES, OUT_RAW, OUT_PROC, OUT_FINAL, REPORTS]) mkdirSync(d, { recursive: true });

const API = "https://api.kie.ai/api/v1";
const MODEL = "bytedance/seedance-2-fast";
const RESOLUTION = "720p"; // Seedance : 480p|720p (pas de 1080p natif) → upscale à l'assemblage
const ASPECT = "9:16";

// ————— Les 3 clips : plage de frames (ordre imposé), durée, prompt (brief) —————
interface Clip { n: number; range: [number, number]; dur: number; prompt: string; }
const CLIPS: Clip[] = [
  {
    n: 1, range: [1, 10], dur: 5,
    prompt:
      "Create a 5-second premium vertical 9:16 Gulf beauty-commercial sequence using the supplied storyboard images in their exact chronological order (frames 01 through 10). The images are successive micro-actions of ONE continuous narrative, not unrelated shots. ACTION: an adult Omani woman comes in from the warm outdoors into a cool elegant Omani interior; a gentle AC breeze moves only a few strands of her long dark-brown hair; she notices the ends look slightly dry, touches them naturally, checks them in the mirror, then looks toward the exact supplied red-and-white hair-oil bottle on the vanity. CAMERA: medium tracking on her entrance, movement-matched cut across the doorway, subtle curved move toward the mirror, medium to close-up, a short macro insert on the hair ends, finishing on a controlled rack focus from her eyes to the product bottle. TRANSITIONS: preserve direction of movement between frames, match-on-action when the hand moves to the hair, eyeline match when she looks to the bottle, motivated camera, shallow DoF, short focus pulls; do NOT dissolve or morph body, face, hair or product; angle changes must feel like deliberate editorial cuts from multiple cinema cameras. CONTINUITY: same clearly adult woman, same face, same hair length, same cream robe with burgundy embroidery, same room, same vanity, same warm golden light; the AC breeze is subtle and realistic; do not exaggerate the hair condition. STYLE: premium Gulf hair-care ad, high-end cinema camera, natural skin texture, 35mm lens language, soft highlight roll-off, warm burgundy/cream/gold palette, realistic shadows, shallow DoF, restrained motion. PRODUCT LOCK: the bottle stays identical to the supplied master reference — white screw cap, exact red-and-white label, red amber liquid, unchanged proportions; do not redesign, simplify or translate the label. No text, subtitles, logo, dialogue or voiceover; no hair-growth transformation, no medical claim, no excessive wind, no warped hands, no face morphing, no bottle morphing.",
  },
  {
    n: 2, range: [11, 20], dur: 6,
    prompt:
      "Create a 6-second premium vertical 9:16 Gulf beauty-commercial sequence using the supplied storyboard images in their exact chronological order (frames 11 through 20). These decompose ONE precise product-handling action into successive micro-movements. ACTION: the same adult Omani woman slowly reaches toward the exact supplied hair-oil bottle; her fingers approach, contact and close naturally around it; she lifts it slightly from the vanity; her second hand approaches the white screw cap; she stabilizes the bottle, rotates the cap through several small realistic movements, fully unscrews it, lifts the cap vertically and begins tilting the open bottle toward her other palm. CAMERA: over-the-shoulder medium-close, into a close product-hand interaction, subtle lateral slider during the reach, cut on hand contact to a tighter 50mm close-up, an 85mm macro during the cap rotation, a very small orbit around the bottle keeping the label readable, ending on a close three-quarter angle as the bottle begins to tilt above the palm. TRANSITIONS: every cut preserves hand position and direction of motion; match-on-action between reach, grip, lift, cap rotation and tilt; never teleport fingers or bottle; no cross-dissolves during hand manipulation; no AI morphing between angles; clean editorial cuts between synchronized cinema cameras. HAND PHYSICS: natural five-finger anatomy, stable grip, realistic wrist movement, the cap rotates around the bottle central axis, the bottle does not bend/inflate/change volume, the label stays attached and stable, the cap is a removable white screw cap (never flip cap or dropper). PRODUCT LOCK: the supplied product reference is an immutable identity — exact silhouette, exact red-and-white label, exact Arabic design, exact red amber liquid, exact white screw cap; do not invent another product. CONTINUITY: same woman, face, wardrobe, manicure, room, vanity and lighting; consistent screen direction. STYLE: luxury Gulf cosmetic cinematography, controlled macro focus pulls, realistic reflections, warm golden highlights, premium burgundy accents, smooth restrained motion. No advertising text, subtitles, dialogue, voiceover or generated logo; no deformed fingers, disappearing cap, additional bottle, dropper, pump, label distortion or liquid spill.",
  },
  {
    n: 3, range: [21, 30], dur: 6,
    prompt:
      "Create a 6-second premium vertical 9:16 Gulf beauty-commercial sequence using the supplied storyboard images in their exact chronological order (frames 21 through 30): oil dosage, application, natural cosmetic result and final three-bottle product offer. ACTION: begin with the same open bottle tilted carefully over the woman's palm; one small amount of red-amber oil reaches the palm with realistic fluid physics; she returns the bottle upright, distributes the product between her hands and gently applies it through the hair lengths and ends; a clean editorial transition to the naturally groomed result — controlled frizz, smoother texture, restrained natural shine; her hair moves softly as she turns; then a progressive transition to a product-only packshot of exactly three identical bottles. CAMERA: extreme macro of the bottle opening and palm, a short rack focus from the oil to the product label, a cut on hand movement to a close application shot through the lengths, a gentle downward slide following her hand, a cut to a medium three-quarter beauty shot for the natural reveal, a subtle slow arc around her hair during the turn, a composition-matched cut from the vertical hair silhouette to the vertical bottle silhouette, finishing on a very slow push-in toward the three-bottle packshot. TRANSITIONS: match-on-action during dosage and application; a directional hair-swipe cut only if it does not obscure or deform the product; a clean composition match to introduce the offer; do NOT morph the woman into the product shot; do NOT morph one bottle into three — the three bottles must already exist as three stable physical objects when revealed. RESULT: credible and subtle — smoother grooming, controlled flyaways, natural shine only; do not change hair length, density, face, body or identity; no hair-growth claim, no extreme before/after. FINAL OFFER: the last portion shows ONLY the product offer — exactly three identical 250 ml bottles, no woman, no hands, no boxes, no price; keep the three bottles stable and facing camera; preserve the supplied final composition as closely as possible; leave clean negative space for Arabic offer text to be added later. PRODUCT LOCK: every bottle identical to the master — exact shape, cap, label, Arabic artwork, colors, proportions and liquid; no generic substitute, no altered packaging. STYLE: premium Gulf beauty campaign, warm cream stone pedestal, red hibiscus styling, burgundy and gold palette, high-end cinema lighting, realistic reflections, controlled DoF, elegant commercial grading. No generated text, subtitles, dialogue, voiceover or watermark; no product distortion, extra bottles, floating objects, warped labels, excessive shine or aggressive camera motion.",
  },
];

function kieKey(): string {
  const m = readFileSync(join(REPO, "secrets.env"), "utf8").match(/KIE_API_KEY\s*=\s*(\S+)/);
  if (!m) throw new Error("KIE_API_KEY absent");
  return m[1];
}
function authHeaders(json = true): Record<string, string> {
  const h: Record<string, string> = { Authorization: `Bearer ${kieKey()}` };
  if (json) h["Content-Type"] = "application/json";
  return h;
}
function pick(obj: unknown, path: string[]): unknown {
  let cur: unknown = obj;
  for (const k of path) { if (cur && typeof cur === "object" && k in (cur as Record<string, unknown>)) cur = (cur as Record<string, unknown>)[k]; else return undefined; }
  return cur;
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function ff(args: string[]) { await exec("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { maxBuffer: 1 << 27 }); }
async function probeWH(file: string): Promise<[number, number]> {
  const { stdout } = await exec("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=s=x:p=0", file]);
  const [w, h] = stdout.trim().split("x").map(Number);
  return [w, h];
}
async function dl(url: string, file: string) {
  const res = await fetch(url, { signal: AbortSignal.timeout(180_000) });
  if (!res.ok) throw new Error(`download ${res.status}`);
  const ct = res.headers.get("content-type") ?? "";
  if (!/video|mp4|octet-stream/i.test(ct)) console.warn(`  ⚠ MIME inattendu: ${ct}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

// ————— slice : 3 planches (grille 5×2, bordures rouges) → 30 frames + planche de contrôle —————
function findPlanche(i: number): string {
  if (!existsSync(PLANCHES)) throw new Error(`Dossier manquant: ${PLANCHES} — y déposer les 3 planches nommées 1.*, 2.*, 3.*`);
  const hit = readdirSync(PLANCHES).find((f) => new RegExp(`^${i}\\.(png|jpg|jpeg|webp)$`, "i").test(f));
  if (!hit) throw new Error(`Planche ${i} introuvable dans ${PLANCHES} (attendu ${i}.png|jpg|jpeg|webp)`);
  return join(PLANCHES, hit);
}
async function slice() {
  const COLS = 5, ROWS = 2, INSET = 0.008; // rogne la bordure rouge (~0.8% de la cellule)
  for (let p = 1; p <= 3; p++) {
    const src = findPlanche(p);
    const [W, H] = await probeWH(src);
    const cw = W / COLS, ch = H / ROWS;
    const ix = Math.round(cw * INSET), iy = Math.round(ch * INSET);
    for (let idx = 0; idx < COLS * ROWS; idx++) {
      const col = idx % COLS, row = Math.floor(idx / COLS);
      const num = (p - 1) * 10 + idx + 1;
      const x = Math.round(col * cw) + ix, y = Math.round(row * ch) + iy;
      const cropW = Math.round(cw) - 2 * ix, cropH = Math.round(ch) - 2 * iy;
      // Découpe sans étirement (crop pur), puis center-crop 9:16 pour le format vertical de la pub.
      const out = join(FRAMES, `${String(num).padStart(2, "0")}.png`);
      await ff(["-i", src, "-vf",
        `crop=${cropW}:${cropH}:${x}:${y},crop='min(iw,ih*9/16)':'min(ih,iw*16/9)'`,
        "-frames:v", "1", out]);
    }
    console.log(`✓ planche ${p} (${W}x${H}) → frames ${(p - 1) * 10 + 1}..${p * 10}`);
  }
  // Planche de contrôle numérotée (6 col × 5 rangées = 30) pour vérifier l'ordre AVANT de dépenser.
  const labeled: string[] = [];
  for (let n = 1; n <= 30; n++) {
    const f = join(FRAMES, `${String(n).padStart(2, "0")}.png`);
    const lab = join(REPORTS, `_lab-${n}.png`);
    await ff(["-i", f, "-vf",
      `scale=240:-1,pad=iw:ih+34:0:34:black,drawtext=text='${String(n).padStart(2, "0")}':x=6:y=4:fontcolor=white:fontsize=26`,
      lab]);
    labeled.push(lab);
  }
  const rows: string[] = [];
  for (let r = 0; r < 5; r++) {
    const rowImgs = labeled.slice(r * 6, r * 6 + 6);
    const rf = join(REPORTS, `_row-${r}.png`);
    await ff([...rowImgs.flatMap((f) => ["-i", f]), "-filter_complex", `${rowImgs.map((_, i) => `[${i}:v]`).join("")}hstack=${rowImgs.length}[v]`, "-map", "[v]", rf]);
    rows.push(rf);
  }
  await ff([...rows.flatMap((f) => ["-i", f]), "-filter_complex", `${rows.map((_, i) => `[${i}:v]`).join("")}vstack=${rows.length}[v]`, "-map", "[v]", join(REPORTS, "contact_sheet.jpg")]);
  console.log(`✓ 30 frames → ${FRAMES}\n✓ planche de contrôle → ${join(REPORTS, "contact_sheet.jpg")} (vérifier l'ordre avant Phase B)`);
}

// Payload Seedance d'un clip (mode first+last frame). URLs remplies au moment du gen.
function payload(c: Clip, firstUrl: string, lastUrl: string) {
  return {
    model: MODEL,
    input: {
      prompt: c.prompt,
      first_frame_url: firstUrl,
      last_frame_url: lastUrl,
      aspect_ratio: ASPECT,
      duration: c.dur,
      resolution: RESOLUTION,
    },
  };
}
const framePath = (n: number) => join(FRAMES, `${String(n).padStart(2, "0")}.png`);

// ————— plan : PHASE A (0 crédit, 0 tâche) — payloads + manifest —————
async function plan() {
  const manifest: Record<string, unknown> = {
    model: MODEL, endpoint: `${API}/jobs/createTask`, poll: `${API}/jobs/recordInfo`,
    resolution: RESOLUTION, aspect: ASPECT, format: "1080x1920 @30fps (upscale à l'assemblage)",
    adaptation: "10 frames/clip > 9 max & modes exclusifs → mode first_frame_url + last_frame_url + prompt décomposant les 10 micro-actions",
    clips: [] as unknown[], createdAt: new Date().toISOString(),
  };
  const missing: number[] = [];
  for (let n = 1; n <= 30; n++) if (!existsSync(framePath(n))) missing.push(n);
  if (missing.length) console.warn(`⚠ frames manquantes: ${missing.join(",")} — lancer "slice" d'abord`);
  console.log(`\n=== DRY RUN — ${CLIPS.length} tâches Seedance (aucune envoyée) ===`);
  for (const c of CLIPS) {
    const [a, b] = c.range;
    const pl = payload(c, `<upload:${String(a).padStart(2, "0")}.png>`, `<upload:${String(b).padStart(2, "0")}.png>`);
    (manifest.clips as unknown[]).push({
      clip: c.n, frames: `${a}..${b}`, duration: c.dur, first_frame: framePath(a), last_frame: framePath(b),
      input: { ...pl.input, prompt: `${c.prompt.slice(0, 90)}…` }, taskId: null, state: "pending", url: null, localPath: `output/raw/clip_0${c.n}.mp4`, attempts: 0, error: null,
    });
    console.log(`\n— CLIP ${c.n} (frames ${a}-${b}, ${c.dur}s) —\n  first=${String(a).padStart(2, "0")}.png  last=${String(b).padStart(2, "0")}.png  aspect=${ASPECT}  res=${RESOLUTION}\n  prompt: ${c.prompt.slice(0, 120)}…`);
  }
  writeFileSync(join(REPORTS, "generation_manifest.json"), JSON.stringify(manifest, null, 2));
  const total = CLIPS.reduce((s, c) => s + c.dur, 0);
  console.log(`\nDurée brute cible : ${total}s (5+6+6). Sortie ${RESOLUTION} → upscale 1080x1920@30.`);
  console.log(`Manifest → ${join(REPORTS, "generation_manifest.json")}`);
  console.log(`⚠ Coût crédits Seedance : renvoyé par l'API dans data.creditsConsumed (non documenté d'avance). Vérifier le solde avant "gen".`);
}

// ————— gen <n> : PHASE B — lance le clip n, télécharge le brut —————
async function gen(n: number) {
  const c = CLIPS.find((x) => x.n === n);
  if (!c) throw new Error(`Clip inconnu: ${n} (1|2|3)`);
  const [a, b] = c.range;
  if (!existsSync(framePath(a)) || !existsSync(framePath(b))) throw new Error(`Frames ${a}/${b} manquantes — lancer "slice"`);
  const kie = new KieProvider({ apiKey: kieKey() });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · clip ${c.n} (frames ${a}-${b}, ${c.dur}s) sur ${MODEL}`);
  const firstUrl = await kie.uploadFile(framePath(a));
  const lastUrl = await kie.uploadFile(framePath(b));
  const created = await fetch(`${API}/jobs/createTask`, { method: "POST", headers: authHeaders(), body: JSON.stringify(payload(c, firstUrl, lastUrl)), signal: AbortSignal.timeout(60_000) });
  const cj = (await created.json()) as unknown;
  const taskId = String(pick(cj, ["data", "taskId"]) ?? pick(cj, ["taskId"]) ?? "");
  if (!taskId) throw new Error(`createTask sans taskId: ${JSON.stringify(cj)}`);
  console.log(`  taskId=${taskId} · polling…`);
  const deadline = Date.now() + 12 * 60_000;
  while (Date.now() < deadline) {
    await sleep(6000);
    const info = await (await fetch(`${API}/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`, { headers: authHeaders(false), signal: AbortSignal.timeout(60_000) })).json() as unknown;
    const state = String(pick(info, ["data", "state"]) ?? "");
    if (state === "success") {
      const rjRaw = pick(info, ["data", "resultJson"]);
      const rj = typeof rjRaw === "string" ? JSON.parse(rjRaw) : rjRaw;
      const urls = (pick(rj, ["resultUrls"]) as string[]) ?? [];
      const consumed = pick(info, ["data", "creditsConsumed"]);
      if (!urls[0]) throw new Error(`success sans resultUrls: ${JSON.stringify(info)}`);
      await dl(urls[0], join(OUT_RAW, `clip_0${c.n}.mp4`));
      console.log(`✓ clip ${c.n} → output/raw/clip_0${c.n}.mp4 (crédits: ${consumed})`);
      return;
    }
    if (state === "fail") throw new Error(`state=fail: ${JSON.stringify(pick(info, ["data", "failMsg"]) ?? info)}`);
  }
  throw new Error(`timeout clip ${c.n} (taskId ${taskId})`);
}

// ————— assemble : normalise 1080x1920@30 + concat + hold packshot final —————
async function assemble() {
  const NORM = "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1";
  const norm: string[] = [];
  for (const c of CLIPS) {
    const raw = join(OUT_RAW, `clip_0${c.n}.mp4`);
    if (!existsSync(raw)) throw new Error(`Manque ${raw} — lancer "gen ${c.n}"`);
    const out = join(OUT_PROC, `clip_0${c.n}_normalized.mp4`);
    await ff(["-i", raw, "-vf", NORM, "-r", "30", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-an", out]);
    norm.push(out);
  }
  // Hold ≥1.5s sur le packshot final (dernière frame du clip 3 figée).
  const last = norm[norm.length - 1];
  const hold = join(OUT_PROC, "hold_final.mp4");
  const [, ] = await probeWH(last);
  await ff(["-sseof", "-0.1", "-i", last, "-frames:v", "1", join(OUT_PROC, "_lastframe.png")]);
  await ff(["-loop", "1", "-t", "1.6", "-i", join(OUT_PROC, "_lastframe.png"), "-vf", `${NORM}`, "-r", "30", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-an", hold]);
  const seq = [...norm, hold];
  const listFile = join(OUT_PROC, "concat.txt");
  writeFileSync(listFile, seq.map((f) => `file '${f}'`).join("\n"));
  const final = join(OUT_FINAL, "ad_oman_17s_1080x1920.mp4");
  await ff(["-f", "concat", "-safe", "0", "-i", listFile, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "30", "-movflags", "+faststart", final]);
  const { stdout } = await exec("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", final]);
  console.log(`✓ FINAL (${parseFloat(stdout).toFixed(1)}s, 1080x1920@30) → ${final}`);
  await contact(final);
}

async function contact(mp4: string) {
  const { stdout } = await exec("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp4]);
  const dur = parseFloat(stdout);
  const shots: string[] = [];
  for (let i = 0; i < 6; i++) {
    const t = (dur * (i + 0.5)) / 6;
    const f = join(REPORTS, `_c-${i}.png`);
    await ff(["-ss", t.toFixed(2), "-i", mp4, "-frames:v", "1", "-vf", "scale=320:-1", f]);
    shots.push(f);
  }
  await ff([...shots.flatMap((f) => ["-i", f]), "-filter_complex", `${shots.map((_, i) => `[${i}:v]`).join("")}hstack=${shots.length}[v]`, "-map", "[v]", join(REPORTS, "final_contact_sheet.jpg")]);
  console.log(`✓ planche de contrôle finale → ${join(REPORTS, "final_contact_sheet.jpg")}`);
}

const [cmd, a1] = process.argv.slice(2);
const run = async () => {
  if (cmd === "slice") return slice();
  if (cmd === "plan") return plan();
  if (cmd === "gen") return gen(Number(a1));
  if (cmd === "assemble") return assemble();
  if (cmd === "contact") return contact(a1);
  console.error("Usage: slice | plan | gen <1|2|3> | assemble | contact <mp4>");
  process.exit(1);
};
run().catch((e) => { console.error("ÉCHEC:", e instanceof Error ? e.message : e); process.exit(1); });
