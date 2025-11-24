"use client";

import { useEffect, useRef, useState } from "react";

const demoTexts = {
  es: {
    shortcutLabel: "Ctrl + Shift + T",
    heading: "Vista previa del overlay",
    helperLine:
      "ScreensTranslate Pro captura una zona de tu pantalla y muestra la traducción como si fueran subtítulos.",
    sourceText:
      "With ScreensTranslate Pro I can finally read reports, articles and even games in other languages without losing the pace.",
    translatedText:
      "Con ScreensTranslate Pro por fin puedo leer informes, artículos y también juegos en otros idiomas sin perder el ritmo.",
  },
  en: {
    shortcutLabel: "Ctrl + Shift + T",
    heading: "Overlay preview",
    helperLine:
      "ScreensTranslate Pro captures an area of your screen and shows the translation like subtitles.",
    sourceText:
      "Con ScreensTranslate Pro por fin puedo leer informes, artículos y también juegos en otros idiomas sin perder el ritmo.",
    translatedText:
      "With ScreensTranslate Pro I can finally read reports, articles and even games in other languages without breaking my flow.",
  },
  fr: {
    shortcutLabel: "Ctrl + Maj + T",
    heading: "Prévisualisation de l'overlay",
    helperLine:
      "ScreensTranslate Pro capture une zone de votre écran et affiche la traduction comme des sous-titres.",
    sourceText:
      "With ScreensTranslate Pro I can finally read reports, articles and even games in other languages without breaking my flow.",
    translatedText:
      "Avec ScreensTranslate Pro je peux enfin lire des rapports, des articles et même des jeux dans d'autres langues sans casser mon rythme.",
  },
} as const;

export type OverlayPreviewLocale = keyof typeof demoTexts;

interface OverlayPreviewProps {
  locale: OverlayPreviewLocale;
}

type Phase = "idle" | "select" | "translate";

export function OverlayPreview({ locale }: OverlayPreviewProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const runCycleRef = useRef<(() => void) | null>(null);

  // Animación automática periódica para simular el flujo: seleccionar área → mostrar traducción.
  useEffect(() => {
    let selectTimeout: ReturnType<typeof setTimeout> | null = null;
    let translateTimeout: ReturnType<typeof setTimeout> | null = null;

    const runCycle = () => {
      if (selectTimeout) clearTimeout(selectTimeout);
      if (translateTimeout) clearTimeout(translateTimeout);

      setPhase("select");
      selectTimeout = setTimeout(() => {
        setPhase("translate");
        translateTimeout = setTimeout(() => {
          setPhase("idle");
        }, 2200);
      }, 650);
    };

    runCycleRef.current = runCycle;

    // Lanzar una vez al montar y luego en bucle.
    runCycle();
    const intervalId = setInterval(runCycle, 7500);

    return () => {
      clearInterval(intervalId);
      if (selectTimeout) clearTimeout(selectTimeout);
      if (translateTimeout) clearTimeout(translateTimeout);
    };
  }, []);

  const copy = demoTexts[locale];

  return (
    <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-cyan-500/20">
      <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
        <span>{copy.heading}</span>
        <span>{copy.shortcutLabel}</span>
      </div>
      <div
        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-300 md:h-40"
      >
        <p className="mb-2 text-[11px] text-slate-400">
          {copy.helperLine}
        </p>

        {/* Texto "original" en otro idioma */}
        <div className="relative mt-1 text-[11px] leading-relaxed text-slate-300">
          <div className="relative z-10">{copy.sourceText}</div>

          {/* Rectángulo de selección simulado */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-[-2px] right-[3px] origin-left rounded-md border border-cyan-400/80 bg-cyan-400/10 backdrop-blur-sm transition-all duration-500 ${
              phase === "idle" ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
            }`}
          />
        </div>

        {/* Burbuja de traducción tipo overlay
            - En móvil se muestra debajo del texto (layout normal)
            - En md+ se posiciona como overlay pegado al borde inferior */}
        <div
          className={`pointer-events-none mt-1.5 rounded-xl bg-slate-900/95 p-3 text-[12px] leading-relaxed text-slate-50 shadow-lg shadow-cyan-500/30 transition-all duration-300 md:absolute md:inset-x-3 md:bottom-3 md:mt-0 ${
            phase === "translate"
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0 md:translate-y-3"
          }`}
        >
          {copy.translatedText}
        </div>
      </div>
    </div>
  );
}
