# Fidelity Checklist — Mechat Red Oil (auto-QC gate)

> **This is what replaces you checking by hand.** Skill `41-product-fidelity-checker`
> runs this checklist against **every** generated asset (image / video frame / 3D /
> banner), scores it, and **auto-rejects** anything that fails — before you ever see
> it, and for every future product using the same checklist shape.
>
> Truth = `references/01-front-white.png` + `references/02-front-chroma-magenta.png`
> and `product-lock.yaml`. The old `/assets` renders are NOT truth.

## How scoring works
- 100 points total, distributed across the axes below.
- **Ship threshold: ≥ 95** and **no hard-fail**.
- Any **HARD-FAIL** item (marked 🚫) = instant reject at 0, regardless of total.
- Color checks use ΔE ≤ 3 against sampled label/oil swatches.
- On reject → the router regenerates (same seed + reference) up to the retry cap,
  then escalates to a cheaper/edit route (R2) or the real-cutout route (R1).

---

## A. Vessel & closure — 25 pts
- [ ] 🚫 Bottle is **cylindrical, tall & slim** (height:diameter ≈ 2.35). NOT square, NOT squat. *(hard-fail if square)*
- [ ] Smooth cylindrical body — no ribbing/facets on the body wall.
- [ ] Gently rounded shoulder → short clear neck.
- [ ] Cap present, **white, vertically ribbed**, flat top, seated on neck, ~18% of height.
- [ ] Clear PET wall (colourless) — oil colour shows through, not a coloured bottle.

## B. Liquid — 15 pts
- [ ] 🚫 Oil is **warm reddish-brown / amber (mahogany)** — NOT bright ruby/cranberry. *(hard-fail if pure ruby)*
- [ ] Visible **fill-line + headspace air-gap** (~12%) at the shoulder.
- [ ] Translucent, light transmits through the thin/backlit upper oil.

## C. Label — structure & graphics — 25 pts
- [ ] White label substrate, front rounded-rectangle panel spanning ~0.40–0.88 of body height.
- [ ] 🚫 **Red diagonal swoosh** with **thin gold pinstripe** across the top ~22%. *(hard-fail if missing/altered)*
- [ ] 🚫 **Gold «100% natural / طبيعي» seal** on the **LEFT** of the label. *(hard-fail if missing or moved)*
- [ ] Relative size hierarchy intact (swoosh → seal → brand → benefits → volume).

## D. Label — text (Arabic exactness) — 25 pts
- [ ] 🚫 Brand lockup reads **«زيت / المشاط / للشعر»** in red, «المشاط» largest. *(hard-fail if garbled)*
- [ ] 🚫 **«الأحمر» is NOT printed on the label.** *(hard-fail if the model painted it on)*
- [ ] Benefit lines present & legible: «تركيبة طبيعية» / «تقوي الشعر» / «تغذيه وتكثيف الشعر».
- [ ] **«250 ml»** present, lower-left, dark ink.
- [ ] No invented, mistranslated, or gibberish Arabic glyphs anywhere on the bottle.

## E. Consistency across a set / over time — 10 pts
- [ ] In multi-bottle shots (3-pack), all bottles are **identical** canonical units.
- [ ] Across a video, the label/shape/oil do **not** drift frame-to-frame.
- [ ] Same product identity as the canonical reference (side-by-side would pass).

---

## Hard-fail quick list (any one → reject)
1. Square / non-cylindrical vessel.
2. Bright ruby oil instead of brown-amber.
3. «الأحمر» painted onto the label, or brand text garbled.
4. Gold seal missing or not on the left.
5. Red swoosh missing/replaced (e.g. flat band, wrong colour).
6. Any invented or mistranslated label glyph.

## Reviewer note (for the human spot-check, optional)
You should **not** need to run this manually — the checker does. It exists so that,
across this product and every future one, fidelity is a structural gate, not your
chore. If you ever DO glance, compare against `references/01-front-white.png` only.
