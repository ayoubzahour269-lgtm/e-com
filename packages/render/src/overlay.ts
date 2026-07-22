// Couche de texte TRANSPARENTE pour incrustation vidéo (typo déterministe sur les plans).
// Réutilise le template banner_top (voile haut + titre) → PNG transparent à incruster par ffmpeg.
import { buildFontFaceCss } from "./fonts.js";
import { renderHtmlToPng } from "./browser.js";
import { bannerTopHtml } from "./templates/bannerTop.js";
import { FORMAT_SIZES, type CreativeSpec } from "./types.js";

/** Rend une couche transparente (voile + texte) à la taille du format, à incruster sur une vidéo. */
export async function renderOverlayLayer(spec: CreativeSpec): Promise<Buffer> {
  const size = FORMAT_SIZES[spec.format];
  const html = bannerTopHtml(spec, size, buildFontFaceCss());
  return renderHtmlToPng(html, size.w, size.h, { transparent: true, scale: 1 });
}
