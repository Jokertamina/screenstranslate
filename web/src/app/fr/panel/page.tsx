import type { Metadata } from "next";
import { Brand } from "../../Brand";
import { LicensePanelClientFr } from "../../panel/LicensePanelClientFr";

export const metadata: Metadata = {
  title: "Panneau de licences ScreensTranslate Pro",
  description:
    "Panneau de licences pour ScreensTranslate Pro. Consultez l'état de votre licence et ouvrez le portail Stripe pour gérer votre abonnement.",
  alternates: {
    canonical: "/fr/panel",
    languages: {
      "fr-FR": "/fr/panel",
      "es-ES": "/panel",
      "en-US": "/en/panel",
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PanelPageFr() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Panneau de licences
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Licences <Brand withPro />
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Depuis ce panneau, vous pouvez consulter l&apos;état de votre licence
          ScreensTranslate Pro et ouvrir le portail Stripe pour gérer votre
          abonnement. Vous avez seulement besoin de la clé reçue sur la page de
          confirmation.
        </p>
      </header>

      <LicensePanelClientFr />
    </div>
  );
}
