# @studio/render — moteur de rendu déterministe

Typographie arabe **hors-IA** (Chromium/HarfBuzz → PNG) + compositing (Sharp). Zéro texte généré
par IA → l'arabe ne se déforme jamais. C'est la pièce qui distingue le studio sur le marché MENA.

## Lancer le spike (aucune clé requise)
```bash
pnpm install                 # à la racine du repo
pnpm --filter @studio/render spike
# → sorties dans packages/render/out/  (preuves versionnées dans docs/spikes/)
```

## Pipeline
```
CreativeSpec (copy + palette + layout)
  → editorialHtml()  template HTML/CSS RTL
  → renderHtmlToPng() Chromium, couche transparente (scrim + texte) à 2×
  → composeCreative() Sharp : scène (photo/IA) OU dégradé studio + couche → PNG aux specs
```
Fonts OFL bundlées via `@fontsource` (Amiri, Reem Kufi, Tajawal) et injectées en `@font-face`
data-URLs — indépendant du fontconfig système.

Variable d'env optionnelle : `CHROME_PATH` (défaut `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`).
