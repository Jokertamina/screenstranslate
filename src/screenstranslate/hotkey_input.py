from __future__ import annotations

from PySide6.QtCore import Signal, Qt
from PySide6.QtGui import QKeyEvent
from PySide6.QtWidgets import QLineEdit


class HotkeyLineEdit(QLineEdit):
    """Campo de texto especializado para capturar combinaciones de teclas.

    Comportamiento esperado:
    - Pulsas Ctrl -> muestra "ctrl".
    - Pulsas luego Shift -> "ctrl+shift".
    - Pulsas luego S -> "ctrl+shift+s".
    """

    hotkeyChanged = Signal(str)

    def __init__(self, parent=None) -> None:
        super().__init__(parent)
        self.setPlaceholderText("Pulsa la combinaciÃ³n de teclas")
        self.setReadOnly(True)
        self._mods: list[str] = []
        self._key: str | None = None

    def _update_text(self) -> None:
        parts = self._mods.copy()
        if self._key:
            parts.append(self._key)
        hotkey = "+".join(parts)
        self.setText(hotkey)
        if hotkey:
            self.hotkeyChanged.emit(hotkey)

    def _add_modifier(self, name: str) -> None:
        if name not in self._mods:
            self._mods.append(name)
        self._update_text()

    def keyPressEvent(self, event: QKeyEvent) -> None:  # type: ignore[override]
        key = event.key()

        # NavegaciÃ³n normal con tabulador.
        if key in (Qt.Key_Tab, Qt.Key_Backtab):
            return super().keyPressEvent(event)

        # Borrar configuraciÃ³n actual con Escape o Backspace.
        if key in (Qt.Key_Escape, Qt.Key_Backspace, Qt.Key_Delete):
            self._mods.clear()
            self._key = None
            self.setText("")
            self.hotkeyChanged.emit("")
            return

        # Modificadores
        if key in (Qt.Key_Control, Qt.Key_Meta, Qt.Key_Super_L, Qt.Key_Super_R):
            self._add_modifier("ctrl")
            return
        if key == Qt.Key_Shift:
            self._add_modifier("shift")
            return
        if key == Qt.Key_Alt:
            self._add_modifier("alt")
            return

        # Tecla principal
        text = (event.text() or "").strip().lower()
        if not text:
            # Para teclas especiales sin texto podrÃ­amos mapear manualmente
            # (F1, etc.). De momento solo aceptamos teclas con texto.
            return

        self._key = text
        self._update_text()

        # No llamamos a la implementaciÃ³n base para evitar que inserte caracteres crudos.

