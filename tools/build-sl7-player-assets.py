#!/usr/bin/env python3
"""Build SL7 FC player image variants from one licensed source image.

Input layout:
  player-sources/<slug>.jpg  (png/webp also supported)

Output layout:
  public/sl7fc-game/assets/players/<slug>/base.webp
  public/sl7fc-game/assets/players/<slug>/card.webp
  public/sl7fc-game/assets/players/<slug>/avatar.webp

The optional transparent.webp is intentionally not generated until a dedicated
background-removal workflow is approved.
"""
from __future__ import annotations

import argparse
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

SUPPORTED = {".jpg", ".jpeg", ".png", ".webp"}


def cover(image: Image.Image, size: tuple[int, int], focus_y: float = 0.34) -> Image.Image:
    """Resize and crop with a slightly top-biased portrait focus."""
    image = ImageOps.exif_transpose(image).convert("RGB")
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    left = max(0, (resized.width - target_w) // 2)
    available_y = max(0, resized.height - target_h)
    top = round(available_y * focus_y)
    return resized.crop((left, top, left + target_w, top + target_h))


def polish(image: Image.Image) -> Image.Image:
    image = ImageEnhance.Contrast(image).enhance(1.035)
    image = ImageEnhance.Color(image).enhance(1.025)
    return image.filter(ImageFilter.UnsharpMask(radius=1.2, percent=82, threshold=4))


def save_webp(image: Image.Image, path: Path, quality: int = 88) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "WEBP", quality=quality, method=6)


def build_one(source: Path, output_root: Path) -> None:
    slug = source.stem.lower().replace(" ", "-")
    destination = output_root / slug
    with Image.open(source) as raw:
        base = polish(cover(raw, (720, 900), focus_y=0.28))
        card = polish(cover(raw, (480, 640), focus_y=0.25))
        avatar = polish(cover(raw, (220, 220), focus_y=0.18))
        save_webp(base, destination / "base.webp", quality=90)
        save_webp(card, destination / "card.webp", quality=89)
        save_webp(avatar, destination / "avatar.webp", quality=87)
    print(f"Built: {slug}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sources", default="player-sources", help="Directory containing licensed source images")
    parser.add_argument("--output", default="public/sl7fc-game/assets/players", help="Output assets directory")
    args = parser.parse_args()

    sources = Path(args.sources)
    output = Path(args.output)
    if not sources.exists():
        raise SystemExit(f"Source directory not found: {sources}")

    files = sorted(path for path in sources.iterdir() if path.suffix.lower() in SUPPORTED)
    if not files:
        raise SystemExit(f"No supported images found in: {sources}")

    for source in files:
        build_one(source, output)
    print(f"Completed {len(files)} player(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
