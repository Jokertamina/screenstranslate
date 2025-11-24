from __future__ import annotations

"""Gestor de hotkey global para ScreensTranslate Pro.

Se basa en pynput y estÃ¡ pensado como componente reutilizable para que
podamos modificar el atajo sin reiniciar la aplicaciÃ³n.
"""

from dataclasses import dataclass
from typing import Callable, Optional

from pynput import keyboard


@dataclass
class HotkeyConfig:
    raw: str
    formatted: str


def _format_hotkey_string(raw: str) -> HotkeyConfig:
    """Convierte "ctrl+shift+t" en el formato que espera pynput.

    Ej.: "ctrl+shift+t" -> "<ctrl>+<shift>+t".
    """

    if not raw:
        raise ValueError("Hotkey vacÃ­o")

    parts = [p.strip().lower() for p in raw.split("+") if p.strip()]
    if not parts:
        raise ValueError("Hotkey vacÃ­o")

    *mods, key = parts

    mod_map = {
        "ctrl": "<ctrl>",
        "control": "<ctrl>",
        "shift": "<shift>",
        "alt": "<alt>",
        "cmd": "<cmd>",
        "win": "<cmd>",
    }

    seq = []
    for m in mods:
        mapped = mod_map.get(m)
        if not mapped:
            raise ValueError(f"Modificador de hotkey no soportado: {m}")
        seq.append(mapped)

    # La tecla principal se pasa tal cual (t, f8, etc.).
    if not key:
        raise ValueError("Tecla principal vacÃ­a en hotkey")
    seq.append(key)

    formatted = "+".join(seq)
    return HotkeyConfig(raw=raw, formatted=formatted)


class HotkeyListener:
    """Envuelve keyboard.GlobalHotKeys y permite actualizar el atajo."""

    def __init__(self, hotkey: str, callback: Callable[[], None]) -> None:
        self._callback = callback
        self._config = _format_hotkey_string(hotkey)
        self._listener: Optional[keyboard.GlobalHotKeys] = None

    @property
    def hotkey(self) -> str:
        return self._config.raw

    def start(self) -> None:
        # Reiniciamos si ya estaba escuchando.
        self.stop()
        mapping = {self._config.formatted: self._callback}
        self._listener = keyboard.GlobalHotKeys(mapping)
        self._listener.start()

    def stop(self) -> None:
        if self._listener is not None:
            self._listener.stop()
            self._listener = None

    def update_hotkey(self, hotkey: str) -> None:
        self._config = _format_hotkey_string(hotkey)
        self.start()

