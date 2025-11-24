from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, List

from PySide6.QtCore import QRect, Qt
from PySide6.QtGui import QColor, QKeyEvent
from PySide6.QtWidgets import QLabel, QWidget, QVBoxLayout


@dataclass
class OverlayBlock:
    text: str
    x: int
    y: int
    w: int
    h: int


class TranslationOverlay(QWidget):
    """Overlay que muestra los textos traducidos sobre la regiÃ³n capturada."""

    def __init__(self, region: QRect, blocks: Iterable[OverlayBlock], parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._blocks: List[OverlayBlock] = list(blocks)

        self.setWindowFlags(
            Qt.WindowStaysOnTopHint
            | Qt.FramelessWindowHint
            | Qt.Tool
        )
        self.setAttribute(Qt.WA_TranslucentBackground, True)
        self.setGeometry(region)

        self._build_labels()

    def _build_labels(self) -> None:
        # Mostramos las traducciones en un panel tipo "subtÃ­tulo" en la
        # parte inferior de la regiÃ³n capturada, para una apariencia mÃ¡s
        # limpia y legible.

        margin = 8
        card_height = min(self.height() - margin * 2, 220)
        card_width = self.width() - margin * 2

        card = QWidget(self)
        card.setObjectName("overlayCard")
        card.setGeometry(
            margin,
            self.height() - card_height - margin,
            card_width,
            card_height,
        )

        layout = QVBoxLayout(card)
        layout.setContentsMargins(12, 8, 12, 8)
        layout.setSpacing(4)

        for block in self._blocks:
            if not block.text.strip():
                continue
            label = QLabel(block.text, card)
            label.setWordWrap(True)
            label.setStyleSheet(
                "color: white;"
                "font-size: 15px;"
            )
            layout.addWidget(label)

        # Estilo del panel de subtÃ­tulos.
        self.setStyleSheet(
            """
            QWidget#overlayCard {
                background-color: rgba(0, 0, 0, 190);
                border-radius: 10px;
            }
            """
        )
        self.show()

    def mousePressEvent(self, event) -> None:  # type: ignore[override]
        # Un clic en cualquier parte cierra el overlay.
        self.close()

    def keyPressEvent(self, event: QKeyEvent) -> None:  # type: ignore[override]
        if event.key() == Qt.Key_Escape:
            self.close()
        else:
            super().keyPressEvent(event)

