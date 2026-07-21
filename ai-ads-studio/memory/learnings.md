# memory/learnings.md — Accumulated Cross-Run Learnings (the studio's narrative brain)

> **What this file is.** The human-readable companion to the machine ledgers in
> [`memory/learnings/`](./learnings/) (`winning-concepts.yaml`,
> `model-recipes.yaml`, `credit-actuals.yaml`, `fidelity-notes.yaml`,
> `anti-patterns.yaml`). The YAML files are what the pipeline *parses*; this file
> is what a human — or an orchestrator reasoning in prose — *reads to understand
> why*. Every entry here is a distilled lesson: what we learned, the evidence,
> and the concrete change it drives in a skill, gate, config, or route.
>
> **Authority.** Advisory, never authoritative (memory/README.md). When a
> learning disagrees with [`STUDIO-BIBLE.md`](../STUDIO-BIBLE.md), the V2 addendum,
> or a product's [`product-lock.yaml`](../products/mechat-red-oil/product-lock.yaml),
> the Bible and the lock win. A learning is a **prior, not a permission**. It can
> bias ideation, seed the router, and pre-arm a gate — it can never override a
> product claim, a fidelity rule, or a quality threshold.
>
> **Product-agnostic.** Entries are tagged with `product:` (`mechat-red-oil` or
> `*` for all-product craft). A new product onboarded via
> [`40-product-identity-onboarding`](../skills/40-product-identity-onboarding/)
> accumulates its own tagged entries with zero re-parameterization. Nothing here
> hardcodes the mechat bottle as a global truth — bottle specifics live only in
> its lock.

---

## How to read and write an entry

Each learning uses this shape. Keep them short, evidenced, and actionable — a
learning nobody reads earns no savings and should be pruned.

```
### L-NNNN — <one-line title>
- **category:** realism | conversion | cost | fidelity | culture | craft | process
- **product:** mechat-red-oil | *            (* = applies to every product)
- **status:** seed | validated | retired      (seed = best-practice prior, no run signal yet)
- **learning:** the lesson in one or two sentences.
- **evidence:** the run(s) / gate scores / signal that support it (or "prior" for seeds).
- **action:** the concrete change — which skill/gate/config/route it biases.
- **refs:** Bible §, V2 §, skill numbers, ledger file.
```

- **Seeds vs validated.** Everything below is seeded `status: seed` — these are
  best-practice priors written before the first live run so the studio does not
  start cold. The moment a real run produces a gate pass or a performance signal,
  promote the relevant entry to `validated` and attach the run id + numbers.
- **Retire, don't delete.** When a lesson is superseded (a concept fatigues, a
  model is deprecated, a route is beaten), mark it `retired` with a pointer to
  what replaced it. History stays legible; the active brain stays small.
- **One source of numbers.** Credit and gate numbers are *quoted* here but *owned*
  by the YAML ledgers. If they disagree, the YAML wins; fix the prose.

---

## COST — the credit engine (V2 §5 policies)

### L-0001 — Image-first is the single biggest credit saver
- **category:** cost
- **product:** *
- **status:** seed
- **learning:** Lock the hero keyframe on a cheap/fast image tier, gate it, and
  only animate the ONE approved frame (route R3). A hero video generated directly
  costs the most and hides its flaws until after you have paid for motion.
- **evidence:** prior (V2 policy #2). Structurally: one video gen per approved hero.
- **action:** [`31-format-router`](../skills/31-format-router/) defaults product
  heroes to image→video; [`30-creative-matrix-planner`](../skills/30-creative-matrix-planner/)
  budgets a draft keyframe line before any video line.
- **refs:** Bible §0, V2 §5.2; `model-recipes.yaml`.

### L-0002 — Iterate on draft tier, spend once at final
- **category:** cost
- **product:** *
- **status:** seed
- **learning:** All iteration happens on draft/fast tier (low res/steps, `veo3-fast`,
  `flux-kontext` draft) until QC ≥ 95; then exactly ONE final render or ONE upscale.
  Refining at final tier burns premium credits on problems a draft would have caught.
- **evidence:** prior (V2 policy #5). Filed pre-emptively in `anti-patterns.yaml`
  as "iterating at final tier".
- **action:** draft→final gate in the router; [`38-upscale-finisher`](../skills/38-upscale-finisher/)
  owns the single final step; [`27-quality-checker`](../skills/27-quality-checker/) gates before it.
- **refs:** V2 §5.5; `credit-actuals.yaml`.

### L-0003 — One master → many exports; never regenerate per size or ratio
- **category:** cost
- **product:** *
- **status:** seed
- **learning:** A banner set (feed 1080², story 1080×1920, IAB 300×250 / 728×90 /
  160×600 / 320×50) and every aspect ratio come from crop/recompose of ONE approved
  master, not from N generations. Per-size regeneration multiplies credits for one visual.
- **evidence:** prior (V2 policy #4); pre-filed anti-pattern "regenerating per banner size".
- **action:** [`33-banner-systems-designer`](../skills/33-banner-systems-designer/)
  produces the size system from a single master; router refuses per-size gen lines.
- **refs:** V2 §5.4, §7 (`21-banner-set.md`).

### L-0004 — Surface the whole bill before any spend, with a cheaper fallback per asset
- **category:** cost / process
- **product:** *
- **status:** seed
- **learning:** No production starts without an approved asset plan that shows a
  per-asset credit estimate, a total, AND a cheaper fallback route for each line.
  The gate (QC ≥ 95) sits before every final-tier spend.
- **evidence:** prior (V2 policy #10). The planner is a hard gate, not a suggestion.
- **action:** planner emits the budget table; nothing downstream spends until it is green.
- **refs:** V2 §5.10, §7 (`25-kie-credit-plan.md`); `credit-actuals.yaml`.

### L-0005 — Kie prices drift — store relative tiers plus a re-verify flag, never invented numbers
- **category:** cost
- **product:** *
- **status:** seed
- **learning:** Record cost as tiers (`draft` | `iterate` | `final`) and relative
  magnitude (low/mid/high), with `verify_at: kie.ai` before spend. Hard-coded credit
  prices go stale and make budgets lie.
- **evidence:** prior (V2 §3 NOTE). `credit-actuals.yaml` is relative history + a flag.
- **action:** [`config/kie-models.yaml`](../config/kie-models.yaml) tiers, not prices;
  planner reads tiers and stamps the verify flag on the budget.
- **refs:** V2 §3, §5.

---

## FIDELITY — the product is ground truth (Bible §7bis)

### L-0006 — Never let a model redraw the product; always reference-condition (R1/R2/R3)
- **category:** fidelity
- **product:** *
- **status:** seed
- **learning:** Any product-bearing asset is reference-conditioned on the real
  photo — R1 (product-real / world-AI, packshot pixel-intact) by default, R2
  (reference-conditioned edit), or R3 (image→video from a real-product keyframe).
  Text-to-image of the product is forbidden — text cannot reproduce a label.
- **evidence:** prior (Bible §7bis.1); the router is *structurally* barred from t2i
  for product subjects.
- **action:** router requires a `reference_modes` match; every director skill
  (32–36) takes the reference + route as required input; [`41-product-fidelity-checker`](../skills/41-product-fidelity-checker/)
  auto-rejects drift below threshold.
- **refs:** Bible §7bis.1/§7bis.4; `fidelity-notes.yaml`.

### L-0007 — Composite the real flat label in post; never let the model draw the Arabic label
- **category:** fidelity
- **product:** mechat-red-oil
- **status:** seed
- **learning:** The label is the most fragile element. Preserve the label region
  via edit/inpaint, or composite the real flat label asset in post onto the
  generated bottle. The garnet «زيت المشاط الأحمر» wordmark, the gold "طبيعي 100%"
  seal, and the three tagline lines must match the lock exactly.
- **evidence:** prior (Bible §7bis.1 label rule); pre-filed in `fidelity-notes.yaml`
  under `mechat-red-oil.label_handling`.
- **action:** R1/R2 preserve label pixels; [`37-typography-compositor`](../skills/37-typography-compositor/)
  and [`54-motion-graphics-compositor`](../skills/54-motion-graphics-compositor/) handle any ad copy.
- **refs:** Bible §4 (label lock), §7bis.1; `products/mechat-red-oil/fidelity-checklist.md`.

### L-0008 — Guard the garnet: AI relight creeps the oil warm — force a cool-neutral key
- **category:** fidelity / realism
- **product:** mechat-red-oil
- **status:** seed
- **learning:** Under AI background-relight the translucent garnet/ruby oil tends to
  shift toward orange/amber. Force a cool-neutral key light, then re-grade to the
  locked garnet; fidelity gate scores color on ΔE, so a warm drift fails.
- **evidence:** prior; pre-filed `fidelity-notes.yaml` color_watch + `anti-patterns.yaml`.
- **action:** R1 relight preset = cool-neutral; [`52-colorist`](../skills/52-colorist/)
  unifies to garnet; fidelity gate ΔE axis catches residual drift.
- **refs:** Bible §4 (liquid never shifts to orange/brown/pink), §7bis.3.

### L-0009 — Front-photo-only products cannot do a full turntable — restrict, then flag the unlock
- **category:** fidelity
- **product:** mechat-red-oil
- **status:** seed
- **learning:** A rotating `lp-3d-banner` needs multiple real angles in `references/`
  or the label drifts on the hidden faces. With only a front photo, restrict motion
  to a small label-face-on micro-move (R3) and surface the unlock, don't fake it.
- **evidence:** prior (Bible §7bis.1 3D caveat); `fidelity-notes.yaml.rotation_blocked: true`.
- **action:** [`34-3d-render-director`](../skills/34-3d-render-director/) and
  [`36-microvideo-director`](../skills/36-microvideo-director/) cap rotation until
  back/profile/cap-macro angles are added to `references/`.
- **refs:** Bible §7bis.1; `reference-manifest.yaml`.

---

## REALISM — filmed, not generated (V2 §7ter.B)

### L-0010 — Realism = adding the RIGHT imperfections AND removing the AI tells
- **category:** realism
- **product:** *
- **status:** seed
- **learning:** Perfect reads as fake. Add sensor grain, real bokeh + shallow DOF,
  motion blur, handheld micro-shake, asymmetry, flyaways, dust and wear — and remove
  the known tells (waxy skin, over-symmetry, dead eyes, extra/melting fingers, merged
  teeth, helmet hair, floaty motion, mismatched shadows, gibberish text, no-grain).
- **evidence:** prior (V2 §7ter.B doctrine principle).
- **action:** realism add-on stack in `model-recipes.yaml`;
  [`42-optical-camera-realism-director`](../skills/42-optical-camera-realism-director/),
  [`44-human-micro-realism-director`](../skills/44-human-micro-realism-director/), and
  the [`46-ai-tell-detector`](../skills/46-ai-tell-detector/) hard gate.
- **refs:** V2 §7ter.B; `knowledge/undetectable-realism-doctrine.md`.

### L-0011 — Optical/camera behavior is the biggest single tell — grade and lens it, don't leave it clinical
- **category:** realism
- **product:** *
- **status:** seed
- **learning:** The fastest "obviously AI" flag is clinical digital perfection: no
  DOF, no grain, no motion blur, no highlight roll-off. Specify real lens/sensor
  behavior in-prompt and finish it in the grade — the grade is a major filmed-not-AI lever.
- **evidence:** prior (V2 §7ter.B skill 42; §7ter.A colorist note).
- **action:** camera-realism prompt block on every render;
  [`52-colorist`](../skills/52-colorist/) applies film emulation + skin-tone accuracy
  and unifies garnet/amber brand consistency.
- **refs:** V2 §7ter.A/B.

### L-0012 — Video: budget for temporal tells; short cuts drift less
- **category:** realism
- **product:** *
- **status:** seed
- **learning:** Frame-to-frame identity drift, flicker, texture-crawl and morphing
  rise with clip length; ≤8s cuts on the hero route stayed clean in the seeded recipe.
  The edit finishes realism — trim drift frames, stabilize, regrade to unify.
- **evidence:** prior; `model-recipes.yaml` note "no frame-drift on ≤8s cuts".
- **action:** [`45-temporal-consistency-director`](../skills/45-temporal-consistency-director/)
  gate; [`50-video-editor`](../skills/50-video-editor/) and
  [`56-continuity-match-cut-editor`](../skills/56-continuity-match-cut-editor/) hide seams.
- **refs:** V2 §7ter.A/B.

---

## CONVERSION — scroll-stop, hook, hold (Gulf beauty hair-oil)

### L-0013 — Pain-first, heritage-payoff beats glossy-generic for Gulf hair-oil
- **category:** conversion
- **product:** mechat-red-oil
- **status:** seed
- **learning:** Open on the real pain (shedding in the comb / on the pillow, widening
  part), then pay it off with the grandmothers'-recipe / heritage-trust frame. This
  out-converts a generic glossy-hair beauty open for this audience.
- **evidence:** prior; seeded concept "UNBROKEN THREAD — القطرة التي تُعيد الحياة" in
  `winning-concepts.yaml` (promote to validated on first real signal).
- **action:** biases [`05-creative-concept-generator`](../skills/05-creative-concept-generator/)
  and [`06-hook-generator`](../skills/06-hook-generator/) toward problem-agitate → heritage payoff.
- **refs:** Bible §3 (pain points / emotional benefits), §5; `winning-concepts.yaml`.

### L-0014 — The garnet oil pour is the hold moment — make it the hero macro beat
- **category:** conversion / craft
- **product:** mechat-red-oil
- **status:** seed
- **learning:** The single most watch-holding frame is the slow, viscous garnet oil
  pour / macro shine sweep. Reserve it as the mid-video hold and the packshot payoff;
  it also showcases the jewel-like translucency that separates the product visually.
- **evidence:** prior; seeded in `winning-concepts.yaml.why_it_worked` and `model-recipes.yaml` motion.
- **action:** [`08-storyboard-director`](../skills/08-storyboard-director/) places the
  pour as the hold; [`43-physics-materials-realism-director`](../skills/43-physics-materials-realism-director/)
  gets viscosity/caustics right.
- **refs:** Bible §4 (liquid), §6; `24-microvideo-loops.md`.

### L-0015 — Claim discipline is a conversion asset, not a constraint
- **category:** conversion / culture
- **product:** mechat-red-oil
- **status:** seed
- **learning:** Never exceed the locked benefit claims (stops shedding first weeks;
  stimulates growth; density & length with 2–3×/week; shine from first use). Honest,
  timeline-specific promises (softness first use, less shedding 3–5 weeks, density
  2–3 months) build the COD trust that actually closes cash-on-delivery buyers.
- **evidence:** prior (Bible §3 claims + FAQ timelines).
- **action:** [`22-brand-guardian`](../skills/22-brand-guardian/) reads the active
  product-lock and rejects invented/exceeded claims; [`20-arabic-copywriter`](../skills/20-arabic-copywriter/)
  writes to the locked timeline.
- **refs:** Bible §3 (claims, objections), §7ter.C (generic guardian).

---

## CULTURE — Gulf-first, anti-stereotype (Bible §5)

### L-0016 — Modest, premium, restrained — hair is the hero, not the body
- **category:** culture
- **product:** *
- **status:** seed
- **learning:** Show beauty with restraint and taste: luxurious hair texture,
  movement, macro, silhouette, a tasteful over-the-shoulder reveal. Model reads
  refined, warm-toned, natural "no-makeup" makeup, calm confidence — never
  provocative. This is a hard culture gate, not a style preference.
- **evidence:** prior (Bible §5; anti-stereotype norms).
- **action:** [`21-cultural-expert-gulf`](../skills/21-cultural-expert-gulf/) pass/fail
  gate; wardrobe in cream/garnet/gold modest drape; heritage-Gulf interiors.
- **refs:** Bible §5; `knowledge/gulf-beauty-brand-norms.md`.

### L-0017 — Arabic is elegant MSA (فصحى), and it goes on in POST — never in-model
- **category:** culture / cost / craft
- **product:** *
- **status:** seed
- **learning:** All overlay/VO Arabic is correct, premium Modern Standard Arabic with
  Latin transliteration + English gloss on first use, typeset in post (El Messiri
  display / Tajawal body, RTL). Sending Arabic to the image model produces gibberish
  and is the #1 cause of image regenerations.
- **evidence:** prior; pre-filed `anti-patterns.yaml` "sending Arabic headline text into the image model".
- **action:** [`37-typography-compositor`](../skills/37-typography-compositor/) owns
  static/LP text; [`54-motion-graphics-compositor`](../skills/54-motion-graphics-compositor/)
  owns animated overlays; router stamps `text_in_post: true`.
- **refs:** Bible §2 (Arabic), §7bis.1; V2 §5.3.

---

## PROCESS — how memory compounds

### L-0018 — Read memory before you reason; promote seeds to validated on first signal
- **category:** process
- **product:** *
- **status:** seed
- **learning:** `00-orchestrator` loads `learnings/` for the active product before
  ideation — winners seed concepts, recipes seed the router, credit-actuals correct
  the budget, fidelity-notes pre-arm the gate, anti-patterns inject hard "don'ts".
  Every seed above becomes `validated` (with run id + gate scores + signal) the first
  time a real run confirms it, and `retired` when beaten.
- **evidence:** prior (memory/README.md feedback loop).
- **action:** on run close, promote first-try gate-passing recipes into
  `model-recipes.yaml`, proven concepts into `winning-concepts.yaml`, failures into
  `anti-patterns.yaml`, and re-fit `credit-actuals.yaml`; mirror the human-readable
  distillation back into this file.
- **refs:** memory/README.md ("How a run uses memory"); [`29-cost-optimizer`](../skills/29-cost-optimizer/).

---

*Seeded 2026-07-21 with best-practice priors for Gulf beauty hair-oil ads. These
are starting biases, not results — the first live run begins converting seeds into
validated, evidenced learnings.*
