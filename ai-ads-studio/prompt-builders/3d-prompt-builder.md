# 3D / CGI Render Prompt Builder — compiling ONE studio-render prompt, reference-locked

> **What this file is.** The *compiler procedure* that turns one approved render
> intent from **34-3d-render-director** into ONE finished, model-ready prompt for a
> **studio-CGI packshot**, a **scene render**, or a **turntable / rotation** loop —
> without ever building a 3D model of the bottle or describing the vessel in words for
> the model to redraw. It is the render-family twin of `prompt-builders/
> video-prompt-builder.md` (moving product beats) and reuses the same two dialect
> phrasebooks: `image-model-dialect-map.md` for static packshots/scene renders
> (nano-banana / flux-kontext / seededit / gpt-image), and `model-dialect-map.md` for
> the R3 turntable micro-move (kling / veo3 / runway).
>
> **Division of labour.** `34-3d-render-director` decides the *art* (which render
> intent, the lighting rig, the shader brief, the caustics plan) on paper. **This
> builder decides WHAT goes in the render payload and in WHAT ORDER** — the block
> architecture, the "simulate the renderer in the model's head" phrasing, the material
> and lighting payloads, the angle ceiling for a single-front reference, the negative
> handling, the length/credit budget. The **dialect maps decide HOW each block is
> phrased** for the chosen model. You run this builder, then port its output through the
> matching dialect section. One render intent in → one dialect-correct prompt out.
>
> **Owner:** `26-kie-prompt-builder` (assembles) driven by `34-3d-render-director`, with
> `43-physics-materials-realism-director` (shader truth), `42-optical-camera-realism-director`
> (lens/sensor truth), `13-lighting-director` (studio rig), `19-oil-product-realism-director`
> (oil optics), `24-negative-prompt-builder` (negatives). `31-format-router` supplies the
> route + model ladder from `config/kie-models.yaml`; `41-product-fidelity-checker` and
> `46-ai-tell-detector` gate the result.
>
> **Reads:** the active `products/<slug>/product-lock.yaml` + `reference-manifest.yaml`
> (which real photo feeds R1 vs R3, and the `rotation_capability` gate),
> `products/<slug>/fidelity-checklist.md`, `knowledge/3d-product-render.md`,
> `knowledge/undetectable-realism-doctrine.md`, `knowledge/hair-oil-realism.md`,
> `knowledge/gulf-beauty-brand-norms.md`, `prompt-builders/negative-bank.md`,
> `config/kie-models.yaml` (route + tier + reference_modes).
>
> **Scope:** the `3d-render` (static CGI packshot / scene render) and `lp-3d-banner`
> (animated rotation) creative-matrix families. NOT the cinematic hero video (that is
> `video-prompt-builder.md`), NOT the label typography (that is POST,
> `37-typography-compositor`).

---

## 0. The six compile laws (inherited, never negotiable)

These are the studio's prime constraints expressed as *render-compiler* rules. If a
block you are about to emit violates one, the block is wrong — fix the block, not the law.

1. **We never model or redraw the bottle. Ever.** There is no CAD step, no text-to-3D,
   no text-to-image of the product. The vessel pixels ALWAYS arrive from the real photo
   via one of the three §7bis routes. The prompt you compile describes the **world,
   light, material response, caustics and contact** *around* a pixel-intact product — it
   never describes the vessel geometry, the label, the cap ribbing or the oil as words
   for the engine to invent. If you find yourself typing "a tall clear bottle with a
   white cap," STOP: that is text-to-image and it will drift the shape and mangle the
   label. Point at the reference instead.
2. **Simulate the renderer in the model's head, not in a renderer.** The "expensive CGI
   packshot" look lives in **light, material response, contact and background** — all of
   which the lock's `allowed_variation` lets us author. You tell a bg-replace / edit
   model to *behave like Octane lit by a studio HDRI* (IOR-correct glass, Beer-Lambert
   oil, softbox strip speculars, ground caustics) while the bottle stays the real cutout.
3. **No Arabic in the payload.** Never compile the label copy, a headline, CTA, price or
   any on-screen word into a render prompt. Every image and video engine is
   `arabic_text: poor/na`; requesting text burns the render and returns gibberish. The
   physical label arrives as reference pixels; ad copy is POST (`37-typography-compositor`).
4. **The label must stay legible and specular-free.** A clean render's #1 self-inflicted
   fidelity failure is a hot softbox reflection blowing out the white label so the
   fidelity gate can't read «المشاط», the seal or the benefit lines. Every lighting
   payload you compile carries a flag/gobo clause that keeps the key specular OFF the
   front label panel.
5. **Angle obeys the reference budget.** With a single front photo you may compile only
   the angles that keep the true front label legible (§6). A full 360° turntable is
   FORBIDDEN until `reference-manifest.yaml → rotation_capability` confirms the extra
   angles exist. When it doesn't, you compile a face-on micro-move and flag the gap.
6. **Compile once per tier; one master → many exports.** Compile the payload once for the
   draft engine to prove the look, then — unchanged except engine fidelity — for the ONE
   final engine. You compile the HERO MASTER packshot; catalog/feed/banner/LP-hero crops
   are recompose, not new compiles. Resolution comes from `38-upscale-finisher`.

---

## 1. Inputs the builder requires (refuse to compile without them)

| input | source | if missing |
|-------|--------|-----------|
| render intent (packshot \| scene \| turntable) | `34-3d-render-director` | STOP — nothing to compile |
| route + reference_mode + model ladder | `31-format-router` (reads `kie-models.yaml`) | default draft tier, flag router |
| base reference image | `reference-manifest.yaml` (R1 chroma cutout / R3 keyframe) | STOP — no reference, no render |
| product-lock | `products/<slug>/product-lock.yaml` | STOP — product identity unknown |
| rotation_capability | `reference-manifest.yaml` | assume `front-only` → face-on micro-move only |
| shader brief | `34` + `43-physics-materials-realism-director` | derive from `3d-product-render.md` §3 |
| lighting rig | `34` + `13-lighting-director` | derive from `3d-product-render.md` §4 |
| optical directives | `42-optical-camera-realism-director` | derive from doctrine defaults §5 |
| negatives | `prompt-builders/negative-bank.md` | STOP — CGI-tell + fidelity gate cannot pass |
| cost tier (draft/iterate/final) | router / `29-cost-optimizer` | assume draft; NEVER final without QC≥95 |

The render intent arrives in the model-agnostic image IR of `image-model-dialect-map.md`
§1 (`subject_route`, `base_image`, `mask`, `operation`, `scene`, `light`, `camera`,
`mood`, `realism_layer`, `model_presence`, `negatives`, `aspect`, `seed`,
`text_in_image: NONE`). This builder consumes those fields and emits the render blocks below.

---

## 2. The three render intents and where each compiles to

| intent | what it is | route | operation | dialect map | export |
|--------|-----------|-------|-----------|-------------|--------|
| **alpha packshot** | isolated bottle on transparent bg, grounded soft shadow — for catalog / compositing / LP hero | R1 | compose / bg-replace on chroma cutout | image | PNG + alpha |
| **scene render** | product on a designed studio / heritage set, caustics + reflection + set dressing | R1 (hero) or R2 (re-pose) | bg-replace / edit | image | webp |
| **turntable / rotation** | the slow hero rotation for `lp-3d-banner` | R3 | image-to-video from approved keyframe | video | mp4/webm loop |

The **packshot** is almost always the HERO MASTER (law 6): you compile it first, pass it
through fidelity, and every scene render and the turntable keyframe reuse *that* approved
frame. Compile order across a set: packshot master → scene render(s) → turntable.

---

## 3. The eight-block render architecture (the compile target)

Every render prompt is assembled from these eight blocks **in this priority order**. The
dialect map then re-phrases each block per model (nano-banana/flux fuse to a compact
instruction; kling/runway keep short clauses; all preserve ORDER). Front-load: the engine
weights early tokens heavily, so the *operation on the real product* leads and the
constraints trail.

| # | block | carries | source field(s) |
|---|-------|---------|-----------------|
| 1 | **BASE + OPERATION** | "keep this real product pixel-intact; do X to the world" | `base_image`, `operation`, `mask` |
| 2 | **MATERIAL RESPONSE** | how PET glass / amber oil / ribbed cap / matte label react to light | §4, skill 43 |
| 3 | **LIGHTING RIG** | studio HDRI: bright/dark field, key/fill/rim, strip speculars, label flag | §5, skill 13 |
| 4 | **CAUSTICS + CONTACT** | oil-tinted caustic pool, grounded contact shadow, floor reflection | §6, skill 19/43 |
| 5 | **SET / BACKGROUND** | gradient sweep or heritage set, depth falloff, props (scene render only) | `scene`, hero DNA |
| 6 | **CAMERA + OPTICS** | lens, product-photo distance, DoF, the optical-realism payload | `camera`, skill 42 |
| 7 | **MOOD + GRADE** | luxury register, warm amber/garnet palette, film-vs-clinical intent | `mood`, colorist cues |
| 8 | **NEGATIVES + FIDELITY LOCK** | CGI tells to exclude + "do not alter product/label" | `negatives`, lock |

---

## 4. Material-response payload (block 2 — required)

A clear glass bottle *has no colour of its own*; it is defined entirely by what it
reflects and refracts. So the material payload is what makes or breaks the render. Compile
these four surface clauses from the **active lock** (values shown are mechat's — read them
from `product-lock.yaml`, never hardcode):

- **Clear PET glass.** Fresnel-brightened edges, real softbox **strip** speculars down the
  cylindrical wall, IOR-correct refraction of the background through the body, a faint
  **mould seam** and a touch of micro-roughness so it reads as *plastic*, not flawless CGI
  crystal. Phrase as material behaviour, never as "a bottle": *"the transparent PET wall
  refracts the background, catches two soft vertical softbox strips, edges brightened by
  Fresnel, faint mould seam visible."*
- **Translucent amber-brown oil.** Beer-Lambert absorption **gradient** — light warm amber
  where the thin neck is backlit → deep brown-red in the dense mass (lock: `oil_highlight
  #B4652A → oil_mid #7E2E14 → oil_deep #3A1206`). A visible **meniscus** and **fill-line at
  ~0.88** with a clean **headspace air-gap** above it. NEVER "bright ruby / cranberry /
  garnet" — that is a hard fidelity fail (lock `do_not_alter`). A backlight makes it glow
  like a jewel; that glow is the oil's signature.
- **Matte-white vertically-ribbed cap.** The ribbing **breaks the highlight** into fine
  vertical segments (a smooth glossy dome is the tell of an invented cap). Semi-matte, so
  it takes a soft wide highlight, not a mirror hotspot.
- **Matte paper label — NO gloss glare.** The white label is paper, not laminate: it takes
  a soft even fill and **no specular hotspot**. The ONLY glossy accents are the **gold**
  pinstripe on the swoosh and the **gold "100% natural / طبيعي" seal** (lock: seal on the
  LEFT). If the payload lets a highlight land on the label panel, block 3's flag clause
  fixes it — legibility is the fidelity gate.

The material payload is a *required* block. A render prompt without it produces the
clinical, weightless "CGI-plastic" look that `46-ai-tell-detector` hard-flags.

---

## 5. Studio-HDRI lighting-rig payload (block 3 — required)

You light the **environment**, not the object. Compile the rig the director chose:

- **Field choice.** *Bright-field* (bright gradient sweep behind → dark glass edges,
  luminous oil, clean e-commerce look) or *dark-field* (dark surround → bright rim
  outlines the silhouette, jewel-like, premium). State one; they read completely differently.
- **Key / fill / rim / kicker.** Key = a large **softbox / strip** whose *shape* you want
  to see reflected in the PET (a tall strip reads as a luxury product light). Fill lifts
  shadow on the shaded side. **Rim / kicker** from behind separates the bottle from the
  background and lights the oil through the glass.
- **Gradient sweep background.** A seamless graduated backdrop (light-to-dark) is what
  sells "studio"; specify direction so it complements the oil glow.
- **The label flag (law 4).** A **flag / gobo** that keeps the key specular OFF the front
  label panel so «زيت المشاط للشعر», the gold seal and the benefit lines stay crisp. This
  clause is mandatory in every packshot/scene payload.
- **Colour temperature.** Warm (≈3200–4000K) to echo the amber oil and the Gulf
  heritage-home palette (`gulf-beauty-brand-norms.md`) — not clinical 6500K white, which
  reads as stock-CGI and clashes with the brand's warm garnet/gold DNA.

---

## 6. Caustics, contact, and the single-front angle ceiling (block 4 + geometry)

- **Caustics.** A translucent oil bottle throws a warm **amber caustic pool** in the key
  direction — the single most convincing "expensive render" cue. Compile it tinted to the
  oil, soft-edged, in the key's cast direction, on the surface the bottle sits on.
- **Contact shadow.** A **grounded** ambient-occlusion contact shadow directly under the
  base — darkest and sharpest at the contact line, softening outward. A *detached /
  floating* shadow is an instant AI tell and a fidelity smell; the payload states "grounded,
  contact-anchored."
- **Reflection.** A faint floor reflection on a polished surface adds weight; keep it
  subtle (a mirror-perfect reflection reads CGI).

**Angle ceiling for a single-front reference (law 5).** The reference is one front photo,
so the model has no truthful data for the back, the far profile, or the hidden label wrap.
Compile only:

| rotation_capability | allowed camera / motion | forbidden |
|---------------------|-------------------------|-----------|
| `front-only` (default) | face-on ±0°; hero 3/4 up to **≈±12° yaw** and **≈±8° pitch** keeping the full front label legible; slow dolly-in, rack focus | any yaw that hides label elements, back view, far profile, full turntable |
| `front+profile` | up to ≈±35° yaw | rear 180° |
| `full-set` (front/back/profiles/cap-macro) | full 360° turntable | — |

For `lp-3d-banner` on a `front-only` product you compile an R3 **face-on micro-rotation**
(a gentle ±10° oscillation or a slow parallax that never crosses the label horizon) as a
loop-matched keyframe pair, and you emit a **FLAG**: *"full 360° turntable requires
back/profile/cap references — capture them to unlock."* Never fabricate the unseen faces.

---

## 7. Optics + negative handling (blocks 6 & 8 — required)

- **Optics (block 6).** Even a studio packshot is a *photograph of a render*: compile a
  real product-photography lens (≈85–100mm macro-ish), a shallow-but-legible aperture that
  keeps the whole front label in focus while the background falls off, subtle sensor grain,
  and filmic highlight roll-off on the cap and glass speculars — never clinical clipped
  whites. This is what stops the render reading as "3D software preview" (`42` /
  `undetectable-realism-doctrine.md`).
- **Negatives (block 8).** Pull the render-family negatives from `negative-bank.md` and
  dialect them: exclude **CGI-plastic look, clay/wax surface, floating/detached shadow,
  mirror-perfect over-reflection, blown-out label, glossy laminate label, smooth un-ribbed
  cap, square/squat bottle, bright ruby/cranberry oil, invented text, English brand name,
  extra label elements, watermark**. Every fidelity `hard_fail_any` item from the lock has
  a matching negative. Positive material clauses (block 2) do the heavy lifting; negatives
  catch the residue.

---

## 8. Length + credit budget per engine (the compile ceiling)

| engine | family | payload budget | tier | note |
|--------|--------|----------------|------|------|
| nano-banana (Gemini edit) | image | tight instruction, ~1 compact paragraph | draft | best compositor / bg-replace; prove the look here |
| flux-kontext | image | structured clauses, medium | final | reference-preserving edit; the packshot final |
| seededit / gpt-image | image | medium | iterate/final | strong adherence backups |
| kie-upscaler | image | n/a | finish | resolution only — never a fresh compile |
| kling (start+end) | video | short clauses + motion verb | draft/final | the R3 turntable micro-move |
| veo3 / runway | video | prose paragraph | final | premium turntable finish |

Draft→final gating (law 6, credit policy §5): iterate the payload on **nano-banana /
kling-std** until `41` fidelity ≥ 95 AND `46` tell-check passes, then run the ONE
flux-kontext / kling-pro final. Never iterate at final cost. One video gen per approved
turntable keyframe.

---

## 9. The compile procedure (run in order)

1. **Load** the active `product-lock.yaml` + `reference-manifest.yaml`; confirm the base
   reference exists and read `rotation_capability`. No reference → STOP.
2. **Take** the render intent + IR from `34`; confirm `subject_route ∈ {R1, R2, R3}` and
   `text_in_image: NONE`. A `t2i` route on a product subject → STOP, bounce to router.
3. **Set block 1** — name the base reference and the operation ("keep this product
   pixel-intact; bg-replace / edit / animate the world only"). Never describe the vessel.
4. **Compile block 2** (material response) from the lock's `vessel/liquid/cap/label` +
   palette hexes + skill 43. Required.
5. **Compile block 3** (lighting rig) from the director's field/key/rim choice + skill 13;
   ALWAYS append the label-flag clause (law 4). Required.
6. **Compile block 4** (caustics + grounded contact + reflection) from skill 19/43.
7. **Compile block 5** (set/background) — only for scene renders; packshots get the
   gradient sweep / transparent-bg alpha spec instead.
8. **Compile block 6** (camera + optics) from skill 42; enforce the §6 angle ceiling
   against `rotation_capability`. If turntable on `front-only` → face-on micro-move + FLAG.
9. **Compile block 7** (mood + grade) — warm luxury register, brand palette.
10. **Compile block 8** — dialect the negatives; append the "do not alter product/label"
    fidelity lock line.
11. **Order + front-load** blocks 1→8; trim to the engine budget (§8).
12. **Port** through the matching dialect map section (image for packshot/scene, video for
    turntable) to the router-named engine.
13. **Run the pre-emit checklist** (§10). Any NO → do not emit; fix the block.
14. **Emit** the draft-tier prompt + the export spec (alpha PNG / scene webp / loop mp4) +
    the credit estimate + the fidelity/tell gate handoff. On green, re-port unchanged to
    the final engine.

---

## 10. Pre-emit validation checklist (all must be YES)

- [ ] Block 1 points at a REAL reference; the vessel is NOWHERE described in words.
- [ ] `subject_route` is R1/R2/R3 — never `t2i` for the product.
- [ ] Material payload present: PET Fresnel/seam, oil Beer-Lambert gradient + fill-line +
      headspace, ribbed cap broken highlight, matte label with gold-only spec.
- [ ] Oil reads warm brown-amber-red (lock hexes), NOT ruby/cranberry.
- [ ] Lighting payload includes the label-flag clause (specular OFF the label).
- [ ] Caustics tinted to the oil; contact shadow grounded (not floating).
- [ ] Angle within the `rotation_capability` ceiling; turntable-on-front-only carries the
      face-on-micro-move + "need more angles" FLAG.
- [ ] No Arabic / Latin / price / CTA text anywhere in the payload.
- [ ] Negatives cover every lock `hard_fail_any` (square vessel, altered label, moved seal,
      ruby oil, CGI-plastic, blown label).
- [ ] Optics block present (real lens, grain, filmic roll-off) — not a clinical 3D preview.
- [ ] Tier = draft on first compile; final only after `41 ≥ 95` + `46` pass.
- [ ] Export spec stated (alpha PNG for packshot / webp for scene / loop-matched mp4+webm
      for turntable); one master → exports are recompose.

---

## 11. Worked compile — mechat HERO packshot → generic IR → nano-banana → flux-kontext

**Render intent (from 34):** alpha-matte HERO MASTER packshot, dark-field, jewel-glow oil,
for LP hero + retargeting + as the turntable keyframe. Route R1, base
`references/02-front-chroma-magenta.png`, `rotation_capability: front-only`.

**Generic IR (blocks 1→8):**
```
1 BASE+OP  : keep THIS product (ref 02-chroma) 100% pixel-intact; generate only the world
2 MATERIAL : clear PET — Fresnel edges, two vertical softbox strips, mould seam, micro-rough;
             oil — amber #B4652A at backlit neck → #7E2E14 → #3A1206 mass, meniscus, fill ~0.88,
             headspace air-gap; cap — matte white vertical ribs breaking the highlight;
             label — matte paper, NO glare; gold-only spec on the left «طبيعي» seal + pinstripe
3 LIGHT    : dark-field; tall strip softbox key camera-left; rim/kicker behind through the glass;
             graduated dark sweep bg; FLAG/GOBO keeps key specular OFF the front label panel; 3600K
4 CAUSTIC  : warm amber caustic pool cast to camera-right; grounded contact shadow under base;
             faint polished-floor reflection
5 SET      : none — transparent alpha packshot, soft grounded shadow retained
6 CAMERA   : 90mm macro, f/5.6 (full front label sharp), bg falloff; subtle grain; filmic roll-off;
             face-on, 0° yaw (front-only ceiling)
7 MOOD     : warm luxury, garnet/gold brand register, jewel-like, filmed-not-rendered
8 NEG      : CGI-plastic, clay, floating shadow, mirror over-reflection, blown label, glossy label,
             smooth cap, square bottle, ruby oil, any text/watermark; DO NOT ALTER product or label
```

**→ nano-banana (draft, R1 compose — image dialect §3.1):** one compact instruction:
*"Using the provided product image unchanged, place it on a transparent background as a
premium dark-field studio packshot: tall softbox strip key from camera-left reflected as a
vertical highlight down the clear PET wall, warm rim light behind glowing through the
translucent amber-brown oil (light amber at the neck deepening to brown-red in the mass,
visible fill-line and air-gap), matte-white ribbed cap with a broken vertical highlight,
matte white label with no glare and only the gold seal and gold pinstripe catching light, a
warm amber caustic pool and grounded contact shadow to the right, 90mm macro look, subtle
grain, filmic highlights. Keep the product, label and all printed text exactly as in the
reference. No new text."* Negatives per §7.

**→ flux-kontext (final, unchanged intent — image dialect §3.2):** same payload as a
reference-preserving edit at final tier, run ONCE after `41 ≥ 95` and `46` pass; then
`38-upscale-finisher` for resolution. The approved frame becomes the turntable R3 keyframe.

**Turntable variant (`lp-3d-banner`, front-only):** feed the approved packshot to kling
start+end as a **±10° face-on oscillation**, loop-matched first/last frame, fast tier, and
emit the FLAG: *"full 360° turntable needs back/profile references."* (video dialect map.)

---

## 12. Failure conditions (hard stops)

- **You described the bottle in words.** Any vessel/label/cap/oil geometry written as a
  prompt string for the engine to draw → t2i drift, mangled Arabic, hard fidelity fail.
  STOP; point at the reference.
- **No base reference / no `rotation_capability`.** You cannot compile a render without the
  real product pixels or without knowing which angles are legal. STOP.
- **Arabic or ad copy in the payload.** Any label/headline/CTA/price text compiled into the
  render → gibberish + wasted credit. STOP; text is POST.
- **Full 360° on a single-front product.** The engine will invent the unseen faces and
  drift the label wrap. STOP; face-on micro-move + FLAG only.
- **Ruby/cranberry oil, square vessel, glossy/blown label, floating shadow, smooth cap.**
  Each is a lock `hard_fail_any`. If the payload can produce it, the material/negative
  blocks are wrong — fix before emit.
- **Final tier before the gate.** Compiling at flux-kontext/veo3 cost before `41 ≥ 95` and
  `46` pass violates the credit policy. STOP; iterate on draft.
- **Fresh compile for a new size/ratio.** One master → many exports; a per-size regen is a
  cost violation. Recompose, don't recompile.

---

## 13. Handoff

- **To `26-kie-prompt-builder`** — the ordered, dialected render prompt string(s) (draft +
  final), the operation + base reference id, the export spec, and the credit estimate.
- **To `41-product-fidelity-checker`** — the render + the lock `fidelity-checklist.md` axes
  (vessel shape, label elements, seal position, cap ribbing, oil ΔE ≤ 3). Hard gate before
  any final spend and after every render.
- **To `46-ai-tell-detector`** — the render for the CGI-tell pass (plastic look, floating
  shadow, over-reflection, clinical light).
- **To `37-typography-compositor`** — the approved render for any on-asset Arabic headline /
  price / CTA overlay (added in POST, never in the render).
- **To `36-microvideo-director` / video dialect** — the approved packshot as the R3
  turntable keyframe, plus the `rotation_capability` FLAG if angles are missing.
- **To `38-upscale-finisher`** — the single approved master for the ONE upscale + the
  export matrix (all ratios/placements derived by recompose).
- **To `29-cost-optimizer`** — the per-render credit estimate + the cheaper fallback route
  (nano-banana vs flux-kontext) for the campaign budget.
- **Back to `34-3d-render-director`** — if the render intent is un-compilable (missing
  reference, illegal angle, t2i route), bounce with the specific blocker.
