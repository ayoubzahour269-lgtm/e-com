// Couche de texte TRANSPARENTE pour incrustation vidéo (typo déterministe sur les plans).
// banner_top (voile clair) pour scènes claires · cinema (voile sombre, or) pour spots dark-luxe.
import { buildFontFaceCss } from "./fonts.js";
import { renderHtmlToPng } from "./browser.js";
import { bannerTopHtml } from "./templates/bannerTop.js";
import { cinemaHtml } from "./templates/cinema.js";
import { FORMAT_SIZES, type CreativeSpec } from "./types.js";

/** Rend une couche transparente (voile + texte) à la taille du format, à incruster par ffmpeg. */
export async function renderOverlayLayer(spec: CreativeSpec): Promise<Buffer> {
  const size = FORMAT_SIZES[spec.format];
  const html =
    spec.template === "cinema"
      ? cinemaHtml(spec, size, buildFontFaceCss())
      : bannerTopHtml(spec, size, buildFontFaceCss());
  return renderHtmlToPng(html, size.w, size.h, { transparent: true, scale: 1 });
}
