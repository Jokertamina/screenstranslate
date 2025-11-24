import type { Metadata } from "next";
import { Brand } from "../../Brand";

const plans = [
  {
    name: "Basic",
    price: "Gratuit",
    description: (
      <>
        Idéal pour commencer à utiliser <Brand withPro /> dans votre travail,
        vos études ou vos projets personnels avec un usage modéré.
      </>
    ),
    highlight: false,
    features: [
      "Traductions limitées par jour",
      "Raccourci global configurable",
      "Aucun compte obligatoire",
    ],
  },
  {
    name: "Pro",
    price: "Licence Pro",
    note: "Paiement unique par appareil (modèle indicatif)",
    description: (
      <>
        Pensé pour les professionnels et les utilisateurs intensifs qui
        dépendent chaque jour de contenus dans d'autres langues et ont besoin
        que <Brand withPro /> fasse partie de leur flux de travail.
      </>
    ),
    highlight: true,
    features: [
      "Utilisation dans une politique de fair use généreuse",
      "Priorité supérieure pour la traduction",
      "Historique de traductions étendu",
      "Support par e-mail prioritaire",
    ],
  },
];

export const metadata: Metadata = {
  title: "Tarifs de ScreensTranslate Pro",
  description:
    "Découvrez les tarifs de ScreensTranslate Pro : plan Basic gratuit pour débuter et licence Pro pour un usage intensif avec plus de capacité et de support.",
  alternates: {
    canonical: "/fr/pricing",
    languages: {
      "fr-FR": "/fr/pricing",
      "es-ES": "/pricing",
      "en-US": "/en/pricing",
    },
  },
};

export default function PricingFr() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-16 space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Tarifs
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Choisissez l'offre qui vous convient
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Vous pouvez commencer avec le plan Basic gratuit puis passer à Pro
          lorsque vous voyez que <Brand withPro /> fait partie de votre
          quotidien.
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
          </article>
        ))}
      </section>

      <section className="space-y-3 border-t border-slate-800 pt-8 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          Commencez aujourd'hui et décidez plus tard
        </h2>
        <p>
          Téléchargez <Brand withPro />, utilisez le plan Basic gratuitement
          pour vérifier qu'il s'intègre bien à votre routine quotidienne, puis
          passez à Pro lorsque vous avez besoin de plus de capacité et de
          support.
        </p>
        <div className="pt-1">
          <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
            Télécharger ScreensTranslate Pro pour Windows
          </button>
        </div>
      </section>
    </div>
  );
}
