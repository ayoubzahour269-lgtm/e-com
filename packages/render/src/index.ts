// API publique du moteur de rendu déterministe.
import { buildFontFaceCss } from "./fonts.js";
import { renderHtmlToPng, closeBrowser } from "./browser.js";
import { editorialHtml } from "./templates/editorial.js";
import { composeCreative } from "./compose.js";
import { FORMAT_SIZES, type CreativeSpec } from "./types.js";

export * from "./types.js";
export { closeBrowser };

const SCALE = 2; // suréchantillonnage → texte arabe net

/**
 * Rend une CreativeSpec en PNG final (aux specs de la plateforme).
 * TEXTE 100% déterministe ; SCÈNE = photo/IA fournie ou dégradé studio.
 */
export async function renderCreative(spec: CreativeSpec): Promise<Buffer> {
  const size = FORMAT_SIZES[spec.format];
  const fontCss = buildFontFaceCss();
  const html = editorialHtml(spec, size, fontCss);

  // Couche transparente (scrim + typo) rendue par Chromium à SCALE×.
  const layerPng = await renderHtmlToPng(html, size.w, size.h, {
    transparent: true,
    scale: SCALE,
  });

  return composeCreative({
    layerPng,
    size,
    scale: SCALE,
    scenePath: spec.scenePath,
    palette: spec.palette,
  });
}
