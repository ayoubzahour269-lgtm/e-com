// Créative AVANT/APRÈS — le "money-shot" résultat (cheveux ternes → transformés).
// Fidélité-safe : pas d'étiquette produit à préserver (uniquement des cheveux), donc l'IA/les
// photos peuvent varier librement. Mention صورة توضيحية intégrée (exigée par la policy).
import sharp from "sharp";
import { buildFontFaceCss } from "./fonts.js";
import { renderHtmlToPng } from "./browser.js";
import { FORMAT_SIZES, type PlatformFormat, type BrandPalette, type OfferBlock } from "./types.js";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export interface BeforeAfterSpec {
  format: PlatformFormat;
  palette: BrandPalette;
  beforePath: string; // cheveux "avant" (ternes)
  afterPath: string; // cheveux "après" (transformés)
  title: string;
  beforeLabel?: string; // défaut قبل
  afterLabel?: string; // défaut بعد
  disclaimer?: string; // défaut صورة توضيحية
  offer?: OfferBlock;
  brandLine: string;
}

/** Base split : avant (gauche) | après (droite) + filet or central. */
async function splitBase(beforePath: string, afterPath: string, W: number, H: number, p: BrandPalette): Promise<Buffer> {
  const half = Math.floor(W / 2);
  const before = await sharp(beforePath).resize(half, H, { fit: "cover", position: "attention" }).toBuffer();
  const after = await sharp(afterPath).resize(W - half, H, { fit: "cover", position: "attention" }).toBuffer();
  const divider = await sharp({ create: { width: Math.max(4, Math.round(W * 0.005)), height: H, channels: 4, background: p.gold } }).png().toBuffer();
  return sharp({ create: { width: W, height: H, channels: 4, background: "#000000" } })
    .composite([
      { input: before, left: 0, top: 0 },
      { input: after, left: half, top: 0 },
      { input: divider, left: half - 2, top: 0 },
    ])
    .png()
    .toBuffer();
}

function textLayerHtml(spec: BeforeAfterSpec, size: { w: number; h: number }, fontCss: string): string {
  const u = size.w / 1080;
  const p = spec.palette;
  const px = (n: number) => `${Math.round(n * u)}px`;
  const before = spec.beforeLabel ?? "قبل";
  const after = spec.afterLabel ?? "بعد";
  const disc = spec.disclaimer ?? "صورة توضيحية";
  const offer = spec.offer
    ? `<div class="offer"><span class="price">${esc(spec.offer.price)}</span>${spec.offer.compareAt ? `<span class="cmp">${esc(spec.offer.compareAt)}</span>` : ""}${spec.offer.badge ? `<span class="cod">${esc(spec.offer.badge)}</span>` : ""}</div>`
    : "";
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
${fontCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${size.w}px;height:${size.h}px;background:transparent;overflow:hidden}
.stage{position:relative;width:100%;height:100%;font-feature-settings:"liga" 1,"calt" 1;-webkit-font-smoothing:antialiased}
.veilTop{position:absolute;top:0;left:0;right:0;height:24%;background:linear-gradient(to bottom,rgba(20,6,6,.82),rgba(20,6,6,0))}
.veilBot{position:absolute;bottom:0;left:0;right:0;height:24%;background:linear-gradient(to top,rgba(20,6,6,.9),rgba(20,6,6,0))}
.top{position:absolute;top:${px(52)};left:0;right:0;text-align:center;padding:0 ${px(60)}}
.title{font-family:'Amiri',serif;font-weight:700;font-size:${px(66)};line-height:1.15;
  background:linear-gradient(180deg,${p.goldLight},${p.gold} 55%,${p.goldDark});-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 ${px(2)} ${px(6)} rgba(0,0,0,.6))}
/* étiquettes قبل / بعد, une par moitié */
.tag{position:absolute;top:${px(300)};font-family:'Reem Kufi',sans-serif;font-weight:700;color:${p.paper};
  background:rgba(20,6,6,.55);border:1px solid ${p.gold};font-size:${px(30)};padding:${px(8)} ${px(24)};border-radius:${px(999)};transform:translateX(-50%)}
.tag.before{left:25%}   /* moitié GAUCHE = avant (cheveux ternes) */
.tag.after{left:75%}    /* moitié DROITE = après (cheveux transformés) */
.disc{position:absolute;top:${px(52)};right:${px(28)};font-family:'Tajawal',sans-serif;font-size:${px(20)};color:${p.paper};opacity:.75}
.bot{position:absolute;bottom:${px(56)};left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:${px(14)}}
.offer{display:flex;align-items:center;gap:${px(14)};padding:${px(14)} ${px(28)};border-radius:${px(999)};background:${p.garnet};border:1px solid ${p.gold}}
.offer .price{font-family:'Tajawal',sans-serif;font-weight:800;color:${p.goldLight};font-size:${px(36)}}
.offer .cmp{font-family:'Tajawal',sans-serif;font-weight:500;color:${p.paper};opacity:.6;text-decoration:line-through;font-size:${px(26)}}
.offer .cod{font-family:'Tajawal',sans-serif;font-weight:700;color:${p.ink};background:${p.gold};font-size:${px(22)};padding:${px(6)} ${px(16)};border-radius:${px(999)}}
.brand{font-family:'Tajawal',sans-serif;font-weight:600;color:${p.paper};font-size:${px(24)};opacity:.85}
</style></head><body><div class="stage">
<div class="veilTop"></div><div class="veilBot"></div>
<div class="disc">${esc(disc)}</div>
<div class="top"><h1 class="title">${esc(spec.title)}</h1></div>
<div class="tag before">${esc(before)}</div>
<div class="tag after">${esc(after)}</div>
<div class="bot">${offer}<div class="brand">${esc(spec.brandLine)}</div></div>
</div></body></html>`;
}

export async function renderBeforeAfter(spec: BeforeAfterSpec): Promise<Buffer> {
  const size = FORMAT_SIZES[spec.format];
  const scale = 2;
  const W = size.w * scale, H = size.h * scale;
  const base = await splitBase(spec.beforePath, spec.afterPath, W, H, spec.palette);
  const layer = await renderHtmlToPng(textLayerHtml(spec, size, buildFontFaceCss()), size.w, size.h, { transparent: true, scale });
  const hires = await sharp(base).composite([{ input: layer, top: 0, left: 0 }]).png().toBuffer();
  return sharp(hires).resize(size.w, size.h, { fit: "fill", kernel: "lanczos3" }).png({ quality: 100 }).toBuffer();
}
