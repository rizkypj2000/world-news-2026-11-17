"""Entry for make.fun bounty news-image-20261117.

Writes the one-image summary of Tuesday 17 November 2026's world news
to <output>/entry.png. The image is pre-rendered from design/page.html
(see design/render.ps1); this program only copies it, so both runs
produce identical bytes and no network is needed.
"""

import os
import struct
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "entry.png"

PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
MAX_BYTES = 1_048_576  # 1 MiB, the bounty's cap
MAX_SIDE = 1024        # pixels, width and height


def check_png(data: bytes) -> tuple[int, int]:
    """Check the bounty's gate rules and return (width, height)."""
    if len(data) > MAX_BYTES:
        raise ValueError(f"image is {len(data)} bytes, over {MAX_BYTES}")
    if not data.startswith(PNG_SIGNATURE):
        raise ValueError("entry.png is not a PNG")
    # First chunk must be IHDR: length(4) type(4) width(4) height(4) ...
    if data[12:16] != b"IHDR":
        raise ValueError("PNG has no IHDR header chunk")
    width, height = struct.unpack(">II", data[16:24])
    if not (0 < width <= MAX_SIDE and 0 < height <= MAX_SIDE):
        raise ValueError(f"image is {width}x{height}, over {MAX_SIDE}x{MAX_SIDE}")
    if not data.endswith(b"IEND\xaeB`\x82"):
        raise ValueError("PNG is truncated (no IEND chunk)")
    return width, height


def main() -> None:
    data = SOURCE.read_bytes()
    width, height = check_png(data)
    out_dir = Path(os.environ.get("MAKEFUN_OUTPUT_DIR", "/output"))
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "entry.png").write_bytes(data)
    print(f"wrote entry.png: {width}x{height}, {len(data)} bytes", file=sys.stderr)


if __name__ == "__main__":
    main()
