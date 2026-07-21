# memory/ — Studio Memory (per-run logs + accumulated learnings)

> **What this folder is.** The studio's long-term brain. Every run drops a
> timestamped **run log** here, and a small set of **learning ledgers** distil
> those logs into reusable knowledge: which concepts converted, which Kie model
> settings actually produced filmed-not-AI results, and how real credit spend
> compared to the estimate the plan promised. The next run *reads memory before
> it reasons* so the studio gets cheaper, more realistic, and higher-converting
> the more it runs.
>
> Memory is **advisory, never authoritative.** When memory disagrees with
> [`STUDIO-BIBLE.md`](../STUDIO-BIBLE.md) or a product's
> [`product-lock.yaml`](../products/mechat-red-oil/product-lock.yaml), the Bible
> and the lock win. Memory records *what happened and what worked*; it never
> overrides a fact, a claim, a fidelity rule, or a quality gate. A learning is a
> prior, not a permission.

---

## Why memory exists

The three studio priorities — **Realism → Conversion → Cost** (Bible §0) — all
improve with feedback:

- **Realism** — the [`46-ai-tell-detector`](../skills/46-ai-tell-detector/) and
  [`41-product-fidelity-checker`](../skills/41-product-fidelity-checker/) gates
  reject assets that read as AI or drift from the real bottle. Memory records
  *which prompt/model/seed combinations passed on the first try* so future runs
  start from a known-clean recipe instead of rediscovering it.
- **Conversion** — winning hooks, angles, and concepts are logged with whatever
  performance signal comes back (thumb-stop, CTR, CVR, ROAS). The
  [`05-creative-concept-generator`](../skills/05-creative-concept-generator/) and
  [`06-hook-generator`](../skills/06-hook-generator/) read the winners ledger to
  bias new ideation toward what already sold Red Mechat oil in the Gulf.
- **Cost** — every run reconciles **estimated credits (from the plan) vs actual
  credits (what Kie charged)**. Systematic misses re-calibrate the credit engine
  ([`config/kie-models.yaml`](../config/kie-models.yaml),
  [`31-format-router`](../skills/31-format-router/),
  [`29-cost-optimizer`](../skills/29-cost-optimizer/)) so budgets stop lying.

Without memory, every run pays full price — in credits and in regenerations — to
relearn lessons the studio already paid for once.

---

## Layout

```
memory/
├── README.md                     ← you are here
├── runs/                         ← one immutable folder per studio run
│   └── <YYYY-MM-DD>-<slug>-<runid>/
│       ├── run.yaml              ← run header: product, objective, platforms, matrix
│       ├── decisions.md          ← the reasoning trail (concept, route, gate scores)
│       ├── credit-ledger.yaml    ← per-asset estimate vs actual, route taken, fallbacks
│       ├── gate-report.yaml      ← QC/realism/fidelity/culture scores per asset
│       └── prompts/              ← the exact compiled prompts + seeds that were sent
├── learnings/                    ← distilled, cross-run knowledge (the "brain")
│   ├── winning-concepts.yaml     ← concepts/hooks/angles that converted, per market
│   ├── model-recipes.yaml        ← model+settings+seed combos that passed gates first-try
│   ├── credit-actuals.yaml       ← estimate-vs-actual history → router calibration
│   ├── fidelity-notes.yaml       ← per-product reference/route notes (drift, label, angles)
│   └── anti-patterns.yaml        ← what failed and why (do-not-repeat register)
└── campaign/                     ← optional per-campaign rollups (spend, fatigue, refresh)
    └── <campaign>.yaml
```

- **`runs/` is append-only.** A run folder is written once and never edited —
  it is the audit trail. If a run is re-scored or corrected, add a new run
  folder; do not rewrite history.
- **`learnings/` is curated.** These files are *updated* each run: new winners
  appended, stale recipes retired, calibration re-fit. Keep them small and
  high-signal — a learning that never gets read is dead weight.

---

## `runs/` — the per-run log

**Written by** [`00-orchestrator`](../skills/00-orchestrator/) at run start and
finalised at run end; individual gate skills append their sections.

### `run.yaml` (header)
```yaml
run_id: 2026-07-21-mechat-red-oil-a1b2
product_slug: mechat-red-oil
product_lock: products/mechat-red-oil/product-lock.yaml   # the fidelity truth used
objective: conversion            # awareness | consideration | retargeting | conversion
platforms: [meta, tiktok, snap]
markets: [ksa, uae, oman, egypt] # primary: ksa
matrix:                          # from 30-creative-matrix-planner
  hero-video-ad: 1
  image-ad: 4
  banner: 6          # 1 master → 6 sizes (one master, many exports)
  lp-microvideo: 3
concept: "UNBROKEN THREAD — القطرة التي تُعيد الحياة"
started_at: 2026-07-21T09:14:00Z
finished_at: 2026-07-21T10:02:00Z
status: shipped                  # shipped | aborted | partial
```

### `credit-ledger.yaml` (the money log — the single most reused artifact)
```yaml
run_id: 2026-07-21-mechat-red-oil-a1b2
currency: kie_credits            # relative tiers; verify live pricing at kie.ai before spend
totals: { estimated: 118, actual: 104, delta_pct: -11.9 }
assets:
  - id: hero-01
    type: hero-video-ad
    route: R3                    # i2v from approved keyframe (bottle already real)
    model: veo3-fast             # draft tier for iterate, veo3 for final
    keyframe_model: flux-kontext # image-first: cheap keyframe locked before any video
    seed: 771342                 # reference+seed lock reused across the set
    estimated: 42
    actual: 40
    regenerations: 0             # gates passed pre-spend → one generation
    fallback_used: false
  - id: img-ad-03
    type: image-ad
    route: R1                    # product-real / world-AI (packshot pixel-intact)
    model: nano-banana           # reference-capable edit; NEVER t2i for the product
    text_in_post: true           # Arabic headline via 37-typography-compositor
    estimated: 6
    actual: 9                    # over: needed 1 relight redo
    regenerations: 1
    note: "background relight drifted warm; re-ran cooler. Log recipe fix."
```

### `gate-report.yaml`
Records the scores each asset earned at every hard gate so a shipped run proves
it cleared them, and a re-run can compare:
```yaml
assets:
  - id: hero-01
    realism: 96          # 27-quality-checker / 46-ai-tell-detector (>=95 to ship)
    fidelity: 99         # 41-product-fidelity-checker (label/cap/color ΔE/proportions)
    culture: pass        # 21-cultural-expert-gulf (anti-stereotype, modest, premium)
    conversion: 91       # 28-creative-scoring-engine (scroll-stop/hook/hold/CTA)
    verdict: ship
```

---

## `learnings/` — the accumulated brain

### `winning-concepts.yaml`
Read by concept/hook/strategy skills to bias ideation toward proven angles for
Gulf beauty. Only log a concept here once it has a real signal (a gate pass plus,
when available, live performance).
```yaml
- concept: "UNBROKEN THREAD — القطرة التي تُعيد الحياة"
  product_slug: mechat-red-oil
  angle: heritage-trust + pain-first (hair loss on the pillow → density restored)
  market: ksa
  platform: tiktok
  hook_line_ar: "القطرة التي تُعيد الحياة"   # al-qaṭra allatī tuʿīd al-ḥayāt
  hook_type: problem-agitate (shedding in the comb) then grandmothers'-recipe payoff
  signal: { thumbstop: 0.34, ctr: 0.021, cvr: 0.034, roas: 3.1 }   # if returned
  why_it_worked: "authenticity + modest premium framing beat glossy-hair generic; garnet oil pour was the hold moment"
  reuse: "keep heritage frame; rotate the pain visual to avoid fatigue"
```

### `model-recipes.yaml`
The realism + cost shortcut. A recipe is a model + settings + seed + route that
**passed the realism and fidelity gates on the first attempt** for a given asset
type. Future runs start here instead of paying for rediscovery.
```yaml
- asset_type: hero-video-ad
  route: R3
  keyframe: { model: flux-kontext, tier: draft, seed_locked: true }
  video: { model: veo3, tier: final, motion: "slow garnet oil pour, macro shine sweep" }
  realism_addons: [sensor-grain, motion-blur, shallow-DOF-real-bokeh, handheld-micro-shake]
  passed_gates_first_try: true
  notes: "veo3-fast for iterate, ONE veo3 final render. No frame-drift on <=8s cuts."
- asset_type: image-ad
  route: R1
  model: nano-banana
  settings: { edit: bg-replace, relight: cool-neutral, contact-shadow: true }
  text_in_post: true
  notes: "warm relight tends to shift the amber oil hue; force cool-neutral then grade."
```

### `credit-actuals.yaml`
The router's calibration feedback. Aggregates estimate-vs-actual so
[`31-format-router`](../skills/31-format-router/) and
[`config/kie-models.yaml`](../config/kie-models.yaml) tiers reflect reality, not
guesses. Kie pricing drifts — this file is *relative* history plus a re-verify flag.
```yaml
by_route:
  R1: { runs: 12, est_avg: 6,  act_avg: 7,  bias: +0.17, note: "relight redos underestimated" }
  R2: { runs: 8,  est_avg: 11, act_avg: 11, bias: 0.0 }
  R3: { runs: 9,  est_avg: 40, act_avg: 39, bias: -0.02, note: "image-first keeps video to one gen" }
by_model:
  veo3:        { est_tier: final, actual_credits_relative: high,   verify_at: kie.ai }
  veo3-fast:   { est_tier: iterate, actual_credits_relative: mid }
  flux-kontext:{ est_tier: draft, actual_credits_relative: low }
  nano-banana: { est_tier: draft, actual_credits_relative: low }
calibration_action: "bump R1 estimate +1 credit for relight buffer; keep R3 as-is"
```

### `fidelity-notes.yaml`
Per-product reference/route memory so the fidelity gate gets easier over time.
```yaml
mechat-red-oil:
  best_route_default: R1              # packshot pixel-intact wins for the garnet bottle
  label_handling: "composite real flat label in post; never let the model redraw Arabic"
  color_watch: "garnet oil ΔE creeps warm under AI relight → force cool-neutral key"
  rotation_blocked: true             # only a front photo in references/ → no full turntable
  unlock: "add back + profile + cap-macro angles to references/ for lp-3d-banner rotation"
```

### `anti-patterns.yaml`
The do-not-repeat register. Every hard-fail or expensive mistake lands here.
```yaml
- pattern: "sending Arabic headline text into the image model"
  cost: "3 regenerations, gibberish label text"
  rule: "ALWAYS text-in-post via 37-typography-compositor (Bible §7bis, V2 policy #3)"
- pattern: "iterating at final tier"
  cost: "burned veo3 credits refining what draft could have caught"
  rule: "iterate on draft/fast until QC>=95, then ONE final render (V2 policy #5)"
- pattern: "regenerating per banner size"
  cost: "6x the credits for one visual"
  rule: "one master -> many exports; sizes are crop/recompose (V2 policy #4)"
```

---

## How a run uses memory (the feedback loop)

1. **Before reasoning** — `00-orchestrator` loads `learnings/` for the active
   product: winning concepts seed ideation, model-recipes seed the router,
   credit-actuals correct the budget, fidelity-notes pre-arm the fidelity gate,
   anti-patterns are injected as hard "don't" constraints.
2. **During the run** — each stage writes into the current `runs/<id>/` folder:
   decisions, compiled prompts + seeds, gate scores, and the live credit ledger.
3. **At close** — the orchestrator reconciles **estimated vs actual** credits,
   promotes any first-try gate-passing recipe into `model-recipes.yaml`, appends
   proven concepts to `winning-concepts.yaml`, files any failure into
   `anti-patterns.yaml`, and re-fits `credit-actuals.yaml`.
4. **Later, with performance data** — when live metrics come back (thumb-stop,
   CTR, CVR, ROAS), attach them to the concept's `signal` block so the *converted*
   winners outrank the merely *gate-passing* ones.

---

## Writing & hygiene rules

- **Never invent product facts here.** Memory logs outcomes and settings, not
  claims. Product truth lives only in the Bible and `product-lock.yaml`.
- **Runs are immutable; learnings are curated.** Correct the future by updating
  `learnings/`, never by editing a past run folder.
- **Keep learnings small and read.** Retire stale recipes and fatigued concepts.
  A ledger nobody reads earns no cost savings and should be pruned.
- **Relative credits, not invented prices.** Kie pricing drifts — store tiers
  (draft/iterate/final) and a `verify_at: kie.ai` flag, per V2 §3.
- **Product-agnostic.** These schemas are keyed by `product_slug`; any product
  onboarded via [`40-product-identity-onboarding`](../skills/40-product-identity-onboarding/)
  accumulates its own memory with zero re-parameterization.
- **No PII, no secrets.** Only creative, model, and credit data — never customer
  data, account tokens, or Kie API keys.
- **Redact nothing that proves a gate.** Gate scores are the audit trail that a
  shipped asset cleared realism, fidelity, and culture — keep them intact.

---

*Memory makes the studio compound. Each run pays once for a lesson; every run
after gets it for free.*
