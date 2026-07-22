// Compositing final (Sharp) : scène (photo/IA) + couche typo transparente → créative aux specs.
// C'est la couture réelle du pipeline : la SCÈNE vient de kie.ai, le TEXTE de Chromium.
import sharp from "sharp";
import type { BrandPalette } from "./types.js";

/** Fond studio dégradé (grenat) quand aucune scène n'est fournie — isole la typo. */
async function studioBackground(w: number, h: number, p: BrandPalette): Promise<Buffer> {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g" cx="50%" cy="34%" r="82%">
        <stop offset="0%" stop-color="#8E1D1D"/>
        <stop offset="46%" stop-color="${p.garnet}"/>
        <stop offset="100%" stop-color="#2A0808"/>
      </radialGradient>
      <radialGradient id="v" cx="50%" cy="50%" r="75%">
        <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#v)"/>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

export interface ComposeInput {
  layerPng: Buffer; // couche transparente (scrim + texte), déjà à w*scale × h*scale
  size: { w: number; h: number }; // taille de livraison finale
  scale: number; // suréchantillonnage utilisé pour la couche
  scenePath?: string; // fond photo/IA ; si absent → studio
  palette: BrandPalette;
}

/** Compose et renvoie un PNG final à la taille de livraison exacte. */
export async function composeCreative(input: ComposeInput): Promise<Buffer> {
  // Dimensions RÉELLES de la couche (évite tout décalage dû au deviceScaleFactor).
  const meta = await sharp(input.layerPng).metadata();
  const W = meta.width ?? input.size.w * input.scale;
  const H = meta.height ?? input.size.h * input.scale;

  const rawBase = input.scenePath
    ? await sharp(input.scenePath)
        .resize(W, H, { fit: "cover", position: "attention" })
        .toBuffer()
    : await studioBackground(W, H, input.palette);

  // Normalise la base aux dimensions EXACTES de la couche (l'ombre du dsf / rasterisation SVG).
  const base = await sharp(rawBase).resize(W, H, { fit: "fill" }).toBuffer();

  // NB : sharp applique resize AVANT composite dans une même chaîne. On compose d'abord
  // à pleine résolution (passe 1), puis on rééchantillonne à la taille de livraison (passe 2).
  const hires = await sharp(base)
    .composite([{ input: input.layerPng, top: 0, left: 0 }])
    .png()
    .toBuffer();

  return sharp(hires)
    .resize(input.size.w, input.size.h, { fit: "fill", kernel: "lanczos3" })
    .png({ quality: 100 })
    .toBuffer();
}
