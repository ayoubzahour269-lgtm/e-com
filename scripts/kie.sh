#!/usr/bin/env bash
# Connexion kie.ai (génération images / vidéos).
# La clé vient de secrets.env (gitignoré) — jamais en dur ici.
#
# Usage :
#   ./scripts/kie.sh credit                              # crédits restants
#   ./scripts/kie.sh upload <fichier>                    # upload une référence -> URL publique
#   ./scripts/kie.sh image <model> <prompt> [ratio] [url_ref...]   # crée un job image et attend
#   ./scripts/kie.sh video <prompt> [ratio] [url_ref] [model]      # crée un job veo et attend
#   ./scripts/kie.sh job <task_id>                       # état d'un job image
#   ./scripts/kie.sh vjob <task_id>                      # état d'un job vidéo
#
# Modèles image : google/nano-banana (4 cr) · google/nano-banana-edit (4 cr, fidélité produit)
#                 nano-banana-pro (18 cr, SANS préfixe google/ — ignore souvent la référence produit)
# Ratios acceptés : 1:1 3:4 9:16 16:9  (1:2 refusé)
# Modèles vidéo : veo3_fast (~60 cr / 8 s) · veo3 (qualité, plus cher)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SECRETS="${KIE_SECRETS_FILE:-$ROOT/secrets.env}"

if [[ -f "$SECRETS" ]]; then
  # shellcheck disable=SC1090
  set -a; source "$SECRETS"; set +a
fi

: "${KIE_API_KEY:?KIE_API_KEY manquant — copier secrets.env.example vers secrets.env et le remplir}"

API="https://api.kie.ai/api/v1"

kie() {
  # kie <method> <url> [curl args...]
  local method="$1" url="$2"; shift 2
  curl -sS -X "$method" "$url" \
    -H "Authorization: Bearer $KIE_API_KEY" \
    -H "Content-Type: application/json" \
    "$@"
}

# Poll générique : <url> <champ_état> <valeurs_succès> <chemin_résultat>
poll() {
  local url="$1" kind="$2" tries="${3:-90}"
  for ((i = 1; i <= tries; i++)); do
    local resp; resp="$(kie GET "$url")"
    local done; done="$(KIND="$kind" python3 -c '
import json, os, sys
d = json.load(sys.stdin).get("data") or {}
kind = os.environ["KIND"]
if kind == "image":
    state = d.get("state", "")
    if state == "success":
        r = d.get("resultJson")
        r = json.loads(r) if isinstance(r, str) else (r or {})
        urls = r.get("resultUrls") or []
        print("OK " + (urls[0] if urls else ""))
    elif state == "fail":
        print("FAIL " + str(d.get("failMsg", "")))
    else:
        print("WAIT " + state)
else:
    flag = d.get("successFlag")
    if flag == 1:
        urls = (d.get("response") or {}).get("resultUrls") or []
        print("OK " + (urls[0] if urls else ""))
    elif flag in (2, 3):
        print("FAIL " + str(d.get("errorMessage", "")))
    else:
        print("WAIT")' <<<"$resp")"
    case "$done" in
      OK*)   echo "${done#OK }"; return 0 ;;
      FAIL*) echo "échec : ${done#FAIL }" >&2; return 1 ;;
      *)     printf '.' >&2; sleep 10 ;;
    esac
  done
  echo "timeout après $((tries * 10))s" >&2; return 1
}

cmd="${1:-credit}"
case "$cmd" in
  credit)
    kie GET "$API/chat/credit" | python3 -c '
import json, sys
d = json.load(sys.stdin)
print("Crédits kie.ai :", d.get("data"), "—", d.get("msg"))'
    ;;
  upload)
    file="${2:?fichier requis}"
    curl -sS -X POST "https://kieai.redpandaai.co/api/file-stream-upload" \
      -H "Authorization: Bearer $KIE_API_KEY" \
      -F "file=@$file" -F "uploadPath=user-uploads" | python3 -c '
import json, sys
print((json.load(sys.stdin).get("data") or {}).get("downloadUrl", ""))'
    ;;
  image)
    model="${2:?model requis}"; prompt="${3:?prompt requis}"; ratio="${4:-9:16}"; shift 4 2>/dev/null || shift $#
    payload="$(MODEL="$model" PROMPT="$prompt" RATIO="$ratio" python3 -c '
import json, os, sys
inp = {"prompt": os.environ["PROMPT"], "output_format": "png", "image_size": os.environ["RATIO"]}
if sys.argv[1:]:
    inp["image_urls"] = sys.argv[1:]
print(json.dumps({"model": os.environ["MODEL"], "input": inp}))' "$@")"
    task="$(kie POST "$API/jobs/createTask" -d "$payload" | python3 -c '
import json, sys
d = json.load(sys.stdin)
t = (d.get("data") or {}).get("taskId")
if not t:
    sys.exit("création KO : " + json.dumps(d)[:300])
print(t)')"
    echo "taskId=$task" >&2
    poll "$API/jobs/recordInfo?taskId=$task" image
    ;;
  video)
    prompt="${2:?prompt requis}"; ratio="${3:-9:16}"; ref="${4:-}"; model="${5:-veo3_fast}"
    payload="$(PROMPT="$prompt" RATIO="$ratio" REF="$ref" MODEL="$model" python3 -c '
import json, os
b = {"prompt": os.environ["PROMPT"], "model": os.environ["MODEL"], "aspectRatio": os.environ["RATIO"]}
if os.environ["REF"]:
    b["imageUrls"] = [os.environ["REF"]]
print(json.dumps(b))')"
    task="$(kie POST "$API/veo/generate" -d "$payload" | python3 -c '
import json, sys
d = json.load(sys.stdin)
t = (d.get("data") or {}).get("taskId")
if not t:
    sys.exit("création KO : " + json.dumps(d)[:300])
print(t)')"
    echo "taskId=$task" >&2
    poll "$API/veo/record-info?taskId=$task" video 180
    ;;
  job)  kie GET "$API/jobs/recordInfo?taskId=${2:?task_id requis}" ;;
  vjob) kie GET "$API/veo/record-info?taskId=${2:?task_id requis}" ;;
  *)
    sed -n '2,17p' "${BASH_SOURCE[0]}"; exit 1
    ;;
esac
