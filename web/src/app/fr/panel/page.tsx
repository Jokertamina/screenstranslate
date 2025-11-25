import type { Metadata } from "next";
import { Brand } from "../../Brand";

export const metadata: Metadata = {
  title: "Panneau de licences ScreensTranslate Pro",
  description:
    "Panneau de licences initial pour ScreensTranslate Pro. Bientôt vous pourrez consulter vos licences et leur statut en saisissant votre clé.",
  alternates: {
    canonical: "/fr/panel",
    languages: {
      "fr-FR": "/fr/panel",
      "es-ES": "/panel",
      "en-US": "/en/panel",
    },
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
          Cette section est en cours de développement. Très bientôt, vous
          pourrez saisir votre clé de licence pour vérifier son statut et voir
          des détails comme le plan, la date de création et le nombre
          d&apos;appareils activés.
        </p>
      </header>

      <section className="space-y-4 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          Aperçu du panneau
        </h2>
        <p>
          Il y aura ici un formulaire simple où vous pourrez coller votre clé de
          licence et, plus tard, vous connecter avec votre e-mail pour voir
          toutes vos licences associées.
        </p>
        <form className="mt-2 space-y-3">
          <label className="block text-xs font-medium text-slate-300">
            Clé de licence
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              disabled
            />
          </label>
          <p className="text-[11px] text-slate-400">
            Bientôt, vous pourrez utiliser ce formulaire pour consulter vos
            licences directement depuis le site.
          </p>
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-slate-600 px-5 py-2 text-xs font-medium text-slate-400"
          >
            Consultation des licences en développement
          </button>
        </form>
      </section>
    </div>
  );
}
