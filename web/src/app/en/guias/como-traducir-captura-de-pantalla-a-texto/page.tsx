import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../../../Brand";

export const metadata: Metadata = {
  title: "How to translate a screenshot to text | ScreensTranslate Pro",
  description:
    "Learn how to translate a screenshot to text on Windows using OCR and ScreensTranslate Pro, without uploading images to external websites.",
  alternates: {
    canonical: "/en/guias/como-traducir-captura-de-pantalla-a-texto",
    languages: {
      "en-US": "/en/guias/como-traducir-captura-de-pantalla-a-texto",
      "es-ES": "/guias/como-traducir-captura-de-pantalla-a-texto",
      "fr-FR": "/fr/guias/como-traducir-captura-de-pantalla-a-texto",
    },
  },
  keywords: [
    "translate screenshot to text",
    "screenshot OCR translator",
    "screen translator",
    "translate image to text on Windows",
    "OCR screenshot Windows",
  ],
};

const howToScreenshotEn = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to translate a screenshot to text",
  description:
    "Step-by-step guide to translate a screenshot to text on Windows using ScreensTranslate Pro and OCR.",
  inLanguage: "en-US",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://screenstranslate.com/en/guias/como-traducir-captura-de-pantalla-a-texto",
  },
  tool: [
    {
      "@type": "SoftwareApplication",
      name: "ScreensTranslate Pro",
      operatingSystem: "Windows",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Open the window or image",
      text:
        "Open the window or image where the text you want to translate is displayed.",
    },
    {
      "@type": "HowToStep",
      name: "Start ScreensTranslate Pro",
      text:
        "Press the global hotkey configured in ScreensTranslate Pro to start the capture.",
    },
    {
      "@type": "HowToStep",
      name: "Select the area of the screen",
      text:
        "Select with your mouse the area of the screen that contains the text; there is no need to save a separate screenshot.",
    },
    {
      "@type": "HowToStep",
      name: "Extract and translate the text",
      text:
        "The OCR engine extracts the text from the image and ScreensTranslate Pro sends only that text to the configured translator.",
    },
    {
      "@type": "HowToStep",
      name: "Read the translation on top of the screenshot",
      text:
        "The translation appears as a subtle overlay on top of the selected area so you can keep working.",
    },
  ],
} as const;

export default function GuideScreenshotToTextEn() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Guide
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[32px]">
          How to translate a screenshot to text
        </h1>
        <p className="text-sm leading-relaxed text-slate-300">
          Translating a screenshot is very useful when text cannot be selected:
          images, infographics, application menus or videos. With <Brand
            withPro
          /> you can do it directly and securely on your own machine.
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Why uploading your screenshots anywhere is not a good idea
        </h2>
        <p>
          Many online services let you upload images with text to translate
          them, but that means sending potentially sensitive information to
          external servers you do not control.
        </p>
        <p>
          If you work with internal documentation, customer data or confidential
          material, it is safer to run text recognition on your own computer.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Using ScreensTranslate Pro to translate screenshots
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Open the window or image where the text you want to translate is
            displayed.
          </li>
          <li>
            Press the global hotkey configured in <Brand withPro />.
          </li>
          <li>
            Select with your mouse the area of the screen that contains the
            text. There is no need to save a separate screenshot: the
            application captures it internally.
          </li>
          <li>
            The OCR engine extracts the text from the image and <Brand withPro
            /> sends only that text to the configured translator.
          </li>
          <li>
            The translation appears as a subtle overlay on top of the selected
            area so you can keep working.
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          Best practices when translating screenshots
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Avoid selecting very large areas; focus on the block of text you
            actually need to understand.
          </li>
          <li>
            If the background is very noisy, zoom in a bit in the original app
            so the OCR has more clarity.
          </li>
          <li>
            Review the result and, if you need it for an email or report, copy
            the translated text from <Brand withPro />&apos;s history.
          </li>
        </ul>
      </section>

      <section className="space-y-3 border-t border-slate-800 pt-6 text-sm leading-relaxed text-slate-300">
        <h2 className="text-base font-semibold text-slate-100">
          A fast, privacy-friendly workflow
        </h2>
        <p>
          With <Brand withPro /> you do not need to save or upload screenshots
          to external services: the entire OCR process runs on your machine and
          only the recognized text is sent to the translator.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToScreenshotEn) }}
      />
    </div>
  );
}
