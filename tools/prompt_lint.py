#!/usr/bin/env python3
"""
prompt_lint.py — FILTRE logique & physique AVANT l'appel API Kie (évite le gaspillage de crédits).

Vérifie un prompt contre les règles durcies par l'expérience (doctrine METHODE §3/§3B/§4) :
  - un flacon FERMÉ ne verse pas → application = bouchon retiré / goulot ouvert
  - huile = fine/translucide (jamais miel/sirop)
  - JAMAIS de texte arabe généré ; toujours "no text, no logo, no watermark"
  - produit fidèle = référence obligatoire ; en vidéo, ne pas montrer le flacon étiqueté
  - physique liquide + visage dans le même plan = incohérent → macro sans visage
  - sens d'écoulement (gravité) précisé
  - complétude : sujet, décor, lumière, caméra, style, négatifs

Niveaux : BLOCK (empêche l'appel), WARN (averti), INFO. `gate()` renvoie False s'il faut bloquer.

CLI :
  python tools/prompt_lint.py --prompt "..." --kind image --ref [--strict]
Intégré : kie_gen.py lance ce filtre avant CHAQUE génération (--force pour outrepasser).
"""
import argparse
import re
import sys

AR_RE = re.compile(r"[؀-ۿ]")

POUR_KW = ["pour", "pouring", "pours", "poured", "drip", "dripping", "trickle", "trickling",
           "flowing onto", "drops onto", "dripping onto", "pouring onto", "onto her scalp",
           "onto the scalp", "onto the hair", "onto the parting", "out of the neck", "verser", "verse"]
OPEN_KW = ["cap removed", "cap off", "cap is off", "open neck", "open bottle", "uncapped", "no cap",
           "without its cap", "without cap", "open mouth of the bottle", "bouchon retiré", "goulot ouvert"]
CLOSED_KW = ["screw cap on", "closed cap", "sealed bottle", "cap on", "capped bottle", "lid on"]
OIL_KW = ["oil", "serum", "huile"]
THIN_KW = ["thin", "translucent", "low viscosity", "fine serum", "serum", "light oil", "fluid", "runny"]
HONEY_KW = ["honey", "syrup", "thick", "viscous"]
PRODUCT_KW = ["bottle", "flacon", "label", "packshot", "the product"]
FACE_KW = ["face", "woman", "man", "girl", "smiling", "portrait", "looking at", "selfie", "her face"]
TEXTREQ_KW = ["text saying", "label says", "writing", "caption", "headline", "arabic text", "words on"]
NEG_KW = ["no text", "no logo", "no watermark"]
GRAVITY_KW = ["gravity", "falls", "falling", "downward", "straight down", "drips down", "by gravity", "flows down"]

CATEGORIES = {
    "sujet": ["woman", "hand", "bottle", "hair", "comb", "scalp", "man", "girl", "flacon", "cheveux", "drop"],
    "décor/fond": ["bathroom", "home", "room", "sofa", "background", "vanity", "mirror", "kitchen", "wall",
                    "tiled", "interior", "outdoor", "studio", "cloth", "surface", "shelf", "silk"],
    "lumière": ["light", "lighting", "golden", "evening", "window", "natural light", "soft light",
                 "warm light", "backlight", "candlelight", "sunset", "daylight"],
    "caméra/cadre": ["close-up", "macro", "portrait", "wide", "vertical", "9:16", "shallow depth", "mcu",
                      "ecu", "top-down", "angle", "framing", "shot", "depth of field"],
    "style/rendu": ["amateur", "smartphone", "ugc", "candid", "photorealistic", "editorial", "cinematic",
                     "realistic", "phone photo", "grain", "photo"],
    "négatifs": NEG_KW,
}


def _has(text, kws):
    return any(k in text for k in kws)


def run(prompt, kind="image", has_ref=False, product=None, strict=False):
    """Renvoie une liste de findings (level, code, msg, fix)."""
    t = prompt.lower()
    F = []

    def add(level, code, msg, fix=""):
        F.append((level, code, msg, fix))

    is_pour = _has(t, POUR_KW)
    is_open = _has(t, OPEN_KW)
    is_closed = _has(t, CLOSED_KW)
    has_product = product if product is not None else _has(t, PRODUCT_KW)
    has_oil = _has(t, OIL_KW)
    has_face = _has(t, FACE_KW)

    # R1 — un flacon fermé ne verse pas
    if is_pour and has_product:
        if is_closed and not is_open:
            add("BLOCK", "pour-closed", "Le prompt fait verser un flacon FERMÉ (bouchon vissé).",
                "Ajouter : 'the cap is removed, pouring from the OPEN bottle neck'.")
        elif not is_open:
            add("BLOCK", "pour-nostate", "Versement sans préciser que le flacon est OUVERT.",
                "Ajouter : 'cap removed / open neck' — un flacon fermé ne verse pas.")

    # R2 — huile fine, jamais miel
    if has_oil:
        if _has(t, HONEY_KW) and not _has(t, THIN_KW):
            add("BLOCK", "oil-honey", "L'huile risque d'être rendue épaisse comme du miel.",
                "Décrire : 'thin, translucent, low-viscosity, like a fine serum, NOT honey, NOT syrup'.")
        elif not _has(t, THIN_KW):
            add("WARN", "oil-thin", "Viscosité de l'huile non précisée → risque de rendu 'miel'.",
                "Ajouter : 'thin translucent red oil, like a fine serum, not honey'.")

    # R3 — texte arabe / texte généré / négatifs
    if AR_RE.search(prompt):
        add("BLOCK", "arabic-text", "Le prompt contient du texte arabe → l'IA va le déformer.",
            "Retirer l'arabe ; poser le texte au montage / avec arabic_text.py.")
    if _has(t, TEXTREQ_KW):
        add("WARN", "text-request", "Le prompt demande du texte/typo dans l'image (souvent déformé).",
            "Éviter ; garder 'no text' et poser le texte en post.")
    if not _has(t, NEG_KW):
        add("WARN", "no-neg", "Négatifs manquants ('no text, no logo, no watermark').",
            "Ajouter en fin : 'No text, no logo, no watermark.'")

    # R4 — fidélité produit / vidéo
    if has_product and kind == "image" and not has_ref and "from the reference" not in t:
        add("BLOCK", "product-noref", "Produit présent mais AUCUNE référence → l'étiquette sera inventée.",
            "Passer --ref creative/bottle_straight.png + 'the bottle from the reference kept exactly as-is'.")
    if has_product and kind == "video":
        add("WARN", "product-video", "Vidéo montrant le flacon étiqueté → les modèles le déforment.",
            "Animer un plan SANS le flacon (cuir chevelu/huile/cheveux/mains) ou compositer en post.")

    # R5/R6 — visage + physique liquide
    if is_pour and has_face:
        add("WARN", "pour-face", "Action liquide + visage dans le même plan → physique souvent incohérente.",
            "Préférer un MACRO serré sans visage pour le versement.")

    # R7 — gravité / sens d'écoulement
    if is_pour and not _has(t, GRAVITY_KW):
        add("WARN", "pour-gravity", "Sens d'écoulement non précisé.",
            "Ajouter : 'flowing straight down by gravity onto ...'.")

    # R8 — format
    if "9:16" not in t:
        add("INFO", "aspect", "Format 9:16 non mentionné dans le prompt (ok si --size 9:16).")

    # R9 — complétude (détails, même 'insignifiants')
    missing = [c for c, kws in CATEGORIES.items() if not _has(t, kws)]
    if missing:
        add("WARN", "completeness", "Détails manquants : " + ", ".join(missing) + ".",
            "Compléter chaque catégorie (sujet, décor, lumière, caméra, style, négatifs).")

    return F


def format_findings(F):
    order = {"BLOCK": 0, "WARN": 1, "INFO": 2}
    icons = {"BLOCK": "[BLOCK]", "WARN": "[WARN] ", "INFO": "[INFO] "}
    out = []
    for level, code, msg, fix in sorted(F, key=lambda x: order[x[0]]):
        out.append(f"{icons[level]} ({code}) {msg}")
        if fix:
            out.append(f"        -> {fix}")
    return "\n".join(out)


def gate(prompt, kind="image", has_ref=False, product=None, strict=False, force=False, quiet=False):
    """True = on peut générer ; False = bloqué. Imprime le rapport (sauf quiet)."""
    F = run(prompt, kind, has_ref, product, strict)
    blocks = [f for f in F if f[0] == "BLOCK"]
    warns = [f for f in F if f[0] == "WARN"]
    if F and not quiet:
        print("---- FILTRE LOGIQUE/PHYSIQUE (pre-vol) ----")
        print(format_findings(F))
        print("-------------------------------------------")
    hard = bool(blocks) or (strict and bool(warns))
    if hard and force and not quiet:
        print("(--force : on outrepasse le filtre)")
    return (not hard) or force


def main():
    ap = argparse.ArgumentParser(description="Filtre logique/physique d'un prompt Kie (pré-vol)")
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--kind", default="image", choices=["image", "video"])
    ap.add_argument("--ref", action="store_true", help="une image de référence est fournie")
    ap.add_argument("--product", dest="product", action="store_true", default=None)
    ap.add_argument("--no-product", dest="product", action="store_false")
    ap.add_argument("--strict", action="store_true", help="traiter les WARN comme des BLOCK")
    a = ap.parse_args()
    ok = gate(a.prompt, a.kind, a.ref, a.product, a.strict)
    print("RESULT:", "OK" if ok else "BLOQUE (corrige le prompt ; --force dans kie_gen pour outrepasser)")
    sys.exit(0 if ok else 2)


if __name__ == "__main__":
    main()
