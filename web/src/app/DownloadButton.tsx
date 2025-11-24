"use client";

import { useEffect, useState } from "react";
import { useLayoutTexts } from "./i18nLayout";

type OS = "windows" | "mac" | "linux" | "other";

const WINDOWS_DOWNLOAD_URL = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || "";

type DownloadButtonProps = {
  variant?: "hero" | "nav";
};

export function DownloadButton({ variant = "hero" }: DownloadButtonProps) {
  const { locale } = useLayoutTexts();
  const [os, setOs] = useState<OS>("other");

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const ua = navigator.userAgent || "";
    const platform = (navigator as any).platform || "";
    const value = `${ua} ${platform}`;

    if (/Windows/i.test(value)) {
      setOs("windows");
    } else if (/Mac OS X|Macintosh/i.test(value)) {
      setOs("mac");
    } else if (/Linux/i.test(value)) {
      setOs("linux");
    } else {
      setOs("other");
    }
  }, []);

  const hasUrl = Boolean(WINDOWS_DOWNLOAD_URL);

  function getLabels() {
    if (locale === "en") {
      if (!hasUrl) {
        return {
          hero: "Coming soon for Windows",
          nav: "Coming soon",
        } as const;
      }
      if (os === "windows") {
        return {
          hero: "Download ScreensTranslate Pro for Windows",
          nav: "Download for Windows",
        } as const;
      }
      return {
        hero:
          "Download ScreensTranslate Pro for Windows (requires a Windows PC)",
        nav: "Windows only",
      } as const;
    }

    if (locale === "fr") {
      if (!hasUrl) {
        return {
          hero: "Bientôt disponible pour Windows",
          nav: "Bientôt disponible",
        } as const;
      }
      if (os === "windows") {
        return {
          hero: "Télécharger ScreensTranslate Pro pour Windows",
          nav: "Télécharger pour Windows",
        } as const;
      }
      return {
        hero:
          "Télécharger ScreensTranslate Pro pour Windows (nécessite un PC Windows)",
        nav: "Uniquement Windows",
      } as const;
    }

    // Español por defecto
    if (!hasUrl) {
      return {
        hero: "Próximamente para Windows",
        nav: "Próximamente",
      } as const;
    }
    if (os === "windows") {
      return {
        hero: "Descargar ScreensTranslate Pro para Windows",
        nav: "Descargar para Windows",
      } as const;
    }
    return {
      hero:
        "Descargar ScreensTranslate Pro para Windows (requiere PC con Windows)",
      nav: "Solo para Windows",
    } as const;
  }

  const labels = getLabels();
  const label = variant === "nav" ? labels.nav : labels.hero;

  const heroClasses =
    "inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300";
  const navClasses =
    "hidden rounded-full border border-cyan-400/60 px-4 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-500/10 md:inline-flex";

  const className = variant === "nav" ? navClasses : heroClasses;

  if (!hasUrl) {
    return (
      <button className={className} type="button" disabled>
        {label}
      </button>
    );
  }

  return (
    <a href={WINDOWS_DOWNLOAD_URL} className={className}>
      {label}
    </a>
  );
}
