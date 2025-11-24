import type { Metadata } from "next";
import { Brand } from "../../Brand";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: (
      <>
        Ideal to start using <Brand withPro /> in your work, studies or
        personal projects with moderate usage.
      </>
    ),
    highlight: false,
    features: [
      "Limited translations per day",
      "Configurable global hotkey",
      "No mandatory account",
    ],
  },
  {
    name: "Pro",
    price: "Pro license",
    note: "One-time payment per device (example model)",
    description: (
      <>
        Designed for professionals and heavy users who depend on content in
        other languages every day and need <Brand withPro /> in their
        workflow.
      </>
    ),
    highlight: true,
    features: [
      "Usage within a generous fair use policy",
      "Higher translation priority",
      "Extended translation history",
      "Priority email support",
    ],
  },
];

export const metadata: Metadata = {
  title: "ScreensTranslate Pro plans",
  description:
    "Check ScreensTranslate Pro plans: free Basic plan to get started and Pro license for intensive use with more capacity and support.",
  alternates: {
    canonical: "/en/pricing",
    languages: {
      "en-US": "/en/pricing",
      "es-ES": "/pricing",
      "fr-FR": "/fr/pricing",
    },
  },
};

export default function PricingPageEn() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-16 space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Plans
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Choose the plan that fits you
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          You can start with the free Basic plan and upgrade to Pro once you
          see that <Brand withPro /> is part of your daily workflow.
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
          Start today and decide later
        </h2>
        <p>
          Download <Brand withPro />, use the Basic plan at no cost to confirm
          it fits your daily routine and upgrade to Pro when you need more
          capacity and support.
        </p>
        <div className="pt-1">
          <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
            Download ScreensTranslate Pro for Windows
          </button>
        </div>
      </section>
    </div>
  );
}
