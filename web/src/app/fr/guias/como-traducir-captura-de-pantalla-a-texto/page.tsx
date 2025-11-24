import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../../../Brand";

export const metadata: Metadata = {
  title:
    "Comment traduire une capture d'écran en texte | ScreensTranslate Pro",
  description:
    "Apprenez à traduire une capture d'écran en texte sous Windows grâce à l'OCR et ScreensTranslate Pro, sans envoyer d'images à des sites externes.",
  alternates: {
    canonical: "/fr/guias/como-traducir-captura-de-pantalla-a-texto",
    languages: {
      "fr-FR": "/fr/guias/como-traducir-captura-de-pantalla-a-texto",
      "es-ES": "/guias/como-traducir-captura-de-pantalla-a-texto",
      "en-US": "/en/guias/como-traducir-captura-de-pantalla-a-texto",
    },
  },
  keywords: [
    "traduire capture d'écran en texte",
    "translate screenshot to text",
    "screen translator",
    "OCR capture d'écran Windows",
    "traduire image en texte sur Windows",
  ],
};

const howToScreenshotFr = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment traduire une capture d'écran en texte",
  description:
    "Guide pour traduire une capture d'écran en texte sous Windows avec ScreensTranslate Pro et l'OCR.",
  inLanguage: "fr-FR",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://screenstranslate.com/fr/guias/como-traducir-captura-de-pantalla-a-texto",
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
      name: "Ouvrir la fenêtre ou l'image",
      text:
        "Ouvrez la fenêtre ou l'image où se trouve le texte que vous voulez traduire.",
    },
    {
      "@type": "HowToStep",
      name: "Lancer ScreensTranslate Pro",
      text:
        "Appuyez sur le raccourci global configuré dans ScreensTranslate Pro pour démarrer la capture.",
    },
    {
      "@type": "HowToStep",
      name: "Sélectionner la zone de l'écran",
      text:
        "Sélectionnez avec la souris la zone de l'écran qui contient le texte ; il n'est pas nécessaire d'enregistrer une capture séparée.",
    },
    {
      "@type": "HowToStep",
      name: "Extraire et traduire le texte",
      text:
        "Le moteur OCR extrait le texte de l'image et ScreensTranslate Pro n'envoie que ce texte au traducteur configuré.",
    },
    {
      "@type": "HowToStep",
      name: "Lire la traduction sur la capture",
      text:
        "La traduction apparaît sous forme d'overlay discret au-dessus de la zone sélectionnée, ce qui vous permet de continuer à travailler.",
    },
  ],
} as const;

export default function GuideCaptureTexteFr() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Guide
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[32px]">
          Comment traduire une capture d'écran en texte
        </h1>
        <p className="text-sm leading-relaxed text-slate-300">
          Traduire une capture d'écran est très utile lorsque le texte n'est pas
          sélectionnable : images, infographies, menus d'applications ou vidéos.
          Avec <Brand withPro /> vous pouvez le faire directement et en toute
          sécurité sur votre propre machine.
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Pourquoi éviter d'envoyer vos captures n'importe où
        </h2>
        <p>
          De nombreux services en ligne permettent d'envoyer des images
          contenant du texte pour les traduire, mais cela implique de transmettre
          des informations potentiellement sensibles à des serveurs externes que
          vous ne contrôlez pas.
        </p>
        <p>
          Si vous travaillez avec de la documentation interne, des données
          clients ou du matériel confidentiel, il est préférable que la
          reconnaissance de texte se fasse sur votre propre ordinateur.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Utiliser ScreensTranslate Pro pour traduire des captures
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Ouvrez la fenêtre ou l'image où se trouve le texte que vous voulez
            traduire.
          </li>
          <li>
            Appuyez sur le raccourci global configuré dans <Brand withPro />.
          </li>
          <li>
            Sélectionnez avec la souris la zone de l'écran qui contient le
            texte. Il n'est pas nécessaire d'enregistrer une capture séparée :
            l'application effectue la capture en interne.
          </li>
          <li>
            Le moteur OCR extrait le texte de l'image et <Brand withPro />
            n'envoie que ce texte au traducteur configuré.
          </li>
          <li>
            La traduction apparaît sous forme d'overlay discret au-dessus de la
            zone sélectionnée, ce qui vous permet de continuer à travailler.
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Bonnes pratiques pour traduire des captures d'écran
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Évitez de sélectionner des zones trop grandes ; concentrez-vous sur
            le bloc de texte que vous devez réellement comprendre.
          </li>
          <li>
            Si le fond est très chargé, zoomez légèrement dans l'application
            d'origine pour offrir plus de clarté à l'OCR.
          </li>
          <li>
            Vérifiez le résultat et, si vous en avez besoin pour un rapport ou
            un e-mail, copiez le texte traduit depuis l'historique de <Brand
              withPro
            />.
          </li>
        </ul>
      </section>

      <section className="space-y-3 border-t border-slate-800 pt-6 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Un flux rapide et respectueux de votre vie privée
        </h2>
        <p>
          Avec <Brand withPro /> vous n'avez pas besoin d'enregistrer ni
          d'envoyer vos captures d'écran à des services externes : tout le
          processus d'OCR est réalisé sur votre machine et seul le texte reconnu
          est envoyé au traducteur.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToScreenshotFr) }}
      />
    </div>
  );
}
