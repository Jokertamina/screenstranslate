import type { Metadata } from "next";
import { Brand } from "../../Brand";

const features = [
  {
    title: "Overlay de type sous-titre",
    text: "Traductions dans un panneau discret et lisible, idéal pour les jeux, les vidéos et les tutoriels.",
  },
  {
    title: "Compatible avec toute application",
    text: "Fonctionne au-dessus des navigateurs, plateformes de streaming, PDFs, outils de trading et plus encore.",
  },
  {
    title: "OCR avancé",
    text: "Utilise Tesseract pour reconnaître le texte même avec des polices petites ou des fonds complexes.",
  },
  {
    title: "Traduction professionnelle",
    text: "Conçu pour s'intégrer à des fournisseurs de traduction de haute qualité comme DeepL.",
  },
  {
    title: "Historique local",
    text: "Consultez, copiez ou exportez les traductions récentes sans dépendre du cloud.",
  },
  {
    title: "Raccourci global configurable",
    text: "Choisissez la combinaison de touches qui s'adapte le mieux à votre façon de travailler ou de jouer.",
  },
];

export const metadata: Metadata = {
  title: "Fonctionnalités de ScreensTranslate Pro",
  description:
    "Découvrez les principales fonctionnalités de ScreensTranslate Pro : overlay de traduction, OCR à l'écran, raccourci global, historique local et plus encore.",
  alternates: {
    canonical: "/fr/caracteristicas",
    languages: {
      "fr-FR": "/fr/caracteristicas",
      "es-ES": "/caracteristicas",
      "en-US": "/en/caracteristicas",
    },
  },
};

export default function CaracteristiquesFr() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-16">
      <main className="space-y-10">
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
            Fonctionnalités
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
            Tout ce dont vous avez besoin pour comprendre l'écran
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
            <Brand withPro /> combine capture d'écran, reconnaissance de texte
            et traduction dans un flux unique, conçu pour ne pas vous gêner.
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
            Pensé pour des flux de travail réels
          </h2>
          <p>
            Combinez ces fonctionnalités pour traduire immédiatement les
            informations dont vous avez besoin dans votre travail, vos études ou
            votre formation continue, sans interrompre ce que vous faites.
          </p>
          <div className="pt-1">
            <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
              Commencer à utiliser ScreensTranslate Pro
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
