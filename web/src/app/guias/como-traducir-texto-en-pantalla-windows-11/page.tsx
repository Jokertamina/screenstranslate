import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../../Brand";

export const metadata: Metadata = {
  title: "Cómo traducir texto en pantalla en Windows 11 | ScreensTranslate Pro",
  description:
    "Guía paso a paso para traducir texto en pantalla en Windows 11 usando ScreensTranslate Pro: captura, OCR y traducción instantánea sin copiar y pegar.",
  alternates: {
    canonical: "/guias/como-traducir-texto-en-pantalla-windows-11",
    languages: {
      "es-ES": "/guias/como-traducir-texto-en-pantalla-windows-11",
      "en-US": "/en/guias/como-traducir-texto-en-pantalla-windows-11",
      "fr-FR": "/fr/guias/como-traducir-texto-en-pantalla-windows-11",
    },
  },
  keywords: [
    "traducir texto en pantalla",
    "traductor de pantalla",
    "screen translator Windows",
    "traducir pantalla en Windows 11",
    "OCR en pantalla",
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo traducir texto en pantalla en Windows 11",
  description:
    "Guía paso a paso para traducir texto en pantalla en Windows 11 usando ScreensTranslate Pro: captura, OCR y traducción instantánea sin copiar y pegar.",
  inLanguage: "es-ES",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://screenstranslate.com/guias/como-traducir-texto-en-pantalla-windows-11",
  },
  tool: [
    {
      "@type": "SoftwareApplication",
      name: "ScreensTranslate Pro",
      operatingSystem: "Windows 11",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Instalar y configurar ScreensTranslate Pro",
      text:
        "Instala ScreensTranslate Pro en tu equipo Windows 11 y configura el idioma de origen y destino.",
    },
    {
      "@type": "HowToStep",
      name: "Elegir un atajo global",
      text:
        "Elige un atajo de teclado global que no interfiera con tus aplicaciones habituales, por ejemplo Ctrl+Shift+T.",
    },
    {
      "@type": "HowToStep",
      name: "Seleccionar el texto en pantalla",
      text:
        "Cuando quieras traducir texto en pantalla, pulsa el atajo y dibuja un rectángulo sobre la zona que quieres entender.",
    },
    {
      "@type": "HowToStep",
      name: "Realizar OCR y traducción",
      text:
        "ScreensTranslate Pro realiza OCR sobre la región seleccionada, reconoce el texto y lo envía al motor de traducción configurado.",
    },
    {
      "@type": "HowToStep",
      name: "Leer la traducción en el overlay",
      text:
        "La traducción aparece como un overlay tipo subtítulo justo encima de la zona seleccionada para que puedas seguir leyendo sin cambiar de ventana.",
    },
  ],
} as const;

export default function GuiaTextoPantalla() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Guía
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[32px]">
          Cómo traducir texto en pantalla en Windows 11
        </h1>
        <p className="text-sm leading-relaxed text-slate-300">
          Si trabajas, estudias o juegas con contenido en otros idiomas, traducir
          lo que aparece en la pantalla de forma rápida marca la diferencia. En
          esta guía verás cómo hacerlo en Windows 11 con <Brand withPro />.
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Opciones habituales para traducir texto en pantalla
        </h2>
        <p>
          Lo más frecuente es hacer una captura de pantalla, abrir un traductor
          en el navegador, subir la imagen y copiar el resultado. Funciona, pero
          es lento y rompe tu flujo de trabajo.
        </p>
        <p>
          Otra opción es escribir a mano o copiar y pegar fragmentos de texto,
          algo poco práctico cuando estás leyendo documentación técnica, PDFs o
          interfaces que no permiten seleccionar texto.
        </p>
        <p>
          <Brand withPro /> elimina estos pasos intermedios y te permite
          traducir directamente lo que ves en pantalla.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Paso a paso con ScreensTranslate Pro
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Instala <Brand withPro /> en tu equipo Windows 11 y configura el
            idioma de origen y destino.
          </li>
          <li>
            Elige un atajo de teclado global que no interfiera con tus
            aplicaciones habituales (por ejemplo, Ctrl+Shift+T).
          </li>
          <li>
            Cuando quieras traducir texto en pantalla, pulsa el atajo y dibuja un
            rectángulo sobre la zona que quieres entender (un párrafo de un PDF,
            una parte de un juego, una página web, etc.).
          </li>
          <li>
            <Brand withPro /> realiza OCR sobre esa región, reconoce el texto y
            lo envía al motor de traducción configurado.
          </li>
          <li>
            La traducción aparece como un overlay tipo subtítulo, justo encima
            del área seleccionada, sin tapar completamente el contenido.
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Consejos para obtener mejores resultados
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Procura seleccionar zonas con buen contraste entre el texto y el
            fondo para mejorar el reconocimiento OCR.
          </li>
          <li>
            Ajusta el tamaño de letra del overlay desde la configuración para que
            la lectura sea cómoda en sesiones largas.
          </li>
          <li>
            Si trabajas con varios monitores, prueba el flujo en cada uno para
            asegurarte de que el atajo y el overlay se comportan como esperas.
          </li>
        </ul>
        <p className="text-xs text-slate-400">
          Si te interesa la parte técnica del reconocimiento de texto en
          Windows, Microsoft explica cómo funciona su API de OCR en{" "}
          <a
            href="https://learn.microsoft.com/en-us/windows/ai/apis/text-recognition"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-200"
          >
            la documentación oficial de Windows para OCR
          </a>
          .
        </p>
      </section>

      <section className="space-y-3 border-t border-slate-800 pt-6 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Empieza a traducir tu pantalla hoy mismo
        </h2>
        <p>
          Con <Brand withPro /> puedes traducir texto en pantalla en Windows 11
          en cuestión de segundos, sin cambiar de ventana y sin procesos
          manuales. Instálalo, configura tu atajo y pruébalo con los documentos y
          aplicaciones que usas a diario.
        </p>
        <div className="space-y-2 text-xs text-slate-400">
          <p className="font-medium text-slate-300">
            También te puede interesar:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/guias/como-traducir-captura-de-pantalla-a-texto">
                Cómo traducir una captura de pantalla a texto en Windows
              </Link>
            </li>
            <li>
              <Link href="/pricing">
                Ver planes de ScreensTranslate Pro (Basic gratis y Pro para uso intensivo)
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-1">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300"
          >
            Volver a la página principal
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
    </div>
  );
}
