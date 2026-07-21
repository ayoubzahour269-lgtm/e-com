# Video Prompt Builder — compiling ONE optimized i2v prompt

> **What this file is.** The *compiler procedure* that turns a single approved
> storyboard beat into ONE finished, model-ready i2v (image-to-video) prompt string.
> It is the algorithm; `model-dialect-map.md` is the phrasebook. Division of labour:
> **this builder decides WHAT goes in the payload and in WHAT ORDER** (the layered
> block architecture, the realism payload, the negative handling, the length budget);
> **the dialect map decides HOW each block is phrased** for Veo3 / Veo3-fast / Kling /
> Runway / Hailuo / Seedance. You run this builder, then port its output through the
> matching dialect section. One beat in → one dialect-correct prompt out.
>
> **Owner:** `26-kie-prompt-builder` (assembles) with `24-negative-prompt-builder`,
> `42-optical-camera-realism-director`, `43-physics-materials-realism-director`,
> `45-temporal-consistency-director` feeding blocks; `31-format-router` supplies the
> target model + route; `41-product-fidelity-checker` gates the keyframe first.
>
> **Reads:** the active `products/<slug>/product-lock.yaml`, the beat from
> `08-storyboard-director`, `prompt-builders/negative-bank.md`,
> `prompt-builders/model-dialect-map.md`, `config/kie-models.yaml` (route + tier),
> `knowledge/undetectable-realism-doctrine.md`, `knowledge/hair-oil-realism.md`,
> `knowledge/gulf-beauty-brand-norms.md`.
>
> **Scope:** every moving product-bearing asset — `hero-video-ad`, `lp-microvideo`,
> `lp-3d-banner`. NOT static images (see `image-prompt-builder`), NOT the label typo
> (that is post, `37-typography-compositor`).

---

## 0. The five compile laws (inherited, never negotiable)

These are the dialect-map §0 laws expressed as *compiler constraints*. If a block you
are about to emit violates one, the block is wrong — fix the block, not the law.

1. **i2v only for product beats.** The prompt you compile ALWAYS references the ONE
   approved, fidelity-passed keyframe as first frame. You never compile a text
   description of the bottle for the engine to redraw. If the beat has no keyframe, you
   do not have a prompt to build — bounce back to `35/26` image-first to lock one. t2v
   is compiled ONLY for a product-free plate the bottle is composited into later.
2. **No Arabic in the payload.** Never compile label copy, headline, CTA, price or any
   on-screen word into a motion prompt. All five engines are `arabic_text: poor/na`;
   requesting text burns credits and returns gibberish. Text is post.
3. **Realism is a required block, not a flourish.** Every compiled prompt carries the
   optical payload (§4) and the physics payload (§5). A prompt without them is not
   finished, however pretty the subject line reads.
4. **Gulf framing survives compile.** Default framing = hands + hair + back-of-head, no
   face (tradition B, `gulf-beauty-brand-norms.md`). The subject block encodes the
   framing intent; the dialect map changes only the camera verbs, never the intent.
5. **Compile once at each tier.** The same compiled payload is ported to the draft
   engine (veo3-fast / kling-std / hailuo / seedance) to prove motion, then — unchanged
   except fidelity — to the ONE final engine (veo3 / runway / kling-pro). Do not
   recompile between tiers; the only variable across a tier jump is engine fidelity.

---

## 1. Inputs the builder requires (refuse to compile without them)

| input | source | if missing |
|-------|--------|-----------|
| approved keyframe path | `35/26` image-first, passed fidelity gate `41` | STOP — no i2v without a locked keyframe |
| storyboard beat (yaml) | `08-storyboard-director` | STOP — nothing to translate |
| target model + route | `31-format-router` (reads `kie-models.yaml`) | default to draft tier, flag for router |
| cost tier (draft/iterate/final) | router / `29-cost-optimizer` | assume draft; NEVER final without QC≥95 |
| product-lock | `products/<slug>/product-lock.yaml` | STOP — product identity unknown |
| negative bank refs | `prompt-builders/negative-bank.md` | STOP — realism gate cannot pass |
| optics/physics directives | skills 42 / 43 (or their knowledge docs) | derive from doctrine defaults §4/§5 |
| loop flag | beat (`loop: true` for `lp-microvideo`) | assume false |

The beat arrives in the model-agnostic intermediate form defined in dialect-map §1
(`subject`, `product_role`, `camera.*`, `motion.*`, `light`, `mood`, `audio_intent`,
`loop`, `negatives_ref`). This builder consumes those fields and emits ordered blocks.

---

## 2. The eight-block prompt architecture (the compile target)

Every i2v prompt is assembled from these eight blocks **in this priority order**. This
is the model-agnostic layout; the dialect map then re-phrases each block (Veo3 fuses
them into one prose paragraph; Kling/Runway keep them as short clauses; all preserve the
ORDER). Front-load: the engine weights early tokens heavily, so the conversion-critical
subject (the hair, the oil) leads and the constraints trail.

| # | block | carries | source field(s) |
|---|-------|---------|-----------------|
| 1 | **SUBJECT + FRAMING** | what moves, from what angle, Gulf framing | `subject`, `gulf norms` |
| 2 | **ACTION + PHYSICS** | the motion described as physics, viscosity, dynamics | `motion.*`, skill 43 |
| 3 | **PRODUCT (one line)** | the bottle's role — held/static/label-facing, NO redraw | `product_role`, product-lock |
| 4 | **ENVIRONMENT** | set, depth cues, heritage props, background falloff | `light` set, hero DNA |
| 5 | **CAMERA + OPTICS** | lens, ONE move, DoF, and the optical-realism payload | `camera.*`, skill 42 |
| 6 | **LIGHT** | key direction, warmth, contrast, practicals | `light` |
| 7 | **MOOD + GRADE** | pace adverbs, film stock, tonal intent | `mood`, colorist cues |
| 8 | **AUDIO / CONSTRAINTS + NEGATIVES** | audio (Veo3 only), negatives, temporal guards | `audio_intent`, negatives |

**Why this order wins.** Blocks 1–2 are the ad (scroll-stop = hair + oil). Block 3 is a
deliberate single line so the engine does not "help" by re-inventing a bottle the
keyframe already carries perfectly. Blocks 4–7 build the *filmed* look. Block 8 is the
anti-tell + audio tail. Compress or drop blocks 4–7 before ever weakening 1–3.

---

## 3. Block 3 — the product line (the fidelity-critical rule)

The keyframe already contains the real, fidelity-passed bottle. The compiler's job is to
stop the engine from touching it. **Compile the product as ONE line, and only describe
its ROLE and MOTION STATE, never its identity.**

- ✅ `"the slim clear bottle in her lower-left hand stays still, label facing camera"`
- ❌ `"a tall cylindrical clear PET bottle with a white ribbed cap and warm reddish-brown
  oil, red swoosh label reading المشاط…"` — this invites drift and re-draws what the
  keyframe already locks. NEVER pull identity fields out of `product-lock.yaml` into the
  motion prompt; the lock governs the KEYFRAME build (image-first), not the i2v payload.

Allowed product motion states (pick from the beat's `product_role`):
`static in hand` · `slow settle onto podium` · `micro-rotate ≤15° label-face-on (R3
label-safe only)` · `held, hand tremor-free` · `entering frame from soft focus`. Any move
larger than a small label-face-on micro-rotate risks label drift → restrict per
product-lock 3D caveat and FLAG for more reference angles.

---

## 4. Optical-realism payload (block 5 tail — required)

The single biggest "it's AI" tell is clinical, lensless perfection. Every compiled prompt
injects a real-camera signature (from `42-optical-camera-realism-director` /
`undetectable-realism-doctrine.md`). Default hair-oil payload, tuned per beat:

- **Lens + DoF:** name a real focal length (this studio's default is `85mm-equivalent,
  shallow depth of field`, focus on the oil sheen / hair strand, background falling soft).
  Macro beats → `100mm macro, razor-thin focal plane`.
- **Bokeh:** `soft rounded bokeh on the warm background practicals` — never busy, never
  hexagonal-clinical.
- **Motion blur:** `natural motion blur on the moving oil and hair` — absence of blur on
  motion is a hard tell.
- **Grain:** `fine 35mm film grain` (hero) / `subtle sensor grain` (LP loop). Zero grain =
  fake.
- **Handheld:** `subtle handheld micro-shake` — counters Veo3/Runway over-stabilization.
  Never `perfectly smooth gimbal` for intimate heritage beats.
- **Highlight roll-off:** `gentle filmic highlight roll-off` on the oil's specular and the
  window key — no clipped digital whites.
- **Optional, sparingly:** `faint chromatic aberration at the frame edge`, `light vignette`,
  `slight focus breathing on the push-in`. One or two, not all — over-stacking reads as a
  filter, not a lens.

ONE dominant camera move per shot (dialect-map §2). Compound moves drift; the compiler
rejects a beat that requests two simultaneous large moves.

---

## 5. Physics + materials payload (block 2 — required)

Describe the motion as PHYSICS, never as a bare verb. The oil's behaviour and the hair's
dynamics are the realism spine of a hair-oil ad (`hair-oil-realism.md`, skill 43).

- **Oil:** the mechat oil is `warm reddish-brown, translucent, lightly viscous` — compile
  it as `high-viscosity oil descends slowly, clinging in a continuous thread, catching a
  warm amber light, a slow bead forming and releasing`. NEVER `bright ruby/cranberry`
  (product-lock correction) and never thin/watery flow. Show viscosity: slow, adhesive,
  light-transmitting.
- **Hair:** `individual strands with a few loose flyaways drifting`, natural weight and
  inertia, `strands settling with gravity after the stroke` — never helmet-hair, never a
  single rigid sheet. Movement follows the hand, then decays.
- **Contact + weight:** `oil pools and reflects where it meets the strand`; the bottle has
  `weight in the hand, no float`; drops obey gravity, land, and spread.
- **Fabric:** heritage drape `settles and folds under its own weight`, no floating cloth.

Match the beat's `motion.speed`: `languid / ritual pace` for heritage beats — set with
adverbs (`slowly, unhurried, languidly`), not just nouns.

---

## 6. Temporal + loop handling (blocks 1 & 8)

Video adds tells images cannot have (`45-temporal-consistency-director`). Compile guards:

- **Identity hold:** `the hair colour, the hand, and the bottle stay identical throughout,
  no morphing or texture-crawl` — one short clause, block 8.
- **No background pop:** `background props stay fixed and consistent` — kills object
  impermanence on push-ins.
- **Loop (LP microvideo, `loop:true`):** compile `seamless loop, the final frame matches
  the first frame` and choose a cyclical motion (a single oil bead's fall-and-reset, a hair
  sweep that returns to rest). For Kling/Seedance pass the keyframe as BOTH start and end
  frame (dialect map); for Veo-family, trim-to-loop in post. Keep loops 3–5 s, fast tier
  (credit policy §8).

---

## 7. Negative handling — engine-aware (block 8)

Negatives come from `prompt-builders/negative-bank.md` (`#video-master` + the beat's
`negatives_ref`). HOW you attach them depends on the engine — the router tells you which:

- **Field-based negatives (Kling, some Runway, Hailuo, Seedance):** emit a discrete
  `negative_prompt:` list. Pull the video-master anti-tell set: `plastic/waxy skin,
  over-smooth CGI, extra or melting fingers, dead glassy eyes, helmet hair with no
  flyaways, floaty weightless motion, mismatched shadows, warping straight lines, gibberish
  text, no grain, no motion blur, no depth of field, frame-to-frame flicker, morphing,
  bright ruby/cranberry oil, square bottle`.
- **Phrase-based / no negative field (Veo3, Veo3-fast):** Veo does not take a negative
  list — encode negatives as POSITIVE opposites inside the prose. `"no grain"` becomes
  `"fine 35mm film grain"`; `"waxy skin"` becomes `"skin with visible pores and natural
  texture"`; `"floaty motion"` becomes `"movement with real weight and inertia"`. The
  builder converts the negative bank into positive phrasing automatically for Veo targets.
- **Always carry the product negatives:** `no square/squat bottle, no gold or black cap, no
  bright ruby oil, no on-bottle Arabic redrawn` — these protect against the exact drifts
  documented in `product-lock.yaml` even though the keyframe should prevent them.

---

## 8. Length + credit budget per engine (the compile ceiling)

Prompt length is a compile parameter, not free text. Over-long prompts dilute early-token
weight and cost nothing to trim (`kie-credit-optimization.md`).

| engine | shape | practical length | tier | credit posture |
|--------|-------|------------------|------|----------------|
| Veo3 | dense prose paragraph | ~60–110 words | final | costliest — ONE final only |
| Veo3-fast | same paragraph | ~60–110 words | iterate | draft the move here |
| Kling std/pro | short clause list + neg field | ~40–70 words | iterate/final | strong i2v, start+end loop |
| Runway | clause list + neg field | ~40–70 words | final | reserve for approved hero |
| Hailuo | terse clauses + neg field | ~30–50 words | draft | cheapest motion test |
| Seedance | terse clauses + neg field | ~30–50 words | draft | cheapest, loop-friendly |

**Draft→final gate:** compile → port to a draft engine → judge composition/motion/pace
(NOT final fidelity) → iterate the beat, not the wording → when the move is right and QC≥95
and fidelity gate `41` passes, port the SAME payload to the ONE final engine and spend once.

---

## 9. The compile procedure (run in order)

1. **Gate the inputs (§1).** No keyframe, no lock, no negatives → refuse and bounce.
   Confirm the keyframe already passed fidelity `41`.
2. **Read the beat** into the eight blocks (§2). Map every field; note the `loop` flag and
   `product_role`.
3. **Write block 1** (subject + Gulf framing) — front-loaded, hair/oil first, no face by
   default.
4. **Write block 2** with the physics payload (§5) — motion as viscosity/dynamics, paced by
   adverbs.
5. **Write block 3** — ONE product-role line (§3). Do NOT import identity fields.
6. **Write block 4** (environment + depth) from the light-set / hero DNA.
7. **Write block 5** (camera + optics) — ONE move + the full optical payload (§4).
8. **Write block 6** (light) and **block 7** (mood + grade / film stock).
9. **Write block 8** — temporal guards (§6), then negatives handled per engine (§7); add
   audio clause ONLY for Veo3 (ambience/foley, never VO).
10. **Enforce the ceiling (§8)** — trim to the engine's word budget, protecting blocks 1–3.
11. **Port through the dialect map** — fuse to prose (Veo) or clause-list (Kling/Runway/
    Hailuo/Seedance), preserving block order.
12. **Validate (§10)** and emit with metadata (engine, route R3, tier, keyframe path, seed).

---

## 10. Pre-emit validation checklist (all must be YES)

- [ ] i2v with an approved, fidelity-passed keyframe referenced (never t2v for product).
- [ ] Zero Arabic / on-screen text in the payload.
- [ ] Block 3 is a single role line — NO bottle identity fields imported from the lock.
- [ ] Optical payload present (lens, DoF, motion blur, grain, handheld, roll-off).
- [ ] Physics payload present (oil viscosity + hair dynamics + weight), oil is warm
      reddish-brown, NOT ruby.
- [ ] Exactly ONE dominant camera move.
- [ ] Gulf framing intact (no face by default; hands/hair/back-of-head).
- [ ] Temporal guards present; loop handled if `loop:true`.
- [ ] Negatives attached correctly for THIS engine (field vs positive-phrase).
- [ ] Within the engine word budget; blocks 1–3 fully protected.
- [ ] Audio clause only if Veo3, and ambience/foley only (no VO, no music spike).
- [ ] Tier is draft unless QC≥95 + fidelity gate green (no accidental final spend).

Any NO → do not emit. Fix the block and re-validate.

---

## 11. Worked compile — beat `B2-pour` (mechat) → generic → Veo3 → Kling

**Generic eight-block compile (model-agnostic):**
- B1 subject: `A section of dark hair seen from behind, warm reddish-brown hair oil being
  slowly drawn through it.`
- B2 action/physics: `The high-viscosity oil descends slowly, clinging in a continuous
  thread, a slow bead forming and releasing; a few loose flyaways drift and settle with
  gravity.`
- B3 product: `Her steady hand holds a slim clear bottle in the lower-left, label facing
  camera, the bottle motionless.`
- B4 environment: `Intimate low-key majlis, deep warm wood tones, soft background falloff.`
- B5 camera/optics: `85mm lens, shallow depth of field, one slow 3cm push-in with a faint
  2° downward tilt, subtle handheld micro-shake, natural motion blur, fine 35mm film grain,
  gentle highlight roll-off, focus on the oil's sheen.`
- B6 light: `Single soft window light from the left, warm amber practical, low key.`
- B7 mood/grade: `Unhurried heritage mood, warm filmic garnet/amber grade.`
- B8 audio/constraints: `Identity of hair, hand and bottle held constant, no morphing.
  Audio: soft room tone, one low sustained oud note, faint fabric rustle, no music.`

**Port → Veo3 (prose, negatives as positives, audio kept):** see dialect-map §2 worked
port — the eight blocks fuse into one front-loaded paragraph, ~95 words, audio tail intact.

**Port → Kling (clause list + negative field, no audio):**
> i2v from approved keyframe B2. Dark hair from behind, warm reddish-brown high-viscosity
> oil drawn slowly through it, clinging thread, a few flyaways drifting. Slim clear bottle
> static in lower-left hand, label facing camera. 85mm, shallow DoF, slow 3cm push-in +2°
> tilt down, subtle handheld, natural motion blur, fine grain. Warm window light from left,
> low key, deep wood tones, heritage mood.
> `negative_prompt:` plastic/waxy skin, extra/melting fingers, helmet hair no flyaways,
> floaty weightless motion, no grain, no motion blur, no DoF, flicker, morphing, mismatched
> shadows, gibberish text, bright ruby/cranberry oil, square bottle, gold/black cap.

Same payload, two dialects; the only cross-tier variable is engine fidelity.

---

## 12. Failure conditions (hard stops)

- **No keyframe / unverified keyframe** → cannot compile i2v; bounce to image-first + gate 41.
- **Bottle identity described in the motion prompt** → drift risk; strip to a role line (§3).
- **Any Arabic / on-screen text requested** → remove; text is post (skill 37/54).
- **Missing optical or physics payload** → prompt is incomplete; add before emit.
- **Two large simultaneous camera moves** → reject; one dominant move per shot.
- **Face shown when the beat is default Gulf framing** → re-frame to hands/hair/back.
- **Ruby/cranberry or square-bottle language** → violates the lock; correct to warm
  reddish-brown / slim cylinder.
- **Final tier requested before QC≥95 + fidelity green** → block the spend (§8).
- **Recompiled wording between draft and final** → invalidates the tier comparison; reuse
  the exact payload.

---

## 13. Handoff

- **To `31-format-router`:** the compiled prompt + required engine + route (R3) + tier +
  the credit estimate for this beat.
- **To `27-quality-checker` / `46-ai-tell-detector`:** the payload for pre-spend realism/
  undetectability scoring (draft render judged on motion/composition, not final fidelity).
- **To `41-product-fidelity-checker`:** confirmation the keyframe passed BEFORE i2v, and the
  rendered clip AFTER, on the product-lock fidelity axes.
- **To `50-video-editor` + post department:** the clip plus the beat's cut point, plus the
  note that Arabic overlays/CTA/price and any music/VO are added in post (skills 37/53/54).
- **Back to `08-storyboard-director`:** any beat that could not compile (missing keyframe,
  impossible move, framing conflict) with the specific blocking reason.
