# TikTok Ads Playbook — Native-Luxe Craft for 9:16 Video
### (For-You-feed mechanics, the 0–2 s pattern interrupt, sound/trend layering, captions, Spark Ads, and the Hook→Hold→CTA framework — mapped to UNBROKEN THREAD)

> **Knowledge base article — reference material, not a skill.** Dense, scannable,
> checklist-heavy platform craft for **06-hook-generator**, **08-storyboard-director**,
> **09-beauty-commercial-director**/**10-luxury-commercial-director**, **14-motion-director**,
> **15-transition-designer**, **20-arabic-copywriter**, **21-cultural-expert-gulf**, and
> **27-quality-checker** whenever the target platform is TikTok. Grounded in
> `STUDIO-BIBLE.md` §5 (Market, Culture & Platform Rules), §6 (the flagship **UNBROKEN
> THREAD**: §6.1 beat sheet, §6.3 overlays, §6.4 VO, §6.5 sound, §6.6 negatives), §7
> (quality gates), `config/platforms.yaml` `platforms.tiktok` (the machine-readable
> delivery spec this document explains and applies), and `config/markets.yaml`
> `shared.platform_vo_policy` (the Khaleeji-VO-on-TikTok/Snap rule). **When this
> document and the Bible disagree, the Bible wins.** Nothing here invents a product
> claim, a lock detail, a price, or new Arabic copy — it applies platform craft to
> facts the studio has already locked.

---

## 1. Scope — the native-luxe tension TikTok forces

TikTok is the one platform in the studio's three-platform mix (Bible §5: Meta, TikTok,
Snapchat) where the craft goal actively fights the luxury-commercial instinct.
Meta and Snapchat reward the same cinematic polish the flagship is built from
(`knowledge/luxury-beauty-ad-language.md` §1–§3). TikTok's For You feed rewards the
**opposite surface signal** — content that *reads* as filmed by a person, in the
moment, not staged by a studio — even when, as here, the underlying production value
is genuinely luxury-grade.

**The resolution, not a compromise:** UNBROKEN THREAD does not get simplified,
re-shot handheld, or stripped of its craft for TikTok. It ships as the **same locked
8 s cut** (Bible §6.1), the same product lock (§4), the same negatives (§6.6). What
changes for TikTok is three things only, all additive, none of them touching the
beat sheet:

1. **The 0–2 s interrupt is tuned tighter** than Meta's 3 s window (§3 below) —
   the flagship's 1.2 s HOOK already clears it with margin.
2. **The spoken register swaps** to the Khaleeji-leaning VO variant (§9 below) —
   the on-screen Arabic never changes.
3. **The delivery wrapper changes** — captions on, native placement framing
   (In-Feed/TopView/Spark Ads, §8), platform-specific safe zones (§2 below).

Nothing about the camera work, the lighting, the transitions, or the product
handling is "dumbed down." "Native energy" on TikTok describes **pacing and
framing conventions the viewer's thumb has learned to trust**, not lower
production value — this document is the craft layer that lets a cinematic ad pass
that trust test without losing an ounce of luxury (Bible §5: *"native/authentic
energy even for luxe"*).

---

## 2. Platform mechanics & delivery spec (the data layer)

This is the machine-readable spec every TikTok-targeted run reads from
`config/platforms.yaml` `platforms.tiktok`, restated here with the craft reasoning
behind each number. It is DATA the studio already enforces — this table is the
explanation, not a second source of truth.

| Spec | Value | Why (platform mechanics) |
|------|-------|---------------------------|
| **Aspect ratio** | 9:16 full-bleed | TikTok is a vertical-first, full-screen player by default; anything letterboxed or center-cropped from a wider master reads as repurposed, not native |
| **Min resolution** | 1080×1920 | Below this, TikTok's re-compression on upload introduces visible banding/softness — a §6.6 negative (`banding`) risk if source is under-spec |
| **Frame rate** | 24 fps default (24–30 band) | Bible §5's film cadence; TikTok tolerates higher fps than luxury craft wants, so the studio locks to the *low* end deliberately — 24 fps still reads as intentional, not "phone video," on this platform (`knowledge/luxury-beauty-ad-language.md` §3) |
| **Duration** | 8–15 s band; **8 s primary single-generation cut leads** | TikTok's fast-scroll surface rewards the tightest cut in the studio's band; the 8 s primary is the platform's best fit, not a compromise cut |
| **Hook window** | **0–2 s** | TikTok's fastest-scrolling, highest-supply feed of the three platforms; the interrupt must register before the 2 s mark or the swipe has already happened (§3 below) |
| **Safe zones** | top ~14% / bottom ~20% / side ~6% | Username, caption stack, and CTA button sit deep in TikTok's bottom chrome — **deeper and heavier than Meta's** equivalent zone — so price/label/CTA content must clear a taller bottom band than on Reels/Stories |
| **Right rail** | Heavier than Meta/Snap (avatar, like, comment, share, and the spinning sound disc) | Center the 3-pack reveal and any label-legibility beat; do not compose toward the right edge, where the rail sits on top of picture content |
| **Sound default** | Design sound-on, legible sound-off | TikTok is the most sound-on-native of the three platforms (users expect audio), but autoplay-muted still occurs on first impression in-feed — the overlay system must still carry the story alone (§6 below) |
| **Captions** | **Required, always on** | The single biggest native-credibility signal on TikTok; an ad with no captions reads as an ad, not a post (§6 below) |
| **CTA affordance** | On-frame CTA + native TikTok CTA button (Spark Ads) + caption carries price/COD | TikTok's CTA button sits below the video, separate from in-frame content — the on-frame CTA and caption both have to work *independently* of that button, because many viewers never look at it |

**Placement map (`platforms.yaml tiktok.placements`):**

| Placement | What it is | When the studio uses it |
|-----------|------------|---------------------------|
| **In-Feed (For You)** | Standard 9:16 full-bleed unit surfaced in the algorithmic feed | The default buy for every TikTok flight |
| **TopView** | First-impression, guaranteed-first-slot unit on app open | Reach launches where the strongest possible 0–2 s interrupt is the whole strategy (§3) |
| **Spark Ads** | Paid boost of an organic-styled post, inheriting that post's native credibility, comments, and likes | The studio's preferred TikTok vehicle for UNBROKEN THREAD (§8) — it is built to *look* organic, so it performs best run as one |

---

## 3. The 0–2 s pattern interrupt (TikTok's tightest window of the three)

TikTok's hook window is the **tightest of the studio's three platforms** — tighter
than Meta's 0–3 s, looser only than Snap's 0–1.5 s (Bible §5). The flagship's HOOK
beat (0.0–1.2 s, Bible §6.1) already clears all three windows with margin, which is
exactly why it is the locked winner (`skills/06-hook-generator/SKILL.md` R7: *"design
to the strictest window and you win everywhere"*).

**What "pattern interrupt" means on TikTok specifically** — it is a narrower ask than
Meta's "hook":

| Layer | Meta's ask (0–3 s) | TikTok's ask (0–2 s) |
|-------|----------------------|-------------------------|
| **Visual** | Stop the thumb with an arresting frame | Stop the thumb **and** signal "this is not a normal ad" in the same beat — the feed's default expectation is organic content, so an ad-shaped opener (logo card, studio-lit wide, spokesperson-to-camera) is itself the thing that gets scrolled past |
| **Pacing** | A held frame can still work if striking | A held *static* frame reads slower than the feed's ambient motion — some visible movement inside the first beat (the falling strand, the slow-mo descent) out-competes stillness |
| **Recognition** | Recognition jolt matters | Recognition jolt matters **more** — TikTok's feed trains viewers to bail on generic beauty imagery within a fraction of a second because so much of it scrolls past daily |

**Why the flagship's HOOK beat already satisfies this:** extreme macro (a visual
mode TikTok's feed reads as "someone filmed something specific and real," not
"brand shot a wide establishing frame"), continuous slow-motion movement (never a
static hold), and a recognition-first image — her literal morning, not the product
— all before a single word appears (`skills/06-hook-generator/SKILL.md` Output 3.4).
No re-shoot is needed to hit TikTok's window; the interrupt is native by design.

**Rules for any TikTok-specific hook variant work (A/B testing per
`skills/06-hook-generator/SKILL.md` Output 3.5):**

- Never open on the product, a logo card, or a studio-lit wide — all three read as
  "ad" inside the first frame and are pre-scrolled (mirrors the R1 "0.4-second law").
- Keep the first beat's motion continuous, not a static held shot — TikTok's ambient
  feed motion makes stillness the outlier, and not the good kind.
- The interrupt must land **inside 2.0 s**, with margin — design to Snap's 1.5 s
  ceiling (per hook-generator R7) and TikTok clears itself automatically.
- Never sacrifice the §5 dignity floor for a harder interrupt — H8 and H13/H21 are
  capped in the locked hook slate precisely because a harder stop that shames the
  buyer or spoils the payoff loses more than it gains (`skills/06-hook-generator/SKILL.md`
  R3/R4).

---

## 4. Native/authentic energy for luxury creative (the craft, not a compromise)

"Native" on TikTok is a **specific, learnable set of framing and pacing signals**,
not an instruction to lower quality. UNBROKEN THREAD stays cinematic; it borrows
the following native signals without breaking a single element of the §4 product
lock or the luxury craft codes in `knowledge/luxury-beauty-ad-language.md`.

| Native signal TikTok rewards | How UNBROKEN THREAD already carries it | What is explicitly NOT changed |
|-------------------------------|-------------------------------------------|-----------------------------------|
| **Macro / close intimacy over wide establishing shots** | The entire 8 s cut is macro-and-mid; no wide establishing shot exists in the beat sheet at all (`luxury-beauty-ad-language.md` §2, "wide establishing shot… not used") | The macro is still lit with **one clean motivated specular** (§4/§5 of the luxury doc) — native does not mean flat-lit |
| **A single continuous camera thread, not a multi-camera "commercial" cut pattern** | The flagship's zero-hard-cut, physically-matched-transition structure (§6.1) already reads as "one person's unbroken take," which is *more* native than a typical multi-cut TikTok ad, not less | The transitions stay physical match-cuts (drop→oil, oil→scalp, hair-sweep, light-bloom) — never swapped for a shaky handheld whip-pan; a whip-pan is a *performance-marketing* tell, not a native one |
| **A human moment that isn't performed at the camera** | The real blink + real breath at TRANSFORMATION (§6.1, 5.2–6.6 s) is precisely the kind of unguarded micro-beat that reads as filmed-in-the-moment rather than directed | The turn-to-camera stays elegant and restrained (§5 modesty floor) — native does not license a mugging or exaggerated reaction |
| **Product proof over product presentation** | The oil pour and the fingertip massage are framed as sensory proof of the §3 claims, not a static product-photography insert (`luxury-beauty-ad-language.md` §5) | The label-to-camera beat and the §4 lock (cap, liquid color, seal) stay fully intact — proof-framing is a camera choice, not a license to obscure the bottle |
| **A beginning that looks like it started before the viewer arrived** | The HOOK opens mid-gesture (a strand already slipping off the comb), not on a static establishing frame | The frame is still composed with the same negative-space discipline as the rest of the cut (`luxury-beauty-ad-language.md` §6) |

**The one genuine adjustment for TikTok is pacing pressure, not framing:** because
the window is 2 s (not 3), any TikTok-specific hook variant authored for A/B testing
should bias toward the flagship's **fastest**-registering options in the scored
slate (H1, H19 — `skills/06-hook-generator/SKILL.md` Output 3.3) over slower-build
types (heritage reveal, question) that work fine on Meta's looser window but cost
TikTok precious tenths of a second.

---

## 5. Sound & trend awareness

TikTok is the studio's most sound-on-native platform (§2), which raises the sonic
bar without changing the sound design itself. The locked score (Bible §6.5) already
satisfies TikTok's sonic expectations; this section is about **how to stay
trend-aware without diluting it.**

**The locked sound spec (never altered for TikTok):**

- **Music:** minimal luxe — a warm oud/qanun motif over soft sub-bass and airy pads,
  one resolving swell exactly on the transformation beat, ~70–85 BPM feel, emotional
  not hype (Bible §6.5).
- **Sound design:** intimate breath (hook), a delicate glassy tone (falling strand),
  a soft "tick" + ripple (oil drop lands), a silky hair-movement whoosh, a low
  bottle-glass clink (pack reveal), a clean resolving chime (CTA) — all bespoke
  foley, never generic stock SFX (`luxury-beauty-ad-language.md` §8 glossary,
  "Foley").

**Trend-awareness rule — audition, never replace.** TikTok's algorithm favors
content using trending sounds, and this studio's standing practice is to
**audition** a trending audio bed as a documented A/B variant, never to substitute
it for the locked oud/qanun motif in the primary ship (`skills/07-offer-optimizer/SKILL.md`'s
No-Fake-Urgency discipline extends here: a trend chased for its own sake, at the
cost of the film's emotional register, is the audio equivalent of a fake countdown
timer). Two rules keep trend experiments safe:

1. **A trending bed may only replace the *ambient* music layer** (the oud/qanun
   pads), never the bespoke foley (glassy tone, ripple, whoosh, clink, chime) — the
   foley is what sells the realism and the sensory proof; the music bed is the only
   layer allowed to flex for trend relevance.
2. **The one resolving swell at TRANSFORMATION (5.2–6.6 s) must survive any trend
   substitution** — if a trending track has no equivalent emotional lift at that
   exact beat, the trend is not a fit and the locked motif ships instead. The
   keeper frame's emotional peak is never subordinated to a trend (mirrors
   `knowledge/luxury-beauty-ad-language.md` §3, "the hold").

**Sound-off-first discipline still governs.** Even on TikTok's more sound-on
culture, the overlay system (§6.1's Arabic lines) must carry the full Pain →
Heritage/Trust → Ritual → Transformation → Offer arc muted — first-impression
autoplay on TikTok is still commonly silent, and the §7 gate does not grade
platform-conditional legibility (Bible §5, "design sound-on but legible
sound-off").

---

## 6. Captions & on-screen text — two different systems, never confused

TikTok best practice distinguishes two layers that this studio must not merge:

| System | What it is | Studio source | Rule |
|--------|------------|----------------|------|
| **Locked narrative overlays** | The six Bible-locked Arabic lines (§6.3: Hook, Discovery, Ritual, Transformation, Offer, CTA) | `20-arabic-copywriter` Output 20.1–20.2 | Rendered in El Messiri, garnet `#8E1B1E` on cream `#FAF6F1`, RTL, right-aligned, composited in post — never left to the video model to render (`skills/20-arabic-copywriter/SKILL.md` Output 20.8) |
| **Platform captions** | TikTok's native caption affordance (the "captions on" requirement, `platforms.yaml tiktok.caption_required: true`) | Delivery/publishing layer, not a creative skill | Carries a plain-language restatement of the offer + CTA (price, pack, COD) so viewers scanning with sound off *and* without reading the styled overlay still get the offer; sits in the caption/text field TikTok exposes at publish, not composited into the frame |

**Why both exist and don't conflict:** the styled overlay is the **cinematic** text
layer — it is part of the shot, timed to the beat sheet, and carries the emotional
arc. The platform caption is the **native affordance** layer — it is TikTok's own
UI convention, sits outside the frame in the app chrome, and exists purely for
discoverability/accessibility/native-credibility. Shipping both is not
redundant: removing the styled overlay breaks sound-off legibility of the *ad
itself* (Bible §5); removing the platform caption removes a native-credibility
signal TikTok's feed specifically rewards.

**Rules:**

- The platform caption text is a plain restatement, never a re-translation — it
  quotes the Bible §6.3 offer/CTA line and gloss, run through
  `20-arabic-copywriter`'s zero-mistranslation protocol (Output 20.7) exactly like
  any other studio copy; it never introduces a new claim, number, or price.
- The styled overlay's safe-margin math (top ~14% / bottom ~20%, §2 above) accounts
  for TikTok's **caption stack sitting on top of** the platform's own username/CTA
  chrome — this is why TikTok's effective bottom-safe zone is described as
  "deeper" than Meta's in `platforms.yaml`; verify the overlay never collides with
  where TikTok will lay its own caption UI at publish.
- Captions are required on **every** TikTok upload, with no exception — an
  uncaptioned luxury spot reads as an unfinished or foreign upload, the opposite of
  native (§2).

---

## 7. The Hook → Hold → CTA framework, applied to the 8 s primary cut

TikTok's own creative doctrine collapses to three phases; this studio maps them
directly onto the locked beat sheet (Bible §6.1) rather than treating them as a
separate structure to author.

| TikTok phase | Job | Beat sheet mapping (Bible §6.1) | Duration |
|--------------|-----|-------------------------------------|----------|
| **HOOK** | Pattern-interrupt the scroll inside 0–2 s | HOOK/Pain (0.0–1.2 s) | 1.2 s |
| **HOLD** | Give a continuous reason to keep watching once the scroll has stopped | DISCOVERY→RITUAL→TRANSFORMATION (1.2–6.6 s) | 5.4 s |
| **CTA** | Convert the held attention into an action | OFFER + CTA (7.0–8.0 s), bridged by the light-bloom transition (6.6–7.0 s) | 1.4 s |

**HOOK — see §3.** The interrupt is already engineered; nothing TikTok-specific
needs adding beyond the caption/native-placement wrapper (§6, §8).

**HOLD — the part TikTok punishes hardest if it slackens.** TikTok's feed is
built around completion and re-watch signals more aggressively than Meta or Snap's
UI conventions, which means the mid-section cannot coast on the hook's momentum.
The studio's answer is structural, not decorative: the HOLD is never a static
"and here's the product" beat — it is **four more continuous, physically-matched
movements** (the drop→oil dive, the pour, the fingertip ritual, the hair-sweep
into the turn), each one opening a fresh micro-curiosity before the last one
resolves (`skills/06-hook-generator/SKILL.md` R2's Zeigarnik-loop logic, extended
across the whole HOLD, not just the hook). Two failure modes to guard against
specifically on TikTok:

- **A HOLD that reads as one long shot with nothing new happening** — even though
  the camera never cuts, each beat must introduce a new sensory or narrative
  element (trust → sensory → transformation) or TikTok's fast-swipe audience will
  bail mid-thread despite the technical continuity.
- **A HOLD that spends its climax early** — the transformation reveal
  (5.2–6.6 s) is the single glow peak (`luxury-beauty-ad-language.md` §5); nothing
  earlier in the HOLD may out-shine it, or TikTok viewers who stop watching right
  after DISCOVERY have already gotten the ad's best moment for free.

**CTA — resolve fast, resolve once.** TikTok viewers who reach the final second
are a small, high-intent slice; the studio does not spend that slice re-explaining
— it resolves calmly and once, per the locked offer beat sheet
(`skills/07-offer-optimizer/SKILL.md` Output 3.7): the 3-pack reveal, the
139 SAR/185 anchor, free shipping, and «اطلبي الآن — الدفع عند الاستلام» all land
in the OFFER+CTA beat, matched by the platform caption (§6) so the same
information is available even to a viewer who has already looked away from the
frame.

---

## 8. Ad formats — In-Feed, TopView, Spark Ads

| Format | Mechanic | Native-credibility profile | Studio usage |
|--------|----------|-------------------------------|----------------|
| **In-Feed (For You)** | Standard algorithmic placement, indistinguishable in format from organic posts | High by default — it *is* the feed | Default buy for every TikTok flight; the flagship's native framing (§4) is built for this surface first |
| **TopView** | Guaranteed first-impression slot on app open; the viewer has not yet built any scroll momentum | Lower native-credibility (it is visibly a placed unit, not algorithmically surfaced), but the **highest available reach and the least competition for the first 2 s** | Reserve for reach-launch moments (a new-market push, a seasonality spike per `markets.yaml` — Ramadan, White Friday) where the strongest possible interrupt matters more than the organic feel; lead with the flagship's hardest-stopping challenger hook if TopView is the buy (`skills/06-hook-generator/SKILL.md` Output 3.5, H19) |
| **Spark Ads** | Paid boost of an organic-styled post; the ad inherits that post's likes, comments, and view history, and displays with the poster's real handle | Highest native-credibility of the three — it visibly *is* a post, with real social proof accumulating on it | **The studio's preferred TikTok vehicle for UNBROKEN THREAD.** Publish the flagship cut as an organic-styled post first (or from a credible creator/brand handle), then Spark-boost it; comments and engagement compound the recognition-jolt effect the HOOK is already built for (§3, §7) |

**Spark Ads operating rules for this studio:**

- The boosted post must be the **exact locked cut** (§6.1 beat sheet, §4 product
  lock, §6.6 negatives) — Spark Ads inherits credibility from looking organic, not
  from being a different, looser creative; the craft discipline does not relax
  because the wrapper is native.
- Captions (§6) and the platform caption/CTA text ship identically whether the
  post is boosted or purely organic — Spark Ads changes *distribution*, not the
  creative package.
- Comments accrue on the original post; route any comment-thread objection back to
  the Bible §3 objection map (already answered in `skills/07-offer-optimizer/SKILL.md`
  Output 3.8) rather than improvising a new claim in a reply.
- TopView and Spark Ads are not mutually exclusive across a flight — a common
  studio pattern is TopView for the initial reach spike, with the same post then
  transitioning to a standing Spark Ads boost once it has organic social proof.

---

## 9. The Khaleeji-leaning VO variant (TikTok/Snap alternate)

Bible §5 offers a Khaleeji-leaning spoken VO variant specifically for TikTok/Snap,
with the on-screen overlays staying MSA in every case (`config/markets.yaml`
`shared.platform_vo_policy.tiktok_snap_alt_vo`). This is a **spoken-register swap
only** — authored, locked, and culture-gated by `20-arabic-copywriter` (Output
20.4) and `21-cultural-expert-gulf`, never improvised at the studio-execution
layer.

**What changes and what doesn't:**

- **Changes:** case endings drop (تنوين/tanwīn softened in speech), formal
  connectors relax to natural spoken equivalents, vowels shift toward their
  colloquial realization — the same five VO ideas, same order, same meaning,
  delivered with Najdi/Hijazi-leaning Gulf warmth (KSA-primary lean).
- **Never changes:** the on-screen overlay (still exact Bible §6.3 MSA), any
  claim, any number, any ingredient name — the dialect track is a **register**
  transform of an already-cleared line, never new content
  (`skills/20-arabic-copywriter/SKILL.md` Output 20.7, source-lock check).

**The locked Khaleeji-leaning lines (KSA-primary, from
`skills/20-arabic-copywriter/SKILL.md` Output 20.4):**

| Line | Khaleeji-leaning spoken variant | Transliteration | English gloss |
|------|-----------------------------------|-------------------|-------------------|
| **L1 (hook)** | **«شعرك يتساقط... والسبب إن الجذور ما توصلها التغذية.»** | *shaʿrik yitsāgaṭ… wa-s-sabab in al-judhūr mā tōṣalhā at-taghdhiya.* | Your hair is falling… because the roots aren't getting the nourishment. |
| **L2/L3 (compressed, discovery→ritual)** | **«سر مغربي أصيل... كركديه وحنا وأعشاب تغذي جذورك من العمق.»** | *sirr maghribi aṣīl… karkadēh w-ḥinna w-aʿshāb tighadhdhī judhūrik min al-ʿumq.* | An authentic Moroccan secret… hibiscus, henna, and herbs that nourish your roots deeply. |
| **L5 (offer/CTA)** | **«باك ثلاث قنينات بـ139 ريال بس... والدفع عند الاستلام. اطلبيه اليوم.»** | *bāk thalāth qanānāt bi-139 riyāl bas… wa-d-dafʿ ʿind al-istilām. uṭlubīh al-yōm.* | A 3-bottle pack for just 139 SAR… cash on delivery. Order it today. |

**Casting note (`skills/20-arabic-copywriter/SKILL.md` Output 20.4):** the same
warm native-female voice as the MSA primary, slightly more relaxed pacing and a
touch more warmth — matched to TikTok/Snap's native, less-produced feed energy —
but never loud, never announcer-register; the luxury restraint the visuals
establish still governs the read.

**Per-market lean for non-KSA TikTok flights** (on-screen overlay identical MSA in
all four markets; only the spoken lean changes, `skills/20-arabic-copywriter/SKILL.md`
Output 20.4 per-market table):

| Market | TikTok VO lean |
|--------|------------------|
| **KSA (primary)** | Najdi/Hijazi khaleeji warmth (table above) |
| **UAE** | Emirati khaleeji — same script, softer Emirati vowel cadence |
| **Oman** | Same script, calmer/more reserved Omani pacing ("quiet luxury" per `markets.yaml`) |
| **Egypt** | Egyptian dialect (pan-Arab familiar, warm) — the **only** market where Egyptian slang is permitted, and only in the Egypt-targeted cut; never in the KSA primary |

**Hard rule (Bible §5, echoed in `skills/21-cultural-expert-gulf/SKILL.md` R):**
Darija and Egyptian dialect never enter the primary Saudi TikTok cut. The
Khaleeji lean is the only sanctioned deviation from MSA for a KSA-targeted VO, and
it is spoken-only — the on-screen Arabic is untouched in every version.

---

## 10. Do / Don't — the native-vs-ad-tell gate for TikTok specifically

| DO (native TikTok craft) | DON'T (the "this is an ad" tell) | Flagship evidence |
|----------------------------|--------------------------------------|----------------------|
| Open mid-gesture, already in motion | Open on a static establishing wide or a logo card | HOOK opens on a strand already slipping off the comb (§6.1) |
| Continuous physically-matched movement | A multi-camera "commercial" cut pattern with visible edits | Zero hard cuts across the whole 8 s (§6.1) |
| Captions on, every upload | Relying on the platform CTA button alone for the offer | §6: styled overlay + platform caption both carry the offer |
| Native placement first (Spark Ads off an organic-styled post) | A hard-sell placement with no organic credibility signal | §8: Spark Ads is the preferred vehicle |
| Trending-audio *audition* on the ambient music layer only | Trending audio replacing the bespoke foley or the transformation swell | §5: foley + swell are never substituted |
| A real blink, a real breath, an unguarded micro-beat | A held, performed smile-to-camera | TRANSFORMATION beat (5.2–6.6 s), per §4 above |
| One glow peak at the transformation, nothing earlier competing | An evenly "glam" HOLD with no build | §7 HOLD discipline |
| Resolve the offer once, calmly, in the CTA phase | A countdown timer, stock-ticker urgency, or repeated price flashes | Offer resolves once at 7.0–8.0 s (Bible §6.1, §6.3) |
| Khaleeji-leaning spoken VO on TikTok/Snap, MSA overlay always | Dialect bleeding into the on-screen overlay, or Egyptian slang in the KSA cut | §9 |
| Product proof (pour, massage) framed as sensory truth | A static product-photography insert cut into the native flow | `luxury-beauty-ad-language.md` §5 |

---

## 11. Pre-flight checklist (before a TikTok-targeted cut reaches §7's quality gate)

- [ ] The HOOK's interrupt lands inside **2.0 s**, with margin against Snap's
      1.5 s ceiling (§3); no static held opening frame.
- [ ] The opener does not show a logo card, a studio-lit wide, or the product
      before DISCOVERY (§3, §4, Bible §6.1).
- [ ] Every HOLD beat introduces a new sensory/narrative element; no beat repeats
      the prior beat's information (§7).
- [ ] Exactly one glow/glam peak sits at TRANSFORMATION (5.2–6.6 s); nothing
      earlier out-shines it (§7, `luxury-beauty-ad-language.md` checklist item 6).
- [ ] The offer/CTA resolves once, calmly, at 7.0–8.0 s, matched by the platform
      caption text (§6, §7).
- [ ] Captions are attached at publish, restating price/pack/COD in plain
      language, sourced from Bible §6.3 via `20-arabic-copywriter`'s zero-
      mistranslation protocol — never freshly authored at publish time (§6).
- [ ] The styled overlay sits outside TikTok's effective bottom-safe zone,
      accounting for the caption stack the platform will lay on top of it (§2, §6).
- [ ] Sound design is the locked §6.5 spec; any trending-audio variant is a
      documented A/B that replaces only the ambient music layer and preserves the
      transformation swell (§5).
- [ ] If a Khaleeji VO variant is used, the on-screen overlay is verified
      unchanged MSA, and the spoken lines match the locked Output 20.4 table
      verbatim for the target market (§9).
- [ ] If shipping via Spark Ads, confirm the boosted post is the exact locked cut
      — no loosened craft because the wrapper reads as organic (§8).
- [ ] The §4 product lock (bottle, cap, liquid color, label, seal) and the §6.6
      negatives core are unchanged from the Meta/Snap masters — TikTok's delivery
      wrapper never touches the product-consistency lock.
- [ ] The cut still clears Bible §7's full quality gate (≥95 weighted, no axis
      <90) — TikTok-native framing is additive craft, not a lowered bar.

---

## 12. Cross-reference map

| Studio skill | What it reads from this document | Section |
|----------------|-------------------------------------|---------|
| **06-hook-generator** | The 0–2 s interrupt standard and the TikTok-biased A/B challenger guidance (favor H1/H19 over slower-build types) | §3, §4 |
| **08-storyboard-director** | The Hook→Hold→CTA phase mapping onto the locked beat sheet | §7 |
| **09/10-beauty & luxury-commercial-directors** | The native-signal table proving craft doesn't relax for TikTok | §4 |
| **14-motion-director** | The "no static held opening frame" and "continuous movement" pacing rules | §3, §4 |
| **15-transition-designer** | Confirmation that physical match-cuts stay the transition method, never a whip-pan | §4 |
| **20-arabic-copywriter** | The platform-caption vs. styled-overlay distinction, and the Khaleeji-lean sourcing rule | §6, §9 |
| **21-cultural-expert-gulf** | The Darija/Egyptian-dialect hard boundary restated for the TikTok/Snap VO context | §9 |
| **27-quality-checker** | The full pre-flight checklist as an additive TikTok-specific gate before/alongside Bible §7 | §11 |
| **29-cost-optimizer** | The Khaleeji VO variant's $0 post-production-only cost note (no incremental Kie spend) | §9 (cross-refs `skills/29-cost-optimizer/SKILL.md`) |
