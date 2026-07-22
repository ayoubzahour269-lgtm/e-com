// Template "banner_top" — scène plein cadre (produit déjà dans la scène), texte dans
// l'espace négatif du HAUT. Voile doux en haut pour la légibilité ; le produit (centre/bas)
// n'est jamais touché. Idéal quand l'ArtDirector recommande un titre en haut.
import type { CreativeSpec } from "../types.js";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function bannerTopHtml(
  spec: CreativeSpec,
  size: { w: number; h: number },
  fontFaceCss: string
): string {
  const u = size.w / 1080;
  const p = spec.palette;
  const titleFamily = spec.titleFont === "reemKufi" ? "'Reem Kufi'" : "'Amiri'";
  const px = (n: number) => `${Math.round(n * u)}px`;

  const offer = spec.offer
    ? `<div class="offer">
         <span class="price">${esc(spec.offer.price)}</span>
         ${spec.offer.compareAt ? `<span class="compare">${esc(spec.offer.compareAt)}</span>` : ""}
         ${spec.offer.badge ? `<span class="cod">${esc(spec.offer.badge)}</span>` : ""}
       </div>`
    : "";

  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
${fontFaceCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${size.w}px;height:${size.h}px;background:transparent;overflow:hidden}
.stage{position:relative;width:100%;height:100%;font-feature-settings:"liga" 1,"calt" 1;-webkit-font-smoothing:antialiased}
.veil{position:absolute;top:0;left:0;right:0;height:40%;
  background:linear-gradient(to bottom, rgba(247,246,244,0.95) 0%, rgba(247,246,244,0.75) 46%, rgba(247,246,244,0) 100%)}
.top{position:absolute;top:${px(60)};left:0;right:0;padding:0 ${px(72)};
  display:flex;flex-direction:column;align-items:center;text-align:center;gap:${px(16)}}
.kicker{font-family:'Reem Kufi',sans-serif;font-weight:700;color:${p.goldDark};
  font-size:${px(26)};letter-spacing:${px(2)};display:flex;align-items:center;gap:${px(14)}}
.kicker::before,.kicker::after{content:"";width:${px(30)};height:1px;background:linear-gradient(90deg,transparent,${p.gold})}
.kicker::after{transform:scaleX(-1)}
.title{font-family:${titleFamily},serif;font-weight:700;line-height:1.16;font-size:${px(78)};
  color:${p.garnet};max-width:${px(900)};text-shadow:0 ${px(1)} 0 rgba(255,255,255,.6)}
.rule{display:flex;align-items:center;justify-content:center;gap:${px(12)};width:${px(300)}}
.rule .line{height:1px;flex:1;background:linear-gradient(90deg,transparent,${p.gold},transparent)}
.rule .dia{width:${px(8)};height:${px(8)};background:${p.gold};transform:rotate(45deg)}
.offer{display:flex;align-items:center;gap:${px(14)};margin-top:${px(4)};
  padding:${px(13)} ${px(26)};border-radius:${px(999)};background:${p.garnet};border:1px solid ${p.gold}}
.offer .price{font-family:'Tajawal',sans-serif;font-weight:800;color:${p.goldLight};font-size:${px(34)}}
.offer .compare{font-family:'Tajawal',sans-serif;font-weight:500;color:${p.paper};opacity:.6;text-decoration:line-through;font-size:${px(25)}}
.offer .cod{font-family:'Tajawal',sans-serif;font-weight:700;color:${p.ink};background:${p.gold};font-size:${px(22)};padding:${px(6)} ${px(16)};border-radius:${px(999)}}
</style></head><body>
  <div class="stage">
    <div class="veil"></div>
    <div class="top">
      ${spec.kicker ? `<div class="kicker">${esc(spec.kicker)}</div>` : ""}
      <h1 class="title">${esc(spec.title)}</h1>
      <div class="rule"><span class="line"></span><span class="dia"></span><span class="line"></span></div>
      ${offer}
    </div>
  </div>
</body></html>`;
}
