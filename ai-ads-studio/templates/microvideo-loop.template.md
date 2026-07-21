---
template: "microvideo-loop"
type: "template"                                 # fill-in skeleton, not a skill or a filled artifact
fills_stage: "0→lp-microvideo sub-pipeline"      # branches from Stage-0 Creative-Matrix Planning (STUDIO-BIBLE-V2 §6) into the landing-page ambient-loop line
instantiates: "examples/<product-slug>/24-microvideo-loops.md  (one block per loop)"
filled_by_skills: ["30-creative-matrix-planner", "31-format-router", "36-microvideo-director",
                    "43-physics-materials-realism-director", "45-temporal-consistency-director"]
consumes: ["examples/<product-slug>/00-creative-brief.md",
           "examples/<product-slug>/23-landing-asset-map.md (which LP slot each loop fills + the KEYFRAME it reuses)",
           "products/<product-slug>/product-lock.yaml (vessel/cap/liquid/label identity, do_not_alter, color_tolerance ΔE — loaded GENERICALLY, never hardcoded)",
           "products/<product-slug>/reference-manifest.yaml (the real cutout / approved keyframe that seeds route R3)",
           "products/<product-slug>/fidelity-checklist.md",
           "config/kie-models.yaml (routing_matrix.lp-microvideo: R3 i2v, draft hailuo|seedance, final kling|veo3-fast, loop match first/last)",
           "config/creative-matrix.yaml (landing-page pack: which loops, priority, per-asset credit budget + fallback)",
           "knowledge/landing-page-media.md (muted-autoplay loop, poster, mp4+webm, LCP/CLS, mobile + reduced-motion fallback)",
           "knowledge/undetectable-realism-doctrine.md §7ter.B (temporal tells, fluid physics, no flicker/drift)",
           "knowledge/gulf-beauty-brand-norms.md (hands+hair+back-of-head default, ritual/ingredient-forward, no orientalist cliché)",
           "STUDIO-BIBLE.md §2 (authoring conventions), §3 (product truth), §4→product-lock (identity), §5 (culture/platform), §6 (flagship creative)",
           "STUDIO-BIBLE-V2.md §1 (lp-microvideo row), §5 (10 credit policies — esp. #2 image-first, #5 draft→final, #8 short loopable microvideo), §7bis (routes R1/R2/R3; product ALWAYS reference-conditioned), §7ter.B (undetectable realism)"]
consumed_by_skills: ["24-negative-prompt-builder", "26-kie-prompt-builder", "45-temporal-consistency-director",
                     "46-ai-tell-detector", "53-sound-design-mixer (optional ambient bed)", "55-finishing-delivery",
                     "41-product-fidelity-checker", "27-quality-checker", "28-creative-scoring-engine", "29-cost-optimizer"]
based_on: "skill 36-microvideo-director + knowledge/landing-page-media.md, governed by STUDIO-BIBLE.md §2/§3/§4→product-lock/§5 and STUDIO-BIBLE-V2.md §1 (lp-microvideo), §5.2/§5.5/§5.8 (image-first, draft→final, short loopable microvideo), §7bis (route R3 i2v from an approved keyframe — product NEVER re-drawn frame-by-frame), §7ter.B (temporal + fluid realism). Worked model = the flagship LP loop set for زيت المشاط الأحمر / Red Mechat Oil (oil-pour, drop-ripple, hair-shine sweep, slow bottle rotate, ingredient macro), loaded generically from products/mechat-red-oil/product-lock.yaml."
status: "BLANK — fill-in skeleton. Replace every {{FIELD}}, delete every <!-- HOW TO FILL --> comment, and delete this status line before the loop brief ships to the prompt-builder. One filled copy = ONE loop."
---

# LP Microvideo Loop — {{LOOP_NAME}}  ·  {{PRODUCT_NAME_EN}}

## How to use this template

This is the **single production unit** for one landing-page ambient microvideo
loop (the `lp-microvideo` matrix type — STUDIO-BIBLE-V2 §1). One filled copy = one
seamless 3–5s loop the studio will generate, QC, and export as an autoplaying,
muted, in-page loop (mp4 + webm) with a static poster fallback. If the landing
plan calls for five loops (e.g. oil-pour hero, drop-ripple ingredient beat,
hair-shine sweep, slow bottle rotate, herb macro), you fill five copies, usually
collected in `examples/<slug>/24-microvideo-loops.md`.

**A microvideo is NOT a hero ad.** It is *ambient section motion* — a small,
quiet, endlessly repeating gesture that adds life and premium feel to a landing
section without asking for attention. It has **no cut, no VO, no on-screen
Arabic, no CTA**. It is credit-minimal by design (STUDIO-BIBLE-V2 §5.8: short
loopable microvideo on the fast/cheap video tier, never an 8s hero render).

**Four hard inheritances you may not override in a loop:**

1. **Image-first, then animate ONE approved keyframe (§5.2, route R3).** A
   microvideo is **image→video (i2v)** from a keyframe that *already contains the
   real product* — ideally a keyframe the campaign already paid for (a crop of the
   approved image-ad / lp-hero master; §5.4 one-master-many-exports). You do
   **not** generate a fresh product still just to animate it, and you **never**
   text-to-video the product (t2v would reinvent the bottle → forbidden, §7bis).
2. **The product is reference-conditioned, always (§7bis).** The bottle geometry,
   white ribbed cap, brown-amber-red oil, label lockup «المشاط»/«للشعر», and the
   gold «طبيعي» seal come from the keyframe pixels — the video model animates the
   *scene and the fluid*, it does not re-draw the vessel each frame. Loading is
   **generic**: read `products/<slug>/product-lock.yaml`, never hardcode a bottle.
3. **No Arabic in-model (§5.3).** A loop carries only the product's own
   photographic label glyphs. Any headline/label the LP section needs is real HTML
   over the video, or a separate typography layer — never baked into the frames.
4. **Loop-match is a QC gate, not a nicety.** First frame must equal last frame (or
   the motion must be palindromic/return-to-origin) so the loop repeats with no
   visible jump. A visible seam is a hard fail (Section 8).

**Fill order:** Sections 1→8 top to bottom. Section 8 (loop-match + fidelity +
temporal + web-perf gate) is filled/checked **last**, against everything above it.
Delete every guidance comment and every unused row as you go — a row you don't
need is deleted, not filled with "N/A."

**Placeholder convention:** `{{FIELD}}` = a blank you fill.
`<!-- HOW TO FILL: … -->` explains what belongs there — delete each once filled.

---

## 1. Loop intent & LP role

<!-- HOW TO FILL: One loop per brief. State which landing-page SECTION this loop
lives in and what feeling it adds. Ambient loops sell atmosphere (the oil's real
amber-red glow, the ritual, ingredient authenticity), never a hard claim. Pick a
loop archetype from the catalog — do not invent motion the keyframe can't support. -->

| Field | Value |
|-------|-------|
| **Loop name** | {{LOOP_NAME}} |
| **Internal codename** | {{CODENAME}} |
| **Family / type** | lp-microvideo (ambient LP loop) — STUDIO-BIBLE-V2 §1 |
| **Loop archetype** | {{ARCHETYPE}} <!-- oil-pour · drop-ripple · hair-shine-sweep · slow-bottle-rotate · ingredient-macro (hibiscus/walnut-husk/henna) · steam-warmth · light-sweep --> |
| **LP section / slot** | {{LP_SLOT}} <!-- from 23-landing-asset-map.md: hero-bg · ingredient-band · benefit-block · ritual-story · trust-section --> |
| **Integration target** | {{INTEGRATION_TARGET}} <!-- exact index.html node + /assets filename this loop becomes, e.g. assets/lp/loop-oil-pour.webm|mp4 behind .hero__media --> |
| **Deliverables** | {{DELIVERABLES}} <!-- mp4 (h264) + webm (vp9/av1) + poster.webp (first frame) — all three required --> |

**One-line intent:**
> {{INTENT_ONE_LINE}}
<!-- HOW TO FILL: e.g. "A slow, jewel-lit ribbon of the real amber-red oil pouring
past the locked bottle — 4s, seamless, muted, ambient warmth behind the ingredient
band; it breathes the product's colour without ever asking for a click." -->

**Why a loop here (and not a static image):**
> {{WHY_MOTION}}
<!-- Motion must EARN its weight budget + LCP cost. Justify: fluid life the still
can't give, subtle premium signal, dwell-time. If a static webp would do the job as
well, downgrade to lp-section-image and save the video credit (§5.8, §5.10). -->

---

## 2. Keyframe source & reference lock  (route R3 — STUDIO-BIBLE-V2 §7bis)

<!-- HOW TO FILL: The keyframe is the SEED of the loop. Prefer REUSING an already-
approved, already-QC'd keyframe (a crop/recompose of the image-ad or lp-hero
master) so the loop costs ONE video gen and ZERO new image gen (§5.4). Only if no
suitable keyframe exists do you build one on the DRAFT image tier first (§5.2), QC
it to fidelity, THEN animate. Name the exact source. The product region is never
text-to-video. -->

| Field | Value |
|-------|-------|
| **Route** | R3 — image-to-video (i2v) from an approved keyframe <!-- the ONLY route for lp-microvideo (kie-models routing_matrix) --> |
| **Keyframe source** | {{KEYFRAME_SOURCE}} <!-- REUSE: examples/<slug>/20-image-ad-set.md master #N crop · lp-hero master · 22-3d-hero-render packshot — preferred (zero new image credit) --> |
| **If newly built (fallback)** | {{KEYFRAME_BUILD}} <!-- draft model nano-banana, mode bg-replace, from products/<slug>/references/<file> — QC to fidelity BEFORE any video credit; else "N/A — reusing approved keyframe" --> |
| **Canonical product reference** | {{REFERENCE_FILE}} <!-- the real cutout the keyframe itself was built on, from reference-manifest.yaml --> |
| **Seed / identity lock** | {{SEED}} <!-- fixed seed reused across the whole loop SET for one consistent bottle (§5.6) --> |
| **Label handling** | {{LABEL_HANDLING}} <!-- label glyphs («المشاط»/«للشعر»/benefits/«طبيعي» seal/250 ml) ride along from the keyframe pixels — the model must NOT re-render or drift them. If the loop moves the bottle, the label must travel intact (Section 8 temporal gate). --> |
| **Forbidden inputs** | {{FORBIDDEN_REFS}} <!-- the drifted /assets renders in reference-manifest `forbidden`; any t2v-of-product path --> |

**Reference-conditioning statement (must be literally true of the emitted prompt):**
> The first frame IS `{{KEYFRAME_SOURCE}}`, whose product pixels originate from
> `{{REFERENCE_FILE}}`. The video model animates only the SCENE and the FLUID/light
> around the locked product. No part of the vessel geometry, white ribbed cap,
> oil colour, label artwork, or the gold «طبيعي» seal is generated frame-by-frame
> from a text description.

---

## 3. Motion brief  (skill 36 + 43-physics-materials-realism-director)

<!-- HOW TO FILL: Describe the ONE gesture and nothing else. A microvideo does one
small physically-true motion, slowly. Over-motion is both an AI tell and a loop-
match killer. Anchor the motion in real physics (skill 43): the oil's viscosity and
flow, gravity, inertia, how light travels across the glass as things move. For the
Gulf hair-oil context, favour ambient ritual/ingredient motion; if hair appears,
default to the house style — hands + hair + back-of-head, NO face (gulf-beauty-
brand-norms §0/§2). Delete rows the archetype doesn't use. -->

| Field | Value |
|-------|-------|
| **Primary motion (one gesture)** | {{PRIMARY_MOTION}} <!-- e.g. a thin amber-red oil ribbon pours top→pool and settles; a single drop hits a surface → concentric ripple; a light-sweep travels across the glass; the bottle rotates ~12°; hibiscus petals drift --> |
| **What stays STILL (locked)** | {{STATIC_ELEMENTS}} <!-- the bottle body, cap, label lockup, seal — the product is the calm anchor; only the fluid/light/one prop moves --> |
| **Camera** | {{CAMERA_MOTION}} <!-- locked-off tripod preferred for loops; at most a very slow 2–4% push or gentle parallax. Big camera moves fight the loop seam. --> |
| **Motion amplitude / speed** | {{AMPLITUDE}} <!-- small + slow (ambient). e.g. rotation ≤ ±12°, push ≤ 4%, pour fills lower third only. Nothing races. --> |
| **Fluid physics (if oil/liquid)** | {{FLUID_PHYSICS}} <!-- honest viscosity: mid-slow, glossy, cohesive strand that necks and pools; surface tension on the drop; a real meniscus; caustic glints where light passes the oil — skill 43 --> |
| **Hair dynamics (if hair present)** | {{HAIR_DYNAMICS}} <!-- back-of-head / over-shoulder only; a shine highlight travelling down a strand as it falls; flyaways present; NO face. gulf-beauty-brand-norms §2 --> |
| **Lighting behaviour in motion** | {{LIGHT_MOTION}} <!-- key stays fixed so speculars travel NATURALLY across the glass/oil as the subject moves; no relight/flicker per frame (skill 45) --> |
| **Prop motion (max one)** | {{PROP_MOTION}} <!-- a single restrained element: one hibiscus petal settling, a wisp of warm steam, a slow light gobo — never a busy scene --> |

**Motion instruction (words the model acts on — NOT the final prompt):**
> {{MOTION_INSTRUCTION}}
<!-- 26-kie-prompt-builder compiles the final i2v prompt. Give it: the keyframe as
first frame + the single motion + speed/easing + "camera locked" + "product
identity fixed, only the fluid/light animates." Keep it short and physical. -->

---

## 4. Duration & loop-match spec  (the seam is a hard gate — Section 8)

<!-- HOW TO FILL: This is the section that makes a microvideo a LOOP and not a
clip. Pick the loop technique the archetype supports. The cheapest reliable route
on Kie is the START+END-FRAME loop (kling / seedance / veo3-fast support setting
both) with END FRAME = START FRAME → the model interpolates a motion that returns
home. Motion that naturally returns to origin (rotate-and-return, ripple that fully
settles, light-sweep that exits and re-enters) loops best. One-way motion (a pour
that never resets) does NOT loop — either design a return, or use a crossfade/
boomerang fallback and accept its cost. -->

| Field | Value |
|-------|-------|
| **Target duration** | {{DURATION}} <!-- 3–5s (§5.8). Shorter = smaller file + easier seam. 4s is the house default. --> |
| **Frame rate** | {{FPS}} <!-- 24–30 fps; 24 is filmic + lighter; match across the loop set --> |
| **Loop technique** | {{LOOP_TECHNIQUE}} <!-- start=end-frame i2v (PREFERRED) · return-to-origin motion · crossfade blend (0.3–0.5s dissolve) · boomerang/palindrome (last resort for symmetric motion only) --> |
| **First-frame = last-frame plan** | {{SEAM_PLAN}} <!-- how you guarantee frame 1 ≈ frame N: identical start/end frames fed to the model, OR trim to the natural return point, OR a short overlap dissolve --> |
| **Easing** | {{EASING}} <!-- gentle ease-in-out so the loop point is a slow zero-velocity moment (easiest to hide a seam); avoid a hard-cut at max velocity --> |
| **Poster frame** | {{POSTER_FRAME}} <!-- which frame becomes the .webp poster (the LCP-safe still shown before/without playback); usually frame 1 = the approved keyframe --> |
| **Reverse/pingpong allowed?** | {{PINGPONG_OK}} <!-- only if the motion reads natural in reverse (rotation, shimmer). A pour played backwards looks fake → NOT allowed. --> |

**Loop-match acceptance rule:**
> At the loop point the eye must detect **no jump, pop, flash, or texture-crawl**.
> Test by playing the exported file on repeat for ≥ 20s; if you can spot where it
> restarts, it FAILS Section 8 and goes back for a re-trim or a crossfade — it is
> **not** shipped with a visible seam.

---

## 5. Model + credit route  (config/kie-models.yaml — the credit engine, §5)

<!-- HOW TO FILL: The format-router (skill 31) fills this from routing_matrix.lp-
microvideo. Microvideo is deliberately the CHEAPEST video family: draft/iterate on
a low-cost i2v model (hailuo, seedance), and if quality needs it, ONE final on
kling or veo3-fast (fast tier — NOT veo3 flagship; a background loop does not earn
flagship credits). The keyframe should already be paid for (§5.4). Any t2v/t2i
route for the product is FORBIDDEN. -->

| Stage | Model (kie-models.yaml id) | cost_tier | reference_mode | Purpose |
|-------|---------------------------|-----------|----------------|---------|
| Keyframe (reuse) | {{KEYFRAME_MODEL}} <!-- ideally "reused — 0 credits" · else draft nano-banana bg-replace --> | {{KF_TIER}} | bg-replace / reuse | supply the locked first frame |
| Motion draft | {{DRAFT_VIDEO_MODEL}} <!-- default: hailuo or seedance --> | draft | i2v | cheap motion + loop-seam test |
| Final loop | {{FINAL_VIDEO_MODEL}} <!-- default: kling or veo3-fast (fast tier, NOT veo3) --> | iterate | i2v | ONE final loop after QC ≥ 95 |

| Field | Value |
|-------|-------|
| **Why this model** | {{MODEL_RATIONALE}} <!-- kling/seedance/veo3-fast support start+end-frame → best loop control; hailuo cheapest for drafts. Audio not needed (loops are muted). --> |
| **Start+end-frame capable?** | {{START_END_CAPABLE}} <!-- required if loop technique = start=end-frame; kling/seedance/veo3-fast yes --> |
| **Cheaper fallback route** | {{FALLBACK_ROUTE}} <!-- every asset carries one cheaper fallback (§5.10): e.g. drop the loop → an animated CSS/Ken-Burns pan over the poster.webp at ZERO video credit --> |
| **Est. credits — this loop** | {{CREDIT_EST}} <!-- relative planning estimate; verify current pricing at kie.ai before spend (kie-models verify_live) --> |
| **Spend gate** | No final-tier video credit is spent until Section 8 loop-match + fidelity + temporal + realism gates are GREEN (§5.5, §5.10). |

---

## 6. Web integration & performance  (knowledge/landing-page-media.md)

<!-- HOW TO FILL: A microvideo that hurts the landing page's load or layout is a
NET LOSS no matter how pretty. Fill the real web-delivery contract: muted autoplay
loop, dual-codec, poster, weight budget, lazy-load, CLS-safe box, and graceful
degradation. These are non-negotiable for LP media. -->

| Field | Value |
|-------|-------|
| **Encodes** | {{ENCODES}} <!-- mp4 (h264, yuv420p, +faststart) AND webm (vp9 or av1). Both required for cross-browser (Safari needs mp4). --> |
| **Weight budget** | {{WEIGHT_BUDGET}} <!-- target ≤ 1.5–2.5 MB per loop at 720–1080 tall; a background loop must stay light. State the cap. --> |
| **Resolution** | {{VIDEO_RES}} <!-- size to the slot, not oversize: a hero-bg ~1080 tall, an ingredient inset ~640–720. Never ship 4K for an ambient loop. --> |
| **Autoplay contract** | `autoplay muted loop playsinline preload="metadata"` <!-- muted + playsinline are MANDATORY or mobile browsers block autoplay --> |
| **Poster** | {{POSTER_ASSET}} <!-- poster="assets/…/<name>-poster.webp" = the first-frame still; shows instantly, holds layout, becomes the fallback --> |
| **LCP safety** | {{LCP_PLAN}} <!-- the loop must NOT be the Largest Contentful Paint element on a paid-traffic LP. Lazy-load below-fold loops; if hero, ensure the poster (not the video) carries LCP --> |
| **CLS safety** | {{CLS_PLAN}} <!-- reserve the aspect-ratio box (aspect-ratio / width+height attrs) so the video swap causes ZERO layout shift --> |
| **Lazy / play-on-view** | {{LAZY_PLAN}} <!-- below-fold loops: IntersectionObserver play-on-enter, pause-on-exit → saves bandwidth + battery --> |
| **Mobile / data fallback** | {{MOBILE_FALLBACK}} <!-- on save-data / slow-network / small screens: serve the static poster.webp only, no video --> |
| **prefers-reduced-motion** | {{REDUCED_MOTION}} <!-- MANDATORY: `@media (prefers-reduced-motion: reduce)` → do not autoplay; show the poster. Accessibility + a real Gulf mobile audience. --> |
| **Integration wiring** | {{WIRING}} <!-- the exact <video>/<source>/poster snippet + CSS the loop drops into; matches the LP's existing RTL/section markup from 23-landing-asset-map.md --> |

**Delivery snippet (fill for hand-off to the LP build):**
```html
{{VIDEO_SNIPPET}}
<!-- e.g.
<video class="{{SLOT_CLASS}}" autoplay muted loop playsinline preload="metadata"
       poster="{{POSTER_ASSET}}" width="{{W}}" height="{{H}}">
  <source src="{{WEBM_SRC}}" type="video/webm">
  <source src="{{MP4_SRC}}"  type="video/mp4">
</video>
-->
```

---

## 7. Sound  (default: SILENT — optional ambient bed, skill 53)

<!-- HOW TO FILL: LP microvideos autoplay MUTED — the audio track is decorative at
best and usually absent. Default to no audio (smaller file, no surprise sound on an
autoplay loop). Only if a section explicitly wants a tap-to-unmute ambience do you
brief a bed for 53-sound-design-mixer. Never rely on sound to carry meaning here. -->

| Field | Value |
|-------|-------|
| **Audio track** | {{AUDIO}} <!-- default: none (muted loop, strip the audio stream entirely to save weight). Optional: a soft ambient bed for tap-to-unmute only. --> |
| **If ambient bed** | {{AMBIENT_BED}} <!-- warm, low, loop-matched to the video length; oud/soft-string warmth or a gentle pour/ripple foley; ducked, unobtrusive — else "N/A" --> |

---

## 8. Loop-match + fidelity + temporal + web gate  (fill LAST — hard gate before any final spend)

<!-- HOW TO FILL: The automatic gate. It runs on the generated loop against
products/<slug>/fidelity-checklist.md, the temporal-consistency checks (skill 45),
the ai-tell detector (skill 46), the loop-match test, and the web-perf budget.
NOTHING ships and no final-tier credit is spent unless every hard axis is GREEN.
The user never verifies fidelity or the seam by hand — record the gate result here.
Re-generate / re-trim on a fail; never patch a fidelity or seam fail by hand. -->

**Loop-match (HARD — a visible seam does not ship):**
| Axis | Threshold | Result |
|------|-----------|--------|
| First frame ≈ last frame (no jump/pop at the loop point) | imperceptible on 20s repeat | {{LOOP_SEAM}} |
| No flash / exposure pump at the restart | pass | {{LOOP_FLASH}} |
| Motion returns to origin (or valid crossfade/boomerang) | pass | {{LOOP_RETURN}} |

**Product fidelity (product-fidelity-checker, skill 41 — HARD, no ship on fail):**
| Axis | Threshold | Result |
|------|-----------|--------|
| Vessel shape & proportions hold every frame (cylindrical, tall/slim, smooth) | exact | {{FID_SHAPE}} |
| Cap type/colour (white, vertically ribbed, narrower than body) | exact | {{FID_CAP}} |
| Oil colour (brown-amber-red, translucent) + headspace air-gap | ΔE ≤ 3 vs sampled, all frames | {{FID_LIQUID}} |
| Label lockup «المشاط»/«للشعر», benefits, «طبيعي» seal, 250 ml intact & readable | exact, no drift/invention | {{FID_LABEL}} |
| No «الأحمر» painted on the physical label | absent | {{FID_NO_AHMAR}} |

**Temporal / undetectability (temporal-consistency 45 + ai-tell-detector 46 → 27):**
| Axis | Threshold | Result |
|------|-----------|--------|
| No frame-to-frame identity drift / morphing of the bottle or label | zero | {{TMP_DRIFT}} |
| No flicker / texture-crawl / shimmer on the glass or label | zero | {{TMP_FLICKER}} |
| Fluid physics plausible (real viscosity, no rubbery/gel or impossible flow) | pass | {{TMP_FLUID}} |
| Speculars/shadows travel consistently with the motion (no per-frame relight) | pass | {{TMP_LIGHT}} |
| No "obviously AI" tell (floaty motion, warping lines, background pop) | zero hard tells | {{QC_AI_TELL}} |

**Web-perf + craft (landing-page-media + creative-scoring-engine 28):**
| Axis | Threshold | Result |
|------|-----------|--------|
| File weight within budget (both encodes) | ≤ {{WEIGHT_BUDGET}} | {{WEB_WEIGHT}} |
| CLS-safe (reserved aspect box, zero layout shift) | pass | {{WEB_CLS}} |
| LCP-safe (loop not the LCP element / poster carries it) | pass | {{WEB_LCP}} |
| reduced-motion + mobile/data fallback present & correct | pass | {{WEB_FALLBACK}} |
| Ambient premium feel / "adds life without shouting" | ≥ 8/10 | {{QC_AMBIENT}} |
| Overall QC score | **≥ 95** | {{QC_SCORE}} |

**GATE DECISION:** {{GATE_DECISION}}
<!-- GREEN = all hard axes pass, QC ≥ 95 → release the loop to 55-finishing-delivery
for dual-encode + poster + the Section-6 web wiring. RED = one hard axis failed →
back to the draft-tier i2v (or re-trim the seam), do NOT spend final-tier credit. -->

---

## Handoff

On a GREEN gate, this loop hands off:
- **→ 26-kie-prompt-builder** — compile the Section-2 keyframe + Section-3 motion
  into the final i2v prompt for `{{FINAL_VIDEO_MODEL}}` (first frame locked, single
  motion, camera locked, product identity fixed).
- **→ 24-negative-prompt-builder** — merge this loop's temporal + fidelity negatives
  (bottle morphing, label drift/invented «الأحمر», square vessel, gold/black cap,
  bright ruby oil, rubbery fluid, flicker, floaty motion, visible loop seam, warping
  lines, gibberish text) with the bank.
- **→ 45-temporal-consistency-director + 46-ai-tell-detector** — run the Section-8
  temporal + tell scan on every generated loop, automatically.
- **→ 41-product-fidelity-checker + 27 + 28** — re-run the Section-8 fidelity + QC
  gate on the final loop; no ship below threshold.
- **→ 55-finishing-delivery** — dual-encode (mp4 h264 +faststart / webm vp9|av1),
  strip audio (unless Section 7 briefs a bed), export the poster.webp, apply the
  weight budget, and emit the Section-6 `<video>` wiring for the LP build.
- **→ 53-sound-design-mixer** — only if Section 7 requested an ambient bed.
- **→ 29-cost-optimizer** — record actual credits vs the Section-5 estimate; the loop
  should have cost ONE video gen (keyframe reused) — flag if it did not.

> Delete this line and the `status:` frontmatter line once the loop brief is filled.
