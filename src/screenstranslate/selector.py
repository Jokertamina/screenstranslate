from __future__ import annotations

from PySide6.QtCore import QPoint, QRect, Qt, Signal
from PySide6.QtGui import QColor, QGuiApplication, QMouseEvent, QPainter, QPen, QBrush, QKeyEvent
from PySide6.QtWidgets import QWidget


class SelectionOverlay(QWidget):
    """Overlay de pantalla completa para seleccionar una regiÃ³n rectangular.

    - AtenÃºa la pantalla.
    - El cursor se muestra como cruz.
    - El usuario hace clic y arrastra para definir la regiÃ³n.
    """

    regionSelected = Signal(QRect)
    canceled = Signal()

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)

        screen = QGuiApplication.primaryScreen()
        geo = screen.geometry() if screen is not None else QGuiApplication.instance().primaryScreen().geometry()
        self._screen_geo = geo

        self.setGeometry(geo)
        self.setWindowFlags(
            Qt.WindowStaysOnTopHint
            | Qt.FramelessWindowHint
            | Qt.Tool
        )
        self.setAttribute(Qt.WA_TranslucentBackground, True)
        self.setCursor(Qt.CrossCursor)

        self._origin: QPoint | None = None
        self._current: QPoint | None = None

    def start(self) -> None:
        self.showFullScreen()
        self.activateWindow()
        self.raise_()

    def paintEvent(self, event) -> None:  # type: ignore[override]
        painter = QPainter(self)
        # Atenuar toda la pantalla
        painter.fillRect(self.rect(), QColor(0, 0, 0, 80))

        if self._origin and self._current:
            rect = QRect(self._origin, self._current).normalized()
            pen = QPen(QColor(0, 180, 255), 2)
            painter.setPen(pen)
            brush = QBrush(QColor(0, 180, 255, 60))
            painter.fillRect(rect, brush)
            painter.drawRect(rect)

    def mousePressEvent(self, event: QMouseEvent) -> None:  # type: ignore[override]
        if event.button() == Qt.LeftButton:
            self._origin = event.position().toPoint()
            self._current = self._origin
            self.update()

    def mouseMoveEvent(self, event: QMouseEvent) -> None:  # type: ignore[override]
        if self._origin is not None:
            self._current = event.position().toPoint()
            self.update()

    def mouseReleaseEvent(self, event: QMouseEvent) -> None:  # type: ignore[override]
        if event.button() == Qt.LeftButton and self._origin is not None and self._current is not None:
            rect = QRect(self._origin, self._current).normalized()
            if rect.width() < 5 or rect.height() < 5:
                # RegiÃ³n demasiado pequeÃ±a: cancelar.
                self.canceled.emit()
                self.close()
                return

            # Convertir a coordenadas globales segÃºn la geometrÃ­a de la pantalla usada.
            global_rect = QRect(
                rect.left() + self._screen_geo.x(),
                rect.top() + self._screen_geo.y(),
                rect.width(),
                rect.height(),
            )
            self.regionSelected.emit(global_rect)
            self.close()

    def keyPressEvent(self, event: QKeyEvent) -> None:  # type: ignore[override]
        if event.key() == Qt.Key_Escape:
            self.canceled.emit()
            self.close()
        else:
            super().keyPressEvent(event)

