import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../../../Brand";

export const metadata: Metadata = {
  title: "How to translate on-screen text in Windows 11 | ScreensTranslate Pro",
  description:
    "Step-by-step guide to translate on-screen text in Windows 11 using ScreensTranslate Pro: capture, OCR and instant translation without copying and pasting.",
  alternates: {
    canonical: "/en/guias/como-traducir-texto-en-pantalla-windows-11",
    languages: {
      "en-US": "/en/guias/como-traducir-texto-en-pantalla-windows-11",
      "es-ES": "/guias/como-traducir-texto-en-pantalla-windows-11",
      "fr-FR": "/fr/guias/como-traducir-texto-en-pantalla-windows-11",
    },
  },
  keywords: [
    "translate on-screen text",
    "screen translator",
    "screen translator for Windows",
    "translate text on screen Windows 11",
    "on-screen OCR translator",
  ],
};

const howToJsonLdEn = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to translate on-screen text in Windows 11",
  description:
    "Step-by-step guide to translate on-screen text in Windows 11 using ScreensTranslate Pro.",
  inLanguage: "en-US",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://screenstranslate.com/en/guias/como-traducir-texto-en-pantalla-windows-11",
  },
  tool: [
    {
      "@type": "SoftwareApplication",
      name: "ScreensTranslate Pro",
      operatingSystem: "Windows 11",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Install and configure ScreensTranslate Pro",
      text:
        "Install ScreensTranslate Pro on your Windows 11 PC and configure the source and target languages.",
    },
    {
      "@type": "HowToStep",
      name: "Choose a global hotkey",
      text:
        "Choose a global hotkey that does not interfere with your usual apps, for example Ctrl+Shift+T.",
    },
    {
      "@type": "HowToStep",
      name: "Select the on-screen text",
      text:
        "When you want to translate on-screen text, press the hotkey and draw a rectangle over the area you want to understand.",
    },
    {
      "@type": "HowToStep",
      name: "Perform OCR and translation",
      text:
        "ScreensTranslate Pro performs OCR on the selected region, recognizes the text and sends it to the configured translation engine.",
    },
    {
      "@type": "HowToStep",
      name: "Read the translation on the overlay",
      text:
        "The translation appears as a subtitle-style overlay directly on top of the selected area so you can keep reading without switching windows.",
    },
  ],
} as const;

export default function GuideOnScreenTextEn() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Guide
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[32px]">
          How to translate on-screen text in Windows 11
        </h1>
        <p className="text-sm leading-relaxed text-slate-300">
          If you work, study or play with content in other languages, quickly
          translating what appears on screen makes a big difference. This guide
          shows you how to do it in Windows 11 with <Brand withPro />.
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Usual options to translate on-screen text
        </h2>
        <p>
          The most common approach is to take a screenshot, open a translator in
          the browser, upload the image and copy the result. It works, but it is
          slow and interrupts your workflow.
        </p>
        <p>
          Another option is to type or copy and paste text fragments manually,
          which is impractical when reading technical documentation, PDFs or
          interfaces where text cannot be selected.
        </p>
        <p>
          <Brand withPro /> removes these intermediate steps and lets you
          translate directly what you see on screen.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Step by step with ScreensTranslate Pro
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Install <Brand withPro /> on your Windows 11 PC and configure the
            source and target languages.
          </li>
          <li>
            Choose a global hotkey that does not interfere with your usual apps
            (for example, Ctrl+Shift+T).
          </li>
          <li>
            When you want to translate on-screen text, press the hotkey and draw
            a rectangle over the area you want to understand (a paragraph in a
            PDF, part of a game, a web page, etc.).
          </li>
          <li>
            <Brand withPro /> performs OCR on that region, recognizes the text
            and sends it to the configured translation engine.
          </li>
          <li>
            The translation appears as a subtitle-style overlay directly on top
            of the selected area, without completely covering the content.
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Tips to get better results
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Try to select regions with good contrast between text and
            background to improve OCR accuracy.
          </li>
          <li>
            Adjust the overlay font size from the settings so reading stays
            comfortable in long sessions.
          </li>
          <li>
            If you use multiple monitors, test the flow on each one to make sure
            the hotkey and overlay behave as expected.
          </li>
        </ul>
      </section>

      <section className="space-y-3 border-t border-slate-800 pt-6 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Start translating your screen today
        </h2>
        <p>
          With <Brand withPro /> you can translate on-screen text in Windows 11
          in a matter of seconds, without switching windows and without manual
          steps. Install it, configure your hotkey and try it with the
          documents and applications you use every day.
        </p>
        <div className="pt-1">
          <Link
            href="/en"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300"
          >
            Back to home
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLdEn) }}
      />
    </div>
  );
}
