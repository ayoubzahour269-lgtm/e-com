# QUALITY SCORING RUBRIC — The 10-Axis Ship Gate

> **Authority.** This is the single source of truth for how AI Ads Studio scores a
> creative *before* any Kie AI credit is spent. It operationalizes STUDIO-BIBLE §7
> ("a run may NOT call a model until all gates pass") and STUDIO-BIBLE-V2 §5 policy
> 10 ("QC gate ≥ 95 before any final spend"). When `config/studio.config.yaml`
> `quality` block and this file disagree on *weights*, **this file wins** (the
> config intentionally does not duplicate weights; see its line 187). When this
> file and the Bible disagree on *facts*, the **Bible wins**.
>
> **Consumed by:** `27-quality-checker`, `28-creative-scoring-engine` (video),
> and every v2 director + `30-creative-matrix-planner` / `31-format-router`
> (image / banner / 3D / LP media). `model_cost: none` — scoring is pure Claude
> reasoning; it never calls a model.

---

## 0. THE GATE IN ONE LINE

**SHIP** only when **weighted total ≥ 95** **AND** **no single axis < 90**.
Otherwise: **AUTO-IMPROVE → RE-SCORE**, never generate. Both conditions are
independent — a 97 weighted total with product-fidelity at 88 is a **BLOCK**, not
a ship. The per-axis floor exists so a brilliant hook can never buy back a broken
label (ARCHITECTURE §5.1).

```
ship = (weighted_total >= 95) AND (min(all_ten_axes) >= 90)
```

This gate runs on EVERY product-bearing asset: hero video, image ad, banner
master, 3D packshot, LP hero/section image, LP microvideo loop. Non-product LP
imagery (pure texture/pattern backgrounds with no bottle) still scores all axes
except product-fidelity, which is marked `N/A` and its weight is redistributed
pro-rata across the remaining nine.

---

## 1. THE TEN AXES + WEIGHTS

Weights sum to 100. Ordering follows the studio's priority stack
(realism → conversion → cost, Bible §0). Realism-family axes (1,2,5) carry the
most weight because priority #1 is "looks filmed, never AI, exact real product."

| # | Axis | Weight | Family | Owning skill(s) |
|---|------|-------:|--------|-----------------|
| 1 | **Realism** (photoreal craft) | 15 | realism | 16/17/18/19 realism directors |
| 2 | **Undetectability** (anti-AI forensics) | 13 | realism | 17-human-realism + 24-negative-prompt-builder |
| 3 | **Conversion / Hook** | 14 | conversion | 03-strategist, 06-hook, 28-scoring-engine |
| 4 | **Brand consistency** | 8 | brand | 22-brand-guardian |
| 5 | **Product fidelity** (real-product lock) | 14 | realism | 23-product-consistency-guard |
| 6 | **Culture** (Gulf modesty + taste) | 9 | conversion | 21-cultural-expert-gulf |
| 7 | **Arabic** (copy + typography) | 7 | conversion | 20-arabic-copywriter, 37-typography-compositor |
| 8 | **Cinematography** (frame craft) | 8 | craft | 11/12/13 camera+lighting directors |
| 9 | **Motion / Continuity** | 7 | craft | 14-motion, 15-transition, 23-product-guard |
| 10 | **Cost discipline** | 5 | cost | 29-cost-optimizer, 31-format-router |

> **Static assets** (image ad, banner, 3D still, LP still): axis 9 Motion is
> `N/A`; redistribute its 7 points pro-rata across the other nine. Axis 8
> Cinematography is re-read as *still composition* (focal hierarchy, negative
> space for overlay, lens/DoF believability).

---

## 2. SCORING SCALE (anchors, applied identically to every axis)

Score each axis **0–100**. Use these anchors, not vibes:

- **100** — Indistinguishable from a professionally produced real reference; no
  reviewer note survives.
- **95** — Ship-grade. Zero blocking defect; at most cosmetic nitpicks that do
  not read on a phone at scroll speed.
- **90** — Floor. Acceptable but with one noted soft weakness; below this the
  axis **blocks the whole set** regardless of total.
- **80** — One clearly visible flaw a normal viewer would catch. Never ships.
- **≤ 60** — Structural failure (tell-tale AI artifact, wrong label, off-brand
  color, mistranslation, immodest frame). Hard reject.

**Evidence rule (Bible §2 rigor):** every axis score must cite *specific frame
regions / prompt clauses / lock lines*, never a bare number. "Realism 92: forearm
skin pores present, ring-finger knuckle at 0:04 slightly waxy → -8" is valid.
"Realism 92, looks good" is not, and is rejected by `28-scoring-engine`.

---

## 3. THE AXES IN DETAIL

Each axis below gives: **what it measures · 90/95/100 anchor · top failure modes ·
auto-improve routing** (which skill fixes a miss, per §6).

### AXIS 1 — REALISM (weight 15)
**Measures:** photoreal craft of everything on screen — skin (pores, translucency,
peach-fuzz), hands/fingers (count, knuckles, nails), eyes (catchlight, no dead
stare), hair (individual strands, realistic fall & flyaways per `hair-oil-realism`),
the **garnet oil** (translucent jewel-red, correct viscosity, real caustics), the
**PET glass** (refraction, edge highlights, no plastic-CGI sheen), and light
(motivated, soft directional window light per Bible §4 hero DNA).
- **100:** passes as a filmed beauty commercial; oil pour has real surface tension.
- **95:** photoreal throughout; only a micro-nitpick under freeze-frame.
- **90:** one soft region (e.g. slightly plastic cap highlight) noted, not blocking.
- **Top misses:** waxy/airbrushed skin; six fingers or fused knuckles; opaque or
  orange oil; CGI-glass sheen; hair as a helmet-blob; flat unmotivated light.
- **Fix routing:** → 16 (hair) / 17 (human) / 18 (environment) / 19 (oil+glass)
  realism directors + 13 lighting; add specific artifact to 24 negatives.

### AXIS 2 — UNDETECTABILITY (weight 13)
**Measures:** the anti-AI **forensic** pass from `undetectable-realism-doctrine`.
Distinct from Realism: an image can be "pretty" yet scream AI. Checks for the
tell-tales that make viewers comment *"this is AI"*: over-smooth denoised texture,
plastic bokeh, warping in the background/hands, impossible reflections, morphing
text, too-perfect symmetry, uncanny gaze, physics-defying hair or fabric,
temporal flicker/melting across frames (video), and telltale generator "smell."
- **100:** would survive a skeptical Reels comment section and a forensic zoom.
- **95:** no tell-tale at scroll speed; nothing a lay viewer flags.
- **90:** one subtle tell under deliberate inspection (e.g. faint edge warp).
- **Top misses:** morphing background objects; hallucinated jewelry/patterns;
  fabric that melts; symmetric "AI face"; over-clean skin with no micro-noise.
- **Fix routing:** → 17 human-realism + 24 negative-prompt-builder (add the exact
  tell to the negative list) + micro-grain/imperfection injection in 25-optimizer.

### AXIS 3 — CONVERSION / HOOK (weight 14)
**Measures:** commercial performance potential — **Scroll-Stop (0–1.5s) → Hook
(0–3s) → Hold → CTR → CVR → ROAS**. Does the first frame stop the thumb? Does the
0–3s land the pain (strand falling with every comb stroke, Bible §6)? Is the
emotional spine (Pain→Heritage→Ritual→Transformation→Pride→Action) intact and the
COD offer (139 SAR, was 185, −25%, free shipping, inspect-before-pay) legible and
CTA present? Scored against `meta/tiktok/snapchat-ads-playbook` + `28-scoring-engine`.
- **100:** predicted top-decile thumb-stop; hook + payoff + offer all land.
- **95:** strong, unambiguous hook; clear single CTA; offer legible sound-off.
- **90:** hook works but soft opening frame OR CTA slightly buried.
- **Top misses:** slow/ambiguous first frame; buried or multiple CTAs; benefit
  not shown by second 3; offer illegible muted; claim exceeds the LP (Bible §3).
- **Fix routing:** → 06 hook-generator (re-open) / 03 strategist (offer clarity) /
  32 image-ad-director (reserve overlay zone) / 37 typography (CTA legibility).

### AXIS 4 — BRAND CONSISTENCY (weight 8)
**Measures:** adherence to brand visual DNA — palette (garnet `#8E1B1E`, deep
garnet `#6E1214`, cream `#FAF6F1`, gold `#C9A227`, sage `#4A6741`, brown ink
`#2A1A16`), Moroccan-heritage-meets-Gulf mood, El Messiri (display) / Tajawal
(body) type system, and hero-set DNA (mihrab arch, garnet drape, hibiscus, palm
frond, travertine podium). PRODUCT-AGNOSTIC: read these tokens from the ACTIVE
`products/<slug>/product-lock.yaml` + brand block, never hardcode mechat values.
- **100:** every color/type/prop on-palette and on-mood; looks like one campaign.
- **95:** on-brand; at most one secondary prop slightly off-tone.
- **90:** palette mostly held but one off-brand color creeps in (blocking-adjacent).
- **Top misses:** off-palette CTA color; wrong display font; mood drift (cold/
  clinical instead of warm-luxe); random props breaking the heritage world.
- **Fix routing:** → 22 brand-guardian (palette/type/mood correction) + 25-optimizer.

### AXIS 5 — PRODUCT FIDELITY (weight 14) — THE #1 STRUCTURAL CONSTRAINT
**Measures:** exact reproduction of the REAL product per V2 §7bis — the product
region is **reference-conditioned (routes R1/R2/R3), never text-to-image**. Scored
against the active `products/<slug>/fidelity-checklist.md`: vessel shape &
proportions, **matte-white ribbed cap** (never gold/black), **translucent garnet
oil** (never orange/brown/pink/opaque), **label** layout/wording/red top band/gold
"100% Natural" seal, and — critically — **the Arabic on the label is not
model-generated** (composite the real flat label or preserve via edit; ad copy is
post-overlay via 37). Any label drift, cap-color change, or liquid-color shift is
an automatic sub-90.
- **100:** pixel-faithful to references; label element-for-element correct.
- **95:** product region reference-locked, proportions & color exact; only scene
  relight differs from source (expected under R1).
- **90:** faithful but one non-label micro-deviation (e.g. reflection slightly off).
- **Top misses (all BLOCK):** redrawn/hallucinated label; wrong cap color; oil
  shifted to orange/brown; wrong proportions (tall cylinder vs squarish body);
  invented English brand name; text-to-image of the bottle instead of R1/R2/R3.
- **Fix routing:** → 23 product-consistency-guard (re-lock route) + 31 format-router
  (switch to reference-capable model) + 34 for 3D; if label drift, force
  composite-real-label or R2 inpaint. NEVER "prompt harder" to fix a label.

### AXIS 6 — CULTURE (weight 9)
**Measures:** Gulf-first cultural fit per `gulf-beauty-brand-norms` +
`gulf-culture/`. Modest, elegant, aspirational; hair as luxurious hero shown with
restraint; refined natural "no-makeup" model, calm confidence, never provocative;
wardrobe in cream/garnet/gold modest drape; premium warm interiors with heritage
cues. Enforces the anti-stereotype norms (no orientalist clichés, no fear-mongering
about the body, no religious imagery as decoration, no alcohol cues). Hijab/styled
A/B pair availability is checked here.
- **100:** reads as made-in-region premium; a Riyadh viewer sees taste, not cliché.
- **95:** modest, tasteful, on-culture; no misstep.
- **90:** acceptable but one borderline frame (e.g. slightly bare shoulder) noted.
- **Top misses:** immodesty; provocative posing; orientalist stereotype; body
  fear-mongering; decorative religious motifs; wardrobe/skin-tone stereotype.
- **Fix routing:** → 21 cultural-expert-gulf (re-frame wardrobe/pose/interior) +
  22 brand-guardian; add offending element to 24 negatives.

### AXIS 7 — ARABIC (weight 7)
**Measures:** correctness and premium feel of Arabic copy AND its typographic
render. Copy: elegant MSA (فصحى, *fuṣḥā* = standard Arabic) that reads premium
pan-Gulf; a Khaleeji spoken VO variant offered for TikTok/Snap; no Darija/Egyptian
slang in the Saudi primary cut; **no machine-translation smell, ever**; every line
carries transliteration + English gloss on first use (Bible §2). Typography (37):
RTL correct, proper letter-joining/shaping, El Messiri display, safe margins, LTR
price/number handling (139 SAR), high contrast/legibility. **Arabic is never
generated in-model** — it is added in post; in-model Arabic (garbled glyphs) is an
automatic sub-90 here AND on axis 5 if on the label.
- **100:** copy is elegant native-grade; typesetting flawless RTL, fully legible.
- **95:** correct MSA, correct shaping, legible sound-off.
- **90:** correct but one slightly stiff line or tight margin.
- **Top misses:** mistranslation; slang in Saudi cut; broken RTL/disjointed
  letters; illegible muted; **model-rendered Arabic glyphs** (must be post).
- **Fix routing:** → 20 arabic-copywriter (rewrite) + 37 typography-compositor
  (re-typeset). If glyphs were sent to the model, route back to text-in-post.

### AXIS 8 — CINEMATOGRAPHY (weight 8)
**Measures:** frame craft — lens choice & believable depth-of-field, composition
(rule-of-thirds / centered product with intent), motivated lighting recipe
(`lighting-recipes`), color grade (warm garnet-and-cream per `color-grading`),
camera language (`camera-movements`), exposure and contrast. For STATIC assets:
read as still composition + focal hierarchy + reserved negative space for the
headline/CTA overlay zone (32/33).
- **100:** a cinematographer would approve the frame as-shot.
- **95:** strong composition, motivated light, correct grade.
- **90:** competent but one soft choice (flat lighting or muddy grade).
- **Top misses:** unmotivated/flat light; wrong DoF (everything sharp = video-game
  look); off grade (cool/clinical); dead-center product with no overlay room.
- **Fix routing:** → 11 cinematography / 12 camera / 13 lighting; grade to
  color-grading recipe; for statics, 32/33 re-block negative space.

### AXIS 9 — MOTION / CONTINUITY (weight 7) — video & loops only
**Measures:** believable motion physics and cross-frame continuity — hair fall &
oil-pour physics, natural human micro-motion (blink/breath, no robotic loop),
camera-move smoothness, transition craft (15), and **product identity stability
across every frame** (the bottle must not morph frame-to-frame — jointly owned
with axis 5). For LP microvideo (36): seamless first/last-frame loop match, no
visible seam, 3–5s.
- **100:** motion indistinguishable from filmed; product rock-steady across cut.
- **95:** smooth, physical motion; no morph; clean transitions.
- **90:** motion good but one slightly stiff beat or minor loop seam.
- **Top misses:** temporal flicker/melting; product morph across frames; robotic
  loop; physics-defying hair/fabric; visible loop seam on LP microvideo.
- **Fix routing:** → 14 motion-director / 15 transition-designer + 23 product-guard
  (identity lock); for loops, 36 microvideo-director (re-match end frames).

### AXIS 10 — COST DISCIPLINE (weight 5)
**Measures:** did we honor the credit engine BEFORE proposing spend (V2 §5)? Is the
route the cheapest that meets quality — image-first, one-master-many-exports,
text-in-post, draft→final gating, reference+seed lock, batch shared scenes, short
loopable microvideo, upscale-don't-regenerate? Is there a per-asset credit estimate
+ a cheaper fallback route, and is the total within the approved matrix budget
(30)? This axis scores the *plan's economy*, not the art.
- **100:** provably minimal-credit route; every V2 §5 policy applied; fallback named.
- **95:** efficient route; image-first + text-in-post + one-master honored.
- **90:** reasonable but one policy skipped (e.g. no seed lock → reroll risk).
- **Top misses:** direct text-to-video of product (violates R1/R2/R3 AND wastes
  credits on rerolls); per-size banner re-generation; iterating at final tier;
  no budget/fallback surfaced before spend.
- **Fix routing:** → 31 format-router (cheaper route) + 29 cost-optimizer +
  30 planner (rebudget). A cost miss NEVER justifies shipping a realism miss.

---

## 4. SCORING PROCEDURE (how `27`/`28` run the gate)

1. **Freeze inputs.** Collect the compiled prompt (26), the reference/route (31),
   the active `product-lock.yaml` + `fidelity-checklist.md`, brand tokens, and the
   platform target. Nothing is scored in the abstract.
2. **Score all ten axes 0–100** using §2 anchors and §3 detail, each with cited
   evidence. Static assets mark axis 9 `N/A` and redistribute (see §1).
3. **Compute weighted total** = Σ(axis × weight) / 100.
4. **Apply the gate** (§0): ship iff total ≥ 95 **and** every axis ≥ 90.
5. **If BLOCKED:** identify each failing element, route it to the owning skill
   (§3 / §6), regenerate the AFFECTED artifact (not the whole pipeline), and
   **re-score from step 2**. This loop costs $0 — it is pure Claude reasoning
   (`model_cost: none`); no model is called until the gate is green.
6. **Loop cap.** `studio.config.yaml` bounds the auto-improve loop
   (`max_improve_loops`). If still sub-threshold after the cap →
   `halt_for_human_review`. **Never** generate a sub-threshold prompt to "see how
   it looks" — that is the exact spend the gate exists to prevent.
7. **On PASS:** emit the scorecard (§5), then authorize the *first and ideally
   only* generation. For draft→final assets, the ≥95 gate is what unlocks the ONE
   final-tier render / upscale (V2 §5 policy 5).

---

## 5. SCORECARD FORMAT (the artifact every scored asset produces)

```yaml
asset_id: hero-video-ad--unbroken-thread--meta-9x16
product: mechat-red-oil            # active products/<slug>, never hardcoded
route: R3                          # image→video from approved keyframe (V2 §7bis)
scores:                            # 0–100 each, with one-line cited evidence
  realism:            96   # skin pores + real oil caustics; glass refraction correct
  undetectability:    95   # no tell-tale at scroll; faint bg soft-focus only under zoom
  conversion_hook:    97   # comb-stroke pain hook lands <2s; single COD CTA legible muted
  brand:              98   # garnet #8E1B1E CTA, El Messiri display, mihrab hero DNA
  product_fidelity:   99   # label composited from real asset; cap matte-white; oil garnet
  culture:            96   # modest over-shoulder reveal; warm heritage interior; no cliché
  arabic:             97   # elegant MSA VO + El Messiri overlay; RTL shaping clean (post)
  cinematography:     95   # motivated window light; warm grade; product framed w/ overlay room
  motion_continuity:  95   # oil-pour physics real; bottle identity stable across the move
  cost:               96   # image-first + text-in-post + seed lock; fallback veo3-fast named
weighted_total: 96.4
min_axis: 95
gate: SHIP                         # total>=95 AND min_axis>=90
notes:
  - "One video generation authorized (single hero, V2 §5 policy 2)."
blocking_defects: []               # populated + routed on any BLOCK
```

**Worked block example (what a rejection looks like):**
`product_fidelity: 84 → label wording redrawn by model (route was text-to-image,
V2 §7bis violation). GATE: BLOCK (min_axis<90). Route → 23 product-guard + 31
format-router: switch to R2 reference-edit (Flux Kontext) OR composite the real
flat label; re-score. No spend authorized.`

---

## 6. AUTO-IMPROVE ROUTING TABLE (deficit → owning skill)

| Failing axis | Symptom | Route the fix to | Then |
|--------------|---------|------------------|------|
| Realism | waxy skin / fake oil / CGI glass | 16/17/18/19 + 13 | re-score |
| Undetectability | AI tell-tale / warping | 17 + 24 (add negative) + 25 | re-score |
| Conversion/Hook | slow open / buried CTA | 06 / 03 / 32 / 37 | re-score |
| Brand | off-palette / wrong font/mood | 22 + 25 | re-score |
| Product fidelity | label drift / cap/oil color | 23 + 31 (R1/R2/R3) / 34 | re-score |
| Culture | immodest / cliché / stereotype | 21 + 22 + 24 | re-score |
| Arabic | mistranslation / in-model glyphs | 20 + 37 (→ text-in-post) | re-score |
| Cinematography | flat light / wrong grade / no overlay room | 11/12/13 / 32/33 | re-score |
| Motion/Continuity | flicker / morph / loop seam | 14 / 15 / 23 / 36 | re-score |
| Cost | wasteful route / per-size regen | 31 + 29 + 30 | re-score |

**Golden rule of routing:** fix the *cause*, regenerate the *affected artifact
only*, re-score the *whole* rubric (a fix on one axis can regress another — e.g.
adding grain for undetectability can soften realism). Ship only when the full gate
is green again.

---

## 7. NON-NEGOTIABLE HARD STOPS (auto-BLOCK regardless of total)

These are instant sub-90 on their axis and therefore always block the set:
1. **Product redrawn by text-to-image** (any product-bearing asset must be R1/R2/R3).
2. **Label wording/layout/seal altered**, cap color changed, or **oil color shifted**
   off garnet.
3. **Model-rendered Arabic glyphs** on label or overlay (Arabic is post-only).
4. **Immodest / provocative / stereotyped** framing, or any hard-medical / claim
   exceeding the LP (Bible §3).
5. **Visible AI tell-tale** a lay viewer would flag (six fingers, morphing bg,
   melting fabric).
6. **Off-brand CTA color** or wrong display font on the primary cut.
7. **No credit budget + fallback surfaced** before a final-tier spend (V2 §5 #10).

Any hard stop → route per §6, regenerate the affected artifact, re-score. The gate
holds the line so the studio spends credits on *finished, real, converting* work —
never on attempts.

---

## 8. HANDOFF

- **Green gate →** `26-kie-prompt-builder` / `31-format-router` release exactly ONE
  generation (or the ONE final render / upscale for draft→final assets). The
  scorecard (§5) is attached to the run and written to `memory/` as a creative
  prior.
- **Blocked gate →** deficits + routing (§6) go back to the owning skills; the
  loop repeats at `$0` until green or until the loop cap triggers
  `halt_for_human_review`.
- **Cross-refs:** weights + gate logic ← here; axis list + thresholds ↔
  `config/studio.config.yaml` `quality`; forensic checks ←
  `knowledge/undetectable-realism-doctrine.md`; fidelity items ←
  active `products/<slug>/fidelity-checklist.md`; culture norms ←
  `knowledge/gulf-beauty-brand-norms.md`; credit policy ←
  `knowledge/kie-credit-optimization.md` + V2 §5.
