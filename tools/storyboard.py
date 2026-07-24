#!/usr/bin/env python3
"""
storyboard.py — assembler des plans (images) en UNE planche storyboard numérotée + légendée.
Labels en latin uniquement (évite le tofu) ; le texte arabe se pose au montage / via arabic_text.py.

Ex :
  python tools/storyboard.py --title "Rituel Mashat" --cols 2 \
    --frame "out/sb1_probleme.png::HOOK - la chute" \
    --frame "out/sb_anchor.png::Le flacon (solution)" \
    --frame "out/sb3b_macro.png::Application (macro)" \
    --frame "out/sb4_resultat.png::Resultat" \
    --out out/storyboard_board.png
"""
import argparse
import os
import sys

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Manque Pillow : pip install pillow")


def load_font(sz, bold=True):
    for p in [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]:
        if os.path.exists(p):
            return ImageFont.truetype(p, sz)
    return ImageFont.load_default()


def main():
    ap = argparse.ArgumentParser(description="Assembler des plans en une planche storyboard")
    ap.add_argument("--frame", action="append", default=[], help='"chemin::label" (répétable)')
    ap.add_argument("--title", default="STORYBOARD")
    ap.add_argument("--cols", type=int, default=2)
    ap.add_argument("--width", type=int, default=520, help="largeur d'un plan (px)")
    ap.add_argument("--out", default="out/storyboard_board.png")
    a = ap.parse_args()
    if not a.frame:
        sys.exit("Aucun --frame fourni.")

    W = a.width
    cells = []
    for i, fr in enumerate(a.frame, 1):
        path, _, label = fr.partition("::")
        im = Image.open(path).convert("RGB")
        h = int(im.height * (W / im.width))
        cells.append((im.resize((W, h)), f"{i} - {label}" if label else str(i)))

    ch = max(c[0].height for c in cells)
    pad, lab, title_h = 22, 44, 66
    cols = max(1, a.cols)
    rows = (len(cells) + cols - 1) // cols
    bw = pad + cols * (W + pad)
    bh = title_h + rows * (ch + lab + pad) + pad
    board = Image.new("RGB", (bw, bh), (245, 242, 236))
    d = ImageDraw.Draw(board)
    d.text((pad, 20), a.title, fill=(60, 20, 30), font=load_font(30))

    lf = load_font(23)
    for i, (im, label) in enumerate(cells):
        r, c = divmod(i, cols)
        x = pad + c * (W + pad)
        y = title_h + r * (ch + lab + pad)
        board.paste(im, (x, y))
        d.rectangle([x, y + ch, x + W, y + ch + lab], fill=(60, 20, 30))
        d.text((x + 10, y + ch + 9), label, fill=(245, 222, 140), font=lf)

    os.makedirs(os.path.dirname(a.out) or ".", exist_ok=True)
    board.save(a.out)
    print(f"saved {a.out} {board.size}")


if __name__ == "__main__":
    main()
