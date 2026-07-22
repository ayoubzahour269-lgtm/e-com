// Compositing final (Sharp) : scène (photo/IA) + couche typo transparente → créative aux specs.
// C'est la couture réelle du pipeline : la SCÈNE vient de kie.ai, le TEXTE de Chromium.
import sharp from "sharp";
import type { BrandPalette } from "./types.js";

export type BgTheme = "garnet" | "cream";

/** Fond studio dégradé (grenat sombre OU crème clair) — isole la typo / accueille le produit. */
async function studioBackground(w: number, h: number, p: BrandPalette, theme: BgTheme): Promise<Buffer> {
  const svg =
    theme === "cream"
      ? `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs>
           <radialGradient id="g" cx="50%" cy="40%" r="85%">
             <stop offset="0%" stop-color="#FBF9F5"/><stop offset="55%" stop-color="#F3EEE6"/>
             <stop offset="100%" stop-color="#E7DECF"/>
           </radialGradient>
           <radialGradient id="v" cx="50%" cy="50%" r="78%">
             <stop offset="62%" stop-color="#6E1414" stop-opacity="0"/>
             <stop offset="100%" stop-color="#6E1414" stop-opacity="0.10"/>
           </radialGradient></defs>
           <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#v)"/></svg>`
      : `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs>
           <radialGradient id="g" cx="50%" cy="34%" r="82%">
             <stop offset="0%" stop-color="#8E1D1D"/><stop offset="46%" stop-color="${p.garnet}"/>
             <stop offset="100%" stop-color="#2A0808"/>
           </radialGradient>
           <radialGradient id="v" cx="50%" cy="50%" r="75%">
             <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
             <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
           </radialGradient></defs>
           <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#v)"/></svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/** Pose un master produit DÉTOURÉ (fond transparent) au centre, en zone réservée (jamais couvert par le texte). */
async function placeProduct(bg: Buffer, W: number, H: number, masterPath: string): Promise<Buffer> {
  const targetH = Math.round(H * 0.6); // le produit occupe 60% de la hauteur, centré
  const master = await sharp(masterPath)
    .resize({ height: targetH, fit: "inside" })
    .toBuffer();
  const m = await sharp(master).metadata();
  const left = Math.round((W - (m.width ?? 0)) / 2);
  const top = Math.round(H * 0.2); // laisse ~20% en haut (titre) et ~20% en bas (offre)
  return sharp(bg).composite([{ input: master, top, left }]).png().toBuffer();
}

export interface ComposeInput {
  layerPng: Buffer; // couche transparente (scrim + texte), déjà à w*scale × h*scale
  size: { w: number; h: number }; // taille de livraison finale
  scale: number; // suréchantillonnage utilisé pour la couche
  scenePath?: string; // fond photo/IA plein cadre (mode editorial)
  productMasterPath?: string; // master produit détouré → posé sur fond studio (mode hero)
  bgTheme?: BgTheme; // fond studio (défaut grenat)
  palette: BrandPalette;
}

/** Compose et renvoie un PNG final à la taille de livraison exacte. */
export async function composeCreative(input: ComposeInput): Promise<Buffer> {
  // Dimensions RÉELLES de la couche (évite tout décalage dû au deviceScaleFactor).
  const meta = await sharp(input.layerPng).metadata();
  const W = meta.width ?? input.size.w * input.scale;
  const H = meta.height ?? input.size.h * input.scale;

  const theme: BgTheme = input.bgTheme ?? "garnet";
  let rawBase: Buffer;
  if (input.productMasterPath) {
    // Mode hero : produit détouré posé sur fond studio, en zone réservée (jamais recouvert).
    const bg = await studioBackground(W, H, input.palette, theme);
    rawBase = await placeProduct(bg, W, H, input.productMasterPath);
  } else if (input.scenePath) {
    // Mode editorial : scène plein cadre (photo/IA).
    rawBase = await sharp(input.scenePath).resize(W, H, { fit: "cover", position: "attention" }).toBuffer();
  } else {
    rawBase = await studioBackground(W, H, input.palette, theme);
  }

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
