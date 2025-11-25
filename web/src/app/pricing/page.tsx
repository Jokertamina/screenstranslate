import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../Brand";

const plans = [
  {
    name: "Basic",
    price: "Gratis",
    description: (
      <>
        Ideal para empezar a utilizar <Brand withPro /> en tu trabajo, estudios
        o proyectos personales con un uso moderado.
      </>
    ),
    highlight: false,
    features: [
      "Traducciones limitadas al día",
      "Hotkey global configurable",
      "Sin registro obligatorio",
    ],
  },
  {
    name: "Pro",
    price: "2,50 €/mes",
    note: "Suscripción mensual, cancela cuando quieras",
    description: (
      <>
        Pensado para profesionales y usuarios intensivos que dependen a diario
        de contenido en otros idiomas y necesitan que <Brand withPro /> forme
        parte de su flujo de trabajo.
      </>
    ),
    highlight: true,
    features: [
      "Uso ilimitado dentro de la política justa",
      "Mejor prioridad de traducción",
      "Historial ampliado de traducciones",
      "Soporte preferente por email",
    ],
  },
];

export const metadata: Metadata = {
  title: "Planes de ScreensTranslate Pro",
  description:
    "Consulta los planes de ScreensTranslate Pro: plan Basic gratuito para empezar y licencia Pro para uso intensivo con más capacidad y soporte.",
  alternates: {
    canonical: "/pricing",
    languages: {
      "es-ES": "/pricing",
      "en-US": "/en/pricing",
      "fr-FR": "/fr/pricing",
    },
  },
  openGraph: {
    title: "Planes de ScreensTranslate Pro",
    description:
      "Compara el plan Basic gratuito y la suscripción Pro de ScreensTranslate Pro para Windows.",
    url: "https://screenstranslate.com/pricing",
    siteName: "ScreensTranslate Pro",
    type: "website",
    locale: "es_ES",
  },
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-16 space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Planes
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Elige el plan que encaje contigo
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Puedes empezar con el plan Basic sin coste y pasar a Pro cuando veas
          que <Brand withPro /> forma parte de tu día a día.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-2xl border p-5 text-sm ${
              plan.highlight
                ? "border-cyan-400/60 bg-slate-900/80 shadow-lg shadow-cyan-500/30"
                : "border-slate-800 bg-slate-900/60"
            }`}
          >
            <h2 className="mb-1 text-[14px] font-semibold text-slate-100">
              {plan.name}
            </h2>
            <p className="mb-3 text-2xl font-semibold text-slate-50">
              {plan.price}
            </p>
            {plan.note && (
              <p className="mb-2 text-[11px] text-slate-400">{plan.note}</p>
            )}
            <p className="mb-4 text-[13px] leading-relaxed text-slate-300">
              {plan.description}
            </p>
            <ul className="space-y-1 text-[13px] leading-relaxed text-slate-200">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            {plan.name === "Pro" && (
              <div className="pt-4">
                <a
                  href="https://buy.stripe.com/test_4gM14mfII9c21fJ6K02ZO00"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300"
                >
                  Suscribirse a ScreensTranslate Pro por 2,50 €/mes
                </a>
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="space-y-3 border-t border-slate-800 pt-8 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          Empieza hoy y decide más adelante
        </h2>
        <p>
          Descarga <Brand withPro />, utiliza el plan Basic sin coste para
          validar que encaja en tu día a día y pasa a la suscripción Pro
          cuando necesites más capacidad y soporte.
        </p>
        <div className="space-y-2 text-xs text-slate-400">
          <p className="font-medium text-slate-300">
            Aprende más sobre cómo usar ScreensTranslate Pro:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/guias/como-traducir-texto-en-pantalla-windows-11">
                Cómo traducir texto en pantalla en Windows 11
              </Link>
            </li>
            <li>
              <Link href="/guias/como-traducir-captura-de-pantalla-a-texto">
                Cómo traducir una captura de pantalla a texto
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
