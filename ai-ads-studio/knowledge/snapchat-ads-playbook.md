# Snapchat Ads Playbook — Story Ads · Dynamic Ads · Single Snap Ads (9:16 Video)

### 0–1.5s stop, full-bleed vertical, fast payoff, Swipe-Up/attachment CTA affordance, safe zones, and creative-testing structure — mapped to UNBROKEN THREAD

> **Knowledge base article — reference material, not a skill.** Dense, scannable, checklist-heavy
> media-buying/creative-ops reference for Stage 5 (**06-hook-generator**), Stage 6
> (**15-transition-designer**), Stage 9 (**20-arabic-copywriter**), Stage 10
> (**22-brand-guardian**, **23-product-consistency-guard**), Stage 12 (**27-quality-checker**,
> **28-creative-scoring-engine**, **29-cost-optimizer**), and **00-orchestrator** when it assembles
> the launch/testing plan. Grounded in `STUDIO-BIBLE.md` §0 (Scroll-Stop→Hook→Hold→CTR→CVR→ROAS
> priority), §3 (offer/price/COD), §4 (product lock), §5 (Snapchat platform rules), §6 (the
> flagship **UNBROKEN THREAD** — §6.1 beat sheet, §6.3 overlays, §6.4 VO, §6.5 sound), §6.6
> (negatives), §7 (quality gates), and `config/platforms.yaml` `platforms.snapchat` (the
> machine-readable numbers this document explains and applies). **When this document and the Bible
> or `platforms.yaml` disagree, the Bible wins.** Nothing here invents a product claim, a lock
> detail, an offer term, or new Arabic copy — every Arabic line reused below is quoted verbatim
> from Bible §6.3/§6.4.

---

## 1. Scope & where this sits in the pipeline

This playbook covers **Snapchat only** — **Story Ads, Dynamic Ads, and Single Snap Ads**, 9:16
video. It is the craft/media-buying layer that sits on top of the machine-readable specs in
`config/platforms.yaml` → `platforms.snapchat`: that file is the *numbers*, this file is the *why
and how*. Meta and TikTok have their own hook windows and rail geometry (Bible §5,
`platforms.yaml` → `platforms.meta` / `platforms.tiktok`); do not port a Snapchat-specific tactic
(e.g. compressing toward the tightest hook window, or the Swipe-Up affordance language) to those
surfaces without checking the sibling block first — see `knowledge/meta-ads-playbook.md` for the
Meta-specific counterpart.

**Consumed by:**

| Stage | Skill | Uses this doc for |
|---|---|---|
| 5 | `06-hook-generator` | Scoring hook candidates against the **0–1.5 s** stop mechanics — the tightest of the three surfaces (§3 below) — before any hook is locked |
| 6 | `15-transition-designer` | Sizing the HOOK→DISCOVERY transition so the pain beat resolves inside the 1.5 s window with margin (§3, §4) |
| 9 | `20-arabic-copywriter` | Overlay placement, contrast, and compressed-pacing rules for sound-off legibility inside an 8 s cut (§5); selecting the Khaleeji-spoken VO register (§8) |
| 10 | `22-brand-guardian`, `23-product-consistency-guard` | Auditing that Story Ads and Dynamic Ads (catalog-rendered) both carry an identical, undrifted product lock (§2, §9 item 12) |
| 12 | `27-quality-checker`, `28-creative-scoring-engine` | The `hook_strength` and `video_rhythm_retention` quality axes (Bible §7) draw diagnostic bands from §3–§4 here |
| 12 | `29-cost-optimizer` | The regenerate-a-scene-not-the-video testing structure (§8) |
| — | `00-orchestrator` | Assembling the launch + creative-testing plan handed to media buying (§8, §11) |

---

## 2. Snapchat placement anatomy — Story Ads · Dynamic Ads · Single Snap Ads

Snapchat's navigation model is the defining constraint on this surface: a **tap** on the right
side of the screen skips forward past the current Snap/ad, a **swipe down** exits the Story/
Discover feed entirely, and only a deliberate **swipe up** opens the attachment (the landing page,
in this campaign's case). There is no passive "keep scrolling and it stays on screen" behavior the
way Reels/Feed autoplay works — every impression is one tap-decision away from being skipped, which
is why Snapchat's hook window (§3) is the tightest of the three surfaces the studio ships to.

The flagship authors **one 9:16 master** (Bible §5, §6.1) and routes it to Snapchat without a
re-shoot — the single-master policy (`platforms.yaml` `cross_platform_rules.single_master_policy`)
holds here exactly as it does on Meta and TikTok; only the VO register and the CTA wrapper vary.
Each placement consumes that master (or, for Dynamic Ads, the catalog feed) differently:

| Placement | Consumption pattern | What it carries | Implication for the master |
|---|---|---|---|
| **Single Snap Ads** | One full-screen, skippable clip shown between organic Stories/Discover content | The flagship 8 s narrative cut in full (`platforms.yaml` `snapchat.placements[id=single]`) | Primary placement for the UNBROKEN THREAD arc — Pain→Trust→Ritual→Transformation→Offer must play out inside 8 s with no re-cut |
| **Story Ads** | Sequenced between publisher Stories, full-bleed 9:16, same tap-forward/swipe-up gestures | The identical 8 s master, positioned as one ad unit inside a Story sequence (`platforms.yaml` `snapchat.placements[id=story]`) | Narrative sequencing rewards the arc's own internal story structure — the beat sheet's Pain→Trust curiosity loop (Bible §6, "each beat opens a small question the next beat answers") reads naturally as a Story-native unit |
| **Dynamic Ads** | Auto-generated from the product catalog feed — template-driven, opens on product imagery and price by construction | The 3-pack offer, price, and SKU `SA04050100M300` (`platforms.yaml` `snapchat.placements[id=dynamic]`), never the narrative footage | Because the catalog template opens on the product image, Dynamic Ads are the placement that **literally** satisfies frame-0 brand legibility (§4) — they run alongside, not instead of, the narrative cut |

**Delivery specs (owned by `platforms.yaml` → `platforms.snapchat`, restated here for the media
buyer):**

| Spec | Value | Bible / config ref |
|---|---|---|
| Aspect ratio | 9:16, full-bleed vertical, **zero letterboxing/pillarboxing** | Bible §5 |
| Minimum resolution | 1080×1920 | Bible §5, `platforms.yaml` `snapchat.min_resolution` |
| Frame rate | 24 fps default, 24–30 fps band | Bible §5, `platforms.yaml` `snapchat.fps` |
| Duration | 8–15 s window; **8 s primary single-generation cut leads** — Snap favors the tightest, fastest-payoff end | Bible §5, §6.1; `platforms.yaml` `snapchat.duration_range` |
| Hook window | **0–1.5 s** — the fastest bail of the three surfaces | Bible §5; `platforms.yaml` `snapchat.hook_window_seconds` |
| Safe zones | top 14% / bottom 20% (Swipe-Up/attachment CTA zone) / side 6% | Bible §5; `platforms.yaml` `snapchat.safe_zones` |
| Sound | design sound-on, must be **fully legible sound-off** — "many Snap views run muted" | Bible §5, §6.5; `platforms.yaml` `snapchat.sound_default` |
| Captions | required; brand + offer legible in the **first and last second** | Bible §5; `platforms.yaml` `snapchat.caption_required` |
| CTA affordance | Swipe-Up / attachment CTA | Bible §5; `platforms.yaml` `snapchat.cta_style` |

---

## 3. The 0–1.5 s hook window — stop mechanics & diagnostic metrics

**Why 0–1.5 s specifically.** Snapchat's users are the most heavily tap-trained audience of the
three surfaces this studio ships to — advancing through Stories and Discover content is a single
deliberate tap, faster and more habitual than a Reels scroll or a TikTok swipe. That tap-forward
gesture means the decision to keep watching resolves earlier here than anywhere else in the
studio's media mix; everything the ad has to say to earn attention must register almost instantly.
This is the tightest constraint the Bible's Scroll-Stop→Hook→Hold→CTR→CVR→ROAS priority order
(Bible §0, §7) imposes on any surface.

**The flagship's hook-window math (Bible §6.1, `platforms.yaml` `common` hook-window/beat-sheet
mapping):** HOOK/Pain (extreme macro comb + falling dark strand, slow-mo) runs **0.0–1.2 s** —
inside the 0–1.5 s window with **0.3 s of margin**, the only surface where that margin is measured
in tenths of a second rather than whole seconds. The `platforms.yaml` gate check is precise about
*what* must clear the window: "hook subject lands inside the surface `hook_window_seconds`" — the
falling-strand pain beat is the hook subject, and it clears Snap's window cleanly. The garnet
oil-drop match/liquid-morph ("the reason to stay") follows immediately at **~1.6 s** — arriving
essentially with zero dead air right at the boundary of the stop-decision, so a viewer who has
already committed to watching past the tap-forward moment is rewarded instantly with the next
curiosity beat, never left on a static frame while deciding whether to stay.

**Metrics vocabulary — define these precisely before reading any test result:**

| Metric | Definition | What it isolates |
|---|---|---|
| **Impressions** | Times the ad was shown | Reach, not attention |
| **2-second Video Views** | Plays that reached ~2 continuous seconds | Snap's closest analog to a "did it survive the stop decision" read — even looser than the ad's own 1.5 s window, so treat it as a lagging confirmation, not the window itself |
| **Quartile Completions (25/50/75/100%)** | Share of 2-sec views reaching each quarter of the 8 s cut | Locates *which beat* loses attention: 25% ≈ HOOK/DISCOVERY (~2 s), 50% ≈ RITUAL (~4 s), 75% ≈ TRANSFORMATION (~6 s), 100% ≈ full OFFER+CTA seen |
| **Swipes / Swipe-Up Rate** | Taps on the attachment CTA ÷ Impressions | The platform's own thumb-to-action metric — Snap's direct analog to Meta's Outbound CTR (§7) |
| **eCPSU** | Effective cost per swipe-up | Cost efficiency of the stop→action funnel, independent of downstream conversion |
| **Story Opens / Story Completes** | For Story Ads specifically: sequential viewing through the Story unit | Whether the narrative sequencing (§2) is holding attention across the Story, not just within one ad |
| **Attachment / Lead conversion** | Completed order-form submissions ÷ swipe-ups, via Snap Pixel / Conversions API custom event | Whether the offer and trust elements (Bible §3 trust list) close, once the viewer has already left the app |

**Diagnostic bands this studio uses to triage a live Snapchat test** (heuristic ranges the studio
applies for internal triage — not a Snap-published guarantee — treat them as "investigate below
this line," not a pass/fail law):

| Metric | Weak — investigate the hook/offer | Workable | Strong — scale |
|---|---|---|---|
| Swipe-Up Rate | < 0.4% | 0.4–1.0% | > 1.0% |
| 2-second View Rate (2-sec views ÷ impressions) | < 35% | 35–50% | > 50% |
| 100% Completion Rate (of the 8 s cut) | < 15% | 15–25% | > 25% |
| Frequency before fatigue flag | — | 2–3 | refresh at > 3 |

**COD measurement note (Bible §3):** exactly as on Meta, the flagship's offer closes on **cash on
delivery** with phone confirmation, not an online payment capture — a raw "Purchase" pixel event is
unreliable here because the transaction doesn't complete on-site. Optimize and report against a
**custom Lead / order-form-submission event** fired via the Snap Pixel or Conversions API
(«اطلبي الآن — الدفع عند الاستلام» / *uṭlubī al-ān — ad-dafʿ ʿind al-istilām*, "Order now — Cash on
delivery," Bible §6.3), and track true sales via the fulfillment system's confirmed-COD rate as the
secondary, offline signal — never judge Snapchat CVR off a "Purchase" event alone.

---

## 4. Fast payoff — compressing the arc for Snap's fastest-leaving audience

Snap audiences leave fastest of the three surfaces (`platforms.yaml` `snapchat.best_practices`
item 2), so the studio's structural answer is not a different creative — it is the same locked
8 s beat sheet, delivered with zero slack:

1. **Lead with the 8 s primary cut, never the 13 s director's cut, on Snap-first campaigns.** The
   extended segment-stitch (Bible §6.2) is explicitly gated to "when budget allows a 2-generation
   stitch" and is the wrong default for a surface whose own audience leaves fastest — reserve it for
   Meta/TikTok tests only, and route Snap spend to the 8 s master.
2. **Reach TRANSFORMATION and OFFER quickly; the payoff cannot wait.** The locked beat durations
   (Bible §6.1: HOOK 1.2 s, DISCOVERY 1.4 s, RITUAL 1.4 s, TRANSFORMATION 1.4 s, OFFER+CTA 1.0 s)
   already compress harder than either sibling surface needs — Snap is the surface those durations
   were sized to survive first.
3. **Brand and offer legible in the first *and* last second — read against the locked beat sheet,
   not as a bespoke Snap re-cut.** Read literally, "first second" would put the bottle in frame at
   t = 0, which would break the pain-hook cold open the Bible locks in as the strongest scroll-stop
   device (Bible §6.1) — and the single-master policy (§2) forbids authoring a Snap-specific
   opening the other two surfaces don't share. The studio's practical target: brand becomes legible
   at the **earliest point the beat sheet allows without altering it** — the DISCOVERY beat's bottle
   reveal at **1.6 s**, arriving with zero dead air directly off the HOOK's 1.2 s pain beat (§3) —
   and offer becomes legible at the **OFFER+CTA beat closing the cut (7.0–8.0 s)**. Dynamic Ads
   (§2) satisfy the literal frame-0 reading separately, by construction of the catalog template.
4. **No beat is allowed to sit static long enough for a tap-forward to register as boredom.** The
   same "reason to stay inside every 1.5 s" discipline that governs Meta's Hold Rate (Meta playbook
   §4 item 1) matters even more on Snap, where the tap-forward gesture is a single motion away at
   every moment, not a scroll the thumb has to actively re-engage.
5. **Physical transitions, not edited cuts, remain the retention backbone.** Match/liquid-morph
   transitions (drop→oil, oil→scalp, hair-sweep, light-bloom — Bible §6.1) read as continuous
   footage on Snap exactly as they do on Meta/TikTok — no hard-cut edit point exists for a tap-
   forward decision to interrupt momentum on.
6. **One held dwell beat, not zero.** TRANSFORMATION (5.2–6.6 s, Bible §6.1) still earns its single
   beat of stillness even under Snap's compression — removing it to buy speed would make the
   preceding motion read frantic rather than earned, which costs completion, not gains it.

---

## 5. Sound-off legibility system

`platforms.yaml` is explicit that "many Snap views run muted" (`snapchat.sound_default`) — this is
at least as strict a constraint as Meta's sound-off-by-default placements, and it applies inside an
even shorter 8 s window, so overlay cadence has less room to breathe.

- **Every plot beat carries its burned overlay, exactly as locked in Bible §6.3** — six lines across
  the arc (Hook, Discovery, Ritual, Transformation, Offer, CTA), so the Pain→Trust→Ritual→
  Transformation→Offer→CTA story is fully legible muted, not just the price.
- **≤ one overlay on screen at a time, ≤ ~6–8 Arabic words per line — non-negotiable at Snap's
  pace.** The hook line **«كل تمشيطة… وشعرك ينقص؟»** (*kull tamshīṭa… wa-shaʿruki yanquṣ?*, "Every
  comb stroke… and your hair keeps thinning?") reads in well under a second, which matters more
  here than on any other surface given the 1.5 s stop window (§3).
- **High-contrast type on every background, never a fixed color.** El Messiri (display) / Tajawal
  (body), RTL (Bible §3), set with a subtle scrim or drop shadow so garnet-on-cream and cream-on-
  garnet beats both stay legible against Snap's own UI chrome (top status bar, bottom
  Swipe-Up affordance — §6).
- **The CTA line is the one overlay allowed to persist, not cycle.** «اطلبي الآن — الدفع عند
  الاستلام» (*uṭlubī al-ān — ad-dafʿ ʿind al-istilām*, "Order now — Cash on delivery," Bible §6.3)
  holds through the closing hero-pack frame — the last visible frame before the ad ends or loops
  into the next Story/Discover unit.
- **VO is a sound-on delight layer, never a load-bearing narrator — verify this by watching muted.**
  If every overlay were stripped, the arc must still resolve visually: falling strand → bottle →
  pour/massage → visibly denser/shinier hair → 3-pack + price. This test matters more on Snap than
  on Meta because Snap's own audience is more likely to be watching in a public, sound-off context
  (commuting, in class, at a majlis) than actively seeking sound-on content.
- **Sound design supports muted viewers too — visually.** The Bible's foley cues (glassy tone,
  ripple, hair-whoosh, glass clink, resolving chime — §6.5) each have a **visible** motion
  counterpart — design the sound to double a visual event, never to carry information the visual
  doesn't.

---

## 6. Safe zones & the Swipe-Up/attachment CTA zone

| Zone | Reserve | What lives there on Snapchat | Rule |
|---|---|---|---|
| **Top** | ~14% | Snap's status bar, Story progress segments, profile/publisher avatar | Never place an overlay line, the bottle, or a face here |
| **Bottom** | ~20% | The **Swipe-Up / attachment CTA affordance** — the chevron and short CTA button that the viewer swipes to open the landing page | Never seat the price, the label, or a face here — build the OFFER+CTA frame so the hero pack and burned CTA line sit above this band, clear of the swipe gesture's own visual affordance |
| **Side** | ~6% | Edge UI (tap targets for skip-forward/back) | Keep the bottle, face, and any overlay clear of the extreme edges so a mistimed tap doesn't register mid-frame |
| **Center-safe column** | remaining space | — | This is where the bottle, the face, the label, the price, and every overlay line must live, on every single frame |

**Zero letterboxing/pillarboxing rule (`platforms.yaml` `snapchat.best_practices`):** Snapchat's
full-bleed vertical convention is stricter here than the "keep it 9:16" instruction reads on paper
— any black bar, even a thin one from a mismatched aspect ratio, immediately signals "this is an
ad, not a Snap," which is the opposite of the native, intimate register the flagship's cold open is
built to achieve (Bible §6.1, "quiet, intimate, elegant").

---

## 7. Swipe-Up / attachment CTA affordance

Snapchat gives one native CTA surface — the **Swipe-Up / attachment** gesture — and the studio
doubles it with the burned on-frame CTA, mirroring the "both surfaces, never just one" logic that
governs Meta's CTA sticker + on-frame pairing:

| Surface | What it is | Where it sits | Studio rule |
|---|---|---|---|
| **Platform Swipe-Up affordance** | Snap's native chevron + short CTA button label attached to the ad's attachment (the landing page) | Bottom safe zone, platform-controlled position (§6) | Configure the button label from the **opening fragment of the already-locked CTA line** — «اطلبي الآن» ("Order now") — rather than inventing new short-form copy; this is a truncation of Bible §6.3's exact line, not new wording |
| **Burned on-frame CTA** | The full Bible §6.3 CTA line, burned into the final hero-pack frame | Center-safe, above the bottom Swipe-Up band (§6) | «اطلبي الآن — الدفع عند الاستلام» (*uṭlubī al-ān — ad-dafʿ ʿind al-istilām*, "Order now — Cash on delivery") carries the full phrase — including the COD detail the platform button's shorter label can't fit — through the last frame |

**Why the split, not a single shortened line everywhere:** the platform button has to fit Snap's
native short-label UI, while the burned overlay has the full frame to carry the complete offer
detail (including "cash on delivery," which the trust list in Bible §3 identifies as a primary
objection-handler for this audience). Splitting the locked line this way loses no wording — the
short button is a strict substring of the long overlay — it only respects the UI's space
constraint.

**Attachment type:** for this campaign, the attachment is the landing page (order form / COD
checkout), consistent with the offer lock (`platforms.yaml` `cross_platform_rules.offer_lock`) —
never an app-install or AR-lens attachment, which would misroute a Swipe-Up away from the order
funnel this creative exists to drive.

---

## 8. Creative-testing structure on Snapchat

The studio's cost discipline (Bible §0: "One optimized prompt → one generation. Regenerate scenes,
never whole videos.") governs Snapchat testing exactly as it governs Meta and TikTok — **spend
Claude reasoning before spending video credits, and spend video credits before spending a second
generation.**

### Tier 0 — Pre-spend testing (zero video-generation cost)
Identical to the Meta/TikTok tiering: happens entirely inside Stage 4 (Concepts+Scoring) and Stage
5 (Hooks+Scoring), before any prompt reaches a video model. Only the #1-ranked concept and #1-
ranked hook (Bible §6, §8) proceed to render.

### Tier 1 — Post-render, no-regeneration testing (edit-only cost)
Once the single 8 s master exists, test variables that are **post-production or Ads-Manager-level
edits to the same render**, never a new generation:

| Variable tested | What changes | What stays identical | Who authors it |
|---|---|---|---|
| Platform CTA button label | The short Swipe-Up button text (§7) | The burned on-frame CTA and the underlying footage | Media buyer, from the Bible §6.3 line's opening fragment only |
| Attachment destination A/B | Landing page variant the Swipe-Up opens | The video itself | Media buyer, per landing-page team's own tests |
| Placement mix | Single Snap Ads vs. Story Ads vs. Dynamic Ads delivery split | Creative asset (narrative cut) and catalog feed (Dynamic Ads) | Media buyer |
| VO register | Khaleeji-spoken variant (Bible §6.4) — the default here, unlike Meta's MSA primary | Overlays, footage, offer | `21-cultural-expert-gulf` sign-off |
| Overlay timing polish | Fade in/out timing of an existing Bible §6.3 line | The line's wording and the underlying footage | `20-arabic-copywriter` review only |

### Tier 2 — Scene-regeneration testing (one-scene cost)
Only when Tier 0 and Tier 1 both plateau (Swipe-Up Rate or completion rate stuck below the workable
band in §3 despite CTA/placement/VO iteration) does the studio regenerate — and even then, **one
beat, not the film** (Bible §0, owned by `29-cost-optimizer`):

- If Swipe-Up Rate is weak → the fault is almost always the HOOK beat (0.0–1.2 s) failing to clear
  the 1.5 s window with enough margin, or the ~1.6 s "reason to stay" transition arriving too late
  → regenerate that scene only, re-run the Stage 12 quality gate, re-launch.
- If completion rate is weak but Swipe-Up Rate is strong → the fault is a mid-cut beat (RITUAL or
  the transition into TRANSFORMATION) losing the thread under Snap's compressed pacing (§4) →
  regenerate that specific beat only.
- If attachment conversion is weak but Swipe-Up Rate is strong → the fault is the landing page or
  the offer's on-page presentation, not the video → iterate the landing page first, never the
  render.
- **Never** regenerate the whole 8 s master to fix a single-beat problem — the exact discipline
  Bible §0 names.

### Test structure, cadence, and kill criteria

| Parameter | Studio default | Rationale |
|---|---|---|
| Variants per test | 3–5 (Tier 1) or 1 replacement beat (Tier 2) | Enough spread to read a signal without fragmenting budget below significance |
| Minimum spend per variant before a read | ~3–5× the account's target CPA, or a fixed floor, whichever is larger | Below this, Swipe-Up/completion deltas are usually noise, not signal |
| Minimum test window | 3–4 days, spanning at least one full day-of-week cycle | Avoids a single-day anomaly reading as a verdict |
| Fatigue / refresh trigger | Frequency > 3, or Swipe-Up Rate down > 20–30% week-over-week with flat/rising frequency | Signals audience saturation on Snap's smaller relative reach pool, not a creative failure |
| Kill criteria | Swipe-Up Rate stays in the "weak" band (§3) after Tier 1 iteration exhausted **and** a Tier 2 scene regen | Confirms the concept itself is the problem — escalate to Stage 4 re-scoring, not another Snap test |

**The pre-flight gate always applies first.** No variant — Tier 0, 1, or 2 — reaches Snapchat at
all until it clears the Bible §7 quality gate (≥95 weighted, no axis < 90). Live Snap metrics are
the **post-flight** signal that confirms or challenges the pre-flight score; they never substitute
for it.

---

## 9. Current best-practice bullets (flagship-tied)

1. **Land the pain hook fully inside 0–1.5 s, with 0.3 s of margin.** The flagship's HOOK
   (0.0–1.2 s) clears the tightest window of any surface the studio ships to (§3).
2. **Lead with the 8 s primary cut on Snap-first campaigns; reserve the 13 s director's cut for
   Meta/TikTok tests.** Snap audiences leave fastest — the compressed default cut is the correct
   default here, not a fallback (§4).
3. **Read "brand + offer legible in the first and last second" against the locked beat sheet, not
   as license for a Snap-specific re-cut.** DISCOVERY's bottle reveal at 1.6 s is the earliest the
   single-master policy allows; Dynamic Ads separately satisfy the literal frame-0 reading via the
   catalog template (§2, §4).
4. **Assume muted playback by default.** The visual Pain→Transformation→Offer arc and the six Bible
   §6.3 overlay lines must carry the entire story with sound off; the oud/qanun bed is a bonus,
   never the message (§5).
5. **Keep the bottom ~20% Swipe-Up/attachment CTA zone clear of price, label, and face at all
   times** — it is Snap's own native tappable affordance, not just a caption band like Meta's (§6).
6. **Use both CTA surfaces — the platform Swipe-Up button and the burned on-frame CTA — never just
   one.** Configure the button from the locked line's opening fragment «اطلبي الآن», never invented
   short-form copy (§7).
7. **Run the Khaleeji-spoken VO variant here, matching TikTok, not Meta's MSA primary** (Bible
   §6.4) — while keeping every overlay in elegant MSA regardless of VO register, since overlays
   carry the sound-off story (§5, §8).
8. **Ship vertical full-bleed with zero letterboxing or pillarboxing.** A stray black bar reads as
   "ad," not "Snap," breaking the native register the cold open is built to earn (§6).
9. **Prefer physical match-transitions over hard cuts, exactly as on Meta/TikTok.** They protect
   momentum against the tap-forward gesture, which is a single motion away at every frame (§4).
10. **Never regenerate the whole 8 s master to fix Snap underperformance.** Diagnose which beat is
    failing via quartile completions (§3) and regenerate that one beat only (§8).
11. **Measure this campaign's true conversion off a Lead/order-form event via Snap Pixel or
    Conversions API, not a raw Purchase event**, because the offer closes on COD with phone
    confirmation, not online payment (§3).
12. **Hold the product lock identical across Story Ads (narrative) and Dynamic Ads (catalog).** No
    label, cap color, or liquid-red drift between the two placements — both are audited against
    Bible §4 by `22-brand-guardian`/`23-product-consistency-guard` (§2, §10).
13. **Provide the hijab/styled-hair A/B pair as a placement- or audience-level variant, not a new
    concept.** Both cuts carry the identical beat sheet, overlays, and offer (Bible §5) — Tier-1-
    equivalent, not a re-score (§8).
14. **Size every overlay line to ≤ ~6–8 Arabic words, ≤ one line on screen at a time — with less
    margin for error than Meta given the compressed 8 s runtime.** The Bible §6.3 lines already
    hold this discipline (§5).
15. **Never surface the price before OFFER+CTA (7.0–8.0 s), even under "fast payoff" pressure.**
    Fast payoff means compress the pacing between beats, not reorder the emotional arc Pain→Trust→
    Ritual→Transformation the Bible sequences deliberately (§4, §5).

---

## 10. Do / Don't — Snapchat-specific tells

| DO | DON'T | Why (Bible/platform ref) |
|---|---|---|
| One 9:16 master, retargeted only by VO register + CTA wrapper | A separate re-shoot or a bespoke Snap-only opening | Bible §5 single-master policy (§2, §4) |
| Lead with the 8 s primary cut | Default to the 13 s director's cut on Snap-first budgets | Snap's fastest-leaving audience (§4) |
| Physical match-transitions | Hard cuts every 1–2 s | Momentum against the tap-forward gesture (§4) |
| Burned overlay per beat, ≤ one on screen | Caption walls or stacked bullet claims | Sound-off legibility at compressed 8 s pace (§5) |
| Swipe-Up button **and** burned on-frame CTA | Relying on only the platform affordance | §7 |
| Vertical full-bleed, zero letterboxing | Any black bar from aspect mismatch | Native register, "ad" vs. "Snap" signal (§6) |
| Khaleeji-spoken VO | Reusing Meta's MSA-primary VO unchanged | Bible §6.4 spoken-variant routing (§8, §9 item 7) |
| CTA button label = a locked-line fragment | Inventing new short-form CTA copy | No new Arabic copy, ever (§7) |
| Lead/order-form conversion event | Optimizing purely to a raw Purchase event | COD funnel measurement (§3) |
| Regenerate one weak beat | Regenerate the whole 8 s master | Cost discipline, Bible §0 (§8) |
| Identical product lock across Story and Dynamic Ads | Letting the catalog render drift from the narrative cut | Bible §4 (§9 item 12) |
| Test CTA/placement/VO (Tier 1) before touching the render | Jump straight to a new generation to fix a copy problem | §8 tiering |

---

## 11. Quick-reference launch checklist

Before any Snapchat upload, confirm:

- [ ] HOOK beat (falling-strand pain hook) lands fully inside 0–1.5 s, with the ~1.6 s "reason to
      stay" transition following with zero dead air (§3).
- [ ] The cut leads with the **8 s primary** master, not the 13 s director's cut, unless this is an
      explicit Meta/TikTok-mirrored test (§4).
- [ ] The cut has been watched **fully muted** and the Pain→Trust→Ritual→Transformation→Offer arc
      still resolves (§5).
- [ ] Every overlay line is quoted verbatim from Bible §6.3 — no invented Arabic copy (§5, §9).
- [ ] Bottle, face, price, and every overlay sit inside the center-safe column, clear of the top
      14%, the bottom 20% Swipe-Up affordance, and the 6% side edges (§6).
- [ ] The Swipe-Up button is configured with the locked line's opening fragment «اطلبي الآن», and
      the full burned CTA «اطلبي الآن — الدفع عند الاستلام» holds through the final frame (§7).
- [ ] The video is full-bleed 9:16 with **zero letterboxing or pillarboxing** (§6).
- [ ] The VO register is the **Khaleeji-spoken variant** (Bible §6.4), not the Meta MSA primary,
      while overlays remain elegant MSA throughout (§9 item 7).
- [ ] Conversion tracking points at a Lead/order-form event via Snap Pixel/Conversions API, not a
      raw Purchase event (§3).
- [ ] Story Ads and Dynamic Ads (SKU `SA04050100M300`) both carry an identical, undrifted product
      lock — audited by `22-brand-guardian`/`23-product-consistency-guard` (§2, §9 item 12).
- [ ] The Bible §7 quality gate has cleared (≥95 weighted, no axis < 90) before this asset is
      uploaded at all — a live Snap test never substitutes for the pre-flight gate (§8).
- [ ] Any planned variant is classified into Tier 0/1/2 (§8) before spend is committed, with kill
      criteria and minimum test spend/window set in advance.
