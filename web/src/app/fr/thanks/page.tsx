import type { Metadata } from "next";
import { Brand } from "../../Brand";
import { getLicenseForSession } from "../../lib/getLicenseForSession";
import { CopyLicenseButton } from "../../CopyLicenseButton";
import { CleanSessionQuery } from "../../CleanSessionQuery";

export const metadata: Metadata = {
  title: "Merci pour votre abonnement à ScreensTranslate Pro",
  description:
    "Confirmation de paiement pour ScreensTranslate Pro, instructions pour activer la licence sous Windows et accès au panneau de licences.",
  alternates: {
    canonical: "/fr/thanks",
    languages: {
      "fr-FR": "/fr/thanks",
      "es-ES": "/thanks",
      "en-US": "/en/thanks",
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

type ThanksPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function ThanksPageFr({
  searchParams,
}: ThanksPageProps) {
  const { session_id } = await searchParams;
  const hasSession = Boolean(session_id);
  const license = await getLicenseForSession(session_id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <CleanSessionQuery />

      <header className="space-y-3">
        <p className="text-[20px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Merci pour votre achat
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Abonnement à <Brand withPro /> confirmé
        </h1>
        <div className="mb-4 rounded-xl border border-cyan-500/60 bg-cyan-500/10 px-4 py-3 text-[13px] text-cyan-100">
          <p className="text-[16px] font-semibold uppercase tracking-[0.18em] text-cyan-100/90">
            Important
          </p>
          <p className="mt-1">
            Lisez attentivement cette page et conservez votre clé de licence.
            Vous en aurez besoin pour activer ScreensTranslate Pro sous Windows
            et pour accéder au panneau de licences.
          </p>
        </div>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Votre paiement a été traité avec succès. Nous avons créé une licence
          Pro liée à votre abonnement Stripe. Dans l&apos;application Windows, vous
          pourrez saisir votre clé de licence pour débloquer toutes les
          fonctionnalités et l&apos;utiliser également pour accéder au panneau de
          licences sur ce site.
        </p>
        {hasSession && (
          <div className="mt-4 rounded-xl border border-cyan-500/40 bg-slate-900/60 px-4 py-3 text-sm">
            {license ? (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                  Votre clé de licence
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <p className="font-mono text-lg text-cyan-100">
                    {license.license_key}
                  </p>
                  <CopyLicenseButton value={license.license_key} />
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  Gardez-la en lieu sûr. Vous en aurez besoin pour activer
                  l&apos;application et pour consulter votre licence dans le
                  panneau.
                </p>
              </>
            ) : (
              <p className="text-[11px] text-slate-400">
                Nous terminons l&apos;enregistrement de votre licence. Si elle
                n&apos;apparaît pas au bout de quelques secondes, rouvrez cette page
                depuis le lien de confirmation Stripe.
              </p>
            )}
          </div>
        )}
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
            licence et saisissez la clé affichée ci-dessus (vous pouvez la
            copier avec le bouton de copie) ou collez-la depuis le presse-
            papiers.
          </li>
          <li>
            Si vous perdez votre clé, vous pourrez la consulter dans le panneau
            de licences de ce site en utilisant cette même clé pour y accéder.
          </li>
        </ol>
      </section>

      <section className="space-y-4 rounded-2xl border border-cyan-500/40 bg-cyan-500/5 px-4 py-4 text-[13px] leading-relaxed text-slate-100">
        <h2 className="text-sm font-semibold text-slate-100">
          Panneau de licences
        </h2>
        <p>
          Avec la clé que vous venez de recevoir, vous pourrez accéder au
          panneau de licences. Vous y verrez l&apos;état de votre licence, le
          nombre d&apos;appareils activés et vous pourrez ouvrir le portail Stripe
          pour modifier votre moyen de paiement ou annuler l&apos;abonnement.
        </p>
        <div>
          <a
            href="/fr/panel"
            className="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-5 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-500/10"
          >
            Accéder au panneau de licences
          </a>
        </div>
      </section>
    </div>
  );
}
