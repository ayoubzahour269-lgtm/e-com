// Compositing VERROUILLÉ — fidélité garantie par construction.
// La scène (art-directée, SANS produit) vient de l'IA ; le produit est composé depuis le
// MASTER RÉEL détouré (pixels authentiques) + ombre de contact. Le label ne peut pas dériver.
import sharp from "sharp";

export interface LockedOpts {
  productHeightFrac?: number; // hauteur du produit / hauteur image (défaut 0.5)
  productTopFrac?: number; // position verticale du haut du produit (défaut 0.32)
}

export async function composeLocked(
  sceneBgPath: string,
  masterPath: string,
  W: number,
  H: number,
  opts: LockedOpts = {}
): Promise<Buffer> {
  const pHFrac = opts.productHeightFrac ?? 0.5;
  const pTopFrac = opts.productTopFrac ?? 0.32;

  const base = await sharp(sceneBgPath).resize(W, H, { fit: "cover", position: "attention" }).toBuffer();

  const pH = Math.round(H * pHFrac);
  const master = await sharp(masterPath).resize({ height: pH, fit: "inside" }).toBuffer();
  const mw = (await sharp(master).metadata()).width ?? 0;
  const left = Math.round((W - mw) / 2);
  const top = Math.round(H * pTopFrac);

  // Ombre de contact (ellipse dégradée) sous le produit → l'ancre dans la scène.
  const shW = Math.round(mw * 1.2);
  const shH = Math.round(H * 0.055);
  const shLeft = Math.round((W - shW) / 2);
  const shTop = Math.min(H - shH, top + pH - Math.round(shH * 0.55));
  const shadowSvg = `<svg width="${shW}" height="${shH}" xmlns="http://www.w3.org/2000/svg"><defs>
    <radialGradient id="s" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.45"/>
      <stop offset="65%" stop-color="#000" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient></defs>
    <ellipse cx="${shW / 2}" cy="${shH / 2}" rx="${shW / 2}" ry="${shH / 2}" fill="url(#s)"/></svg>`;
  const shadow = await sharp(Buffer.from(shadowSvg)).png().toBuffer();

  return sharp(base)
    .composite([
      { input: shadow, left: shLeft, top: shTop }, // sous le produit
      { input: master, left, top }, // pixels RÉELS du produit
    ])
    .png()
    .toBuffer();
}
