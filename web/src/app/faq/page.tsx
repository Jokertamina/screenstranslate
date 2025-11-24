import type { Metadata } from "next";
import { Brand } from "../Brand";

const faqs = [
  {
    question: "¿Necesito crear una cuenta para usar ScreensTranslate Pro?",
    answer: (
      <>
        No. El plan Basic está pensado para usarse sin registro obligatorio.
        Para el plan Pro solo necesitarás una clave de licencia para activar
        <Brand withPro />.
      </>
    ),
  },
  {
    question: "¿Qué diferencia hay entre Basic y Pro?",
    answer:
      "Basic tiene un número limitado de traducciones al día y está pensado para uso ocasional. Pro está pensado para uso diario, con más margen de uso y funciones avanzadas.",
  },
  {
    question: "¿ScreensTranslate Pro envía mis capturas a algún servidor?",
    answer: (
      <>
        La captura se procesa en tu equipo para extraer el texto. Solo el texto
        reconocido puede enviarse al proveedor de traducción configurado (por
        ejemplo, DeepL) cuando utilizas <Brand withPro />.
      </>
    ),
  },
  {
    question: "¿Puedo cambiar el atajo de teclado?",
    answer:
      "Sí. Desde la ventana de configuración puedes elegir la combinación de teclas que mejor encaje con tus programas y juegos.",
  },
  {
    question: "¿Funcionará con mis aplicaciones y sitios web habituales?",
    answer:
      "ScreensTranslate Pro está diseñado para funcionar sobre cualquier ventana que se vea en pantalla: aplicaciones de productividad, navegadores, reproductores de vídeo, juegos, PDFs y más.",
  },
  {
    question: "¿Qué pasa si reinstalo Windows o cambio de ordenador?",
    answer:
      "Tu licencia Pro está asociada a un dispositivo. Si cambias de equipo, podrás gestionar activaciones desde el futuro panel web o solicitando soporte.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Necesito crear una cuenta para usar ScreensTranslate Pro?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. El plan Basic está pensado para usarse sin registro obligatorio. Para el plan Pro solo necesitarás una clave de licencia para activar ScreensTranslate Pro.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué diferencia hay entre Basic y Pro?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Basic tiene un número limitado de traducciones al día y está pensado para uso ocasional. Pro está pensado para uso diario, con más margen de uso y funciones avanzadas.",
      },
    },
    {
      "@type": "Question",
      name: "¿ScreensTranslate Pro envía mis capturas a algún servidor?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "La captura se procesa en tu equipo para extraer el texto. Solo el texto reconocido puede enviarse al proveedor de traducción configurado (por ejemplo, DeepL).",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo cambiar el atajo de teclado?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Sí. Desde la ventana de configuración puedes elegir la combinación de teclas que mejor encaje con tus programas y juegos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Funcionará con mis aplicaciones y sitios web habituales?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ScreensTranslate Pro está diseñado para funcionar sobre cualquier ventana que se vea en pantalla: aplicaciones de productividad, navegadores, reproductores de vídeo, juegos, PDFs y más.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué pasa si reinstalo Windows o cambio de ordenador?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Tu licencia Pro está asociada a un dispositivo. Si cambias de equipo, podrás gestionar activaciones desde el futuro panel web o solicitando soporte.",
      },
    },
  ],
} as const;

export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre ScreensTranslate Pro",
  description:
    "Resolvemos las dudas más habituales sobre ScreensTranslate Pro: instalación, licencias, privacidad de capturas y uso diario en Windows.",
  alternates: {
    canonical: "/faq",
    languages: {
      "es-ES": "/faq",
      "en-US": "/en/faq",
      "fr-FR": "/fr/faq",
    },
  },
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-16 space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          FAQ
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Preguntas frecuentes
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Resolvemos las dudas más habituales sobre instalación, licencias y
          uso diario de <Brand withPro />.
        </p>
      </header>

      <section className="space-y-4">
        {faqs.map((item) => (
          <article
            key={item.question}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm"
          >
            <h2 className="mb-1 text-[14px] font-semibold text-slate-100">
              {item.question}
            </h2>
            <p className="text-[13px] leading-relaxed text-slate-300">
              {item.answer}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 space-y-3 border-t border-slate-800 pt-6 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          Pruébalo con tus propios textos
        </h2>
        <p>
          La mejor forma de resolver dudas es utilizar <Brand withPro /> sobre
          los documentos, aplicaciones y sitios web que usas cada día. En
          minutos verás si encaja en tu flujo de trabajo.
        </p>
        <div className="pt-1">
          <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
            Descargar ScreensTranslate Pro para Windows
          </button>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
