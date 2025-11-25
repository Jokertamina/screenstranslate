"""LÃ³gica bÃ¡sica de licencia y lÃ­mites de uso.

Esta implementaciÃ³n cubre:
- VersiÃ³n Basic con lÃ­mite diario de usos.
- Bandera simple `is_pro` para la versiÃ³n Pro.

MÃ¡s adelante se podrÃ¡ conectar con un backend de licencias real.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from typing import Any, Dict, Optional
import os
import uuid
import platform

import requests


BASIC_DAILY_LIMIT = 5

# Modo desarrollo: desactivado por defecto. Solo se activa
# explÃ­citamente poniendo SCREENSTRANSLATE_DEV_MODE=1 en el entorno.
DEVELOPMENT_MODE = os.getenv("SCREENSTRANSLATE_DEV_MODE", "0") == "1"

# ConfiguraciÃ³n del backend de licencias.
LICENSE_API_URL_ENV = "SCREENSTRANSLATE_LICENSE_API_URL"
LICENSE_API_KEY_ENV = "SCREENSTRANSLATE_LICENSE_API_KEY"


@dataclass
class UsageCheckResult:
    allowed: bool
    updated_config: Dict[str, Any]
    message: Optional[str] = None


@dataclass
class ActivationResult:
    success: bool
    updated_config: Dict[str, Any]
    message: str
    http_status: Optional[int] = None


def is_pro(config: Dict[str, Any]) -> bool:
    """Devuelve True si la app estÃ¡ en modo Pro.

    A dÃ­a de hoy, la **fuente de verdad** es una combinaciÃ³n de la clave de
    licencia y la informaciÃ³n que devuelve el backend (plan y estado). El
    flag is_pro se mantiene solo por compatibilidad y legibilidad, y se
    intenta mantener sincronizado.
    """

    license_key = str(config.get("license_key") or "").strip()
    if not license_key:
        return False

    status = str(config.get("license_status") or "").strip().lower()
    if status and status != "active":
        return False

    plan = str(config.get("plan") or "").strip().lower()
    if plan:
        return plan == "pro"

    # Compatibilidad hacia atrÃ¡s: si hay clave pero no tenemos mÃ¡s
    # informaciÃ³n, asumimos Pro.
    return True


def maybe_refresh_license(config: Dict[str, Any]) -> Dict[str, Any]:
    """Revalida la licencia contra el backend, como mÃ¡ximo una vez al dÃ­a.

    Si no hay backend configurado o no hay licencia, devuelve la
    configuraciÃ³n sin cambios. Si el backend indica que la licencia ya no
    es vÃ¡lida (revocada, caducada, etc.), limpia el estado Pro local para
    evitar que una licencia cancelada siga activa indefinidamente.
    """

    if DEVELOPMENT_MODE:
        return config

    api_url = os.getenv(LICENSE_API_URL_ENV) or ""
    if not api_url:
        return config

    license_key = str(config.get("license_key") or "").strip()
    if not license_key:
        return config

    today = date.today().isoformat()
    last_check = config.get("last_license_check_date")
    if last_check == today:
        return config

    # Trabajamos sobre una copia para no corromper el estado original si
    # hay problemas de red.
    current_cfg = dict(config)
    result = activate_license(current_cfg, license_key)
    new_cfg = dict(current_cfg)
    new_cfg.update(result.updated_config)
    new_cfg["last_license_check_date"] = today

    # Si el backend responde explÃ­citamente con un cÃ³digo que indica que la
    # licencia ya no es vÃ¡lida, limpiamos el estado local.
    if (
        not result.success
        and result.http_status is not None
        and result.http_status in (401, 403, 404)
    ):
        new_cfg.pop("license_key", None)
        new_cfg["is_pro"] = False
        new_cfg.pop("plan", None)
        new_cfg.pop("remote_daily_limit", None)
        new_cfg.pop("remote_max_devices", None)
        new_cfg.pop("license_expires_at", None)
        new_cfg["license_status"] = "revoked"

    return new_cfg


def check_and_register_use(config: Dict[str, Any]) -> UsageCheckResult:
    """Comprueba si se puede realizar una nueva traducciÃ³n y actualiza el uso.

    - Si es Pro: uso ilimitado.
    - Si es Basic: se aplica lÃ­mite diario BASIC_DAILY_LIMIT.
    """

    if DEVELOPMENT_MODE:
        # En desarrollo no aplicamos lÃ­mites para facilitar las pruebas.
        return UsageCheckResult(True, config)

    # Antes de aplicar lÃ­mites, intentamos sincronizar el estado de la
    # licencia con el backend (como mÃ¡ximo una vez al dÃ­a).
    config = maybe_refresh_license(config)

    if is_pro(config):
        return UsageCheckResult(True, config)

    today = date.today().isoformat()
    last_date = config.get("basic_last_use_date")
    uses = int(config.get("basic_uses_today", 0))

    if last_date != today:
        last_date = today
        uses = 0

    if uses >= BASIC_DAILY_LIMIT:
        msg = (
            "Has alcanzado el lÃ­mite diario de traducciones en la versiÃ³n Basic. "
            "Actualiza a Pro para uso ilimitado."
        )
        config["basic_last_use_date"] = last_date
        config["basic_uses_today"] = uses
        return UsageCheckResult(False, config, msg)

    uses += 1
    config["basic_last_use_date"] = last_date
    config["basic_uses_today"] = uses
    return UsageCheckResult(True, config)


def _looks_like_license_key(key: str) -> bool:
    """HeurÃ­stica simple para validar el formato de una licencia.

    Esta funciÃ³n NO es de seguridad; solo evita errores de escritura
    evidentes. La validaciÃ³n real deberÃ¡ hacerse en el backend cuando
    exista.
    """

    if len(key) < 10:
        return False
    # A modo de ejemplo, aceptamos claves con guiones o prefijo STP-
    if "-" in key:
        return True
    return key.isalnum()


def activate_license_offline(config: Dict[str, Any], key: str) -> ActivationResult:
    """Activa una licencia de forma simulada/offline.

    En el futuro, esta funciÃ³n deberÃ¡ llamar a un backend remoto para
    validar la clave de licencia. Por ahora solo comprueba el formato y
    marca la app como Pro en la configuraciÃ³n local.
    """

    key = (key or "").strip()
    if not key:
        return ActivationResult(False, config, "Introduce una clave de licencia.")

    if not _looks_like_license_key(key):
        return ActivationResult(False, config, "La clave de licencia no tiene un formato vÃ¡lido.")

    new_cfg = dict(config)
    new_cfg["license_key"] = key
    new_cfg["is_pro"] = True

    return ActivationResult(True, new_cfg, "Licencia Pro activada en este equipo.")


def _ensure_device_id(config: Dict[str, Any]) -> str:
    """Obtiene o genera un identificador de dispositivo persistente.

    Se almacena en la propia configuraciÃ³n para poder reenviarlo al
    backend de licencias en futuras activaciones o comprobaciones.
    """

    device_id = str(config.get("device_id") or "").strip()
    if not device_id:
        device_id = str(uuid.uuid4())
        config["device_id"] = device_id
    return device_id


def _get_device_label() -> str:
    """Construye un nombre legible de dispositivo.

    Usa el nombre del equipo que ya tiene el sistema operativo y aÃ±ade el
    sistema (Windows, etc.). El resultado se recorta a 80 caracteres para
    evitar textos excesivamente largos en la base de datos.
    """

    name = os.environ.get("COMPUTERNAME") or platform.node() or "PC"
    system = platform.system() or "Windows"
    label = f"{name} ({system})"
    return label[:80]


def activate_license(config: Dict[str, Any], key: str) -> ActivationResult:
    """Activa una licencia usando el backend remoto si estÃ¡ configurado.

    Si no hay URL de backend configurada, cae en el modo offline
    (simulado) actual.
    """

    key = (key or "").strip()
    if not key:
        return ActivationResult(False, config, "Introduce una clave de licencia.")

    api_url = os.getenv(LICENSE_API_URL_ENV) or ""
    if not api_url:
        # Sin backend configurado: mantenemos el comportamiento actual.
        return activate_license_offline(config, key)

    # Trabajamos sobre una copia del config; el llamante decidirÃ¡ si lo guarda.
    new_cfg = dict(config)
    device_id = _ensure_device_id(new_cfg)
    device_label = _get_device_label()

    payload = {
        "license_key": key,
        "device_id": device_id,
        "app_version": os.getenv("SCREENSTRANSLATE_APP_VERSION", "dev"),
        "device_label": device_label,
    }

    headers = {"Content-Type": "application/json"}
    api_key = os.getenv(LICENSE_API_KEY_ENV) or ""
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"

    try:
        resp = requests.post(api_url, json=payload, headers=headers, timeout=10)
    except Exception as exc:  # noqa: BLE001
        return ActivationResult(
            False,
            config,
            f"No se pudo contactar con el servidor de licencias: {exc}",
        )

    try:
        data = resp.json()
    except Exception:  # noqa: BLE001
        # Si no podemos interpretar la respuesta como JSON, devolvemos un
        # mensaje genÃ©rico evitando mostrar contenido bruto poco legible.
        if resp.status_code >= 400:
            return ActivationResult(
                False,
                config,
                "Error remoto al activar la licencia. IntÃ©ntalo de nuevo mÃ¡s tarde.",
                http_status=resp.status_code,
            )
        return ActivationResult(False, config, "Respuesta de licencia no vÃ¡lida.")

    if not resp.ok or not data.get("success"):
        msg = str(data.get("message") or "Licencia no vÃ¡lida o no activa.")
        return ActivationResult(False, config, msg, http_status=resp.status_code)

    plan = str(data.get("plan") or "pro").lower()

    new_cfg["license_key"] = key
    new_cfg["is_pro"] = plan == "pro"
    new_cfg["plan"] = plan

    if "daily_limit" in data:
        new_cfg["remote_daily_limit"] = data.get("daily_limit")
    if "max_devices" in data:
        new_cfg["remote_max_devices"] = data.get("max_devices")
    if "expires_at" in data:
        new_cfg["license_expires_at"] = data.get("expires_at")
    if "status" in data:
        new_cfg["license_status"] = data.get("status")

    msg = str(data.get("message") or "Licencia Pro activada en este equipo.")
    return ActivationResult(True, new_cfg, msg, http_status=resp.status_code)

