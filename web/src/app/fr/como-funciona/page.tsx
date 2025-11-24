import type { Metadata } from "next";
import { Brand } from "../../Brand";

const steps = [
  {
    title: "1. Appuyez sur le raccourci global",
    text: (
      <>
        Lancez <Brand withPro /> depuis n'importe quelle application avec un
        raccourci configurable (Ctrl+Shift+T par défaut).
      </>
    ),
  },
  {
    title: "2. Sélectionnez une zone de l'écran",
    text: "Dessinez un rectangle autour du texte que vous souhaitez comprendre. Seule cette zone est capturée, pas tout votre écran.",
  },
  {
    title: "3. Lisez la traduction dans un overlay clair",
    text: "Le texte traduit apparaît dans un panneau de type sous-titre au-dessus de la zone sélectionnée, sans masquer ce qui est important.",
  },
];

export const metadata: Metadata = {
  title: "Comment fonctionne ScreensTranslate Pro",
  description:
    "Guide rapide pour apprendre à utiliser ScreensTranslate Pro en trois étapes : raccourci global, sélection de zone et traduction en overlay.",
  alternates: {
    canonical: "/fr/como-funciona",
    languages: {
      "fr-FR": "/fr/como-funciona",
      "es-ES": "/como-funciona",
      "en-US": "/en/como-funciona",
    },
  },
};

export default function CommentCaMarcheFr() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-6 lg:py-16">
      <main className="space-y-10">
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
            Guide rapide
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
            Comment fonctionne <Brand withPro />
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
            L'objectif est que vous puissiez comprendre n'importe quel texte à
            l'écran sans casser votre flux. Trois étapes, moins de cinq
            secondes, sans changer de fenêtre.
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
            Conseils pour une meilleure expérience
          </h2>
          <ul className="space-y-2 text-[13px] leading-relaxed">
            <li>
              • Utilisez un écran avec un bon contraste et évitez les fonds trop
              chargés pour améliorer les résultats OCR.
            </li>
            <li>
              • Ajustez la taille de police de l'overlay depuis l'application de
              bureau pour que vos yeux ne se fatiguent pas.
            </li>
            <li>
              • Testez différents raccourcis jusqu'à trouver celui qui ne
              perturbe pas vos applications ou jeux habituels.
            </li>
          </ul>
        </section>

        <section className="mt-4 space-y-3 border-t border-slate-800 pt-6 text-[13px] leading-relaxed text-slate-300">
          <h2 className="text-sm font-semibold text-slate-100">
            Intégrez-le à votre quotidien
          </h2>
          <p>
            Configurez votre raccourci favori et utilisez <Brand withPro />
            dès qu'un texte à l'écran vous pose problème : e-mails, rapports,
            documentation technique, cours en ligne ou interfaces
            d'applications dans d'autres langues.
          </p>
          <div className="pt-1">
            <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
              Télécharger ScreensTranslate Pro pour Windows
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
