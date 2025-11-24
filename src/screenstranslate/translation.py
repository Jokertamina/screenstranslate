from __future__ import annotations

import os
from dataclasses import dataclass
from typing import List, Optional

import logging
import requests


class TranslationError(Exception):
    pass


@dataclass
class TranslationConfig:
    provider: str  # "demo", "deepl", "generic"
    api_key: Optional[str]
    base_url: Optional[str]


def _load_config_from_env() -> TranslationConfig:
    """Carga configuraciÃ³n de traducciÃ³n desde variables de entorno.

    Prioridad:
    1) DeepL (DEEPL_AUTH_KEY, DEEPL_API_URL/DEEPL_API_FREE)
    2) Backend genÃ©rico (TRANSLATION_API_KEY, TRANSLATION_API_URL)
    3) Modo demo (sin traducciÃ³n real)
    """

    logger = logging.getLogger(__name__)

    deepl_key = os.getenv("DEEPL_AUTH_KEY")
    if deepl_key:
        deepl_url = os.getenv("DEEPL_API_URL")
        if not deepl_url:
            use_free = os.getenv("DEEPL_API_FREE", "1") == "1"
            deepl_url = "https://api-free.deepl.com/v2/translate" if use_free else "https://api.deepl.com/v2/translate"
        logger.info("Proveedor de traducciÃ³n seleccionado: DeepL (%s)", deepl_url)
        return TranslationConfig(provider="deepl", api_key=deepl_key, base_url=deepl_url)

    api_key = os.getenv("TRANSLATION_API_KEY")
    base_url = os.getenv("TRANSLATION_API_URL")
    if api_key and base_url:
        logger.info("Proveedor de traducciÃ³n genÃ©rico configurado: %s", base_url)
        return TranslationConfig(provider="generic", api_key=api_key, base_url=base_url)

    logger.info("Proveedor de traducciÃ³n en modo DEMO (sin backend configurado)")
    return TranslationConfig(provider="demo", api_key=None, base_url=None)


def _deepl_lang(code: str) -> str:
    mapping = {
        "auto": "auto",
        "en": "EN",
        "es": "ES",
        "fr": "FR",
        "de": "DE",
        "it": "IT",
        "pt": "PT",
        "ja": "JA",
        "ko": "KO",
        "zh": "ZH",
    }
    code = (code or "").lower()
    return mapping.get(code, code.upper() or "EN")


class TranslationClient:
    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None) -> None:
        cfg = _load_config_from_env()
        # Permitir override manual, Ãºtil para tests.
        if api_key or base_url:
            self.config = TranslationConfig(
                provider="generic" if (api_key and base_url) else cfg.provider,
                api_key=api_key or cfg.api_key,
                base_url=base_url or cfg.base_url,
            )
        else:
            self.config = cfg

        logging.getLogger(__name__).info(
            "TranslationClient inicializado: provider=%s, url=%s",
            self.config.provider,
            self.config.base_url,
        )

    def translate_texts(self, texts: List[str], source_lang: str, target_lang: str) -> List[str]:
        if not texts:
            return []

        provider = self.config.provider
        if provider == "demo" or not self.config.api_key or not self.config.base_url:
            # Modo demo: Ãºtil mientras no se configure un backend real.
            logging.getLogger(__name__).info("Usando modo DEMO de traducciÃ³n (%s -> %s)", source_lang, target_lang)
            suffix = f" [{target_lang}]"
            return [t + suffix if t.strip() else t for t in texts]

        if provider == "deepl":
            return self._translate_deepl(texts, source_lang, target_lang)

        if provider == "generic":
            return self._translate_generic(texts, source_lang, target_lang)

        # Fallback de seguridad.
        suffix = f" [{target_lang}]"
        return [t + suffix if t.strip() else t for t in texts]

    # ---------------------------------------------------------
    # Proveedor DeepL
    # ---------------------------------------------------------
    def _translate_deepl(self, texts: List[str], source_lang: str, target_lang: str) -> List[str]:
        assert self.config.api_key and self.config.base_url

        target = _deepl_lang(target_lang)
        source = _deepl_lang(source_lang)
        data: List[tuple[str, str]] = [("auth_key", self.config.api_key)]
        for t in texts:
            data.append(("text", t))

        data.append(("target_lang", target))
        if source.lower() != "auto":
            data.append(("source_lang", source))

        try:
            resp = requests.post(self.config.base_url, data=data, timeout=15)
        except requests.RequestException as exc:
            raise TranslationError(str(exc)) from exc

        if resp.status_code >= 400:
            raise TranslationError(f"HTTP {resp.status_code}: {resp.text[:200]}")

        payload = resp.json()
        translations = payload.get("translations")
        if not isinstance(translations, list):
            raise TranslationError("Respuesta inesperada del motor DeepL")

        result = [str(item.get("text", "")) for item in translations]
        if len(result) != len(texts):
            raise TranslationError("NÃºmero de traducciones distinto al de textos de entrada (DeepL)")
        return result

    # ---------------------------------------------------------
    # Proveedor genÃ©rico HTTP (backend propio)
    # ---------------------------------------------------------
    def _translate_generic(self, texts: List[str], source_lang: str, target_lang: str) -> List[str]:
        assert self.config.api_key and self.config.base_url

        payload = {
            "texts": texts,
            "source": source_lang or "auto",
            "target": target_lang,
        }
        headers = {
            "Authorization": f"Bearer {self.config.api_key}",
            "Content-Type": "application/json",
        }

        try:
            resp = requests.post(self.config.base_url, json=payload, headers=headers, timeout=10)
        except requests.RequestException as exc:
            raise TranslationError(str(exc)) from exc

        if resp.status_code >= 400:
            raise TranslationError(f"HTTP {resp.status_code}: {resp.text[:200]}")

        data = resp.json()
        translations = data.get("translations")
        if not isinstance(translations, list):
            raise TranslationError("Respuesta inesperada del motor de traducciÃ³n")

        if len(translations) != len(texts):
            raise TranslationError("NÃºmero de traducciones distinto al de textos de entrada")

        return [str(t) for t in translations]

