import type { Metadata } from "next";
import { Brand } from "../Brand";

const steps = [
  {
    title: "1. Pulsa el atajo global",
    text: (
      <>
        Lanza <Brand withPro /> desde cualquier aplicación con un atajo
        configurable (por defecto Ctrl+Shift+T).
      </>
    ),
  },
  {
    title: "2. Selecciona un área de la pantalla",
    text: "Dibuja un rectángulo sobre el texto que quieres entender. Solo se captura esa región, no toda tu pantalla.",
  },
  {
    title: "3. Lee la traducción en un overlay limpio",
    text: "El texto traducido aparece como un panel tipo subtítulos encima de la zona seleccionada, sin tapar lo importante.",
  },
];

export const metadata: Metadata = {
  title: "Cómo funciona ScreensTranslate Pro",
  description:
    "Guía rápida para aprender cómo usar ScreensTranslate Pro en tres pasos: atajo global, selección de área y traducción en overlay sobre tu pantalla.",
  alternates: {
    canonical: "/como-funciona",
    languages: {
      "es-ES": "/como-funciona",
      "en-US": "/en/como-funciona",
      "fr-FR": "/fr/como-funciona",
    },
  },
};

export default function ComoFuncionaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-6 lg:py-16">
      <main className="space-y-10">
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
            Guía rápida
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
            Cómo funciona <Brand withPro />
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
            El objetivo es que entiendas cualquier texto en pantalla sin romper
            tu flujo. Tres pasos, menos de cinco segundos, y sin cambiar de
            ventana.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.title}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm"
            >
              <h2 className="mb-2 text-[14px] font-semibold text-slate-100">
                {step.title}
              </h2>
              <p className="text-[13px] leading-relaxed text-slate-300">
                {step.text}
              </p>
            </article>
          ))}
        </section>

        <section className="space-y-3 border-t border-slate-800 pt-8 text-sm text-slate-200">
          <h2 className="text-[15px] font-semibold text-slate-100">
            Consejos para una mejor experiencia
          </h2>
          <ul className="space-y-2 text-[13px] leading-relaxed">
            <li>
              • Usa un monitor con buen contraste y evita seleccionar fondos muy
              ruidosos para mejorar el OCR.
            </li>
            <li>
              • Ajusta el tamaño de letra del overlay desde la app de escritorio
              para que tus ojos no se cansen.
            </li>
            <li>
              • Prueba distintos atajos hasta encontrar el que no choque con tus
              juegos o programas habituales.
            </li>
          </ul>
        </section>

        <section className="mt-4 space-y-3 border-t border-slate-800 pt-6 text-[13px] leading-relaxed text-slate-300">
          <h2 className="text-sm font-semibold text-slate-100">
            Empieza a usarlo en tu día a día
          </h2>
          <p>
            Configura tu atajo favorito y utiliza <Brand withPro /> siempre que
            aparezca en pantalla un texto que no entiendas: correos, informes,
            documentación técnica, cursos online o incluso interfaces de
            aplicaciones en otros idiomas.
          </p>
          <div className="pt-1">
            <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
              Descargar ScreensTranslate Pro para Windows
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
