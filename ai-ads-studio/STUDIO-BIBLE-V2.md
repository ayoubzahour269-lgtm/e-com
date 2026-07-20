# AI Ads Studio v2 — Multi-Format Creative Production (MASTER SPEC / WORKFLOW BRIEF)

> This is the source-of-truth brief for the v2 expansion. It will be folded into
> STUDIO-BIBLE.md (new §8–§11) after the running video workflow completes, and it
> is the brief a fan-out workflow uses to generate the v2 modules.
> Product source of truth is UNCHANGED: زيت المشاط الأحمر (Red Mechat hair oil),
> index.html, the bottle lock in STUDIO-BIBLE §4. Do NOT restate product facts —
> reference the Bible.

## 0. Mandate change (why v2 exists)

v1 = one cinematic 9:16 video ad ending in one Kie prompt.
v2 = the studio STUDIES the landing page, then produces a full creative
production line across formats, PLUS professional media to upgrade the landing
page itself — all under a hard Kie-AI credit-optimization discipline.

Prime directives unchanged and inherited by every format:
1. Realism first (looks filmed / studio-rendered, never "AI").
2. Conversion second.
3. Cost third — Claude reasons/scores/QA fully BEFORE any credit is spent.
   New in v2: cost is a *first-class routed decision* per asset (draft vs final
   tier, image-first, one-master-many-exports, text-in-post).

## 1. Creative Matrix — the deliverable types

Each type is a first-class producer with its own director skill, Kie route,
prompt dialect, credit profile, and example file.

| id | family | purpose | primary Kie route | export |
|----|--------|---------|-------------------|--------|
| `hero-video-ad`      | ad | cinematic 9:16 8–15s paid social | image→video (Veo3 from locked keyframe) | mp4 9:16 |
| `image-ad`           | ad | static feed/paid image ad | image model (Flux Kontext / Seedream / Nano-Banana / Imagen) | webp 1:1, 4:5, 9:16 |
| `banner`             | ad | display / retargeting, multi-size | 1 master image → composited sizes | webp/png (IAB + platform) |
| `3d-render`          | ad | photoreal CGI packshot / hero render | image model (studio-CGI prompt) + upscale | png (alpha) + scene webp |
| `lp-hero-image`      | lp | landing hero visual | image model | webp |
| `lp-section-image`   | lp | benefit / ingredient / trust section imagery (batch) | image model batch | webp |
| `lp-3d-banner`       | lp | animated hero banner (rotate / parallax) | short loop video / turntable | mp4/webm loop |
| `lp-microvideo`      | lp | ambient section loops (oil pour, hair shine, rotate) | image→video short, fast tier | mp4/webm 3–5s loop |

family: `ad` = paid advertising creative; `lp` = landing-page media.

## 2. New skills (continue numbering after the v1 set)

Each SKILL.md follows Bible §2 conventions (frontmatter name/role/stage/consumes/
produces/model_cost:none + 8 H2 sections Purpose/Inputs/Outputs/Rules/Reasoning
Strategy/Best Practices/Failure Conditions/Handoff). Substantial (≥ 400 lines),
no placeholders.

- `30-creative-matrix-planner` — studies the landing page + campaign objective,
  outputs the ASSET PRODUCTION PLAN: which types, how many variants, per
  platform/placement, priority order, and a per-asset + total CREDIT BUDGET with
  a cheaper fallback route each. Gate: no production starts without an approved
  plan + budget.
- `31-format-router` — maps each planned asset → optimal Kie model + settings via
  config/kie-models.yaml. Decides image-first vs direct-video, resolution tier
  (draft/final), batch grouping, seed/reference lock, and whether text is overlaid
  in post (default YES). Emits a routing table with credit estimate per asset.
- `32-image-ad-director` — static ad art direction: composition, focal hierarchy,
  negative space reserved for headline/CTA overlay zones, brand palette, 3 layout
  archetypes (product-hero, benefit-demonstration, social-proof). Outputs image
  prompt(s) + overlay-zone map.
- `33-banner-systems-designer` — one master → full size system (feed 1080², story
  1080×1920, IAB 300×250 / 728×90 / 160×600 / 320×50). Safe zones, text hierarchy,
  CTA button spec, per-size crop/recompose rules. NO per-size re-generation.
- `34-3d-render-director` — CGI packshot art direction: studio lighting rig,
  material shaders (clear PET glass, translucent garnet oil, matte-white ribbed
  cap, label), turntable spec for `lp-3d-banner`, alpha-matte packshot + scene
  render. Reference-locked to the bottle.
- `35-landing-visual-director` — audits index.html, enumerates every image/media
  slot (hero, section backgrounds, ingredient cards, benefit icons, trust badges,
  bg microvideo), and for each emits: spec (dimensions, webp/mp4, weight budget),
  prompt (or "keep existing"), and INTEGRATION MAP (exact filename under /assets,
  and the <img>/<video>/CSS wiring). Respects current palette/fonts/RTL.
- `36-microvideo-director` — seamless short LP loops, credit-minimal: 3–5s,
  image→video from an existing/locked keyframe, loop-matched first/last frame,
  fast tier. Catalog of loop ideas (oil pour, drop ripple, hair shine sweep,
  bottle slow-rotate, ingredient macro).
- `37-typography-compositor` — Arabic RTL headline/CTA typesetting for image ads,
  banners, and LP overlays (El Messiri / Tajawal, El Messiri for display), safe
  margins, contrast/legibility, LTR price/number handling. This is WHY text is
  never sent to the image model — correct Arabic guaranteed + credits saved.
- `38-upscale-finisher` — draft→final policy: generate cheap/small, QC, then ONE
  upscale (or one final render). Export matrix: all ratios/sizes derived from the
  approved master. Sharpening/grain/format (webp q, mp4 crf) per placement.

## 3. New config

- `config/kie-models.yaml` — THE credit engine. Full Kie AI model catalog:
  - VIDEO: veo3, veo3-fast, kling (std/pro), runway-gen, hailuo/minimax, pixverse
  - IMAGE: flux (kontext/dev/pro), seedream, nano-banana (gemini image), gpt-image,
    imagen, ideogram (good text — note), midjourney-style
  - UPSCALE / restore: (topaz-class / model upscalers available on Kie)
  Each entry: strengths, weaknesses, max res, aspect support, ARABIC-TEXT ability
  (mostly poor → reinforces text-in-post), relative CREDIT COST, and a
  cost_tier tag (draft | iterate | final). Include a routing decision matrix:
  "for asset type X at stage Y, use model Z because …".
  NOTE: exact Kie credit prices drift — store RELATIVE cost tiers + a
  "verify current pricing at kie.ai before spend" flag, not hard invented prices.
- `config/creative-matrix.yaml` — default asset plans per objective
  (awareness / consideration / retargeting / conversion) × platform (Meta / TikTok
  / Snap) + a landing-page pack. Maps objective → which creative-matrix types,
  counts, ratios, priority.

## 4. New knowledge docs

- `knowledge/kie-credit-optimization.md` — the full playbook (the 10 policies in
  §5 below, worked with credit-math examples and a decision flowchart).
- `knowledge/static-ad-craft.md` — scroll-stopping static ad design for Gulf
  beauty (composition, color, focal, negative space, thumb-stop in feed).
- `knowledge/banner-systems.md` — responsive banner/design-system craft, IAB +
  Meta/TikTok/Snap placement specs, safe zones.
- `knowledge/3d-product-render.md` — photoreal CGI product-render craft: shaders
  for glass/oil/plastic, studio HDRI lighting, caustics, turntable.
- `knowledge/landing-page-media.md` — LP media craft: hero/section imagery,
  perf budget (webp/AVIF weights, lazy-load, LCP), background microvideo best
  practice (muted autoplay loop, poster, mp4+webm, mobile fallback), CLS-safe.

## 5. Kie credit-optimization policy (canonical — every skill enforces)

1. Reason fully before spending (inherited prime directive).
2. IMAGE-FIRST: lock the hero keyframe with a cheap/fast image model; only the
   APPROVED keyframe is animated (image→video). One video gen per approved hero.
3. TEXT IN POST: Arabic headline/CTA/price overlaid via typography-compositor,
   never generated by the model. Guarantees correct Arabic; kills the #1 cause of
   image regenerations.
4. ONE MASTER → MANY EXPORTS: one high-res master per concept; all ratios, banner
   sizes, placements are crop/recompose, not new generations.
5. DRAFT→FINAL GATING: iterate on draft tier (low res/steps/fast model) until
   QC ≥ 95; then ONE final-tier render or ONE upscale. Never iterate at final cost.
6. REFERENCE + SEED LOCK: reuse the product reference image + fixed seed across the
   whole set for one consistent bottle identity → fewer discards/regenerations.
7. BATCH SHARED-SCENE ASSETS: LP section images that share a look share style
   tokens and are produced as a batch.
8. SHORT LOOPABLE MICROVIDEO: LP motion = 3–5s seamless loops on fast/cheap video
   tier, not 8s hero renders.
9. UPSCALE, DON'T REGENERATE, for resolution.
10. SURFACE THE BILL: per-asset credit estimate + total campaign budget BEFORE any
    spend, each with a cheaper fallback route; QC gate (≥95) before any final spend.

## 6. Pipeline change

Insert Stage 0: CREATIVE MATRIX PLANNING (skill 30 + 31) that branches into
per-format sub-pipelines. The front half (intake → audience → strategy → concept
→ brand/product lock → cultural QA → negatives → QC gate) is SHARED across all
formats. Only the back half (director → prompt-compile → model route → credit
gate) is format-specific. Update SKILL.md + PIPELINE.md accordingly (post-run).

## 7. Flagship example additions (examples/mechat-red-oil/)

- `20-image-ad-set.md` — 3–5 static ad concepts + final image prompts + overlay specs
- `21-banner-set.md` — master + full multi-size system
- `22-3d-hero-render.md` — CGI packshot + scene render prompts
- `23-landing-asset-map.md` — every index.html slot → spec + prompt + integration wiring
- `24-microvideo-loops.md` — LP loop set (oil pour, shine, rotate) + prompts
- `25-kie-credit-plan.md` — total campaign credit budget, per-asset route, savings vs naive

## 7bis. PRODUCT REFERENCE LOCK v2 — THE #1 CONSTRAINT (supersedes Bible §4 text-lock)

User mandate (verbatim intent): the REAL product photos are the absolute ground
truth. Every image / video / 3D asset must reproduce the actual product EXACTLY —
dimensions, label, graphics, cap, color, seal — to the smallest detail, with NO
deviation. This must be STRUCTURAL + AUTOMATIC (the user must never manually verify
fidelity), and REPEATABLE across many future products with zero re-parameterization.

### 7bis.1 Core technique — NEVER describe the product in words for the model to redraw
Text can never reproduce a label. The product region is ALWAYS reference-conditioned
on the user's real photo, never text-to-image. Three routes, in fidelity order — the
format-router MUST choose one of these for ANY product-bearing asset:

R1. PRODUCT-REAL / WORLD-AI (DEFAULT for any product-hero asset)
    Keep the real packshot pixel-intact; AI generates ONLY the environment around it
    (background replacement + relight + contact shadows/reflections). Product never
    reinvented → guaranteed fidelity, usually cheapest too.
R2. REFERENCE-CONDITIONED EDIT (image-to-image / edit / inpaint)
    Feed the real photo as reference; product region preserved, scene regenerated.
    Models: Flux Kontext, Nano-Banana (Gemini image edit), Seedream/SeedEdit,
    GPT-image edit. Router must pick a reference-capable model — see kie-models.yaml.
R3. IMAGE-TO-VIDEO from an approved keyframe that already contains the real product.
    Veo3 / Kling / Runway animate the SCENE, never re-draw the bottle frame-by-frame.

Label rule (most fragile element): use edit/inpaint that preserves the label region,
OR composite the real flat label asset in post onto the generated bottle. Arabic copy
stays as post overlay (typography-compositor), never in-model. → exact label, no drift.

3D caveat (be honest): a rotating/turntable 3D banner needs MULTIPLE real angles in
references/ OR it will drift. If only a front photo exists, restrict to a small
label-face-on micro-move (route R3) and FLAG that more angles unlock full rotation.

### 7bis.2 Per-product registry (replaces the hardcoded single-product lock)
```
ai-ads-studio/products/<slug>/
  references/            ← user's REAL photos = ground truth (front,back,cap,label-macro,profile,...)
  product-lock.yaml      ← generated ONCE: measured spec, color hex, proportions, do-not-alter list
  fidelity-checklist.md  ← auto-QC checklist (every label element, cap, seal, proportions, color)
  reference-manifest.yaml← which reference image feeds which asset type / angle / route
```
Migrate the current mechat product here: `products/mechat-red-oil/` seeded from the
repo `/assets` photos (mechat-bottle-clean.webp, hero-product-fixed.webp). Bible §4
becomes a POINTER to products/mechat-red-oil/product-lock.yaml (single source, no dup).

### 7bis.3 Two new skills that remove manual verification
- `40-product-identity-onboarding` — input: references/ folder. Output: product-lock.yaml
  + fidelity-checklist.md. Run ONCE per product. Extracts measurable identity (proportions,
  color hex sampled from the photo, label element inventory, cap geometry) and the
  reference-manifest (best ref per asset/angle/route). This is the "study the real
  product" step — done once, reused by everything downstream.
- `41-product-fidelity-checker` — the AUTOMATIC QC gate. Compares every generated asset
  against references/ on the fidelity-checklist axes (label match, cap type, proportions,
  color ΔE, seal text presence/placement). Scores fidelity; auto-REJECTS below threshold
  and routes back to regenerate. THIS is what replaces the user checking by hand — it runs
  on every asset, every product, automatically. Fidelity is a hard gate axis (no ship if fail).

### 7bis.4 Router + kie-models obligations
- config/kie-models.yaml gains a `reference_modes` field per model: {t2i, i2i/edit, inpaint,
  subject-lock, i2v, bg-replace}. The router is FORBIDDEN from selecting a text-only (t2i)
  model for any asset whose subject is the product. Product assets require i2i/edit/i2v/bg.
- Every director skill (32,33,34,35,36) takes the product reference + route (R1/R2/R3) as a
  required input and emits prompts in reference-conditioned form (base image + edit
  instruction / keyframe + motion), NOT standalone text descriptions of the bottle.
- Pipeline: product-fidelity-checker (41) is a MANDATORY gate before any final-tier spend
  and after every render, for every format. Reference-lock is checked structurally, always.

### 7bis.5 Scales to many products with zero re-parameterization
New product = drop real photos into products/<slug>/references/ → run skill 40 once →
everything else (concept, formats, router, fidelity gate) is generic and reads the lock.
No per-product manual fidelity checks, ever — skill 41 does it automatically each run.

## 7ter. THREE MANDATED EXPANSIONS (owner directive)

### 7ter.A — VIDEO EDITING / POST-PRODUCTION DEPARTMENT (was missing)
The studio had shooting (camera/light/motion) but no EDIT/POST. Kie generates
clips; the ad is MADE in the edit. Add a post department (skills, ≥400 lines each):
- `50-video-editor` — assembly, cut points, structure, selects/ins-outs, the
  continuous single-take illusion across segments.
- `51-pacing-rhythm-director` — timing, beat, tension curve, music-sync, scroll-hold
  pacing for 8s vs 13–15s cuts.
- `52-colorist` — color grade, film emulation (LUT/print stocks), skin-tone accuracy,
  garnet/amber brand consistency, day/luxury mood; grade is a MAJOR "filmed-not-AI" lever.
- `53-sound-design-mixer` — foley, ambience, music bed, VO mix, ducking, master
  loudness (platform LUFS); silence vs impact.
- `54-motion-graphics-compositor` — Arabic overlays / lower-thirds / CTA / price /
  logo / end-card ANIMATION (works with 37-typography-compositor; text added in post).
- `55-finishing-delivery` — final assembly + per-platform exports (9:16 specs, codec,
  bitrate, captions, safe zones, thumbnail/poster), QC, filename/versioning.
- `56-continuity-match-cut-editor` — match cuts, continuity, motivated transitions so
  multi-clip ads still read as ONE movement.
NOTE: editing also fixes AI temporal tells (trim drift frames, stabilize, regrade to
unify). Post is where realism is finished, not just where clips are joined.

### 7ter.B — UNDETECTABLE REALISM ENGINE (push realism to the absolute limit)
Prime directive #1 is elevated: a viewer must NOT be able to tell it's AI — it must
read as FILMED IN REAL LIFE. Realism is no longer just hair/skin/environment/oil; it
is a full doctrine covering EVERY tell, human AND non-human, plus a detector gate.

New knowledge: `knowledge/undetectable-realism-doctrine.md` — the master anti-tell
bible. New skills:
- `42-optical-camera-realism-director` — the biggest tell. Real lens/sensor/body
  behavior: depth of field + real bokeh, motion blur, sensor grain/noise, chromatic
  aberration, lens breathing, vignette, handheld micro-shake, focus hunt/breathing,
  rolling shutter on fast pans, filmic highlight roll-off & exposure — NOT clinical
  digital perfection.
- `43-physics-materials-realism-director` — gravity, inertia, weight, fluid dynamics
  (the oil's viscosity/flow/caustics), cloth & hair dynamics, contact shadows, and
  correct material response for glass/plastic/skin/fabric/metal/liquid.
- `44-human-micro-realism-director` — extends 17. Micro-expressions; skin micro-detail
  (pores, peach fuzz, blemishes, redness, veins, subsurface scattering, sweat/sheen);
  eyes (catchlights, moisture, micro-saccades, asymmetry, pupil response); hands (right
  finger count, knuckles, nails); teeth (non-uniform); natural imperfect movement,
  blink cadence, breathing, weight/balance; DELIBERATE asymmetry & imperfection.
- `45-temporal-consistency-director` — video-specific: no frame-to-frame identity
  drift, flicker, texture-crawl, morphing, object-impermanence, background pop.
- `46-ai-tell-detector` — QC GATE that actively hunts the known artifacts and rejects:
  waxy/plastic skin, over-symmetry, dead/glassy eyes, extra/melting fingers, merged
  teeth, helmet hair/no flyaways, floaty weightless motion, mismatched shadows/
  reflections, floating objects, warping straight lines, impossible physics, over-clean
  sets, gibberish text, unnatural bokeh/no-DOF, no grain, no motion blur, temporal drift.
  Feeds an "undetectability" axis into skill 27; hard-fail if "obviously AI".
Doctrine principle: realism = adding the RIGHT imperfections (grain, asymmetry, wear,
handheld, dust, micro-motion) AND removing the AI tells. Perfect = fake; imperfect = real.

### 7ter.C — GENERIC PRODUCT/BRAND GUARDIAN (every product, not just the bottle)
The guardian + fidelity system must be PRODUCT-AGNOSTIC. Skills 22 (brand-guardian),
23 (product-consistency-guard) and 41 (product-fidelity-checker) must read the ACTIVE
`products/<slug>/product-lock.yaml` + `fidelity-checklist.md` — never hardcode the
mechat bottle. Any product the owner adds (drop photos → run skill 40) is guarded and
auto-verified identically. In v2, rewrite/patch 22 & 23 to load the active product-lock
(remove any mechat-specific hardcoding introduced during v1). The registry (§7bis) is
the generic backbone; 22/23/41 are its generic enforcers.

## 8. Execution sequencing (avoid session-limit + file races)

1. Let the running video workflow (wf_e132001c-eb5, Sonnet) FINISH. Do not launch
   a second workflow concurrently (shared session budget → limit risk).
2. On completion: verify 66 files landed; commit + push the video framework.
3. Fold this spec into STUDIO-BIBLE (§8 creative matrix, §9 kie-models/credit,
   §10 landing-page media, §11 v2 pipeline). ELEVATE §7bis product-lock: rewrite
   Bible §4 as a POINTER to products/mechat-red-oil/product-lock.yaml. Update
   SKILL.md + PIPELINE.md (add Stage 0 matrix planning + mandatory fidelity gate).
4. Write keystones myself: config/kie-models.yaml (+ reference_modes per model),
   config/creative-matrix.yaml, and seed products/mechat-red-oil/ (references
   manifest pointing at /assets photos, product-lock.yaml, fidelity-checklist.md).
5. Launch ONE Sonnet fan-out workflow for skills 30–38 + 40–41 (product onboarding
   + fidelity checker) + the 5 knowledge docs + the 6 example files (idempotent
   skip-guard, ≥400 lines each, read Bible §7bis first; product assets are always
   reference-conditioned, never t2i).
6. Commit + push. Present the full multi-format package + the credit plan +
   demonstrate the fidelity gate on the mechat example.
