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

// ————— Monde 3 : l'essence (le ruban d'huile + ingrédients → la bouteille se forme) —————
// Transition PROPRE depuis le monde de la femme (match-cut mèche→ruban). Preuve du « 100% naturel ».
const ESSENCE_STILL =
  "Premium beauty-commercial macro, deep warm dark background with a soft golden glow. A single luminous ribbon of glossy deep red-gold hair oil flows and curves diagonally through the center of the frame like liquid silk, echoing the shape of a shining hair strand. Suspended around it in mid-air, floating in slow motion: dried deep-red hibiscus petals, green henna leaves and small natural seeds. Fine golden light particles, warm rim light, very shallow depth of field, glossy and appetizing, photorealistic, luxurious. Absolutely NO bottle, NO product, NO text. 9:16 vertical.";
const ESSENCE_MOTION =
  "The luminous ribbon of red-gold oil flows and weaves gracefully through the suspended hibiscus petals and henna leaves in elegant slow motion; the natural ingredients swirl and melt into the stream; then the oil gathers and pours downward and coalesces, and FROM the pouring oil a glass bottle assembles and forms — the clear glass fills from the bottom with the deep red oil, a red-white-and-gold label wraps onto it and a white ribbed cap settles on top and seals it; the finished closed bottle floats gently and glows in the warm golden light, hibiscus petals settling around it. Elegant, magical, luxurious, slow. No text.";
// Matière : le vrai produit est une bouteille en PLASTIQUE opaque (pas verre). Clause réutilisée.
const PLASTIC =
  "CRITICAL MATERIAL: the bottle is made of OPAQUE RED PLASTIC exactly like the reference — a smooth semi-matte PET plastic bottle with a solid deep-red body and a white ribbed plastic screw cap. Do NOT render it as transparent glass, do NOT add glass refraction, crystal transparency, visible internal liquid surface or a glass meniscus. Same solid plastic look as the reference. ";
// La VRAIE bouteille (master exact) posée/flottant dans le monde chaud de l'essence (fleurs de كركديه).
const ESSENCE_FID =
  "Place THIS EXACT bottle (reference image) upright and centered, floating and glowing in a warm dark golden scene, surrounded by red hibiscus flowers and drifting petals with fine golden light particles, soft warm rim light, subtle glow beneath it. " +
  PLASTIC +
  "Copy the label EXACTLY from the reference: the deep red band with the gold wavy line, the white label, the arabic text (المشاط للشعر and the small arabic benefit lines), '250 ml', the golden '100% Natural' seal, the white ribbed cap, the deep red color. Do NOT invent, replace or garble ANY text on the label. Do not add latin text. The bottle is large, upright, sharp and clearly readable. Photorealistic, premium beauty commercial, 9:16 vertical.";
const ESSENCE_REAL_MOTION =
  "The closed bottle rests gently, floating in the warm golden light; a soft highlight glides slowly across the glass, fine golden dust drifts upward and a few dried hibiscus petals settle softly around it. The bottle stays perfectly still and 100% identical to the image — do not change its label, shape, text or colors. Elegant, luxurious, slow, premium. No text.";
// Effet « vide qui se remplit » sur le VRAI produit : bouteille OUVERTE (bouchon retiré) et VIDE,
// prête à recevoir l'huile. Seule modif autorisée = le bouchon (retiré). Étiquette/forme/dimensions/plastique intactes.
const ESSENCE_EMPTY =
  "Show THIS EXACT product bottle (reference image) OPEN and EMPTY, floating upright and centered in a warm dark golden scene with red hibiscus flowers, drifting petals and fine golden particles, warm rim light. " +
  PLASTIC +
  "The bottle is IDENTICAL to the reference in shape, dimensions and label — copy the label EXACTLY: the deep red band with the gold wavy line, the white label, the arabic text (المشاط للشعر and the small benefit lines), '250 ml', the golden '100% Natural' seal. Do NOT invent or garble ANY text. The ONLY differences: the white ribbed cap is REMOVED and floats gently just above the open bottle neck, and the bottle is EMPTY inside (pale translucent empty plastic, NO red oil yet), waiting to be filled. A luminous ribbon of red-gold oil hovers just above the open mouth, about to pour in. Photorealistic, premium beauty commercial, 9:16 vertical.";
const ESSENCE_FILL_MOTION =
  "The luminous ribbon of red-gold oil pours down into the open empty bottle; the deep red oil fills the bottle steadily from the bottom up until it is completely full; then the white ribbed cap gently descends and settles onto the neck, sealing the bottle closed; the finished full bottle glows softly in the warm golden light as hibiscus petals settle around it. Throughout, the bottle's LABEL, SHAPE, DIMENSIONS, plastic material and every letter of the arabic text stay 100% identical to the image — do not change, move or garble the label. Elegant, magical, luxurious, slow. No text.";
// MORPH : la bouteille se DISSOUT en ruban d'huile (départ = vrai produit). Lu à l'ENVERS au montage
// → le ruban se rassemble et devient EXACTEMENT le produit (dernière image = master pristine, zéro invention).
// Mouvement (départ = VRAI produit) : une fine PEAU d'huile rouge se moule SUR le produit en épousant
// exactement sa forme et son étiquette, puis se décolle et s'enroule en ruban qui s'en va. Lu à l'ENVERS
// → le ruban revient, se MOULE en peau sur le produit, puis la coulée SE RETIRE et révèle le produit
// propre dessous (dernière image = master pristine → fidélité garantie, moulage sur le produit lui-même).
const ESSENCE_MORPH_MOTION =
  "Start on the exact product bottle. In elegant slow motion a thin glossy skin of DEEP TRANSLUCENT GARNET-RED oil — the exact dark ruby-red of the oil inside the product (NOT amber, NOT orange, NOT gold, NOT caramel, NOT metallic) — forms and molds TIGHTLY ONTO the bottle, perfectly hugging its exact shape and wrapping over its label like a wet coat of oil; then this oil skin lifts and peels off the bottle and unwinds upward into a single thick S-shaped ribbon of deep red oil that swirls away among floating green henna leaves and red hibiscus petals, until the bottle is gone and only the flowing red oil ribbon remains in the warm soft light. Glossy wet realistic oil, real-liquid physics, seamless continuous motion, mass conserved, no splashing. Photorealistic. No text.";

// ————— Monde 4 : le marbre (présentation produit, révélation en profondeur 1→3) —————
const MARBLE_TRIO =
  "Place THREE identical bottles of THIS EXACT product (reference image) on a polished white-and-grey marble surface, arranged receding into DEPTH along a gentle diagonal: the HERO bottle front-center, slightly forward, large and tack-sharp; the second and third staggered behind it to the right, progressively softer in a shallow cinematic depth of field. Premium dimensional 3D product-photography look, warm dramatic low side lighting with a soft golden beam, gentle mirror reflections of the bottles on the polished marble, dried red hibiscus petals and green henna leaves artfully scattered between the bottles for depth, fine golden dust in the air, deep warm dark background with a subtle golden glow. " +
  PLASTIC +
  "Each bottle 100% identical to the reference: shape, the deep red band with the gold wavy line, the white label, EVERY letter of the arabic text (المشاط للشعر and the small benefit lines), '250 ml', the golden '100% Natural' seal, white ribbed cap, deep red color. Do NOT invent, replace or garble ANY label text. Keep generous empty space in the TOP third for later text. Photorealistic, cinematic, 9:16 vertical.";
const MARBLE_MOTION =
  "Slow luxurious cinematic camera pull-back with a gentle focus rack across depth: at first the hero front bottle fills the attention, tack-sharp, while the ones behind are soft; as the camera eases back the focus travels deeper and the second, then the third bottle come into crisp focus one after another — revealing three identical bottles standing on the marble like a premium display. A warm beam of golden light sweeps slowly across the scene from left to right making the marble and the bottles gleam; fine golden dust drifts upward; one or two hibiscus petals fall gently and land softly on the marble. The bottles stay perfectly still and 100% identical to the image — do not change their labels, shapes, text or colors. Elegant, premium, slow, majestic. No text.";

// Repense de la planche INITIALE (essence-still) : le ruban d'origine coule et se MOULE en forme de
// bouteille (huile pure, aucun libellé à inventer), puis on révèle le VRAI produit dessous.
const ESSENCE_SHAPE_MOTION =
  "The luminous ribbon of deep translucent garnet-red oil keeps flowing and gathers together in the center of the frame, pouring down and MOLDING itself into the silhouette of a bottle — a glossy bottle-shaped column of deep ruby-red oil forming among the floating red hibiscus petals and green henna leaves; the oil surface then settles and calms into that bottle shape. Deep red realistic wet oil (not amber, not gold), warm soft light, photorealistic, seamless continuous liquid motion, mass conserved. No text.";
// Remplace la bouteille d'huile MOULÉE (forme vide) par le VRAI produit, DANS la même scène/position.
const ESSENCE_SHAPE_FID =
  "Replace the bottle-shaped form of red oil in this image with THIS EXACT product bottle (second reference image), in the SAME position, upright and centered, same size, standing among the same splashing red oil, floating red hibiscus petals, green henna leaves and golden particles, with the same warm dark background and reflection below. " +
  PLASTIC +
  "Copy the label EXACTLY from the reference: the deep red band with the gold wavy line, the white label, the arabic text (المشاط للشعر and the small benefit lines), '250 ml', the golden '100% Natural' seal, the white ribbed cap, the deep red color. Do NOT invent, replace or garble ANY text. The bottle is large, upright, sharp and clearly readable. Photorealistic, premium beauty commercial, 9:16 vertical.";
const ESSENCE_SHAPE_REAL_MOTION =
  "The remaining film of oil settles and drains softly off the bottle, revealing the clean product; a soft highlight glides across it, fine golden dust drifts and a few hibiscus petals settle around it. The bottle stays perfectly still and 100% identical to the image — do not change its label, shape, text or colors. Elegant, premium, slow. No text.";
// Dissolution du VRAI produit (scène splash) en ruban → lu à l'ENVERS : la coulée se transforme
// DIRECTEMENT en le produit. Aucune bouteille autre que le produit n'existe à l'écran.
const ESSENCE_SHAPE_MORPH_MOTION =
  "In elegant slow motion the whole product bottle gradually melts and dissolves from the top downward, its cap and label melting last, turning entirely into a single continuous flowing ribbon of DEEP TRANSLUCENT GARNET-RED oil (NOT amber, NOT gold, NOT caramel) that streams upward and swirls gracefully among the splashing oil, floating red hibiscus petals and green henna leaves, until only the flowing red oil ribbon and the splash remain in the warm golden light. Realistic wet oil, real-liquid physics, one seamless continuous morph, mass conserved. Photorealistic. No text.";

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

// ————— Génération des nouveaux mondes (essence + marbre) —————
async function essenceStill() {
  const kie = new KieProvider({ apiKey: kieKey() });
  console.log(`Solde ${await kie.credits()} · essence still (~4cr)`);
  const gen = await kie.generateImage({ model: "google/nano-banana", prompt: ESSENCE_STILL, aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-still.png"));
  console.log(`✓ ${gen.costCredits}cr → essence-still.png`);
}
async function essenceClip() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · essence clip (~60cr)`);
  if (bal < 60) throw new Error(`Solde insuffisant (${bal} < 60)`);
  const url = await kie.uploadFile(join(OUT, "essence-still.png"));
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: ESSENCE_MOTION, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-clip.mp4"));
  console.log(`✓ ${gen.costCredits}cr → essence-clip.mp4`);
}
// essence-fix : génère la VRAIE bouteille (master, plastique) dans le monde chaud de l'essence.
//   Édition depuis le MASTER seul (pas la frame verre) → fidélité matière plastique préservée.
async function essenceFix() {
  const { loadProductKit } = await import("@studio/agents");
  const kit = loadProductKit(REPO);
  const kie = new KieProvider({ apiKey: kieKey() });
  console.log(`Solde ${await kie.credits()} · essence-real (master→monde essence, plastique) (~4cr)`);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));
  const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt: ESSENCE_FID, imageUrls: [masterUrl], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-real.png"));
  console.log(`✓ ${gen.costCredits}cr → essence-real.png`);
}
async function essenceRealClip() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · essence-real clip (~60cr)`);
  if (bal < 60) throw new Error(`Solde insuffisant (${bal} < 60)`);
  const url = await kie.uploadFile(join(OUT, "essence-real.png"));
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: ESSENCE_REAL_MOTION, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-real-clip.mp4"));
  console.log(`✓ ${gen.costCredits}cr → essence-real-clip.mp4`);
}
// essence-empty : la VRAIE bouteille ouverte + vide (bouchon retiré) prête à être remplie.
async function essenceEmpty() {
  const { loadProductKit } = await import("@studio/agents");
  const kit = loadProductKit(REPO);
  const kie = new KieProvider({ apiKey: kieKey() });
  console.log(`Solde ${await kie.credits()} · essence-empty (vraie bouteille ouverte/vide) (~4cr)`);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));
  const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt: ESSENCE_EMPTY, imageUrls: [masterUrl], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-empty.png"));
  console.log(`✓ ${gen.costCredits}cr → essence-empty.png`);
}
// essence-fill-clip : effet « vide qui se remplit » — l'huile remplit la vraie bouteille, le bouchon scelle.
async function essenceFillClip() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · essence-fill clip (~60cr)`);
  if (bal < 60) throw new Error(`Solde insuffisant (${bal} < 60)`);
  const url = await kie.uploadFile(join(OUT, "essence-empty.png"));
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: ESSENCE_FILL_MOTION, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-fill-clip.mp4"));
  console.log(`✓ ${gen.costCredits}cr → essence-fill-clip.mp4`);
}
// essence-shape-clip : anime la PLANCHE INITIALE (essence-still) — le ruban se moule en forme de bouteille.
async function essenceShapeClip() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · essence-shape clip (~60cr)`);
  if (bal < 60) throw new Error(`Solde insuffisant (${bal} < 60)`);
  if (!existsSync(join(OUT, "essence-still.png"))) throw new Error("essence-still.png manquant");
  const url = await kie.uploadFile(join(OUT, "essence-still.png"));
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: ESSENCE_SHAPE_MOTION, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-shape-clip.mp4"));
  console.log(`✓ ${gen.costCredits}cr → essence-shape-clip.mp4`);
}
// essence-shape-fix <t> : dans la scène MOULÉE, remplace la bouteille d'huile vide par le VRAI produit.
async function essenceShapeFix(t: string) {
  const { loadProductKit } = await import("@studio/agents");
  const kit = loadProductKit(REPO);
  const src = join(OUT, "essence-shape-clip.mp4");
  if (!existsSync(src)) throw new Error("essence-shape-clip.mp4 manquant");
  const frame = join(OUT, "essence-shape-frame.png");
  await ff(["-ss", t, "-i", src, "-frames:v", "1", frame]);
  const kie = new KieProvider({ apiKey: kieKey() });
  console.log(`Solde ${await kie.credits()} · essence-shape-fix @ ${t}s (produit dans la scène moulée) (~4cr)`);
  const sceneUrl = await kie.uploadFile(frame);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));
  const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt: ESSENCE_SHAPE_FID, imageUrls: [sceneUrl, masterUrl], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-shape-real.png"));
  console.log(`✓ ${gen.costCredits}cr → essence-shape-real.png`);
}
// essence-shape-morph-clip : dissout le VRAI produit (scène splash) en ruban puis INVERSE →
// la coulée se transforme directement en le produit (dernière image = produit fidèle en place).
async function essenceShapeMorphClip() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · essence-shape-morph clip (~60cr)`);
  if (bal < 60) throw new Error(`Solde insuffisant (${bal} < 60)`);
  if (!existsSync(join(OUT, "essence-shape-real.png"))) throw new Error("essence-shape-real.png manquant (lancer essence-shape-fix)");
  const url = await kie.uploadFile(join(OUT, "essence-shape-real.png"));
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: ESSENCE_SHAPE_MORPH_MOTION, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-shape-morph-raw.mp4"));
  await ff(["-i", join(OUT, "essence-shape-morph-raw.mp4"), "-vf", "reverse", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", join(OUT, "essence-shape-morph.mp4")]);
  console.log(`✓ ${gen.costCredits}cr → essence-shape-morph.mp4 (inversé : coulée → produit)`);
}
async function essenceShapeRealClip() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · essence-shape-real clip (~60cr)`);
  if (bal < 60) throw new Error(`Solde insuffisant (${bal} < 60)`);
  const url = await kie.uploadFile(join(OUT, "essence-shape-real.png"));
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: ESSENCE_SHAPE_REAL_MOTION, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-shape-real-clip.mp4"));
  console.log(`✓ ${gen.costCredits}cr → essence-shape-real-clip.mp4`);
}
// essence-morph-clip : la bouteille se dissout en ruban (départ = essence-real.png) PUIS on inverse
// → essence-morph.mp4 = le ruban se rassemble et devient exactement le produit.
async function essenceMorphClip() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · essence-morph clip (~60cr)`);
  if (bal < 60) throw new Error(`Solde insuffisant (${bal} < 60)`);
  if (!existsSync(join(OUT, "essence-real.png"))) throw new Error("essence-real.png manquant (lancer essence-fix)");
  const url = await kie.uploadFile(join(OUT, "essence-real.png"));
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: ESSENCE_MORPH_MOTION, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "essence-morph-raw.mp4"));
  // Inversion : ruban → produit (dernière image = master pristine).
  await ff(["-i", join(OUT, "essence-morph-raw.mp4"), "-vf", "reverse", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", join(OUT, "essence-morph.mp4")]);
  console.log(`✓ ${gen.costCredits}cr → essence-morph-raw.mp4 (dissolution) + essence-morph.mp4 (inversé : ruban→produit)`);
}
async function marbleTrio() {
  const { loadProductKit } = await import("@studio/agents");
  const kit = loadProductKit(REPO);
  const kie = new KieProvider({ apiKey: kieKey() });
  console.log(`Solde ${await kie.credits()} · marble trio (~4cr)`);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));
  const gen = await kie.generateImage({ model: "google/nano-banana-edit", prompt: MARBLE_TRIO, imageUrls: [masterUrl], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "marble-trio.png"));
  console.log(`✓ ${gen.costCredits}cr → marble-trio.png`);
}
async function marbleClip() {
  const kie = new KieProvider({ apiKey: kieKey(), pollTimeoutMs: 8 * 60_000 });
  const bal = await kie.credits();
  console.log(`Solde ${bal} · marble clip (~60cr)`);
  if (bal < 60) throw new Error(`Solde insuffisant (${bal} < 60)`);
  const url = await kie.uploadFile(join(OUT, "marble-trio.png"));
  const gen = await kie.generateVideo({ model: "veo3_fast", prompt: MARBLE_MOTION, imageUrls: [url], aspectRatio: "9:16" });
  if (!gen.ok || !gen.urls[0]) throw new Error(`échec: ${gen.error}`);
  await dl(gen.urls[0], join(OUT, "marble-clip.mp4"));
  console.log(`✓ ${gen.costCredits}cr → marble-clip.mp4`);
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
 * film : assemblage FILM PUR (~20s, sans texte, sans audio) — TROIS MONDES reliés proprement.
 *   Séquence 1 (figée, validée) : femme cheveux ternes → fibre gainée par la goutte → femme transformée.
 *     (zoom-through ADOUCIS : accélération plus douce, fenêtres plus longues, fondu plus long).
 *   → match-cut mèche brillante → RUBAN d'huile (monde de l'essence).
 *   Séquence 2 (essence) : le ruban traverse les ingrédients (كركديه/حنّاء) → la BOUTEILLE se forme.
 *   → coupe propre (fondu court).
 *   Séquence 3 (marbre) : présentation produit, révélation en profondeur 1→3 (rack focus).
 *
 * Réglages coupe/vitesse en tête de fonction (tunables après QA des clips).
 */
async function film() {
  const P = (n: string) => join(OUT, n);
  const durOf = async (f: string) => parseFloat((await exec("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f])).stdout.trim());

  // Zoom-through ADOUCI (séq.1) : accél. douce (exp 1.5), dézoom modéré → fluide, resserré pour ~20s.
  const TAIL = 0.7, HEAD = 0.75, XF = 0.3;
  const ZAMP = 1.7, ZEXP = 1.5;          // amplitude et courbe du zoom de queue (avant : 2.4 / 2.2)
  const HAMP = 2.4, HEXP = 0.85;         // dézoom d'entrée (avant : 2.2 / 0.7)
  const NT = Math.round(TAIL * 24), NH = Math.round(HEAD * 24);

  const body = async (src: string, t0: number, t1: number, speed: number, out: string) =>
    ff(["-i", P(src), "-filter_complex", `[0:v]trim=${t0}:${t1},setpts=(PTS-STARTPTS)/${speed},scale=1080:1920,fps=24[v]`,
      "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", P(out)]);
  const tailZoom = async (src: string, t0: number, t1: number, ax: number, ay: number, out: string) =>
    ff(["-i", P(src), "-filter_complex",
      `[0:v]trim=${t0}:${t1},setpts=PTS-STARTPTS,scale=2160:3840,zoompan=z='1+${ZAMP}*pow(on/${NT},${ZEXP})':x='iw*${ax}-(iw/zoom/2)':y='ih*${ay}-(ih/zoom/2)':d=1:s=1080x1920:fps=24[v]`,
      "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", P(out)]);
  const headZoom = async (src: string, t0: number, t1: number, ax: number, ay: number, out: string) =>
    ff(["-i", P(src), "-filter_complex",
      `[0:v]trim=${t0}:${t1},setpts=PTS-STARTPTS,scale=2160:3840,zoompan=z='max(${1 + HAMP}-${HAMP}*pow(on/${NH},${HEXP}),1.0)':x='iw*${ax}-(iw/zoom/2)':y='ih*${ay}-(ih/zoom/2)':d=1:s=1080x1920:fps=24[v]`,
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

  // ————— SÉQUENCE 1 (figée) : femme → fibre → femme transformée (respiration restaurée) —————
  await body("chain-clip-1.mp4", 0, 3.2, 1.12, "p1.mp4");
  await tailZoom("chain-clip-1.mp4", 3.2, 3.2 + TAIL, 0.40, 0.42, "t1.mp4"); // vers la mèche
  await headZoom("fiber-clip.mp4", 0, HEAD, 0.5, 0.5, "h1.mp4");
  await fuse("t1.mp4", "h1.mp4", "br1.mp4");
  await body("fiber-clip.mp4", HEAD, 4.2, 1.12, "p2.mp4");
  await tailZoom("fiber-clip.mp4", 4.2, 4.2 + TAIL, 0.48, 0.42, "t2.mp4");
  await headZoom("chain-clip-3.mp4", 4.6, 4.6 + HEAD, 0.60, 0.42, "h2.mp4");
  await fuse("t2.mp4", "h2.mp4", "br2.mp4");
  await body("chain-clip-3.mp4", 4.6 + HEAD, 7.2, 1.0, "p3.mp4");            // elle heureuse, cheveux soyeux

  // — pont zoom-through : plonge dans la mèche brillante → ressort sur le héro du marbre —
  await tailZoom("chain-clip-3.mp4", 7.2, 7.2 + TAIL, 0.55, 0.40, "tM.mp4");
  await headZoom("marble-clip.mp4", 0, HEAD, 0.5, 0.55, "hM.mp4");           // dézoom depuis le flacon héro
  await fuse("tM.mp4", "hM.mp4", "brM.mp4");
  await concat(["p1.mp4", "br1.mp4", "p2.mp4", "br2.mp4", "p3.mp4", "brM.mp4"], "seqA.mp4");

  // ————— SÉQUENCE 3 RETRAVAILLÉE (marbre, ~7s) : pull-back + rack focus 1→3 + balayage lumière —————
  await body("marble-clip.mp4", HEAD, 7.8, 1.0, "m1.mp4");

  // ————— Assemblage : chaînage direct (le pont contient déjà la bascule) + grade + fades —————
  const dA = await durOf(P("seqA.mp4"));
  const dM = await durOf(P("m1.mp4"));
  await concat(["seqA.mp4", "m1.mp4"], "seqAB.mp4");
  const total = dA + dM;
  await ff(["-i", P("seqAB.mp4"), "-filter_complex",
    `[0:v]eq=saturation=1.05:contrast=1.02,fade=t=in:st=0:d=0.35,fade=t=out:st=${(total - 0.6).toFixed(2)}:d=0.6[v]`,
    "-map", "[v]", "-an", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-movflags", "+faststart", P("FILM-mechat.mp4")]);
  console.log(`✓ FILM (${total.toFixed(1)}s, muet, sans texte) — séq1 ${dA.toFixed(1)}s · marbre ${dM.toFixed(1)}s → ${P("FILM-mechat.mp4")}`);
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
  if (cmd === "essence-still") return essenceStill();
  if (cmd === "essence-clip") return essenceClip();
  if (cmd === "essence-fix") return essenceFix();
  if (cmd === "essence-real-clip") return essenceRealClip();
  if (cmd === "essence-empty") return essenceEmpty();
  if (cmd === "essence-fill-clip") return essenceFillClip();
  if (cmd === "essence-shape-clip") return essenceShapeClip();
  if (cmd === "essence-shape-fix") return essenceShapeFix(a1);
  if (cmd === "essence-shape-morph-clip") return essenceShapeMorphClip();
  if (cmd === "essence-shape-real-clip") return essenceShapeRealClip();
  if (cmd === "essence-morph-clip") return essenceMorphClip();
  if (cmd === "marble-trio") return marbleTrio();
  if (cmd === "marble-clip") return marbleClip();
  if (cmd === "bridge") return bridge(process.argv.slice(3));
  if (cmd === "film") return film();
  console.error("Usage: still1 | clip <n> | frame <n> <t> | place | trio | join | assemble | fiber-still | fiber-clip | essence-still | essence-clip | marble-trio | marble-clip | bridge | film");
  process.exit(1);
};
run().catch((e) => { console.error("ÉCHEC:", e instanceof Error ? e.message : e); process.exit(1); });
