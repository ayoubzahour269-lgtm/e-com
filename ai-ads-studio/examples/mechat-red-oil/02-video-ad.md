# Flagship Video Ad — «لمسة جدّتي» · 9:16 · 8s

> Route **R3 (image-to-video)**: we animate the **approved image-ad keyframe**
> (`01-image-ad.md`) — the real product is already in it, so the bottle is **never
> re-drawn frame by frame**. ONE video generation. Khaleeji VO + MSA overlays in post.
> Feels like ONE continuous handheld movement (no hard cuts) → reads as filmed.

---

## 1. Storyboard (continuous single take, 8s — no cuts, motivated camera)
| t (s) | Beat | Camera / motion | On screen |
|------:|------|-----------------|-----------|
| 0.0–1.2 | **Hook** | slow push-in on amber oil dripping from fingertips onto a dark hair section, back/side, no face | overlay fades in: «سرّ شعر جدّاتنا…» |
| 1.2–3.0 | **Ritual** | handheld drift down as hands work oil into the length, hibiscus & henna in soft foreground | — |
| 3.0–4.6 | **Product** | camera glides right and settles on the **real bottle**, rack-focus to the label, warm lamp glint | label «زيت المشاط للشعر» crisp |
| 4.6–6.2 | **Proof** | tilt up a strand: healthy shine catching light (back-of-head), gentle hair sway | «تركيبة طبيعية… تُطيل وتُكثّف» |
| 6.2–8.0 | **Offer/CTA** | ease back to the bottle beside the 3-pack, soft settle | «٣ زجاجات بـ ١٣٩ ريال» + CTA «اطلبي الآن» |

Continuity: one light source (warm left), one location, one unbroken push→drift→settle move.

## 2. Shot list (for i2v motion prompt)
- S1 macro: oil drip off fingertips → hair (0–1.2s), micro depth, real skin.
- S2 hands working oil into hair length (1.2–3.0s), soft handheld.
- S3 glide to bottle + rack focus to label (3.0–4.6s).
- S4 strand shine tilt-up, back-of-head (4.6–6.2s).
- S5 settle on bottle + 3-pack (6.2–8.0s).

## 3. Khaleeji VO (female, warm, first-person ritual) + MSA subtitle
1. «من أيام جدّاتنا… سرّ الشعر الطويل الكثيف.»
2. «زيت المشاط الأحمر — تركيبة طبيعية، مِن قلب التراث.»
3. «يُغذّي، يُقوّي، ويُطيل شعرك.»
4. «٣ زجاجات اليوم بس بـ ١٣٩ ريال — والدفع عند الاستلام.»
5. «جرّبيه… وخلّي شعرك يحكي.»
> VO in Khaleeji dialect (spoken); on-screen subtitles/overlays in MSA (فصحى). Voice is
> generated/recorded in post — never inside the video model.

## 4. Overlays (POST — motion-graphics + typography compositor)
Headline (0.6s in), benefit line (~4.8s), offer + struck «١٨٥» → «١٣٩» gold (6.4s),
CTA pill garnet (7.0s). El Messiri display / Tajawal. Text never baked by the model.

## 5. Music & sound design
- **Music:** soft oud + hand-percussion (daf) motif, warm, unhurried; lifts gently at 6.2s
  for the offer. Modern-heritage, not "exotic."
- **Sound design:** intimate room tone, a single warm oil-drip *plip* on the hook, soft
  fabric/hair rustle, a subtle brass *ting* on the label glint; VO ducks the music −6 dB.
- **Loudness:** −14 LUFS (social), full mix, no harshness.

## 6. The i2v generation — route R3
**Input:** the approved keyframe (01) as the **start frame**. **Model:** draft on
`veo3-fast` or `kling` (cheap motion test) → QC → final ONE render on `veo3` (native audio
option) or `kling` (then post audio). Seed continuity from the keyframe.

### Motion prompt (the bottle is already in the start frame — animate the WORLD + camera)
```
Animate this photograph as ONE continuous 8-second handheld shot in a warm Saudi home at
dusk. Begin on amber-red hair oil dripping from fingertips onto a thick dark wavy hair
section (no face), then drift smoothly down as the hands massage the oil along the length,
red hibiscus and henna soft in the foreground. The camera glides right and settles on the
real زيت المشاط bottle on the walnut vanity, a gentle rack-focus bringing the label into
crisp focus with a warm lamp glint, then tilts up a strand catching healthy shine, and
eases back to rest on the bottle beside a group of three identical bottles. Natural
handheld micro-shake, shallow depth of field with real lens bokeh, motion blur, fine film
grain, warm golden practical light from the left, soft real shadows. Keep the bottle,
cap, oil color, label and all text EXACTLY as in the start frame — do not change the
product. Realistic human hands, five fingers, real skin. Slow, intimate, premium, filmed —
not CGI.
```
### Negative (adds to the master negative)
```
cuts, hard transitions, morphing bottle, changing label, warping text, bright ruby oil,
square bottle, second different bottle, face, extra fingers, jitter, strobing, flicker,
identity drift, plastic skin, sped-up motion, cartoon, sterile studio.
```

## 7. Quality score (pre-generation, 10-axis — target ≥95)
Realism 96 · Undetectability 95 (hands+oil+home = low tell risk; back-of-head avoids face
artifacts) · Conversion/hook 95 (drip hook + heritage) · Brand 97 · **Product-fidelity 98**
(bottle from real keyframe, unchanged) · Culture 98 (house-style, anti-stereotype) · Arabic
96 (MSA overlay + Khaleeji VO, correct) · Cinematography 95 · Motion/continuity 94 (single
take) · Cost 97 (i2v from shared keyframe). **Overall ≈ 96 → PASS.** Regenerate only a
failing 1–2s segment, never the whole video.

## 8. Credit plan (BALANCED — relative, verify live)
| Step | Model | Tier | Rel. cost |
|---|---|---|---|
| Keyframe | (reuse from image ad) | — | 0 (already paid once) |
| Motion draft ×1–2 | veo3-fast / kling | iterate | 3–6 |
| Final 8s render | veo3 (or kling+post audio) | final | 10 |
| VO (Khaleeji), music, mix, overlays | post | — | 0 (no gen) |
| **Total (relative)** | | | **≈ 13–16 units** |
One generation, one approved hero look shared with the image ad & banners.

## 9. A/B testing plan
- **Hook:** oil-drip macro (A) vs hands-warming-oil (B) — first 1.2s.
- **Overlay angle:** heritage «جدّاتنا» (A) vs result «تطويل وتكثيف» (B).
- **CTA:** «اطلبي الآن» (A) vs «اطلبي ٣ واحصلي على شحن مجاني» (B).
- **Length:** 8s (A) vs 13–15s two-segment ritual cut (B) — only if budget allows.
- **Platform cut:** fast tutorial pace for TikTok/Snap vs slower ritual for Instagram.
Metrics: 3s hook-rate, hold/completion, CTR, COD CVR, ROAS. Roll winners weekly.
