import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../../Brand";

export const metadata: Metadata = {
  title: "Cómo traducir una captura de pantalla a texto | ScreensTranslate Pro",
  description:
    "Aprende cómo traducir una captura de pantalla a texto en Windows usando OCR y ScreensTranslate Pro, sin subir imágenes a webs externas.",
  alternates: {
    canonical: "/guias/como-traducir-captura-de-pantalla-a-texto",
    languages: {
      "es-ES": "/guias/como-traducir-captura-de-pantalla-a-texto",
      "en-US": "/en/guias/como-traducir-captura-de-pantalla-a-texto",
      "fr-FR": "/fr/guias/como-traducir-captura-de-pantalla-a-texto",
    },
  },
  keywords: [
    "traducir captura de pantalla a texto",
    "traducir imagen a texto",
    "traducir screenshot a texto",
    "OCR captura de pantalla",
    "traductor de imágenes en Windows",
  ],
};

const howToScreenshotEs = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo traducir una captura de pantalla a texto",
  description:
    "Guía para traducir una captura de pantalla a texto en Windows usando ScreensTranslate Pro y OCR local.",
  inLanguage: "es-ES",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://screenstranslate.com/guias/como-traducir-captura-de-pantalla-a-texto",
  },
  tool: [
    {
      "@type": "SoftwareApplication",
      name: "ScreensTranslate Pro",
      operatingSystem: "Windows",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Abrir la ventana o imagen con el texto",
      text:
        "Abre la ventana o imagen donde aparece el texto que quieres traducir.",
    },
    {
      "@type": "HowToStep",
      name: "Lanzar ScreensTranslate Pro",
      text:
        "Pulsa el atajo global configurado en ScreensTranslate Pro para iniciar la captura.",
    },
    {
      "@type": "HowToStep",
      name: "Seleccionar la zona de la pantalla",
      text:
        "Selecciona con el ratón la zona de la pantalla que contiene el texto; no necesitas guardar una captura aparte.",
    },
    {
      "@type": "HowToStep",
      name: "Reconocer el texto y traducirlo",
      text:
        "El motor OCR extrae el texto de la imagen y ScreensTranslate Pro envía solo ese texto al traductor configurado.",
    },
    {
      "@type": "HowToStep",
      name: "Leer la traducción sobre la captura",
      text:
        "La traducción aparece como un overlay discreto sobre la zona seleccionada para que puedas seguir trabajando.",
    },
  ],
} as const;

export default function GuiaCapturaTexto() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Guía
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[32px]">
          Cómo traducir una captura de pantalla a texto
        </h1>
        <p className="text-sm leading-relaxed text-slate-300">
          Traducir una captura de pantalla es muy útil cuando el texto no se
          puede seleccionar: imágenes, infografías, menús de aplicaciones o
          vídeos. Con <Brand withPro /> puedes hacerlo de forma directa y segura
          en tu propio equipo.
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Por qué no es buena idea subir tus capturas a cualquier web
        </h2>
        <p>
          Muchos servicios online permiten subir imágenes con texto para
          traducirlas, pero eso implica enviar información potencialmente
          sensible a servidores externos que no controlas.
        </p>
        <p>
          Si trabajas con documentación interna, datos de clientes o material
          confidencial, es preferible que el reconocimiento de texto se haga en
          tu propio ordenador.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Usar ScreensTranslate Pro para traducir capturas
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Abre la ventana o imagen donde aparece el texto que quieres
            traducir.
          </li>
          <li>
            Pulsa el atajo global configurado en <Brand withPro />.
          </li>
          <li>
            Selecciona con el ratón la zona de la pantalla que contiene el
            texto. No hace falta guardar una captura aparte: la aplicación
            realiza la captura internamente.
          </li>
          <li>
            El motor OCR extrae el texto de la imagen y <Brand withPro /> envía
            solo ese texto al traductor configurado.
          </li>
          <li>
            La traducción aparece como un overlay discreto sobre la zona
            seleccionada para que puedas seguir trabajando.
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Buenas prácticas al traducir capturas de pantalla
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Evita seleccionar zonas demasiado grandes; céntrate en el bloque de
            texto que realmente necesitas entender.
          </li>
          <li>
            Si el fondo es muy ruidoso, acerca un poco el zoom en la aplicación
            original para que el OCR tenga más claridad.
          </li>
          <li>
            Revisa el resultado y, si lo necesitas para un informe o correo,
            copia el texto traducido desde el historial de <Brand withPro />.
          </li>
        </ul>
      </section>

      <section className="space-y-3 border-t border-slate-800 pt-6 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Un flujo rápido y respetuoso con tu privacidad
        </h2>
        <p>
          Con <Brand withPro /> no necesitas guardar ni subir capturas de
          pantalla a servicios externos: todo el proceso de OCR se realiza en tu
          equipo y solo se envía el texto reconocido al traductor.
        </p>
        <div className="space-y-2 text-xs text-slate-400">
          <p className="font-medium text-slate-300">
            También te puede interesar:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/guias/como-traducir-texto-en-pantalla-windows-11">
                Cómo traducir texto en pantalla en Windows 11 paso a paso
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToScreenshotEs) }}
      />
    </div>
  );
}
