# Image-Model Dialect Map

> **What this is.** The AUTHORITATIVE per-model prompt syntax for every **image**
> model the studio can render into on Kie AI: `nano-banana` (Google Gemini 2.5
> Flash Image / "Gemini edit"), `flux-kontext`, `flux-pro`, `seedream / seededit`,
> `imagen`, `ideogram`, `gpt-image-1`, and `midjourney`. It is the image-side twin
> of `prompt-builders/model-dialect-map.md` (which owns the **video** models
> veo3/kling/runway/…). The prompt compiler (skills **25 prompt-optimizer** and
> **26 kie-prompt-builder**, driven by the directors **32–36** and the
> **31-format-router**) holds ONE canonical prompt IR and DIALECTS it into the
> chosen model's syntax using this file. Swap a model → you touch this file and
> `config/kie-models.yaml`, and **nothing** in skills 00–24 changes
> (ARCHITECTURE.md §7.1 adapter pattern).
>
> **Authority.** `STUDIO-BIBLE.md` is the single source of truth; `STUDIO-BIBLE-V2.md`
> §7bis (Product Reference Lock v2) is the #1 constraint. If this file ever
> disagrees with either, the Bible wins and this file is regenerated. This file is
> **DATA + GRAMMAR**, not reasoning — it never decides *whether* to spend a credit
> (that is 29-cost-optimizer / the credit policy); it only says *how each model
> wants the words* once a route has been chosen.

---

## 0. The two rules that override every dialect below

1. **The product is ALWAYS reference-conditioned — never text-to-image (`t2i`).**
   Every product-bearing image is built on one of the three routes from V2 §7bis:
   **R1 product-real / world-AI** (keep the real packshot pixels, AI makes only the
   world around it — background replace + relight + contact shadows/reflections),
   **R2 reference-conditioned edit** (feed the real photo, preserve the product
   region, regenerate the scene), or the keyframe half of **R3** (build the frame
   with R1/R2, then hand it to a video model). No dialect in this file is ever used
   to *describe the bottle in words for the model to redraw*. The words describe the
   **world, light, camera, and the edit operation** — the product itself arrives as
   pixels via the reference image + mask.

2. **Arabic never goes into any image model.** Not one model in the catalog renders
   label-grade Modern Standard Arabic reliably (see §6). The physical label
   («زيت المشاط للشعر» — *zayt al-mishāṭ lil-shaʿr*, "Mechat hair oil") arrives as
   reference pixels or as a composited flat label asset; the **ad copy** arrives in
   POST via **37-typography-compositor** / **54-motion-graphics-compositor**. Sending
   Arabic to an image model produces gibberish RTL, wastes the render, and forces a
   regen — a triple credit tax the credit policy forbids.

Everything below is subordinate to these two rules.

---

## 1. The canonical image prompt IR (what the compiler holds before dialecting)

The directors emit ONE structured intent; the compiler serializes it per model.
Fields:

```
subject_route:   R1 | R2 | R3-keyframe
base_image:      products/<slug>/references/<file>   (the REAL product — ground truth)
mask:            keep-product | keep-label | replace-bg | region:<desc>   (op-dependent)
operation:       bg-replace | edit | inpaint | relight | compose | plate   (see §2)
scene:           environment, surface, props, era/heritage cues (Gulf-authentic)
light:           key/fill/rim, direction, quality, colour temp, practicals
camera:          lens_mm, aperture, angle, distance, height   (optical realism, skill 42)
mood:            luxury register, palette (warm amber/garnet brand, earth tones)
realism_layer:   grain, DOF/bokeh, contact shadow, reflection, micro-imperfection
model_presence:  none | hands+hair | back-of-head | hijab-styling   (per gulf-beauty-brand-norms)
negatives:       from knowledge/negative-prompt-library.md, dialected per §7
aspect:          1:1 | 4:5 | 9:16 | 16:9   (or "match base")
seed:            locked per set (§5)
text_in_image:   NONE — always (rule 2)
```

The dialect entries in §3 map these fields onto each model's expected phrasing,
parameter flags, and reference/mask channels.

---

## 2. Route → operation → model cheat sheet

Pick the **operation** first (it is what the model must physically do), then the
model. This mirrors `kie-models.yaml → routing_matrix`.

| Operation | What it does | Preferred models (draft → final) | Route |
|---|---|---|---|
| **bg-replace** | Preserve the real product cutout pixel-intact; generate only the environment, then relight + add contact shadow/reflection | `nano-banana` → `flux-kontext` | R1 (default hero) |
| **edit** (instruction) | Reference-preserving instruction edit — re-pose, re-light, restyle scene while keeping product identity | `flux-kontext`, `nano-banana`, `seededit`, `gpt-image-1` | R2 |
| **inpaint** (masked) | Regenerate ONLY a masked region (change surroundings, keep product/label; or fix a flaw) | `flux-kontext`, `nano-banana`, `seededit`, `gpt-image-1` | R2 |
| **relight** | Change lighting/colour temperature on a preserved subject | `flux-kontext`, `nano-banana` | R1/R2 |
| **compose** | Composite the real cutout into a target frame + harmonize | `nano-banana` (excellent), `flux-kontext` | R1 |
| **plate** | Generate an EMPTY environment/background (no product) to composite the real product into later | `flux-pro`, `imagen`, `seedream`, `midjourney` (mood only) | R1 support |
| **label-composite** | Lay the real flat label asset onto a generated/edited bottle | done in POST (compositor), not a model op | R1/R2 |

**Hard router constraint (V2 §7bis.4):** a product-subject asset may NEVER be routed
to a `t2i` model. `flux-pro`, `imagen`, `ideogram`, `midjourney` in their `t2i` mode
are **plate/mood only** — they build the world the real product drops into, they do
not draw the product.

---

## 3. Per-model dialects

Each entry: **identity · reference/edit modes · how it wants the prompt · a
reference-conditioned skeleton · strengths · gotchas · negative handling.** Every
example is a Gulf hair-oil asset in reference-conditioned form (base image + edit
instruction), never a text description of the bottle.

### 3.1 nano-banana — Google Gemini 2.5 Flash Image ("Gemini edit")

- **Modes:** `t2i, i2i, edit, inpaint, subject-lock, bg-replace`. Cost tier **draft**
  (cheap, fast). The studio's **default R1 workhorse** and the default hero-keyframe
  builder.
- **How it wants the prompt:** **conversational, instruction-first, imperative.**
  Speak to it like an art director briefing a retoucher: *"Keep the bottle exactly as
  in the reference. Place it on …. Light it with …."* It obeys natural-language edit
  verbs (keep / place / replace / relight / add reflection) far better than
  comma-tag salads. State the **preservation clause first**, the **scene second**,
  the **light/camera third**. It has strong **subject-lock**, so the real product
  survives edits cleanly; it is the best model for **compositing a real cutout into a
  new environment**.
- **Skeleton (R1 bg-replace):**
  ```
  [ref: references/01-front-white.png]
  Keep the product in the reference completely unchanged — identical shape,
  proportions, cap, and label pixels. Do not redraw or restyle the bottle or its
  printing. Replace ONLY the background: a warm heritage Najdi setting, aged
  plaster wall, low golden hour side light from the left, a woven palm surface.
  Relight the product to match this light, add a soft contact shadow and a faint
  reflection on the surface. 85mm lens look, shallow depth of field, natural film
  grain, photographed not rendered.
  ```
- **Strengths:** cleanest cheap edits, excellent subject consistency, great relight,
  best-in-class for "real cutout → new world". **Gotchas:** can **over-smooth** skin
  and surfaces (fight it with `realism_layer`: grain, pores, micro-texture; skill 44);
  occasionally nudges product scale — always re-check against `fidelity-checklist.md`
  (skill 41). **Negatives:** it does not take a formal negative field — fold negatives
  into the instruction as *"do not …"* clauses (§7).

### 3.2 flux-kontext — Black Forest Labs (editing / reference specialist)

- **Modes:** `i2i, edit, inpaint, subject-lock, bg-replace`. Cost tier **iterate**.
  The studio's **final-tier fidelity edit** model — the cleanest keeper render once a
  draft passes QC.
- **How it wants the prompt:** **precise, declarative, edit-scoped.** Kontext is
  literal about *what changes vs what is preserved*. Lead with an explicit
  **"preserve"** statement naming the product region, then a **single, unambiguous
  edit instruction**. Avoid asking for many simultaneous changes — chain them across
  passes. It respects the reference's geometry tightly, which is exactly what R2
  needs. For **inpaint**, give it the mask + a scene-consistent fill instruction;
  keep the instruction about the *region*, not the whole image.
- **Skeleton (R2 edit, re-light + re-scene, product preserved):**
  ```
  [ref: references/01-front-white.png]
  Preserve the bottle, cap, label artwork and all printed text exactly — no change
  to the product region. Change the surroundings only: place on a dark walnut vanity
  with scattered dried herbs and a brass tray; garnet-and-amber warm grade; single
  soft window key from camera-right, gentle rim on the glass; visible oil translucency
  and meniscus in the neck. Shallow DOF, 100mm macro feel, real sensor grain.
  ```
- **Strengths:** best identity preservation of the reference, superb relight, precise
  region control, the cleanest final composite. **Gotchas:** needs a **good reference**
  (garbage-in shows); less imaginative than nano-banana for inventing a world from
  scratch — feed it a defined scene. **Negatives:** supports a negative-style clause;
  the compiler appends the dialected negative string (§7).

### 3.3 flux-pro — BFL high-quality text-to-image (PLATES ONLY)

- **Modes:** `t2i, i2i`. Cost tier **iterate**. **NOT for the product** (t2i would
  reinvent the bottle). Used to generate **empty environment plates** the real product
  is composited into (R1 support), and photoreal backgrounds.
- **How it wants the prompt:** **rich descriptive scene language** — photoreal
  environment, light, lens, materials, no subject. Because there is no product in the
  frame, full descriptive prose is safe here.
- **Skeleton (plate):**
  ```
  Empty warm heritage Gulf still-life set, aged plaster wall, low golden-hour side
  light, woven palm surface with negative space center-frame for a later product
  composite, brass and dried-herb props at the edges, 85mm, shallow DOF, film grain.
  No product, no bottle, no text.
  ```
- **Gotcha:** always end plates with **"No product, no bottle, no text"** so nothing
  competes with the real cutout you will drop in. **Negatives:** standard negative
  clause (§7).

### 3.4 seedream / seededit — ByteDance

- **Modes:** `seedream` = `t2i, i2i`; `seededit` = `edit, inpaint` (region-aware).
  Cost tier **draft** (cheap). Studio use: **batch section imagery** for landing pages
  (`lp-section-image`, shared-style, cheap) and **alternate edit passes**.
- **How it wants the prompt:** **structured, attribute-dense**, closer to tag/phrase
  style than nano-banana's conversation — subject clause, then scene, then
  light/quality descriptors. `seededit` takes an **edit instruction + optional mask**;
  keep the instruction concrete and short. Strong photoreal lighting engine.
- **Skeleton (seededit, R2 inpaint — swap the surface, keep product):**
  ```
  [ref: keyframe_draft.png] [mask: surface region only]
  Replace the masked surface with polished dark marble and a thin oil reflection.
  Keep the bottle, cap and label untouched. Warm amber grade, soft directional light,
  photoreal, fine grain.
  ```
- **Strengths:** cheap, photoreal, strong lighting, good for producing many
  same-style LP images fast. **Gotchas:** identity drift on aggressive edits — keep
  edits scoped and re-run fidelity check; do NOT trust it near the label. **Negatives:**
  accepts a negative-prompt string (§7).

### 3.5 imagen — Google Imagen (photoreal PLATES / scenes)

- **Modes:** `t2i, i2i`. Cost tier **iterate**. Limited edit control → **plate/scene
  only**, not product edits. Excellent natural light and photoreal skin/environment
  when a scene needs to look truly filmed.
- **How it wants the prompt:** **natural descriptive sentences** with concrete
  photographic nouns (lens, time of day, light quality, material). Responds well to
  "photograph of…", "shot on…", real-world lighting language.
- **Skeleton (plate for a hands+hair beat, per gulf norms model-presence):**
  ```
  Photoreal close-up plate: a woman's hands (no face in frame) parting dark healthy
  hair into a section over a warm-lit heritage setting, back-of-head three-quarter,
  golden side light, 50mm, shallow DOF, natural skin texture, film grain. Negative
  space at frame-right for a later product composite. No product, no text.
  ```
- **Gotcha:** weak at instruction edits — do not send it a "preserve the label" ask;
  use it to build the human/environment plate, then composite the real product with
  nano-banana/flux-kontext. **Negatives:** natural-language "no …" clause.

### 3.6 ideogram — best-in-class LATIN typography (NOT the Arabic label)

- **Modes:** `t2i, edit`. Cost tier **iterate**. Renders **Latin** text legibly.
  **Arabic RTL is unreliable** — do **not** trust it for «زيت المشاط للشعر» or any
  Arabic overlay.
- **How it wants the prompt:** scene + an explicit `"text: '…'"` clause for Latin
  strings. In THIS studio its typography edge is mostly moot: **all ad copy is added in
  post** (rule 2). Only reach for it in the rare case a **Latin-only** lockup is needed
  as a background graphic element that will not be re-typed in post — and even then,
  verify legibility and never place Arabic in it.
- **Skeleton (rare Latin-only element, no product):**
  ```
  Minimal warm-toned background card, centered small Latin text: "100% NATURAL",
  thin gold serif, generous negative space, subtle paper texture. No Arabic text.
  No product.
  ```
- **Gotcha:** its whole selling point (in-image text) is the one thing the studio
  deliberately does elsewhere for Arabic. Treat ideogram as a **niche Latin-graphic**
  tool, not a product model. **Negatives:** natural-language clause; always include
  **"no Arabic text"** to stop it inventing broken RTL.

### 3.7 gpt-image-1 — OpenAI image (edit-capable, strong adherence)

- **Modes:** `t2i, edit, inpaint`. Cost tier **final** (expensive). Strong prompt
  adherence and composition; the best-Arabic-of-a-bad-bunch (still **not**
  label-grade). Reserve for **tough compositional edits** where cheaper models fail.
- **How it wants the prompt:** **detailed, structured natural language** — it follows
  complex multi-part instructions closely (layout, relative placement, count). For
  edits, provide the base image + mask and describe the target of the masked region.
  It rewards specificity about composition and camera.
- **Skeleton (R2 edit, complex composition, product preserved):**
  ```
  [ref: references/01-front-white.png] [mask: everything except the bottle]
  Keep the bottle and its label pixels identical and centered lower-third. Build
  around it: a symmetrical heritage flat-lay, dried herbs radiating outward, brass
  bowl top-left, folded linen bottom-right, warm overhead soft light, faint contact
  shadow under the bottle. Editorial beauty still-life, 50mm top-down, film grain.
  ```
- **Strengths:** adherence, composition, layout comps. **Gotchas:** cost (final tier —
  spend once, after QC ≥ 95); output can read faintly "AI-clean" → apply the realism
  layer (grain, asymmetry, imperfection; skills 42/44/46). **Arabic:** "weak, better
  than most but STILL not label-grade" — per `kie-models.yaml`, keep text in post
  regardless. **Negatives:** fold into the instruction as "avoid / do not" clauses.

### 3.8 midjourney — top aesthetic, least controllable (MOOD ONLY)

- **Modes:** `t2i, i2i` via `--sref` (style ref) / `--cref` (character ref). Cost tier
  **iterate**, via relay (latency). **No true edit/inpaint** → cannot preserve a label
  → **never a product-hero model**. Use for **mood/style exploration and hero
  aesthetic direction**, then rebuild the look controllably in nano-banana/flux.
- **How it wants the prompt:** **dense evocative phrase stacks + parameter flags**,
  not conversation. Style, subject, light, medium, then flags: `--ar 4:5`, `--style
  raw` (photoreal, less MJ "gloss"), `--sref <url>` to lock a mood, `--cref <url>` for
  subject consistency (still not label-safe), `--s` (stylize) low for realism, `--no
  text` to suppress lettering.
- **Skeleton (mood/plate exploration, no product):**
  ```
  warm Gulf heritage beauty still-life, garnet and amber palette, aged plaster, golden
  hour side light, dried herbs, brass, editorial luxury mood, shot on 85mm, film grain
  --ar 4:5 --style raw --s 100 --no text
  ```
- **Gotcha:** beautiful but uncontrollable; anything it "draws" of a product is a
  fabrication and MUST be discarded — extract the **palette/light/mood** only, then
  produce the real asset on a reference-capable model. **Negatives:** use the `--no`
  parameter (`--no text, logo, watermark`) — MJ does not read a separate negative
  field.

---

## 4. Operation grammars (shared across models)

The verbs above compile from four reusable grammars. State them in the model's
dialect (conversational for nano-banana/gpt-image/imagen; declarative for
flux-kontext; tag-style for seedream; flag-stacked for midjourney).

- **bg-replace (R1, default hero):** `PRESERVE product pixels → REPLACE background →
  RELIGHT to match → ADD contact shadow + reflection`. Always name preservation first.
  The product must not move, scale, or restyle. Follow with the `fidelity-checklist`
  gate (skill 41).
- **edit (R2):** `PRESERVE named product region → ONE scene/light change`. Chain
  multiple changes across passes rather than stacking them; each pass re-verified.
- **inpaint (R2):** `MASK region → describe ONLY the region's new content, scene-
  consistent → keep everything outside the mask`. Use to keep the product/label while
  swapping surroundings, or to fix a local flaw without a full regen (cheap).
- **plate (R1 support):** `DESCRIBE empty environment + light + negative space for the
  composite → "no product, no text"`. Product is composited in afterward.

**Label handling (the most fragile element, V2 §7bis.1):** never ask any model to
"write" or "redraw" the label. Either (a) preserve the label region via edit/inpaint,
or (b) generate/edit the bottle and **composite the real flat label asset in post**.
For the Mechat lock specifically: the physical label reads «زيت المشاط للشعر» and must
**never** gain the word «الأحمر» ("red") — redness is marketing that lives in overlays
and voice, not on the vessel (`product-lock.yaml`).

---

## 5. Seed & consistency discipline (applies to every model that exposes a seed)

- **Lock one seed per set.** A campaign's image family (hero, alternates, LP sections,
  banner master) reuses the SAME product reference + a **fixed seed** so lighting and
  framing stay coherent and exports are one-master-many-crops, not many regens
  (`kie-models.yaml → credit_policy`).
- **Change one variable at a time.** When iterating, hold seed + reference + prompt and
  vary a single field (light angle, surface). This isolates cause and avoids burning
  drafts on compound changes.
- **Reference + seed > prose.** For product identity, the reference image carries the
  truth; the seed carries the look. Prose only steers the world. Never try to recover
  fidelity by adding more words about the bottle — add a better reference or a tighter
  mask instead.
- **midjourney** has no deterministic seed for edits and no true reference-preserve —
  it is exempt from this discipline and therefore exempt from product duty.

---

## 6. Why Arabic stays out of ALL of them (per-model, and the studio answer)

`kie-models.yaml` records `arabic_text` for every model. The pattern is unanimous:

| Model | Arabic capability | Verdict |
|---|---|---|
| nano-banana | poor | never |
| flux-kontext | poor | never |
| flux-pro | poor | never |
| seedream / seededit | poor | never |
| imagen | poor | never |
| ideogram | latin-good / **arabic unreliable** | never for Arabic (Latin niche only) |
| gpt-image-1 | weak — better than most, **still not label-grade** | never |
| midjourney | poor | never (`--no text`) |

**Why it fails:** image models tokenize Arabic glyphs poorly, mangle **RTL** ordering,
break **cursive letter-joining** (initial/medial/final forms), drop or mirror
diacritics, and hallucinate letterforms — producing text a Gulf viewer instantly reads
as fake, which also **breaks the undetectable-realism prime directive** (a gibberish
label is an AI tell, skill 46). Even the "best" (gpt-image-1) is not trustworthy for a
**label**, where a single wrong letter fails the fidelity gate.

**The studio answer (structural, not a workaround):**
1. The **physical label** is real pixels — preserved via R1/R2 or composited from the
   flat label asset (§4). The model never types it.
2. The **ad copy** (headline, benefit, price, CTA, brand line) is added in **POST** by
   **37-typography-compositor** (stills) and **54-motion-graphics-compositor** (video),
   in correct, elegant Modern Standard Arabic (فصحى) with proper RTL shaping, on-brand
   type, and platform safe-zones. This also means copy can be edited or A/B-tested
   with **zero** re-generation cost.

So every dialect skeleton in §3 ends `text_in_image: NONE`. If a director's IR ever
carries Arabic into an image field, the compiler strips it and routes it to the
post-compositor — this is a hard invariant, not a preference.

---

## 7. Negative-prompt dialecting

Negatives come from `knowledge/negative-prompt-library.md` as a canonical list; the
compiler serializes them per model because the models take negatives differently:

- **Separate negative field:** `seedream/seededit`, `flux-kontext`, `flux-pro` — pass a
  comma-joined negative string.
- **Inline "do not / avoid" clauses:** `nano-banana`, `gpt-image-1`, `imagen` — no
  formal field; fold negatives into the instruction ("do not smooth the skin, avoid
  plastic sheen, keep natural asymmetry").
- **`--no` parameter:** `midjourney` — `--no text, logo, watermark, extra fingers`.

**Always-on image negatives (all models):** `text, arabic text, gibberish letters,
watermark, logo garbling, extra fingers, waxy plastic skin, over-symmetry, dead glassy
eyes, floating product, mismatched shadow, warped label, square bottle` (the last is
Mechat-specific — the real vessel is a **cylinder**, never square; `product-lock.yaml`).
Pull the active product's do-not-alter negatives from its `fidelity-checklist.md`, not
from this file — this keeps the builder product-agnostic.

---

## 8. Handoff & cross-references

- **Consumed by:** 25-prompt-optimizer, 26-kie-prompt-builder, and the image directors
  32–36; the **31-format-router** reads `kie-models.yaml` for model choice and this
  file for the resulting syntax.
- **Gated by:** 41-product-fidelity-checker (every render, every product — hard gate)
  and 46-ai-tell-detector (undetectability axis). A dialected prompt that would send
  Arabic to a model, or route a product subject to a `t2i` model, is rejected before
  spend.
- **Siblings:** `prompt-builders/model-dialect-map.md` (video models),
  `prompt-builders/` negatives + prompt compiler; `config/kie-models.yaml` (catalog +
  routing), `config/model-adapters.yaml` (video capability matrix).
- **Truth sources:** `STUDIO-BIBLE.md`, `STUDIO-BIBLE-V2.md` §7bis / §7ter,
  `products/<slug>/product-lock.yaml` + `fidelity-checklist.md` (per-product identity),
  `knowledge/gulf-beauty-brand-norms.md` (model-presence & category tradition),
  `knowledge/negative-prompt-library.md`, `knowledge/undetectable-realism-doctrine.md`.

**One-line contract:** *the reference carries the product, the seed carries the look,
the prose carries the world, and POST carries the Arabic — every image model here is
briefed accordingly, and none is ever asked to draw the label or write the words.*
