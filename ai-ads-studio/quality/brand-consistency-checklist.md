# BRAND CONSISTENCY CHECKLIST — Palette · Type · Voice · Logo Lock

> **Authority.** This is the operational checklist behind **axis 4 "Brand
> consistency" (weight 8)** in `quality/scoring-rubric.md`, and the working
> instrument of **skill `22-brand-guardian`**. It answers one question for every
> asset the studio ships: *does this look and sound like it came from the SAME
> brand as everything else — and does the on-product identity match the real
> product?* When this file and `quality/scoring-rubric.md` disagree on *scope*,
> the rubric wins. When either disagrees with a *product fact*, the active
> **`products/<slug>/product-lock.yaml`** wins (STUDIO-BIBLE-V2 §7ter.C: the
> guardian is generic and reads the ACTIVE product — it never hardcodes a
> bottle).
>
> **Consumed by:** `22-brand-guardian` (primary), `32-image-ad-director`,
> `33-banner-systems-designer`, `34-3d-render-director`,
> `35-landing-visual-director`, `37-typography-compositor`,
> `54-motion-graphics-compositor`, and the `27-quality-checker` gate.
> `model_cost: none` — this is pure Claude reasoning, run BEFORE any Kie credit
> is spent and again on every returned render.
>
> **Not the same as product fidelity.** Product *fidelity* (does the bottle/label
> match the real photos, ΔE ≤ 3) is axis 5 and lives in
> `products/<slug>/fidelity-checklist.md` (skill 41). **This** file is *brand
> system* consistency — the palette, type, voice, layout, logo lockup and CTA
> language that must be identical across the whole campaign set. The two overlap
> only on the printed label (checked here for *presence/legibility*, there for
> *pixel fidelity*).

---

## 0. THE CHECK IN ONE LINE

**PASS** when a stranger, shown the whole asset set side by side, would say *"same
brand, same taste, same product"* — same reds, same two typefaces, same voice,
same lockup, same CTA — with **zero** rogue colors, fonts, English brand names,
or off-tone copy. Any hard-fail item below is an automatic **BLOCK**, regardless
of the numeric score.

---

## 1. HOW TO LOAD THE ACTIVE BRAND (product-agnostic — do this first)

Never assume mechat. Resolve the brand truth for the CURRENT run from these
sources, in priority order:

1. **`products/<active-slug>/product-lock.yaml`** — the authoritative on-product
   identity: `palette:` (hex + `verify_by_sample`), `typography:`, `label:`
   (brand lockup, seal, benefit lines, volume), `do_not_alter:` and
   `allowed_variation:`. **This is the single source of truth for the product's
   own colors, its label wordmark, and what may never change.**
2. **`config/brand/<active-slug>.brand.yaml`** (if present) — the *campaign* brand
   layer: CTA color, overlay palette, headline/body font roles, voice rules,
   forbidden claims. Falls back to STUDIO-BIBLE §3 tokens for the flagship.
3. **`knowledge/gulf-beauty-brand-norms.md`** — category/house-style truth (lane
   B: heritage, ritual, amber-red, hands+hair, El Messiri/Tajawal). Voice and
   aesthetic consistency defer to this.
4. **`knowledge/arabic-copywriting.md`** + the active `knowledge/gulf-culture/<market>.md`
   — dialect register, forbidden phrasing, number/RTL handling.

> **Two-color-worlds rule.** Keep them separate and never let them collide:
> **(a) product-intrinsic colors** = the label/oil/cap hex from
> `product-lock.palette` (photographic, reference-conditioned, *never* restyled);
> **(b) campaign/overlay colors** = the brand palette used for headline text, CTA
> buttons, price chips, end-cards, gradients (added in POST by the
> typography/motion-graphics compositors). A brand-consistency PASS requires
> BOTH worlds internally consistent AND harmonized with each other.

---

## 2. PALETTE CONSISTENCY

Sample the actual pixels of the delivered asset (overlays + backgrounds), not the
prompt. Compare against the active palette with **ΔE ≤ 3** tolerance
(`product-lock.fidelity_gate.color_tolerance_deltaE`).

- [ ] **Brand hero color** matches `palette.brand_red_text` / brand red within ΔE ≤ 3
      (flagship: garnet family `#C41A1A` / `#8E1B1E`). No drift to orange, pink, or brown.
- [ ] **Secondary/accent** (gold) matches `palette.gold` (`#C7A233` / `#C9A227`);
      used sparingly for seal, pinstripe, price accent — never as a flood fill.
- [ ] **Neutrals** = the warm cream / surface white / warm-brown ink family
      (`#FAF6F1`, `#FFFFFF`, `#2A1A16`, `#6B564E`). No pure cold `#000000` text,
      no cold clinical studio-white background (gulf-norms §3).
- [ ] **Oil color on product** reads warm reddish-brown amber (`oil_highlight` →
      `oil_deep`), NOT bright ruby/cranberry (product-lock hard-fail crosscheck).
- [ ] **CTA color** is the single locked brand-CTA red across every asset — the
      same hex on the video end-card, the image ad, and every banner size.
- [ ] **No rogue colors:** the asset introduces no 5th/6th hue outside the
      documented palette (a stray blue UI chip, neon CTA, purple gradient = fail).
- [ ] **Cross-asset match:** the reds/golds/creams are the SAME hex across the
      whole delivered set (hero video ↔ image ad ↔ banner ↔ LP hero). Sample two
      assets and diff — a "close but different" red across formats is a fail.
- [ ] **Gradient/wash discipline:** background gradients stay within warm-amber /
      garnet / cream; no rainbow ramps, no HDR halos, no oversaturation.
- [ ] **Contrast:** overlay text vs its plate meets WCAG-AA-ish legibility
      (≥ 4.5:1 body, ≥ 3:1 large display) — brand red on cream OK, brand red on
      garnet is NOT (must sit on a cream/white plate).

**Palette hard-fails (auto-BLOCK):** CTA color differs between assets · product
oil rendered bright ruby · a non-palette accent hue introduced · brand red drifted
> ΔE 3.

---

## 3. TYPOGRAPHY CONSISTENCY

Two typefaces, two roles — everywhere, forever. Flagship: **El Messiri** (display/
headlines) + **Tajawal** (body/captions), both RTL Arabic
(`product-lock.typography`, gulf-norms §3).

- [ ] **Display font** = the locked heritage display face (El Messiri) on every
      headline, hook, end-card wordmark, price. Never a generic Latin sans, never
      Times/Arial-Arabic, never a second decorative face.
- [ ] **Body font** = the locked text face (Tajawal) on all captions, sub-lines,
      legal/COD line. One body face across the whole set.
- [ ] **No third font** anywhere in the campaign (a "fun" TikTok caption font is a
      consistency break — style it in the locked face instead).
- [ ] **RTL correctness:** Arabic runs right-to-left; diacritics/harakat render;
      no reversed or disconnected glyphs (a machine-rendered broken Arabic = fail).
- [ ] **Numbers & price** (139, 185, ml, %) sit LTR *inside* the RTL line without
      breaking word order; the SAR/﷼ and «بدل» framing matches the offer lockup.
- [ ] **Weight & hierarchy** are consistent: hook > sub > CTA size relationship is
      the same archetype across image ad, banner, and video end-card.
- [ ] **Label type is NOT re-typeset:** the printed wordmark «زيت / المشاط / للشعر»
      on the bottle is *photographic* (reference-conditioned), never re-keyed in a
      font — see product-lock.typography note. Confirm the label glyphs came from
      the reference, not from an overlay layer.
- [ ] **Overlay type IS added in post:** all ad/headline/CTA Arabic is composited
      by `37-typography-compositor`, never generated in-model (guarantees correct
      Arabic; STUDIO-BIBLE-V2 §5.3). Flag any in-model burned-in headline.
- [ ] **Safe margins:** overlay text clears platform UI safe zones (top ~14%,
      bottom ~20%) and never crops mid-word across sizes.
- [ ] **Kerning/tracking** consistent; no default-app auto-spacing that differs
      between the 1:1 and 9:16 export.

**Typography hard-fails:** wrong/second display font · broken or reversed Arabic ·
Latin sans substituted for the Arabic face · label wordmark re-typeset instead of
photographic · headline burned in-model instead of composited in post.

---

## 4. LOGO / BRAND LOCKUP / LABEL PRESENCE

The wordmark exists in two places — **on the product** (photographic, immutable)
and **in the layout** (end-card / corner lockup, composited). Both must be right.

- [ ] **On-product lockup** «زيت / المشاط / للشعر» present, red, correct hierarchy
      (المشاط = hero word, largest), and **NEVER «الأحمر» painted onto the label**
      (product-lock `forbidden_on_label`). Marketing may say "red mechat" in
      overlay/voice — the *bottle* never gains that word.
- [ ] **Gold «100% natural / طبيعي» seal** present on the **left** of the label,
      not moved, not missing (crosscheck product-lock hard-fail list).
- [ ] **Label is legible** at the delivered size — if the bottle is small in a
      banner, the label still reads as the right label (not smeared into a
      generic red-and-white blob).
- [ ] **Composited lockup / end-card** uses the approved wordmark rendering (the
      locked file or the compositor recipe), same proportions and color every time.
- [ ] **Clear space** around any composited logo/CTA respects a consistent margin;
      no text or prop crowds it.
- [ ] **No unauthorized brand marks:** no invented English brand name, no extra
      badges, no fabricated award/certification logos, no watermark, no
      platform-logo misuse.
- [ ] **3-pack integrity:** a multi-bottle group shows three IDENTICAL canonical
      bottles (product-lock `allowed_variation`), never a re-labeled variant or a
      mixed-cap set.
- [ ] **Cap consistency:** white vertically-ribbed screw cap on every appearance —
      never gold, black, or smooth (product-lock `do_not_alter`).

**Logo hard-fails:** «الأحمر» on the physical label · seal missing/moved · invented
English brand name or fake certification badge · non-identical bottles in a pack ·
wrong cap color.

---

## 5. VOICE & COPY CONSISTENCY

Same brand personality in every line — warm, heritage-proud, feminine, elegant
MSA (فصحى) that reads pan-Gulf; Khaleeji-leaning spoken variant only where the
market doc allows (STUDIO-BIBLE §5). Defer to `knowledge/arabic-copywriting.md`
and the active `gulf-culture/<market>.md`.

- [ ] **Register match:** elegant MSA for the KSA-primary cut; no Darija, no
      Egyptian slang in the Saudi default (gulf-norms + market doc).
- [ ] **Voice traits consistent:** confident, intimate, reassuring — never hypey,
      never clinical, never fear-mongering about the body (STUDIO-BIBLE §5).
- [ ] **Claim discipline:** every benefit stays within the locked claim set
      (STUDIO-BIBLE §3: stops shedding / stimulates growth / density & length /
      shine — with the documented timelines). **No exceeded or invented claims,
      no medical/drug claims.**
- [ ] **Heritage framing done right:** "grandmother's ritual / rediscovered
      recipe," home & family & ritual — NOT orientalist "ancient mystical Arabia,"
      no desert/camel/souk shorthand (gulf-norms §4).
- [ ] **CTA language locked & identical:** «اطلبي الآن — الدفع عند الاستلام»
      (Order now — Cash on delivery), same wording on every asset. COD /
      inspect-before-pay trust cues phrased consistently.
- [ ] **Offer lockup consistent:** «باك 3 قنينات — 139 ﷼ بدل 185 · شحن مجاني» —
      same numbers, same order, same free-shipping phrasing across all placements.
- [ ] **Transliteration + gloss** present on first Arabic use in any internal
      artifact (Bible §2), so reviewers can verify.
- [ ] **No awkward machine translation, ever** — any line that reads MT is a fail
      even if "understandable."
- [ ] **Emoji / punctuation register** matches the brand (restrained, elegant) and
      is identical in tone across TikTok vs Meta cuts — platform-adapted pacing is
      fine; a different *personality* is not.

**Voice hard-fails:** exceeded/invented/medical claim · CTA or price wording drifts
between assets · orientalist heritage cliché · machine-translated Arabic · wrong
dialect for the market.

---

## 6. LAYOUT / OVERLAY-ZONE / CTA SYSTEM CONSISTENCY

The brand is also its *composition grammar* — reserved overlay zones, focal
hierarchy, CTA affordance — shared across the matrix (STUDIO-BIBLE-V2 §1, §5.4
"one master → many exports").

- [ ] **Overlay zones respected:** headline/CTA sit in the reserved negative-space
      zones from the director's overlay-zone map — not slapped over the product or
      a busy area (skills 32/33).
- [ ] **CTA affordance consistent:** same button shape/weight/color and same
      corner placement logic across sizes and placements.
- [ ] **Layout archetype coherence:** the three archetypes (product-hero /
      benefit-demonstration / social-proof) are used consistently; a "social-proof"
      layout looks like the others in the set, not a different design language.
- [ ] **One master → many exports:** feed 1:1, story 9:16, IAB sizes are
      crop/recompose of ONE approved master — same crop logic, same safe zones, no
      per-size redesign that breaks the system (§5.4).
- [ ] **Motion-graphics continuity (video):** animated overlays, lower-thirds,
      price chip and end-card use the SAME entrance/exit style and timing across
      cuts (skill 54); the end-card is the same lockup every time.
- [ ] **Aspect-safe brand elements:** logo, CTA, and price remain legible and
      correctly placed in the FIRST and LAST second of every video cut
      (STUDIO-BIBLE §5, sound-off legibility).

---

## 7. PER-FORMAT SPOT-CHECKS

| Format | Extra brand-consistency checks |
|--------|-------------------------------|
| `hero-video-ad` | End-card lockup + CTA color + font identical to stills; overlays composited (not in-model); brand legible sound-off first & last second. |
| `image-ad` | Overlay zones honored; single display + body font; CTA color exact; label legible at feed thumbnail scale. |
| `banner` | Every IAB/story size shares one palette, one font pair, one CTA style; text hierarchy holds at 320×50 and 160×600 alike. |
| `3d-render` | Studio-CGI packshot still shows the exact label/cap/oil color; scene lighting stays in the warm brand world (no cold rim-light look). |
| `lp-hero-image` / `lp-section-image` | Matches the LIVE `index.html` palette/fonts/RTL (skill 35); batch section images share style tokens so the page reads as one system. |
| `lp-microvideo` | Loop keeps the brand color world; no color pop/flicker at the loop seam; poster frame is on-brand. |

---

## 8. SCORING → AXIS 4 (weight 8)

Translate the checklist into the axis-4 subscore (0–100). Anchors:

- **95–100** — every box ticked; palette/type/voice/logo/CTA identical across the
  whole set; nothing a brand manager would flag.
- **90–94** — one minor, non-hard-fail slip (e.g. a gradient slightly hot, a caption
  tracking a touch loose) — passes the axis floor but note it.
- **80–89** — a visible inconsistency across assets (CTA a different red, a second
  font on one banner) — **below the axis-4 floor of 90 → BLOCK**, auto-improve &
  re-score.
- **< 80** — multiple breaks or any hard-fail item — **BLOCK**.

Remember the gate is **AND-ed** (`quality/scoring-rubric.md §0`): axis 4 ≥ 90 AND
weighted total ≥ 95. A great hook cannot buy back an off-brand CTA color, and a
brand-perfect asset cannot ship if product *fidelity* (axis 5) or *undetectability*
(axis 2) fails.

### 8.1 Hard-fail master list (any one = instant BLOCK)
1. CTA color OR CTA wording OR price/offer wording differs between assets.
2. A non-palette accent hue introduced, or brand red drift > ΔE 3.
3. Wrong or second display font; Latin sans substituted for the Arabic face.
4. Broken / reversed / machine-translated Arabic.
5. Label wordmark re-typeset in a font instead of photographic reference.
6. «الأحمر» painted onto the physical label, or the gold seal missing/moved.
7. Invented English brand name or fabricated certification/award badge.
8. Exceeded, invented, or medical claim; orientalist heritage cliché.
9. Headline/CTA burned in-model instead of composited in post.
10. Wrong cap color, or non-identical bottles in a multi-pack.

---

## 9. REVIEWER SIGN-OFF BLOCK (paste into the QC record per asset)

```
asset_id:            <matrix-id / filename>
active_product:      <slug>            # loaded from products/<slug>/product-lock.yaml
brand_layer:         <config/brand/<slug>.brand.yaml | bible-flagship>
palette_pass:        [ ] reds ΔE≤3  [ ] gold  [ ] neutrals  [ ] CTA-color-match  [ ] no-rogue-hue
typography_pass:     [ ] display  [ ] body  [ ] RTL/harakat  [ ] LTR numbers  [ ] no-3rd-font  [ ] label-not-retypeset  [ ] overlay-in-post
logo_label_pass:     [ ] lockup  [ ] no-«الأحمر»  [ ] seal-left  [ ] cap-white-ribbed  [ ] pack-identical  [ ] no-fake-badge
voice_pass:          [ ] register  [ ] claims-in-bounds  [ ] heritage-right  [ ] CTA-locked  [ ] offer-locked  [ ] no-MT
layout_cta_pass:     [ ] overlay-zones  [ ] cta-affordance  [ ] one-master-exports  [ ] motion-continuity
hard_fails:          <none | list the numbered items>
axis4_score:         <0-100>
verdict:             <PASS / BLOCK — auto-improve & re-score>
reviewer:            22-brand-guardian
```

---

## 10. HANDOFF

- **PASS** → axis-4 subscore feeds `27-quality-checker` /
  `28-creative-scoring-engine`; the asset proceeds to the product-fidelity gate
  (skill 41, axis 5) and the undetectability gate (skill 46, axis 2). Brand PASS is
  necessary, not sufficient.
- **BLOCK** → return to the owning director (32/33/34/35/54) with the specific
  failed items and the exact corrective (re-sample palette to the locked hex,
  swap to the locked font, recomposite the CTA, restore the seal). Re-score after
  the fix — **never spend a final-tier Kie credit on an off-brand asset**
  (STUDIO-BIBLE-V2 §5.5, §5.10).
- **New product** → nothing here changes: drop the real photos into
  `products/<new-slug>/references/`, run skill 40 to generate its
  `product-lock.yaml`, and this checklist reads the new palette/label/lockup
  automatically. The guardian is generic by construction (STUDIO-BIBLE-V2 §7ter.C).
