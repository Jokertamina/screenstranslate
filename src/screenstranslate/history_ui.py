from __future__ import annotations

from typing import List

from PySide6.QtCore import Qt
from PySide6.QtGui import QGuiApplication
from PySide6.QtWidgets import (
    QFileDialog,
    QHBoxLayout,
    QHeaderView,
    QMainWindow,
    QMessageBox,
    QPushButton,
    QTableWidget,
    QTableWidgetItem,
    QVBoxLayout,
    QWidget,
)

from .history import clear_history, load_history


class HistoryWindow(QMainWindow):
    def __init__(self, parent: QWidget | None = None) -> None:  # type: ignore[name-defined]
        super().__init__(parent)
        self.setWindowTitle("Historial de traducciones")
        self._build_ui()
        self._load_entries()

    def _build_ui(self) -> None:
        central = QWidget(self)
        layout = QVBoxLayout(central)

        self.table = QTableWidget(0, 5, central)
        self.table.setHorizontalHeaderLabels([
            "Fecha/Hora",
            "Origen",
            "Destino",
            "Original",
            "Traducido",
        ])
        header = self.table.horizontalHeader()
        header.setSectionResizeMode(0, QHeaderView.ResizeToContents)
        header.setSectionResizeMode(1, QHeaderView.ResizeToContents)
        header.setSectionResizeMode(2, QHeaderView.ResizeToContents)
        header.setSectionResizeMode(3, QHeaderView.Stretch)
        header.setSectionResizeMode(4, QHeaderView.Stretch)
        self.table.setSelectionBehavior(QTableWidget.SelectRows)
        self.table.setSelectionMode(QTableWidget.SingleSelection)

        btn_bar = QHBoxLayout()
        self.copy_btn = QPushButton("Copiar traducido", self)
        self.export_btn = QPushButton("Exportar CSV", self)
        self.clear_btn = QPushButton("Borrar historial", self)

        self.copy_btn.clicked.connect(self._on_copy_clicked)
        self.export_btn.clicked.connect(self._on_export_clicked)
        self.clear_btn.clicked.connect(self._on_clear_clicked)

        btn_bar.addWidget(self.copy_btn)
        btn_bar.addWidget(self.export_btn)
        btn_bar.addWidget(self.clear_btn)
        btn_bar.addStretch(1)

        layout.addWidget(self.table)
        layout.addLayout(btn_bar)

        self.setCentralWidget(central)
        self.resize(900, 400)

    def _load_entries(self) -> None:
        entries = load_history()
        entries_sorted: List[dict] = sorted(
            entries,
            key=lambda e: e.get("timestamp") or "",
            reverse=True,
        )

        self.table.setRowCount(len(entries_sorted))
        for row_idx, entry in enumerate(entries_sorted):
            dt = entry.get("timestamp", "")
            src = entry.get("source_lang", "")
            tgt = entry.get("target_lang", "")
            original = entry.get("original", "")
            translated = entry.get("translated", "")

            self.table.setItem(row_idx, 0, QTableWidgetItem(dt))
            self.table.setItem(row_idx, 1, QTableWidgetItem(src))
            self.table.setItem(row_idx, 2, QTableWidgetItem(tgt))
            self.table.setItem(row_idx, 3, QTableWidgetItem(original))
            self.table.setItem(row_idx, 4, QTableWidgetItem(translated))

        if entries_sorted:
            self.table.selectRow(0)

    def _current_row_data(self) -> dict | None:
        row = self.table.currentRow()
        if row < 0:
            return None
        return {
            "datetime": self.table.item(row, 0).text() if self.table.item(row, 0) else "",
            "source": self.table.item(row, 1).text() if self.table.item(row, 1) else "",
            "target": self.table.item(row, 2).text() if self.table.item(row, 2) else "",
            "original": self.table.item(row, 3).text() if self.table.item(row, 3) else "",
            "translated": self.table.item(row, 4).text() if self.table.item(row, 4) else "",
        }

    def _on_copy_clicked(self) -> None:
        data = self._current_row_data()
        if not data:
            return
        text = data["translated"]
        if not text:
            return
        QGuiApplication.clipboard().setText(text)
        self.statusBar().showMessage("Texto traducido copiado al portapapeles", 3000)

    def _on_export_clicked(self) -> None:
        path, _ = QFileDialog.getSaveFileName(
            self,
            "Exportar historial a CSV",
            "historial_traducciones.csv",
            "CSV (*.csv)",
        )
        if not path:
            return

        rows = self.table.rowCount()
        import csv

        try:
            with open(path, "w", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                writer.writerow(["fecha_hora", "origen", "destino", "original", "traducido"])
                for row in range(rows):
                    row_data = [
                        self.table.item(row, col).text() if self.table.item(row, col) else ""
                        for col in range(5)
                    ]
                    writer.writerow(row_data)
        except OSError as exc:
            QMessageBox.critical(self, "Error", f"No se pudo exportar el CSV: {exc}")
            return

        self.statusBar().showMessage("Historial exportado a CSV", 4000)

    def _on_clear_clicked(self) -> None:
        if QMessageBox.question(
            self,
            "Borrar historial",
            "Â¿Seguro que quieres borrar todo el historial de traducciones?",
            QMessageBox.Yes | QMessageBox.No,
            QMessageBox.No,
        ) != QMessageBox.Yes:
            return

        clear_history()
        self.table.setRowCount(0)
        self.statusBar().showMessage("Historial borrado", 3000)

