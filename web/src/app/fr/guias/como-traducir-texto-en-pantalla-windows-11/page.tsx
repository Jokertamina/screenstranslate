import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../../../Brand";

export const metadata: Metadata = {
  title:
    "Comment traduire du texte à l'écran sous Windows 11 | ScreensTranslate Pro",
  description:
    "Guide pas à pas pour traduire du texte à l'écran sous Windows 11 avec ScreensTranslate Pro : capture, OCR et traduction instantanée sans copier-coller.",
  alternates: {
    canonical: "/fr/guias/como-traducir-texto-en-pantalla-windows-11",
    languages: {
      "fr-FR": "/fr/guias/como-traducir-texto-en-pantalla-windows-11",
      "es-ES": "/guias/como-traducir-texto-en-pantalla-windows-11",
      "en-US": "/en/guias/como-traducir-texto-en-pantalla-windows-11",
    },
  },
  keywords: [
    "traduire texte à l'écran",
    "screen translator",
    "translate on-screen text",
    "Windows 11 texte écran",
    "traduire écran en texte",
  ],
};

const howToJsonLdFr = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment traduire du texte à l'écran sous Windows 11",
  description:
    "Guide pas à pas pour traduire du texte à l'écran sous Windows 11 avec ScreensTranslate Pro.",
  inLanguage: "fr-FR",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://screenstranslate.com/fr/guias/como-traducir-texto-en-pantalla-windows-11",
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
      name: "Installer et configurer ScreensTranslate Pro",
      text:
        "Installez ScreensTranslate Pro sur votre PC Windows 11 et configurez les langues source et cible.",
    },
    {
      "@type": "HowToStep",
      name: "Choisir un raccourci global",
      text:
        "Choisissez un raccourci clavier global qui n'interfère pas avec vos applications habituelles, par exemple Ctrl+Shift+T.",
    },
    {
      "@type": "HowToStep",
      name: "Sélectionner le texte à l'écran",
      text:
        "Lorsque vous souhaitez traduire du texte à l'écran, appuyez sur le raccourci et dessinez un rectangle autour de la zone à comprendre.",
    },
    {
      "@type": "HowToStep",
      name: "Effectuer l'OCR et la traduction",
      text:
        "ScreensTranslate Pro effectue un OCR sur la région sélectionnée, reconnaît le texte et l'envoie au moteur de traduction configuré.",
    },
    {
      "@type": "HowToStep",
      name: "Lire la traduction dans l'overlay",
      text:
        "La traduction apparaît sous forme d'overlay de type sous-titre au-dessus de la zone sélectionnée afin que vous puissiez continuer à lire sans changer de fenêtre.",
    },
  ],
} as const;

export default function GuideTexteEcranFr() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Guide
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[32px]">
          Comment traduire du texte à l'écran sous Windows 11
        </h1>
        <p className="text-sm leading-relaxed text-slate-300">
          Si vous travaillez, étudiez ou jouez avec du contenu dans d'autres
          langues, traduire rapidement ce qui apparaît à l'écran fait toute la
          différence. Ce guide explique comment le faire sous Windows 11 avec
          <Brand withPro />.
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Options habituelles pour traduire du texte à l'écran
        </h2>
        <p>
          La méthode la plus courante consiste à faire une capture d'écran,
          ouvrir un traducteur dans le navigateur, envoyer l'image et copier le
          résultat. Cela fonctionne, mais c'est lent et casse votre flux de
          travail.
        </p>
        <p>
          Une autre option consiste à taper ou copier-coller manuellement des
          fragments de texte, ce qui est peu pratique lorsque vous lisez de la
          documentation technique, des PDFs ou des interfaces où le texte n'est
          pas sélectionnable.
        </p>
        <p>
          <Brand withPro /> supprime ces étapes intermédiaires et vous permet de
          traduire directement ce que vous voyez à l'écran.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Étapes avec ScreensTranslate Pro
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Installez <Brand withPro /> sur votre PC Windows 11 et configurez
            les langues source et cible.
          </li>
          <li>
            Choisissez un raccourci global qui n'interfère pas avec vos
            applications habituelles (par exemple Ctrl+Shift+T).
          </li>
          <li>
            Lorsque vous souhaitez traduire du texte à l'écran, appuyez sur le
            raccourci et dessinez un rectangle autour de la zone à comprendre
            (un paragraphe d'un PDF, une partie d'un jeu, une page web, etc.).
          </li>
          <li>
            <Brand withPro /> effectue un OCR sur cette région, reconnaît le
            texte et l'envoie au moteur de traduction configuré.
          </li>
          <li>
            La traduction apparaît sous forme d'overlay de type sous-titre,
            directement au-dessus de la zone sélectionnée, sans masquer
            complètement le contenu.
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Conseils pour de meilleurs résultats
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Essayez de sélectionner des zones avec un bon contraste entre le
            texte et le fond pour améliorer la précision de l'OCR.
          </li>
          <li>
            Ajustez la taille de police de l'overlay dans les paramètres pour
            que la lecture reste confortable lors de longues sessions.
          </li>
          <li>
            Si vous utilisez plusieurs écrans, testez le flux sur chacun pour
            vérifier que le raccourci et l'overlay se comportent comme prévu.
          </li>
        </ul>
      </section>

      <section className="space-y-3 border-t border-slate-800 pt-6 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Commencez à traduire votre écran dès aujourd'hui
        </h2>
        <p>
          Avec <Brand withPro /> vous pouvez traduire le texte à l'écran sous
          Windows 11 en quelques secondes, sans changer de fenêtre et sans
          étapes manuelles. Installez-le, configurez votre raccourci et testez-le
          avec les documents et applications que vous utilisez au quotidien.
        </p>
        <div className="pt-1">
          <Link
            href="/fr"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300"
          >
            Revenir à la page d'accueil
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLdFr) }}
      />
    </div>
  );
}
