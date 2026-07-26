#!/usr/bin/env bash
# Récupère le catalogue d'offres COD Network et le croise avec les niches ciblées.
#
# USAGE :
#   1. Créer un compte : https://cod.network/en/affiliate-network
#   2. Générer un token API dans le dashboard (section API / Développeur)
#   3. Mettre le token dans secrets.env (fichier déjà gitignoré) :
#        echo 'COD_NETWORK_TOKEN=ton_token_ici' >> secrets.env
#   4. ./scripts/cod_network_offers.sh
#
# Le script teste plusieurs variantes d'auth/endpoint car la doc COD Network
# est une SPA non lisible sans JS — la bonne variante est détectée automatiquement.

set -uo pipefail
cd "$(dirname "$0")/.."

[ -f secrets.env ] && set -a && . ./secrets.env && set +a
TOKEN="${COD_NETWORK_TOKEN:-}"

if [ -z "$TOKEN" ]; then
  echo "❌ COD_NETWORK_TOKEN absent."
  echo "   echo 'COD_NETWORK_TOKEN=xxx' >> secrets.env   (jamais commité)"
  exit 1
fi

OUT="${OUT:-/tmp/cod_offers.json}"

BASES=(
  "https://api.cod.network/v1"
  "https://cod.network/api/v1"
  "https://app.cod.network/api/v1"
)
PATHS=("offers" "affiliate/offers" "products")

echo "🔎 Détection de l'endpoint…"
FOUND=""
for b in "${BASES[@]}"; do
  for p in "${PATHS[@]}"; do
    for auth in "Authorization: Bearer $TOKEN" "x-api-key: $TOKEN"; do
      code=$(curl -s -o "$OUT" -w '%{http_code}' --max-time 20 \
             -H "$auth" -H "Accept: application/json" "$b/$p?limit=200" 2>/dev/null)
      if [ "$code" = "200" ] && head -c1 "$OUT" | grep -qE '[{[]'; then
        echo "✅ $b/$p  (auth: ${auth%%:*})"
        FOUND="$b/$p"; break 3
      fi
    done
  done
done

if [ -z "$FOUND" ]; then
  echo "⚠️  Aucun endpoint n'a répondu 200."
  echo "   Récupère l'URL exacte dans le dashboard (menu API) et relance :"
  echo "   curl -H 'Authorization: Bearer \$COD_NETWORK_TOKEN' '<URL>' | python3 -m json.tool"
  exit 2
fi

echo "📦 Offres enregistrées → $OUT"
python3 - "$OUT" <<'PY'
import json, sys, re

data = json.load(open(sys.argv[1]))
# Le tableau d'offres peut être à la racine ou sous data/items/results
items = data if isinstance(data, list) else next(
    (v for k, v in data.items() if isinstance(v, list) and v), [])
print(f"\nTOTAL OFFRES : {len(items)}\n")

NICHES = {
    'GENOUX/DOS/SUPPORT': ['knee','back','joint','posture','lumbar','spine','cervical',
                           'neck','brace','pain','massag','ركبة','ظهر','مفاصل'],
    'RELIGIEUX':          ['quran','azan','prayer','tasbih','islamic','muslim',
                           'سجاد','مصحف','أذان','مسبحة'],
    'MINCEUR':            ['slim','shape','waist','corset','ems','burner','keto',
                           'detox','تخسيس','تنحيف','مشد'],
    'ANTI-AGE':           ['retinol','collagen','wrinkle','aging','lifting','serum',
                           'tighten','تجاعيد'],
    'CHEVEUX':            ['hair','scalp','batana','شعر'],
}

def field(o, *names):
    for n in names:
        if isinstance(o, dict) and o.get(n):
            return str(o[n])
    return ''

matched = set()
for niche, words in NICHES.items():
    rows = []
    for o in items:
        blob = (field(o,'name','title','offer_name') + ' ' +
                field(o,'description','desc')).lower()
        oid = field(o,'id','offer_id','_id')
        if any(w in blob for w in words) and oid not in matched:
            matched.add(oid)
            rows.append((field(o,'name','title','offer_name')[:55],
                         field(o,'payout','commission','price'),
                         field(o,'country','geo','countries'), oid))
    if rows:
        print(f"### {niche}  ({len(rows)})")
        for n, p, g, i in rows:
            print(f"  - {n:<55} | payout {p:<8} | {g:<12} | id {i}")
        print()

print(f"Non classées : {len(items) - len(matched)} "
      f"(inspecter {sys.argv[1]} pour la liste complète)")
PY
