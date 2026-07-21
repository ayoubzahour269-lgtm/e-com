---
template: "3d-render"
type: "template"                        # fill-in skeleton, not a skill or a filled artifact
fills_stage: "0→3d-render sub-pipeline" # branches from Stage-0 Creative-Matrix Planning (STUDIO-BIBLE-V2 §6) into the CGI-packshot line
instantiates: "examples/<product-slug>/23-3d-render-set.md  (one block per render)"
filled_by_skills: ["30-creative-matrix-planner", "31-format-router", "34-3d-render-director",
                    "42-optical-camera-realism-director", "43-physics-materials-realism-director"]
consumes: ["examples/<product-slug>/00-creative-brief.md", "products/<product-slug>/product-lock.yaml",
           "products/<product-slug>/reference-manifest.yaml", "products/<product-slug>/fidelity-checklist.md",
           "config/kie-models.yaml", "config/creative-matrix.yaml", "knowledge/gulf-beauty-brand-norms.md",
           "knowledge/undetectable-realism-doctrine.md", "STUDIO-BIBLE.md §2 §3 §5",
           "STUDIO-BIBLE-V2.md §1 §5 §7bis §7ter.B"]
consumed_by_skills: ["24-negative-prompt-builder", "26-kie-prompt-builder", "37-typography-compositor",
                     "38-upscale-finisher", "41-product-fidelity-checker", "46-ai-tell-detector",
                     "27-quality-checker", "28-creative-scoring-engine", "29-cost-optimizer"]
based_on: "STUDIO-BIBLE.md §2 (authoring conventions), §3 (product truth), §4→products/mechat-red-oil/product-lock.yaml (identity), §5 (market/platform); STUDIO-BIBLE-V2.md §1 (creative matrix: 3d-render + lp-3d-banner rows), §5 (10 credit policies), §7bis (reference-lock v2, routes R1/R2/R3, 3D angle caveat, fidelity gate), §7ter.B (undetectable-realism / optics + materials). Worked model = a photoreal studio packshot of زيت المشاط الأحمر / Red Mechat Oil (cylindrical clear PET, white ribbed cap, brown-amber-red oil)."
status: "BLANK — fill-in skeleton. Replace every {{FIELD}}, delete every <!-- HOW TO FILL --> comment, and delete this status line before the render brief ships to the prompt-builder."
---

# 3D / Packshot Render Brief — {{RENDER_NAME}}  ·  {{PRODUCT_NAME_EN}}

## How to use this template

This is the **single production unit** for one photoreal CGI-grade packshot or
hero render (the `3d-render` matrix type, and the still keyframe behind a
`lp-3d-banner` turntable — STUDIO-BIBLE-V2 §1). One filled copy = one master
render the studio will generate, QC, and export (alpha-matte packshot + optional
scene render). If the plan calls for three renders (e.g. face-on PDP packshot,
three-quarter hero, macro cap-detail), you fill three copies, usually collected
in `examples/<slug>/23-3d-render-set.md`.

**"3D" here means photoreal studio-CGI *look*, not a text-to-3D model of the
bottle.** We never model or hallucinate the vessel from words — that is exactly
how the old `/assets` renders DRIFTED into a wrong square bottle. The product is
**reference-conditioned** on the real photo, and the "render" is the studio
world — seamless sweep, lighting rig, materials response, contact shadow — built
*around* the pixel-true product.

**Two rails you can never cross (STUDIO-BIBLE-V2 §5, §7bis):**
1. **The product is reference-conditioned, always.** The bottle region comes
   from a real photo in `products/<slug>/references/` via route **R1** (default)
   or **R2** — never text-to-image, never "describe the bottle and render it."
   If Section 4 names a text-only (t2i) model for the product region, this brief
   is invalid and must not proceed to spend.
2. **Arabic text is added in POST, never in-model.** A packshot carries the
   *product's own label glyphs* (reproduced photographically from the reference)
   and **no other** Arabic. Any campaign headline, price, or CTA is typeset later
   by `37-typography-compositor` (El Messiri display / Tajawal body, RTL) into
   the clean negative space this render deliberately leaves.

**The 3D honesty gate (STUDIO-BIBLE-V2 §7bis, the 3D caveat).** A true rotating
turntable needs **multiple real angles** in `references/`. With only a front
reference you may render a pixel-true **face-on** packshot and, at most, a small
**label-face-on micro-move** for `lp-3d-banner` (route R3). You may **never
invent a hidden face** of the bottle. Section 7 is where you declare the current
rotation capability and gate the turntable accordingly.

**Fill order:** Sections 1→9 top to bottom. Section 9 (fidelity + realism + QC
gate) is filled/checked **last**, against everything above it. Delete every
guidance comment and every unused row as you go — a row you don't need is
deleted, not filled with "N/A."

**Placeholder convention:** `{{FIELD}}` = a blank you fill.
`<!-- HOW TO FILL: … -->` explains what belongs there — delete each once filled.

---

## 1. Render intent & role

<!-- HOW TO FILL: One render per brief. State what this specific render is FOR —
a clean PDP packshot, a jewel-lit hero for the ad set, a macro material study, or
the still keyframe that a lp-3d-banner will micro-rotate. The intent drives angle,
rig, and how much "world" surrounds the product. -->

| Field | Value |
|-------|-------|
| **Render name** | {{RENDER_NAME}} |
| **Internal codename** | {{CODENAME}} |
| **Family / type** | 3d-render (photoreal packshot / hero CGI) — STUDIO-BIBLE-V2 §1 |
| **Sub-role** | {{SUB_ROLE}} <!-- PDP-packshot / ad-hero / material-study / lp-3d-banner-keyframe --> |
| **Consumers of this render** | {{CONSUMERS}} <!-- e.g. image-ad set, landing PDP, lp-3d-banner turntable, banner system --> |
| **Deliverables** | {{DELIVERABLES}} <!-- alpha-matte packshot (png, transparent) + scene render (webp) — §1 export column --> |
| **Placements** | {{PLACEMENTS}} <!-- meta_feed, ig_feed_square, PDP; one master → crops, not new gens (§5.4) --> |

**One-line intent:**
> {{INTENT_ONE_LINE}}
<!-- HOW TO FILL: e.g. "A jewel-lit, museum-grade studio packshot of the real
mechat bottle on a warm stone sweep — luxury credibility in a single still,
clean right third reserved for the Arabic headline." -->

---

## 2. Route & reference lock  (STUDIO-BIBLE-V2 §7bis — the #1 constraint)

<!-- HOW TO FILL: Pick R1 (default, cheapest, highest fidelity) or R2 for the
product region. R1 keeps the real cutout pixel-intact and generates only the
studio world + relight around it — ideal for packshots. R2 (edit/inpaint) only
when the bottle must be re-lit or re-posed into the scene. NEVER text-to-image
the product. Name the exact reference file from reference-manifest.yaml and the
model whose reference_modes support your route. -->

| Field | Value |
|-------|-------|
| **Product route** | {{ROUTE}} <!-- R1 = product-real / world-ai (DEFAULT for packshots) · R2 = reference-conditioned edit/relight --> |
| **Why this route** | {{ROUTE_RATIONALE}} <!-- R1 if the front cutout pose works as the packshot; R2 if a relight/new three-quarter is required and only a front ref exists --> |
| **Canonical product reference** | {{REFERENCE_FILE}} <!-- e.g. products/mechat-red-oil/references/02-front-chroma-magenta.png (clean magenta cutout — PRIMARY for R1) --> |
| **Reference-manifest entry** | {{MANIFEST_KEY}} <!-- the reference-manifest.yaml `routing.3d-render` mapping --> |
| **Label handling** | {{LABEL_HANDLING}} <!-- preserve label region via edit/inpaint, OR composite the flat label asset in post. Label glyphs («المشاط», «للشعر», benefits, «طبيعي» seal, 250 ml) are reproduced photographically — NEVER re-typeset by a model. --> |
| **Seed / identity lock** | {{SEED}} <!-- fixed seed reused across the whole render set for one consistent bottle (§5.6) --> |
| **Forbidden references** | {{FORBIDDEN_REFS}} <!-- the drifted /assets renders listed under reference-manifest `forbidden` — never feed these as reference --> |

**Reference-conditioning statement (must be literally true of the emitted prompt):**
> The product pixels originate from `{{REFERENCE_FILE}}`. The model
> {{ROUTE_VERB}} ( R1 → *composites the pixel-true cutout into a generated studio
> world and relights around it* · R2 → *edits the scene while preserving the
> product region* ). No part of the vessel geometry, cap, liquid colour, label
> artwork, or the gold «طبيعي» seal is generated from a text description.

---

## 3. Materials & shader brief  (skill 34 + 43-physics-materials-realism-director)

<!-- HOW TO FILL: A packshot lives or dies on material response. For each surface,
state the real physical behavior the lighting must reveal — NOT invent geometry.
These are how light interacts with the LOCKED product, pulled from product-lock
`vessel`/`cap`/`liquid`/`label`. The model does not redraw these surfaces (they
come from the reference); this brief tells the lighting rig and the realism
directors what optical truth to preserve/enhance. Delete rows a given product
lacks. -->

| Surface | Real material (from product-lock) | Light behavior to render | Watch-outs |
|---------|-----------------------------------|--------------------------|------------|
| **Vessel** | {{MAT_VESSEL}} <!-- clear colourless PET, tall/slim cylinder --> | {{VESSEL_LIGHT}} <!-- crisp specular edge highlights down both flanks, refraction of the oil colour through the glass wall, a soft caustic on the sweep --> | {{VESSEL_WATCH}} <!-- no square/faceted body, no ribbing on the body, no double-wall artefacts --> |
| **Liquid** | {{MAT_LIQUID}} <!-- translucent brown-amber-red hair oil, lightly viscous --> | {{LIQUID_LIGHT}} <!-- warm internal light transmission; amber at the thin backlit neck → deep brown-red in the mass; visible meniscus + ~12% headspace air-gap --> | {{LIQUID_WATCH}} <!-- NOT bright ruby/cranberry; keep the air gap; ΔE ≤ 3 vs sampled hex --> |
| **Cap** | {{MAT_CAP}} <!-- white semi-matte, fine VERTICAL ribbing/knurling --> | {{CAP_LIGHT}} <!-- soft diffuse top, gentle grazing light to read the vertical ribs, thin clear thread-band below --> | {{CAP_WATCH}} <!-- never gold/black, never smooth, never wider than the body --> |
| **Label** | {{MAT_LABEL}} <!-- matte white wrap label, rounded-corner panel --> | {{LABEL_LIGHT}} <!-- even, glare-free front light so red lockup + gold pinstripe + seal read cleanly; gentle wrap-shading at the cylinder edges --> | {{LABEL_WATCH}} <!-- no blown highlights over the glyphs, no invented «الأحمر», no English brand text --> |
| **Seal / foil** | {{MAT_SEAL}} <!-- circular scalloped GOLD «طبيعي / 100% natural» badge, gold swoosh pinstripe --> | {{SEAL_LIGHT}} <!-- subtle metallic anisotropic glint, present and correctly placed --> | {{SEAL_WATCH}} <!-- must be present, not duplicated, not moved --> |
| **Ground / contact** | {{MAT_GROUND}} <!-- warm stone / cream sweep / garnet drape (brand palette) --> | {{GROUND_LIGHT}} <!-- physically-correct contact shadow + soft reflection directly under the base (§7ter.B) --> | {{GROUND_WATCH}} <!-- shadow must anchor the bottle; no floating, no mismatched shadow direction --> |

---

## 4. Lighting rig  (skill 34 lighting director)

<!-- HOW TO FILL: Specify a real, nameable studio rig as if briefing a product
photographer — key/fill/rim, modifiers, ratios, and the gradient sweep behind
glass. The goal is museum-grade, filmed-not-rendered light: one confident key,
controlled fill, an edge/rim to separate the clear glass from the background, and
a graduated background so the transparent bottle reads. Avoid flat clinical
"3D-render lighting" — that is itself an AI tell (§7ter.B). -->

| Light | Type / modifier | Position (clock + height) | Purpose |
|-------|-----------------|---------------------------|---------|
| **Key** | {{KEY_MOD}} <!-- large softbox / gridded octa --> | {{KEY_POS}} <!-- e.g. 10 o'clock, high, 45° --> | primary form + label legibility |
| **Fill** | {{FILL_MOD}} <!-- white bounce / low-power soft --> | {{FILL_POS}} | open shadows to the target ratio |
| **Rim / edge** | {{RIM_MOD}} <!-- gridded strip --> | {{RIM_POS}} <!-- back-3/4 --> | separate clear glass from ground; light the vertical cap ribs |
| **Background sweep** | {{BG_MOD}} <!-- graduated / gobo --> | {{BG_POS}} | tonal gradient so the transparent bottle reads |
| **Kicker (optional)** | {{KICK_MOD}} | {{KICK_POS}} | catch the oil's internal glow / a hero specular on the glass |

| Field | Value |
|-------|-------|
| **Key:fill ratio** | {{LIGHT_RATIO}} <!-- e.g. 3:1 for luxury modelling, not flat 1:1 --> |
| **Colour temperature / mood** | {{LIGHT_MOOD}} <!-- warm ~3800–4500K, luxury-warm to match garnet/amber brand DNA --> |
| **Reflection management** | {{REFLECTION_PLAN}} <!-- flag/dull-side to control unwanted reflections in the PET; keep one clean hero specular --> |
| **Highlight roll-off** | {{ROLLOFF}} <!-- filmic soft roll-off on the glass highlight, NOT clipped digital white (§7ter.B) --> |

---

## 5. Camera & angle  (skill 34 + 42-optical-camera-realism-director)

<!-- HOW TO FILL: State the exact angle and a REAL optical setup. A packshot
reads as photographed when it carries true optics — a real product lens focal
length, a working aperture with genuine DOF, sensor grain, subtle vignette — not
clinical infinite-focus CGI. The angle MUST be one the reference actually
supports (see Section 7 rotation gate): with only a front reference, stay
face-on / very shallow three-quarter. -->

| Field | Value |
|-------|-------|
| **Shot size** | {{SHOT_SIZE}} <!-- full-product packshot / three-quarter hero / macro cap-or-label detail --> |
| **Angle** | {{ANGLE}} <!-- face-on 0° (safe with single front ref) · shallow 3/4 · slight low-hero. Must be reference-supported. --> |
| **Lens (equiv.)** | {{LENS}} <!-- e.g. 90–100mm macro / 85mm — product-flattering, low distortion --> |
| **Aperture / DOF** | {{APERTURE}} <!-- e.g. f/8 for full label sharpness, or f/2.8 for a hero with the base falling soft --> |
| **Focus plane** | {{FOCUS_PLANE}} <!-- label + brand lockup tack-sharp; state what falls off --> |
| **Optical realism cues** | {{OPTICS_CUES}} <!-- real DOF + bokeh, sensor grain, gentle vignette, filmic roll-off, faint chromatic aberration at high-contrast edges — undetectable-realism doctrine §7ter.B --> |
| **Framing / negative space** | {{FRAMING}} <!-- which third stays clean for the post Arabic headline; product off-centre per rule of thirds --> |

---

## 6. Scene & prompt skeleton (reference-conditioned form)

<!-- HOW TO FILL: This is NOT the final prompt — 26-kie-prompt-builder compiles
it. Provide the reference-conditioned skeleton: base image (the locked cutout) +
world/scene + rig instruction. Describe ONLY the world and the light in words.
Describe the product with a pointer to the reference, never with adjectives a
model would redraw. NO Arabic campaign text in-model. -->

**Base image (locked):** `{{REFERENCE_FILE}}` — product region preserved pixel-true.

**Studio world / scene instruction (generated around the product):**
> {{SCENE_INSTRUCTION}}
<!-- Surface, sweep, palette, any single prop, mood. For the mechat packshot: warm
stone plinth or seamless cream-to-garnet sweep, one restrained prop max (a single
red hibiscus or a dry palm frond), luxury editorial calm. Keep it uncluttered. -->

**Lighting instruction (from Section 4, in words the model acts on):**
> {{LIGHT_INSTRUCTION}}
<!-- Directional warm key from upper-left, soft fill, back rim separating the glass,
graduated background darker behind the neck so the transparent bottle reads. -->

**Realism cues (filmed-not-rendered — STUDIO-BIBLE-V2 §7ter.B):**
- {{REALISM_CUES}} <!-- physically-correct contact shadow + soft base reflection, real refraction of oil colour through glass, one honest hero specular (not a ring of CGI hotspots), subtle sensor grain, filmic highlight roll-off, faint vignette; NOT a clinically clean over-perfect render -->

**Explicitly generate as EMPTY / clean (for post text):**
- {{CLEAN_ZONES}} <!-- the negative-space region(s) from Section 5 stay smooth so overlaid Arabic reads with contrast; no props or busy texture there -->

---

## 7. Turntable / rotation spec  (lp-3d-banner keyframe — STUDIO-BIBLE-V2 §7bis 3D caveat)

<!-- HOW TO FILL: Fill this block ONLY if this render feeds a lp-3d-banner
turntable or any motion. FIRST declare the rotation capability from
reference-manifest.yaml `rotation_capability`. The hard rule: never invent a
hidden face of the bottle. If only a front reference exists, restrict to a
label-face-on micro-move (route R3) and FLAG that back/profile/top references
would unlock full 360°. If this is a still packshot only, write "N/A — still
packshot, no rotation" and delete the table. -->

| Field | Value |
|-------|-------|
| **Rotation used?** | {{ROTATION_USED}} <!-- yes (turntable/micro-move) / no (still) --> |
| **Current capability** | {{ROT_CAPABILITY}} <!-- from reference-manifest: "face-on micro-move only" (single front ref) vs "full 360°" --> |
| **References available** | {{ROT_REFS}} <!-- list the angle refs present: 01-front / 10-back / 11-profile-left / 12-profile-right / 13-top --> |
| **Permitted move** | {{ROT_MOVE}} <!-- label-face-on ±8–12° micro-rock (single front) · full 360° turntable (all angles) --> |
| **Route** | {{ROT_ROUTE}} <!-- R3 image-to-video from the approved keyframe; product never re-drawn per frame --> |

**Turntable technical spec (if a loop is produced):**
| Field | Value |
|-------|-------|
| **Arc / degrees** | {{TT_ARC}} <!-- ±10° micro-rock, or 360° --> |
| **Duration / loop** | {{TT_DURATION}} <!-- 3–5s, seamless first=last frame for a clean loop --> |
| **Rotation speed / easing** | {{TT_EASING}} <!-- slow, constant or gentle ease-in-out; no snap --> |
| **Fixed vs orbit** | {{TT_MODE}} <!-- bottle rotates on axis (preferred) vs camera orbits --> |
| **Lighting continuity** | {{TT_LIGHT_CONT}} <!-- key stays put so speculars travel naturally across the glass; no flicker/relight per frame (§45 temporal) --> |

**360° UNLOCK FLAG:** {{UNLOCK_FLAG}}
<!-- If capability is "face-on only", state exactly which references (10-back,
11-profile-left, 12-profile-right, 13-top) the owner must add to unlock a true
turntable, and confirm you did NOT rotate past the referenced faces. -->

---

## 8. Model + credit route  (config/kie-models.yaml — the credit engine, §5)

<!-- HOW TO FILL: The format-router (skill 31) fills this from the `3d-render`
route in creative-matrix.yaml. Default routing: draft on a cheap reference-capable
model (nano-banana, bg-replace) to lock the composition + rig, QC to ≥95, then ONE
clean final on the fidelity specialist (flux-kontext, edit/bg-replace), then upscale
for resolution only. The chosen model's reference_modes MUST include your route's
mode. A t2i-only model for the product is FORBIDDEN. -->

| Stage | Model (kie-models.yaml id) | cost_tier | reference_mode used | Purpose |
|-------|---------------------------|-----------|---------------------|---------|
| Draft / iterate | {{DRAFT_MODEL}} <!-- default: nano-banana --> | draft | {{DRAFT_MODE}} <!-- bg-replace --> | cheap rig + composition lock, QC to ≥95 |
| Final render | {{FINAL_MODEL}} <!-- default: flux-kontext --> | final | {{FINAL_MODE}} <!-- edit / bg-replace --> | one final-tier render of the approved draft |
| Upscale (if used) | {{UPSCALE_MODEL}} <!-- kie-upscaler --> | draft | upscale | resolution/detail only — never regenerate (§5.9) |
| Turntable (if §7) | {{TT_MODEL}} <!-- i2v: kling / veo3-fast for the micro-move --> | {{TT_TIER}} | i2v | animate the approved keyframe (route R3) |

| Field | Value |
|-------|-------|
| **Cheaper fallback route** | {{FALLBACK_ROUTE}} <!-- every asset carries one cheaper fallback model/route (§5.10) --> |
| **Est. credits — this master** | {{CREDIT_EST}} <!-- relative estimate; verify current pricing at kie.ai before spend --> |
| **Exports from this one master** | {{EXPORT_MATRIX}} <!-- alpha-matte packshot png + scene webp; ratios are crops/recompose of the master, NOT new gens (§5.4) --> |
| **Spend gate** | No final-tier credit is spent until Section 9 fidelity + realism + QC gates are GREEN (§5.5, §5.10). |

---

## 9. Fidelity + realism + QC gate  (fill LAST — hard gate before any final spend)

<!-- HOW TO FILL: The automatic gate (skills 41 + 46 + 27 + 28). It runs on the
generated master against products/<slug>/fidelity-checklist.md and the QC rubric.
NOTHING ships and no final-tier credit is spent unless every hard axis is GREEN.
The user never verifies fidelity by hand — record the gate result here. Re-generate
on a fail; never patch a fidelity fail by hand. -->

**Fidelity axes (product-fidelity-checker, skill 41 — HARD, no ship on fail):**
| Axis | Threshold | Result |
|------|-----------|--------|
| Vessel shape & proportions match reference (cylindrical, tall/slim, smooth) | exact | {{FID_SHAPE}} |
| Cap type/colour (white, vertically ribbed, narrower than body) | exact | {{FID_CAP}} |
| Liquid colour (brown-amber-red, translucent) + headspace air-gap | ΔE ≤ 3 vs sampled | {{FID_LIQUID}} |
| Label artwork, lockup «المشاط»/«للشعر», benefits, 250 ml | exact, no invented glyphs | {{FID_LABEL}} |
| Gold «طبيعي / 100% natural» seal present, single, correctly placed | exact | {{FID_SEAL}} |
| No «الأحمر» painted on the physical label | absent | {{FID_NO_AHMAR}} |
| No hidden/invented face shown (rotation within referenced angles only) | pass | {{FID_NO_INVENT}} |

**Realism / undetectability axis (ai-tell-detector, skill 46 → 27):**
| Axis | Threshold | Result |
|------|-----------|--------|
| "Obviously CGI/AI" tell scan (clinical over-clean render, ring of fake hotspots) | zero hard tells | {{QC_AI_TELL}} |
| Contact shadow & base reflection physically correct (bottle anchored, not floating) | pass | {{QC_SHADOW}} |
| Glass refraction + oil colour transmission physically plausible | pass | {{QC_REFRACTION}} |
| Real optics (DOF, grain, roll-off, vignette), not infinite-focus perfection | pass | {{QC_OPTICS}} |
| (If turntable) no frame-to-frame identity drift / flicker / relight (skill 45) | pass | {{QC_TEMPORAL}} |

**Conversion / craft axis (creative-scoring-engine, skill 28):**
| Axis | Threshold | Result |
|------|-----------|--------|
| Luxury credibility / "premium real product" read | ≥ 8/10 | {{QC_LUXURY}} |
| Negative space clean & sufficient for post Arabic overlay | pass | {{QC_NEGSPACE}} |
| Alpha matte clean (crisp edges, no fringing) for packshot deliverable | pass | {{QC_MATTE}} |
| Overall QC score | **≥ 95** | {{QC_SCORE}} |

**GATE DECISION:** {{GATE_DECISION}}
<!-- GREEN = all hard axes pass, QC ≥ 95 → release the master to 38-upscale-
finisher for final render + exports (and, if §7, to the R3 turntable). RED = one
hard axis failed → back to the draft-tier model, do NOT spend final-tier credit. -->

---

## Handoff

On a GREEN gate, this brief hands off:
- **→ 26-kie-prompt-builder** — compile the Section-6 reference-conditioned
  skeleton (base image + world + rig) into the final Kie prompt for
  `{{FINAL_MODEL}}`.
- **→ 24-negative-prompt-builder** — merge this render's fidelity + AI-tell
  negatives (square/faceted body, gold/black cap, bright ruby oil, invented
  «الأحمر», floating bottle, clinical CGI hotspots, gibberish text) with the bank.
- **→ 37-typography-compositor** — lay any campaign Arabic (headline/CTA/price)
  into the Section-5 clean negative space in post; the render itself carried only
  the product's own photographic label glyphs.
- **→ 38-upscale-finisher** — one final render + the Section-8 export matrix
  (alpha-matte packshot png + scene webp; ratios are crops, not new generations).
- **→ (if §7) R3 turntable** — animate the approved keyframe into the
  `lp-3d-banner` micro-move / turntable, within the referenced angles only.
- **→ 41 / 46 / 27 / 28** — re-run the Section-9 gate on every render and every
  turntable frame, automatically.

> Delete this line and the `status:` frontmatter line once the brief is filled.
