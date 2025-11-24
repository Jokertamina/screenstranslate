import type { Metadata } from "next";
import { Brand } from "../../Brand";

const steps = [
  {
    title: "1. Press the global shortcut",
    text: (
      <>
        Launch <Brand withPro /> from any application using a configurable
        shortcut (Ctrl+Shift+T by default).
      </>
    ),
  },
  {
    title: "2. Select an area of the screen",
    text: "Draw a rectangle over the text you want to understand. Only that region is captured, not your entire screen.",
  },
  {
    title: "3. Read the translation in a clean overlay",
    text: "The translated text appears in a subtitle-like panel above the selected area, without covering what matters.",
  },
];

export const metadata: Metadata = {
  title: "How ScreensTranslate Pro works",
  description:
    "Learn how to use ScreensTranslate Pro in three steps: global shortcut, area selection and on-screen translation overlay.",
  alternates: {
    canonical: "/en/como-funciona",
    languages: {
      "en-US": "/en/como-funciona",
      "es-ES": "/como-funciona",
      "fr-FR": "/fr/como-funciona",
    },
  },
};

export default function HowItWorksPageEn() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-6 lg:py-16">
      <main className="space-y-10">
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
            Quick guide
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
            How <Brand withPro /> works
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
            The goal is to help you understand any on-screen text without
            breaking your flow. Three steps, under five seconds, without
            switching windows.
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
            Tips for a better experience
          </h2>
          <ul className="space-y-2 text-[13px] leading-relaxed">
            <li>
              • Use a monitor with good contrast and avoid very noisy
              backgrounds to improve OCR results.
            </li>
            <li>
              • Adjust the overlay font size from the desktop app so your eyes
              don&apos;t get tired.
            </li>
            <li>
              • Try different shortcuts until you find one that does not clash
              with your usual apps or games.
            </li>
          </ul>
        </section>

        <section className="mt-4 space-y-3 border-t border-slate-800 pt-6 text-[13px] leading-relaxed text-slate-300">
          <h2 className="text-sm font-semibold text-slate-100">
            Start using it in your daily work
          </h2>
          <p>
            Configure your favourite shortcut and use <Brand withPro /> whenever
            a piece of text appears on screen that you don&apos;t understand:
            emails, reports, technical documentation, online courses or
            application interfaces in other languages.
          </p>
          <div className="pt-1">
            <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
              Download ScreensTranslate Pro for Windows
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
