// SPOT-CHAIN — plan-séquence par CHAÎNAGE DE FRAMES (fluidité réelle, zéro coupe visible).
// Chaque clip est généré À PARTIR de la dernière frame (au point de coupe choisi) du clip
// précédent → la 1re image du plan N+1 = la dernière du plan N → le flux est continu.
// Monde unique : sa chambre/coiffeuse, lumière chaude du soir (identification DR, pas studio).
//
// Commandes (itératives, QA entre chaque maillon) :
//   still1                 → still d'ouverture (femme, mèche terne, coiffeuse)
//   clip <n>               → génère le clip n depuis sa source (still1 ou chain-frame-<n-1>)
//   frame <n> <t>          → extrait la frame de chaînage du clip n au temps t (source du clip n+1)
//   join <t1> [t2] [t3]... → assemble les clips (coupés aux points de chaînage) pour juger la fluidité
// Lancer avec NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { KieProvider, estimateCost } from "@studio/generation";

const exec = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

// Monde unique (répété dans chaque prompt pour verrouiller lumière/lieu).
const WORLD =
  "Warm intimate bedroom vanity scene, soft golden evening lamp light, cozy realistic premium feel, cinematic shallow depth of field, photorealistic. ";

const STILL1 =
  WORLD +
  "A young woman seen from behind at her wooden vanity table, her soft reflection slightly out of focus in the mirror, she holds a strand of her FLAT, DULL, lifeless straight hair between her fingers and looks at it with subtle frustration. The hair looks limp and tired but not ugly. Elegant modest home clothing. 9:16 vertical.";

// Prompts de mouvement par clip (le clip n démarre sur la frame de chaînage n-1).
const MOTIONS: Record<number, string> = {
  1: "The woman gently lifts the dull strand and lets it fall — it drops limply, without life. She sighs softly. The camera pushes in VERY slowly toward the strand between her fingers. Warm intimate realistic scene, subtle motion only, no text.",
  2: "Continuing the same shot: a single glistening drop of deep red-gold oil falls from above in slow motion and lands on the held strand; on impact a soft wave of warm golden light starts traveling along the strand; a few tiny dried hibiscus petals drift in the warm air. The camera continues its slow push-in. Same scene, same light, no text.",
  3: "Continuing the same shot: the golden stream from above fades away; the burst of warm golden light travels along the strand and through the hair; behind the light the dull strands turn glossy, silky, full of life; the transformation spreads through the whole head of hair while the camera slowly pulls back; the hair becomes voluminous and shiny; the glow gently dissipates at the end. Same scene, same light, no text.",
  4: "Continuing the same shot: she runs her fingers through her now silky voluminous shiny hair and turns her head with a soft happy smile seen in profile; the hair sways with life in the warm light; at the very end her hair sweeps across and fills the frame. Same scene, same light, no text.",
  5: "The camera pushes in slowly and smoothly toward the bottle standing on the wooden vanity table; the focus shifts gently onto the bottle; a few tiny dried hibiscus petals drift in the warm lamp light; the woman with her beautiful silky hair stays softly blurred in the background. The bottle stays perfectly still and 100% identical — do not change its label, shape or colors. Same scene, same light, no text.",
};

// ————— Monde 2 : la fibre (plan mécanisme façon CGI beauté) —————
const FIBER_STILL =
  "Extreme macro shot, CGI-beauty-commercial style: ONE single human hair fiber crossing the frame diagonally from lower-left to upper-right, its surface DRY and rough with lifted cuticle scales like dry bark, slightly frizzy micro-fibers. Dark warm blurred background with faint golden bokeh (warm bedroom tones). Dramatic warm side light. Photorealistic, premium hair-science advertising macro. 9:16.";
const FIBER_MOTION =
  "Macro locked on the dry rough hair fiber: a single glistening red-gold oil drop lands gently on the fiber and glides slowly along it, coating it; where the drop passes, the lifted rough scales VISIBLY close flat and seal, the frizzy micro-fibers smooth down and disappear, and the fiber surface becomes perfectly sleek, uniform and mirror-glossy like a polished silk thread. By the end the ENTIRE fiber is completely smooth and sealed — absolutely no frizz or rough texture left — radiant in the warm light. Elegant, slow, luxurious. No text.";

// Fidélité produit pour les stills d'édition (flacon exact ajouté à la scène).
const FID =
  "Add THIS EXACT bottle (second reference image) standing on the wooden vanity table in the foreground, among her perfumes, with a few tiny dried hibiscus petals and henna leaves around its base. Keep EVERYTHING else in the scene pixel-identical: the woman, her hair, the mirror, the lamp, the light. CRITICAL: copy the bottle's label EXACTLY from the reference image — the deep red band with the gold wavy line, the white label, the arabic text (المشاط للشعر and the small arabic benefit lines), '250 ml', the golden '100% Natural' seal. Do NOT invent, replace or garble ANY text on the label. Do not add latin text. Deep red oil color, white ribbed cap. The bottle stands FIRMLY on the table surface (not at the edge), well inside the table, with a soft realistic contact shadow beneath it; the petals lie flat on the wood around its base. The bottle is reasonably large in the foreground, upright, sharp and clearly readable. Photorealistic.";
const FID_TRIO =
  "Replace the single bottle with THREE identical bottles of the same product standing side by side in a neat row on the wooden vanity table, the center one slightly forward. Each bottle 100% identical to the reference: shape, red-white-gold label, arabic text, '250 ml', '100% Natural' seal, white cap. Keep everything else in the scene identical. Photorealistic.";

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

async function still1() {
  const kie = new KieProvider({ apiKey: kieKey() });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · still d'ouverture (~4cr)`);
  const gen = await kie.generateImage({ model: "google/nano-banana", prompt: STILL1, aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "chain-still-1.png"));
  console.log(`✓ ${gen.costCredits}cr → chain-still-1.png`);
}

async function clip(n: number) {
  const motion = MOTIONS[n];
  if (!motion) throw new Error(`Pas de motion pour le clip ${n}`);
  const source =
    n === 1 ? join(OUT, "chain-still-1.png")
    : n === 5 ? join(OUT, "chain-bottle.png") // le flacon apparu dans la scène (place)
    : join(OUT, `chain-frame-${n - 1}.png`);
  if (!existsSync(source)) throw new Error(`Source manquante: ${source} (générer le still/frame d'abord)`);

  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  const need = estimateCost("veo3_fast");
  console.log(`Solde ${bal} · clip ${n} (~${need}cr) depuis ${source.split("/").pop()}`);
  if (bal < need) throw new Error(`Solde insuffisant (${bal} < ${need})`);

  const url = await kie.uploadFile(source);
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: motion, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, `chain-clip-${n}.mp4`));
  console.log(`✓ ${gen.costCredits}cr → chain-clip-${n}.mp4`);
}

async function frame(n: number, t: string) {
  const src = join(OUT, `chain-clip-${n}.mp4`);
  if (!existsSync(src)) throw new Error(`Clip manquant: ${src}`);
  // PNG pleine résolution = source propre pour le clip suivant (pas d'artefacts de compression).
  await ff(["-ss", t, "-i", src, "-frames:v", "1", join(OUT, `chain-frame-${n}.png`)]);
  console.log(`✓ frame de chaînage clip ${n} @ ${t}s → chain-frame-${n}.png`);
}

async function joinChain(cuts: string[]) {
  // cuts[i] = durée gardée du clip i+1 (= temps de la frame de chaînage utilisée).
  const inputs: string[] = [];
  const trims: string[] = [];
  let idx = 0;
  for (let i = 1; i <= 4; i++) {
    const src = join(OUT, `chain-clip-${i}.mp4`);
    if (!existsSync(src)) break;
    inputs.push("-i", src);
    const dur = cuts[i - 1];
    trims.push(dur
      ? `[${idx}:v]trim=0:${dur},setpts=PTS-STARTPTS[v${idx}];`
      : `[${idx}:v]setpts=PTS-STARTPTS[v${idx}];`);
    idx++;
  }
  if (idx < 2) throw new Error("Il faut au moins 2 clips pour juger la fluidité.");
  const out = join(OUT, "CHAIN-preview.mp4");
  await ff([
    ...inputs,
    "-filter_complex",
    trims.join("") + Array.from({ length: idx }, (_, i) => `[v${i}]`).join("") + `concat=n=${idx}:v=1:a=0[v]`,
    "-map", "[v]", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-movflags", "+faststart", out,
  ]);
  console.log(`✓ preview chaîné (${idx} clips) → ${out}`);
}

// place <frameN> : ajoute le flacon EXACT à la scène (édition double-référence de la frame).
async function place(frameN: number) {
  const { loadProductKit } = await import("@studio/agents");
  const kit = loadProductKit(REPO);
  const sceneFrame = join(OUT, `chain-frame-${frameN}.png`);
  if (!existsSync(sceneFrame)) throw new Error(`Frame manquante: ${sceneFrame}`);
  const kie = new KieProvider({ apiKey: kieKey() });
  console.log(`Solde ${await kie.credits()} · place bottle (~4cr)`);
  const sceneUrl = await kie.uploadFile(sceneFrame);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));
  const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt: FID, imageUrls: [sceneUrl, masterUrl], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "chain-bottle.png"));
  console.log(`✓ ${gen.costCredits}cr → chain-bottle.png (source du clip 5)`);
}

// trio : transforme la scène flacon en scène TRIO (même monde, 3 flacons exacts).
async function trio() {
  const { loadProductKit } = await import("@studio/agents");
  const kit = loadProductKit(REPO);
  const bottleStill = join(OUT, "chain-bottle.png");
  if (!existsSync(bottleStill)) throw new Error("chain-bottle.png manquant (lancer place d'abord)");
  const kie = new KieProvider({ apiKey: kieKey() });
  console.log(`Solde ${await kie.credits()} · trio (~4cr)`);
  const sceneUrl = await kie.uploadFile(bottleStill);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));
  const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt: FID_TRIO, imageUrls: [sceneUrl, masterUrl], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "chain-trio.png"));
  console.log(`✓ ${gen.costCredits}cr → chain-trio.png`);
}

// assemble : montage final — chaînage direct (pixels identiques) + micro-fondus 0.35s
// uniquement aux 2 apparitions magiques (flacon, duplication) + typo + audio + grade.
async function assemble() {
  const { renderOverlayLayer, closeBrowser, MECHAT_PALETTE } = await import("@studio/render");
  const base = { format: "story_9x16", template: "cinema", lang: "ar", dir: "rtl", palette: MECHAT_PALETTE, titleFont: "amiri", brandLine: "زيت المشاط الأحمر" } as const;

  // Textes par segment (policy-safe, repris de la landing).
  const OVS: { id: string; spec: Record<string, unknown> }[] = [
    { id: "s1", spec: { title: "شعرٌ باهت بلا حياة؟" } },
    { id: "s2", spec: { title: "قطرة واحدة من الطبيعة" } },
    { id: "s3", spec: { title: "فتعود الكثافة واللمعان" } },
    { id: "s4", spec: { kicker: "مشاط · كركديه · حنّاء", title: "طبيعي 100% بلا بارابين" } },
    { id: "s5", spec: { kicker: "الدفع عند الاستلام", title: "عبوة العلاج — ٣ قوارير · ٣ أشهر", offer: { price: "139 ر.س", compareAt: "185", badge: "توصيل 24-48h" }, subtitle: "اطلبي الآن" } },
  ];
  for (const o of OVS) {
    const layer = await renderOverlayLayer({ ...base, id: o.id, ...o.spec } as never);
    writeFileSync(join(OUT, `ov-chain-${o.id}.png`), layer);
  }
  await closeBrowser();

  // Segments : [source, trimEnd, vitesse, overlay]
  const SEGS: [string, number, number, string][] = [
    ["chain-clip-1.mp4", 4.0, 1.25, "s1"],
    ["chain-clip-2.mp4", 4.5, 1.15, "s2"],
    ["chain-clip-3.mp4", 7.8, 1.0, "s3"],
    ["chain-clip-5.mp4", 6.2, 1.1, "s4"],
  ];
  const segFiles: string[] = [];
  for (let i = 0; i < SEGS.length; i++) {
    const [src, end, speed, ov] = SEGS[i];
    const out = join(OUT, `segc-${i + 1}.mp4`);
    await ff(["-i", join(OUT, src), "-i", join(OUT, `ov-chain-${ov}.png`),
      "-filter_complex",
      `[0:v]trim=0:${end},setpts=(PTS-STARTPTS)/${speed},scale=1080:1920[v0];[v0][1:v]overlay=0:0[v];` +
      `[0:a]atrim=0:${end},asetpts=PTS-STARTPTS,atempo=${speed}[a]`,
      "-map", "[v]", "-map", "[a]", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-c:a", "aac", "-ar", "44100", out]);
    segFiles.push(out);
  }

  // Segment 5 : zoompan du trio — part du GROS PLAN (raccord avec la fin du clip 5)
  // et dézoome → les 3 flacons se révèlent (la duplication). + silence audio.
  const seg5 = join(OUT, "segc-5.mp4");
  const D5 = 3.8, F5 = Math.round(D5 * 24);
  await ff(["-loop", "1", "-i", join(OUT, "chain-trio.png"), "-i", join(OUT, "ov-chain-s5.png"),
    "-f", "lavfi", "-t", String(D5), "-i", "anullsrc=r=44100:cl=stereo",
    "-filter_complex",
    `[0:v]scale=2160:3840,zoompan=z='max(2.2-1.2*on/${F5},1.0)':x='iw*0.30-(iw/zoom/2)':y='ih*0.62-(ih/zoom/2)':d=${F5}:s=1080x1920:fps=24[vz];[vz][1:v]overlay=0:0[v]`,
    "-map", "[v]", "-map", "2:a", "-t", String(D5), "-pix_fmt", "yuv420p", "-c:v", "libx264", "-c:a", "aac", seg5]);
  segFiles.push(seg5);

  // Durées réelles
  const durs: number[] = [];
  for (const f of segFiles) {
    const { stdout } = await exec("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]);
    durs.push(parseFloat(stdout.trim()));
  }

  // Pass 1 : segments 1-3 chaînés (pixels identiques aux coupes → concat direct).
  const partA = join(OUT, "partA.mp4");
  await ff(["-i", segFiles[0], "-i", segFiles[1], "-i", segFiles[2],
    "-filter_complex", "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]",
    "-map", "[v]", "-map", "[a]", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-c:a", "aac", partA]);
  const dA = durs[0] + durs[1] + durs[2];

  // Pass 2 : apparition du flacon (xfade 0.35 — tout est identique sauf le flacon → magie).
  const partB = join(OUT, "partB.mp4");
  await ff(["-i", partA, "-i", segFiles[3],
    "-filter_complex",
    `[0:v][1:v]xfade=transition=fade:duration=0.35:offset=${(dA - 0.35).toFixed(2)}[v];[0:a][1:a]acrossfade=d=0.35[a]`,
    "-map", "[v]", "-map", "[a]", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-c:a", "aac", partB]);
  const dB = dA - 0.35 + durs[3];

  // Pass 3 : duplication (xfade 0.35 gros plan → gros plan du trio) + grade + fades.
  const total = dB - 0.35 + durs[4];
  const final = join(OUT, "SPOT-CHAIN-mechat.mp4");
  await ff(["-i", partB, "-i", segFiles[4],
    "-filter_complex",
    `[0:v][1:v]xfade=transition=fade:duration=0.35:offset=${(dB - 0.35).toFixed(2)}[vx];` +
    `[vx]eq=saturation=1.06:contrast=1.02,fade=t=in:st=0:d=0.35,fade=t=out:st=${(total - 0.7).toFixed(2)}:d=0.7[v];` +
    `[0:a][1:a]acrossfade=d=0.35[ax];[ax]afade=t=out:st=${(total - 1).toFixed(2)}:d=1[a]`,
    "-map", "[v]", "-map", "[a]", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-c:a", "aac", "-movflags", "+faststart", final]);
  console.log(`✓ SPOT-CHAIN (${total.toFixed(1)}s) → ${final}`);
}

// fiber-still / fiber-clip : le monde macro du cheveu (plan mécanisme).
async function fiberStill() {
  const kie = new KieProvider({ apiKey: kieKey() });
  console.log(`Solde ${await kie.credits()} · fiber still (~4cr)`);
  const gen = await kie.generateImage({ model: "google/nano-banana", prompt: FIBER_STILL, aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "fiber-still.png"));
  console.log(`✓ ${gen.costCredits}cr → fiber-still.png`);
}
async function fiberClip() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · fiber clip (~60cr)`);
  if (bal < 60) throw new Error(`Solde insuffisant (${bal} < 60)`);
  const url = await kie.uploadFile(join(OUT, "fiber-still.png"));
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: FIBER_MOTION, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "fiber-clip.mp4"));
  console.log(`✓ ${gen.costCredits}cr → fiber-clip.mp4`);
}

/**
 * bridge : preuve du ZOOM-THROUGH — fin du plan A accélérée en zoom vers une cible
 * (easing quadratique), entrée du plan B en dézoom symétrique, bascule xfade zoomin
 * de 0.25s AU PIC DE VITESSE (l'œil est dans le flou de mouvement).
 * Usage: bridge <A.mp4> <tA_start> <tA_cut> <ax> <ay> <B.mp4> <tB_body_end> <out.mp4>
 */
async function bridge(args: string[]) {
  const [A, tA0, tA1, ax, ay, B, tB1, outName] = args;
  const TAIL = 0.6, HEAD = 0.7, XF = 0.25;
  const aTail = join(OUT, "_atail.mp4"), bHead = join(OUT, "_bhead.mp4"), aBody = join(OUT, "_abody.mp4");
  const NT = Math.round(TAIL * 24), NH = Math.round(HEAD * 24);

  // Corps de A (avant l'accélération), à vitesse légèrement soutenue.
  await ff(["-i", join(OUT, A), "-filter_complex",
    `[0:v]trim=${tA0}:${(parseFloat(tA1) - TAIL).toFixed(2)},setpts=(PTS-STARTPTS)/1.12,scale=1080:1920[v]`,
    "-map", "[v]", "-an", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", aBody]);
  // Queue de A : zoom accéléré vers la cible (ax,ay normalisés).
  await ff(["-i", join(OUT, A), "-filter_complex",
    `[0:v]trim=${(parseFloat(tA1) - TAIL).toFixed(2)}:${tA1},setpts=PTS-STARTPTS,scale=2160:3840,` +
    `zoompan=z='1+2.4*pow(on/${NT},2.2)':x='iw*${ax}-(iw/zoom/2)':y='ih*${ay}-(ih/zoom/2)':d=1:s=1080x1920:fps=24[v]`,
    "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", aTail]);
  // Tête de B : dézoom symétrique depuis le centre.
  await ff(["-i", join(OUT, B), "-filter_complex",
    `[0:v]trim=0:${HEAD},setpts=PTS-STARTPTS,scale=2160:3840,` +
    `zoompan=z='max(3.2-2.2*pow(on/${NH},0.7),1.0)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=24[v]`,
    "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", bHead]);
  // Corps de B.
  const bBody = join(OUT, "_bbody.mp4");
  await ff(["-i", join(OUT, B), "-filter_complex",
    `[0:v]trim=${HEAD}:${tB1},setpts=PTS-STARTPTS,scale=1080:1920[v]`,
    "-map", "[v]", "-an", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", bBody]);

  // Assemblage : Abody + (Atail xfade-zoomin Bhead) + Bbody.
  const durProbe = async (f: string) => parseFloat((await exec("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f])).stdout.trim());
  const dBody = await durProbe(aBody), dTail = await durProbe(aTail);
  await ff(["-i", aBody, "-i", aTail, "-i", bHead, "-i", bBody, "-filter_complex",
    `[1:v][2:v]xfade=transition=zoomin:duration=${XF}:offset=${(dTail - XF).toFixed(2)}[mid];` +
    `[0:v][mid][3:v]concat=n=3:v=1:a=0[v]`,
    "-map", "[v]", "-r", "24", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-movflags", "+faststart", join(OUT, outName)]);
  console.log(`✓ bridge → ${join(OUT, outName)} (corps A ${dBody.toFixed(1)}s + whip ${(dTail + HEAD - XF).toFixed(1)}s)`);
}

/**
 * film : assemblage FILM PUR (sans texte, sans audio) — grammaire zoom-through partout.
 * Voyage : chambre → (plonge main) → fibre gainée → (ressort) → elle transformée
 * → [apparition flacon] → poussée flacon → (plonge liquide) → monde de l'huile
 * → (ressort) → trio. Un seul mouvement.
 */
async function film() {
  const P = (n: string) => join(OUT, n);
  const durOf = async (f: string) => parseFloat((await exec("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f])).stdout.trim());
  const TAIL = 0.6, HEAD = 0.7, XF = 0.25;
  const NT = Math.round(TAIL * 24), NH = Math.round(HEAD * 24);

  const body = async (src: string, t0: number, t1: number, speed: number, out: string) =>
    ff(["-i", P(src), "-filter_complex", `[0:v]trim=${t0}:${t1},setpts=(PTS-STARTPTS)/${speed},scale=1080:1920,fps=24[v]`,
      "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", P(out)]);
  const tailZoom = async (src: string, t0: number, t1: number, ax: number, ay: number, out: string) =>
    ff(["-i", P(src), "-filter_complex",
      `[0:v]trim=${t0}:${t1},setpts=PTS-STARTPTS,scale=2160:3840,zoompan=z='1+2.4*pow(on/${NT},2.2)':x='iw*${ax}-(iw/zoom/2)':y='ih*${ay}-(ih/zoom/2)':d=1:s=1080x1920:fps=24[v]`,
      "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", P(out)]);
  const headZoom = async (src: string, t0: number, t1: number, ax: number, ay: number, out: string) =>
    ff(["-i", P(src), "-filter_complex",
      `[0:v]trim=${t0}:${t1},setpts=PTS-STARTPTS,scale=2160:3840,zoompan=z='max(3.2-2.2*pow(on/${NH},0.7),1.0)':x='iw*${ax}-(iw/zoom/2)':y='ih*${ay}-(ih/zoom/2)':d=1:s=1080x1920:fps=24[v]`,
      "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", P(out)]);
  const fuse = async (tailF: string, headF: string, out: string) => {
    const d = await durOf(P(tailF));
    await ff(["-i", P(tailF), "-i", P(headF), "-filter_complex",
      `[0:v][1:v]xfade=transition=zoomin:duration=${XF}:offset=${(d - XF).toFixed(2)}[v]`,
      "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", P(out)]);
  };
  const concat = async (files: string[], out: string) => {
    const inputs = files.flatMap((f) => ["-i", P(f)]);
    await ff([...inputs, "-filter_complex",
      files.map((_, i) => `[${i}:v]`).join("") + `concat=n=${files.length}:v=1:a=0[v]`,
      "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", P(out)]);
  };

  // — Monde 1 → fibre —
  await body("chain-clip-1.mp4", 0, 3.4, 1.12, "p1.mp4");
  await tailZoom("chain-clip-1.mp4", 3.4, 4.0, 0.40, 0.42, "t1.mp4");
  await headZoom("fiber-clip.mp4", 0, HEAD, 0.5, 0.5, "h1.mp4");
  await fuse("t1.mp4", "h1.mp4", "br1.mp4");
  // — fibre (gainage) → elle transformée —
  await body("fiber-clip.mp4", HEAD, 5.6, 1.1, "p2.mp4");
  await tailZoom("fiber-clip.mp4", 5.6, 6.2, 0.48, 0.42, "t2.mp4");
  await headZoom("chain-clip-3.mp4", 4.6, 4.6 + HEAD, 0.60, 0.42, "h2.mp4");
  await fuse("t2.mp4", "h2.mp4", "br2.mp4");
  await body("chain-clip-3.mp4", 4.6 + HEAD, 7.8, 1.0, "p3.mp4");
  await concat(["p1.mp4", "br1.mp4", "p2.mp4", "br2.mp4", "p3.mp4"], "partA.mp4");

  // — flacon (apparition) → liquide → trio —
  await body("chain-clip-5.mp4", 0, 5.6, 1.15, "p4.mp4");
  await tailZoom("chain-clip-5.mp4", 5.6, 6.2, 0.38, 0.56, "t3.mp4");
  await headZoom("luxe-macro.mp4", 0, HEAD, 0.5, 0.5, "h3.mp4");
  await fuse("t3.mp4", "h3.mp4", "br3.mp4");
  await body("luxe-macro.mp4", HEAD, 2.8, 1.1, "p5.mp4");
  await tailZoom("luxe-macro.mp4", 2.8, 3.4, 0.5, 0.5, "t4.mp4");
  // Trio : dézoom long depuis le corps rouge du flacon avant → révélation des 3.
  const D6 = 3.5, F6 = Math.round(D6 * 24);
  await ff(["-loop", "1", "-i", P("chain-trio.png"), "-t", String(D6), "-filter_complex",
    `[0:v]scale=2160:3840,zoompan=z='max(3.2-2.2*pow(on/${F6},0.6),1.0)':x='iw*0.30-(iw/zoom/2)':y='ih*0.60-(ih/zoom/2)':d=${F6}:s=1080x1920:fps=24[v]`,
    "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", P("trio-move.mp4")]);
  await fuse("t4.mp4", "trio-move.mp4", "br4.mp4");
  await concat(["p4.mp4", "br3.mp4", "p5.mp4", "br4.mp4"], "partB.mp4");

  // — Apparition du flacon (fondu court, tout le décor identique) + grade + fades —
  const dA = await durOf(P("partA.mp4"));
  const dB = await durOf(P("partB.mp4"));
  const total = dA - 0.3 + dB;
  await ff(["-i", P("partA.mp4"), "-i", P("partB.mp4"), "-filter_complex",
    `[0:v][1:v]xfade=transition=fade:duration=0.3:offset=${(dA - 0.3).toFixed(2)}[vx];` +
    `[vx]eq=saturation=1.05:contrast=1.02,fade=t=in:st=0:d=0.3,fade=t=out:st=${(total - 0.6).toFixed(2)}:d=0.6[v]`,
    "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-movflags", "+faststart", P("FILM-mechat.mp4")]);
  console.log(`✓ FILM (${total.toFixed(1)}s, muet, sans texte) → ${P("FILM-mechat.mp4")}`);
}

const [cmd, a1, a2] = process.argv.slice(2);
const run = async () => {
  if (cmd === "still1") return still1();
  if (cmd === "clip") return clip(Number(a1));
  if (cmd === "frame") return frame(Number(a1), a2);
  if (cmd === "place") return place(Number(a1));
  if (cmd === "trio") return trio();
  if (cmd === "join") return joinChain(process.argv.slice(3));
  if (cmd === "assemble") return assemble();
  if (cmd === "fiber-still") return fiberStill();
  if (cmd === "fiber-clip") return fiberClip();
  if (cmd === "bridge") return bridge(process.argv.slice(3));
  if (cmd === "film") return film();
  console.error("Usage: still1 | clip <n> | frame <n> <t> | place | trio | join | assemble | fiber-still | fiber-clip | bridge | film");
  process.exit(1);
};
run().catch((e) => { console.error("ÉCHEC:", e instanceof Error ? e.message : e); process.exit(1); });
