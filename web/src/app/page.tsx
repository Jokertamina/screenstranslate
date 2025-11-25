import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "./Brand";
import { SeoSoftwareJsonLd } from "./SeoSoftwareJsonLd";
import { DownloadButton } from "./DownloadButton";
import { OverlayPreview } from "./OverlayPreview";

export const metadata: Metadata = {
  title: "ScreensTranslate Pro – Traductor de texto en pantalla para Windows",
  description:
    "ScreensTranslate Pro es un traductor de texto en pantalla para Windows 10 y 11 que usa OCR para reconocer texto en tu monitor (juegos, vídeos, PDFs, webs) y traducirlo al instante en un overlay tipo subtítulos.",
  keywords: [
    "traducir texto en pantalla",
    "traductor de pantalla para Windows",
    "traducir texto de capturas de pantalla",
    "traductor OCR Windows",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
      "fr-FR": "/fr",
    },
  },
  openGraph: {
    title:
      "ScreensTranslate Pro – Traductor de texto en pantalla para Windows",
    description:
      "Traduce texto en pantalla y capturas a texto en Windows en segundos con ScreensTranslate Pro.",
    url: "https://screenstranslate.com/",
    siteName: "ScreensTranslate Pro",
    type: "website",
    locale: "es_ES",
  },
};

const highlightFeatures = [
  {
    title: "Traducción con un atajo",
    description:
      "Pulsa Ctrl+Shift+T, selecciona un área y lee la traducción como si fueran subtítulos.",
  },
  {
    title: "Funciona con tus apps favoritas",
    description:
      "Juegos, vídeos, PDFs, navegadores o herramientas de trabajo: todo lo que ves en pantalla.",
  },
  {
    title: "Basic gratis · Pro ilimitado",
    description:
      "Empieza gratis y da el salto a Pro cuando lo uses a diario con una simple clave de licencia.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-20 space-y-16">
      {/* HERO */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-500/40">
            Traducción instantánea en pantalla
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Entiende cualquier texto en tu pantalla en segundos.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-200">
            <Brand withPro /> te permite leer juegos, vídeos, documentos o webs
            en tu idioma sin salir de la aplicación ni copiar y pegar texto.
          </p>
          <div className="flex flex-col gap-3 text-sm sm:flex-row">
            <DownloadButton />
            <Link
              href="/como-funciona"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2 font-medium text-slate-100 hover:bg-slate-800/70"
            >
              Ver cómo funciona
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span>✔ Sin registros obligatorios en el plan Basic</span>
            <span>✔ Atajo global configurable</span>
            <span>✔ Integración con proveedores de traducción profesionales</span>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/40 via-sky-400/10 to-transparent blur-3xl" />
          <OverlayPreview locale="es" />
        </div>
      </section>

      {/* RESUMEN DE BENEFICIOS */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold tracking-tight">
          Pensado para que traduzcas sin dejar de hacer lo que te gusta
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {highlightFeatures.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm"
            >
              <h3 className="mb-2 text-[13px] font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* GUIAS Y RECURSOS */}
      <section className="space-y-4 border-t border-slate-800 pt-8">
        <h2 className="text-sm font-semibold tracking-tight text-slate-100">
          Guías y recursos
        </h2>
        <p className="max-w-xl text-xs leading-relaxed text-slate-400">
          Aprende a sacarle más partido a <Brand withPro /> con estas guías
          prácticas sobre traducción de texto en pantalla y capturas.
        </p>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <Link
            href="/guias/como-traducir-texto-en-pantalla-windows-11"
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-cyan-400/60 hover:bg-slate-900"
          >
            <h3 className="mb-1 text-[13px] font-semibold text-slate-100">
              Cómo traducir texto en pantalla en Windows 11
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Configura el flujo completo de captura, OCR y traducción sin salir
              de tus aplicaciones.
            </p>
          </Link>
          <Link
            href="/guias/como-traducir-captura-de-pantalla-a-texto"
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-cyan-400/60 hover:bg-slate-900"
          >
            <h3 className="mb-1 text-[13px] font-semibold text-slate-100">
              Cómo traducir una captura de pantalla a texto
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Usa OCR en tu propio equipo y evita subir imágenes a servicios
              externos.
            </p>
          </Link>
        </div>
        <div className="mt-4 text-xs text-slate-400">
          <span>
            ¿Quieres comparar el plan Basic y Pro?{" "}
            <Link
              href="/pricing"
              className="text-cyan-300 hover:text-cyan-200"
            >
              Ver planes de ScreensTranslate Pro
            </Link>
            .
          </span>
        </div>
      </section>

      <SeoSoftwareJsonLd />
    </div>
  );
}
