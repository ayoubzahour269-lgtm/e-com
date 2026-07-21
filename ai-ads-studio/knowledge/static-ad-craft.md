# Static Ad Craft — Scroll-Stopping Image Ads for Gulf Beauty

> Reference knowledge for the `image-ad`, `banner`, and `lp-hero-image` families of
> the v2 creative matrix. Consumed primarily by **32-image-ad-director**,
> **33-banner-systems-designer**, **37-typography-compositor**, and **38-upscale-finisher**;
> read alongside `knowledge/gulf-beauty-brand-norms.md` (market truth) and the active
> `products/<slug>/product-lock.yaml` (fidelity truth). When this doc and the
> gulf-beauty-brand-norms doc appear to disagree, **the norms doc wins** — it encodes
> the anti-stereotype market policy; this doc only says how to *compose* within it.
>
> Everything here obeys three inherited laws:
> 1. **The product is reference-conditioned (routes R1/R2/R3), never text-to-image.**
>    A static ad is composited: real packshot in, AI world around it.
> 2. **Arabic headline / CTA / price are added in POST** by 37-typography-compositor,
>    never generated inside the image model. Reserve the space; do not draw the words.
> 3. **One master → many exports.** Design one high-res master per concept; all ratios
>    (1:1, 4:5, 9:16, 1.91:1) are crop/recompose, not new generations.

---

## 0. What a static ad has to do in ~0.4 seconds

A feed static gets less time than a video — there is no motion to earn the second
second. The entire job is compressed into the **thumb-stop**: the instant a thumb is
already moving and the eye decides *stop* or *scroll*. Everything below is in service
of winning that instant, then converting the 1–2 seconds of attention it buys.

The stop is won by **one dominant idea, one focal point, high figure-ground contrast,
and a color the feed is not already full of.** The conversion is won by a legible
benefit and a frictionless COD offer. A beautiful ad that says four things says
nothing; a plain ad that says one thing loudly outperforms it.

**The five-part anatomy of a converting Gulf beauty static:**

1. **Focal hero** — the product, the oil, the hair texture, or a single ingredient,
   given ~55–70% of visual weight and placed off-center on a strong node.
2. **Thumb-stop trigger** — the pattern interrupt: warm garnet against a cool feed,
   an oil drop mid-fall, an extreme macro no one expects, a bold single word.
3. **Benefit clarity** — one Arabic headline the eye lands on second, carrying the
   promise (stops shedding / density & length / grandmothers' secret).
4. **Trust + offer** — price, "-25%", free shipping, COD, 4.8★ — small, lower, but
   present. This is a direct-response ad, not a brand poster.
5. **Reserved overlay zones** — clean, low-detail negative space where the post-stage
   typography will live without fighting the imagery.

If any one of these is missing the ad underperforms. If two compete for the same
weight, the ad reads as noise and gets scrolled.

---

## 1. Composition systems

### 1.1 Grid & focal placement
- **Rule of thirds is the floor, not the ceiling.** Place the hero on a thirds
  intersection (a "power node"), never dead-center for a feed static — center is
  static and reads as a stock photo. Center placement is reserved for a deliberate
  *symmetry* layout (§1.4) or a 1:1 packshot where the bottle is the entire idea.
- **Golden-ratio spiral** for hero + ingredient scatter: let the eye enter at the
  widest arc (the benefit word), spiral inward to the bottle, land on the CTA — a
  natural read path that ends on the action.
- **Single clear focal point.** Blur, darken, or desaturate everything that is not the
  hero. Competing sharp regions split attention and kill the stop. Use depth of field
  (real bokeh — see undetectable-realism-doctrine) to force the hierarchy optically,
  not just with layout.

### 1.2 The Z / F reading path (with RTL correction)
- Latin feeds scan in a **Z** (top-left → top-right → diagonal → bottom-right). Arabic
  is **RTL**, so the natural entry is **top-RIGHT**, sweeping to top-left, then down.
  **Flip the Z for Arabic layouts.** Anchor the headline top-right, the CTA
  bottom-left/bottom-center, the offer badge bottom-right.
- Because the same master exports to a mixed (Arabic overlay) and occasionally a
  Latin-numeral price, keep the *imagery* focal on the right-of-center third so the
  RTL text block on the right reads first and flows into the product.
- Never split a face/hair and a headline across the fold seam of a 4:5 vs 9:16 crop —
  design the safe center column so both crops keep hero + headline together.

### 1.3 Visual weight & balance
- Weight is driven by **size, contrast, saturation, isolation, and human/eye cues**
  (in that rough order). A small high-contrast garnet drop can out-weigh a large soft
  beige background. Budget weight deliberately: hero ~60%, benefit text ~20%,
  offer/trust ~10%, breathing room ~10%.
- **Asymmetric balance beats symmetry** for feed energy: heavy hero on one third
  balanced by a light headline block + small ingredient accent on the other. It reads
  as designed and modern, not staged and cheap.

### 1.4 Layout archetypes (align with 32-image-ad-director's three archetypes)
1. **Product-hero** — bottle dominant, hero set behind (warm arch, garnet drape,
   hibiscus, palm frond, stone podium per the product-lock environment DNA), single
   headline, offer badge. Best for retargeting & conversion; the buyer already knows
   the product.
2. **Benefit-demonstration** — the ritual/result is hero (hands parting an oiled
   section, oil sheen on a dark healthy section, back-of-head shine), bottle as an
   inset/lower-third lockup. Best for cold prospecting; sells the feeling first.
3. **Social-proof** — a review card / 4.8★ / "أكثر من ١٠٠٠ عميلة" motif composited
   next to the product, benefit headline above. Best for consideration & warm
   audiences who need the trust nudge.

Each archetype ships with an **overlay-zone map** (§5) so the compositor knows exactly
where text may land.

### 1.5 Cropping discipline (one master → many ratios)
- Shoot/generate the master at **4:5 or larger with generous margins** so the 1:1,
  9:16 story, and 1.91:1 IAB crops all fall inside without re-generating.
- Keep the hero and the primary headline inside a **center-safe column** (~68% width)
  and a **center-safe band** that survives both the tall (9:16) and square (1:1) crop.
- Ingredient scatter and atmospheric detail live in the **crop-sacrifice margins** —
  the parts that get cut on the tighter ratios. Nothing load-bearing goes there.

---

## 2. Color — the Gulf beauty / hair-oil palette

Color is the single strongest thumb-stop lever because a feed has an ambient color
temperature and the eye stops on the exception. The Gulf beauty feed is crowded with
cool clinical whites, millennial pinks, and gold-on-black luxury. **Warm garnet /
amber / terracotta is our exception color — and it is also the real color of the oil.**
Use it; do not fight it (per gulf-beauty-brand-norms §3).

### 2.1 Brand palette (from the product-lock tokens — load the active lock, don't hardcode)
For the flagship مشاط red oil the tokens are:
- **Garnet red `#8E1B1E`** — brand / CTA / the thumb-stop hero color.
- **Deep garnet `#6E1214`** — shadow side of garnet, CTA pressed state, depth.
- **Warm cream `#FAF6F1`** — dominant background, negative space, breathing room.
- **Surface white `#FFFFFF`** — label field, clean plates for review cards.
- **Dark warm-brown ink `#2A1A16`** — Arabic body text, maximum legibility on cream.
- **Soft brown `#6B564E`** — secondary text, captions, dividers.
- **Gold `#C9A227`** — the 100% Natural seal, premium accents, price emphasis. Use
  sparingly; gold everywhere reads cheap-luxe.
- **Sage green `#4A6741`** — herbal/natural cue, ingredient accents, "natural" tags.

> For any other product, read `products/<slug>/product-lock.yaml` → `palette` and
> substitute. The *system* (one warm hero color, cream ground, dark ink, one metal
> accent) is portable; the hexes are per-product.

### 2.2 The 60-30-10 rule (applied)
- **60% warm cream** ground — the calm field that lets the hero pop and gives the
  compositor clean overlay real estate.
- **30% garnet / amber** — the oil, the drape, the label band, the hero mass.
- **10% gold + sage accents** — seal, price highlight, ingredient tags. Never let the
  accent metal exceed ~10% or the ad loses its premium restraint.

### 2.3 Contrast for the stop and for legibility
- **Figure-ground contrast** wins the stop: a garnet bottle on cream, or an oil-slick
  dark section of hair against a bright warm rim light. Aim for a clear luminance step
  between hero and ground, not a same-value blend.
- **Text contrast is a legal floor, not a preference.** On-image Arabic must hit
  **≥ 4.5:1** contrast against whatever pixels sit behind it (WCAG AA body). Dark ink
  `#2A1A16` on cream easily clears it; garnet-on-cream is borderline for small text —
  reserve garnet type for large display only, or place it on a cream plate.
- Never set light text on a busy mid-tone photo without a **scrim** (a soft gradient or
  a semi-opaque plate) behind it. The scrim is a compositor job — but the image
  director must *leave a low-detail zone* for it (§5).

### 2.4 Warmth, mood, and the anti-clinical rule
- Grade toward **warm amber**: golden-hour practical light, long gentle shadows, a
  faint warm bloom on highlights. This matches the oil, the heritage register, and the
  home/majlis setting the norms doc mandates.
- **Avoid cold studio-white / blue clinical** looks — they read as a *different,
  cheaper pharmacy category* to a Saudi-national viewer (norms §1, §3). No lab-coat,
  no blue-white cyclorama, no CGI-clean sterility.
- Skin tones stay **warm and natural** — never orange, never waxy-plastic. If a hand
  or over-the-shoulder appears, honor human micro-realism (44) even in a static.

### 2.5 Color as pattern-interrupt
- Scout the target feed's ambient temperature and **counter-program**: if the beauty
  feed is pink/white, garnet stops harder; if a competitor set is all garnet, a single
  gold-on-deep-garnet packshot with heavy negative space stops harder. The stop is
  relative to the surrounding feed, not absolute.

---

## 3. Negative space & breathing room

Negative space is not empty — it is the **luxury signal, the focal amplifier, and the
compositor's canvas.** Cheap ads are cluttered corner-to-corner; premium ads let one
thing breathe.

- **Give the hero room.** ~10–15% margin of quiet cream around the product so it reads
  as considered, not crammed. Crowding the frame edge reads as a discount flyer.
- **Reserve deliberate overlay negative space** (§5) — a low-detail region sized for
  the Arabic headline and the CTA. This is a *composition constraint the image prompt
  must honor*: e.g. "upper-right third kept as soft out-of-focus cream drape, no
  detail, for text." Design the emptiness on purpose.
- **Active vs passive negative space:** passive = the calm ground; active = a shape the
  eye reads (the silhouette gap between a hand and a falling strand, the arch's
  interior). Use active negative space to point at the hero.
- **The one-message discipline:** if you feel the urge to fill the space with a second
  benefit, a second product, or a texture, resist. Negative space *is* the message that
  this is a premium, confident brand.

---

## 4. Focal hierarchy & the thumb-stop trigger

### 4.1 Building a three-level hierarchy
Every static resolves to three tiers the eye hits in order:
1. **Primary (the stop):** the hero + its thumb-stop trigger. Highest contrast, largest
   mass, sharpest focus, on a power node. ~0.4 s.
2. **Secondary (the promise):** the Arabic benefit headline. Second-highest contrast,
   large display type in a reserved zone. ~0.8 s.
3. **Tertiary (the close):** offer badge, price, COD, star rating, CTA. Small, lower,
   but unambiguous. ~1.5 s if they stay.

If the eye can't rank these instantly, the hierarchy is broken. Squint-test: blur your
vision — the three tiers should still separate by mass and contrast alone.

### 4.2 Thumb-stop trigger catalog (Gulf hair-oil specific)
- **The oil drop mid-fall** — a single translucent garnet drop suspended above a
  glossy surface, warm highlight caught in it. Reads as motion frozen; the eye wants to
  see it land. Extremely strong for cold feed.
- **Extreme macro** — oil sheen tracing down a section of dark healthy hair; a single
  hibiscus petal on cream; walnut-husk / henna texture in tactile close-up. Macro is a
  pattern interrupt because feeds are mostly mid-shots.
- **The ritual gesture** — hands parting an oiled section, fingertips at the scalp, a
  braid being wrapped (hands + hair + back-of-head, per norms §2 — never a
  face-forward glamour reveal for the KSA default).
- **The pour** — a garnet ribbon leaving the bottle, mid-air, gold rim-lit. Product +
  motion + color in one frame.
- **The bold single word** — for a text-forward variant, one large Arabic word
  («توقّفي» / «جذور» / «كثافة») as the entire stop, product small. Compositor-owned;
  the image is just a warm ground.
- **The heritage still-life** — bottle + whole herbs + brass + warm arch light,
  composed like a painting. Stops the aspiration-layer (Instagram) audience.

### 4.3 Directing the eye
- **Leading lines:** the pour, a hair section, the arch curve, a shadow — all should
  point *toward* the hero and ultimately the CTA, never off-frame.
- **Focus & DOF:** throw the background soft; keep only the hero and the ingredient
  accent sharp. Optical hierarchy is more convincing (and more "filmed, not AI") than
  layout hierarchy alone.
- **Human gaze cue (when a person appears):** even a back-of-head or an over-the-
  shoulder implies a direction — orient it so the implied gaze/turn leads into the
  headline or product, not out of the frame.

---

## 5. Overlay zones — where the Arabic text goes (the compositor contract)

This is the interface between the image director and **37-typography-compositor**. The
image model never draws the words; it **reserves the room.** Every image prompt emits,
and every master ships with, an **overlay-zone map**: named rectangles with position,
size, and the imagery rule for that zone.

### 5.1 Standard zone map (9:16 master, RTL)
| Zone | Location | Holds | Imagery rule for the zone |
|------|----------|-------|---------------------------|
| **HEADLINE** | top-right third, below the ~14% top safe margin | 1-line benefit hook, El Messiri display | keep low-detail: soft cream drape / out-of-focus ground; no busy texture, no faces |
| **SUBHEAD** | directly under headline | optional support line, Tajawal | same low-detail continuation |
| **PRODUCT-LOCKUP** | center / lower-center | the real packshot (reference-conditioned) | sharpest region; hero lighting; do NOT overlay text here |
| **OFFER-BADGE** | lower-right | price «139 ﷼», «-25%», «شحن مجاني» | reserve a small clean plate area; gold/garnet accent ok |
| **CTA** | bottom band, above the ~20% bottom UI safe margin | «اطلبي الآن — الدفع عند الاستلام» | keep a calm horizontal band; the compositor adds the button plate |
| **TRUST** | bottom-left corner | 4.8★, verified, COD icon | small, low-detail corner |

### 5.2 Safe margins (per Bible §5 + platforms)
- **Top ~14%** and **bottom ~20%** are UI-reserved on 9:16 (profile, caption, CTA
  sticker, engagement rail). Nothing load-bearing there.
- **1:1 and 4:5** feed statics: keep ~8% edge margin all around; the CTA button and
  price stay inside the safe center for both crops.
- **Story/Reels (9:16):** the bottom CTA sticker zone overlaps our CTA band — decide
  whether the platform sticker or the burned-in CTA carries it, never both stacked.

### 5.3 Legibility rules the compositor enforces (director must enable)
- **Reserve a scrim-able zone:** any text zone over photography must be a region the
  director kept soft/dark/low-detail so a subtle gradient scrim keeps text ≥ 4.5:1
  without an ugly hard box.
- **No text on the label / on the bottle face** — the product's own Arabic is part of
  the locked identity; overlay type must never collide with or duplicate it.
- **RTL & numerals:** Arabic body is RTL; prices/percentages are LTR digits — the
  compositor handles the bidi; the director just leaves an unambiguous horizontal slot
  for the price so digits don't wrap.
- **One display face, one text face:** El Messiri (display/headline), Tajawal (body).
  Never drop a generic Latin sans into Arabic (norms §3). Max two type sizes per ad.

### 5.4 Why text-in-post, always (the credit + fidelity reason)
Image models render Arabic as **gibberish or subtly wrong glyphs** — the #1 cause of
image discards and regenerations (V2 §5.3, kie-models "Arabic-text ability: mostly
poor"). Overlaying in post **guarantees correct, elegant MSA**, keeps kerning/RTL
perfect, and means one master serves every headline A/B variant with **zero extra
generations.** The image prompt must therefore explicitly say *"no text, no lettering,
no logotype, no watermark in frame"* and reserve the zones instead.

---

## 6. Platform & placement craft (feed-specific)

Match the static to where it lives (norms §5, Bible §5):
- **Instagram / Meta feed (1:1, 4:5):** the aspiration layer. Polished, painterly
  heritage still-life or clean product-hero; generous negative space; refined type.
  4:5 gets more vertical real estate than 1:1 — prefer it for feed reach.
- **Instagram / Snap / Reels story (9:16):** full-bleed, single dominant hero, one
  short headline, fast offer. Respect top/bottom UI safe zones hard.
- **Snapchat (9:16):** highest young-beauty engagement in KSA. Punchy, high-contrast,
  benefit-forward; the stop must land in <1.5 s; brand + offer legible in the top and
  bottom thirds.
- **TikTok static/carousel:** native, less "polished-ad" — a benefit-demonstration or
  ritual macro reads more authentic than a glossy packshot here.
- **Retargeting banners (IAB sizes via 33):** offer-led, product-hero, price + CTA
  dominant; the buyer is warm, so lead with «-25% · شحن مجاني · الدفع عند الاستلام».

**One master, right ratios:** design the 4:5 master; export 1:1 (feed), 9:16 (story),
1.91:1 (IAB leaderboard/rectangle) by recompose — never regenerate per placement.

---

## 7. Carousel & multi-frame statics

When a concept needs a sequence (Meta/IG carousel, TikTok photo mode):
- **Frame 1 is a single ad** — it must win the stop alone; assume 60%+ never swipe.
- **Frame arc:** (1) pain/hook hero → (2) heritage/ingredient proof → (3) the ritual →
  (4) the transformation cue → (5) offer + CTA. Mirrors the video emotional spine
  (Pain → Trust → Ritual → Transformation → Action) in stills.
- **Consistency system:** shared palette, one type system, a fixed footer lockup
  (small bottle + logo) on every frame so the brand persists as the buyer swipes.
- **Reference + seed lock** across frames so the bottle is pixel-identical every frame
  (V2 §5.6) — again: composite the real packshot, don't re-draw it.

---

## 8. Anti-stereotype & modesty in a still (defer to gulf-beauty-brand-norms)

A static freezes one frame, so a bad framing choice is *more* exposed than in video —
there's no motion to soften it. Apply the norms doc strictly:
- **Default: hands + hair + back-of-head, no face** — owned as the house aesthetic, not
  an apologetic crop. Shoot it with full beauty-hero lighting.
- **No imported South-Asian glamour-face / loose-hair staging** (reads expat/cheap).
- **No desert / camel / tent / souk** orientalist backdrops. Heritage = home, family,
  ritual, warm interior — the majlis/vanity, not landscape tourism.
- **Hijab, if shown, is a confident styled beauty element**, well-lit — never a
  blurred/awkward modesty patch.
- **No fear-mongering, no fake medical/before-after "results-on-a-face."** Sell the
  ritual and the feeling; show length/shine as a detail (ends in a hand, shine on a
  back-of-head), not a turn-to-camera reveal.
- A **separate UAE-facing variant** may use a fuller face/uncovered hair — never the
  KSA default, and only when explicitly requested.

---

## 9. Realism in a static (defer to undetectable-realism-doctrine)

A still has no temporal tells, so the burden falls entirely on **optical and material
realism** — and a frozen frame is *scrutinized longer* than a video frame:
- **Real optics:** shallow DOF with believable bokeh, subtle sensor grain, filmic
  highlight roll-off, faint vignette and chromatic aberration. Clinical digital
  perfection is the tell.
- **Real materials:** correct glass refraction and caustics through the bottle,
  translucent (not opaque) garnet oil with warm internal highlights, matte-plastic cap
  micro-roughness, real contact shadows and grounded reflections. No floating product,
  no fake detached shadow.
- **Real skin (if present):** pores, peach fuzz, subsurface warmth, correct finger
  count and nails — never waxy/plastic (skill 44).
- **The right imperfections:** a stray flyaway hair, a slight oil smudge, a dust mote in
  the light, asymmetry. Perfect = fake; imperfect = filmed. Pass through **46-ai-tell-
  detector** and **41-product-fidelity-checker** before any final-tier spend.

---

## 10. Production checklist (image director → compositor → finisher)

Before a static master is sent to the compositor:
- [ ] **One** dominant idea; squint-test passes (3 tiers separate by mass/contrast).
- [ ] Hero on a power node (not dead-center unless intentional symmetry); ~55–70%
      weight; optically isolated by DOF.
- [ ] Product region is **reference-conditioned** (R1/R2/R3) — real packshot, not t2i.
- [ ] Palette = active product-lock tokens; 60/30/10 warm-cream / garnet / gold-sage;
      anti-clinical warm grade.
- [ ] Thumb-stop trigger present and legible at feed thumbnail scale.
- [ ] **Overlay zones reserved** (headline, subhead, offer, CTA, trust) as low-detail,
      scrim-able regions; prompt says **"no text/lettering/logo/watermark in frame."**
- [ ] Text-contrast plan ≥ 4.5:1 achievable in every reserved zone.
- [ ] Master is 4:5+ with margins; 1:1 / 9:16 / 1.91:1 crops keep hero + headline in
      the safe center column; sacrifice-margins hold only atmosphere.
- [ ] Framing obeys gulf-beauty-brand-norms (hands/hair/back-of-head default; no
      orientalist/expat cues); modesty framed with full production quality.
- [ ] Realism: DOF, grain, real materials, right imperfections; passes 46 + 41.
- [ ] Draft tier first; upscale once to final (never iterate at final cost).

Compositor (37) then adds: Arabic headline (El Messiri) + subhead/CTA (Tajawal), price
LTR lockup, offer/trust badges, scrim, safe-margin fit, per-platform export set.

---

## 11. Common failure modes (and the fix)

| Failure | Symptom | Fix |
|---|---|---|
| **Multi-message clutter** | two benefits + two products fighting | cut to one idea; move the rest to a carousel frame |
| **Dead-center stock look** | no energy, reads as a template | off-center hero on a power node; asymmetric balance |
| **Text baked into the image** | gibberish/warped Arabic, discards | text-in-post always; prompt "no lettering"; reserve zones |
| **Clinical cold palette** | reads cheap/pharmacy to KSA | warm amber grade; cream ground; garnet hero |
| **No reserved overlay space** | headline sits on busy detail, illegible | design a low-detail scrim-able zone up front |
| **Product re-drawn (t2i)** | label drift, wrong cap/color | reference-condition (R1/R2/R3); composite real packshot |
| **Face-forward glamour reveal** | off-market, compliance-unaware | default to hands/hair/back-of-head per norms |
| **Crop breaks the layout** | headline cut off in 9:16 or 1:1 | keep load-bearing content in the center-safe column |
| **Over-clean / plastic** | obviously AI | add DOF, grain, real materials, imperfections; run 46 |
| **Weak thumb-stop** | good CTR-on-view, bad stop rate | raise figure-ground contrast; add a stronger trigger |

---

## 12. Handoff

This doc feeds:
- **32-image-ad-director** — archetypes (§1.4), overlay-zone maps (§5), thumb-stop
  triggers (§4.2), color system (§2).
- **33-banner-systems-designer** — one-master-many-exports (§1.5, §6), safe zones,
  offer-led retargeting layout.
- **37-typography-compositor** — the overlay-zone contract (§5), legibility floors,
  El Messiri/Tajawal type system, text-in-post rationale.
- **38-upscale-finisher** — draft→final gating and the export matrix (§6, §10).
- **41-product-fidelity-checker** & **46-ai-tell-detector** — realism/fidelity gates
  (§9) that every static must clear before final-tier spend.

Product facts, palette hexes, and the environment DNA are **always read from the active
`products/<slug>/product-lock.yaml`** — never hardcode a specific bottle. The *craft* in
this doc is portable across every product the studio onboards.
