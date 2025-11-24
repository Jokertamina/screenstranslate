from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import List

from PIL import Image
import pytesseract
from pytesseract import TesseractNotFoundError
import os
import platform
import logging
import subprocess
import tempfile
import csv


LANG_MAP = {
    "es": "spa",
    "en": "eng",
    "ja": "jpn",
    "ko": "kor",
    "zh": "chi_sim",
}


@dataclass
class TextBlock:
    text: str
    x: int
    y: int
    w: int
    h: int
    confidence: float
    par_num: int | None = None
    block_num: int | None = None
    line_num: int | None = None


def _tesseract_lang(code: str) -> str:
    if code == "auto":
        codes = set(LANG_MAP.values())
        codes.add("eng")
        return "+".join(sorted(codes))
    return LANG_MAP.get(code, "eng")


def _configure_tesseract_cmd_if_needed() -> None:
    """Configura pytesseract.tesseract_cmd si es posible.

    - Respeta la variable de entorno TESSERACT_CMD si existe.
    - Si no, intenta rutas tÃ­picas en Windows y macOS.
    """

    logger = logging.getLogger(__name__)

    # Si ya hay un valor y apunta a un ejecutable vÃ¡lido, lo respetamos.
    current_cmd = getattr(pytesseract, "tesseract_cmd", "")
    if current_cmd:
        current_path = Path(current_cmd)
        if current_path.is_file():
            logger.debug("Usando tesseract_cmd ya configurado: %s", current_cmd)
            return

    env_cmd = os.getenv("TESSERACT_CMD")
    if env_cmd:
        env_path = Path(env_cmd)
        logger.info("Probando TESSERACT_CMD de entorno: %s", env_cmd)
        if env_path.is_file():
            pytesseract.tesseract_cmd = str(env_path)
            logger.info("Tesseract detectado mediante TESSERACT_CMD: %s", env_path)
            return
        else:
            logger.warning("TESSERACT_CMD apunta a una ruta inexistente: %s", env_cmd)

    system = platform.system()
    candidates: List[Path] = []

    if system == "Windows":
        candidates = [
            Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe"),
            Path(r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe"),
            Path(r"C:\Tesseract-OCR\tesseract.exe"),
        ]
    elif system == "Darwin":  # macOS
        candidates = [
            Path("/opt/homebrew/bin/tesseract"),
            Path("/usr/local/bin/tesseract"),
        ]

    for candidate in candidates:
        logger.info("Probando ruta de Tesseract: %s", candidate)
        if candidate.is_file():
            pytesseract.tesseract_cmd = str(candidate)
            logger.info("Tesseract detectado en: %s", candidate)
            return


def extract_text_blocks(image: Image.Image, lang_code: str = "auto", min_conf: float = 60.0) -> List[TextBlock]:
    """Ejecuta Tesseract directamente y parsea la salida TSV.

    Se evita el chequeo interno de versiÃ³n de pytesseract, que en este
    entorno concreto estÃ¡ devolviendo TesseractNotFoundError a pesar de
    que el ejecutable funciona.
    """

    _configure_tesseract_cmd_if_needed()
    logger = logging.getLogger(__name__)

    tesseract_cmd = getattr(pytesseract, "tesseract_cmd", "tesseract")
    exe_path = Path(tesseract_cmd)
    if not exe_path.is_file():
        logger.error("No se ha encontrado el ejecutable de Tesseract en: %s", exe_path)
        raise TesseractNotFoundError()

    lang = _tesseract_lang(lang_code)

    # Guardar la imagen en un fichero temporal para pasarlo a Tesseract.
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
        tmp_path = Path(tmp.name)
        image.save(tmp_path, format="PNG")

    try:
        # Primero intentamos obtener bloques con coordenadas vÃ­a TSV.
        cmd = f'"{exe_path}" "{tmp_path}" stdout -l {lang} --psm 6 tsv'
        logger.info("Ejecutando comando Tesseract: %s", cmd)
        proc = subprocess.run(
            cmd,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            encoding="utf-8",
            errors="ignore",
            check=False,
        )

        if proc.returncode != 0:
            logger.error("Tesseract devolviÃ³ cÃ³digo %s: %s", proc.returncode, proc.stderr[:500])
            # Si no se puede ejecutar, lo tratamos como no encontrado.
            raise TesseractNotFoundError()

        lines = proc.stdout.splitlines()
        blocks: List[TextBlock] = []
        if lines:
            reader = csv.DictReader(lines, delimiter="\t")
            for row in reader:
                text = (row.get("text") or "").strip()
                if not text:
                    continue

                try:
                    conf = float(row.get("conf") or "0")
                except ValueError:
                    conf = 0.0

                if conf < min_conf:
                    continue

                try:
                    x = int(row.get("left") or 0)
                    y = int(row.get("top") or 0)
                    w = int(row.get("width") or 0)
                    h = int(row.get("height") or 0)
                except ValueError:
                    continue

                try:
                    par_num = int(row.get("par_num") or 0)
                    block_num = int(row.get("block_num") or 0)
                    line_num = int(row.get("line_num") or 0)
                except ValueError:
                    par_num = block_num = line_num = 0

                blocks.append(
                    TextBlock(
                        text=text,
                        x=x,
                        y=y,
                        w=w,
                        h=h,
                        confidence=conf,
                        par_num=par_num or None,
                        block_num=block_num or None,
                        line_num=line_num or None,
                    )
                )

        if blocks:
            return blocks

        # Fallback: si no hay bloques, pedimos solo texto plano y
        # devolvemos un Ãºnico bloque que cubre toda la regiÃ³n.
        cmd_plain = f'"{exe_path}" "{tmp_path}" stdout -l {lang}'
        logger.info("Ejecutando comando Tesseract (texto plano): %s", cmd_plain)
        proc2 = subprocess.run(
            cmd_plain,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            encoding="utf-8",
            errors="ignore",
            check=False,
        )

        if proc2.returncode != 0:
            logger.error("Tesseract (texto plano) devolviÃ³ cÃ³digo %s: %s", proc2.returncode, proc2.stderr[:500])
            return []

        plain_text = proc2.stdout.strip()
        if not plain_text:
            return []

        img_w, img_h = image.size
        return [
            TextBlock(
                text=plain_text,
                x=0,
                y=0,
                w=img_w,
                h=img_h,
                confidence=100.0,
            )
        ]
    finally:
        try:
            tmp_path.unlink(missing_ok=True)
        except Exception:
            logger.debug("No se pudo eliminar el fichero temporal de imagen: %s", tmp_path)

