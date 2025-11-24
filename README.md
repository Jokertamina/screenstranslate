# ScreensTranslate Pro

Herramienta de captura y traducciÃ³n de texto en pantalla para escritorio (Windows y macOS), basada en Python y Qt.

## Stack tÃ©cnico

- Python 3.11+
- Qt for Python (`PySide6`) para la interfaz de usuario
- `mss` para captura de pantalla
- `pytesseract` + Tesseract OCR instalado en el sistema
- `pynput` para hotkeys globales
- `requests` para llamadas HTTP a motores de traducciÃ³n externos

La arquitectura se ha diseÃ±ado para:

- Ser **multiplataforma** (Windows / macOS).
- Minimizar riesgos de falsos positivos en antivirus:
  - CÃ³digo claro y modular, sin tÃ©cnicas de ofuscaciÃ³n ni empaquetadores "raros".
  - Dependencias comunes y ampliamente usadas.
  - Posibilidad futura de firma de binarios.

## Puesta en marcha (desarrollo)

1. Instala Python 3.11+
2. En la carpeta del proyecto (`screen_Translate`), instala dependencias:

   ```bash
   pip install -r requirements.txt
   ```

3. Instala Tesseract OCR en el sistema (Windows / macOS) y asegÃºrate de que el ejecutable estÃ¡ en el PATH.
4. (Opcional) Configura una API de traducciÃ³n (por ejemplo DeepL) y exporta la variable de entorno `TRANSLATION_API_KEY` y la URL del endpoint si aplica.
5. Ejecuta la app de desarrollo (una vez implementado el flujo principal):

   ```bash
   python -m screenstranslate.main
   ```

MÃ¡s adelante se aÃ±adirÃ¡n instrucciones especÃ­ficas de empaquetado para cada sistema operativo (MSI/EXE firmado en Windows, `.app`/.dmg en macOS).

