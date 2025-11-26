"""GestiÃ³n de configuraciÃ³n de ScreensTranslate Pro.

Se almacena en un directorio especÃ­fico del usuario, separado del cÃ³digo
para evitar conflictos con permisos y antivirus.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict


APP_DIR_NAME = ".screenstranslate"
CONFIG_FILE_NAME = "config.json"

DEFAULT_CONFIG: Dict[str, Any] = {
    "language_source": "auto",
    "language_target": "es",
    "hotkey": "ctrl+shift+t",
    "is_pro": False,
    "ui_language": "auto",
}


def get_app_dir() -> Path:
    base_dir = Path.home() / APP_DIR_NAME
    base_dir.mkdir(parents=True, exist_ok=True)
    return base_dir


def get_config_path() -> Path:
    return get_app_dir() / CONFIG_FILE_NAME


def load_config() -> Dict[str, Any]:
    cfg_path = get_config_path()
    if not cfg_path.exists():
        save_config(DEFAULT_CONFIG)
        return DEFAULT_CONFIG.copy()
    try:
        return json.loads(cfg_path.read_text(encoding="utf-8"))
    except Exception:
        # Si el fichero estÃ¡ corrupto, volvemos a valores por defecto.
        save_config(DEFAULT_CONFIG)
        return DEFAULT_CONFIG.copy()


def save_config(cfg: Dict[str, Any]) -> None:
    cfg_path = get_config_path()
    cfg_path.write_text(json.dumps(cfg, ensure_ascii=False, indent=2), encoding="utf-8")

