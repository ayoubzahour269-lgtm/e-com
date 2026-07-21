# Product-Fidelity Gate — The Automatic Identity Pass/Fail Spec

### The formal specification of the studio's **product-identity gate**. It is the operator-readable mirror of skill **41-product-fidelity-checker** and the per-product **`products/<slug>/fidelity-checklist.md`**: it defines the axes, the weights, the hard-fails, the CIELAB **ΔE** colour tolerance, the binary verdict, and the **reject → regenerate → escalate** loop that runs on **every** rendered asset before a single final-tier credit is spent. Where skill 41 is the reasoning agent, this file is the **contract it enforces** — the thing a reviewer can point at and say *"the gate says REJECT, here is the rule."*

> **Quality / gate-spec artifact — not a skill.** Armed by **41-product-fidelity-checker** (the enforcer)
> and **40-product-identity-onboarding** (which BUILDS the lock + checklist this gate reads). Consumed by
> **31-format-router** (regenerate directives), the format directors **32/33/34/35/36**, **38-upscale-finisher**
> (the gate blocks final-tier spend until PASS), and **27-quality-checker / 28-creative-scoring-engine** (the
> Product-fidelity axis contribution). It runs **alongside** — never merged with — **46-ai-tell-detector**
> (undetectable-realism, a different axis) and **23-product-consistency-guard** (in-video narrative continuity).
>
> **Grounding.** STUDIO-BIBLE §7 (quality gates — Product-fidelity is a HARD gate axis; ship ≥ 95 weighted,
> no axis < 90). STUDIO-BIBLE-V2 §7bis (the product is ALWAYS reference-conditioned — routes **R1/R2/R3**,
> **never** text-to-image; label/ad Arabic is added in POST, never generated in-model) and §7ter.C (the
> guardian + fidelity system is **PRODUCT-AGNOSTIC** — read the ACTIVE `products/<slug>/product-lock.yaml`,
> never hardcode any one bottle). **When this spec and the Bible disagree, the Bible wins.**
>
> **This file invents no product truth.** Every threshold, swatch, hard-fail, and axis weight is *read from*
> the active product's `product-lock.yaml` (`fidelity_gate.ship_threshold`, `fidelity_gate.hard_fail_any`,
> `color_tolerance_deltaE`, `palette`, `do_not_alter`) and `fidelity-checklist.md`. The mechat-red-oil rows
> below are the **worked flagship example** that illustrates the schema — the *logic* always resolves the
> active lock's fields, so a new product is guarded identically the moment its lock exists, with zero edits here.

---

## 0. Scope & the one question

The gate answers exactly **one** binary question, on every asset, of every format, for every product:

> **Is the product in this render the owner's ACTUAL product — its real vessel, cap, liquid colour, label
> graphics, label text, and seal — reproduced to the tolerance the lock allows? Or has the model drifted,
> invented, warped, re-coloured, relabelled, or reshaped it?**

Anything short of *yes, within tolerance, with zero hard-fail* → **REJECT and regenerate**, before the owner
ever sees the asset and before any final-tier / upscale credit is committed. The gate **replaces the owner
checking fidelity by hand** (Bible V2 §7bis: fidelity must be *structural, automatic, and repeatable across
future products with zero re-parameterization*).

**What this gate does NOT judge** (keep the lane clean):
- Not *does it look filmed, not AI* → that is **46-ai-tell-detector**.
- Not *is the mood on-brand* → that is **22-brand-guardian**.
- Not *does the scene respect Gulf modesty/culture* → that is `quality/culture-checklist.md`.
- Not *does it convert* → that is **27/28**.

A render can be cinematic, perfectly graded, on-brand, and modest — and still **FAIL here** because it painted
«الأحمر» onto a label that must never carry it, rendered a square bottle when the real one is a tall slim
cylinder, or made the oil bright cranberry when the real oil is brown-amber. **Beauty is not the standard. The
real photograph is the standard.**

---

## 1. Precheck — the route gate (run BEFORE any axis)

The single cheapest way to fail fidelity is to have generated the product from *text*. So the first thing the
gate verifies is **how the product entered the frame**, read from the asset's routing record (from
31-format-router) and cross-checked against `config/kie-models.yaml` `reference_modes`:

- ✅ **PASS-to-scoring** only if the asset was produced on a **reference-conditioned** route:
  - **R1 · product-real / world-AI** (default) — the real magenta-chroma cutout is composited, only the world
    is generated. Product pixels ARE the real photo → maximum fidelity.
  - **R2 · reference-edit** — image-to-image / edit / inpaint conditioned on the canonical, label region preserved.
  - **R3 · image-to-video** — motion animated from an **approved keyframe that already contains the real product**.
- 🚫 **INSTANT REJECT — no scoring** if:
  - the product was **text-to-image generated** from a written description (Bible V2 §7bis forbidden), or
  - any `/assets` render was used as the identity source (all have drifted — see reference-manifest `forbidden`), or
  - the requested camera angle is **outside `reference-manifest.rotation_capability`** (an unreferenced angle is an
    automatic identity risk — e.g. a full 360° rotation from a single front reference), or
  - **in-frame Arabic label/ad text was model-generated** rather than added in POST by 37-typography-compositor.

A render that reaches the axes on a forbidden route cannot be trusted no matter how good it looks. **Fail closed.**

---

## 2. Axes, weights & the verdict math

Weights are **read from the active `fidelity-checklist.md`**, not fixed here. The mechat-red-oil worked example
distributes **100 points** as:

| Axis | What it measures | mechat pts | Contains hard-fails? |
|------|------------------|:----------:|:--------------------:|
| **A · Vessel & closure** | shape, proportions (H:D ratio), body walls, cap form/colour/ribbing, clear PET | **25** | 🚫 yes |
| **B · Liquid** | oil hue (brown-amber vs ruby), fill-line + headspace air-gap, translucency | **15** | 🚫 yes |
| **C · Label — structure & graphics** | white panel span, red swoosh + gold pinstripe, gold seal placement, size hierarchy | **25** | 🚫 yes |
| **D · Label — text (Arabic exactness)** | brand lockup glyphs, `forbidden_on_label`, benefit lines, volume, no gibberish | **25** | 🚫 yes |
| **E · Consistency (set / temporal)** | identical units in multi-packs, no frame-to-frame drift across video | **10** | — |
| | **Total** | **100** | |

**Verdict math (in order — the first rule that fires wins):**

1. **Any 🚫 hard-fail FAILs → VERDICT = REJECT, score capped at 0** regardless of the weighted total. Non-negotiable.
2. **Weighted total < `fidelity_gate.ship_threshold`** (mechat: **95**) → **REJECT**.
3. **Any single axis below its floor** — Bible §7 sets *no axis < 90* on the normalized 0–100 axis score → **REJECT**.
4. Otherwise → **PASS**. Only a PASS releases the asset to final-tier / upscale spend and to ship.

The gate emits a `fidelity-report.<asset-id>.md` (per-axis table + ΔE ledger + hard-fail ledger + verdict) on
every run, and a `regenerate-directive.<asset-id>.yaml` **only on REJECT**.

---

## 3. Hard-fails — the instant-reject ledger

These are read from `product-lock.yaml` → `fidelity_gate.hard_fail_any` and the 🚫 rows of the checklist. **Any
one FAIL = REJECT at 0**, regardless of how clean everything else is. The mechat-red-oil set:

| # | Hard-fail (🚫) | Axis | Why it is non-negotiable |
|---|----------------|:----:|--------------------------|
| H1 | **Vessel not cylindrical** — square, squat, faceted, or wrong H:D ratio (real ≈ 2.35) | A | The square bottle in old `/assets` is a *different, wrong product*. |
| H2 | **Oil rendered bright ruby / cranberry** instead of warm reddish-brown amber (mahogany) | B | The real oil transmits brown-amber; ruby is a fabricated identity. |
| H3 | **Red diagonal swoosh + gold pinstripe missing / altered** (flat band, wrong colour) | C | The swoosh is a locked brand graphic, not decoration. |
| H4 | **Gold «100% natural / طبيعي» seal missing or moved off the LEFT** | C | Placement is part of identity; a moved seal reads as a counterfeit. |
| H5 | **Brand lockup «زيت / المشاط / للشعر» garbled** (wrong glyphs, wrong hierarchy, «المشاط» not largest) | D | The lockup IS the product; garbling it is a fatal identity break. |
| H6 | **«الأحمر» painted onto the label** (`forbidden_on_label`) | D | Marketing may *say* "red mechat"; the physical bottle must never carry «الأحمر». |
| H7 | **Any invented, mistranslated, or gibberish Arabic glyph** on the bottle | D | Label glyphs are reproduced *photographically*, never re-typeset by a model. |
| H8 | **Model-generated in-frame Arabic** (label or overlay baked into the raw render) | precheck/D | All Arabic is added in POST by 37-typography-compositor; in-model Arabic = fabricated. |

> **Product-agnostic note.** For a different product these rows are *whatever that lock lists*. The gate never
> assumes a bottle, a swoosh, or a seal — it reads `hard_fail_any` from the active lock and enforces those.

---

## 4. Colour tolerance — the ΔE ledger

Colour drift is measured, not eyeballed. The gate samples each locked region, converts to **CIELAB**, and
compares to the product-lock `palette` swatch using **ΔE (CIEDE2000)** against `fidelity_gate.color_tolerance_deltaE`
(mechat: **ΔE ≤ 3**).

**Method (per region):**
1. Sample a clean patch of the region (avoid specular hotspots, edges, motion blur, JPEG/codec artefacts —
   for video, sample the worst frame, not a lucky one).
2. Convert sampled RGB → L\*a\*b\* (D65).
3. Compute ΔE00 vs the lock swatch. Record: `region → measured L*a*b* → lock swatch (hex) → ΔE → band`.

**Bands:** `PASS ΔE ≤ 3` · `MINOR 3 < ΔE ≤ 5` (accumulates; three MINORs in one region → one MAJOR) ·
`MAJOR/FAIL ΔE > 5` (caps the owning axis < 90 → REJECT). A hue *category* flip (amber → ruby) is **H2**, a
hard-fail, not merely a large ΔE.

**mechat-red-oil sampled swatches** (from `palette`, `verify_by_sample: true` — onboarding tightens these to
ΔE ≤ 3 against the canonical file before the first paid generation):

| Region | Lock swatch | Hex |
|--------|-------------|-----|
| Oil highlight (thin backlit neck) | `oil_highlight` | `#B4652A` |
| Oil mid mass | `oil_mid` | `#7E2E14` |
| Oil deep base | `oil_deep` | `#3A1206` |
| Cap white | `cap_white` | `#F4F2EF` |
| Label white | `label_white` | `#FFFFFF` |
| Brand red text «المشاط» | `brand_red_text` | `#C41A1A` |
| Swoosh maroon | `swoosh_maroon` | `#9A1B1E` |
| Gold (seal + pinstripe) | `gold` | `#C7A233` |
| Benefit ink | `benefit_ink` | `#2A1A16` |

> White-balance discipline: a warm/cool scene grade shifts *everything*. Before flagging a colour FAIL, verify
> the neutral references (cap_white, label_white) are within tolerance; if the whites drifted uniformly, the
> issue is a **global grade** (fixable in the colorist post-pass, not a re-roll) — log it as such in the directive.

---

## 5. The reject → regenerate → escalate loop

On **REJECT**, the gate never ships and never asks the owner. It emits a `regenerate-directive.<asset-id>.yaml`
naming the failing axis/row, the owning producer to route back to, the retry index, and the next ladder step:

```
Ladder (climb only on repeated failure of the same asset):
  step 0  same route + SAME seed + SAME reference, tightened prompt on the failing axis
  step 1  same route, NEW seed, reference re-anchored (the exact reference id to condition on)
  step 2  escalate route  R3→R2  or  R2→R1   (edit → real-cutout composite: higher fidelity, often cheaper)
  step 3  force R1 real-cutout composite (product pixels = the real photo → fidelity guaranteed)
  cap     max_loops (config/studio.config.yaml) reached → HALT, emit HOLD, surface to owner. Never loop forever.
```

**Routing map — who fixes what:**

| Failing axis / row | Route back to | Typical fix |
|--------------------|---------------|-------------|
| Precheck route violation (t2i, wrong angle) | 31-format-router | re-issue on a reference-conditioned route within rotation_capability |
| A vessel shape / proportions | format director + router | re-roll with reference re-anchored, or escalate toward R1 |
| B oil hue (H2) / ΔE | format director / 52-colorist | re-roll if categorical; grade-fix if a uniform global shift |
| C swoosh / seal (H3/H4) | router → R2 edit or R1 composite | preserve the real label region; stop trusting the model to draw it |
| D label text (H5/H6/H7/H8) | router → R1 composite + 37-typography-compositor | real label pixels + POST typography; never model-typeset Arabic |
| E set/temporal drift | 23-product-consistency-guard + router | lock the keyframe; re-anchor every beat to the same canonical unit |

**Runaway guard.** Every re-roll costs credits, so the loop is bounded by `max_loops` with an
`on_max_loops_exceeded` action — the gate **HOLDs** the asset and escalates rather than burning the budget. A
gate that spends infinitely is worse than no gate.

---

## 6. Draft → final gating (where the gate sits in the pipeline)

The gate runs **twice** by design, so no expensive credit is ever spent on an asset that will fail identity:

1. **Draft gate (cheap tier).** After every draft render, before promoting to final-tier / upscale. A REJECT
   here costs almost nothing and loops on the cheap tier until PASS or HALT. **This is where most fidelity
   failures should die.**
2. **Final gate (pre-ship).** After 38-upscale-finisher, before delivery. Re-run on the *finished* asset —
   upscaling and grading can *reintroduce* drift (a sharpened label can hallucinate glyphs; a warm grade can
   push oil toward ruby). PASS here is mandatory to ship.

The gate's **blanket ALLOW/HOLD on final-tier spend** for a batch is the single most budget-protective control
in the studio: no PASS at the draft gate, no upscale credit.

---

## 7. Consistency across a set and over time (Axis E)

- **Multi-pack shots** (e.g. a 3-pack): every bottle must be an **identical canonical unit** — never a
  re-labelled or re-coloured variant. A pack of three "similar" bottles is a FAIL.
- **Video**: the label, vessel shape, and oil colour must **not drift frame-to-frame**. Sample the worst frame
  and the motion; a label that morphs mid-clip is a hard-fail on 46's Text axis and a fidelity REJECT here.
- **Side-by-side test**: placed next to `references/01-front-white.png`, would a human say "same product"? If
  not, REJECT — this is the ultimate arbiter when an axis is disputed (referee: 40-product-identity-onboarding).

---

## 8. Interfaces — who reads the gate, who feeds it

**Consumes:** active product slug (`config/studio.config.yaml` `brand.active`) → `products/<slug>/product-lock.yaml`
(vessel/cap/liquid/label/palette/do_not_alter/reference_conditioning/`fidelity_gate`) · `fidelity-checklist.md`
(axis weights + 🚫 rows + ΔE rule + ladder) · `references/` (the real photos = ground truth) ·
`reference-manifest.yaml` (route→reference map + `rotation_capability`) · the rendered asset + its routing record
· `config/kie-models.yaml` (`reference_modes`, cost tiers) · `config/studio.config.yaml` (`ship_threshold`,
`max_loops`).

**Produces:** `fidelity-report.<asset-id>.md` (per-axis table · ΔE ledger · hard-fail ledger · verdict) ·
`regenerate-directive.<asset-id>.yaml` (REJECT only) · the run-level fidelity-gate manifest (batch PASS/REJECT +
the ALLOW/HOLD on final-tier spend) · the **Product-fidelity axis contribution** (0–100 + hard-fail cap flag)
consumed by 27/28.

**Runs alongside, never merged:** 46-ai-tell-detector (undetectable-realism — reported *together*, a different
axis) and 23-product-consistency-guard (in-video narrative continuity — cross-checked, not duplicated).

---

## 9. Reviewer note & the standing invariants

You should **not** need to run this by hand — skill 41 does, on every asset, automatically, for this product and
every future one. This spec exists so fidelity is a **structure**, not a chore. If you ever do glance, compare
against `references/01-front-white.png` **only** (never an `/assets` render). The invariants that never bend:

1. **The real photo is the standard** — not the prose, not beauty, not "close enough".
2. **The product is never trusted to text** — reference-conditioned routes only (R1/R2/R3), never t2i.
3. **All Arabic is added in POST** — any model-generated in-frame Arabic is an automatic REJECT.
4. **Any hard-fail = REJECT at 0** — regardless of the weighted score.
5. **ΔE is measured, not eyeballed** — CIELAB against the lock swatches, tolerance from the lock.
6. **Fail closed** — a missing required input HALTs the gate; a gate that guesses is worse than no gate.
7. **Product-agnostic** — the logic reads the ACTIVE lock; a new product is guarded identically with zero edits here.
