// Template "editorial" — traitement agence : scrim grenat + titre dégradé or (ombre douce)
// + filet ornemental + ligne de marque + chip d'offre. RTL natif, shaping arabe Chromium.
import type { CreativeSpec } from "../types.js";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function editorialHtml(
  spec: CreativeSpec,
  size: { w: number; h: number },
  fontFaceCss: string
): string {
  const u = size.w / 1080; // facteur d'échelle (base 1080px de large)
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
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><style>
${fontFaceCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${size.w}px;height:${size.h}px;background:transparent;overflow:hidden}
.stage{position:relative;width:100%;height:100%;font-feature-settings:"liga" 1,"calt" 1;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}

/* Scrim : lisibilité du texte sur la scène, sans masquer le produit (haut clair). */
.scrim{position:absolute;inset:0;background:
  linear-gradient(to top,
    rgba(18,5,5,0.94) 0%,
    rgba(43,10,10,0.78) 26%,
    rgba(60,14,14,0.34) 50%,
    rgba(0,0,0,0) 70%);}

.content{position:absolute;left:0;right:0;bottom:0;
  padding:${px(84)} ${px(72)} ${px(88)};
  display:flex;flex-direction:column;align-items:center;text-align:center;gap:${px(20)}}

.kicker{font-family:'Reem Kufi',sans-serif;font-weight:700;color:${p.gold};
  font-size:${px(26)};letter-spacing:${px(3)};opacity:.95;
  display:flex;align-items:center;gap:${px(14)}}
.kicker::before,.kicker::after{content:"";width:${px(34)};height:1px;
  background:linear-gradient(90deg,transparent,${p.gold})}
.kicker::after{transform:scaleX(-1)}

.title{font-family:${titleFamily},serif;font-weight:700;line-height:1.18;
  font-size:${px(84)};
  background:linear-gradient(180deg,${p.goldLight} 0%,${p.gold} 52%,${p.goldDark} 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 ${px(2)} ${px(7)} rgba(0,0,0,.6));
  padding-bottom:${px(4)};max-width:${px(920)}}

/* Filet ornemental : hairline or + losange central. */
.rule{display:flex;align-items:center;justify-content:center;gap:${px(12)};
  width:${px(360)};margin:${px(4)} 0}
.rule .line{height:1px;flex:1;background:linear-gradient(90deg,transparent,${p.gold},transparent)}
.rule .dia{width:${px(8)};height:${px(8)};background:${p.gold};transform:rotate(45deg);
  box-shadow:0 0 ${px(10)} rgba(201,162,39,.6)}

.subtitle{font-family:'Tajawal',sans-serif;font-weight:400;color:${p.paper};
  font-size:${px(33)};line-height:1.62;max-width:${px(860)};opacity:.94}

.offer{display:flex;align-items:center;gap:${px(16)};margin-top:${px(8)};
  padding:${px(16)} ${px(30)};border-radius:${px(999)};
  background:rgba(110,20,20,.55);border:1px solid rgba(201,162,39,.55);
  backdrop-filter:blur(2px)}
.offer .price{font-family:'Tajawal',sans-serif;font-weight:800;color:${p.goldLight};
  font-size:${px(38)}}
.offer .compare{font-family:'Tajawal',sans-serif;font-weight:500;color:${p.paper};
  opacity:.6;text-decoration:line-through;font-size:${px(28)}}
.offer .cod{font-family:'Tajawal',sans-serif;font-weight:700;color:${p.ink};
  background:${p.gold};font-size:${px(24)};padding:${px(7)} ${px(18)};border-radius:${px(999)}}

.brand{font-family:'Tajawal',sans-serif;font-weight:500;color:${p.paper};
  font-size:${px(25)};letter-spacing:${px(2)};opacity:.8;margin-top:${px(6)}}
</style></head>
<body>
  <div class="stage">
    <div class="scrim"></div>
    <div class="content">
      ${spec.kicker ? `<div class="kicker">${esc(spec.kicker)}</div>` : ""}
      <h1 class="title">${esc(spec.title)}</h1>
      <div class="rule"><span class="line"></span><span class="dia"></span><span class="line"></span></div>
      ${spec.subtitle ? `<p class="subtitle">${esc(spec.subtitle)}</p>` : ""}
      ${offer}
      <div class="brand">${esc(spec.brandLine)}</div>
    </div>
  </div>
</body></html>`;
}
