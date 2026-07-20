# Product Registry — how the studio stays faithful to EVERY product

This folder makes product fidelity **structural and automatic**, and makes onboarding
a **new product a 2-minute drop-in** — no per-product re-engineering, ever.

## The contract
The studio **never** describes a product in words and lets a model redraw it. The
real photos here are the ground truth; the product enters every generation by
**reference-conditioning** (see routes R1/R2/R3 in each `product-lock.yaml`). A
generated asset that drifts from the lock is **auto-rejected** by the fidelity
checker (skill 41) before a human ever sees it.

## Add a new product (repeatable, generic)
```
products/<slug>/
  references/            ← drop the REAL photos (front is enough to start;
                           back / profile / top unlock full 360° 3D)
  product-lock.yaml      ← run skill 40 (product-identity-onboarding) → identity profile
  fidelity-checklist.md  ← generated with it → the auto-QC gate for this product
  reference-manifest.yaml← which photo feeds which asset / angle / route
```
1. Create `products/<slug>/references/` and drop in the real product photos.
2. Run **skill 40** → it pixel-samples the canonical photo and writes
   `product-lock.yaml` + `fidelity-checklist.md` + `reference-manifest.yaml`.
3. That's it. Concepts, formats, routing, and the fidelity gate are all generic and
   read the lock. You never manually verify fidelity again.

## The route that guarantees fidelity (default)
**R1 — product-real / world-AI:** keep the real cutout pixel-intact; the model
generates only the *world* around it (background, light, shadows). A clean
chroma-key/cutout packshot (like Mechat's magenta one) makes this the highest-fidelity
**and** lowest-credit route. Reserve R2 (reference-edit) and R3 (image-to-video) for
when the product must be re-posed or moved.

## Current products
- **`mechat-red-oil/`** — LOCKED to the owner-supplied real packshots (cylindrical
  tall bottle, white ribbed cap, brown-amber oil, red-swoosh label «زيت المشاط للشعر»,
  gold «100% natural» seal, 250 ml). ⚠️ The old `/assets` renders had drifted (square
  bottle, invented «الأحمر», moved seal) and are explicitly **not** identity truth.
