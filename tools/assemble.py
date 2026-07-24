#!/usr/bin/env python3
"""
assemble.py — monter des plans (images ET/OU clips) en une vidéo 9:16 finie :
Ken Burns (push-in) sur les images, normalisation des clips vidéo, crossfades, piste audio optionnelle.

Ex :
  python tools/assemble.py \
    --clip "out/beat1.png::2.6" --clip "out/beat_motion.mp4::2.8" ... \
    --audio out/beat_motion.mp4 --audio-volume 0.5 --out out/ad_15s.mp4
"""
import argparse
import os
import subprocess
import sys
import tempfile

try:
    import imageio_ffmpeg
    FF = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FF = "ffmpeg"

W, H, FPS, XF = 1080, 1920, 30, 0.3


def run(cmd):
    p = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if p.returncode != 0:
        sys.exit("FFMPEG ERROR:\n" + p.stdout.decode(errors="replace")[-2500:])


def has_audio(path):
    p = subprocess.run([FF, "-i", path], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    return b"Audio:" in p.stdout


def norm_clip(src, dur, out):
    """Normalise un plan en 1080x1920 30fps : Ken Burns si image, scale/crop si vidéo."""
    frames = max(1, int(round(dur * FPS)))
    if src.lower().endswith((".mp4", ".mov", ".webm", ".mkv")):
        vf = (f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},"
              f"fps={FPS},setsar=1,format=yuv420p")
        run([FF, "-y", "-t", f"{dur}", "-i", src, "-vf", vf, "-an",
             "-c:v", "libx264", "-preset", "ultrafast", "-crf", "20", out])
    else:
        bw, bh = int(W * 1.2), int(H * 1.2)
        vf = (f"scale={bw}:{bh}:force_original_aspect_ratio=increase,crop={bw}:{bh},"
              f"zoompan=z='min(zoom+0.0009,1.12)':d={frames}:"
              f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={W}x{H}:fps={FPS},"
              f"setsar=1,format=yuv420p")
        run([FF, "-y", "-loop", "1", "-t", f"{dur}", "-i", src, "-vf", vf, "-r", str(FPS),
             "-c:v", "libx264", "-preset", "ultrafast", "-crf", "20", out])


def main():
    ap = argparse.ArgumentParser(description="Monter des plans en une video 9:16 (Ken Burns + crossfades + audio)")
    ap.add_argument("--clip", action="append", default=[], help='"chemin::duree_sec" (image ou video)')
    ap.add_argument("--audio", default=None, help="source audio (fichier avec piste audio)")
    ap.add_argument("--audio-volume", type=float, default=0.5)
    ap.add_argument("--out", default="out/ad.mp4")
    a = ap.parse_args()
    if not a.clip:
        sys.exit("Aucun --clip.")

    tmp = tempfile.mkdtemp()
    parts = []
    for i, c in enumerate(a.clip):
        src, _, d = c.partition("::")
        d = float(d)
        o = os.path.join(tmp, f"c{i}.mp4")
        norm_clip(src, d, o)
        parts.append((o, d))

    # Chaîne de crossfades (xfade)
    silent = os.path.join(tmp, "silent.mp4")
    if len(parts) == 1:
        silent = parts[0][0]
        total = parts[0][1]
    else:
        inputs = []
        for o, _ in parts:
            inputs += ["-i", o]
        fc, last, acc = [], "0:v", parts[0][1]
        for i in range(1, len(parts)):
            off = acc - XF
            lbl = f"x{i}"
            fc.append(f"[{last}][{i}:v]xfade=transition=fade:duration={XF}:offset={off:.3f}[{lbl}]")
            last, acc = lbl, acc + parts[i][1] - XF
        total = acc
        run([FF, "-y", *inputs, "-filter_complex", ";".join(fc), "-map", f"[{last}]",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", silent])

    if a.audio and has_audio(a.audio):
        fade_st = max(0.0, total - 1.0)
        run([FF, "-y", "-stream_loop", "-1", "-i", a.audio, "-i", silent,
             "-filter_complex", f"[0:a]volume={a.audio_volume},afade=t=out:st={fade_st:.2f}:d=1[a]",
             "-map", "1:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-shortest", a.out])
    else:
        if a.audio:
            print("(pas de piste audio détectée dans --audio ; vidéo muette)")
        run([FF, "-y", "-i", silent, "-c", "copy", a.out])

    print(f"OK {a.out}  (~{total:.1f}s, {len(parts)} plans)")


if __name__ == "__main__":
    main()
