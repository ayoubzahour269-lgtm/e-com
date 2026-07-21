# Flagship 3D / Packshot Render — mechat-red-oil

> Photoreal CGI-look packshot + a face-on micro-rotation "3D" hero. Route **R1** (real
> cutout relit) for the packshot; route **R3** (i2v micro-rotation) for the moving hero.
> **Single front reference → we do NOT invent the hidden faces of the bottle.** Full 360°
> turntable unlocks only when back/profile/top photos are added to references/.

## 1. Packshot (studio CGI look, still)
**Use:** PDP hero, ad hero, marketplace. **Input:** `references/02-front-chroma-magenta.png`.
**Model:** flux-kontext (edit/relight) → upscale.
```
Studio product photograph of the زيت المشاط bottle on a seamless deep-amber gradient
backdrop, premium e-commerce packshot. Soft large key light upper-left, gentle rim light
right, a clean elliptical soft shadow and a subtle mirror reflection beneath. Crisp label,
glossy PET highlights, the brown-amber oil glowing warmly, tiny controlled specular on the
white ribbed cap. Shallow studio depth, high detail, no clutter. Keep the bottle, cap,
oil, label and text EXACTLY as provided — relight only, do not redraw the product.
```
Negative: `square bottle, ruby oil, changed label, «الأحمر», extra bottle, harsh reflection, blown highlights, gibberish text, cool tone.`
Also render an **alpha/transparent** version (subject only) for compositing into banners.

## 2. Face-on micro-rotation hero (the "3D" motion), route R3
**Input:** the packshot as start frame. **Model:** kling (start-frame i2v). 3–4s, loopable.
```
Rotate the bottle very slightly left-to-right and back (about ±12 degrees around the
vertical axis) as if on a slow turntable, keeping the front label facing camera the whole
time; soft studio light sweeps across the glossy surface; the amber oil catches light
inside. Subtle, premium, seamless loop. Do NOT reveal the back or sides of the bottle; do
NOT change the product, label, cap, or oil.
```
> Why the ±12° limit: with only a front photo, a full turn would force the model to
> **invent** the hidden faces → fidelity break. The micro-rotation reads as "3D/premium"
> while staying 100% faithful. Provide back/profile/top photos → skill 34 unlocks a true
> 360° turntable.

## 3. Fidelity gate (skill 41)
Shape ✓ cylindrical, oil brown-amber ✓, swoosh + gold seal-left ✓, «زيت المشاط للشعر» ✓,
no «الأحمر» ✓, «250 ml» ✓. Reject any frame that drifts; regenerate from the same cutout.

## 4. Credit plan (BALANCED — relative)
| Step | Model | Tier | Rel. cost |
|---|---|---|---|
| Packshot draft ×2 | nano-banana relight | draft | 2 |
| Final packshot | flux-kontext | final | 10 |
| Alpha cutout | (mask, no gen) | — | 0 |
| Upscale | kie-upscaler | draft | 1 |
| Micro-rotation loop | kling (start-frame) | iterate | 4 |
| **Total (relative)** | | | **≈ 17 units** |
The alpha packshot is reused across banners & the landing PDP → no re-generation.
