import type { Metadata } from "next";
import { Brand } from "../../Brand";

export const metadata: Metadata = {
  title: "Merci pour votre abonnement à ScreensTranslate Pro",
  description:
    "Confirmation de paiement pour ScreensTranslate Pro, instructions de base pour activer la licence sous Windows et accès au futur panneau de licences.",
  alternates: {
    canonical: "/fr/thanks",
    languages: {
      "fr-FR": "/fr/thanks",
      "es-ES": "/thanks",
      "en-US": "/en/thanks",
    },
  },
};

export default function ThanksPageFr() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Merci
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Abonnement à <Brand withPro /> confirmé
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Votre paiement a été traité avec succès. Nous avons créé une licence
          Pro liée à votre abonnement Stripe. Dans l&apos;application Windows, vous
          pourrez saisir votre clé de licence pour débloquer toutes les
          fonctionnalités.
        </p>
      </header>

      <section className="space-y-3 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          Que faire ensuite ?
        </h2>
        <ol className="list-decimal space-y-2 pl-4">
          <li>
            Téléchargez et installez <Brand withPro /> pour Windows depuis la
            page d&apos;accueil.
          </li>
          <li>
            Lorsque vous ouvrez l&apos;application, rendez-vous dans la section
            licence et saisissez la clé qui vous a été affichée lors de
            l&apos;achat (ou que vous verrez dans le panneau de licences).
          </li>
          <li>
            Si vous perdez votre clé, vous pourrez la consulter dans le panneau
            de licences sur ce site.
          </li>
        </ol>
      </section>

      <section className="space-y-4 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          Panneau de licences
        </h2>
        <p>
          Nous préparons un petit panneau où vous pourrez voir vos licences,
          vérifier leur statut et gérer votre abonnement. En attendant, gardez
          votre clé de licence dans un endroit sûr.
        </p>
        <div>
          <a
            href="/panel"
            className="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-5 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-500/10"
          >
            Accéder au panneau de licences (en développement)
          </a>
        </div>
      </section>
    </div>
  );
}
