# Reference-Conditioning Guide — how to structure R1 / R2 / R3 prompts on Kie

> **What this file is.** The *wiring manual* for reference-conditioned generation.
> Every product-bearing asset the studio makes is conditioned on the owner's REAL
> photos (`products/<slug>/references/`), never text-to-image of the bottle. This
> guide tells you, per route, **exactly what to hand the Kie model**: which
> reference image, whether a mask/cutout is required, how the seed is locked, how
> start/end frames are set for loops, and the fidelity guardrails that must ride on
> every payload. It is the layer *between* the format-router (which picks the route
> + model) and the two prompt compilers (`image-prompt-builder.md`,
> `video-prompt-builder.md`, phrased through the dialect maps).
>
> **Owner:** `26-kie-prompt-builder` (assembles), fed by `31-format-router`
> (route + model + tier), gated by `41-product-fidelity-checker` and
> `46-ai-tell-detector`. Text is added downstream by `37-typography-compositor` /
> `54-motion-graphics-compositor` — **never here.**
>
> **Reads (always the ACTIVE product — never hardcode mechat):**
> `products/<slug>/product-lock.yaml`, `products/<slug>/reference-manifest.yaml`,
> `products/<slug>/fidelity-checklist.md`, `config/kie-models.yaml`
> (`reference_modes` + `routing_matrix`), `knowledge/undetectable-realism-doctrine.md`.
>
> **The three routes (fidelity order, from Bible §7bis.1):**
> **R1** product-real / world-AI (DEFAULT) · **R2** reference-conditioned edit ·
> **R3** image-to-video from an approved keyframe.
>
> Worked examples below use the flagship **زيت المشاط الأحمر** (*zayt al-mishāṭ
> al-aḥmar*, "Red Mechat hair oil") — a tall slim clear-PET cylinder, white ribbed
> screw cap, mahogany-amber oil, label reading **زيت المشاط للشعر**. Every rule is
> product-agnostic; the mechat is only the illustration.

---

## 0. The reference-conditioning laws (inherited, never negotiable)

If a payload you are about to send violates one of these, the payload is wrong.
Fix the payload — never the law, and never "just this once" send the product as text.

1. **The product is pixels, never prose.** The product region always originates
   from a real reference image. You may *describe the scene, light, motion, and
   mood* in words; you may **never** describe the bottle, cap, or label for the
   model to redraw. Text cannot reproduce a label — it invents one. (Bible §7bis.1)
2. **Route before payload.** The format-router has already chosen R1 / R2 / R3 and
   a reference-capable model for this asset. If the model the router handed you is
   `t2i`/`t2v`-only for a product asset, STOP and bounce back — that is forbidden by
   `kie-models.yaml` and would reinvent the product.
3. **One reference per identity, one seed per set.** Reuse the same canonical
   reference image and the same fixed seed across the whole campaign so the bottle
   is the *same object* in every frame and every size. Different seed = different
   bottle = discards.
4. **No Arabic in the payload.** All Kie image/video models are `arabic_text:
   poor`. Label copy, headline, CTA, and price are added in post. Send the bottle
   with its *printed* label already correct (it's in the reference); add nothing.
5. **Mask defends the label.** Whenever a route regenerates pixels near the
   product, a mask/cutout or an explicit preserve-instruction must protect the
   label + cap region so the model cannot touch it.
6. **Draft the frame, then commit.** Build and QC every keyframe on the DRAFT tier;
   only the approved, fidelity-passed frame is upscaled or animated. Never iterate
   at final cost. (credit_policy, `kie-models.yaml`)
7. **Fidelity is a gate, not a hope.** `41-product-fidelity-checker` runs on the
   output of every route, every time. You structure the payload so it PASSES by
   construction (real pixels in, label untouched), not so a human has to check.

---

## 1. Pick the route (what the router already decided, and why)

The `routing_matrix` in `config/kie-models.yaml` and `routing:` in the product's
`reference-manifest.yaml` bind each asset family to a route. This table is the
"why" you are enforcing, so you recognise a mis-route.

| Asset family        | Route | Reference used (mechat)        | Model draft → final            |
|---------------------|-------|--------------------------------|--------------------------------|
| `image-ad`          | R1    | `02-front-chroma-magenta`      | nano-banana → flux-kontext     |
| `banner`            | R1    | `02-front-chroma-magenta`      | nano-banana master → recompose |
| `3d-render`         | R1    | `02-front-chroma-magenta`      | nano-banana → flux-kontext     |
| `lp-hero-image`     | R1    | `02-front-chroma-magenta`      | nano-banana → flux-kontext     |
| `lp-section-image`  | R1    | `02-front-chroma-magenta` (batch) | seedream (shared style)     |
| `lp-microvideo`     | R3    | `02-front-chroma-magenta` kf   | hailuo/seedance → kling/veo3-fast |
| `lp-3d-banner`      | R3    | `01-front-white` kf            | kling (start+end frame)        |
| `hero-video-ad`     | R3    | approved keyframe (built R1)   | veo3-fast/kling → veo3         |

**Decision order the router uses (and you sanity-check):**

- **Static product asset?** → **R1** by default. Keep the real packshot pixel-intact;
  let AI generate only the world around it (background + relight + contact shadows).
  This is highest-fidelity AND usually cheapest — the product is never re-computed.
- **R1 can't get the pose/light you need** (e.g. the ref is front-flat but the
  concept needs the bottle tilted, or the label relit into a scene)? → **R2**
  reference-conditioned edit on a reference-capable model (flux-kontext,
  nano-banana edit, seededit, gpt-image edit), with the label region masked.
- **The asset moves?** → **R3** image-to-video from an already-approved,
  fidelity-passed keyframe. The engine animates the *scene*; the bottle rides along
  as pixels, never redrawn frame-by-frame.

**Never** downgrade a product asset to t2i/t2v to "save a step." The step you skip
is the fidelity gate, and you pay for it in regenerations.

---

## 2. R1 — product-real / world-AI (the default, highest fidelity)

**Idea:** the real product pixels are non-negotiable; AI only builds the environment
*around* a preserved subject. Two sub-forms:

- **R1-composite (preferred):** cut the product out on a clean matte, then place the
  real cutout into an AI-generated (or edited) plate, and relight/ground it.
- **R1-bgreplace:** hand a reference-capable model (nano-banana / flux-kontext in
  `bg-replace` mode) the packshot + a keep-subject instruction; it replaces only the
  background and adds contact shadow/reflection.

### 2.1 What you hand Kie

| Slot | Content | Notes |
|------|---------|-------|
| `image` (base/subject) | the chroma / clean-bg packshot from `reference-manifest.routing[<family>].ref` | mechat: `02-front-chroma-magenta` — isolates cleanly |
| `mask` | subject alpha (keep) OR background region (regenerate) | see §5 |
| `mode` | `bg-replace` (single image) or composite pipeline | from `routing_matrix` |
| `prompt` | **scene only** — surface, light direction, palette, mood, negative space for overlay | zero product words |
| `seed` | the campaign seed (fixed) | §6 |
| `negatives` | from `negative-bank.md` + label-drift guards | §7 |

### 2.2 The cutout / chroma workflow (why the magenta ref exists)

The mechat registry ships `02-front-chroma-magenta` precisely so the subject
isolates with a hard, spill-free edge. Procedure:

1. Key out the magenta → clean alpha. Preserve a 1–2 px feathered edge; kill green/
   magenta spill on the glass rim and cap highlights (translucent PET picks up spill).
2. Keep the alpha for the whole set — the *same* cutout in every size guarantees the
   *same* bottle. Do not re-cut per asset.
3. Composite onto the AI plate, then relight so the product and plate agree
   (light direction, colour temperature, contact shadow, a soft floor reflection).
   A mismatched shadow/reflection is a top AI tell (`46-ai-tell-detector`).

If the model does the bg-replace itself (no manual cutout), pass the packshot as the
subject reference and phrase the instruction as *"keep the bottle, its cap, and its
label exactly as in the reference; replace only the background with …"* — plus a
subject-preserve mask (§5) so it physically cannot repaint the label.

### 2.3 R1 mechat worked payload

```
base_image:  products/mechat-red-oil/references/02-front-chroma-magenta.png
mode:        bg-replace   (nano-banana, cost_tier draft → iterate)
mask:        subject-alpha = KEEP (bottle+cap+label locked); background = REGENERATE
seed:        814430   (campaign seed — same across the whole set)
prompt(scene-only):
  "Luxury still-life surface, warm honey-gold morning light raking from
   camera-left, polished travertine ledge, soft eucalyptus shadow, deep
   negative space on the right third for headline overlay, shallow depth of
   field, gentle falloff to a warm cream background. Photographed on an
   85mm lens, subtle film grain, realistic contact shadow and a faint floor
   reflection under the bottle."
negatives:  (label edits, extra text, changed cap, square bottle, second bottle,
            plastic-perfect skin n/a, warped rim, floating object, hard AI edge)
```

Nothing in that prompt describes the bottle — the bottle is the reference. The
right-third negative space is reserved for the Arabic headline that
`37-typography-compositor` sets later.

### 2.4 R1 fidelity guardrails

- Subject pixels must survive **untouched** — diff the output subject against the
  reference; any label glyph change, cap-rib change, or proportion shift = REJECT.
- Ground the product: real contact shadow + faint reflection matching the plate's
  light. Floating = fake.
- Colour of the *oil* reads through the glass; do not let a relight tint the
  mahogany-amber outside the lock's ΔE. Sample and compare.

---

## 3. R2 — reference-conditioned edit (when R1 pose/light isn't enough)

**Idea:** feed the real photo as a strong reference; the model re-poses / relights /
re-scenes the product while a reference-capable engine holds its identity. Use only
when R1 composite can't achieve the needed geometry (tilt, hero angle, in-scene
relight of the label). Reference-capable models only: **flux-kontext** (identity-
preserving edits — the default R2 model), nano-banana edit, seededit, gpt-image edit.

### 3.1 What you hand Kie

| Slot | Content | Notes |
|------|---------|-------|
| `image` | canonical reference (mechat: `01-front-white`) | the identity source |
| `mask` | **inpaint mask over the background/scene only**, label+cap region PROTECTED | §5 |
| `mode` | `edit` / `inpaint` / `subject-lock` | per model's `reference_modes` |
| `instruction` | the *edit*, phrased as a transformation, not a description | see below |
| `strength` / `denoise` | LOW near the product, higher for the scene | §3.3 |
| `seed` | campaign seed | §6 |

### 3.2 Phrase edits as transformations, not descriptions

- ✅ *"Keep the bottle, cap and label identical to the reference; re-light with warm
  spa candlelight from the left and place it on wet black slate with steam."*
- ❌ *"A tall clear bottle of red hair oil with a white cap and Arabic label on a
  slate surface."* ← this invites the model to redraw the label = drift.

The instruction names what CHANGES (light, surface, atmosphere) and explicitly what
must NOT change (bottle, cap, label). Everything preserved is anchored to pixels.

### 3.3 Denoise / strength discipline (the label's life depends on it)

The single biggest R2 failure is too-high denoise letting the label region drift.

- **Masked inpaint (preferred):** denoise/strength applies **only** outside the mask.
  Keep the label+cap fully inside the KEEP mask so its strength is effectively 0.
- **Unmasked edit** (nano-banana/flux-kontext identity edit): keep global strength LOW
  (start ~0.25–0.35) so identity holds; raise only if the scene isn't changing enough,
  and re-verify the label after every bump.
- After ANY R2 pass, run `41-product-fidelity-checker` on the label-macro axis before
  the frame is allowed forward. R2 is the route most likely to drift; gate it hardest.

### 3.4 R2 label rule (Bible §7bis.1)

Two safe ways to guarantee the label:
1. **Inpaint that preserves the label region** (mask it KEEP), OR
2. **Composite the real flat label asset back in post** onto the generated bottle if
   any relight touched it. Arabic ad copy is *still* separate post overlay.

Never accept a bottle where the label was regenerated. `زيت المشاط للشعر` printed on
the vessel must match glyph-for-glyph; and **never** let redness marketing bleed onto
the label — the lock forbids painting «الأحمر» on the bottle.

---

## 4. R3 — image-to-video from an approved keyframe (all motion)

**Idea:** every moving product asset animates the ONE already-approved, fidelity-
passed keyframe. The engine (veo3 / veo3-fast / kling / runway / hailuo / seedance)
moves camera, light, oil, and hair; the bottle is carried as pixels, never re-drawn
per frame. If there is no approved keyframe, you do not have an R3 prompt — go build
one via R1/R2 first (image-first law, §0.6).

### 4.1 What you hand Kie

| Slot | Content | Notes |
|------|---------|-------|
| `first_frame` (image) | the approved, fidelity-passed keyframe | built by R1/R2, QC ≥ 95 |
| `last_frame` (image) | for LOOPS: identical to (or matched with) the first frame | §4.3 |
| `prompt` | motion + camera + light + physics only — **no product description** | dialect-mapped |
| `duration` | hero 8s; microvideo/LP loop **3–5s** | fast tier for loops |
| `seed` | campaign seed | §6 |
| `negatives` | temporal + identity-drift guards | §7 |

### 4.2 Motion payload = scene verbs only

Describe what MOVES: a slow 5% push-in, a rack focus from label to backlit oil, a
warm light sweep, the oil settling with real viscosity, a single flyaway hair
drifting. Never re-state the bottle. Lean on
`43-physics-materials-realism-director` for the oil's viscosity/flow and
`42-optical-camera-realism-director` for lens behaviour (real DOF, motion blur,
micro-shake) so it reads filmed, not rendered.

### 4.3 Start/end frames for seamless LP loops

LP microvideo and the 3D banner must loop invisibly. Two engines expose an explicit
`last_frame` (kling; some seedance/hailuo builds) — use it:

- **Perfect loop:** `first_frame == last_frame`. The engine interpolates a motion arc
  that RETURNS to the start (bottle rotates 20° and back; oil ripples and settles;
  light sweeps across and off). Cut point is invisible → true seamless loop.
- **Matched loop (if no last-frame slot):** design the motion so the final state
  visually equals the opening (a full slow 360°-style micro-rotation that ends where
  it began, or a breathing light cycle), then hold the tail 2–4 frames and trim in
  the editor (`55-finishing-delivery`) for a clean splice.
- **Loop hygiene:** avoid motion that can't reconcile (a hand entering frame, an
  irreversible pour that empties the bottle) — those cannot loop. Keep LP loops to
  reversible, ambient moves: rotate-and-return, shine sweep, drop-ripple-settle.

### 4.4 The turntable honesty rule (single-reference products)

A true 360° turntable needs multiple real angles in `references/`. The mechat has
only a front reference today (`reference-manifest.rotation_capability.current:
face-on micro-move only`). So:

- With a front-only reference, restrict R3 rotation to a **small label-face-on
  micro-move** (≤ ~20°, never showing an unreferenced face). Set start/end frames
  both face-on.
- **Never invent hidden faces** of the bottle. If an angle isn't referenced, the
  motion does not turn to it. Full rotation unlocks only when `10-back`,
  `11-profile-left`, `12-profile-right`, `13-top` are provided — FLAG this to the
  planner rather than faking a back label.

### 4.5 R3 worked payload (mechat lp-microvideo loop)

```
first_frame: <approved R1 keyframe: mechat on travertine, warm light>   (QC ≥ 95)
last_frame:  <same frame>                       # seamless loop
model:       kling (start+end frame), cost_tier iterate   # draft on hailuo/seedance first
duration:    4s
seed:        814430
prompt(motion-only):
  "The bottle rotates a gentle 18 degrees clockwise then eases back to
   its start; warm key light sweeps softly across the glass and returns;
   the mahogany oil inside settles with slow, heavy viscosity and a faint
   caustic on the ledge; shallow depth of field, subtle handheld micro-drift,
   realistic motion blur and fine grain. Loops seamlessly."
negatives: (label morphing, text crawl, identity drift, flicker, extra bottle,
           melting cap, warping rim, floaty weightless motion, temporal pop)
```

---

## 5. Mask & cutout usage (the physical label defense)

A mask is how you make the fidelity gate pass *by construction*.

- **Subject-KEEP mask (R1 bg-replace, R2 edit):** paint the bottle + cap + label as
  KEEP; everything else is free to regenerate. The label literally cannot be
  repainted. Feather the very edge (1–2 px) so the composite doesn't show a hard cut.
- **Background-REGENERATE mask (inpaint):** the inverse — mark only the scene as
  editable; the product region is locked out of the denoise.
- **Label-macro sub-mask (R2, high risk):** if a relight must cross the label, keep a
  tighter inner mask over the printed panel (`label_panel_vertical_span: [0.40,0.88]`
  of body height in the mechat lock) so glyphs survive even if the glass is relit.
- **Cutout matte (R1-composite):** the chroma-keyed alpha *is* the mask — the product
  is a fixed asset dropped on an AI plate. Highest fidelity; the model never sees the
  product as editable pixels at all.
- **Spill & edge:** on clear PET, kill chroma spill on the rim/cap and don't let the
  matte clip the translucent shoulder highlight — that highlight is part of identity.

Rule of thumb: **the more a route regenerates near the product, the tighter the
mask.** R1-composite needs only a clean cutout; R2 unmasked edit needs the strictest
label sub-mask + lowest denoise.

---

## 6. Seed lock (one bottle across the whole campaign)

- **Fix one campaign seed** and reuse it for every asset in the set (image ads,
  banner master, LP images, keyframes, and the i2v renders derived from them). Same
  reference + same seed = the same bottle identity → fewer discards. (credit_policy:
  "reference + seed lock")
- **Record the seed** in the asset's sidecar/manifest so any regen is reproducible and
  a later size/variant matches exactly. Store it next to the reference id and route.
- **When to vary the seed:** only for deliberate *variant exploration* on the DRAFT
  tier (3–4 seeds to pick a composition). Once a keyframe is approved, its seed is
  frozen through upscale and animation. Never re-roll the seed at final tier.
- **Seed ≠ fidelity.** A locked seed keeps the *generation* consistent; it does NOT
  protect the label from a high-denoise edit. Seed lock and mask/preserve are
  complementary — you always need both on R2.

---

## 7. Negatives & fidelity guardrails per route

Pull the base list from `prompt-builders/negative-bank.md`; add the route-specific
guards below. Negatives are a safety net, not the primary defense — the reference +
mask + low denoise do the real work.

**Always-on (every route):** `changed/edited label`, `extra Arabic text`, `invented
words on bottle`, `«الأحمر» painted on the label`, `square or ribbed-body bottle`
(mechat is a smooth cylinder — see lock), `wrong cap (dropper/pump/gold/flat-smooth)`,
`second bottle`, `warped or asymmetric rim`, `floating product`, `mismatched
shadow/reflection`, `hard AI cut-out edge`, `plastic-perfect over-clean look`.

**R1 add:** `product recomputed`, `subject repainted`, `label relit into
illegibility`, `oil colour shifted outside amber-mahogany`.

**R2 add:** `label glyphs regenerated`, `cap ribbing smoothed away`, `proportions
changed (bottle made squat/square)`, `over-denoised subject`, `identity drift from
reference`.

**R3 add (temporal, from `46-ai-tell-detector`):** `label morphing/crawling`, `text
texture-crawl`, `frame-to-frame identity drift`, `flicker`, `object impermanence`,
`background pop`, `melting cap`, `floaty weightless motion`, `impossible oil physics`,
`turning to an unreferenced face`.

**The structural gate (not a negative):** `41-product-fidelity-checker` compares the
output against `references/` on the `fidelity-checklist.md` axes — label match, cap
type/ribbing, proportions, oil colour ΔE, seal/text presence & placement. It
auto-REJECTS below threshold and routes back to regenerate. You never rely on a human
eye. Structure the payload (real pixels + mask + low denoise + locked seed) so it
passes on the first render.

---

## 8. Route selection quick-reference

```
Is the asset's subject the product?
  └─ no  → not this guide's concern (plate/background can be t2i; composite product later)
  └─ yes → is it MOVING?
             ├─ yes → R3  (i2v from an APPROVED, fidelity-passed keyframe)
             │         • no keyframe yet? build it R1/R2 first, then animate
             │         • loop? set first_frame == last_frame (or matched-state)
             │         • single front ref? label-face-on micro-move only
             └─ no  → can R1 (real cutout + AI world) achieve the pose & light?
                        ├─ yes → R1  (DEFAULT: cutout/bg-replace, relight, ground it)
                        └─ no  → R2  (reference edit on flux-kontext/nano-banana,
                                       label MASKED, denoise LOW, verify label after)
```

**Credit note:** fidelity order (R1 > R2 > R3 for identity safety) also tracks cost —
R1 is usually cheapest AND safest because the product is never recomputed. Prefer the
highest route that meets the creative need.

---

## 9. Compile checklist (run before you hand the payload to Kie)

- [ ] Route (R1/R2/R3) matches the router + `reference-manifest.routing` for this family.
- [ ] Model is reference-capable for that route (no t2i/t2v on a product asset).
- [ ] Correct reference image loaded from the ACTIVE `products/<slug>/` (not hardcoded).
- [ ] Product appears **only** as pixels — zero product words in the prompt.
- [ ] Mask/cutout present and protects label + cap (tightest where regen is nearest).
- [ ] Denoise/strength LOW near the product (R2), or subject fully masked KEEP (R1).
- [ ] Campaign seed locked and recorded in the sidecar.
- [ ] R3 only: `first_frame` is an APPROVED, QC ≥ 95 keyframe; loops set `last_frame`;
      rotation stays within referenced angles.
- [ ] No Arabic / headline / CTA / price in the payload (added in post).
- [ ] Route-specific negatives appended from the bank.
- [ ] Draft tier for iteration; final tier / upscale / animation only after QC ≥ 95.
- [ ] `41-product-fidelity-checker` scheduled on the output (and `46-ai-tell-detector`
      for R3) — the gate is mandatory, every asset, every time.

---

## 10. Handoff

- **Upstream:** `31-format-router` supplies route + model + tier + reference id;
  `reference-manifest.yaml` supplies which reference; `product-lock.yaml` +
  `fidelity-checklist.md` define what "correct" is.
- **This guide → the compilers:** hand the structured payload (base/first/last image,
  mask, mode, seed, scene/motion-only prompt, negatives) to `image-prompt-builder.md`
  (statics) or `video-prompt-builder.md` (motion); they order & phrase it, then the
  dialect maps (`image-model-dialect-map.md` / `model-dialect-map.md`) translate it
  into the target model's exact syntax.
- **Downstream gates:** `41-product-fidelity-checker` (identity, all routes) and
  `46-ai-tell-detector` (temporal, R3) score the output; below threshold → auto-reject
  → back to the compiler with a tighter mask / lower denoise / different route.
- **Post:** approved renders go to `37-typography-compositor` /
  `54-motion-graphics-compositor` for Arabic label copy, headline, CTA, and price —
  which is why none of that is ever in the reference-conditioned payload.
