#!/usr/bin/env python3
"""
kie_gen.py — client Kie AI pour la génération de créas (زيت المشاط الأحمر).

Encode la doctrine (voir creative/docs/METHODE-STOPSCROLL-KIE.md) :
  - images via google/nano-banana-edit avec référence bouteille (fidélité produit garantie)
  - vidéo via veo3_fast en image-to-video (UN mouvement minimal)
  - jamais de texte arabe généré par l'IA (le poser avec arabic_text.py)

Auth : variable d'env KIE_API_KEY, ou ligne KIE_API_KEY=... dans secrets.env (racine repo).

Exemples :
  python tools/kie_gen.py credit
  python tools/kie_gen.py image --prompt "..." --ref creative/bottle_straight.png --out out/s2.png
  python tools/kie_gen.py video --prompt "..." --ref out/s2.png --out out/s2.mp4
  python tools/kie_gen.py demo
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
    urls = _find_urls(d)
    url = d.get("downloadUrl") if isinstance(d, dict) else None
    url = url or (urls[0] if urls else None)
    if not url:
        raise RuntimeError(f"Upload sans downloadUrl: {d}")
    return url


def create_image(key, prompt, image_urls=None, model="google/nano-banana-edit",
                 image_size="9:16", output_format="png"):
    inp = {"prompt": prompt, "output_format": output_format, "image_size": image_size}
    if image_urls:
        inp["image_urls"] = image_urls
    body = {"model": model, "input": inp}
    r = requests.post(f"{API_BASE}/jobs/createTask", headers=_headers(key), json=body, timeout=60)
    d = _unwrap(r)
    task_id = d.get("taskId") or d.get("task_id") or d.get("id")
    if not task_id:
        raise RuntimeError(f"Pas de taskId: {d}")
    return task_id


def poll_image(key, task_id, timeout=300, interval=6):
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
    raise TimeoutError(f"Timeout image task {task_id}")


def create_video(key, prompt, image_urls=None, model="veo3_fast", aspect_ratio="9:16"):
    body = {"prompt": prompt, "model": model, "aspectRatio": aspect_ratio}
    if image_urls:
        body["imageUrls"] = image_urls if isinstance(image_urls, list) else [image_urls]
    r = requests.post(f"{API_BASE}/veo/generate", headers=_headers(key), json=body, timeout=60)
    d = _unwrap(r)
    task_id = d.get("taskId") or d.get("task_id") or d.get("id")
    if not task_id:
        raise RuntimeError(f"Pas de taskId vidéo: {d}")
    return task_id


def poll_video(key, task_id, timeout=600, interval=10):
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
    raise TimeoutError(f"Timeout vidéo task {task_id}")


def download(url, dest):
    dest = Path(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    with requests.get(url, stream=True, timeout=180) as r:
        r.raise_for_status()
        with open(dest, "wb") as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)
    return dest


def main():
    p = argparse.ArgumentParser(description="Client Kie AI — génération créas Mashat")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("credit", help="Afficher les crédits restants")

    pi = sub.add_parser("image", help="Générer une image")
    pi.add_argument("--prompt", required=True)
    pi.add_argument("--ref", action="append", default=[], help="Image(s) de référence (chemin local)")
    pi.add_argument("--model", default="google/nano-banana-edit")
    pi.add_argument("--size", default="9:16", choices=["1:1", "3:4", "9:16", "16:9"])
    pi.add_argument("--out", default="out/image.png")

    pv = sub.add_parser("video", help="Générer une vidéo (image-to-video conseillé)")
    pv.add_argument("--prompt", required=True)
    pv.add_argument("--image", action="append", default=[], help="URL(s) image de départ (i2v)")
    pv.add_argument("--ref", action="append", default=[], help="Image locale à uploader comme départ")
    pv.add_argument("--model", default="veo3_fast", choices=["veo3_fast", "veo3"])
    pv.add_argument("--out", default="out/video.mp4")

    sub.add_parser("demo", help="Vérifier crédit + générer une image de test → out/demo.png")

    a = p.parse_args()
    key = load_api_key()

    if a.cmd == "credit":
        print(json.dumps(check_credit(key), ensure_ascii=False, indent=2))

    elif a.cmd == "image":
        refs = [upload_reference(key, r) for r in a.ref]
        print(f"→ createTask ({a.model}, {a.size}), refs={len(refs)}")
        tid = create_image(key, a.prompt, refs or None, a.model, a.size)
        print(f"  taskId={tid} … polling")
        out = download(poll_image(key, tid)[0], a.out)
        print(f"✓ {out}")

    elif a.cmd == "video":
        starts = list(a.image) + [upload_reference(key, r) for r in a.ref]
        print(f"→ veo/generate ({a.model}), starts={len(starts)}")
        tid = create_video(key, a.prompt, starts or None, a.model)
        print(f"  taskId={tid} … polling (1-3 min)")
        out = download(poll_video(key, tid)[0], a.out)
        print(f"✓ {out}")

    elif a.cmd == "demo":
        print("Crédits:", json.dumps(check_credit(key), ensure_ascii=False))
        tid = create_image(
            key,
            "Amateur smartphone photo, a small brass bowl of thin translucent red hair oil on a "
            "neutral cloth, warm natural light, realistic, no text, no logo.",
            None, "google/nano-banana", "9:16")
        print("taskId:", tid, "… polling")
        out = download(poll_image(key, tid)[0], "out/demo.png")
        print(f"✓ démo OK → {out}")


if __name__ == "__main__":
    main()
