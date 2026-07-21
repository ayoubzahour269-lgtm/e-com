# Video Model Dialect Map — one storyboard, five engines

> **What this file is.** A translation reference for the prompt compiler
> (`26-kie-prompt-builder`) and the format-router (`31-format-router`). The studio
> writes ONE model-agnostic storyboard; each Kie video engine speaks a different
> *dialect* of prompt. This doc is the phrasebook: how Veo3 / Veo3-fast, Kling,
> Runway, Hailuo and Seedance each want camera, motion, audio and i2v keyframe
> instructions phrased — their strengths, their tells, and how to render the same
> beat correctly into each.
>
> **Read alongside:** `config/kie-models.yaml` (capability + credit routing —
> authoritative on which model, this doc is authoritative on *how to phrase*),
> `knowledge/undetectable-realism-doctrine.md`, `knowledge/gulf-beauty-brand-norms.md`,
> `products/<slug>/product-lock.yaml` (the active product identity).
>
> **Scope:** hero-video-ad, lp-microvideo, lp-3d-banner — every asset that moves.
> Product is ALWAYS reference-conditioned via an approved keyframe (route R3). No
> engine here is ever asked to invent the bottle from text.

---

## 0. Laws that survive translation (never dropped by any dialect)

These are invariant. Every dialect below inherits them; if a phrasing choice
conflicts with one of these, the law wins.

1. **i2v only for product beats — never t2v.** Any shot whose subject is the
   product starts from the ONE approved, QC-passed keyframe that already contains
   the real bottle (built image-first on a draft image model, per V2 §7bis R3).
   The video engine animates the *scene and the camera*, it never redraws the
   vessel frame-by-frame. t2v is permitted ONLY for a product-free plate (an empty
   majlis, steam, a hand with no bottle) that the product is later composited into.
2. **Arabic text is NEVER in the motion prompt.** Headline / CTA / price / label
   copy are added in post (`37-typography-compositor` + `54-motion-graphics-compositor`).
   Do not ask any engine to render Arabic — all five are `arabic_text: poor/na`.
   Referencing on-screen words in a prompt wastes credits and invites gibberish.
3. **Realism is the acceptance axis.** Every dialect must carry the anti-tell
   payload: real optics (DoF, bokeh, motion blur, grain, subtle handheld), physically
   correct oil viscosity/flow, natural hair dynamics with flyaways. "Clean, perfect,
   smooth, CGI" phrasing is an anti-goal — see §7 negative dialects.
4. **Gulf-native framing survives the port.** Default is hands + hair + back-of-head,
   NO face (tradition B, `gulf-beauty-brand-norms.md`). The camera/motion verbs
   change per engine; the *framing intent* does not.
5. **One final render.** Iterate on the cheap tier (veo3-fast / hailuo / seedance /
   kling-std) until QC ≥ 95 and fidelity gate (`41`) passes; spend the final tier
   (veo3 / runway / kling-pro) exactly once.

---

## 1. The canonical storyboard (what you translate FROM)

The compiler receives a beat in this model-agnostic intermediate form. Every dialect
section below maps THESE fields into that engine's phrasing.

```yaml
beat:
  id: B2-pour
  keyframe: products/mechat-red-oil/keyframes/B2-approved.png   # R3 source, contains real bottle
  duration_s: 4
  subject: "warm reddish-brown hair oil drawn through a section of dark hair, back-of-head"
  product_role: "held in frame lower-left, label face-on, static in hand"   # from product-lock
  camera:
    shot: medium-close, 85mm-equivalent
    move: slow push-in 3cm + 2° tilt down
    dof: shallow, focus on the oil sheen, background falloff
  motion:
    primary: "oil drips slowly, high-viscosity, catches warm practical light"
    secondary: "a few hair flyaways drift, hand fingers steady"
    speed: languid / ritual pace
  light: warm amber practical, low key, single window-left source
  mood: heritage, intimate, unhurried
  audio_intent: "soft room tone, a single low oud note, faint fabric rustle; NO music spike"
  loop: false            # true → first frame must match last (lp-microvideo)
  negatives_ref: prompt-builders/negative-bank.md#video-master
```

Fields drive the port: `camera.*` → the engine's camera grammar; `motion.*` → its
motion grammar; `audio_intent` → §6; `keyframe` → the i2v input; `loop` → start/end
frame handling (Kling/Seedance) or trim-to-loop in post.

---

## 2. Veo3 (Google) — the cinematic paragraph + native audio

**Route:** R3 i2v final (`cost_tier: final`, high cost). Reserve for the ONE approved
hero. **Max length:** ~8 s. **Reference modes:** i2v (use), t2v (plates only).

**Dialect shape — natural-language cinematic paragraph, front-loaded.** Veo3 rewards a
single dense descriptive paragraph, ordered *subject → action → environment → camera →
light → mood → audio*. It parses filmmaking vocabulary literally: name the lens, the
move, the stock. Do NOT bullet it; Veo3 reads prose best. Put the highest-priority
element (the oil, the hair) in the first clause.

- **Camera grammar:** explicit and it obeys — "slow dolly-in", "85mm lens", "shallow
  depth of field", "handheld micro-shake", "rack focus from the hair to the bottle",
  "35mm film grain". Give ONE dominant move per 8 s; compound moves drift.
- **Motion grammar:** describe physics, not just the noun — "thick oil descends slowly,
  clinging, catching the light" beats "oil pours". Set pace with adverbs
  ("languidly", "unhurried").
- **Audio (the differentiator):** Veo3 generates native synchronized audio. Specify it
  in the prompt as a final clause — "Audio: soft room tone, a single low oud note,
  faint fabric rustle, no music." You can request ambient/foley/tone. Keep VO OUT
  (Arabic VO is recorded/placed in post, `53-sound-design-mixer`); Veo3 speech is not
  label-grade and dialect control is weak. Use its audio for *ambience/foley bed* only,
  or mute and score entirely in post.
- **i2v keyframe usage:** pass the approved keyframe as the first-frame image; the
  paragraph then describes only what MOVES and how the CAMERA moves. Do not re-describe
  the bottle's shape/label/color — the keyframe carries fidelity; re-describing invites
  drift. One line max on the product: "the bottle in hand stays still, label facing
  camera."
- **Strengths:** top realism, real physics, believable oil/liquid, natural light
  falloff, native audio, best highlight roll-off. **Weaknesses:** costliest, 8 s cap,
  Arabic on-screen poor (irrelevant — post), can over-stabilize (add "subtle handheld").

**Worked port (beat B2-pour → Veo3):**
> A section of dark hair, seen from behind, as warm reddish-brown hair oil is slowly
> drawn through it, the high-viscosity oil clinging and catching a warm amber practical
> light; a woman's steady hand holds a slim clear bottle in the lower-left, label facing
> camera, the bottle motionless. Intimate low-key majlis, single soft window light from
> the left, deep wood tones. Camera: 85mm lens, shallow depth of field, a slow 3cm
> push-in with a faint 2° downward tilt, subtle handheld micro-shake, focus on the oil's
> sheen with the background falling soft. 35mm film grain, gentle highlight roll-off,
> unhurried heritage mood. Audio: soft room tone, one low sustained oud note, faint
> fabric rustle, no music.

---

## 3. Veo3-fast (Google) — same dialect, draft economy

**Route:** R3 i2v iterate (`cost_tier: iterate`, medium cost). **Max length:** ~8 s.

**Same grammar as Veo3** (§2) — it is the iteration engine of the Veo family. Use the
identical paragraph; Veo3-fast is where you TEST the move, timing, and framing before
committing the one Veo3 final. Practical differences:

- Slightly lower fidelity — micro-textures (peach fuzz, individual flyaways, oil
  caustics) are softer. Do not judge final realism here; judge composition/motion/pace.
- Keep the SAME paragraph across fast→final so the only variable is fidelity; changing
  wording between tiers wastes the comparison.
- Native audio present but rougher — use fast runs muted (you are checking motion), then
  let Veo3 or post carry final audio.
- **Rule of thumb:** every hero gets ≥1 veo3-fast pass; veo3 is only unlocked after
  veo3-fast composition is locked AND fidelity gate (`41`) would pass. This is the
  draft→final law (§0.5) applied within one family.

---

## 4. Kling (Kuaishou, 2.x) — keyframe-first, start+end frame, LP loop workhorse

**Route:** R3 i2v (`iterate`; kling-pro for hero-`final`). **Max length:** ~10 s.
**Reference modes:** i2v (use), start+end frame (its superpower), t2v (plates only).

**Dialect shape — image-anchored, concise motion instruction.** Kling is the strongest
pure i2v mover and the DEFAULT engine for `lp-microvideo` and `lp-3d-banner` loops. It
wants the keyframe to do the heavy lifting and a SHORT, concrete motion + camera line —
not a Veo-style paragraph. Over-writing Kling causes it to invent motion and drift.

- **Camera grammar:** simpler, keyword-ish — "slow push in", "gentle pan left", "orbit
  15°", "static camera, subject moves". It responds well to a single named move plus an
  intensity word ("subtle", "slow"). Big compound moves are unreliable — keep to one.
- **Motion grammar:** name the physical action and a speed — "oil drips slowly and
  clings", "hair sways gently", "steam rises softly". Kling holds motion coherence very
  well but will exaggerate if you over-describe; be terse.
- **Start + end frame (the reason Kling owns LP loops):** supply BOTH an approved start
  keyframe and an approved end keyframe. For a seamless `lp-microvideo` loop, make the
  END frame identical to the START frame → Kling interpolates a closed loop (oil pour
  that resets, bottle micro-rotation that returns to label-face-on). This is how the
  studio gets 3–5 s loops without an 8 s hero render (credit policy §8, kie-models
  `lp-microvideo`/`lp-3d-banner`).
- **lp-3d-banner nuance:** with a single front reference, restrict to a small
  label-face-on micro-rotation using start+end frames both near label-front (V2 §7bis 3D
  caveat). Full turntable needs multiple real angles — FLAG, don't fake.
- **Audio:** limited/none — score everything in post (`53`). Treat Kling as silent.
- **i2v keyframe usage:** keyframe is authoritative for identity; motion line describes
  only movement. Never describe the bottle.
- **Strengths:** excellent i2v motion coherence, cost-effective, start+end loop control,
  reliable product-in-hand stability. **Weaknesses:** weak audio, less filmic highlight
  handling than Veo, can smooth grain (re-add grain/texture in the colorist pass `52`).

**Worked port (beat B2-pour → Kling, as a 4 s LP loop):**
> Start frame: B2-approved.png. End frame: B2-approved.png (loop).
> Motion: warm oil drips slowly through the hair section and clings; a few hair flyaways
> drift gently; the hand and bottle stay still, label facing camera. Camera: very slow
> push-in, subtle. Warm low-key light. Languid pace.

---

## 5. Runway (Gen-3/4) — director-grade camera control, motion brush

**Route:** R3 i2v (`cost_tier: final`, high cost). **Max length:** ~10 s.
**Reference modes:** i2v (use), t2v (plates only).

**Dialect shape — precise camera-move spec + region-targeted motion.** Runway is the
engine you reach for when the SHOT needs an exact, controllable camera move (a specific
arc, a locked rack focus, a crane) or when motion must be confined to a region while the
rest holds still (motion brush). Prompt it like a camera report, not a mood paragraph.

- **Camera grammar (its strength):** name the move precisely and it executes — "camera
  orbits 20° clockwise around the subject", "slow crane up 10cm", "locked-off, rack focus
  from hair to bottle over 2s", "dolly in, constant speed". Runway's camera obedience is
  the best of the set; exploit it for the deliberate hero move.
- **Motion brush:** mask WHERE motion happens — brush only the oil / only the hair ends /
  only the steam, keep the bottle and hand masked static. This is the cleanest way to
  guarantee the product stays frozen while the scene lives → strong fidelity, minimal
  drift. Use it for any beat where the vessel must not move at all.
- **Motion grammar:** pair each brushed region with a short physical description +
  intensity slider intent ("oil: slow high-viscosity descent, low intensity"; "hair:
  gentle drift, low intensity").
- **Audio:** none/limited — score in post (`53`).
- **i2v keyframe usage:** keyframe + motion-brush masks; text describes moves and
  per-region motion only. Never the bottle's identity.
- **Strengths:** best camera-move precision, motion brush = surgical motion isolation,
  director control. **Weaknesses:** costly, occasional texture-crawl on fine hair (check
  in temporal gate `45`), less "free" naturalism than Veo (it does what you say, so say
  the right imperfections — add handheld, grain intent).

**Worked port (beat B2-pour → Runway):**
> Keyframe: B2-approved.png. Camera: 85mm look, slow constant dolly-in 3cm with a 2°
> downward tilt, shallow depth of field, subtle handheld. Motion brush — oil region: slow
> high-viscosity descent, clings, low intensity. Hair-ends region: gentle drift, low
> intensity. Bottle + hand region: static, no motion. Warm amber low-key light, filmic
> grain, unhurried.

---

## 6. Hailuo (MiniMax) — cheap natural motion for drafts & loops

**Route:** R3 i2v (`cost_tier: draft`, low cost). **Max length:** ~6 s.
**Reference modes:** i2v (use), t2v (plates only).

**Dialect shape — short, plain motion sentence.** Hailuo gives surprisingly natural
motion for its price and is a go-to for cheap motion drafts and simple LP loops. It wants
a brief, plain-language description of the movement and pace — no lens jargon, no
compound choreography.

- **Camera grammar:** keep it minimal — "slow zoom in", "gentle camera drift", or
  "static camera". It has less camera control than Runway/Veo; ambitious moves wander.
  Prefer near-static camera + let the subject motion carry the shot.
- **Motion grammar:** one clear action + speed — "oil drips slowly", "hair sways softly".
  Hailuo's natural-motion bias makes fluids and hair read well cheaply; don't overload it.
- **Audio:** none — post only.
- **i2v keyframe usage:** strong reliance on the keyframe; short motion line. Use for the
  FIRST look at whether a beat moves nicely before spending on Kling/Veo.
- **Strengths:** cheap, natural fluid/hair motion, fast. **Weaknesses:** short (~6 s),
  little camera control, softer detail — never a final hero, ideal for drafts and simple
  ambient loops.

**Worked port (beat B2-pour → Hailuo draft):**
> Keyframe: B2-approved.png. Warm oil drips slowly through the hair and clings; hair sways
> softly; bottle and hand stay still. Camera: very slow zoom in. Warm low light,
> unhurried.

---

## 7. Seedance (ByteDance) — smooth cheap product motion & loops

**Route:** R3 i2v (`cost_tier: draft`, low cost). **Max length:** ~5 s.
**Reference modes:** i2v (use), t2v (plates only).

**Dialect shape — concise action + camera, product-motion friendly.** Seedance produces
smooth, cost-effective motion and is notably good at controlled *product* motion (a clean
bottle micro-rotation, a steady pour), making it a strong cheap engine for `lp-microvideo`
product loops. Phrase like Kling but shorter; it likes concise, concrete instructions.

- **Camera grammar:** simple named moves — "slow orbit", "push in", "static". Keep to one.
- **Motion grammar:** concrete action + smoothness — "bottle rotates slowly and smoothly,
  label returns to front", "oil pours in a smooth steady stream". Seedance's smoothness is
  its edge for clean product loops; lean on it for turntable-style micro-moves.
- **Loop handling:** short (~5 s) and smooth → good for seamless ambient loops; match
  first/last frame intent (or trim-to-loop in post). Pairs with Kling as the two default
  microvideo engines (kie-models `lp-microvideo` draft tier).
- **Audio:** none — post only.
- **i2v keyframe usage:** keyframe-anchored; short motion+camera line.
- **Strengths:** smooth, cheap, good clean product motion, good for loops. **Weaknesses:**
  newest — verify availability live before routing (`verify_live: true`); very short;
  softer fine detail; not a hero final.

**Worked port (beat: bottle micro-rotation for lp-3d-banner → Seedance):**
> Keyframe: packshot-approved.png. The bottle rotates slowly and smoothly a few degrees,
> label returning to face front; oil sways gently inside; soft studio reflection tracks
> the surface. Camera: static. Clean warm key light, smooth, loopable.

---

## 8. Audio strategy per engine

| Engine | Native audio | Studio use of it | Where final audio comes from |
|---|---|---|---|
| Veo3 | Yes, synced | Ambience/foley bed only (room tone, oud note, oil/fabric foley) — NOT VO | Veo3 bed optionally + post mix (`53`) |
| Veo3-fast | Yes, rough | Ignore during iteration (run muted) | Post (`53`) |
| Kling | Limited/none | Treat silent | Post (`53`) |
| Runway | Limited/none | Treat silent | Post (`53`) |
| Hailuo | None | Silent | Post (`53`) |
| Seedance | None | Silent | Post (`53`) |

**Universal rule:** Arabic VO is always recorded/placed in post (`53-sound-design-mixer`),
never generated by any engine. Only Veo3's *non-verbal* ambience/foley is ever kept from a
model, and only when it beats a post-built bed. When in doubt, generate muted and score in
post — it is free of credit risk and fully controllable, and guarantees platform LUFS.

---

## 9. Negative-prompt dialects

Not every engine takes a negative field; the anti-tell payload (from
`prompt-builders/negative-bank.md` + `undetectable-realism-doctrine.md`) is expressed
differently per dialect.

| Engine | Negative support | How to express anti-tells |
|---|---|---|
| Veo3 / Veo3-fast | Weak explicit negatives | Bake positives instead: "film grain, shallow DoF, subtle handheld, natural asymmetry" — describe the REAL, don't list the fake |
| Kling | Has a negative prompt field | Use it: "no plastic skin, no warping, no extra fingers, no flicker, no CGI look" |
| Runway | Partial | Motion brush + positive optics phrasing; minimal explicit negatives |
| Hailuo | Limited | Positive phrasing, keep motion simple to avoid artifacts |
| Seedance | Limited | Positive phrasing + smoothness cues; keep it concise |

**Doctrine:** for engines without strong negatives, the anti-tell defense is *positive
realism phrasing* — grain, bokeh, motion blur, deliberate asymmetry, handheld — plus the
post gate (`46-ai-tell-detector`). Removing tells is finished in edit/color, not begged
from the model.

---

## 10. One storyboard → all dialects (translation quick-map)

Same beat B2-pour, one row per field, showing how each engine wants it phrased.

| IR field | Veo3 / fast | Kling | Runway | Hailuo | Seedance |
|---|---|---|---|---|---|
| camera.move (push-in) | "slow 3cm dolly-in, 85mm, shallow DoF" (in prose) | "slow push in, subtle" | "constant dolly-in 3cm, 2° tilt" | "very slow zoom in" | "push in" (or static) |
| motion.primary (oil) | "thick oil descends slowly, clinging, catching light" | "oil drips slowly and clings" | brush oil region: "slow viscous descent, low intensity" | "oil drips slowly" | "oil pours smooth and steady" |
| motion.secondary (flyaways) | "a few flyaways drift" | "flyaways drift gently" | brush hair-ends: "gentle drift" | "hair sways softly" | "hair sways gently" |
| product hold | "bottle still, label to camera" | "bottle and hand still" | brush bottle: "static, no motion" | "bottle and hand stay still" | "bottle steady" |
| loop | trim in post | START=END frame | (final hero, no loop) | short loop OK | first/last match, loopable |
| audio | "Audio: room tone, one oud note, no music" | (silent → post) | (silent → post) | (silent → post) | (silent → post) |
| length | ≤8 s | ≤10 s | ≤10 s | ≤6 s | ≤5 s |
| tier | fast=iterate, veo3=final | iterate / pro=final | final | draft | draft |

---

## 11. Selecting the dialect (routing pointer)

The MODEL choice is the format-router's job (`31` reading `config/kie-models.yaml`
`routing_matrix`); this doc only tells you HOW to phrase once the model is chosen. As a
default alignment:

- **hero-video-ad final** → veo3 (Veo dialect §2), after veo3-fast lock (§3), OR runway
  (§5) when the shot is a precise camera move / needs motion-brush isolation.
- **hero-video-ad iterate** → veo3-fast (§3) or kling-std (§4).
- **lp-microvideo** → kling (§4, start+end loop) or seedance (§7) draft; hailuo (§6) for
  the cheapest first look.
- **lp-3d-banner** → kling (§4) or seedance (§7) label-face-on micro-rotation (single-ref
  caveat — flag for more angles).
- **product-free plate (t2v allowed)** → any, phrased in that engine's dialect; product is
  composited in later (never t2v the product itself).

Always confirm live availability + pricing at kie.ai before spend (`verify_live: true`).

---

## 12. Anti-patterns (fail the compile if any appear)

- ❌ **t2v of the product** in any dialect. Product beats are i2v from an approved
  keyframe, full stop (§0.1).
- ❌ **Re-describing the bottle** (shape / label / color / «الأحمر») in a motion prompt.
  The keyframe carries identity; words cause drift and can paint forbidden label text
  (product-lock: label stays «زيت المشاط للشعر»).
- ❌ **Arabic (or any) on-screen text** requested from a model (§0.2).
- ❌ **Compound camera moves** on Kling / Hailuo / Seedance — one move each.
- ❌ **"Perfect / clean / smooth / hyper-real / CGI"** as a goal — reads as AI; the
  target is filmed imperfection (grain, asymmetry, handheld, flyaways) (§0.3, §9).
- ❌ **Full face / uncovered forward hair** as the KSA default — tradition B, hands +
  hair + back-of-head (§0.4). Full-face is a separate UAE cut only.
- ❌ **Iterating at final tier** (veo3 / runway / kling-pro). Lock on cheap first (§0.5).
- ❌ **Changing prompt wording between draft and final tier** — invalidates the fast→final
  comparison (§3).
- ❌ **Trusting model native audio for VO** — VO is always post (§8).

---

## 13. Handoff

- **Consumes:** the approved keyframe(s) (route R3, image-first, fidelity-gate `41`
  passed), the canonical storyboard beats (§1), `config/kie-models.yaml` route,
  `prompt-builders/negative-bank.md`, `products/<slug>/product-lock.yaml`.
- **Produces:** a per-beat, per-engine prompt in the correct dialect, ready for
  `26-kie-prompt-builder` to emit as the final Kie call payload.
- **Downstream:** rendered clips flow to the post department — `50-video-editor`,
  `52-colorist` (re-add grain/texture, unify garnet/amber), `53-sound-design-mixer`
  (VO + bed + LUFS), `54-motion-graphics-compositor` (Arabic overlays), `55-finishing-
  delivery` (per-platform export). Realism is FINISHED in post; the dialect only has to
  get the motion, camera and fidelity right and stay cheap until the one final render.
