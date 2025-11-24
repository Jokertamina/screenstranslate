import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../Brand";
import { SeoSoftwareJsonLd } from "../SeoSoftwareJsonLd";
import { DownloadButton } from "../DownloadButton";
import { OverlayPreview } from "../OverlayPreview";

export const metadata: Metadata = {
  title: "ScreensTranslate Pro – Traducteur de texte à l'écran pour Windows",
  description:
    "ScreensTranslate Pro capture une zone de votre écran, effectue un OCR et traduit le texte en temps réel dans un bandeau propre et configurable.",
  alternates: {
    canonical: "/fr",
    languages: {
      "fr-FR": "/fr",
      "es-ES": "/",
      "en-US": "/en",
    },
  },
  keywords: [
    "screen translator",
    "translate on-screen text",
    "translate screenshot to text",
    "traduire texte à l'écran",
    "traduire capture d'écran en texte",
    "traducteur d'écran Windows",
  ],
  openGraph: {
    title: "ScreensTranslate Pro – Traducteur de texte à l'écran pour Windows",
    description:
      "Traduisez du texte à l'écran et des captures d'écran en texte sur Windows en quelques secondes avec ScreensTranslate Pro.",
    url: "https://screenstranslate.com/fr",
    siteName: "ScreensTranslate Pro",
    type: "website",
    locale: "fr_FR",
  },
};

export default function HomeFr() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-20 space-y-16">
      {/* HERO */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-500/40">
            Traduction à l'écran pour Windows
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Comprenez n'importe quel texte à l'écran en quelques secondes.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-200">
            <Brand withPro /> vous permet de lire des jeux, des vidéos,
            des documents ou des sites web dans votre langue sans quitter
            l'application ni copier-coller du texte.
          </p>
          <div className="flex flex-col gap-3 text-sm sm:flex-row">
            <DownloadButton />
            <Link
              href="/fr/como-funciona"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2 font-medium text-slate-100 hover:bg-slate-800/70"
            >
              Voir comment ça marche
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span>✔ Aucun compte obligatoire avec le plan Basic</span>
            <span>✔ Raccourci clavier global configurable</span>
            <span>✔ Intégration avec des services de traduction professionnels</span>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/40 via-sky-400/10 to-transparent blur-3xl" />
          <OverlayPreview locale="fr" />
        </div>
      </section>

      {/* RÉSUMÉ DES AVANTAGES */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold tracking-tight">
          Pensé pour traduire sans interrompre ce que vous faites
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
            <h3 className="mb-2 text-[13px] font-semibold text-slate-100">
              Traduisez avec un seul raccourci
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Appuyez sur votre raccourci global, sélectionnez une zone et
              lisez la traduction comme des sous-titres au-dessus de l'écran.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
            <h3 className="mb-2 text-[13px] font-semibold text-slate-100">
              Fonctionne avec vos applications préférées
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Jeux, vidéos, PDFs, navigateurs ou outils de productivité : tout
              ce qui apparaît à l'écran.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
            <h3 className="mb-2 text-[13px] font-semibold text-slate-100">
              Basic gratuit · Pro pour un usage intensif
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Commencez gratuitement et passez à Pro lorsque vous l'utilisez
              chaque jour, avec une simple clé de licence.
            </p>
          </div>
        </div>
      </section>

      <SeoSoftwareJsonLd />
    </div>
  );
}
