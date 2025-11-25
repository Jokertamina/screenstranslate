import logging
import os
import sys
import signal
from PySide6.QtCore import QRect, Slot, Signal, QUrl
from PySide6.QtGui import QGuiApplication, QDesktopServices
from PySide6.QtWidgets import (
    QApplication,
    QComboBox,
    QFormLayout,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QMainWindow,
    QPushButton,
    QVBoxLayout,
    QWidget,
)

from pytesseract import TesseractNotFoundError
import pytesseract

from .config import load_config, save_config
from .capture import capture_region
from .history import add_entry
from .history_ui import HistoryWindow
from .hotkey import HotkeyListener
from .hotkey_input import HotkeyLineEdit
from .licensing import check_and_register_use, activate_license, is_pro, maybe_refresh_license
from .ocr import TextBlock, extract_text_blocks
from .overlay import OverlayBlock, TranslationOverlay
from .selector import SelectionOverlay
from .translation import TranslationClient, TranslationError


APP_NAME = "ScreensTranslate Pro"


class ConfigWindow(QMainWindow):
    """Ventana principal de configuración de ScreensTranslate Pro.

    De momento solo permite ajustar idioma origen/destino y hotkey.
    Más adelante se integrará con el flujo de captura/OCR/traducción.
    """

    hotkeyTriggered = Signal()

    SUPPORTED_LANGS = [
        ("auto", "Detección automática"),
        ("es", "Español"),
        ("en", "Inglés"),
        ("ja", "Japonés"),
        ("ko", "Coreano"),
        ("zh", "Chino"),
    ]

    def __init__(self, config: dict):
        super().__init__()
        self.config = maybe_refresh_license(config)
        save_config(self.config)
        self.setWindowTitle(APP_NAME)
        self._translation_client = TranslationClient()
        self._current_overlay: TranslationOverlay | None = None
        self._hotkey_listener: HotkeyListener | None = None
        self._history_window: HistoryWindow | None = None
        self._selection_overlay: SelectionOverlay | None = None
        self.hotkeyTriggered.connect(self._on_test_capture_clicked)
        self._build_ui()
        self._setup_hotkey_listener()

    def _build_ui(self) -> None:
        central = QWidget(self)
        outer_layout = QVBoxLayout(central)
        outer_layout.setContentsMargins(20, 20, 20, 20)
        outer_layout.setSpacing(12)

        card = QWidget(central)
        card.setObjectName("configCard")
        card_layout = QVBoxLayout(card)
        card_layout.setContentsMargins(18, 18, 18, 18)
        card_layout.setSpacing(14)

        title = QLabel(APP_NAME, card)
        title.setObjectName("titleLabel")
        subtitle = QLabel("Captura y traduce texto de cualquier aplicación al instante", card)
        subtitle.setObjectName("subtitleLabel")
        subtitle.setWordWrap(True)

        form_layout = QFormLayout()
        form_layout.setHorizontalSpacing(12)
        form_layout.setVerticalSpacing(8)

        self.combo_src = QComboBox(card)
        self.combo_tgt = QComboBox(card)
        for code, label in self.SUPPORTED_LANGS:
            self.combo_src.addItem(label, code)
            self.combo_tgt.addItem(label, code)

        # Seleccionar valores actuales
        self._set_current_lang(self.combo_src, self.config.get("language_source", "auto"))
        self._set_current_lang(self.combo_tgt, self.config.get("language_target", "es"))

        self.hotkey_edit = HotkeyLineEdit(card)
        self.hotkey_edit.setText(self.config.get("hotkey", "ctrl+shift+t"))

        self.license_edit = QLineEdit(card)
        self.license_edit.setObjectName("licenseEdit")
        self.license_edit.setPlaceholderText("Introduce tu clave de licencia Pro")
        self.license_edit.setText(self.config.get("license_key", ""))

        self.activate_license_btn = QPushButton("Activar Pro", card)
        self.activate_license_btn.setObjectName("secondaryButton")
        self.activate_license_btn.clicked.connect(self._on_activate_license_clicked)
        self.activate_license_btn.setEnabled(True)  # Always enable the button

        self.save_btn = QPushButton("Guardar", card)
        self.save_btn.clicked.connect(self._on_save_clicked)

        self.test_btn = QPushButton("Probar captura", card)
        self.test_btn.clicked.connect(self._on_test_capture_clicked)

        self.history_btn = QPushButton("Historial", card)
        self.history_btn.clicked.connect(self._on_history_clicked)

        self.manage_sub_btn = QPushButton("Gestionar suscripción", card)
        self.manage_sub_btn.setObjectName("secondaryButton")
        self.manage_sub_btn.clicked.connect(self._on_manage_subscription_clicked)

        # Marcar botones secundarios para estilos diferenciados.
        self.test_btn.setObjectName("secondaryButton")
        self.history_btn.setObjectName("secondaryButton")

        form_layout.addRow("Idioma origen", self.combo_src)
        form_layout.addRow("Idioma destino", self.combo_tgt)
        form_layout.addRow("Hotkey global", self.hotkey_edit)
        form_layout.addRow("Licencia Pro", self.license_edit)

        buttons_layout = QHBoxLayout()
        buttons_layout.setSpacing(8)
        buttons_layout.addWidget(self.save_btn)
        buttons_layout.addWidget(self.test_btn)
        buttons_layout.addWidget(self.history_btn)
        buttons_layout.addWidget(self.manage_sub_btn)
        buttons_layout.addWidget(self.activate_license_btn)
        buttons_layout.addStretch(1)

        card_layout.addWidget(title)
        card_layout.addWidget(subtitle)
        card_layout.addLayout(form_layout)
        card_layout.addLayout(buttons_layout)

        outer_layout.addWidget(card)
        outer_layout.addStretch(1)

        self.setCentralWidget(central)
        self._apply_styles()

        # Reflejar estado Pro actual en la UI.
        if is_pro(self.config):
            self.activate_license_btn.setText("Pro activo")

    @staticmethod
    def _set_current_lang(combo: QComboBox, code: str) -> None:
        for i in range(combo.count()):
            if combo.itemData(i) == code:
                combo.setCurrentIndex(i)
                return

    def _on_save_clicked(self) -> None:
        self.config["language_source"] = self.combo_src.currentData()
        self.config["language_target"] = self.combo_tgt.currentData()
        self.config["hotkey"] = self.hotkey_edit.text().strip() or "ctrl+shift+t"
        self.config["license_key"] = self.license_edit.text().strip()
        save_config(self.config)
        self.statusBar().showMessage("Configuración guardada", 3000)

        # Actualizar listener de hotkey si estÃ¡ activo.
        if self._hotkey_listener is not None:
            try:
                self._hotkey_listener.update_hotkey(self.config["hotkey"])
            except ValueError as exc:
                logging.getLogger(__name__).warning("Hotkey inválido: %s", exc)

    @Slot()
    def _on_test_capture_clicked(self) -> None:
        """Inicia el flujo de selecciÃ³n de regiÃ³n y traducciÃ³n rÃ¡pida."""

        check_result = check_and_register_use(self.config)
        self.config.update(check_result.updated_config)
        save_config(self.config)

        if not check_result.allowed:
            msg = check_result.message or "Has alcanzado el límite de uso en la versión Basic."
            self.statusBar().showMessage(msg, 5000)
            return

        # Cerrar cualquier overlay de selecciÃ³n previo que se haya quedado
        # abierto por error.
        if self._selection_overlay is not None:
            self._selection_overlay.close()
            self._selection_overlay = None

        selector = SelectionOverlay(self)
        selector.regionSelected.connect(self._on_region_selected)
        selector.canceled.connect(self._on_selection_canceled)
        selector.start()
        self._selection_overlay = selector

    def _setup_hotkey_listener(self) -> None:
        """Configura el listener de hotkey global segÃºn la preferencia actual."""

        hotkey_str = self.config.get("hotkey", "ctrl+shift+t")
        logger = logging.getLogger(__name__)
        try:
            self._hotkey_listener = HotkeyListener(hotkey_str, self._on_hotkey_pressed)
            self._hotkey_listener.start()
            logger.info("Hotkey global activo: %s", hotkey_str)
        except ValueError as exc:
            logger.warning("No se pudo activar el hotkey global '%s': %s", hotkey_str, exc)

    def _on_hotkey_pressed(self) -> None:
        """Callback que se ejecuta en el hilo de pynput cuando se pulsa el hotkey."""

        # Emitimos una seÃ±al para ejecutar la captura en el hilo de Qt.
        self.hotkeyTriggered.emit()

    @Slot()
    def _on_history_clicked(self) -> None:
        if self._history_window is None or not self._history_window.isVisible():
            self._history_window = HistoryWindow(self)
        self._history_window.show()
        self._history_window.raise_()
        self._history_window.activateWindow()

    @Slot()
    def _on_manage_subscription_clicked(self) -> None:
        """Abre la pÃ¡gina web de gestiÃ³n de suscripciÃ³n en el navegador."""

        url = os.getenv(
            "SCREENSTRANSLATE_MANAGE_SUBSCRIPTION_URL",
            "https://screenstranslate.com/account",
        )
        QDesktopServices.openUrl(QUrl(url))

    @Slot()
    def _on_activate_license_clicked(self) -> None:
        key = self.license_edit.text().strip()
        result = activate_license(self.config, key)
        self.config.update(result.updated_config)
        save_config(self.config)
        self.statusBar().showMessage(result.message, 5000)

        # Actualizar estado de Pro en la UI (por ahora solo afecta a los lÃ­mites).
        if is_pro(self.config):
            self.activate_license_btn.setText("Pro activo")

    def _apply_styles(self) -> None:
        """Aplica estilos visuales a la ventana de configuraciÃ³n."""

        self.setStyleSheet(
            """
            QMainWindow {
                background-color: #e5e7eb;
            }

            QWidget#configCard {
                background-color: #ffffff;
                border-radius: 12px;
                border: 1px solid #d1d5db;
            }

            QLabel {
                color: #111827;
                font-size: 13px;
            }

            QLabel#titleLabel {
                font-size: 18px;
                font-weight: 600;
                color: #0f172a;
            }

            QLabel#subtitleLabel {
                font-size: 12px;
                color: #6b7280;
            }

            QLineEdit, QComboBox {
                background-color: #f9fafb;
                color: #111827;
                border-radius: 6px;
                border: 1px solid #cbd5e1;
                padding: 4px 8px;
            }

            QPushButton {
                background-color: #00b4ff;
                color: #0b1120;
                border-radius: 8px;
                padding: 6px 12px;
                border: none;
                font-weight: 500;
            }

            QPushButton#secondaryButton {
                background-color: #e5e7eb;
                color: #111827;
            }

            QPushButton:hover {
                background-color: #0095d1;
            }
            """
        )

    @Slot()
    def _on_selection_canceled(self) -> None:
        self.statusBar().showMessage("SelecciÃ³n cancelada", 3000)
        if self._selection_overlay is not None:
            self._selection_overlay.close()
            self._selection_overlay = None

    @Slot(QRect)
    def _on_region_selected(self, rect: QRect) -> None:
        logger = logging.getLogger(__name__)
        logger.info("RegiÃ³n seleccionada: %s", rect)

        # Asegurarnos de cerrar el overlay de selecciÃ³n si sigue visible.
        if self._selection_overlay is not None:
            self._selection_overlay.close()
            self._selection_overlay = None

        img = capture_region(rect.left(), rect.top(), rect.width(), rect.height())

        source_lang = self.config.get("language_source", "auto")
        target_lang = self.config.get("language_target", "es")

        try:
            # Umbral de confianza mÃ¡s bajo para no perder texto durante las pruebas.
            blocks: list[TextBlock] = extract_text_blocks(img, lang_code=source_lang, min_conf=40.0)
        except TesseractNotFoundError as exc:
            logger.exception(
                "Error al invocar Tesseract (cmd=%s): %s",
                getattr(pytesseract, "tesseract_cmd", None),
                exc,
            )
            self.statusBar().showMessage(
                "Tesseract OCR no estÃ¡ instalado o no se encuentra en el PATH.",
                7000,
            )
            return

        logger.info("Bloques de texto detectados por OCR: %s", len(blocks))
        if not blocks:
            self.statusBar().showMessage("No se ha detectado texto en la regiÃ³n seleccionada", 4000)
            return

        # Agrupar palabras en lÃ­neas para que el overlay sea mÃ¡s legible.
        line_blocks: list[TextBlock] = self._group_blocks_by_line(blocks)
        logger.info("LÃ­neas agrupadas para overlay: %s", len(line_blocks))

        texts = [b.text for b in line_blocks]
        try:
            translated = self._translation_client.translate_texts(texts, source_lang, target_lang)
        except TranslationError as exc:
            logger.error("Error en la traducciÃ³n: %s", exc)
            self.statusBar().showMessage("Error de traducciÃ³n", 5000)
            return

        overlay_blocks: list[OverlayBlock] = []
        for block, t_text in zip(line_blocks, translated):
            overlay_blocks.append(
                OverlayBlock(
                    text=t_text,
                    x=block.x,
                    y=block.y,
                    w=block.w,
                    h=block.h,
                )
            )
            try:
                add_entry(block.text, t_text, source_lang, target_lang)
            except Exception:
                # El fallo en el historial no debe romper el flujo principal.
                logger.exception("No se pudo guardar la entrada en el historial")

        # Definimos una regiÃ³n de overlay con altura mÃ­nima razonable,
        # calculada en funciÃ³n del nÃºmero de lÃ­neas para no exagerar en
        # regiones pequeÃ±as y evitar recortes cuando las lÃ­neas estÃ¡n
        # muy juntas.
        overlay_rect = QRect(rect)
        line_count = max(1, len(line_blocks))
        approx_line_height = 22  # px aproximados por lÃ­nea en el overlay
        min_height = min(260, line_count * approx_line_height + 40)
        screen = QGuiApplication.primaryScreen()
        if overlay_rect.height() < min_height:
            overlay_rect.setHeight(min_height)
            if screen is not None:
                screen_geo = screen.geometry()
                # Si nos salimos por abajo de la pantalla, desplazamos hacia arriba.
                if overlay_rect.bottom() > screen_geo.bottom():
                    shift = overlay_rect.bottom() - screen_geo.bottom()
                    overlay_rect.translate(0, -shift)

        # Cerrar overlay anterior si lo hubiera.
        if self._current_overlay is not None:
            self._current_overlay.close()

        self._current_overlay = TranslationOverlay(overlay_rect, overlay_blocks)
        self._current_overlay.show()
        self.statusBar().showMessage(
            "TraducciÃ³n mostrada. Pulsa Esc o haz clic para cerrar.",
            5000,
        )

    @staticmethod
    def _group_blocks_by_line(blocks: list[TextBlock]) -> list[TextBlock]:
        """Agrupa bloques palabra a palabra en lÃ­neas mÃ¡s grandes.

        Se basa en la posiciÃ³n vertical (y + h/2) para decidir quÃ© palabras
        pertenecen a la misma lÃ­nea visual.
        """

        if not blocks:
            return []

        # Si Tesseract ha devuelto metadatos de lÃ­nea, los usamos para agrupar.
        if any(b.line_num is not None for b in blocks):
            from collections import defaultdict

            groups: dict[tuple[int, int, int], list[TextBlock]] = defaultdict(list)
            for b in blocks:
                key = (
                    b.par_num or 0,
                    b.block_num or 0,
                    b.line_num or 0,
                )
                groups[key].append(b)

            merged: list[TextBlock] = []
            for key in sorted(groups.keys()):
                line = sorted(groups[key], key=lambda t: t.x)
                text = " ".join(tok.text for tok in line)
                x = min(tok.x for tok in line)
                y = min(tok.y for tok in line)
                right = max(tok.x + tok.w for tok in line)
                bottom = max(tok.y + tok.h for tok in line)
                w = right - x
                h = bottom - y
                conf = sum(tok.confidence for tok in line) / len(line)
                merged.append(
                    TextBlock(
                        text=text,
                        x=x,
                        y=y,
                        w=w,
                        h=h,
                        confidence=conf,
                    )
                )

            return merged

        # Fallback geomÃ©trico si no hay metadatos de lÃ­nea.
        sorted_blocks = sorted(blocks, key=lambda b: (b.y, b.x))
        max_h = max(b.h for b in sorted_blocks) or 1
        threshold = max_h * 0.7

        lines: list[list[TextBlock]] = []
        current_line: list[TextBlock] = []
        current_center_y: float | None = None

        for b in sorted_blocks:
            center_y = b.y + b.h / 2.0
            if current_line and current_center_y is not None:
                if abs(center_y - current_center_y) <= threshold:
                    current_line.append(b)
                    current_center_y = (
                        (current_center_y * (len(current_line) - 1) + center_y) / len(current_line)
                    )
                else:
                    lines.append(current_line)
                    current_line = [b]
                    current_center_y = center_y
            else:
                current_line = [b]
                current_center_y = center_y

        if current_line:
            lines.append(current_line)

        merged: list[TextBlock] = []
        for line in lines:
            text = " ".join(tok.text for tok in line)
            x = min(tok.x for tok in line)
            y = min(tok.y for tok in line)
            right = max(tok.x + tok.w for tok in line)
            bottom = max(tok.y + tok.h for tok in line)
            w = right - x
            h = bottom - y
            conf = sum(tok.confidence for tok in line) / len(line)
            merged.append(TextBlock(text=text, x=x, y=y, w=w, h=h, confidence=conf))

        return merged


def setup_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] [%(levelname)s] %(name)s: %(message)s",
    )


def main() -> None:
    setup_logging()

    # Asegurar que PySide6 usa el backend adecuado en cada SO.
    os.environ.setdefault("QT_ENABLE_HIGHDPI_SCALING", "1")

    cfg = load_config()

    app = QApplication(sys.argv)

    # Permitir que Ctrl+C en el terminal cierre la app limpiamente.
    logger = logging.getLogger(__name__)

    def _handle_sigint(*_args) -> None:
        logger.info("SIGINT recibido (Ctrl+C). Cerrando la aplicaciÃ³n...")
        app.quit()

    try:
        signal.signal(signal.SIGINT, _handle_sigint)
    except Exception:
        # En algunos entornos puede no estar permitido cambiar el manejador.
        logger.debug("No se pudo registrar el manejador de SIGINT")
    win = ConfigWindow(cfg)
    win.resize(400, 200)
    win.show()
    sys.exit(app.exec())


if __name__ == "__main__":
    main()

