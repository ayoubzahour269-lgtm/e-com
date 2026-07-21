# AI-Tell Checklist — The Undetectability Pass/Block Sheet

### The operator's tick-sheet mirror of **skill 46 (ai-tell-detector)**. This is the adversarial half of the realism gate rendered as a checklist: not "is it beautiful" (04 owns that), not "is it the right bottle" (23/41 own that), but the one question the least charitable viewer in the world asks — **"can I tell this is AI?"** Run it on every compiled prompt BEFORE spending a Kie credit (pre-gen, predictive) and on every delivered still/clip AFTER (post-gen, forensic). One unmistakable tell ends the ad, no matter how high every other axis scores.

> **Quality / checklist artifact — not a skill.** The auditable companion to `skills/46-ai-tell-detector/SKILL.md` and `knowledge/undetectable-realism-doctrine.md`: the doctrine explains **why** ("perfect is the tell; imperfect is real"), the skill runs the reasoning, and **this sheet is what you tick**. Consumed by **46-ai-tell-detector** (owns it), **27-quality-checker** (folds the undetectability sub-axis into the §7 Realism axis), and **28-creative-scoring-engine** (logs the certified number). Sits beside `quality/realism-checklist.md` (the frame-by-frame realism pass), `quality/scoring-rubric.md` (the weighted 0–100 gate) and `products/<slug>/fidelity-checklist.md` (the *product identity* pass — a separate gate).
>
> **Grounding.** STUDIO-BIBLE §0 (Realism is priority ONE — "it must look filmed, not generated"), §5 (Gulf market, 9:16, sound-off floor, hands + hair + back-of-head default framing), §7 (ship threshold ≥ 95 weighted, **NO axis < 90**). STUDIO-BIBLE-V2 §7ter.B (Undetectable Realism Engine) and §7ter.C (product-agnostic guardian). **When this sheet and the Bible disagree, the Bible wins.** Product rows read the ACTIVE `products/<slug>/product-lock.yaml` — this sheet hardcodes no vessel. Arabic label/ad text is added in POST by **37-typography-compositor**; any model-generated Arabic on a raw generation is tell **T13** and an automatic BLOCK.

---

## 0. How to run this sheet

1. **Two passes, both mandatory.** `[PRE-GEN]` predictive — hunt the compiled prompt + locked keyframe + references for tell *invitations* and prevention *omissions* (zero credits, can kill a doomed prompt for free). `[POST-GEN]` forensic — hunt the delivered frames at native resolution with explicit freeze-frame + pinch-zoom. A pre-gen PASS is a licence to spend, not a guarantee; you always re-hunt the render.
2. **Scope first (46.1).** Declare which of **T1–T14** are IN SCOPE from the compiled framing + culture floor, and state the out-of-scope ones explicitly — never silently skip. A back-of-head oil-pour hero puts T4/T6/T7/T8/T9/T12 in scope and T3/T5 out; a full-face UAE cut puts all fourteen in.
3. **Load the baseline.** Read the active `products/<slug>/product-lock.yaml` so you can separate a **tell** (physically impossible — glass warps, oil floats, reflection lies → yours) from a **drift** (physically possible but wrong — square instead of cylinder, gold cap, «الأحمر» painted on the label → 23/41's). Many defects are both: flag both, route both, **block once**.
4. **Severity per caught tell.**
   - `[UNMISTAKABLE]` — a lay viewer sees it without looking (sixth finger, fused teeth, warping arch, garbled text, floating bottle, CGI face). **Any ONE = automatic BLOCK** regardless of score.
   - `[SUSPECT]` — a primed viewer or a freeze-frame catches it (waxy skin, off reflection, faint helmet-hair, soft contact shadow, slightly floaty motion). Accumulates against the score.
   - `[COSMETIC]` — only a 300% pixel-peep finds it; does not read at feed scale. Deducts lightly; noted for the finisher.
5. **SUSPECT resolves to PRESENT unless disproven.** The false-negative cost (a shipped tell to 50k people) dwarfs the false-positive cost (one more reasoning pass, zero credits). When unsure, escalate.
6. **Never generate to check.** This gate is `model_cost: none`. You inspect the plan (pre-gen) and the frames 29 already paid for once (post-gen). Regenerating "to see" is a cost-discipline AND a role violation.
7. **Weight the hunt by model.** Read `config/kie-models.yaml` for the routed generator's rap sheet: Veo3 → hands + fast-motion physics + temporal drift; Seedream/Flux/Nano-Banana/Imagen → text (confirm none) + symmetric-face uncanniness + warping fine geometry; Kling → floating objects + soft/absent contact shadows. Do not hunt every tell equally on every model.
8. **Weight the hunt by culture.** With the Gulf hands + hair + back-of-head default (§5, `gulf-beauty-brand-norms.md`), the face is often off camera — so the deepest scrutiny goes to **hands (T4), fluid/oil physics (T7/T11), contact shadows & reflections (T8/T9), hairline flyaways (T6) and the optical signature (T12/T14)**. That is where this studio's ads actually die.
9. **Evidence or it didn't happen.** "Looks off" is not a verdict. Every tick carries region + timecode/beat + what the freeze-frame shows + severity + owning route: `sixth finger, right hand, B2 6.1–6.4s, PRESENT, UNMISTAKABLE, route→44/17`.

---

## The presence gate — "show me the five" (run before hunting any commission)

Before you look for anything *wrong*, confirm the fingerprints of "filmed" are *present*. Their absence is tell **T14**, the omission signature — the single most common reason an ad "feels AI" without the viewer being able to say why. If you cannot point at all five where they belong, the omission penalty applies **even before you find one commission tell**.

- [ ] **A real pore / skin texture** — pores, peach-fuzz, capillary redness on any on-camera skin (face, hands, nape). Not plastic sheen.
- [ ] **A real flyaway strand** — 3–5 stray strands + a soft translucent hairline catching rim light. Not a lacquered helmet.
- [ ] **Real sensor grain / noise** — a fine luminance grain floor, not clinical digital cleanliness.
- [ ] **A real contact shadow** — every object *sits* on its surface with occlusion and a grounded shadow. Not hovering.
- [ ] **Real motion blur (video)** — moving hair/hands/oil smear correctly per shutter. Not impossibly crisp at speed.

---

## The T1–T14 tell ledger

Each family below is a block of the taxonomy skill 46 owns. Tick verdict `PRESENT / ABSENT / SUSPECT` per row with cited evidence. `[HARD]` rows are BLOCK-on-fail. Cross-reference the owning prevention skill for the route.

### T1 · Waxy / plastic skin  `[HARD · route→44 (+17)]`
- [ ] Skin shows pores, micro-texture, peach-fuzz, subsurface scattering — not an airbrushed plastic/wax sheen.
- [ ] Blemish budget present (a mole, faint redness, uneven tone) rather than a flawless synthetic complexion.
- [ ] Warm-toned Gulf skin (§3) reads as living tissue under the set light, not a matte mannequin. *In the hands+hair default T1 applies to hands and nape even when the face is off-camera.*

### T2 · Over-symmetry  `[MAJOR → caps axis <90 · route→44]`
- [ ] Face/body is NOT eerily mirror-symmetric — brow height, smile, ear position, nostrils differ L/R.
- [ ] No "model-generator" uncanny perfection; deliberate natural asymmetry is visible.

### T3 · Dead / glassy eyes  `[HARD · route→44 (+17)]`
- [ ] Paired catchlights matching the real light source shape; not a corpse's zero-catchlight stare.
- [ ] Tear-meniscus moisture on the lower lid; sclera has a faint reflective film — not bone-dry matte.
- [ ] (Video) micro-saccades, irregular blink cadence (~3–6s, not metronomic), lids actually meet on blink.
- [ ] Gaze has slight vergence + L/R asymmetry; pupils sized to scene light. *Out of scope if face is off-camera — declare so.*

### T4 · Extra / melting / merged fingers  `[HARD · route→44 (+17)]`
- [ ] Exactly five fingers on every visible hand in every inspected frame; correct joint + knuckle count; right-length thumb.
- [ ] No merged, melted, extra, missing, or bent-wrong digit; real nails.
- [ ] Where a hand grips the bottle or touches hair it **deforms** the surface (compression + cast contact shadow) — not a floating no-contact grip. *Highest-priority hunt in the Gulf hands-forward framing.*

### T5 · Fused / veneer teeth  `[MAJOR · route→44]`
- [ ] Individual, slightly non-uniform teeth with edge translucency — not a single fused white "veneer wall".
- [ ] Plausible tooth count. *Out of scope if no open smile — declare so.*

### T6 · Helmet hair / no flyaways  `[HARD · route→16]`
- [ ] Individual stray strands + a soft backlit frizz halo; the hairline is translucent, not a razor edge.
- [ ] Strand separation in motion; light passes through the fringe. Not a solid sculpted lacquered mass or a "wig-swap".
- [ ] The hero surface for a hair-oil ad — treat any lacquered helmet as an UNMISTAKABLE fail.

### T7 · Floaty / weightless motion  `[HARD (video) · route→43]`
- [ ] Hair, cloth and oil have weight and inertia — they lag, settle and overshoot, not drift/ease weightlessly.
- [ ] The oil pours with real viscosity, surface tension and a continuous stream — not a floating rope of liquid.
- [ ] No object glides on an invisible track; motion has momentum, not a keyframed float.

### T8 · Mismatched shadows & dishonest reflections  `[HARD · route→43 (+13 lighting)]`
- [ ] All shadows fall from ONE consistent key direction; no object casts against the room's light.
- [ ] Reflections in the glass, the oil surface, a mirror or a polished podium show what should actually be there — they do not lie, omit, or invent.
- [ ] The bottle's specular highlight is consistent with the set's key light. *The eye reads a wrong shadow subconsciously — top-tier tell.*

### T9 · Floating / un-contacted objects  `[HARD · route→43 (+18 env)]`
- [ ] Every prop (bottle, cup, flower, tray) sits on its surface with a real contact shadow + occlusion — nothing hovers a hair above the podium.
- [ ] No half-merged prop; no object that is partly two objects.

### T10 · Warping straight lines & drifting geometry  `[HARD · route→42 (+18 env)]`
- [ ] Every straight line traced — mihrab arch, shelf, window mullion, the bottle's own vertical wall AND its fill-line — is straight, not wavy/bowed/drifting.
- [ ] Repeating patterns (tile, mashrabiya, fabric weave) do not smear, churn or lose count.

### T11 · Impossible physics  `[HARD · route→43]`
- [ ] Nothing passes through anything; no limb bends where no joint exists; cloth folds under real gravity.
- [ ] Fluid, splash and droplet behaviour obeys real dynamics; hair collides with the shoulder, it does not clip through it.

### T12 · Unnatural bokeh / no depth-of-field  `[MAJOR · route→42]`
- [ ] A believable focal plane with real bokeh — not everything sharp edge-to-edge like a renderer.
- [ ] Bokeh shape/rendering matches a real lens (cats-eye toward frame edge, no ringing/onion), depth transition is optically plausible.

### T13 · Gibberish / model-generated text  `[HARD · route→37 + 26]`
- [ ] There is **NO** generated text anywhere — not on the label, not as an overlay, not on set signage. Arabic label/ad text is a POST job (37); any glyph the model produced is a fail AND a process violation.
- [ ] Confirm the compiled prompt never *requested* text (pre-gen). If the render has model Arabic, flag T13, route to 37 (owns the real type) + 26 (the prompt let text in) — never "accept" model text because it "happens to look okay".

### T14 · The optical / omission signature  `[MAJOR, compounds · route→42 & 45]`
- [ ] **Grain** present (see presence gate) — not plastic-clean.
- [ ] **Motion blur** on moving elements (video) — not impossibly crisp.
- [ ] **Depth-of-field** present (ties to T12).
- [ ] Filmic highlight roll-off, a subtle vignette, handheld micro-shake, chromatic aberration at the edges — the fingerprints of a real lens/sensor/body, not clinical digital flatness.
- [ ] The set is NOT sterile-clean — dust, wear, fingerprints, imperfection exist; a showroom that never existed reads as CGI.
- [ ] **T14b · Temporal drift (video only, route→45):** play it — identity holds frame to frame; the face/hair/label does not morph, flicker, crawl or "boil"; background objects do not pop in/out; the product label stays legible and stable. *Invisible on a still, fatal in motion.*

---

## Scoring — the undetectability sub-axis (mirrors skill 46 Best Practices)

Compute exactly as skill 46 does, then hand the number + evidence to 27 (Realism axis) and 28 (scorecard).

```
score = 100
      − 40 × (count of UNMISTAKABLE tells)      # each ALSO triggers the hard-fail veto
      −  8 × (count of SUSPECT tells)
      −  2 × (count of COSMETIC tells)
      − 15  if the optical signature is failing  # no grain AND no DoF AND no motion blur
score = max(score, 0)
```

**GATE — both conditions must pass:**
- **undetectability ≥ 90** (mirrors §7's no-axis-<90 discipline), AND
- **zero UNMISTAKABLE tells** (the veto — an UNMISTAKABLE tell BLOCKS at score 92 just as hard as at 40).

Either condition failing → **BLOCK**. The score grades the *field of small stuff*; the hard-fail list is a *veto*; both are required.

---

## Routed fix list — the cheapest remediation wins

For every surviving tell, tick the minimum-credit route (prefer **a < b < c**), then hand to 27 + 29:

- [ ] **(a) POST fix — no reroll** — add grain / add motion blur / regrade a wrong shadow / crop out a bad hand / inpaint a small region → editing dept (52-colorist, 54, 55) or finisher. Cheapest possible.
- [ ] **(b) Localized region or scene reroll** — one targeted regenerate (inpaint the hand, re-render one scene) → owning director + 29. *"Regenerate scenes, never whole videos" (§0).*
- [ ] **(c) Prompt / negative / reference fix, then re-run** — the tell was *invited by the words* (a "flawless/pristine/symmetric" adverb, a missing motion-blur note, a text request) → 24 (negative) + 26 (prompt) + 23 (re-lock reference). The zero-credit fix when caught pre-gen — route it first whenever it applies.

Route DRIFTS separately: any wrong-but-possible product defect → **23-product-consistency-guard / 41-product-fidelity-checker**, not this gate. A render can be tell-clean and fidelity-wrong, or fidelity-perfect and tell-broken — report them as two lines to two owners.

---

## Anti-patterns — how this gate fails (mirror of skill 46 Failure Conditions)

- **Passed a tell.** The worst outcome — an UNMISTAKABLE artifact shipped because it was graded SUSPECT, or a SUSPECT "given the benefit of the doubt". Unresolved SUSPECT resolves to PRESENT. A shipped tell is a category failure, not a scoring miss.
- **Blocked a non-tell.** Flagged a *real* imperfection — a genuine pore, a real flyaway, honest grain, natural asymmetry — and demanded it be "cleaned up". That is the doctrine inverted: sanding the ad back toward "perfect" is sanding it back toward the tell. Real imperfection is the target, not the defect.
- **Confused clean with real.** Gave a poreless, grainless, DoF-less, blur-less render a high score because "nothing looks wrong". Nothing looks wrong **is** the tell — absence of imperfection is presence of "generated".
- **Hardcoded a product.** Hunted against one vessel when the active lock was another, missing real drifts and inventing false ones. Always load `products/<slug>/product-lock.yaml`.
- **Double-charged a drift as a tell** (or vice-versa), corrupting both this score and 23/41's. Warping = tell; wrong-but-possible = drift; both = flag both, block once.
- **Accepted model-generated text.** Any Arabic (or Latin) glyph the model produced is T13 and a process violation. Text is a POST job (37).
- **Spent a credit to check.** This gate is `model_cost: none`. Regenerating "to see" is the exact waste the studio exists to avoid.
- **Returned "feels AI" with no region, timecode, severity or route.** An unactionable verdict cannot be fixed or re-checked — it is a shrug, not a finding.
- **Skipped the pre-gen pass** and let a doomed prompt burn a paid generation a free predictive scan would have stopped.

---

## Quick operator card (tape to the monitor)

1. Load the active product-lock. Declare T1–T14 scope (in AND out).
2. Presence gate: pore · flyaway · grain · contact shadow · motion blur — all five?
3. Optical signature first (T12/T14) → hard geometry (T4/T5/T10/T13) → human-micro (T1/T2/T3) → hair (T6) → physics & contact (T7/T9/T11) → light consistency (T8) → set/objects → temporal (T14b, video).
4. Classify each: UNMISTAKABLE / SUSPECT / COSMETIC. SUSPECT → PRESENT unless disproven.
5. Score. Gate = **≥90 AND zero UNMISTAKABLE**. Any one unmistakable tell = BLOCK.
6. Separate tell from drift. Route drifts to 23/41.
7. Route every survivor to the cheapest fix (a<b<c). Hand score + verdict to 27 and 29.
8. Never generate to check. Evidence on every line or it doesn't count.
