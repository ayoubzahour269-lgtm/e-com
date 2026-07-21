# Culture & Modesty QC Checklist — The Gulf Pass/Fail Sheet

### The operator's checklist for **the Culture / Localization axis** (STUDIO-BIBLE §5, §7). Run every keyframe, every storyboard beat, every overlay, and every finished cut against this before it advances a stage or spends a finishing credit. Organized by domain — **model-presence · framing · heritage · wardrobe & interior · palette · copy/VO register · platform-cut · taboo screen**. Each row is a binary a reviewer can defend out loud to a woman in Riyadh. This is the *auditable* companion to `knowledge/gulf-beauty-brand-norms.md` and the four `knowledge/gulf-culture/*.md` dossiers: the norms doc explains **why**; this sheet is **what you tick**.

> **Quality / checklist artifact — not a skill.** `model_cost: none` — cultural QC is pure
> Claude reasoning; it never calls a model. Consumed by **21-cultural-expert-gulf** (Stage 9
> cultural QA, holds BLOCK authority), **27-quality-checker** (Culture/Localization axis),
> **28-creative-scoring-engine**, and the v2 **generic-guardian** (anti-stereotype / anti-generic
> gate). Armed by **09-beauty-commercial-director**, **17-human-realism-director**,
> **18-environment-realism-director**, **20-arabic-copywriter**, **30-creative-matrix-planner**,
> **31-format-router**; enforced in POST by **37-typography-compositor** (Arabic overlay is added
> here, NEVER model-generated). It sits alongside `quality/realism-checklist.md` (does it look
> filmed) and `quality/scoring-rubric.md` (the weighted 0–100 ship gate).
>
> **Grounding.** STUDIO-BIBLE §3 (audience: Gulf women ~22–45, warm-toned skin), §5 (modesty,
> 9:16, sound-on, market rules), §6 (UNBROKEN THREAD locked beats/overlays/VO), §7 (ship
> threshold ≥ 95 weighted, **NO axis < 90**). STUDIO-BIBLE-V2 §7ter (Generic Guardian /
> anti-stereotype) and §7bis (product ALWAYS reference-conditioned — routes R1/R2/R3, never
> text-to-image). `knowledge/gulf-beauty-brand-norms.md` (the model-presence policy) and
> `knowledge/gulf-culture/{saudi,uae,oman,egypt}.md` (per-market deltas; **KSA is the strictest
> floor — what passes KSA passes everywhere**). **When this sheet and the Bible disagree, the
> Bible wins.** This sheet invents no product claim, no ingredient, no founding story, and no
> Arabic line — every locked Arabic line is verbatim from Bible §6; product rows read the ACTIVE
> `products/<slug>/product-lock.yaml`, never a hardcoded bottle.

---

## 0. How to run this sheet

1. **Scope.** Storyboard / brief → run domains B–H on every beat. Static asset → run the domains
   that appear in frame. Video → run **every** domain on the hero beat AND on the motion.
2. **Market target first.** Read the active market from `config/markets.yaml` (`meta.primary_market`,
   default `sa`). **Grade against KSA unless the run is an explicit UAE/Oman/Egypt cut** — then apply
   that dossier's *delta*, never a looser separate standard. A single asset that must serve KSA
   cannot borrow UAE tolerance.
3. **Binary rule.** Every checkbox is PASS / FAIL / N-A. "Almost" = FAIL. If you have to argue for it,
   it fails. Write the beat/timecode/region for every FAIL so the fix is addressable.
4. **Severity tags.** Each row carries a tag:
   - `[HARD]` — one FAIL hard-fails the whole asset regardless of score. Never ships. These are the
     modesty breaches and the mocked stereotypes (face-forward hero reveal in a KSA cut, camel/tent
     orientalism, in-model Arabic text, generic "empowerment" VO).
   - `[MAJOR]` — one FAIL caps the Culture axis at **< 90** → below the §7 gate → auto-improve.
   - `[MINOR]` — accumulates; **three MINOR FAILs in one domain** promote to one MAJOR.
5. **Scoring map.** Feed **27-quality-checker**: `culture_localization` axis = weighted clean rate
   across the eight domains (Model-presence 22 · Framing 18 · Heritage 16 · Wardrobe/Interior 12 ·
   Palette 8 · Copy/VO 14 · Platform-cut 6 · Taboo 4). **The worst single domain caps the axis** — a
   beat 96% clean overall still fails on one `[HARD]`.
6. **Modesty is a house style, not a censorship patch** (norms §0). Never grade a framing choice as
   "compliant but awkward." A back-of-head hero shot is a *considered cinematic choice* lit with full
   beauty-hero quality, or it is a FAIL — there is no apologetic middle.
7. **Fix the beat, not the film** (Bible §0). A localized culture FAIL → re-brief that beat, re-cut,
   or fix overlay in post — not a fresh generation. Log which.

---

## A. GATE-ZERO — the four instant kills (check before anything else)

Any single FAIL here ends the review. Do not score the rest; kick straight back to the owning skill.

- [ ] **In-model Arabic** `[HARD]` No Arabic (or any) label/ad/overlay text baked into a raw
      generation. Arabic is added in POST by **37-typography-compositor** only. Any in-frame Arabic on
      a raw model output = automatic REJECT (Bible §5; V2 §7bis).
- [ ] **Face-forward hero reveal, KSA cut** `[HARD]` No turn-to-camera "result on a face" as the hero
      payoff in a KSA/primary asset. Reserve full face + uncovered hair for an *explicitly requested*
      UAE cut only (norms §2). Forcing it "for impact" = REJECT.
- [ ] **Orientalist shorthand** `[HARD]` No desert / camel / tent / souk / "ancient mystical Arabia"
      backdrop used as a stand-in for heritage (norms §4, §7). Heritage = home, family, ritual — never
      landscape tourism.
- [ ] **Generic-empowerment VO** `[HARD]` No abstract "empowerment / beauty / confidence" voiceover
      detached from a specific woman's specific routine — the single most-mocked current MENA cliché
      (norms §6, §7). Kick to **20-arabic-copywriter**.

---

## B. MODEL-PRESENCE — "who is on screen, and how much?" `[family B · weight 22%]`

The core anti-stereotype answer (norms §2). Owned by **09 / 17 / 30**. This is TRADITION (B) — the
Saudi/Gulf-national heritage lane, not the expat/pharmacy South-Asian-glamour lane.

- [ ] **Default mode honored** `[MAJOR]` Default is **hands + hair, no face** (parting, oil dripping,
      scalp massage, braiding/wrapping). If a face appears in a KSA cut, there must be a documented
      reason and a passing §A face-reveal check.
- [ ] **Back-of-head / ¾ silhouette** `[MINOR]` When used as the hero/finishing beat, hair movement &
      shine are shown from behind with **full beauty-hero lighting** — a chosen technique, not an
      awkward crop (norms §2).
- [ ] **No expat-glamour staging** `[HARD]` No forward-facing "actress," Bollywood-adjacent flowing
      loose uncovered hair, or price-channel glamour-face — reads as a *different, cheaper category* to
      a Saudi national (norms §1, §7).
- [ ] **Proof = ritual, not result-on-face** `[MAJOR]` The "proof" beat is texture & motion (oil
      sheen, hair swinging back-of-head, steam from a warm towel), and length/shine is a **detail
      shot** (ends held in a hand, hair over a shoulder from behind), never a turn-to-camera reveal.
- [ ] **Hijab-as-styling, if present** `[MINOR]` A hijab, when it appears, is a confident, well-lit
      *beauty element* (the payoff/proxy for the result), never avoided, blurred, or apologetic
      (norms §2, §7).
- [ ] **Warm-toned Gulf skin** `[MAJOR]` Any visible skin reads as warm-toned Gulf skin ~22–45
      (Bible §3), not a cool Northern-European or over-lightened complexion.

---

## C. FRAMING & MODESTY-AS-CRAFT — "is modesty owned or apologized for?" `[family C · weight 18%]`

Owned by **09 / 17 / 18**. Modesty is the aesthetic; grade the *quality* of the choice.

- [ ] **No apologetic modesty** `[MAJOR]` No blurred faces, digital fog, or awkward reframes used to
      "hide" — every framing decision carries full beauty-hero production value (norms §7 DON'T-5).
- [ ] **Wardrobe covers to the KSA floor** `[MAJOR]` Any on-screen woman is dressed to the strictest
      (KSA) floor unless a UAE cut is explicit: modest sleeves/neckline, no cleavage, no bare
      midriff/legs as focal skin (`gulf-culture/saudi.md`).
- [ ] **No suggestive posing or contact** `[HARD]` Nothing romantic/sensual, no male–female contact,
      no "come-hither" gaze even where a face is allowed.
- [ ] **Crop is intentional** `[MINOR]` Any crop above the shoulders/at the neck is composed as a
      deliberate frame, not a panic-cut to dodge a face.
- [ ] **9:16 vertical** `[MINOR]` Framed native vertical 9:16 with safe-zones respected for the target
      platform's UI (Bible §5).

---

## D. HERITAGE FRAMING — "is heritage lived, or is it tourism?" `[family D · weight 16%]`

Owned by **09 / 18 / 20 / generic-guardian**. Heritage done right, not orientalist (norms §4).

- [ ] **Heritage = home / family / ritual** `[MAJOR]` The heritage cue is a rediscovered, modernized
      **grandmother's ritual** («جدتي» / lineage) — lived, current, personal, domestic — not a museum
      or a landscape (norms §4 "Right").
- [ ] **No orientalist props** `[HARD]` No desert dunes, camels, Bedouin tents, souk stalls, or
      "Arabian Nights" set-dressing standing in for authenticity (norms §4, §7 DON'T-2). (Duplicate of
      §A for scored granularity — a soft version here still fails.)
- [ ] **Ingredients are tactile & real** `[MINOR]` Herbs, henna, hibiscus, sidr leaves, powders read
      as real texture on camera, **not CGI-clean** studio props (norms §3).
- [ ] **Ritual pacing** `[MINOR]` The edit respects the slow, multi-hour ritual it depicts (slower for
      Instagram/hero; punchier only for the TikTok/Snap tutorial cut) — not a rushed Western
      beauty-spot cadence (norms §3, §5).
- [ ] **Claim discipline** `[MAJOR]` No heritage claim, ingredient, or founding story that is not in
      the ACTIVE `products/<slug>/product-lock.yaml` / Bible §3 — no invented "1000-year-old secret."

---

## E. WARDROBE & INTERIOR — "does this room read as her home?" `[family E · weight 12%]`

Owned by **18-environment-realism-director**. Home > studio (norms §3).

- [ ] **Home, not studio** `[MAJOR]` Setting is a majlis / bedroom vanity with warm practical light,
      reading as authentic ritual — not a cold clinical studio-white set (norms §3).
- [ ] **Interior details are Gulf-correct** `[MINOR]` Furniture, textiles, vessels, and props are
      plausibly Khaleeji-domestic (per the active market dossier), not a generic Western apartment or a
      pan-"exotic" mashup.
- [ ] **Brass/gold/wood, not chrome** `[MINOR]` Vessel and surface details lean warm metal (brass,
      gold) and deep wood, matching the heritage register (norms §3).
- [ ] **No taboo objects in frame** `[HARD]` No alcohol, pork, gambling, religious iconography of any
      faith, immodest imagery, or brand logos of competitors (`gulf-culture/*.md` taboo sections).

---

## F. PALETTE & GRADE — "does the color belong to the oil?" `[family F · weight 8%]`

Owned by **09 / colorist (52)**. Let the product's real color lead (norms §3).

- [ ] **Warm amber/copper/terracotta lead** `[MAJOR]` The grade is warm amber / copper / terracotta,
      deep wood and brass — echoing the oil's REAL color from the active product-lock — not cold
      clinical white or a trendy teal-orange Western grade (norms §3, §7 DO-2).
- [ ] **Oil color = hero color** `[MINOR]` The oil's true amber-red carries through bottle, grade, and
      backdrop as the signature, sampled from `products/<slug>/product-lock.yaml`, never invented.
- [ ] **No neon / hyper-saturated push** `[MINOR]` No garish, over-saturated "dropship" look that
      breaks the premium-heritage register.

---

## G. COPY / VO REGISTER — "does she sound like a real woman here?" `[family G · weight 14%]`

Owned by **20-arabic-copywriter**, register-checked by **21-cultural-expert-gulf**. Overlay is set in
POST by **37** — this domain checks the *words*, not the render.

- [ ] **Specific woman, specific ritual** `[MAJOR]` VO/copy is grounded in one believable woman's
      specific routine and feeling ("what you feel from the inside"), not generic beauty/empowerment
      claims (norms §6; duplicates §A at scored granularity).
- [ ] **Correct dialect / register** `[MAJOR]` VO is Khaleeji-female for KSA; on-screen overlays are
      MSA/naskh per Bible §6 — matched to the active market dossier (`gulf-culture/*.md`). No Levantine
      or Egyptian dialect slipping into a KSA VO unless the cut is the Egypt cut.
- [ ] **Locked lines verbatim** `[HARD]` Every shipped Arabic overlay/VO line matches Bible §6.3/§6.4
      verbatim — no paraphrase, no new claim, no added line (Bible §6).
- [ ] **Typography intent** `[MINOR]` Copy is specified for naskh / modern-heritage Arabic lettering
      (El Messiri display / Tajawal text), never a generic Latin sans dropped onto Arabic (norms §3).
      The render itself is verified on `quality/realism-checklist.md` §H (Text) after **37** sets it.
- [ ] **No untranslated Latin CTA** `[MINOR]` No stray English/French CTA words left in an Arabic cut
      unless the market dossier explicitly allows a bilingual convention.

---

## H. PLATFORM-CUT & MARKET DELTA — "is this the right cut for this feed?" `[family H · weight 6% + Taboo 4%]`

Owned by **30-creative-matrix-planner / 31-format-router**. Match format to platform (norms §5).

- [ ] **Format matches platform** `[MINOR]` Snapchat/TikTok → tutorial / ritual-demonstration cut;
      Instagram → polished aspirational ritual + Reels (norms §5). A slow aspirational cut dumped on a
      TikTok tutorial slot is a MINOR FAIL.
- [ ] **Market delta applied correctly** `[MAJOR]` If the asset is a non-KSA cut, the loosening is
      *only* what that dossier documents (e.g. UAE face tolerance) and nothing tighter than KSA leaks
      the other way. Egypt/Oman deltas per their dossiers.
- [ ] **Seasonality & offer respect** `[MINOR]` Any Ramadan/Eid/seasonal framing follows the ritual/
      heritage strategy in the market dossier, not a generic "sale" overlay (norms §5; saudi.md
      seasonality).
- [ ] **Sound-on design** `[MINOR]` The cut works sound-on (Bible §5) — VO/music carry it; it does not
      rely on silent captions alone.
- [ ] **No taboo trigger for the market** `[HARD]` No content on the active market's taboo list
      (`gulf-culture/*.md`) — political/religious sensitivity, immodesty, competitor knock, or
      health/medical over-claim beyond the locked product claims.

---

## Scoring — rolling the eight domains into the Culture axis

1. **Per-domain clean rate.** For each domain, `clean = passed / (passed + failed)` over its non-N/A
   rows. Weight the eight domains B–H (+ the Taboo slice of H) by the weights in §0.5.
2. **Worst-domain cap.** `culture_axis = min( weighted_mean , 100 * worst_domain_clean_rate )`. The
   single worst domain caps the axis — a broadly clean asset still fails on one weak domain.
3. **HARD overrides all.** Any `[HARD]` FAIL (or any §A gate-zero kill) forces `culture_axis = FAIL`
   regardless of arithmetic — the asset does not ship and does not "average out."
4. **MAJOR floor.** Any un-fixed `[MAJOR]` caps `culture_axis < 90` → below the Bible §7 per-axis
   floor → **AUTO-IMPROVE → RE-SCORE**, never generate through it.
5. **MINOR accrual.** Three `[MINOR]` FAILs in one domain promote to one `[MAJOR]` for that domain.
6. **Hand-off to the gate.** Report `culture_localization` to **27-quality-checker**; ship requires
   the studio gate — **weighted total ≥ 95 AND no axis < 90** (`quality/scoring-rubric.md` §0). A
   brilliant hook can never buy back a modesty breach.

---

## Reviewer's decision line

**SHIP** only when every §A gate-zero row passes, no `[HARD]` FAIL exists, no `[MAJOR]` is un-fixed,
the worst domain clears its cap, and the culture axis lands ≥ 90 into the studio gate. Otherwise:
**re-brief the failing beat, re-cut, or fix overlay in POST — never regenerate the whole film, and
never argue a modesty or stereotype FAIL up to a pass.** When this sheet and the Bible disagree, the
**Bible wins**; when a market delta and the KSA floor disagree, the **KSA floor wins** unless the run
is an explicit non-KSA cut. `model_cost: none`.
