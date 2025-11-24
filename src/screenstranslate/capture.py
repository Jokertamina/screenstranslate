from __future__ import annotations

from typing import Tuple

from mss import mss
from PIL import Image


def capture_region(left: int, top: int, width: int, height: int) -> Image.Image:
    bbox = {
        "left": int(left),
        "top": int(top),
        "width": int(width),
        "height": int(height),
    }
    with mss() as sct:
        grab = sct.grab(bbox)
    img = Image.frombytes("RGB", grab.size, grab.rgb)
    return img

