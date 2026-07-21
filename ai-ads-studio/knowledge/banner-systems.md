# Banner Systems — Responsive Multi-Size Banner & Design-System Craft

> Reference knowledge for the `banner` family of the v2 creative matrix (display /
> retargeting, multi-size). Primary consumer: **33-banner-systems-designer**; read
> alongside **32-image-ad-director** (shares the master), **37-typography-compositor**
> (owns all Arabic type), **38-upscale-finisher** (owns the export matrix),
> `knowledge/static-ad-craft.md` (thumb-stop composition), `knowledge/gulf-beauty-brand-norms.md`
> (anti-stereotype market truth), and the active `products/<slug>/product-lock.yaml`
> (fidelity truth). When this doc and the gulf-beauty-brand-norms doc disagree, **the
> norms doc wins**; when either disagrees with the STUDIO-BIBLE, **the Bible wins**.
>
> Everything here obeys three inherited laws:
> 1. **The product is reference-conditioned (routes R1/R2/R3), never text-to-image.**
>    A banner is composited: the real packshot goes in, AI builds the world around it.
> 2. **Arabic headline / CTA / price / legal are added in POST** by 37-typography-compositor,
>    never generated inside the image model. In banners the type-to-image ratio is the
>    highest of any format — this law is load-bearing here.
> 3. **One master → many sizes.** Design ONE high-res, generously-margined master per
>    concept; every IAB and platform size is a *crop + recompose*, never a new generation.
>    A 12-size set that costs one credit is the whole point of this doc.

---

## 0. What a banner is, and why it is a *system* not a picture

A social/video ad gets motion and sound to earn attention. A **banner** — display,
retargeting, in-feed static, Stories/Reels sticker, in-app placement — gets none of
that. It is a small, silent, often *repeated* impression seen by someone who has
already met the product (retargeting is where most banner spend lands for a Gulf COD
hair-oil funnel). Its jobs, in order:

1. **Re-trigger recognition** in <0.3 s — the garnet oil, the bottle silhouette, the
   one word — for a warm audience that saw the video yesterday.
2. **Carry one benefit + one offer** legibly at 320×50 *and* at 728×90 *and* at 300×600.
3. **Drive the click** to the landing page (index.html) with a single unmissable CTA.

The reason a banner is a **system** and not a picture: the same idea must survive
being reflowed across a **leaderboard (728×90, 8.1:1 ultra-wide)**, a **skyscraper
(160×600, 1:3.75 ultra-tall)**, a **square (250×250)**, and a **mobile strip
(320×50)** — aspect ratios that span from *very* wide to *very* tall. A picture composed
for one of these is garbage in the others. A **system** defines: one master, a set of
zones, a text hierarchy that collapses gracefully, and per-shape recompose rules. You
design the *rules*, then let 38-upscale-finisher stamp out the sizes.

---

## 1. The size universe — IAB + platform, all in one table

Two families of sizes matter for this studio: **IAB display standard units** (Google
Display Network, programmatic, retargeting exchanges) and **platform placement units**
(Meta / TikTok / Snap in-feed, Stories, and their audience networks). Design the master
to satisfy *both* families from one crop tree.

### 1.1 IAB standard display units (the ones worth cutting)

| Name | px (W×H) | Aspect | Orientation | Role | Priority |
|------|----------|--------|-------------|------|----------|
| Medium Rectangle | 300×250 | 6:5 | ~square | The workhorse; in-content, highest fill | **P0** |
| Large Rectangle | 336×280 | 6:5 | ~square | MedRect's bigger sibling; same comp | P1 |
| Leaderboard | 728×90 | 8.1:1 | ultra-wide | Desktop top/bottom; horizontal reflow | **P0** |
| Mobile Leaderboard | 320×50 | 6.4:1 | wide strip | Mobile anchor; smallest legible unit | **P0** |
| Large Mobile Banner | 320×100 | 3.2:1 | wide | Mobile in-content; roomier than 320×50 | P1 |
| Wide Skyscraper | 160×600 | 1:3.75 | ultra-tall | Desktop rail; vertical reflow | **P0** |
| Half-Page | 300×600 | 1:2 | tall | High-impact rail; best storytelling area | **P0** |
| Billboard | 970×250 | 3.88:1 | wide banner | Premium desktop top | P1 |
| Large Leaderboard | 970×90 | 10.8:1 | ultra-wide | Premium wide | P2 |
| Square | 250×250 | 1:1 | square | Small square fill | P2 |
| Small Square | 200×200 | 1:1 | square | Long-tail fill | P2 |
| Portrait | 300×1050 | 2:7 | ultra-tall | Premium tall rail | P2 |

**The four shapes you must design for** (everything else is a variant of one of these):
- **~Square** (300×250, 336×280, 250×250) — the balanced default.
- **Ultra-wide** (728×90, 320×50, 970×250) — horizontal: product left/right, type flows across.
- **Ultra-tall** (160×600, 300×600, 300×1050) — vertical: stacked, closest to a Story.
- **Wide strip** (320×100) — a shallow wide; hardest for type, treat like a mini-leaderboard.

### 1.2 Platform placement units (Meta / TikTok / Snap)

These overlap with the video specs in `config/platforms.yaml` but banners live in the
*static* and *anchor* placements. All are 1080-based masters.

| Placement | px (W×H) | Aspect | Notes |
|-----------|----------|--------|-------|
| Feed square | 1080×1080 | 1:1 | Meta/TikTok feed static; universal safe default |
| Feed portrait | 1080×1350 | 4:5 | Meta feed max height; best static real estate in-feed |
| Stories / Reels / Snap | 1080×1920 | 9:16 | Full-screen vertical; UI-chrome heavy (see §3) |
| Landscape | 1200×628 | 1.91:1 | Meta link/desktop feed, right-column expand |
| Meta right column | 1200×628 → 254×133 disp | 1.91:1 | Tiny render; treat as an ultra-wide banner |
| Audience Network banner | 320×50 / 300×250 | — | Same as IAB units above |
| TikTok Pangle / display | 300×250, 320×50, 640×360 | — | IAB-compatible; 16:9 640×360 for interstitial |
| Snap Dynamic / Collection | 1080×1920 + 160×600 tiles | — | Full-screen + product tiles |

**Master ratios that regenerate the whole universe:** design masters at **4:5
(1080×1350)** and **1:1 (1080×1080)** for the near-square + portrait family, plus a
**9:16 (1080×1920)** master for Stories, plus one **wide master (2560×640, 4:1)** and
one **tall master (640×2560, 1:4)** built specifically so the ultra-wide and ultra-tall
IAB crops have real pixels to pull from. Five masters → every size in §1.1 and §1.2.
(Often the 4:5 and 9:16 masters share the same concept and the same locked packshot, so
in credit terms this is 1 concept → ~2–3 image generations → 20+ delivered sizes.)

---

## 2. The one-master → many-sizes methodology

This is the core craft of the doc. Do it in this order.

### 2.1 Design the *canonical master* with a generous "gutter"

- Build the concept on the **4:5 (1080×1350)** canvas first — it is the richest static
  shape and forces good vertical hierarchy.
- Then extend that master onto an **oversized "safe" canvas** with padding on all sides:
  a **1600×2000** working frame with the real composition living inside a **1080×1350**
  center window. The extra margin is the **reflow gutter** — the pixels the ultra-wide
  and ultra-tall crops borrow. Never compose an element against the true master edge.
- Keep the background (AI-generated world around the real bottle, route R1) **extendable
  and low-detail at the edges** — a soft warm-neutral gradient, out-of-focus fabric, a
  seamless surface — so a wide crop that pulls in more background does not reveal seams,
  repeated ingredients, or a hard vignette. Busy edges kill reflow.

### 2.2 Separate the master into **movable layers**, not a flat image

A banner master is never delivered flat. Keep these as independent layers so recompose
is a *move*, not a *regenerate*:

1. **Background world** (AI, R1) — extendable, edge-safe.
2. **Product packshot** (real, reference-conditioned) — the ONE non-negotiable-fidelity
   layer; from `products/<slug>/references/`. Isolate it with a clean alpha matte so it
   can be repositioned and rescaled per shape without re-cutting.
3. **Hero secondary** (optional) — the oil drop, hair strand macro, or a single
   ingredient, also real or R1-composited.
4. **Type block** (empty in the master) — a reserved zone, filled in post by
   37-typography-compositor. In the master this is *negative space*, not words.
5. **CTA button** (vector, post) — see §5.
6. **Brand mark / legal** (vector, post).

Because 3–6 are vector/post layers, the same delivered pixels of layers 1–2 serve every
size; only the *arrangement* changes.

### 2.3 Recompose per shape (do NOT scale the whole thing)

Scaling a 4:5 master into a 728×90 leaderboard makes everything illegibly tiny. Instead,
**recompose** — keep element *sizes* roughly constant relative to the smallest banner
dimension, and *re-arrange* them:

- **~Square (300×250):** near the master. Product ~55–65% weight, one headline line, CTA
  bottom. This is your reference layout.
- **Ultra-wide (728×90, 320×50):** rotate the reading order to horizontal. **Product
  hugs one end** (left for LTR scanning of the Latin/price, but mirror to the right when
  the block is Arabic-RTL — the eye enters from the right). **Type + CTA flow across the
  middle/other end.** One headline line only. Logo tucks into the far corner.
- **Ultra-tall (160×600, 300×600):** stack vertically like a mini-Story. **Product top
  ~45%, headline middle, CTA bottom.** This shape has the most room — allow a subhead.
- **Wide strip (320×50):** the hardest. Product as a small ~44px icon at one end, ONE
  short headline, CTA chip at the other end. Nothing else. If it doesn't fit, cut the
  headline to the offer only (e.g. price + "اطلبي الآن").

### 2.4 Enforce a **minimum module size** across the set

Define, once, the smallest legible values and never go below them at *any* size:
- **Body/legal text ≥ 11 px**, **headline ≥ 16 px** on the smallest banner; scale up
  proportionally on larger units.
- **CTA touch/tap target ≥ 40 px tall** on mobile units (320×50 / 320×100).
- **Product image ≥ 40 px on its shortest side** — below that the label is unreadable
  and recognition (the banner's whole job) fails; drop to a bottle *silhouette* only if
  you truly cannot fit it.

---

## 3. Safe zones — IAB clickable margin AND platform UI chrome

Two different safe-zone systems apply, and a banner must satisfy whichever placement it
ships into.

### 3.1 IAB / display safe margin

- **Clear border ≥ 3–4 px** of live text/logo from every edge — many exchanges draw a
  1 px ad border and some crop 1–2 px.
- **Do not place the CTA or logo flush to a corner** — corners are where close/ⓘ icons
  and "AdChoices" badges are injected by the exchange. Reserve the **top-right ~15×15 px**
  for the AdChoices/close affordance on every display unit.
- **Contrast a light banner against a light page:** add a **1 px hairline border or a
  subtle inner shadow** so the unit reads as an ad frame and not as broken page content.

### 3.2 Platform UI-chrome safe zones (Stories / Reels / Snap 1080×1920)

Inherit the studio baseline from `config/platforms.yaml` (Bible §5) — do not re-derive:
- **Top ~14%** reserved for status bar + profile/close chrome.
- **Bottom ~20%** reserved for the caption, CTA sticker/swipe-up, and audio ticker.
- **Right ~6%** kept clear of the action rail (like/share/more).
- **Keep the bottle, the face, the price, and the CTA inside the center-safe column.**
Anything the click depends on (the CTA, the offer) lives in the **center 66% band**, not
in a reserved strip that the platform will cover with its own UI.

### 3.3 In-feed static (1080×1080 / 1080×1350)

- **Bottom ~12–15%** may be overlaid by the "Sponsored" row, caption first line, and CTA
  button the platform injects. Keep burned-in CTA and price *above* it or design the
  burned CTA to sit clear of it.
- **4:5 → 1:1 crop safety:** the 1080×1350 master is often cropped to 1080×1080 by the
  platform. Keep the bottle, face, and price inside the **center 1080×1080 window** so
  the crop never clips them (same center-safe rule as the video masters).

---

## 4. Text hierarchy — how one message survives every shape

A converting banner says **one thing**. The hierarchy is what collapses cleanly when the
canvas shrinks. Define **four tiers** and a **drop order**:

1. **Headline (T1)** — the single benefit or hook. *One line.* e.g.
   «يوقف تساقط الشعر» (*yūqif tasāquṭ ash-shaʿr* — "stops hair loss"). Always present.
2. **Offer / price (T2)** — the COD hook: price, "الدفع عند الاستلام" (*ad-dafʿ ʿind
   al-istilām* — "cash on delivery"), or a discount. Present whenever it fits.
3. **CTA (T3)** — the button verb: «اطلبي الآن» (*uṭlubī al-ān* — "order now") for a
   female-addressed line, «اطلب الآن» for neutral/male. Always present (it's the click).
4. **Subhead / trust (T4)** — «وصفة الجدات الأصلية» (*waṣfat al-jaddāt* — "the original
   grandmothers' recipe"), «100% طبيعي». First to drop.

**Drop order as the canvas shrinks:** T4 → T2-detail → keep {T1, price, T3}. On the
smallest strip (320×50) you may collapse to **{price + T3}** or **{T1 + T3}** only.

**Gulf / RTL typesetting rules (delegated to 37-typography-compositor, summarized here so
the master reserves the right shape of space):**
- Arabic sets **right-to-left**; the reserved type zone's *reading anchor* is the right
  edge. In an ultra-wide banner the product therefore usually sits **left**, type flows
  from the **right**.
- Display face **El Messiri** for headline/CTA; **Tajawal** for body/legal (Bible §2).
- **Numbers and price** (Western Arabic numerals, currency) set **LTR** even inside an
  RTL line — 37-typography-compositor handles the bidi; the master just leaves a wide
  enough number well.
- **Never** let the model draw any of this. The master ships with the type zone as a
  clean, high-contrast negative-space rectangle.

---

## 5. The CTA button — spec

The CTA is the only interactive-looking element and the banner's reason to exist. Spec it
as a **vector layer** so it is pixel-crisp at every size and identical across the set.

- **Shape:** filled rounded rectangle (corner radius ~8–12% of button height) or a pill.
- **Fill:** a single high-saturation accent that contrasts the garnet product world —
  pull the accent from the active `product-lock.yaml` palette; do NOT invent a color.
  Default to a warm gold/cream on garnet, or garnet on cream, whichever the lock defines.
- **Label:** El Messiri, Arabic RTL, verb only («اطلبي الآن»). Sentence-tight, no wrap.
- **Padding:** ≥ 12 px horizontal, ≥ 8 px vertical around the label on standard units;
  ≥ 8/6 on the 320×50.
- **Min height:** 40 px on mobile units (tap target), 32 px on desktop display units.
- **Contrast:** button-fill-to-background and label-to-fill both ≥ **4.5:1** (WCAG AA for
  legibility on tiny units) — verify per size, garnet-on-dark is the usual failure.
- **State:** static banners have no hover; do NOT rely on a hover cue. A subtle chevron
  «‹» (pointing left, the RTL "forward") or a soft outer glow is allowed to imply action.
- **Placement:** bottom-center on square/tall, trailing end on wide, always inside the
  IAB safe margin and clear of injected corner icons.

---

## 6. Color, contrast & thumb-stop (banner-specific)

Banners are often shown **against the publisher's own page** or **inside a busy feed**,
so figure-ground separation matters more than in a full-screen ad.

- **Own a color the surrounding surface lacks.** For this studio the garnet/red oil is
  the built-in pattern interrupt — lean on it; do not dilute the garnet toward brown.
- **Keep one dominant value structure:** a light product on a dark warm ground, or the
  inverse — not a mid-value mush. Banners compete at thumbnail size; value contrast reads
  before hue.
- **Frame faint banners:** on IAB units against unknown white pages, add the §3.1 hairline
  so the ad has an edge.
- **Do not stereotype.** Follow `gulf-beauty-brand-norms.md`: aspirational, modern,
  premium Gulf beauty — no "exotic/orientalist" clichés, no over-veiled or over-exposed
  tropes, correct skin-tone and hair-texture representation. The norms doc wins.
- **Legibility of burned type over image:** if any T-tier is burned into the image
  region (rare — prefer the clean type zone), 37-typography-compositor adds a scrim /
  soft gradient plate so contrast ≥ 4.5:1. Never set light Arabic on a light oil highlight.

---

## 7. Reference-conditioning inside a banner (routes, per §7bis of the V2 spec)

The product region is **always** one of the three routes — the banner-systems-designer
declares which, and 31-format-router validates it against `config/kie-models.yaml`.

- **R1 — PRODUCT-REAL / WORLD-AI (default for banners).** Keep the real packshot pixel-
  intact from `products/<slug>/references/`; AI generates only the extendable background
  world (see §2.1). Cheapest and highest-fidelity — the right default for a static banner.
- **R2 — reference-conditioned edit** (Flux Kontext / Nano-Banana / Seedream edit) when
  the product must sit *in* a regenerated scene (held, poured, on a vanity) and a flat
  composite won't sell the contact shadow. Product region preserved, scene regenerated.
- **R3 — image-to-video** applies only when a banner placement accepts a short loop
  (e.g. an animated Story banner) — then it's really a `lp-3d-banner`/`microvideo` job;
  hand off, don't animate here.

**Label rule (most fragile):** never let the model redraw the label. Use edit/inpaint
that preserves the label region, or composite the real flat label asset in post. Arabic
copy stays a post overlay. → exact label, zero drift, zero wasted regenerations.

---

## 8. Animated banners (HTML5 / GIF) — only if the placement needs motion

Most display banners this studio ships are static (cheapest, on-brand). When a placement
rewards motion (some GDN, some Story banners), keep it minimal and credit-light:

- **Loop ≤ 15 s, ≤ 3 loops, then rest on the CTA frame** (IAB animation guidance).
- **Weight budget:** GIF/HTML5 initial load ≤ **150 KB**, polite-load total ≤ **1 MB**;
  static webp/png ≤ **60 KB** at 300×250 (see §9).
- **Motion = one idea:** an oil drop falling, a slow shine sweep, the CTA gently pulsing
  — never four things moving. The final resting frame must be a complete static banner on
  its own (some viewers only ever see frame 1).
- **Source the motion from a `microvideo` loop** (36-microvideo-director), don't
  re-generate — one 3–5 s loop → GIF/webm/mp4 exports (one-master-many-exports for motion).

---

## 9. Delivery, weight & format budgets (handoff to 38-upscale-finisher)

38-upscale-finisher owns the final export matrix; this is the banner-family budget it
applies. Weight matters — display exchanges and slow Gulf-mobile networks reject or
under-serve heavy units.

| Unit class | Format | Target weight | Notes |
|------------|--------|---------------|-------|
| Small IAB (≤300×250) | webp q80 / png8 | ≤ 40–60 KB | static; png8 for flat type-heavy |
| Large IAB (300×600, 970×250) | webp q80 | ≤ 100 KB | static |
| Platform static (1080²/1080×1350) | webp q82–86 | ≤ 250 KB | feed static, retina-safe |
| Story/Reels static (1080×1920) | webp q82 | ≤ 300 KB | full-screen |
| Animated (HTML5/GIF) | GIF/webm | ≤ 150 KB init / ≤ 1 MB total | §8 rules |

- **Export at the native pixel dimension** of each unit (300×250 means 300×250 real
  pixels) — do not ship a scaled-down large image; it bloats weight and softens type.
- **Sharpen after downscale**, per unit, so small units stay crisp (finisher policy).
- **Two masters minimum per unit only when the platform serves retina** (2× assets):
  provide the 1× and let the finisher derive it; do not regenerate.
- **File naming (Bible §2 / reference-manifest):** `<slug>-banner-<concept>-<WxH>.<ext>`,
  e.g. `mechat-red-oil-banner-density-300x250.webp`, all under `/assets`. The integration
  map lists every delivered size against its placement.

---

## 10. Banner QC checklist (must pass before 38-upscale-finisher exports the set)

- [ ] Product region is **reference-conditioned (R1/R2/R3)** — real packshot, not t2i.
- [ ] **Label undistorted and readable** at ≥ 40 px shortest side; no Arabic drift.
- [ ] **No Arabic drawn by the model** anywhere — all type is the post layer.
- [ ] **T1 headline + CTA present and legible** on the *smallest* delivered unit (320×50).
- [ ] Drop order (§4) applied — no size is overcrowded, none is empty.
- [ ] **Safe margins** honored: ≥ 3–4 px IAB border; top-right AdChoices corner clear;
      platform UI chrome (top 14% / bottom 20% / right 6%) clear on 9:16 units.
- [ ] **CTA** ≥ 40 px tap target on mobile; fill/label contrast ≥ 4.5:1; from lock palette.
- [ ] **Center-safe:** bottle, face, price survive the 4:5→1:1 and story crops.
- [ ] **Reflow gutter** intact — no seams/repeats/hard vignette revealed on wide/tall crops.
- [ ] **Weight budgets** (§9) met per unit; native pixel dimensions; correct filename.
- [ ] **Anti-stereotype:** passes `gulf-beauty-brand-norms.md`; skin/hair represented right.
- [ ] **One master → many sizes:** the whole set traces to ≤ 5 masters / ≤ 1 concept-credit.

---

## 11. Common failure modes → fix

| Symptom | Cause | Fix |
|---------|-------|-----|
| Type illegible at 320×50 | Scaled the whole master down | **Recompose**, don't scale; enforce min module sizes (§2.4) |
| Seams / repeated ingredients on a wide crop | Busy master edges, no gutter | Extendable low-detail edges; oversized safe canvas (§2.1) |
| Product redrawn / label drift | Text-to-image on the product | Reference-condition R1/R2; composite real label; inpaint-preserve (§7) |
| Wrong Arabic / broken letterforms | Arabic generated in-model | All type in post via 37-typography-compositor (§4) |
| Bottle clipped after platform crop | Element outside center-safe | Keep bottle/face/price in center 1:1 window (§3.3) |
| CTA lost against garnet | Low contrast, invented color | Lock-palette accent; ≥ 4.5:1; scrim if burned (§5, §6) |
| Banner blends into publisher page | No frame on a light unit | §3.1 hairline / inner shadow |
| Set costs many credits | Regenerating per size | One master → crop/recompose; motion from one loop (§2, §8) |
| Corner CTA covered by AdChoices | Flush-corner placement | Reserve top-right; keep CTA off corners (§3.1) |

---

## 12. Handoff

- **Upstream:** takes the approved concept + locked packshot + overlay-zone map from
  **32-image-ad-director**, the route + model + credit estimate from **31-format-router**,
  and the size plan (which units, which placements) from **30-creative-matrix-planner** /
  `config/creative-matrix.yaml`.
- **Owned here (33-banner-systems-designer):** the master layer stack, the reflow gutter,
  the per-shape recompose rules, the reserved type zones, the CTA spec, and the size-plan
  crop tree — the *system*, not the pixels of the type.
- **Downstream:** **37-typography-compositor** fills every reserved type zone (Arabic RTL,
  El Messiri/Tajawal, LTR numbers, correct verb gender) and burns the CTA label;
  **38-upscale-finisher** renders the export matrix (§9), sharpens per unit, applies weight
  budgets, and writes files + integration map under `/assets`; **27-quality-checker** runs
  the §10 checklist and routes any fail back before a single final-tier credit is spent.
