# Run Log — `<YYYY-MM-DD>-<product-slug>-<runid>`

> **What this is.** The single human-readable log for ONE studio run. Copy this
> file to `memory/runs/<YYYY-MM-DD>-<slug>-<runid>/run-log.md` at run start, fill
> it as the pipeline advances, and finalise it at close. It is the narrative
> companion to the machine files in the same folder (`run.yaml`,
> `credit-ledger.yaml`, `gate-report.yaml`, `prompts/`) — see
> [`memory/README.md`](./README.md). When this log and those YAML files disagree,
> **the YAML files win** (they are what the tools read); this log explains *why*.
>
> **Immutability.** A `runs/` folder is written once and never edited after close
> (README "runs are append-only"). If you re-score or correct a run, open a NEW
> run folder — do not rewrite history here.
>
> **Authority.** Memory is advisory. When anything below disagrees with
> [`STUDIO-BIBLE.md`](../STUDIO-BIBLE.md), the V2 addendum, or the active
> [`product-lock.yaml`](../products/mechat-red-oil/product-lock.yaml), the Bible
> and the lock win. A learning is a prior, not a permission.
>
> **How to fill.** Replace every `<...>` and `{{...}}`. Delete rows/sections that
> do not apply. Keep the fenced YAML blocks parseable — they mirror the schemas in
> `README.md` so this log can be diffed against the machine ledgers.

---

## 0. Run header

```yaml
run_id:        <YYYY-MM-DD>-<slug>-<runid>     # e.g. 2026-07-21-mechat-red-oil-a1b2
product_slug:  <slug>                          # active products/<slug>/  (NEVER hardcode mechat)
product_lock:  products/<slug>/product-lock.yaml   # the fidelity truth used this run
marketing_name_ar: "<from product-lock meta.marketing_name_ar>"
objective:     <awareness | consideration | retargeting | conversion>
platforms:     [<meta>, <tiktok>, <snap>]
markets:       [<ksa>, <uae>, <oman>, <egypt>]     # note primary below
primary_market: <ksa>
operator:      <who ran it>
started_at:    <YYYY-MM-DDThh:mm:ssZ>
finished_at:   <YYYY-MM-DDThh:mm:ssZ>
status:        <shipped | partial | aborted>
```

**One-line summary:** `<what this run produced, in one sentence>`

---

## 1. Memory loaded before reasoning (the prior)

_What `00-orchestrator` pulled from `learnings/` for `<slug>` BEFORE spending any
reasoning (README feedback loop step 1). This is the head-start; §8 records what
we hand back._

| ledger | what it told us | did we honour it? |
|--------|-----------------|-------------------|
| `winning-concepts.yaml` | `<proven angle/hook seeded into ideation>` | `<yes/adapted/overrode — why>` |
| `model-recipes.yaml`    | `<first-try recipe the router started from>` | `<used as-is / changed>` |
| `credit-actuals.yaml`   | `<route bias applied to the budget, e.g. R1 +1>` | `<applied>` |
| `fidelity-notes.yaml`   | `<best_route_default, label handling, color watch>` | `<pre-armed the gate>` |
| `anti-patterns.yaml`    | `<hard "don't" injected as a constraint>` | `<enforced>` |

---

## 2. Creative Matrix plan (Stage 0 — skills 30 + 31)

_From `30-creative-matrix-planner` + `31-format-router`. No production starts
without an approved plan + budget (V2 §2 gate)._

**Concept shipped into production:** `<CONCEPT NAME — العنوان بالعربي>`
**Angle / positioning:** `<e.g. heritage-trust + pain-first: shedding on the pillow → density restored>`
**Plan approved by:** `<name>` at `<time>`   |   **Approved? ** `<yes/no>`

```yaml
matrix:                          # asset type -> count (from 30-creative-matrix-planner)
  hero-video-ad:  <1>
  image-ad:       <4>
  banner:         <6>            # 1 MASTER -> N sizes (V2 policy #4: one master, many exports)
  3d-render:      <0>
  lp-hero-image:  <1>
  lp-section-image: <0>
  lp-3d-banner:   <0>
  lp-microvideo:  <3>            # 3-5s seamless loops, fast tier (V2 policy #8)
priority_order: [<hero-video-ad>, <image-ad>, <banner>, <lp-microvideo>]
shared_front_half: [intake, audience, strategy, concept, brand-lock, product-lock, cultural-qa, negatives, qc-gate]
```

---

## 3. Product fidelity setup (§7bis — the #1 constraint)

_The product is ALWAYS reference-conditioned (R1/R2/R3). NEVER text-to-image of
the product. Arabic label copy is composited in POST, never generated in-model._

- **Canonical reference:** `products/<slug>/references/<file>`  (ground truth)
- **Reference manifest used:** `products/<slug>/reference-manifest.yaml`
- **Default route this run:** `<R1 product-real/world-AI | R2 reference-edit | R3 image-to-video>`
- **Label handling:** `<composite real flat label in post | edit/inpaint preserving label region>`
- **On-label name locked:** `<product-lock meta.on_label_name_ar — e.g. زيت المشاط للشعر>`
  _(Ads COPY may say the marketing name; the physical LABEL must NOT be repainted.
  For mechat: never paint «الأحمر» onto the vessel — redness lives in overlay/voice.)_
- **Rotation status:** `<blocked: front photo only → micro-move R3 | unlocked: multi-angle refs present>`

---

## 4. Models, routes & seeds (what was actually sent)

_Mirror of `prompts/` + the ledger's per-asset routing. Reference + seed LOCKED
across the set for one bottle identity (V2 policy #6). Exact compiled prompts live
in `runs/<id>/prompts/` — do not paste full prompts here, reference the filename._

| asset id | type | route | keyframe model (image-first) | video/final model | seed | tier flow | text-in-post | prompt file |
|----------|------|-------|------------------------------|-------------------|------|-----------|--------------|-------------|
| `<hero-01>`  | hero-video-ad | `<R3>` | `<flux-kontext>` | `<veo3-fast → veo3>` | `<771342>` | draft→final | `<yes>` | `prompts/hero-01.txt` |
| `<img-ad-03>`| image-ad      | `<R1>` | `<nano-banana>`  | `<— / upscale>`      | `<771342>` | draft→upscale | `<yes>` | `prompts/img-ad-03.txt` |
| `<ban-master>`| banner       | `<R1>` | `<seedream>`     | `<— / 6 exports>`    | `<771342>` | master→exports | `<yes>` | `prompts/ban-master.txt` |
| `<mv-pour>`  | lp-microvideo | `<R3>` | `<locked keyframe>` | `<kling-std / pixverse>` | `<771342>` | fast loop | n/a | `prompts/mv-pour.txt` |

**Seed lock note:** `<one seed reused across all product-bearing assets? deviations + why>`
**Model catalog referenced:** [`config/kie-models.yaml`](../config/kie-models.yaml)

---

## 5. Credit estimate vs actual (the money log)

_Reconciled at close against `credit-ledger.yaml`. Relative Kie credit tiers —
verify live pricing at **kie.ai** before spend (V2 §3). Surface the bill BEFORE
spending; QC gate (≥95) before any FINAL spend (V2 policy #10)._

```yaml
totals:
  estimated:  <118>
  actual:     <104>
  delta_pct:  <-11.9>            # (actual-estimated)/estimated * 100
  currency:   kie_credits
  verify_at:  kie.ai
per_asset:
  - id: <hero-01>   estimated: <42> actual: <40> regenerations: <0> fallback_used: <false>
  - id: <img-ad-03> estimated: <6>  actual: <9>  regenerations: <1> fallback_used: <false>
      note: "<background relight drifted warm; re-ran cool-neutral>"
  - id: <ban-master> estimated: <8> actual: <8>  regenerations: <0> fallback_used: <false>
  - id: <mv-pour>   estimated: <5>  actual: <5>  regenerations: <0> fallback_used: <false>
```

**Where the delta came from:** `<over/under drivers — relight redos, a fallback route, a clean first-try>`
**Savings vs naive (no image-first / per-size regen):** `<estimate the credits the policies saved>`
**Router calibration to file:** `<e.g. bump R1 estimate +1 for relight buffer → credit-actuals.yaml>`

---

## 6. Quality gates (must be green before ship)

_Scores per asset from the gate skills. Realism ≥ 95 and fidelity clear are HARD
gates (README). Mirror of `gate-report.yaml`._

| asset id | realism ≥95 (27/46) | fidelity (41, ΔE/label/cap/proportions) | culture (21) | conversion (28) | verdict |
|----------|--------------------|------------------------------------------|--------------|-----------------|---------|
| `<hero-01>`   | `<96>` | `<99>` | `<pass>` | `<91>` | `<ship>` |
| `<img-ad-03>` | `<95>` | `<98>` | `<pass>` | `<88>` | `<ship>` |
| `<ban-master>`| `<97>` | `<99>` | `<pass>` | `<—>`  | `<ship>` |
| `<mv-pour>`   | `<95>` | `<99>` | `<pass>` | `<—>`  | `<ship>` |

**AI-tell checklist:** [`quality/ai-tell-checklist.md`](../quality/ai-tell-checklist.md) → `<clean / flags fixed>`
**Product-fidelity gate:** [`quality/product-fidelity-gate.md`](../quality/product-fidelity-gate.md) → `<pass>`
**Culture/anti-stereotype:** [`knowledge/gulf-beauty-brand-norms.md`](../knowledge/gulf-beauty-brand-norms.md) → `<modest, premium, no stereotype>`
**Any waiver granted?** `<none | which gate, who approved, why>`

---

## 7. What shipped

| asset id | deliverable | ratio / size | export | file under /assets or /out | placement |
|----------|-------------|--------------|--------|----------------------------|-----------|
| `<hero-01>`   | hero video ad | 9:16 | mp4 | `<path>` | `<Meta Reels / TikTok / Snap>` |
| `<img-ad-03>` | static image ad | 4:5, 1:1, 9:16 | webp | `<path>` | `<Meta feed>` |
| `<ban-master>`| banner system | feed 1080² · story 1080×1920 · 300×250 · 728×90 · 160×600 · 320×50 | webp/png | `<path>` | `<display / retargeting>` |
| `<mv-pour>`   | LP microvideo loop | 9:16 | mp4+webm | `<path>` | `<landing hero/section>` |

**Arabic overlays applied in post (37-typography-compositor):**
- `<line_ar>`  —  *`<translit>`*  ("`<english gloss>`")  → `<overlay zone>`
- Price/number handling (LTR): `<e.g. 139 SAR was 185 SAR, −25%, COD, free shipping>`

**Landing-page integration (if lp-* assets):** `<slot → filename → <img>/<video>/CSS wiring>`
**A/B plan / variants live:** `<which axis is being tested — hook, angle, thumbnail>`

---

## 8. Learnings to promote back (feedback loop, README step 3)

_At close the orchestrator writes these into `learnings/`. Fill only what has a
real signal; a learning nobody reads is dead weight._

**→ `winning-concepts.yaml`** (only once it passed a gate; attach live signal when it returns)
```yaml
- concept: "<CONCEPT NAME — العنوان>"
  product_slug: <slug>
  angle: <angle>
  market: <ksa>
  platform: <tiktok>
  hook_line_ar: "<hook>"        # <translit / gloss>
  hook_type: <problem-agitate → heritage payoff>
  signal: { thumbstop: <—>, ctr: <—>, cvr: <—>, roas: <—> }   # attach when metrics return
  why_it_worked: "<the hold moment / the frame that stopped the scroll>"
  reuse: "<keep X, rotate Y to avoid fatigue>"
```

**→ `model-recipes.yaml`** (only recipes that passed realism + fidelity FIRST try)
```yaml
- asset_type: <hero-video-ad>
  route: <R3>
  recipe: "<keyframe model+seed → video model+tier+motion>"
  passed_gates_first_try: <true>
  notes: "<e.g. veo3-fast to iterate, ONE veo3 final; force cool-neutral relight on the garnet oil>"
```

**→ `credit-actuals.yaml`:** `<route/model bias to re-fit — e.g. R1 act 7 vs est 6, +0.17>`
**→ `fidelity-notes.yaml`:** `<per-product drift/label/color/rotation note>`
**→ `anti-patterns.yaml`:** `<any hard-fail or expensive mistake + the rule that prevents a repeat>`

---

## 9. Close-out checklist

- [ ] Every product-bearing asset used route R1/R2/R3 — **no text-to-image of the product** (§7bis).
- [ ] All Arabic label/ad text added in POST via `37-typography-compositor` — none generated in-model (V2 policy #3).
- [ ] Skills/config stayed product-agnostic — loaded the ACTIVE `products/<slug>/product-lock.yaml`, nothing hardcoded.
- [ ] Realism ≥ 95 and fidelity gate CLEAR on every shipped asset (or a logged, approved waiver).
- [ ] Iterated on draft/fast tier only; ONE final render/upscale per approved master (V2 policies #5, #9).
- [ ] One master → many exports; no per-size banner regeneration (V2 policy #4).
- [ ] Credit bill surfaced BEFORE spend; estimate vs actual reconciled here + in `credit-ledger.yaml`.
- [ ] No product claim exceeded the landing page / product-lock (Bible §3 — never invent).
- [ ] No PII, no secrets, no Kie API keys anywhere in this run folder.
- [ ] Learnings promoted to `learnings/`; this run folder is now IMMUTABLE.

---

*One run, logged once. The next run reads this before it reasons — cheaper,
more realistic, higher-converting for free.*
