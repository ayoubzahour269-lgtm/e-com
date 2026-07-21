# Campaign Credit Plan — mechat-red-oil (BALANCED mode)

> One consolidated budget across all formats. Numbers are **relative Kie-credit units**
> (draft tier = 1) for planning — **verify live prices on kie.ai before spending**. The
> whole point: reason & QC for free, spend once, reuse the hero everywhere.

## 1. The shared-asset trick (why the total is low)
ONE approved keyframe (paid once in the image ad) becomes: the image-ad master, all banner
sizes, and the **start frame of the video** (i2v) and the micro-rotation. The alpha
packshot (paid once) is reused across banners, the 3-pack, and the PDP. Text is always in
post → zero regeneration for Arabic.

## 2. Budget by deliverable
| Deliverable | Rel. units | Notes |
|---|---:|---|
| Image ad (master + exports) | ~14 | keyframe paid here, shared downstream |
| Video ad 8s (i2v) | ~13–16 | keyframe reused (0), one final render |
| 3D packshot + micro-rotation | ~17 | alpha reused downstream |
| Landing-page pack (7 slots) | ~36 | batch section images, 2 microvideos |
| Banners (from image master) | ~2 | crop/compose, no gen |
| **Campaign total** | **≈ 82–85 units** | full multi-format set |
| *Naive equivalent* | *≈ 300+ units* | regen per format/ratio + text retries |
| **Savings** | **~70–75%** | + correct Arabic + guaranteed fidelity |

## 3. Spend gates (nothing paid until these pass — for free)
1. Concept + fidelity + culture + quality ≥95 (skills 41, 46, 27) → **then** draft.
2. Draft QC ≥95 → **then** one final render (or upscale). Never iterate at final cost.
3. Per-asset estimate + this total shown **before** spend; each has a cheaper fallback
   (e.g. seedance instead of veo3 for microvideo; nano-banana-only if flux unavailable).

## 4. Cheaper fallback ladder (if credits are tight → Ultra-lean)
- Video: kling instead of veo3 (−); or skip video, ship image + micro-rotation only.
- Images: nano-banana for finals too (skip flux-kontext) → lower fidelity margin, cheaper.
- Landing: 1 microvideo instead of 2; section images at lowest draft res + upscale.
Ultra-lean campaign ≈ 45–50 units (fidelity margin slightly lower, still gated ≥95).

## 5. Order of operations (recommended)
1. Image-ad keyframe (the hero look) → QC → lock seed.
2. Banners + 3D packshot from it.
3. Video (i2v) from the same keyframe.
4. Landing pack (batch) → wire into index.html.
5. Log actuals vs these estimates to `memory/` → next campaign is even cheaper.
