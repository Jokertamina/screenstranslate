"""GestiÃ³n de historial de traducciones para ScreensTranslate Pro."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List

from .config import get_app_dir


HISTORY_FILE_NAME = "history.json"


def get_history_path() -> Path:
    return get_app_dir() / HISTORY_FILE_NAME


def load_history() -> List[Dict[str, Any]]:
    path = get_history_path()
    if not path.exists():
        return []
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        # Si el historial estÃ¡ corrupto, lo ignoramos para no bloquear la app.
        return []


def save_history(entries: List[Dict[str, Any]]) -> None:
    path = get_history_path()
    path.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")


def add_entry(
    original: str,
    translated: str,
    source_lang: str,
    target_lang: str,
) -> None:
    entries = load_history()
    entry = {
        "id": len(entries) + 1,
        "original": original,
        "translated": translated,
        "source_lang": source_lang,
        "target_lang": target_lang,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    entries.append(entry)
    save_history(entries)


def clear_history() -> None:
    path = get_history_path()
    if path.exists():
        path.unlink()

