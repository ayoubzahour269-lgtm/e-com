# Meta Ads Playbook — Reels · Stories · Feed (9:16 Video)

### Hook window, thumbstop mechanics, retention, sound-off legibility, safe zones, CTA stickers, and creative-testing structure — mapped to UNBROKEN THREAD

> **Knowledge base article — reference material, not a skill.** Dense, scannable, checklist-heavy
> media-buying/creative-ops reference for Stage 5 (**06-hook-generator**), Stage 6
> (**15-transition-designer**), Stage 9 (**20-arabic-copywriter**), Stage 10
> (**22-brand-guardian**, **23-product-consistency-guard**), Stage 12 (**27-quality-checker**,
> **28-creative-scoring-engine**, **29-cost-optimizer**), and **00-orchestrator** when it assembles
> the launch/testing plan. Grounded in `STUDIO-BIBLE.md` §0 (Scroll-Stop→Hook→Hold→CTR→CVR→ROAS
> priority), §3 (offer/price/COD), §4 (product lock), §5 (Meta platform rules), §6 (the flagship
> **UNBROKEN THREAD** — §6.1 beat sheet, §6.3 overlays, §6.5 sound), §6.6 (negatives), §7 (quality
> gates), and `config/platforms.yaml` `platforms.meta` (the machine-readable numbers this document
> explains and applies). **When this document and the Bible or `platforms.yaml` disagree, the
> Bible wins.** Nothing here invents a product claim, a lock detail, an offer term, or new Arabic
> copy — every Arabic line reused below is quoted verbatim from Bible §6.3/§6.4.

---

## 1. Scope & where this sits in the pipeline

This playbook covers **Meta only** — Facebook and Instagram **Reels, Stories, and Feed**, 9:16
video. It is the craft/media-buying layer that sits on top of the machine-readable specs in
`config/platforms.yaml` → `platforms.meta`: that file is the *numbers*, this file is the *why and
how*. TikTok and Snapchat have their own hook windows and rail geometry (Bible §5,
`platforms.yaml` → `platforms.tiktok` / `platforms.snapchat`); do not port a Meta-specific tactic
(e.g. the CTA-sticker affordance) to those surfaces without checking the sibling block first.

**Consumed by:**

| Stage | Skill | Uses this doc for |
|---|---|---|
| 5 | `06-hook-generator` | Scoring hook candidates against the 0–3 s thumbstop mechanics (§3 below) before any hook is locked |
| 6 | `15-transition-designer` | Sizing the HOOK→DISCOVERY transition to land inside the hook window (§3, §4) |
| 9 | `20-arabic-copywriter` | Overlay placement, contrast, and pacing rules for sound-off legibility (§5) |
| 10 | `22-brand-guardian`, `23-product-consistency-guard` | Auditing Advantage+ creative enhancements that can alter the locked label/overlay (§9, item 12) |
| 12 | `27-quality-checker`, `28-creative-scoring-engine` | The `hook_strength` and `video_rhythm_retention` quality axes (Bible §7) draw diagnostic bands from §3–§4 here |
| 12 | `29-cost-optimizer` | The regenerate-a-scene-not-the-video testing structure (§8) |
| — | `00-orchestrator` | Assembling the launch + creative-testing plan handed to media buying (§8, §11) |

---

## 2. Meta placement anatomy — Reels · Stories · Feed

The flagship authors **one 9:16 master** (Bible §5, §6.1) and routes it to all three Meta
placements without a re-shoot — only the VO register and CTA wrapper vary across surfaces (Bible
§5's single-master policy). Each placement reads that master differently:

| Placement | Consumption pattern | UI chrome that competes with the frame | Implication for the master |
|---|---|---|---|
| **Reels** | Full-bleed, sound-off-by-default vertical scroll; algorithmically mixed with organic Reels — the single hardest placement to *not* look like an ad in | Caption/audio-ticker band bottom, profile+follow button, like/comment/share/audio-disc rail right, "Sponsored" label top-left | Primary placement. Must scroll-stop against organic content within the 0–3 s hook window and read native, not polished-flat (Bible §5) |
| **Stories** | Full-bleed, tap-forward; viewer can skip in ~1 tap, so pacing must front-load value harder than Reels | CTA sticker/button bottom, progress bar segments top, reply field bottom, X/skip top-right | Same master; CTA sticker occupies the bottom safe zone (§7 below) — never place the price or label there |
| **Feed** | 4:5 or 1:1 crop of the 9:16 master in-stream; auto-plays muted, sound-off by default | Caption line, like/comment/share row below, page name + "Sponsored" above | The center-safe column (§6) must survive a 4:5 crop with the bottle, face, and CTA intact — Feed is the placement most likely to clip side content |

**Delivery specs (owned by `platforms.yaml` → `platforms.meta`, restated here for the media buyer):**

| Spec | Value | Bible ref |
|---|---|---|
| Aspect ratio | 9:16, full-bleed vertical | §5 |
| Minimum resolution | 1080×1920 (higher when the model supports it) | §5 |
| Frame rate | 24 fps default, 24–30 fps band | §5 |
| Duration | 8–15 s window; **8 s is the primary single-generation cut** | §5, §6.1 |
| Hook window | **0–3 s** | §5 |
| Safe zones | top 14% / bottom 20% / side 6% | §5 |
| Sound | design sound-on, must be **fully legible sound-off** | §5, §6.5 |
| Captions | required on every cut | §5 |

---

## 3. The 0–3 s hook window — thumbstop mechanics & diagnostic metrics

**Why 0–3 s specifically.** Meta's Reels/Stories/Feed scroll velocity means the viewer decides
whether to keep watching before the third second in the large majority of sessions; everything
after 3 s is only seen by people the hook already stopped. The Bible's priority order — **Scroll-
Stop → Hook → Hold → CTR → CVR → ROAS** (Bible §0, restated as the `marketing_conversion` quality
axis in Bible §7) — is sequenced for exactly this reason: nothing downstream matters if the hook
fails.

**The flagship's hook-window math (Bible §6.1, cross-referenced in `platforms.yaml`
`hook_beat_ref`):** HOOK/Pain (extreme macro comb + falling dark strand, slow-mo) runs **0.0–1.2
s** — inside even Snapchat's tighter 0–1.5 s window — and the garnet oil-drop match/liquid-morph
("the reason to stay") lands by **~1.6 s**, well inside Meta's 0–3 s window with room to spare.
One master clears all three platforms' hook windows without a re-cut.

**Metrics vocabulary — define these precisely before reading any test result:**

| Metric | Definition | What it isolates |
|---|---|---|
| **Impressions** | Times the ad was shown | Reach, not attention |
| **3-second video plays ("3-sec views")** | Plays that reached 3 continuous seconds | The scroll-stop moment — the hook window's own metric |
| **Hook Rate / Thumbstop Ratio** | 3-sec plays ÷ impressions | Whether the first 0–3 s actually stops the thumb |
| **ThruPlay** | For an 8 s cut: played to full completion (Meta's ThruPlay definition is "15 s or full length, whichever is shorter" — our primary cut is shorter than 15 s, so ThruPlay = watched in full) | Whether the whole arc (Pain→Trust→Ritual→Transformation→Offer) actually got seen |
| **Hold Rate** | ThruPlays ÷ 3-sec plays | Whether the hook's promise was paid off — the retention half of §4 below |
| **Outbound CTR** | Link clicks ÷ impressions | Whether the offer (Bible §3) convinced a stopped, held viewer to leave the app |
| **CVR (on landing page)** | Completed order-form submissions ÷ landing sessions | Whether the offer and trust elements (Bible §3 trust list) close |

**Diagnostic bands this studio uses to triage a live Meta test** (heuristic ranges, not a Meta-
published guarantee — treat them as "investigate below this line," not a pass/fail law):

| Metric | Weak — investigate the hook/offer | Workable | Strong — scale |
|---|---|---|---|
| Hook Rate (3-sec ÷ impressions) | < 20% | 20–30% | > 30% |
| Hold Rate (ThruPlay ÷ 3-sec) | < 30% | 30–45% | > 45% |
| Outbound CTR | < 0.8% | 0.8–1.5% | > 1.5% |
| Frequency before fatigue flag | — | 2–3 | refresh at > 3 |

**COD measurement note (Bible §3):** the flagship's offer closes on **cash on delivery** with
phone confirmation, not an online payment capture — a standard Meta "Purchase" pixel event is
unreliable here because the transaction isn't completed on-site. Optimize and report against a
**custom "Lead" / "Complete Registration" conversion fired on order-form submission**
(«اطلبي الآن — الدفع عند الاستلام» / *uṭlubī al-ān — ad-dafʿ ʿind al-istilām*, "Order now — Cash on
delivery," Bible §6.3), and track true sales via the fulfillment system's confirmed-COD rate as a
secondary, offline-conversion-API signal — never judge this campaign's CVR off the pixel's
"Purchase" event alone.

---

## 4. Retention tactics — holding the thread from hook to CTA

Hold Rate (§3) is earned between 3 s and the final frame. The flagship's structural answer is
**one continuous camera move with zero hard cuts** (Bible §6, "the oil drop and the hair strand
are the transition engines") — the single strongest retention device available, because there is
no edit point at which a bored thumb can leave. Below that structural choice, apply these tactics:

1. **A "reason to stay" inside every 1.5 s.** The flagship never runs more than ~1.4 s without a
   new visual event (a transition, a reveal, a motion payoff) — see the beat durations in Bible
   §6.1 (HOOK 1.2 s, DISCOVERY 1.4 s, RITUAL 1.4 s, TRANSFORMATION 1.4 s, OFFER+CTA 1.0 s). No beat
   is allowed to sit static long enough for attention to drift.
2. **Physical transitions, not edited cuts.** Match/liquid-morph transitions (drop→oil, oil→scalp,
   hair-sweep, light-bloom — Bible §6.1) read as continuous footage, which both retains attention
   *and* passes the realism gate (Bible §0 priority 1) — a hard cut is also the easiest place for
   an AI-video seam to show.
3. **Curiosity precedes payoff, every beat.** Pain (HOOK) precedes Trust (DISCOVERY); the pour
   precedes the RITUAL macro; the highlight-bloom precedes the TRANSFORMATION reveal. Each beat
   opens a small question the next beat answers — never answer a question before the following
   beat has had ~0.3–0.5 s to register it.
4. **One held "dwell" beat, not zero, not many.** TRANSFORMATION (5.2–6.6 s, Bible §6.1) is sized
   to hold the turn, a real blink, a real breath — this single beat of stillness is what makes the
   preceding motion read as earned rather than frantic. More than one dwell beat in an 8 s cut
   drags Hold Rate down; zero dwell beats reads anxious and cheap.
5. **Front-load the offer's shadow, resolve it at the end.** The price/CTA never appears before
   OFFER+CTA (7.0–8.0 s, Bible §6.1) — introducing it early breaks the emotional arc (Pain→
   Trust→Ritual→Transformation) the Bible sequences deliberately, and reads as an ad sooner,
   which lowers Hold Rate on Reels specifically (§2 above).
6. **Sound and caption pacing reinforce, never repeat, the visual beat.** The oud/qanun swell
   lands exactly on TRANSFORMATION (Bible §6.5); an overlay line changes at most once per beat
   (Bible §6.3) — stacking two retention cues (a music swell **and** a new caption) on the same
   frame is a stronger retention spike than staggering them by even 0.2 s.
7. **No dead frame at the very end.** The last frame (crisp hero pack, Bible §6.1) must already be
   the strongest, most legible frame in the cut — Reels autoplay-loops on replay, and a weak final
   frame is what a looping viewer sees repeatedly before scrolling away.

---

## 5. Sound-off legibility system

Meta's own placements are **sound-off by default** in Reels and Feed (§2) — a video that only
tells its story through VO fails the majority of impressions before it fails anything else. The
Bible commits to "design sound-on, legible sound-off" (§5); this is the execution system for that
commitment.

- **Every plot beat has a burned overlay, not just the offer.** The flagship carries **six**
  overlay lines across the arc — one per beat, sourced from Bible §6.3 — so the Pain→Trust→
  Ritual→Transformation→Offer→CTA story is fully legible with the phone muted, not just the price.
- **≤ one overlay on screen at a time, ≤ ~6–8 Arabic words per line.** Longer lines are unreadable
  at Reels' auto-scroll pace; the Bible's own overlay lines hold this discipline — e.g. the hook
  line **«كل تمشيطة… وشعرك ينقص؟»** (*kull tamshīṭa… wa-shaʿruki yanquṣ?*, "Every comb stroke… and
  your hair keeps thinning?") is six words, readable in well under a second.
- **High-contrast type on every background, not a fixed color.** El Messiri (display) / Tajawal
  (body), RTL (Bible §3), set with a subtle scrim or drop shadow so garnet-on-cream and cream-on-
  garnet beats both stay legible — never rely on the background staying light or dark.
- **Overlay position respects the safe zones (§6), not the visual composition.** An overlay must
  sit inside the center-safe column even when the shot's negative space would compositionally
  favor a lower placement — Reels' caption/audio-ticker band (bottom ~20%) will occlude it there.
- **The CTA line is the one overlay allowed to persist, not cycle.** «اطلبي الآن — الدفع عند
  الاستلام» (*uṭlubī al-ān — ad-dafʿ ʿind al-istilām*, "Order now — Cash on delivery," Bible §6.3)
  holds on the closing hero-pack frame rather than fading before the loop point, so a replaying
  Reel always shows the offer on its final visible frame (§4, item 7).
- **VO is a sound-on delight layer, never a load-bearing narrator.** If every overlay were
  stripped, the arc must still resolve visually: falling strand → bottle → pour/massage → visibly
  denser/shinier hair → 3-pack + price. Test this by watching the cut fully muted before shipping.
- **Sound design supports muted viewers too — visually.** The Bible's foley cues (glassy tone,
  ripple, hair-whoosh, glass clink, resolving chime — §6.5) each have a **visible** motion
  counterpart (the drop lands, the ripple appears, the hair sweeps, the bottles clink into place) —
  design the sound to double a visual event, never to carry information the visual doesn't.

---

## 6. Safe zones & platform UI chrome

| Zone | Reserve | What lives there on Meta | Rule |
|---|---|---|---|
| **Top** | ~14% | "Sponsored" label, page name/avatar, Stories progress bar segments | Never place an overlay line, the bottle, or a face here |
| **Bottom** | ~20% | Reels caption/audio-ticker band + profile/follow row; Stories CTA sticker + reply field; Feed caption + like/comment/share row | Never seat the price, the CTA line's *final* resting position, or the label here — build the OFFER+CTA frame so the hero pack sits above this band |
| **Right side** | ~6% | Like/comment/share icons, audio disc (Reels), profile avatar | Keep the bottle, face, and any overlay clear of the right-hand rail; center the 3-pack reveal, don't skew it right |
| **Center-safe column** | remaining ~74% width × ~66% height | — | This is where the bottle, the face, the label, the price, and every overlay line must live, on every single frame |

**Feed 4:5 crop rule:** because Feed auto-crops the 9:16 master toward 4:5, treat the **center-
safe column** (not the full 9:16 frame) as the true canvas when composing any beat that must
survive all three placements — Bible §5's "keep key content inside center safe zone" instruction
exists specifically so one master never needs a Feed-specific re-composition.

**Advantage+ creative enhancements caveat (see §9, item 12):** Meta's automatic placement
customization can crop, add auto-captions, or swap in stock music on some placements unless
specific enhancements are reviewed/disabled per ad — this can silently violate the safe-zone and
sound-design work above. Always preview the *rendered* per-placement output, not just the
uploaded master, before launch.

---

## 7. CTA stickers & on-frame CTA

Meta gives two independent CTA surfaces on Reels/Stories — the studio uses **both**, doubled, per
Bible §5 ("CTA sticker + on-frame CTA"):

| Surface | What it is | Where it sits | Studio rule |
|---|---|---|---|
| **Platform CTA sticker/button** | Meta's native tappable element (e.g. an order/shop-style CTA configured at the ad level) attached to the placement | Bottom safe zone, platform-controlled position | Configure at the ad level to match the on-frame CTA's language; never let the two disagree |
| **On-frame burned CTA** | The Bible §6.3 CTA line, burned into the final hero-pack frame | Center-safe, above the bottom band (§6) | «اطلبي الآن — الدفع عند الاستلام» (*uṭlubī al-ān — ad-dafʿ ʿind al-istilām*, "Order now — Cash on delivery") holds through the last frame so a muted, sticker-blind, or looping viewer still sees it |

**Why both, not one:** the platform sticker captures the tap-intent viewer mid-scroll before the
video even finishes; the burned on-frame CTA captures the viewer who watches to the end, replays
the loop, has ad blockers/sticker overlays disabled by their device settings, or is on a placement
(Feed) where the sticker affordance doesn't apply the same way. Redundancy here costs nothing and
recovers conversions the single-surface approach would lose.

**Placement-specific CTA notes (Bible §5, `platforms.yaml`):**
- **Reels:** CTA sticker/button + on-frame CTA burned on the final hero-pack frame.
- **Stories:** the sticker sits directly in the bottom tap-forward zone — keep the burned CTA's
  text position slightly above it so the two never visually collide.
- **Feed:** no swipe-style sticker; the burned on-frame CTA plus the ad's link/CTA button (e.g. an
  order-style button configured on the ad) carry the full weight — hold the final frame a beat
  longer if Feed delivery share is meaningful for this campaign.

---

## 8. Creative-testing structure on Meta

The studio's cost discipline (Bible §0: "One optimized prompt → one generation. Regenerate scenes,
never whole videos.") governs testing exactly as it governs production — **spend Claude reasoning
before spending video credits, and spend video credits before spending a second generation.**
Testing on Meta is layered in three tiers, each unlocked only after the prior tier is exhausted:

### Tier 0 — Pre-spend testing (zero video-generation cost)
Happens entirely inside Stage 4 (Concepts+Scoring) and Stage 5 (Hooks+Scoring), before any prompt
reaches a video model. Multiple concepts and multiple hooks are scored 0–100 against the Bible §7
quality axes; only the #1-ranked concept and #1-ranked hook (Bible §6, §8: "the concept ranked #1
… is the §6 winner … the #1 hook … is the §6.3 Hook line") proceed. This is where the overwhelming
majority of creative iteration should happen — it is free.

### Tier 1 — Post-render, no-regeneration testing (edit-only cost)
Once the single 8 s master exists, test variables that are **post-production edits to the same
render**, never a new generation:

| Variable tested | What changes | What stays identical | Who authors it |
|---|---|---|---|
| Primary text / caption copy in Ads Manager | The text field above the video | The video itself | Media buyer, from Bible §6.3/§6.4 lines only — never invented copy |
| CTA sticker wording/style | The platform sticker configuration | The burned on-frame CTA | Media buyer |
| Overlay timing polish | Fade in/out timing of an existing Bible §6.3 line | The line's wording and the underlying footage | `20-arabic-copywriter` review only |
| VO register | MSA primary vs. the Khaleeji-spoken variant (Bible §6.4) | Overlays, footage, offer | `21-cultural-expert-gulf` sign-off |
| Placement mix | Reels-only vs. Reels+Stories+Feed delivery | Creative asset | Media buyer |

### Tier 2 — Scene-regeneration testing (one-scene cost)
Only when Tier 0 and Tier 1 both plateau (Hook Rate or Hold Rate stuck below the workable band in
§3 despite copy/CTA/placement iteration) does the studio regenerate — and even then, **one beat,
not the film** (Bible §0 cost discipline, owned by `29-cost-optimizer`):

- If Hook Rate is weak → the fault is almost always the HOOK beat (0.0–1.2 s) or the transition
  landing by ~1.6 s (§3) → regenerate that scene only, re-run the Stage 12 quality gate on the
  patched cut, re-launch.
- If Hold Rate is weak but Hook Rate is strong → the fault is a mid-cut beat (DISCOVERY, RITUAL,
  or the transitions between them) losing the thread → regenerate that specific beat only.
- If CTR is weak but Hold Rate is strong → the fault is the OFFER+CTA beat or its copy, not the
  earlier footage → iterate Tier 1 first (CTA wording, sticker) before touching the render at all.
- **Never** regenerate the whole 8 s master to fix a single-beat problem — this is the exact
  discipline Bible §0 names ("regenerate scenes, never whole videos").

### Test structure, cadence, and kill criteria

| Parameter | Studio default | Rationale |
|---|---|---|
| Variants per test | 3–5 (Tier 1) or 1 replacement beat (Tier 2) | Enough spread to read a signal without fragmenting budget below significance |
| Minimum spend per variant before a read | ~3–5× the account's target CPA, or a fixed floor (commonly a low-hundreds-USD test budget), whichever is larger | Below this, Hook/Hold/CTR deltas are usually noise, not signal |
| Minimum test window | 3–4 days, spanning at least one full day-of-week cycle | Avoids a single-day anomaly reading as a verdict |
| Budget strategy | Campaign Budget Optimization (CBO) across variants for delivery efficiency; Dynamic Creative only when testing independent copy/CTA combinations, not full creative swaps | Keeps the flagship's locked body from being algorithmically recombined into off-Bible permutations |
| Fatigue / refresh trigger | Frequency > 3, or Outbound CTR down > 20–30% week-over-week with flat/rising frequency | Signals audience saturation, not a creative failure — refresh cadence, not concept |
| Kill criteria | Hook Rate stays in the "weak" band (§3) after Tier 1 iteration exhausted **and** a Tier 2 scene regen | Confirms the concept itself, not an executional detail, is the problem — escalate to Stage 4 re-scoring, not another Meta test |

**The pre-flight gate always applies first.** No variant — Tier 0, 1, or 2 — reaches Meta at all
until it clears the Bible §7 quality gate (≥95 weighted, no axis < 90). Live Meta metrics are the
**post-flight** signal that confirms or challenges the pre-flight score; they are never a substitute
for it, and a variant that fails live never justifies lowering the gate threshold.

---

## 9. Current best-practice bullets (flagship-tied)

1. **Land the pain hook fully inside 0–3 s, with the "reason to stay" transition by ~1.6 s.** The
   flagship's HOOK (0.0–1.2 s) + drop match-cut (~1.6 s) clears this with margin (§3).
2. **Design sound-on, verify sound-off.** Watch every cut fully muted before it ships — the Pain→
   Trust→Ritual→Transformation→Offer arc must resolve on overlays alone (§5).
3. **Use both CTA surfaces — sticker and burned on-frame — never just one.** They recover different
   viewer populations (§7).
4. **Keep the bottle, face, price, and every overlay inside the center-safe column at all times**,
   because Feed silently crops toward 4:5 (§6).
5. **Prefer physical match-transitions over hard cuts.** They raise both Hold Rate (§4) and realism
   score (Bible §0 priority 1) simultaneously — the flagship's four transitions are the reference
   pattern (Bible §6.1).
6. **Resolve the offer once, calmly, in the final frame — never with urgency devices.** «باك 3
   قنينات — 139 ﷼ بدل 185 · شحن مجاني» (*bāk 3 qanānāt — 139 riyāl badal 185 · shaḥn majjānī*, "3-
   bottle pack — 139 SAR instead of 185 · Free shipping") stated once outperforms a countdown timer
   for this Gulf, trust-led, COD audience (Bible §3, §5's respect rules).
7. **Measure this campaign's true conversion off a Lead/order-form event, not the Purchase pixel**,
   because the offer closes on COD with phone confirmation, not online payment (§3).
8. **Run the Khaleeji-spoken VO on TikTok-style native placements and the MSA primary on Meta's
   premium feel**, per Bible §6.4 — but keep overlays in elegant MSA on every surface regardless of
   VO register, because overlays, not VO, carry the sound-off story (§5).
9. **Never let Dynamic Creative recombine the locked body with off-Bible copy.** Use CBO for
   delivery efficiency across sanctioned Tier-1 variants (§8), not to let the algorithm free-mix
   creative elements that must stay locked (Bible §4, §6.6).
10. **Treat frequency > 3 or a >20–30% week-over-week CTR decay as a refresh trigger, not a concept
    failure** — regenerate the weakest single beat (Tier 2, §8), never the whole master.
11. **Hold the final hero-pack frame long enough to survive an autoplay loop.** Reels loops on
    replay; the last visible frame must always be the strongest, most complete frame in the cut
    (§4, item 7).
12. **Audit Advantage+ creative enhancements per ad before launch** — automatic cropping, added
    captions, or a swapped music bed can silently violate the safe-zone work (§6), the sound design
    (Bible §6.5), or the product/label lock (Bible §4); review the *rendered* per-placement preview,
    not the uploaded master, and disable any enhancement that conflicts with the locked creative.
13. **Provide the hijab/styled-hair A/B pair as a placement-level or audience-level variant, not a
    concept change.** Both cuts carry the identical beat sheet, overlays, and offer (Bible §5) — this
    is a Tier-1-equivalent audience-fit variant, not a new concept requiring re-scoring.
14. **Size every overlay line to ≤ ~6–8 Arabic words and ≤ one line on screen at a time.** Longer or
    stacked text fails Reels' scroll pace and the Bible §6.3 discipline it was authored to (§5).
15. **Never surface the price or CTA before the OFFER+CTA beat (7.0–8.0 s).** Early price reveal
    breaks the Pain→Trust→Ritual→Transformation arc's emotional sequencing and reads as an ad
    sooner, costing Hold Rate on Reels specifically (§4, item 5).

---

## 10. Do / Don't — Meta-specific tells

| DO | DON'T | Why (Bible/platform ref) |
|---|---|---|
| One 9:16 master, center-safe, retargeted only by VO register + CTA wrapper | A separate re-shoot or re-crop per placement | Bible §5 single-master policy |
| Physical match-transitions | Hard cuts every 1–2 s | Hold Rate + realism (§4, Bible §0) |
| Burned overlay per beat, ≤ one on screen | Caption walls or stacked bullet claims | Sound-off legibility (§5) |
| CTA sticker **and** burned on-frame CTA | Relying on only the platform sticker | §7 |
| Offer stated once, calmly, at the end | Countdown timers, "only 3 left," shouting price stamps | Bible §5 respect rules, §9 item 6 |
| Lead/order-form conversion event | Optimizing purely to the Purchase pixel | COD funnel measurement (§3) |
| Regenerate one weak beat | Regenerate the whole 8 s master | Cost discipline, Bible §0, §8 |
| Preview the rendered per-placement output before launch | Trust the uploaded master unchecked | Advantage+ caveat (§6, §9 item 12) |
| Test copy/CTA/placement (Tier 1) before touching the render | Jump straight to a new generation to fix a copy problem | §8 tiering |

---

## 11. Quick-reference launch checklist

Before any Meta upload, confirm:

- [ ] HOOK beat lands fully inside 0–3 s; the "reason to stay" transition lands by ~1.6 s (§3).
- [ ] The cut has been watched **fully muted** and the Pain→Trust→Ritual→Transformation→Offer arc
      still resolves (§5).
- [ ] Every overlay line is quoted verbatim from Bible §6.3 — no invented Arabic copy (§5, §9).
- [ ] Bottle, face, price, and every overlay sit inside the center-safe column, verified against a
      simulated 4:5 Feed crop (§6).
- [ ] The CTA sticker/button is configured **and** the burned on-frame CTA holds through the final
      frame (§7).
- [ ] The offer line («باك 3 قنينات — 139 ﷼ بدل 185 · شحن مجاني» / *bāk 3 qanānāt — 139 riyāl
      badal 185 · shaḥn majjānī*) appears once, calmly, with no urgency device (§9, item 6).
- [ ] Conversion tracking points at a Lead/order-form event, not the Purchase pixel (§3).
- [ ] The rendered **per-placement** preview (Reels, Stories, Feed) has been checked — not just the
      uploaded master — for Advantage+ cropping/caption/music interference (§6, §9 item 12).
- [ ] The Bible §7 quality gate has cleared (≥95 weighted, no axis < 90) before this asset is
      uploaded at all — a live Meta test never substitutes for the pre-flight gate (§8).
- [ ] Any planned variant is classified into Tier 0/1/2 (§8) before spend is committed, with kill
      criteria and minimum test spend/window set in advance.
