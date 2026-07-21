# Flagship Image Ad — «لمسة جدّتي» (Grandmother's Touch)

> Format: static image ad, 9:16 (Reels/Story/TikTok/Snap) + 4:5 & 1:1 derived from the
> same master. Route **R1 (product-real / world-AI)**: the real product cutout is
> composited into an AI-generated scene — the bottle's pixels are your real photo, only
> the world around it is generated. Highest fidelity, lowest credits. Text added in POST.

---

## 1. Art direction
- **Frame:** vertical 9:16. The **real bottle** sits front-right on a warm wooden vanity,
  in sharp focus. A woman's hands (no face) warm amber oil / hold a thick dark hair section
  at upper-left. Hibiscus + a small dish of henna at lower-left. Warm lamp glow, golden
  practical light, soft shadow under the bottle.
- **Palette:** amber/copper/terracotta, deep wood, brass; the oil's brown-amber is echoed
  in the light. No clinical white.
- **Focal hierarchy:** bottle label legible → hands/oil ritual → ingredients.
- **Overlay-safe zones (for POST text, NOT generated):** top 18% (headline), bottom 22%
  (offer + CTA). Keep these areas cleaner/darker in the generation so text reads.
- **Model presence:** hands + hair only, no face (KSA house style).

## 2. The generation — route R1, step by step
**Inputs:** `products/mechat-red-oil/references/02-front-chroma-magenta.png` (the real
cutout) + this scene prompt. **Model:** draft on `nano-banana` (bg-replace) → QC → final
on `flux-kontext` (bg-replace) → `kie-upscaler`. Seed locked for repeatability.

### 2a. SCENE prompt (the WORLD only — the bottle comes from the reference cutout)
```
Photograph, vertical 9:16, of a warm home hair-care ritual on a dark walnut wood vanity,
golden-hour window light plus a soft warm lamp from the left. A woman's hands (only hands
and forearms, no face, natural skin with real pores and soft imperfection) gently hold a
thick section of long dark wavy hair in the upper-left, a few drops of glossy amber-red
hair oil catching the light. Fresh red hibiscus flowers and a small brass dish of henna
powder rest lower-left on the wood. Shallow depth of field, real 50mm lens character,
gentle bokeh, fine film grain, soft contact shadows, subtle warm reflections on the wood.
Cozy, authentic, premium, heritage mood — a real Saudi home at dusk, NOT a studio.
Leave the top and bottom of the frame slightly darker and uncluttered.
```
### 2b. PRODUCT (reference-conditioned — do NOT describe/redraw)
> Place the provided product cutout (the real زيت المشاط bottle) standing upright front-
> right on the wood, in sharp focus, ~38% of frame height, base grounded with a soft
> contact shadow and a faint warm reflection. Relight it to match the golden lamp from the
> left (warm key left, soft fill right). **Do not alter the bottle, cap, oil color, label,
> seal, or any text.** (In nano-banana/flux-kontext: pass the cutout as the subject/
> reference image; the model composites + relights, it does not regenerate the product.)

### 2c. NEGATIVE prompt
```
square bottle, round-shoulder wrong bottle, bright ruby/cranberry liquid, relabeled bottle,
arabic text on label changed, extra text, «الأحمر» on label, gibberish text, watermark,
logo, second bottle, face, visible face, exposed styled hair model, extra fingers, six
fingers, deformed hands, waxy plastic skin, over-smooth, CGI look, sterile studio white,
harsh flash, desert, camel, tent, souk, cool blue tone, oversaturated, floating objects,
no shadow.
```

## 3. Arabic overlays (POST — typography-compositor, El Messiri / Tajawal, RTL)
| Zone | Text (MSA) | Style |
|---|---|---|
| Top headline | «سرّ شعر جدّاتنا… في زجاجة واحدة» | El Messiri, warm cream, subtle shadow |
| Lower (offer) | «٣ زجاجات بـ ١٣٩ ريال — بدل ١٨٥» | Tajawal bold; «١٣٩» in gold |
| CTA button | «اطلبي الآن · الدفع عند الاستلام» | pill, garnet #8E1B1E fill, cream text |
Numbers LTR inside RTL; price struck-through «١٨٥». No text is ever baked by the model.

## 4. Exports (one master → many — NO re-generation)
9:16 1080×1920 (Reels/Story/TikTok/Snap) · 4:5 1080×1350 (feed) · 1:1 1080×1080 (feed/IG)
— all cropped/recomposed from the single approved master; overlays re-laid per ratio.

## 5. Fidelity + quality gate (before final spend)
- **Fidelity (skill 41)** vs references: cylindrical shape ✓, brown-amber oil ✓, swoosh+gold
  seal-left ✓, «زيت المشاط للشعر» ✓, no «الأحمر» ✓, «250 ml» ✓ → target ≥95, no hard-fail.
- **Undetectability (skill 46):** real hands (5 fingers, pores), DOF, grain, motivated light,
  contact shadow → no AI tell.
- **Culture:** hands/hair no-face, heritage home, amber → house-style pass.
- Only on PASS → run the final render.

## 6. Credit plan (BALANCED mode — relative, verify live on kie.ai)
| Step | Model | Tier | Rel. cost |
|---|---|---|---|
| Keyframe drafts ×3 (compose+relight) | nano-banana bg-replace | draft | 3 × 1 = 3 |
| QC + pick winner | — (Claude, free) | — | 0 |
| Final master | flux-kontext bg-replace | final | 10 |
| Upscale to delivery res | kie-upscaler | draft | 1 |
| All ratio exports | crop/compose (no gen) | — | 0 |
| Arabic overlays | typography (post, no gen) | — | 0 |
| **Total (relative)** | | | **≈ 14 units** |
Naive approach (re-generate each ratio at final + text-in-model retries) ≈ 60+ units →
**~75% credits saved**, with correct Arabic guaranteed (text in post).

## 7. What you'd actually do on kie.ai (2 clicks, guided)
1. Open nano-banana (image edit / bg-replace) on kie.ai.
2. Upload `02-front-chroma-magenta.png` as the subject, paste the **scene prompt (2a)** +
   **negative (2c)**, set 9:16, seed 4050. Generate 3 drafts.
3. Pick the best, run it once through flux-kontext for the final, then upscale.
4. Drop the master into the overlay template → add the Arabic (3) → export 9:16/4:5/1:1.

> This same approved keyframe is the starting image for the **video ad** (`02-video-ad.md`,
> route R3 i2v) and the **banner set** — so you pay for the hero look **once**.
