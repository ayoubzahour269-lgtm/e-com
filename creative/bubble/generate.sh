#!/usr/bin/env bash
# Génère les décors de la landing Bubble Mousse via kie.ai.
# RÈGLE : aucun visuel ne contient le produit — le vrai flacon détouré est composité ensuite.
set -uo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."
OUT=creative/bubble/gen
mkdir -p "$OUT"
MANIFEST="$OUT/manifest.txt"
touch "$MANIFEST"

# Grammaire photographique commune à toute la page (une seule lumière, un seul fond).
G="editorial beauty photography, soft diffused natural daylight from the left, warm ivory background, \
shallow depth of field, fine film grain, muted botanical green and warm gold palette, calm and premium, \
photorealistic, no text, no lettering, no watermark, no logo, no packaging, no bottle, no product container"

gen() { # gen <slug> <ratio> <prompt> [ref_url]
  local slug="$1" ratio="$2" prompt="$3" ref="${4:-}"
  if [[ -s "$OUT/$slug.png" ]]; then echo "  déjà là, saut de $slug" >&2; return 0; fi
  local model="google/nano-banana"
  [[ -n "$ref" ]] && model="google/nano-banana-edit"
  echo "→ $slug ($model, $ratio)" >&2
  local url
  if [[ -n "$ref" ]]; then
    url="$(./scripts/kie.sh image "$model" "$prompt" "$ratio" "$ref" 2>/dev/null)" || { echo "ÉCHEC $slug" >&2; return 1; }
  else
    url="$(./scripts/kie.sh image "$model" "$prompt" "$ratio" 2>/dev/null)" || { echo "ÉCHEC $slug" >&2; return 1; }
  fi
  [[ -z "$url" ]] && { echo "ÉCHEC $slug (url vide)" >&2; return 1; }
  curl -sS -o "$OUT/$slug.png" "$url" && echo "$slug|$url" >> "$MANIFEST"
  echo "  ok $slug" >&2
}

# 1. Fond hero — herbier botanique
gen hero-bg 16:9 "$G, overhead flat lay of fresh mint and jasmine leaves and white jasmine flowers \
scattered on a warm ivory linen surface, generous empty space in the centre right, delicate shadows"

# 2. Texture mousse
gen foam 1:1 "$G, extreme macro of dense soft white cosmetic foam bubbles on ivory, silky airy lather, \
tiny iridescent bubbles catching light"

# 3. Avant / après cheveux (paire cohérente : l'après est édité depuis l'avant)
gen hair-before 3:4 "$G, close-up back view of a woman's dark hair with a straight centre parting, \
visible grey and white strands along the roots at the scalp, natural untouched hair, realistic texture, \
individual strands visible, plain ivory studio background"
BEFORE_URL="$(grep '^hair-before|' "$OUT/manifest.txt" | cut -d'|' -f2)"
if [[ -n "$BEFORE_URL" ]]; then
  gen hair-after 3:4 "Keep the exact same woman, same hairstyle, same centre parting, same camera angle, \
same framing, same lighting and same ivory background as the reference image. Only change the hair colour: \
the grey and white strands at the roots become uniform deep natural black, glossy and healthy, \
soft silky shine. Photorealistic, no text, no logo." "$BEFORE_URL"
else
  gen hair-after 3:4 "$G, close-up back view of a woman's hair with a straight centre parting, \
uniform deep natural black hair, glossy healthy shine, silky texture, plain ivory studio background"
fi

# 4. Essences végétales (macros sur ivoire, même lumière)
M="macro top-down still life on a warm ivory stone surface, single soft shadow, botanical apothecary mood, \
photorealistic, no text, no logo, no packaging"
gen ing-reishi   1:1 "$M, one dried reishi ganoderma mushroom cap, glossy reddish-brown lacquered surface"
gen ing-saponin  1:1 "$M, a small heap of dried soapberry fruits and soap nut shells, amber translucent skins"
gen ing-ginseng  1:1 "$M, one whole dried ginseng root with fine rootlets, pale beige, sculptural"
gen ing-foti     1:1 "$M, sliced fo-ti polygonum multiflorum root, dark reddish-brown dried slices"
gen ing-sesame   1:1 "$M, a small pile of black sesame seeds, matte black grains, tiny scale"

# 5. Étapes d'application (mains + cheveux, pas de produit visible)
S="$G, close-up of a woman's hands in her own long dark hair, ivory bathroom light, natural skin, \
realistic hands with five fingers, calm gesture"
gen step-apply  3:4 "$S, hands massaging thick white foam into the hair at the scalp"
gen step-spread 3:4 "$S, hands gently spreading white foam evenly through the mid-lengths of the hair"
gen step-rinse  3:4 "$G, close-up of long glossy black wet hair under clear running water, \
water droplets, deep black shine, ivory tiled background"

echo "=== terminé ===" >&2
cat "$MANIFEST" >&2
