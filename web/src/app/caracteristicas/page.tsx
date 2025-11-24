import type { Metadata } from "next";
import { Brand } from "../Brand";

const features = [
  {
    title: "Overlay tipo subtítulo",
    text: "Traducciones en un panel discreto y legible, ideal para juegos, vídeos y tutoriales.",
  },
  {
    title: "Compatible con cualquier app",
    text: "Funciona sobre navegadores, clientes de streaming, PDFs, herramientas de trading y más.",
  },
  {
    title: "OCR avanzado",
    text: "Usa Tesseract para reconocer texto incluso en fuentes pequeñas o fondos complejos.",
  },
  {
    title: "Traducción profesional",
    text: "Pensado para integrarse con proveedores de traducción de alta calidad como DeepL.",
  },
  {
    title: "Historial local",
    text: "Consulta, copia o exporta traducciones recientes sin depender de la nube.",
  },
  {
    title: "Hotkey global configurable",
    text: "Elige la combinación de teclas que mejor encaja con tu forma de trabajar o jugar.",
  },
];

export const metadata: Metadata = {
  title: "Características de ScreensTranslate Pro",
  description:
    "Descubre las principales características de ScreensTranslate Pro: overlay de traducción, OCR en pantalla, hotkey global, historial local y más.",
  alternates: {
    canonical: "/caracteristicas",
    languages: {
      "es-ES": "/caracteristicas",
      "en-US": "/en/caracteristicas",
      "fr-FR": "/fr/caracteristicas",
    },
  },
};

export default function CaracteristicasPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-16">
      <main className="space-y-10">
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
            Características
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
            Todo lo que necesitas para entender la pantalla
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
            <Brand withPro /> combina captura de pantalla, reconocimiento de
            texto y traducción en un flujo único, diseñado para no estorbarte.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm"
            >
              <h2 className="mb-2 text-[14px] font-semibold text-slate-100">
                {f.title}
              </h2>
              <p className="text-[13px] leading-relaxed text-slate-300">{f.text}</p>
            </article>
          ))}
        </section>

        <section className="space-y-3 border-t border-slate-800 pt-8 text-[13px] leading-relaxed text-slate-300">
          <h2 className="text-sm font-semibold text-slate-100">
            Diseñado para flujos de trabajo reales
          </h2>
          <p>
            Combina estas características para traducir al momento la información
            que necesitas en tu trabajo, estudios o formación continua sin
            interrumpir lo que estás haciendo.
          </p>
          <div className="pt-1">
            <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
              Empezar a usar ScreensTranslate Pro
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
