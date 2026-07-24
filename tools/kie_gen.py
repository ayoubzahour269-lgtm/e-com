#!/usr/bin/env python3
"""
kie_gen.py — client Kie AI MULTI-MODÈLES pour la génération de créas (زيت المشاط الأحمر).

Kie agrège 300+ modèles derrière UNE API asynchrone unifiée :
  POST /api/v1/jobs/createTask  {model, input}  ->  GET /api/v1/jobs/recordInfo?taskId=...
(Exception : la famille Veo garde son endpoint dédié /veo/generate + /veo/record-info.)

On choisit le MEILLEUR modèle selon le type de créa ET sa complexité :
  python tools/kie_gen.py models      # imprime la matrice de sélection
Doctrine (creative/docs/METHODE-STOPSCROLL-KIE.md) : flacon JAMAIS généré (réf obligatoire),
huile = sérum fin translucide, JAMAIS de texte arabe généré par l'IA.

Auth : env KIE_API_KEY, ou ligne KIE_API_KEY=... dans secrets.env (racine repo). Lancer depuis la racine.

Exemples :
  python tools/kie_gen.py image --model auto --ref creative/bottle_straight.png --prompt "..." --out out/s2.png
  python tools/kie_gen.py image --model seedream --prompt "..." --out out/scene.png
  python tools/kie_gen.py video --model seedance-fast --ref out/s2.png --prompt "..." --out out/s2.mp4
  python tools/kie_gen.py video --model veo3 --ref out/s3.png --prompt "..." --out out/s3.mp4
  python tools/kie_gen.py image --model bytedance/seedream-v4-edit --input-json '{"num_images":2}' --prompt "..."
"""
import argparse
import json
import mimetypes
import os
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("Manque 'requests' : pip install requests")

API_BASE = "https://api.kie.ai/api/v1"
UPLOAD_URL = "https://kieai.redpandaai.co/api/file-stream-upload"
REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).resolve().parent))
import prompt_lint  # filtre logique/physique pré-vol (évite le gaspillage de crédits)

# Registry : alias -> modèle.  ep = endpoint (jobs|veo).  img = nom du champ image (i2i / i2v).
# ⚠ Les IDs exacts évoluent : vérifier sur docs.kie.ai/market/<provider>/<model>.
#   Un alias inconnu passé à --model est traité comme un ID BRUT sur l'endpoint jobs → le tool
#   reste valable même quand Kie ajoute/renomme un modèle.
MODELS = {
    # ---- IMAGES (endpoint jobs) ----
    "nano-edit": dict(id="google/nano-banana-edit", ep="jobs", kind="image", img="image_urls",
                      note="Still produit FIDÈLE (réf bouteille) — édition avec référence"),
    "nano":      dict(id="google/nano-banana", ep="jobs", kind="image", img="image_urls",
                      note="Image simple/rapide (pas cher)"),
    "nano-pro":  dict(id="nano-banana-pro", ep="jobs", kind="image", img="image_urls",
                      note="2K art-directed — IGNORE souvent la réf produit"),
    "seedream":  dict(id="bytedance/seedream-v4-edit", ep="jobs", kind="image", img="image_urls",
                      note="Scène/portrait/produit photoréaliste (T2I + édition)"),
    "imagen4":   dict(id="google/imagen4", ep="jobs", kind="image", img="image_urls",
                      note="Photoréalisme haute fidélité (T2I)"),
    "flux":      dict(id="flux-2/pro-text-to-image", ep="jobs", kind="image", img="image_urls",
                      note="Graphismes commerciaux nets"),
    "gpt-image": dict(id="gpt-image-2-text-to-image", ep="jobs", kind="image", img="image_urls",
                      note="Rendu de TEXTE net (latin) + identity lock"),
    "ideogram":  dict(id="ideogram/v3-text-to-image", ep="jobs", kind="image", img="image_urls",
                      note="Typographie lisible / logos"),
    # ---- VIDÉO ----
    "seedance-fast": dict(id="bytedance/seedance-2-fast", ep="jobs", kind="video", img="image_urls",
                          note="i2v mouvement simple/subtil — pas cher ($)"),
    "seedance":      dict(id="bytedance/seedance-2", ep="jobs", kind="video", img="image_urls",
                          note="i2v réaliste qualité ($$)"),
    "kling":         dict(id="kling/v3", ep="jobs", kind="video", img="image_urls",
                          note="i2v réaliste + multi-shot + audio natif, ~15s ($$)"),
    "veo3-fast":     dict(id="veo3_fast", ep="veo", kind="video", img="imageUrls",
                          note="i2v rapide avec audio ($)"),
    "veo3":          dict(id="veo3", ep="veo", kind="video", img="imageUrls",
                          note="Cinématique + AUDIO natif (foley/VO) ($$$)"),
}


def resolve_model(name, kind_hint):
    """Retourne (label, meta) pour un alias du registry OU un ID brut (routé sur jobs, sauf veo*)."""
    if name in MODELS:
        return name, MODELS[name]
    ep = "veo" if name.startswith("veo") else "jobs"
    return name, dict(id=name, ep=ep, kind=kind_hint,
                      img=("imageUrls" if ep == "veo" else "image_urls"), note="(ID brut)")


def pick_auto(kind, has_ref=False, quality=False, audio=False):
    """--model auto : choisit le champion selon le type de créa et sa complexité."""
    if kind == "image":
        return "nano-edit" if has_ref else "seedream"
    if audio:
        return "veo3"
    if quality:
        return "kling"
    return "seedance-fast"


def load_api_key():
    key = os.environ.get("KIE_API_KEY", "").strip()
    if key:
        return key
    env = REPO_ROOT / "secrets.env"
    if env.exists():
        for line in env.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line.startswith("KIE_API_KEY=") and not line.startswith("#"):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("KIE_API_KEY introuvable (env ou secrets.env). Voir secrets.env.example.")


def _headers(key, json_body=True):
    h = {"Authorization": f"Bearer {key}"}
    if json_body:
        h["Content-Type"] = "application/json"
    return h


def _unwrap(resp):
    """Retourne le champ `data` d'une réponse Kie {code,msg,data} ; lève si erreur."""
    try:
        j = resp.json()
    except ValueError:
        resp.raise_for_status()
        raise RuntimeError(f"Réponse non-JSON: {resp.text[:300]}")
    code = j.get("code", j.get("status"))
    if code not in (200, 0, None, "200", "success"):
        raise RuntimeError(f"Kie API erreur {code}: {j.get('msg') or j.get('message')}")
    return j.get("data", j)


def _find_urls(obj):
    """Extrait récursivement toutes les URLs http(s) d'un objet JSON (str/list/dict)."""
    urls = []
    if obj is None:
        return urls
    if isinstance(obj, str):
        s = obj.strip()
        if s.startswith(("{", "[")):
            try:
                return _find_urls(json.loads(s))
            except ValueError:
                return urls
        if s.startswith("http"):
            urls.append(s)
        return urls
    if isinstance(obj, list):
        for x in obj:
            urls += _find_urls(x)
        return urls
    if isinstance(obj, dict):
        for x in obj.values():
            urls += _find_urls(x)
    return urls


def check_credit(key):
    r = requests.get(f"{API_BASE}/chat/credit", headers=_headers(key, False), timeout=30)
    return _unwrap(r)


def upload_reference(key, path):
    path = Path(path)
    if not path.exists():
        sys.exit(f"Référence introuvable: {path}")
    mime = mimetypes.guess_type(path.name)[0] or "image/png"
    with open(path, "rb") as f:
        files = {"file": (path.name, f, mime)}
        data = {"uploadPath": "user-uploads"}
        r = requests.post(UPLOAD_URL, headers=_headers(key, False), files=files, data=data, timeout=120)
    d = _unwrap(r)
    url = d.get("downloadUrl") if isinstance(d, dict) else None
    url = url or (_find_urls(d)[0] if _find_urls(d) else None)
    if not url:
        raise RuntimeError(f"Upload sans downloadUrl: {d}")
    return url


# ---- API unifiée (jobs) : couvre nano, seedream, seedance, kling, flux, gpt-image, ideogram… ----
def create_job(key, model_id, input_obj):
    body = {"model": model_id, "input": input_obj}
    r = requests.post(f"{API_BASE}/jobs/createTask", headers=_headers(key), json=body, timeout=60)
    d = _unwrap(r)
    task_id = d.get("taskId") or d.get("task_id") or d.get("id")
    if not task_id:
        raise RuntimeError(f"Pas de taskId: {d}")
    return task_id


def poll_job(key, task_id, timeout=600, interval=6):
    deadline = time.time() + timeout
    while time.time() < deadline:
        r = requests.get(f"{API_BASE}/jobs/recordInfo", headers=_headers(key, False),
                         params={"taskId": task_id}, timeout=30)
        d = _unwrap(r)
        state = str(d.get("state") or d.get("status") or "").lower()
        if state in ("success", "succeeded", "completed", "2"):
            urls = _find_urls(d.get("resultJson") or d.get("result") or d)
            if urls:
                return urls
            raise RuntimeError(f"Succès sans URL: {d}")
        if state in ("fail", "failed", "error", "3"):
            raise RuntimeError(f"Job échoué: {d.get('failMsg') or d}")
        time.sleep(interval)
    raise TimeoutError(f"Timeout job {task_id}")


# ---- Endpoint dédié Veo ----
def create_video_veo(key, prompt, image_urls=None, model="veo3_fast", aspect_ratio="9:16"):
    body = {"prompt": prompt, "model": model, "aspectRatio": aspect_ratio}
    if image_urls:
        body["imageUrls"] = image_urls if isinstance(image_urls, list) else [image_urls]
    r = requests.post(f"{API_BASE}/veo/generate", headers=_headers(key), json=body, timeout=60)
    d = _unwrap(r)
    task_id = d.get("taskId") or d.get("task_id") or d.get("id")
    if not task_id:
        raise RuntimeError(f"Pas de taskId vidéo: {d}")
    return task_id


def poll_video_veo(key, task_id, timeout=600, interval=10):
    deadline = time.time() + timeout
    while time.time() < deadline:
        r = requests.get(f"{API_BASE}/veo/record-info", headers=_headers(key, False),
                         params={"taskId": task_id}, timeout=30)
        d = _unwrap(r)
        flag = str(d.get("successFlag", d.get("status", "")))
        if flag in ("1", "success", "succeeded", "completed"):
            urls = _find_urls(d.get("response") or d.get("resultUrls") or d)
            if urls:
                return urls
            raise RuntimeError(f"Vidéo prête sans URL: {d}")
        if flag in ("2", "3", "fail", "failed", "error"):
            raise RuntimeError(f"Vidéo échouée: {d}")
        time.sleep(interval)
    raise TimeoutError(f"Timeout vidéo {task_id}")


def download(url, dest):
    dest = Path(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    with requests.get(url, stream=True, timeout=180) as r:
        r.raise_for_status()
        with open(dest, "wb") as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)
    return dest


def _merge_json(base, raw):
    if raw:
        try:
            base.update(json.loads(raw))
        except ValueError as e:
            sys.exit(f"--input-json invalide: {e}")
    return base


def print_models():
    print("Modèles Kie — sélection par type de créa (voir docs.kie.ai/market pour les IDs exacts)\n")
    for kind in ("image", "video"):
        print(f"[{kind.upper()}]")
        for alias, m in MODELS.items():
            if m["kind"] == kind:
                print(f"  {alias:<14} {m['id']:<28} {m['note']}")
        print()
    print("Astuce : --model auto choisit le champion (image+réf→nano-edit, image→seedream,")
    print("         vidéo→seedance-fast, --quality→kling, --audio→veo3). Un ID brut est accepté.")


# ---------------------------------- CLI ----------------------------------
def cmd_image(a, key):
    label = pick_auto("image", has_ref=bool(a.ref)) if a.model == "auto" else a.model
    label, m = resolve_model(label, "image")
    if not prompt_lint.gate(a.prompt, "image", has_ref=bool(a.ref), strict=a.strict, force=a.force):
        sys.exit("BLOQUE par le filtre logique/physique — aucun credit depense. Corrige le prompt (ou --force).")
    print(f"→ image via {label} ({m['id']})")
    refs = [upload_reference(key, r) for r in a.ref]
    size_key = "image_size" if "nano-banana" in m["id"] else "aspect_ratio"
    inp = {"prompt": a.prompt, size_key: a.size}
    if "nano-banana" in m["id"]:
        inp["output_format"] = "png"
    if refs:
        inp[m["img"]] = refs
    _merge_json(inp, a.input_json)
    tid = create_job(key, m["id"], inp)
    print(f"  taskId={tid} … polling")
    print(f"✓ {download(poll_job(key, tid)[0], a.out)}")


def cmd_video(a, key):
    if a.model == "auto":
        label = pick_auto("video", quality=a.quality, audio=a.audio)
    else:
        label = a.model
    label, m = resolve_model(label, "video")
    if not prompt_lint.gate(a.prompt, "video", has_ref=bool(a.ref or a.image), strict=a.strict, force=a.force):
        sys.exit("BLOQUE par le filtre logique/physique — aucun credit depense. Corrige le prompt (ou --force).")
    print(f"→ video via {label} ({m['id']})")
    starts = list(a.image) + [upload_reference(key, r) for r in a.ref]
    if m["ep"] == "veo":
        tid = create_video_veo(key, a.prompt, starts or None, m["id"], a.size)
        print(f"  taskId={tid} … polling (1-3 min)")
        print(f"✓ {download(poll_video_veo(key, tid)[0], a.out)}")
    else:
        inp = {"prompt": a.prompt, "aspect_ratio": a.size}
        if starts:
            inp[m["img"]] = starts
        _merge_json(inp, a.input_json)
        tid = create_job(key, m["id"], inp)
        print(f"  taskId={tid} … polling (1-3 min)")
        print(f"✓ {download(poll_job(key, tid)[0], a.out)}")


def main():
    p = argparse.ArgumentParser(description="Client Kie AI multi-modèles — créas Mashat")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("models", help="Lister les modèles + quand les utiliser")
    sub.add_parser("credit", help="Afficher les crédits restants")

    pi = sub.add_parser("image", help="Générer une image")
    pi.add_argument("--prompt", required=True)
    pi.add_argument("--model", default="auto", help="alias (voir `models`), ID brut, ou 'auto'")
    pi.add_argument("--ref", action="append", default=[], help="Image(s) de référence (chemin local)")
    pi.add_argument("--size", default="9:16", help="9:16 / 3:4 / 1:1 / 16:9 …")
    pi.add_argument("--input-json", default=None, help="JSON fusionné dans input (champs spécifiques)")
    pi.add_argument("--out", default="out/image.png")
    pi.add_argument("--strict", action="store_true", help="filtre logique: WARN -> BLOCK")
    pi.add_argument("--force", action="store_true", help="outrepasser le filtre logique/physique")

    pv = sub.add_parser("video", help="Générer une vidéo (image-to-video conseillé)")
    pv.add_argument("--prompt", required=True)
    pv.add_argument("--model", default="auto", help="alias (voir `models`), ID brut, ou 'auto'")
    pv.add_argument("--image", action="append", default=[], help="URL(s) image de départ (i2v)")
    pv.add_argument("--ref", action="append", default=[], help="Image locale à uploader (i2v)")
    pv.add_argument("--size", default="9:16", help="aspect ratio")
    pv.add_argument("--quality", action="store_true", help="auto → modèle qualité (kling)")
    pv.add_argument("--audio", action="store_true", help="auto → modèle avec audio natif (veo3)")
    pv.add_argument("--input-json", default=None, help="JSON fusionné dans input")
    pv.add_argument("--out", default="out/video.mp4")
    pv.add_argument("--strict", action="store_true", help="filtre logique: WARN -> BLOCK")
    pv.add_argument("--force", action="store_true", help="outrepasser le filtre logique/physique")

    a = p.parse_args()

    if a.cmd == "models":
        print_models()
        return

    key = load_api_key()
    if a.cmd == "credit":
        print(json.dumps(check_credit(key), ensure_ascii=False, indent=2))
    elif a.cmd == "image":
        cmd_image(a, key)
    elif a.cmd == "video":
        cmd_video(a, key)


if __name__ == "__main__":
    main()
