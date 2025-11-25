import type { Metadata } from "next";
import { Brand } from "../../Brand";

export const metadata: Metadata = {
  title: "Thank you for subscribing to ScreensTranslate Pro",
  description:
    "Payment confirmation for ScreensTranslate Pro, basic instructions to activate the license on Windows and access to the upcoming license panel.",
  alternates: {
    canonical: "/en/thanks",
    languages: {
      "en-US": "/en/thanks",
      "es-ES": "/thanks",
      "fr-FR": "/fr/thanks",
    },
  },
};

export default function ThanksPageEn() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Thank you
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Subscription to <Brand withPro /> confirmed
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Your payment has been processed successfully. We have created a Pro
          license linked to your Stripe subscription. In the Windows
          application, you&apos;ll be able to enter your license key to unlock all
          features.
        </p>
      </header>

      <section className="space-y-3 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          What to do next
        </h2>
        <ol className="list-decimal space-y-2 pl-4">
          <li>
            Download and install <Brand withPro /> for Windows from the
            homepage.
          </li>
          <li>
            When you open the app, go to the license section and enter the key
            shown to you during checkout (or that you&apos;ll see in the license
            panel).
          </li>
          <li>
            If you ever lose your key, you&apos;ll be able to look it up in the
            license panel on this website.
          </li>
        </ol>
      </section>

      <section className="space-y-4 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          License panel
        </h2>
        <p>
          We are preparing a small panel where you&apos;ll be able to see your
          licenses, check their status and manage your subscription. In the
          meantime, keep your license key in a safe place.
        </p>
        <div>
          <a
            href="/panel"
            className="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-5 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-500/10"
          >
            Go to the license panel (work in progress)
          </a>
        </div>
      </section>
    </div>
  );
}
