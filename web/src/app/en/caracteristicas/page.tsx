import type { Metadata } from "next";
import { Brand } from "../../Brand";

const features = [
  {
    title: "Subtitle-style overlay",
    text: "Translations in a discreet, readable panel – ideal for games, videos and tutorials.",
  },
  {
    title: "Works with any app",
    text: "Runs on top of browsers, streaming clients, PDFs, trading tools and more.",
  },
  {
    title: "Advanced OCR",
    text: "Uses Tesseract to recognize text even with small fonts or complex backgrounds.",
  },
  {
    title: "Professional-grade translation",
    text: "Designed to integrate with high-quality translation providers such as DeepL.",
  },
  {
    title: "Local history",
    text: "Review, copy or export recent translations without relying on the cloud.",
  },
  {
    title: "Configurable global hotkey",
    text: "Choose the key combination that best fits the way you work or play.",
  },
];

export const metadata: Metadata = {
  title: "ScreensTranslate Pro features",
  description:
    "Discover the main features of ScreensTranslate Pro: on-screen translation overlay, OCR, global hotkey, local history and more.",
  alternates: {
    canonical: "/en/caracteristicas",
    languages: {
      "en-US": "/en/caracteristicas",
      "es-ES": "/caracteristicas",
      "fr-FR": "/fr/caracteristicas",
    },
  },
};

export default function FeaturesPageEn() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-16">
      <main className="space-y-10">
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
            Features
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
            Everything you need to understand what is on screen
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
            <Brand withPro /> combines screen capture, text recognition and
            translation in a single flow, designed to stay out of your way.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm"
            >
              <h2 className="mb-2 text-[14px] font-semibold text-slate-100">
                {f.title}
              </h2>
              <p className="text-[13px] leading-relaxed text-slate-300">{f.text}</p>
            </article>
          ))}
        </section>

        <section className="space-y-3 border-t border-slate-800 pt-8 text-[13px] leading-relaxed text-slate-300">
          <h2 className="text-sm font-semibold text-slate-100">
            Built for real-world workflows
          </h2>
          <p>
            Combine these features to instantly translate the information you
            need in your job, studies or continuous learning, without
            interrupting what you are doing.
          </p>
          <div className="pt-1">
            <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
              Start using ScreensTranslate Pro
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
