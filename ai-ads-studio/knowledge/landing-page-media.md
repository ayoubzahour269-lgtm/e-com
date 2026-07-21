# Landing-Page Media — Hero / Section Imagery, Performance Budget & Background Microvideo Craft

> Reference knowledge for the `lp` family of the v2 creative matrix (`lp-hero-image`,
> `lp-section-image`, `lp-3d-banner`, `lp-bg-microvideo`). Primary consumers:
> **35-landing-visual-director** (audits index.html, emits the asset map) and
> **36-microvideo-director** (LP loops). Read alongside **34-3d-render-director** /
> `knowledge/3d-product-render.md` (packshots that feed the hero), **37-typography-compositor**
> (owns ALL Arabic type — the LP hero headline is a post overlay, never baked into
> the image), **38-upscale-finisher** (owns the export matrix + webp/mp4 encode
> policy), `knowledge/kie-credit-optimization.md` (the credit engine), and the
> active `products/<slug>/product-lock.yaml` (fidelity truth).
>
> **Precedence:** when this doc and `gulf-beauty-brand-norms.md` disagree, the
> norms doc wins; when either disagrees with the STUDIO-BIBLE, the Bible wins.
>
> **Product-agnostic:** every filename, dimension, and prompt in this doc is
> illustrated with the flagship (mechat-red-oil) for consistency per Bible §2, but
> the skills that consume it load the ACTIVE `products/<slug>/product-lock.yaml`.
> Never hardcode the garnet bottle — load the lock, read `vessel`, `oil`, `cap`,
> `label`, and the `reference-manifest`, and condition every render on the real
> packshot (routes R1/R2/R3). The product is NEVER text-to-image.

---

## 0. What "landing-page media" is in this studio, and why it is separate from ad creative

The studio's v2 mandate: it does not just make paid-social ads, it **studies the
landing page** (the COD funnel's `index.html`) and produces **professional media to
upgrade it**. Landing-page media is the second product line. It differs from ad
creative in four load-bearing ways:

1. **It lives inside a real HTML/CSS document**, not a platform feed. Weight, layout
   stability, and load order are functional requirements, not nice-to-haves — a
   heavy hero that pushes Largest Contentful Paint (LCP) past 2.5 s **loses COD
   orders before the shopper ever sees the offer**. On ad creative the platform
   compresses and serves; on the LP, **we** own the bytes.
2. **The audience is warm.** They clicked the ad. The LP's job is not scroll-stop,
   it is *confirm the promise, build trust, remove friction, land the order*. Media
   here is evidence (texture, ingredient, before/after, the real bottle in a real
   hand), not a hook.
3. **It is overwhelmingly mobile.** Gulf COD traffic from Meta/TikTok/Snap is
   ~85–95% mobile, much of it on mid-tier Android over variable 4G (KSA/UAE fast,
   parts of Egypt/Oman slower). **Design for a throttled mobile connection first**;
   desktop is the easy case.
4. **It is RTL.** The document flows right-to-left. Hero focal composition, section
   image/text pairing, and safe margins all mirror. See §6.

The through-line to the rest of the studio is the same three inherited laws:

- **Reference-conditioned product** (R1/R2/R3) — the real packshot goes in; AI
  builds the world around it. Never text-to-image the bottle.
- **Arabic text in POST** — the hero headline, section labels, CTA, price, and
  badges are typeset by 37-typography-compositor over the image, never generated
  in-model. (Image models cannot spell Arabic; baking text also breaks
  responsive re-layout and localization.)
- **One master → many exports** — one high-res hero master is cropped to every
  breakpoint and encoded to every format by 38-upscale-finisher. One credit, many
  files.

---

## 1. The slot taxonomy — every place media lands on a hair-oil LP

35-landing-visual-director audits `index.html` and enumerates slots. A typical Gulf
COD hair-oil funnel has these, top to bottom:

| Slot | Type | Role | Default source |
|------|------|------|----------------|
| **Hero visual** | `lp-hero-image` or `lp-bg-microvideo` | Above-the-fold promise + product | AI master (or 3–5 s loop) |
| **Ingredient / actives band** | `lp-section-image` (batch) | Macro of oil, seeds, botanicals — credibility | AI batch, shared style |
| **Benefit demonstration** | `lp-section-image` | Hair shine / length / scalp — the result | AI, human-realism-locked |
| **How-to-use (3 steps)** | `lp-section-image` (batch ×3) | Apply → massage → style | AI batch, same hand/lighting |
| **Before / after** | `lp-section-image` | Proof (see §6.4 — cultural + honesty rules) | AI or real UGC |
| **Trust badges / guarantees** | icon (vector) | COD, cash-on-delivery,返, halal, dermatologist | vector, NOT raster |
| **Bottle packshot / 3D** | `3d-render` / `lp-3d-banner` | Clean product on transparent/scene bg | 34-3d-render-director |
| **Sticky CTA button** | typography + vector | "اطلب الآن" (order now) | 37-typography-compositor |

For each slot the director emits: **spec** (dimensions, format, weight budget),
**prompt** (or "keep existing"), and an **integration map** (exact filename under
`/assets`, and the `<img>`/`<video>`/CSS wiring). This doc supplies the craft +
number budgets that populate those three fields.

**Keep-existing rule:** if the current `/assets` image already matches the
product-lock (correct cylinder, correct label, no invented «الأحمر») and hits the
weight budget, **do not regenerate it** — that is a wasted credit. Many `/assets`
renders have DRIFTED (square bottle, wrong label) per the product-lock's
`forbidden` manifest; those MUST be replaced. Audit before you spend.

---

## 2. Hero imagery craft

The hero is the single most important frame on the page and the LCP element on most
mobile layouts. It carries three jobs at once: (a) **continuity** with the ad the
shopper just clicked (same world, same bottle, same garnet), (b) **the product,
unmistakable and truthful**, and (c) **reserved negative space** for the Arabic
headline + CTA that 37-typography-compositor lays on top.

### 2.1 Composition for an RTL hero

- **Product on the right, headline space on the left** is the natural RTL reading
  entry — but verify against the live template; many Gulf COD templates center the
  bottle with headline above. Compose to the template's text block, not a guess.
- **Reserve a text-safe zone** of low-contrast, low-detail pixels where the
  headline/CTA will sit. This is the LP analogue of the ad overlay-zone map. If the
  compositor has no calm region, it is forced into a scrim box that looks cheap.
- **Rule-of-thirds bottle placement**, label panel unobstructed and facing camera
  (the label is identity — never crop or foreshorten it past legibility).
- **Aspect:** author the master at **16:9 or 3:2 landscape at high res**, then crop
  to a **portrait/near-square mobile hero** (4:5 or 1:1) and a wide desktop hero
  from the SAME master. Generously margin the master so both crops breathe — this
  is the one-master-many-exports law applied to the hero.

### 2.2 Product fidelity (inherited, non-negotiable)

Condition on `canonical_reference` from the active lock. For mechat-red-oil that
means: tall slim **clear PET cylinder** (NOT square, NOT ribbed), matte-white
ribbed cap, **~12% headspace air-gap kept**, translucent **garnet/red oil** reading
through the wall, on-label text stays «زيت المشاط للشعر» (never paint «الأحمر» onto
the vessel). The fidelity gate (skill 23 / 40) checks the hero at ΔE ≤ 3 against the
sampled reference before any final spend. A gorgeous hero with the wrong bottle is a
discard.

### 2.3 Look & lighting

- Match the ad's grade so the click-to-LP transition feels continuous (see
  `knowledge/color-grading.md`). Warm garnet highlights, clean neutral shadows,
  no muddy mids.
- **Soft directional key + gentle rim** for the glass; controlled specular on the
  cap; a believable surface (marble/linen/water) that reads premium without Gulf
  cliché (no gold-everything, no oud-smoke kitsch — see `gulf-beauty-brand-norms.md`).
- Keep the background **quiet** where text lands; let it be rich where the product
  lives.

### 2.4 Hero decision: still image vs microvideo

| Choose a **still hero** when | Choose a **microvideo hero** when |
|---|---|
| Weight budget is tight / traffic is slow-4G heavy | The offer benefits from motion proof (oil pour, shine sweep) |
| The template's LCP element is the hero (stills win LCP) | A poster still can carry LCP while video lazy-loads |
| Credits are constrained (still = image credit only) | Budget allows one 3–5 s image→video loop (§4) |

**Default = still hero with an optional microvideo *below* the fold.** A background
microvideo as the LCP element is the single easiest way to wreck mobile LCP — only
do it with the poster-carries-LCP pattern in §4.3.

---

## 3. Performance budget — webp / AVIF weights, lazy-load, LCP

This is the part that separates studio-grade LP media from "a designer exported a
PNG". Every asset ships with a **weight budget**; 38-upscale-finisher encodes to it.

### 3.1 Format policy

- **AVIF first, WebP fallback, no naked JPEG/PNG for photos.** AVIF is ~20–30%
  smaller than WebP at equal quality and is now safe on modern Gulf mobile
  browsers; ship **AVIF + WebP** via `<picture>` so old WebKit still gets WebP.
- **PNG only for true alpha packshots** (the 3D bottle cutout on transparent bg) —
  and even then prefer **WebP with alpha** (much smaller than PNG-24). Reserve
  lossless PNG for line-art/logo edges if a vector isn't available.
- **SVG for all icons, badges, guarantees, and the CTA chrome.** Never rasterize a
  checkmark or a "COD" badge — vectors are a few hundred bytes, scale to any DPR,
  and stay crisp. This also keeps the typography-compositor's Arabic labels as
  live text, not pixels.
- **No GIF, ever.** An animated GIF of an oil drip is 10–50× the bytes of the same
  loop as muted WebM/MP4. Use §4.

### 3.2 Quality settings (38-upscale-finisher encode targets)

| Asset | Format | Quality | Notes |
|---|---|---|---|
| Hero photo | AVIF q≈50–55 / WebP q≈78–82 | perceptually lossless at hero size; grain masks banding on the garnet gradient |
| Section photo | AVIF q≈48 / WebP q≈75 | slightly softer OK below fold |
| Ingredient macro | AVIF q≈52 / WebP q≈80 | texture detail matters — don't over-crush |
| Alpha packshot | WebP-alpha q≈85 | edges must stay clean |
| Microvideo | see §4.2 | crf, not quality % |

Encode with chroma kept (4:4:4 or 4:2:2) on the garnet/red hero — heavy 4:2:0
subsampling smears red edges and makes the oil look muddy. Reds are the hardest
channel; test the actual product color after encode.

### 3.3 Weight budgets (per delivered file, mobile crop)

Treat these as **hard ceilings** the director writes into each slot spec. They are
sized for a fast-first-paint Gulf COD funnel on 4G:

| Slot | Mobile weight ceiling | Desktop ceiling |
|---|---|---|
| Hero image (AVIF) | **≤ 120 KB** | ≤ 200 KB |
| Section image | ≤ 80 KB | ≤ 140 KB |
| Ingredient / macro | ≤ 90 KB | ≤ 150 KB |
| Alpha packshot (WebP) | ≤ 100 KB | ≤ 160 KB |
| Icon / badge (SVG, gzipped) | ≤ 4 KB | ≤ 4 KB |
| Microvideo loop (see §4) | ≤ 1.2 MB | ≤ 2.5 MB |
| **Total above-the-fold** | **≤ 200 KB** | ≤ 350 KB |

If a slot can't hit budget at acceptable quality, the fix is **smaller intrinsic
dimensions or a tighter crop**, not a higher-quality heavier file. A hero displayed
at 400 px wide on a phone should not ship a 1600 px master to that phone — see
responsive `srcset` in §3.5.

### 3.4 LCP — the number that moves COD conversion

Largest Contentful Paint is the moment the biggest above-the-fold element (usually
the hero) finishes painting. **Target LCP ≤ 2.5 s on a mid-tier phone / 4G.**
Every 1 s of extra load measurably drops conversion on a cold COD funnel. Rules:

1. **The LCP image must NOT be lazy-loaded.** Give the hero `loading="eager"` and
   `fetchpriority="high"`. Lazy-loading the hero is the #1 self-inflicted LCP wound.
2. **Preload the hero** in `<head>`:
   `<link rel="preload" as="image" href="hero.avif" type="image/avif" imagesrcset="…" imagesizes="…">`
   so the browser fetches it before it finishes parsing CSS.
3. **Inline critical CSS** for the hero block; defer the rest. A hero that waits on
   a blocking stylesheet can't be the LCP until the CSS lands.
4. **Right-size the hero** — the single biggest LCP lever is not shipping a desktop
   master to a phone (§3.5).
5. **Self-host fonts, `font-display: swap`.** The Arabic display font (El Messiri)
   and body (Tajawal) must not block text paint; preload the one weight used in the
   headline.

### 3.5 Responsive delivery — `srcset` / `sizes` / `<picture>`

One master, several encoded widths, browser picks the smallest that fits:

```html
<picture>
  <source
    type="image/avif"
    srcset="hero-400.avif 400w, hero-800.avif 800w, hero-1200.avif 1200w"
    sizes="(max-width: 640px) 100vw, 1200px">
  <source
    type="image/webp"
    srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
    sizes="(max-width: 640px) 100vw, 1200px">
  <img src="hero-800.webp" alt="زيت المشاط الأحمر للشعر"
       width="1200" height="675"
       loading="eager" fetchpriority="high" decoding="async">
</picture>
```

- The `400w` file is the one that actually ships to most Gulf phones. Encode it to
  the mobile weight ceiling in §3.3, not the desktop one.
- `sizes` must reflect the REAL rendered width from the template's CSS, or the
  browser over-fetches. Read the template; don't guess.
- All three widths are **crops/exports of the same approved master** — no extra
  generations. 38-upscale-finisher stamps them out.

### 3.6 Below-the-fold: lazy-load everything else

- Every image below the fold: `loading="lazy" decoding="async"`.
- Batch section images (ingredient, how-to-use ×3, benefit) share style tokens and
  are produced as ONE batch (credit policy #7) — but ship as individual lazy files.
- Order the DOM so the shopper's scroll always outruns the fetch on 4G: the first
  below-fold section image should still be modestly early in priority.

---

## 4. Background microvideo — the seamless loop

A short, silent, seamless loop (oil pour, drop ripple on hair, shine sweep, slow
bottle rotation) can lift perceived quality and dwell time on the LP. It is also the
easiest way to blow the weight and LCP budget. Owned by **36-microvideo-director**;
this section is the craft + integration contract.

### 4.1 Production rules (credit-minimal)

- **3–5 s, seamless loop.** First and last frame must match so the loop is
  invisible (loop-matched keyframes). Longer = more bytes for zero extra value —
  the shopper never watches a background loop to the "end".
- **Image→video from a locked keyframe**, fast/cheap video tier (credit policy #8).
  The keyframe is an already-approved still (often the hero master) → the bottle
  identity is already correct, so no fidelity re-QC of a fresh generation.
- **No baked text, no audio track** (background loops are muted; don't pay to
  generate a soundtrack you'll strip).
- **Subtle motion only** for a *background* loop — a slow oil sheen or gentle
  rotation. Big motion behind text hurts legibility and reads gimmicky. Save the
  dramatic pour for an in-content (foreground) loop the shopper looks *at*.

### 4.2 Encode + dual-format delivery

Ship **two codecs** so every browser gets a native decode, plus a poster:

- **MP4 / H.264** (`baseline`/`main` profile) — universal; iOS Safari REQUIRES it
  for inline autoplay. `crf ≈ 26–30`, `-pix_fmt yuv420p` (mandatory for Safari),
  `-movflags +faststart` (metadata at the front so it streams).
- **WebM / VP9 (or AV1)** — smaller; modern Android/Chrome picks it first.
- **Poster still** (AVIF/WebP) — the frame shown before/instead of the video (§4.3).
- Strip the audio stream entirely (`-an`) — silent loop, save bytes.
- **No sound** means you don't even need the `muted` byte cost, but you STILL set
  the `muted` attribute (see §4.4) — it's required for autoplay, not for audio.

Weight ceilings: **mobile ≤ 1.2 MB, desktop ≤ 2.5 MB** per loop (§3.3). If you
can't hit it, shorten the loop, drop resolution (a background loop can ship at
720p or even 540p — it's decorative), or fall back to the poster still only.

### 4.3 Poster + LCP protection (the critical pattern)

**Never let the video element be the LCP.** The pattern:

1. Set `poster="hero-poster.avif"` (a right-sized, budgeted still). The poster
   paints instantly and **becomes the LCP element** — fast, cheap, reliable.
2. The video lazy-loads and starts playing *after* first paint, swapping in over the
   poster with no layout change.
3. On slow connections or reduced-data / reduced-motion, the poster simply stays —
   the shopper sees a clean still, never a stalled black box.

This gives you the motion upside with none of the LCP downside. The poster is a
crop of the loop's first (== last) frame, so it also guarantees a seamless
still→video handoff.

### 4.4 Correct autoplay markup (mobile-safe)

```html
<video
  class="lp-hero-loop"
  poster="hero-poster.avif"
  autoplay muted loop playsinline
  preload="none"
  width="1080" height="1350"
  aria-hidden="true">
  <source src="hero-loop.webm" type="video/webm">
  <source src="hero-loop.mp4"  type="video/mp4">
</video>
```

- `muted` + `playsinline` + `autoplay` together are **mandatory** for inline
  autoplay on iOS Safari and Android Chrome. Missing any one → the browser blocks
  autoplay or forces fullscreen. `playsinline` is the one people forget.
- `preload="none"` (or `"metadata"`) so the video does NOT compete with the hero
  poster / LCP for bandwidth. Let the poster win first paint, then fetch the loop.
- `loop` for the seamless repeat; no `controls` on a decorative background loop.
- `aria-hidden="true"` for a purely decorative loop (the poster/`<img>` alt carries
  meaning); if the loop is content (a demo), give it a caption instead.
- Provide `width`/`height` (or CSS `aspect-ratio`) to reserve space — see §5 (CLS).

### 4.5 Mobile fallback ladder

Serve down gracefully; never ship a stalled video experience:

1. **Fast Android/Chrome** → WebM/VP9 loop autoplays over poster.
2. **iOS Safari** → MP4/H.264 (yuv420p, faststart) autoplays inline over poster.
3. **Slow 4G / data-saver** → honor `prefers-reduced-data` and the Save-Data hint:
   don't fetch the video at all; the poster still is the whole experience.
4. **`prefers-reduced-motion: reduce`** → do not autoplay; show the poster (respect
   the OS accessibility setting — also the right call for motion-sensitive users).
5. **Very old browser** → `<source>` negotiation falls through; poster remains.

Implement 3–4 by gating the `<source>`/autoplay with a tiny inline script that
checks `navigator.connection?.saveData` and the reduced-motion/-data media queries
before assigning `src`. Keep the script inline and <1 KB; it must not block paint.

---

## 5. CLS-safe integration — no layout shift

Cumulative Layout Shift (CLS) is the other Core Web Vital that silently kills
conversion: a hero or section image that loads *after* the text and shoves the CTA
down under the shopper's thumb causes mis-taps and rage-scrolls. **Target CLS ≤
0.1.** Every media slot must reserve its exact space *before* it loads.

**Rules the integration map MUST satisfy:**

1. **Always set intrinsic `width` and `height`** on every `<img>` and `<video>`
   (the real pixel ratio of the file). Modern browsers compute
   `aspect-ratio` from them and reserve the box before the bytes arrive — this
   single rule eliminates most image CLS.
2. **Or set CSS `aspect-ratio`** on the container when the box is fluid
   (`aspect-ratio: 4 / 5; width: 100%;`). Reserve, don't reflow.
3. **Give the hero a container with a defined height / aspect** so text below it
   never jumps. Never let the hero's height be "whatever the image turns out to be".
4. **Poster and video share identical dimensions** so the video→poster swap is
   pixel-stable (§4.3).
5. **Fonts:** `font-display: swap` prevents invisible text, but a swap from
   fallback → El Messiri/Tajawal can itself shift layout. Preload the display
   weight and match the fallback's metrics (`size-adjust` / a metric-compatible
   fallback) so the swap doesn't reflow the headline.
6. **Never inject media above already-painted content** after load (no
   "surprise" banners pushing the hero down). Reserve the slot in the DOM up front.
7. **Sticky CTA** ("اطلب الآن") is `position: fixed`/`sticky` and lives outside the
   normal flow — it must not participate in any shift.

**CLS QC:** before handoff, the integration passes only if, with images/video
artificially delayed, the text layout does not move. If it moves, a `width/height`
or `aspect-ratio` is missing.

---

## 6. RTL, Arabic, and Gulf cultural craft on the LP

### 6.1 Direction

The document is `dir="rtl"`. Media composition mirrors: focal weight, image/text
pairing in alternating sections, and safe margins all flip. When you crop the
master for the LP, verify the product/label doesn't end up under the RTL text
column. A hero composed for an LTR ad may need a horizontal flip for the LP —
**but never flip the label** (mirrored Arabic on the bottle is an instant fidelity
fail); re-crop or re-compose instead of flipping.

### 6.2 Text is always POST

Every word on the LP media — hero headline, section titles, badge labels, price,
CTA — is **live HTML text styled by 37-typography-compositor**, or an overlay it
composites. Nothing is baked into the image. This is why the reserved text-safe
zone (§2.1) exists, and it's what makes the page localizable, responsive, and
correct (image models can't spell Arabic). Numbers/price are LTR runs inside the
RTL flow — the compositor owns the bidi handling.

### 6.3 Anti-stereotype (defer to `gulf-beauty-brand-norms.md`)

- No gold-everything, no oud-smoke kitsch, no "exotic harem" framing. Modern,
  clean, premium — the way a real Gulf beauty brand shoots.
- Hair/skin/hands in benefit and how-to shots follow the human-realism + market
  norms: contemporary, aspirational, respectful representation. Hands in how-to-use
  shots are the most common human element — get skin, nails, and modest framing
  right (see `knowledge/human-realism.md`).
- Modesty framing where a person appears; when in doubt, feature hair + product +
  hands, not full faces.

### 6.4 Before/after honesty

Before/after is powerful and scrutinized. Keep lighting, angle, and framing
identical between the two so the difference reads as the product, not a lighting
trick. Never fabricate an implausible transformation — the market and the platforms
both punish it, and it erodes the trust the warm LP audience arrived with.

---

## 7. Credit discipline for LP media (inherited from the credit engine)

Landing-page media obeys the same 10 policies as ad creative
(`knowledge/kie-credit-optimization.md`). The LP-specific applications:

1. **Audit before generate.** Enumerate slots; mark each `keep-existing`,
   `re-encode-only` (right image, wrong format/weight → 38-upscale-finisher re-encodes,
   ZERO model credits), or `regenerate`. Most LP wins are re-encodes, not new art.
2. **Batch shared-scene section images** (ingredient, how-to ×3, benefit) as ONE
   batch with shared style tokens + fixed seed → consistent look, fewer discards.
3. **Hero master → all breakpoints + formats are exports**, not generations.
4. **Microvideo = 3–5 s loop, fast tier, from an existing keyframe** — never an 8 s
   hero-tier render for a background loop.
5. **Draft→final gate:** iterate the hero on draft tier until QC ≥ 95, then ONE
   final render / upscale. Never iterate at final cost.
6. **Surface the bill:** the asset map ships a per-slot credit estimate and an LP
   media total BEFORE any spend, each with a cheaper fallback (e.g. still-only hero
   instead of microvideo).

**Cheapest-viable-LP baseline:** one still hero (image credit) + one batched set of
section stills (one batch credit) + re-encoded existing packshot (zero) + vector
badges (zero). Microvideo is an *upsell* on top, added only when the budget and the
offer justify it.

---

## 8. Handoff contract — what the LP asset map must contain per slot

35-landing-visual-director emits, for every slot, a row the front-end/integrator can
wire without guessing:

- **slot id** + DOM anchor (selector / template region).
- **decision:** keep-existing | re-encode-only | regenerate.
- **spec:** intrinsic dimensions, aspect, format(s) (AVIF+WebP / MP4+WebM+poster),
  per-file weight ceiling (§3.3), responsive widths for `srcset`.
- **prompt:** the reference-conditioned image/video prompt (route R1/R2/R3), or
  "keep existing", or "re-encode only".
- **text overlay:** the Arabic headline/label/CTA to be typeset by 37-typography-compositor
  (with transliteration + gloss on first use), and the reserved text-safe zone.
- **integration map:** exact `/assets` filename(s), and the `<picture>` / `<video>` /
  CSS wiring including `loading`, `fetchpriority`, `width`/`height` or
  `aspect-ratio`, `preload`, and preload-link where applicable.
- **perf flags:** is-LCP? (eager+preload), lazy? (below fold), CLS reservation set?
- **credit estimate** + cheaper fallback route.

If a slot's row is missing any of `dimensions`, `weight ceiling`, `width/height (CLS)`,
`loading strategy`, or `format list`, the map is incomplete — the integrator will
guess and the LP will regress on LCP or CLS. Do not hand off a partial row.

---

## 9. Quick reference — the LP media checklist

- [ ] Every slot audited: keep / re-encode / regenerate (don't re-spend on good art).
- [ ] Hero is AVIF+WebP, right-sized per breakpoint, `eager` + `fetchpriority=high` + preloaded.
- [ ] Hero (or poster) is the LCP; LCP ≤ 2.5 s on mid-tier phone / 4G.
- [ ] Below-fold media: `loading="lazy" decoding="async"`.
- [ ] Every `<img>`/`<video>` has intrinsic `width`+`height` or `aspect-ratio` (CLS ≤ 0.1).
- [ ] Above-the-fold total ≤ 200 KB mobile.
- [ ] Icons/badges/CTA chrome are SVG, not raster. No GIFs anywhere.
- [ ] Microvideo: 3–5 s seamless loop, MP4(yuv420p,faststart)+WebM, poster carries LCP.
- [ ] Video markup: `autoplay muted loop playsinline`, `preload="none"`, `aria-hidden`.
- [ ] Reduced-motion / Save-Data / slow-4G falls back to the poster still.
- [ ] Product matches the ACTIVE product-lock (ΔE ≤ 3); label unmirrored, correct text.
- [ ] All Arabic text is POST (37-typography-compositor); reserved text-safe zone exists.
- [ ] Anti-stereotype per `gulf-beauty-brand-norms.md`; before/after honest.
- [ ] Per-slot credit estimate + LP total surfaced before any spend.
