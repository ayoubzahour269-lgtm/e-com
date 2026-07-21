# Image Prompt Builder — compiling ONE optimized still (R1 bg-replace / R2 edit)

> **What this is.** The reasoning procedure that compiles **one** optimized,
> model-agnostic **image prompt IR** for a *still* asset (image-ad, banner master,
> lp-hero-image, lp-section-image, 3d packshot plate, or the keyframe that a video
> is animated from). It turns three inputs — **art direction + product reference +
> negatives** — into the single IR object that the dialect map then phrases for the
> chosen model. Its whole job is to keep the **product real** and keep **Arabic text
> in post**.
>
> **Authority.** `STUDIO-BIBLE.md` is the single source of truth; `STUDIO-BIBLE-V2.md`
> §7bis (Product Reference Lock v2) is the #1 constraint. If this file ever disagrees
> with either, the Bible wins and this file is regenerated.
>
> **Read alongside:**
> - `prompt-builders/image-model-dialect-map.md` — the per-model syntax this IR is
>   dialected into (its §1 defines the IR *shape*; this builder defines how you *fill*
>   it). This file is **process**; that file is **grammar**.
> - `config/kie-models.yaml` — which model / route / cost-tier (owned by
>   `31-format-router` + `29-cost-optimizer`, not by this builder).
> - `products/<slug>/product-lock.yaml` + `products/<slug>/reference-manifest.yaml`
>   — the ACTIVE product identity and which real photo feeds which asset. **Always
>   load the active product; never hardcode the mechat bottle.**
> - `knowledge/undetectable-realism-doctrine.md`, `knowledge/gulf-beauty-brand-norms.md`.
>
> **Boundary.** This builder does NOT choose the model (router), does NOT translate
> the IR into a model's words (dialect map), and does NOT typeset Arabic
> (`37-typography-compositor`). It produces the IR and the overlay-zone map, then hands off.

---

## 0. The two laws that dominate every image prompt

1. **The product is ALWAYS reference-conditioned — never text-to-image (`t2i`).**
   You never write a sentence describing the bottle for the model to *redraw*. The
   product region rides in on the real photo via one of the three V2 §7bis routes.
   For stills you use **R1** or **R2** (R3 is the video route). A prompt whose subject
   is the product and whose `base_image` is empty is malformed — reject it.

2. **Arabic label + ad copy are added in POST, never in-model.** The label glyphs are
   part of the product and are reproduced *photographically* through the reference.
   The ad headline / CTA / price are overlaid later by `37-typography-compositor`
   (El Messiri display + Tajawal text, RTL). You therefore **reserve empty, legible
   negative space** in the composition and pass its coordinates forward. You never ask
   an image model for Arabic — every image model in the catalog is rated Arabic:poor,
   and text is the #1 cause of regenerations (wasted credits).

Everything below serves these two laws.

---

## 1. The three inputs — never start without all three

| Input | Comes from | What you extract |
|-------|-----------|------------------|
| **Art direction** | `32-image-ad-director` (image-ad) · `33-banner-systems-designer` · `34-3d-render-director` · `35-landing-visual-director` · `36-microvideo-director` (keyframe) | Layout archetype (product-hero / benefit-demo / social-proof), focal hierarchy, mood, palette, camera intent, and the **reserved overlay zones** for the headline/CTA/price. |
| **Product reference + route** | `31-format-router` + `products/<slug>/reference-manifest.yaml` | The exact real-photo path (e.g. the white-bg cutout or the label-macro), and the chosen route **R1** or **R2**. Plus the `product-lock.yaml` `do_not_alter` list. |
| **Negatives** | `24-negative-prompt-builder` (+ Bible §6.6 master core) | The always-on anti-artifact core, product-drift negatives, and route-specific negatives. |

If any of the three is missing, **stop and request it** — do not invent art direction,
do not guess a route, do not proceed without negatives. A prompt built from two of three
will drift the product or leak text into the frame.

---

## 2. Route decision — R1 vs R2 (this is your first move)

You do not *pick the model*, but you DO confirm the route the router assigned matches the
asset, because route drives the entire IR shape.

| | **R1 — product-real / world-AI** (DEFAULT) | **R2 — reference-conditioned edit** |
|---|---|---|
| Idea | Keep the real packshot **pixel-intact**; AI generates ONLY the world around it (background replace + relight + contact shadows/reflections). | Feed the real photo as reference; product region **preserved**, the scene around it regenerated (image-to-image / edit / inpaint). |
| Use when | Product is the isolated hero on a clean/cutout plate (packshot, offer beat, banner master, 3d scene). Cheapest + highest fidelity. | The product must live *inside* an interacted scene — a hand holding the bottle, a pour, product on a vanity among props — where a flat composite would look pasted. |
| Operation | `bg-replace` / relight | `i2i` / `edit` / `inpaint` (masked) |
| Fidelity risk | Near-zero (pixels untouched). | Low but real — the label is the fragile element. |
| Label rule | Untouched. | Preserve the label region with a mask, OR composite the **real flat label asset** back on in post. Never let the model re-draw label glyphs. |

**Default to R1** for any product-hero still. Escalate to R2 only when the art direction
requires the product to be physically integrated with a hand, liquid, or set surface.
**Never** downgrade to `t2i` "because R1 was hard" — that violates Law 1.

---

## 3. The canonical IR — the slots you fill

The dialect map (§1) owns the field names. This builder fills them. For a still:

```
image_prompt_ir:
  asset_id:        <matrix-type>-<placement>            # e.g. image-ad-4x5-hero
  route:           R1 | R2
  operation:       bg-replace | i2i | edit | inpaint
  base_image:      products/<slug>/references/<file>     # REQUIRED — the real product
  mask:            <preserve product | preserve label>   # R2 only, when masking
  subject_lock:    "preserve the product exactly as in the reference; do not alter
                    shape, proportions, cap, label, seal, or liquid colour"
  scene:           <the WORLD only — never the bottle>   # from art direction
  camera_optics:   <lens, framing, DOF, angle>           # realism, §8
  light:           <key/fill/rim, direction, quality, colour temp>
  materials:       <glass/plastic/oil/skin/fabric physics cues>  # §8
  mood_palette:    <brand palette + emotional register>
  overlay_zones:   [<reserved empty rects for text-in-post>]     # §7 — REQUIRED
  text_in_post:    true                                  # ALWAYS true
  negatives:       <core + product-drift + route-specific>       # §9
  seed:            <fixed campaign seed>                 # §10
  aspect:          <master ratio; exports derived, not regenerated>
  cost_tier:       draft | final                         # from router; iterate on draft
```

Two slots you must never fill with the product: `scene` describes only the world;
`subject_lock` is a *preservation instruction*, not a description. If you catch yourself
writing "a tall slim clear bottle with a white ribbed cap…" into any slot, delete it —
that sentence belongs to the *reference photo*, not the prompt.

---

## 4. Compilation order — the algorithm

Run these steps in order every time; each depends on the previous.

1. **Load identity.** Open the active `product-lock.yaml` + `reference-manifest.yaml`.
   Pick the canonical reference for this asset/route (manifest maps asset→ref→route).
   Read `do_not_alter` — these become both the `subject_lock` clause and product-drift
   negatives.
2. **Confirm route** (§2). Set `route`, `operation`, `base_image`, and (R2) `mask`.
3. **Lock the product region.** Write the one-sentence `subject_lock`. Do not describe
   the bottle. Add the naming guardrail (§9) — e.g. the label text must not gain words
   it does not have.
4. **Build the world only.** From art direction, write `scene`: the environment, set
   dressing, surface, botanicals, backdrop — everything *except* the product. Reuse the
   product's signature hero-set DNA when the art direction calls for the hero look.
5. **Optics + realism pass** (§8). Fill `camera_optics`, `light`, `materials` using the
   undetectable-realism doctrine: real lens behaviour, DOF, grain, contact shadow,
   grounded reflection, correct material response. This is what makes it read *filmed*.
6. **Reserve overlay zones** (§7). Compose deliberate empty negative space for the
   Arabic headline / CTA / price. Emit `overlay_zones` as rects. Set `text_in_post:true`.
7. **Attach negatives** (§9). Bible §6.6 core + product-drift (from `do_not_alter`) +
   route-specific (e.g. R2: "no pasted/floating product, no double label").
8. **Lock seed** (§10). Fixed campaign seed + reference lock so the whole set shares one
   product identity.
9. **Emit + hand off.** Output the IR to the dialect map (for model phrasing) and the
   `overlay_zones` map to `37-typography-compositor`. Do not spend a credit yet (§11).

---

## 5. R1 recipe — background replace / relight (the default)

R1 is the workhorse. The pixels of the product cutout are frozen; you are art-directing
the *room* it sits in.

- **Base:** the clean isolated packshot / cutout from `reference-manifest` (for mechat:
  the white-bg or chroma-key front cutout).
- **subject_lock:** `"keep the product pixels exactly as the reference; replace only the
  background and relight; add physically-grounded contact shadow + subtle surface
  reflection."`
- **scene:** warm heritage-luxe set from art direction — e.g. cream Moorish/mihrab arch,
  deep garnet drape, a single red hibiscus, a palm frond, a pale travertine podium.
- **light:** soft directional window light, long gentle shadow, warm 3200–4000K key with
  a cool ambient fill; a discreet rim to separate the glass edge from the drape.
- **materials:** clear-PET highlight roll-off, the oil colour reading *through* the wall,
  a real caustic glow where light passes the liquid onto the podium.
- **grounding (critical for "not floating"):** an explicit contact shadow directly under
  the base + a faint reflection on the podium. Objects with no contact shadow are the
  fastest AI tell.
- **overlay_zones:** reserve a top band (~14%) and a lower band (~20%) of calm negative
  space for the headline and the CTA/price.

R1 gives near-perfect fidelity at the lowest credit cost — prefer it whenever the product
can stand as an isolated hero.

---

## 6. R2 recipe — reference-conditioned edit (product inside the scene)

R2 when the product must be *held or interacted with*: a warm-skinned hand lifting the
bottle, a ribbon of oil pouring, the bottle on a vanity among props.

- **operation:** `i2i` / `edit` / `inpaint`. Feed the real photo as the reference; mask
  the product (and especially the **label**) as *preserve*, regenerate the surroundings.
- **subject_lock:** `"preserve the masked product region unchanged; regenerate the scene,
  hand, and lighting around it to integrate it naturally."`
- **label fragility:** the label is the first thing to drift. Two defences, in order:
  (1) mask the label region as strictly preserve; (2) if the model still smears glyphs,
  composite the **real flat label asset** back onto the bottle in post. Arabic ad copy is
  still a separate post overlay — never in-model.
- **hand/skin realism:** the hand comes from the model, so the human-micro-realism tells
  apply — correct finger count, knuckles, nails, pores, natural grip pressure. Add these
  to `materials`/realism, and the corresponding negatives (§9).
- **integration cues:** matched light direction and colour temperature between hand and
  bottle; a real cast shadow from the hand onto the vessel; no "pasted-on" hard edge.

R2 costs more and carries fidelity risk → the fidelity checker (§9) is mandatory on every
R2 render.

---

## 7. Negative space & overlay-zone reservation — the text-in-post contract

Because Arabic never enters the model, the *composition* must leave room for it. This is a
first-class part of the prompt, not an afterthought.

- **Reserve zones by placement.** A master is generated once and cropped to exports
  (Law: one master → many exports). Reserve enough calm space that every target ratio
  keeps its overlay legible:
  - `1:1` feed — headline lower-third, CTA button bottom.
  - `4:5` feed — taller; headline can sit upper or lower, CTA bottom.
  - `9:16` story/reel — respect safe margins **top ~14% / bottom ~20%** for platform UI;
    keep the product in the centre safe zone.
- **Make the zone *usable*.** The reserved region must be low-contrast and uncluttered so
  El Messiri / Tajawal reads at a glance, sound-off. Don't reserve a zone over a busy
  drape fold or a bright caustic.
- **LTR inside RTL.** Prices and numbers ("139 ﷼", "‑25%") run LTR even in an RTL layout;
  the compositor handles this, but leave the number zone wide enough for it.
- **Emit the map.** Output `overlay_zones` as `{id, rect, purpose, max_lines, alignment}`
  and hand it to `37-typography-compositor`. The image model receives *no text* — only the
  empty space.

---

## 8. Realism injection — make the still read *filmed*, not rendered

Pull the specifics from `knowledge/undetectable-realism-doctrine.md`; the still-relevant
levers you bake into `camera_optics` / `light` / `materials`:

- **Optics (biggest tell):** a real lens — shallow-ish DOF with natural bokeh on the
  backdrop, a hint of sensor grain, gentle vignette, subtle chromatic aberration at high-
  contrast edges, filmic highlight roll-off (never clipped clinical whites).
- **Grounding:** contact shadows + grounded reflections for every object; matched shadow
  direction across the frame. No floating, no detached shadows.
- **Materials:** clear PET has bright specular edges + refraction of the backdrop through
  it; the oil is translucent with internal light transmission and a real meniscus; skin
  (R2) has pores, peach fuzz, subsurface warmth — never waxy/plastic.
- **Right imperfections:** a faint dust mote in a light shaft, a slightly asymmetric petal,
  a natural water/oil bead. Perfect = fake; a few honest imperfections = real.
- **Remove the tells:** no HDR halos, no oversaturation, no CGI sheen, no over-symmetry,
  no over-clean plastic set. These are negatives (§9) *and* things you simply don't write.

---

## 9. Product-fidelity guardrails inside the prompt

Fidelity is a hard gate (V2 §7bis.3, skill `41-product-fidelity-checker`). You reinforce it
inside the IR so fewer renders fail the gate:

- **subject_lock** carries the `do_not_alter` essence: shape/proportions, cap type/colour,
  label layout, seal, liquid colour — verbatim from the active `product-lock.yaml`.
- **Naming guardrail (product-agnostic).** Respect the lock's marketing-vs-label
  distinction: ad copy may use a marketing name, but the model must never *add or alter*
  words on the physical label. For mechat specifically, the label reads «زيت المشاط للشعر»
  and **«الأحمر» is `forbidden_on_label`** — marketing redness lives in overlays/voice, not
  painted on the vessel. Encode this as a negative.
- **Colour truth.** Use the lock's sampled hexes / ΔE, not a remembered colour. (Mechat's
  oil is a warm **brown-amber-red / mahogany**, *not* bright ruby/garnet — do not let the
  scene light push it cranberry.)
- **Every render → fidelity checker.** After generation, `41` compares against
  `references/` on label/cap/proportions/colour-ΔE/seal. Below threshold → auto-reject and
  regenerate. This replaces manual verification — you never ask the user to eyeball it.

Attach these negatives on top of the Bible §6.6 core:
`morphing/warped bottle, changed proportions, square/squat vessel (mechat is a cylinder),
altered/added label text, invented brand words, wrong Arabic on label, moved/removed gold
seal, wrong cap colour, gold/black cap, liquid colour shift (to ruby/orange/pink/brown),
pasted/floating product, double label, detached shadow` — plus (R2) `extra/melting fingers,
malformed hand, pasted-on hard edge`.

---

## 10. Seed & consistency discipline

- **One campaign seed, reference-locked.** Reuse the product reference + a *fixed seed*
  across the whole asset set so every still shares one bottle identity → fewer discards.
- **One master → many exports.** Generate the highest-need master once; derive 1:1 / 4:5 /
  9:16 and banner sizes by crop/recompose, **not** by regenerating. The reserved overlay
  zones (§7) are what make those crops survive.
- **Batch shared-scene stills** (LP section images sharing a look) with shared style tokens
  + the same seed → one coherent set at minimal cost.

---

## 11. Draft→final gating — spend nothing until green

Cost is a routed decision (V2 §5). The builder enforces the gate:

1. Compile the IR. Run it at **draft** cost_tier (cheap/fast model or low res/steps).
2. QC the draft: creative score ≥ 95 (all axes ≥ 90, `quality/scoring-rubric.md`) **and**
   the product-fidelity gate (skill 41) pass.
3. Only then: **one** final-tier render, or **one** upscale of the approved draft.
   Never iterate at final cost. Never regenerate for resolution — upscale.
4. Surface the per-asset credit estimate + a cheaper fallback route *before* the final spend.

If QC fails, **fix the IR and re-score** — adjust light/negatives/overlay zones — do not
just re-roll the seed hoping for luck.

---

## 12. Worked example — mechat R1 hero static (filled IR)

```
image_prompt_ir:
  asset_id:      image-ad-4x5-offer-hero
  route:         R1
  operation:     bg-replace
  base_image:    products/mechat-red-oil/references/01-front-white.png
  subject_lock:  "keep the product pixels exactly as the reference; do not alter the
                  cylindrical tall/slim vessel, the white vertically-ribbed cap, the
                  label, the gold '100% natural / طبيعي' seal, or the warm brown-amber-red
                  oil colour. Replace only the background; relight; add a grounded contact
                  shadow and a soft podium reflection."
  scene:         "warm cream Moorish mihrab arch, deep garnet velvet drape behind, a single
                  fresh red hibiscus flower and a palm frond to one side, a pale travertine
                  podium; heritage-luxe Gulf-meets-Moroccan mood, uncluttered."
  camera_optics: "85mm-equivalent, product framed centre with headroom, shallow DOF so the
                  arch softens to natural bokeh, gentle vignette, filmic highlight roll-off,
                  faint sensor grain."
  light:         "soft directional window key from upper-left (~3600K), cool ambient fill,
                  discreet rim on the glass edge; long gentle shadow to lower-right."
  materials:     "clear-PET specular edges refracting the drape; translucent oil with warm
                  internal transmission and a visible meniscus + headspace; a subtle warm
                  caustic on the podium."
  mood_palette:  "garnet #8E1B1E, warm cream #FAF6F1, gold #C9A227; warm, premium, calm."
  overlay_zones:
    - { id: headline, rect: [top 6%–20%], purpose: El-Messiri headline, max_lines: 2, align: RTL-centre }
    - { id: offer,    rect: [bottom 66%–82%], purpose: price + strike-through, align: RTL-centre, note: LTR numbers }
    - { id: cta,      rect: [bottom 84%–96%], purpose: CTA button, align: RTL-centre }
  text_in_post:  true
  negatives:     "<Bible §6.6 core> + morphing/warped bottle, square/squat vessel, altered
                  label, «الأحمر» painted on the label, moved/removed gold seal, wrong cap
                  colour, oil shifting to ruby/orange/pink, pasted/floating product,
                  detached shadow, HDR halos, CGI sheen, gibberish text, watermark."
  seed:          MECHAT-CAMPAIGN-SEED-01
  aspect:        4:5   # master; 1:1 and 9:16 derived by crop, not regenerated
  cost_tier:     draft # → QC ≥95 + fidelity pass → ONE final render / upscale
```

Note there is **not one word describing the bottle's redraw** — its identity comes entirely
from `base_image`. The Arabic lives only in `overlay_zones`, never in the model prompt.

---

## 13. Common failure modes → fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Label glyphs smeared / gained words | Product described in text, or R2 mask too loose | Go R1, or tighten the preserve-mask; composite the real flat label in post |
| Bottle shape drifted (mechat went square) | Old drifted /assets render used as base | Use the canonical `references/` file per the manifest, never a derivative render |
| Oil looks bright ruby | Scene light pushed the colour + no lock hex | Use the lock's sampled hex; warm the key; add "no colour shift to ruby" negative |
| Product looks pasted / floats | No contact shadow / no reflection | Add explicit grounded contact shadow + podium reflection (§8) |
| Headline unreadable over the image | Overlay zone reserved over busy/bright area | Recompose calm negative space in the reserved rect (§7) |
| Arabic gibberish in the frame | Text leaked into the prompt | Remove ALL text from the IR; `text_in_post:true`; it is the compositor's job |
| Burned final credits iterating | Skipped draft gate | Iterate at draft tier; final spend only after QC ≥95 + fidelity pass (§11) |

---

## 14. Handoff & cross-references

- **Consumes:** art direction (`32`–`36`), route + reference (`31-format-router` +
  `reference-manifest.yaml`), negatives (`24`), active `product-lock.yaml`.
- **Produces:** one `image_prompt_ir` (→ `image-model-dialect-map.md` for model phrasing →
  the render) and the `overlay_zones` map (→ `37-typography-compositor`).
- **Gated by:** `27-quality-checker` / `28-creative-scoring-engine` (≥95) and
  `41-product-fidelity-checker` (hard fidelity gate) **before any final-tier spend**;
  cost routing by `29-cost-optimizer` / `31-format-router`.
- **Twin:** `model-dialect-map.md` (video) — the same reference-first, text-in-post
  discipline for anything that moves (route R3, i2v from an approved keyframe this builder
  produced).
