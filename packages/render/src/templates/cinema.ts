// Template "cinema" — overlay dark-luxe façon grand spot beauté (codes L'Oréal :
// noir + or, titre serif doré centré, voile sombre discret). Pensé pour être INCRUSTÉ
// sur des plans vidéo sombres. RTL, letter-spacing 0 (liaisons arabes préservées).
import type { CreativeSpec } from "../types.js";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function cinemaHtml(
  spec: CreativeSpec,
  size: { w: number; h: number },
  fontFaceCss: string
): string {
  const u = size.w / 1080;
  const p = spec.palette;
  const px = (n: number) => `${Math.round(n * u)}px`;

  const offer = spec.offer
    ? `<div class="offer">
         <span class="price">${esc(spec.offer.price)}</span>
         ${spec.offer.compareAt ? `<span class="cmp">${esc(spec.offer.compareAt)}</span>` : ""}
         ${spec.offer.badge ? `<span class="cod">${esc(spec.offer.badge)}</span>` : ""}
       </div>`
    : "";
  const cta = spec.subtitle ? `<div class="cta">${esc(spec.subtitle)}</div>` : "";

  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
${fontFaceCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${size.w}px;height:${size.h}px;background:transparent;overflow:hidden}
.stage{position:relative;width:100%;height:100%;font-feature-settings:"liga" 1,"calt" 1;-webkit-font-smoothing:antialiased}

/* Voile sombre discret en haut — lisibilité sur plans sombres sans les éteindre. */
.veil{position:absolute;top:0;left:0;right:0;height:36%;
  background:linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0) 100%)}

.top{position:absolute;top:${px(66)};left:0;right:0;padding:0 ${px(70)};
  display:flex;flex-direction:column;align-items:center;text-align:center;gap:${px(16)}}

.kicker{font-family:'Reem Kufi',sans-serif;font-weight:700;color:${p.gold};
  font-size:${px(25)};letter-spacing:0;opacity:.95;
  display:flex;align-items:center;gap:${px(14)}}
.kicker::before,.kicker::after{content:"";width:${px(34)};height:1px;
  background:linear-gradient(90deg,transparent,${p.gold})}
.kicker::after{transform:scaleX(-1)}

.title{font-family:'Amiri',serif;font-weight:700;line-height:1.2;
  font-size:${px(76)};max-width:${px(920)};
  background:linear-gradient(180deg,${p.goldLight} 0%,${p.gold} 52%,${p.goldDark} 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 ${px(2)} ${px(8)} rgba(0,0,0,.75));padding-bottom:${px(4)}}

.rule{display:flex;align-items:center;justify-content:center;gap:${px(12)};width:${px(320)}}
.rule .line{height:1px;flex:1;background:linear-gradient(90deg,transparent,${p.gold},transparent)}
.rule .dia{width:${px(7)};height:${px(7)};background:${p.gold};transform:rotate(45deg);
  box-shadow:0 0 ${px(10)} rgba(201,162,39,.7)}

.offer{display:flex;align-items:center;gap:${px(14)};margin-top:${px(6)};
  padding:${px(13)} ${px(28)};border-radius:${px(999)};
  background:rgba(0,0,0,.5);border:1px solid ${p.gold}}
.offer .price{font-family:'Tajawal',sans-serif;font-weight:800;color:${p.goldLight};font-size:${px(36)}}
.offer .cmp{font-family:'Tajawal',sans-serif;font-weight:500;color:${p.paper};opacity:.55;
  text-decoration:line-through;font-size:${px(26)}}
.offer .cod{font-family:'Tajawal',sans-serif;font-weight:700;color:${p.ink};background:${p.gold};
  font-size:${px(22)};padding:${px(6)} ${px(16)};border-radius:${px(999)}}

.cta{font-family:'Tajawal',sans-serif;font-weight:800;color:${p.ink};
  background:linear-gradient(180deg,${p.goldLight},${p.gold});
  font-size:${px(30)};padding:${px(12)} ${px(44)};border-radius:${px(999)};margin-top:${px(6)};
  box-shadow:0 ${px(4)} ${px(18)} rgba(201,162,39,.35)}
</style></head>
<body>
  <div class="stage">
    <div class="veil"></div>
    <div class="top">
      ${spec.kicker ? `<div class="kicker">${esc(spec.kicker)}</div>` : ""}
      <h1 class="title">${esc(spec.title)}</h1>
      <div class="rule"><span class="line"></span><span class="dia"></span><span class="line"></span></div>
      ${offer}
      ${cta}
    </div>
  </div>
</body></html>`;
}
