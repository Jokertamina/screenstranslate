import type { Metadata } from "next";
import { Brand } from "../../Brand";

export const metadata: Metadata = {
  title: "ScreensTranslate Pro license panel",
  description:
    "Initial license panel for ScreensTranslate Pro. Soon you will be able to look up your licenses and their status by entering your key.",
  alternates: {
    canonical: "/en/panel",
    languages: {
      "en-US": "/en/panel",
      "es-ES": "/panel",
      "fr-FR": "/fr/panel",
    },
  },
};

export default function PanelPageEn() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          License panel
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          <Brand withPro /> licenses
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          This section is under development. Very soon you&apos;ll be able to enter
          your license key to check its status and see details such as plan,
          creation date and number of activated devices.
        </p>
      </header>

      <section className="space-y-4 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          Panel preview
        </h2>
        <p>
          There will be a simple form here where you can paste your license key
          and, later on, sign in with your email to see all your associated
          licenses.
        </p>
        <form className="mt-2 space-y-3">
          <label className="block text-xs font-medium text-slate-300">
            License key
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              disabled
            />
          </label>
          <p className="text-[11px] text-slate-400">
            Soon you&apos;ll be able to use this form to query your licenses
            directly from the website.
          </p>
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-slate-600 px-5 py-2 text-xs font-medium text-slate-400"
          >
            License lookup in development
          </button>
        </form>
      </section>
    </div>
  );
}
