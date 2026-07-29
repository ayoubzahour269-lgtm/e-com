#!/usr/bin/env bash
# Connexion Shopify via le proxy Theme Kit Access (token shptka_).
# Les identifiants viennent de secrets.env (gitignoré) — jamais en dur ici.
#
# Usage :
#   ./scripts/shopify.sh check                       # vérifie la connexion
#   ./scripts/shopify.sh themes                      # liste les thèmes
#   ./scripts/shopify.sh get <theme_id> <asset_key>  # lit un asset
#   ./scripts/shopify.sh list <theme_id>             # liste les clés d'assets
#   ./scripts/shopify.sh put <theme_id> <asset_key> <fichier_local>   # écrit un asset texte
#   ./scripts/shopify.sh putbin <theme_id> <asset_key> <fichier_local> # écrit un asset binaire
#   ./scripts/shopify.sh del <theme_id> <asset_key>  # supprime un asset

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SECRETS="${SHOPIFY_SECRETS_FILE:-$ROOT/secrets.env}"

if [[ -f "$SECRETS" ]]; then
  # shellcheck disable=SC1090
  set -a; source "$SECRETS"; set +a
fi

: "${SHOPIFY_STORE:?SHOPIFY_STORE manquant — copier secrets.env.example vers secrets.env et le remplir}"
: "${SHOPIFY_THEME_TOKEN:?SHOPIFY_THEME_TOKEN manquant — copier secrets.env.example vers secrets.env et le remplir}"

BASE="https://theme-kit-access.shopifyapps.com/cli/admin/api/2024-10"

api() {
  # api <method> <path-with-query> [curl args...]
  local method="$1" path="$2"; shift 2
  curl -sS -g -X "$method" "$BASE/$path" \
    -H "X-Shopify-Access-Token: $SHOPIFY_THEME_TOKEN" \
    -H "X-Shopify-Shop: $SHOPIFY_STORE" \
    -H "Content-Type: application/json" \
    "$@"
}

# Écrit un asset avec retry/backoff (Shopify renvoie des 503 après beaucoup de PUT).
put_asset() {
  local theme="$1" payload_file="$2" delay=2
  for attempt in 1 2 3 4; do
    local code body
    body="$(api PUT "themes/$theme/assets.json" --data-binary "@$payload_file" -w '\n%{http_code}')"
    code="$(tail -n1 <<<"$body")"
    if [[ "$code" == "200" || "$code" == "201" ]]; then
      sed '$d' <<<"$body"; return 0
    fi
    echo "tentative $attempt : HTTP $code, retry dans ${delay}s" >&2
    sleep "$delay"; delay=$((delay * 2))
  done
  echo "échec après 4 tentatives" >&2; return 1
}

json_string() { python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))'; }

cmd="${1:-check}"
case "$cmd" in
  check)
    echo "Boutique : $SHOPIFY_STORE"
    api GET "themes.json" | python3 -c '
import json, sys
d = json.load(sys.stdin)
if "themes" not in d:
    print("Connexion KO :", json.dumps(d)[:300]); sys.exit(1)
print("Connexion OK —", len(d["themes"]), "thèmes")
for t in d["themes"]:
    print("  %s  %-12s %s" % (t["id"], t["role"], t["name"]))'
    ;;
  themes)
    api GET "themes.json"
    ;;
  list)
    api GET "themes/${2:?theme_id requis}/assets.json" | python3 -c '
import json, sys
for a in json.load(sys.stdin).get("assets", []):
    print(a["key"])'
    ;;
  get)
    api GET "themes/${2:?theme_id requis}/assets.json?asset[key]=${3:?asset_key requis}" | python3 -c '
import json, sys
a = json.load(sys.stdin).get("asset", {})
sys.stdout.write(a.get("value") or a.get("public_url", "") or "")'
    ;;
  put)
    theme="${2:?theme_id requis}"; key="${3:?asset_key requis}"; file="${4:?fichier local requis}"
    tmp="$(mktemp)"; trap 'rm -f "$tmp"' EXIT
    python3 -c '
import json, sys
key, path = sys.argv[1], sys.argv[2]
with open(path, encoding="utf-8") as f:
    json.dump({"asset": {"key": key, "value": f.read()}}, open(sys.argv[3], "w"))' "$key" "$file" "$tmp"
    put_asset "$theme" "$tmp"
    ;;
  putbin)
    theme="${2:?theme_id requis}"; key="${3:?asset_key requis}"; file="${4:?fichier local requis}"
    tmp="$(mktemp)"; trap 'rm -f "$tmp"' EXIT
    python3 -c '
import base64, json, sys
key, path = sys.argv[1], sys.argv[2]
with open(path, "rb") as f:
    json.dump({"asset": {"key": key, "attachment": base64.b64encode(f.read()).decode()}}, open(sys.argv[3], "w"))' "$key" "$file" "$tmp"
    put_asset "$theme" "$tmp"
    ;;
  del)
    api DELETE "themes/${2:?theme_id requis}/assets.json?asset[key]=${3:?asset_key requis}"
    ;;
  *)
    sed -n '2,14p' "${BASH_SOURCE[0]}"; exit 1
    ;;
esac
