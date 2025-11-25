import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../Brand";
import { SeoSoftwareJsonLd } from "../SeoSoftwareJsonLd";
import { LocaleLink } from "../LocaleLink";
import { DownloadButton } from "../DownloadButton";
import { OverlayPreview } from "../OverlayPreview";

export const metadata: Metadata = {
  title: "ScreensTranslate Pro – Screen translator for Windows",
  description:
    "ScreensTranslate Pro is a screen translator for Windows 10 and 11 that captures any area of your screen, performs OCR and translates on-screen text or screenshots to text in real time with a clean overlay.",
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "es-ES": "/",
      "fr-FR": "/fr",
    },
  },
  keywords: [
    "screen translator",
    "screen translator for Windows",
    "translate on-screen text",
    "translate onscreen text",
    "translate screenshot to text",
    "screen text translator",
    "on-screen OCR translator",
  ],
  openGraph: {
    title: "ScreensTranslate Pro – Screen translator for Windows",
    description:
      "Translate on-screen text and screenshots to text on Windows in seconds with ScreensTranslate Pro, a screen translator that combines capture, OCR and translation in one overlay.",
    url: "https://screenstranslate.com/en",
    siteName: "ScreensTranslate Pro",
    type: "website",
    locale: "en_US",
  },
};

export default function HomeEn() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-20 space-y-16">
      {/* HERO */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-500/40">
            On-screen translation for Windows
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Understand any text on your screen in seconds.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-200">
            <Brand withPro /> lets you read games, videos, documents or websites
            in your language without leaving the app or copying and pasting text.
          </p>
          <div className="flex flex-col gap-3 text-sm sm:flex-row">
            <DownloadButton />
            <LocaleLink
              href="/como-funciona"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2 font-medium text-slate-100 hover:bg-slate-800/70"
            >
              See how it works
            </LocaleLink>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span>✔ No mandatory account on the Basic plan</span>
            <span>✔ Global hotkey you can configure</span>
            <span>✔ Integrates with professional translation providers</span>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/40 via-sky-400/10 to-transparent blur-3xl" />
          <OverlayPreview locale="en" />
        </div>
      </section>

      {/* BENEFITS SUMMARY */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold tracking-tight">
          Designed so you can translate without stopping what you are doing
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
            <h3 className="mb-2 text-[13px] font-semibold text-slate-100">
              Translate with one shortcut
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Press your global hotkey, select an area and read the translated
              text as subtitles on top of the screen.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
            <h3 className="mb-2 text-[13px] font-semibold text-slate-100">
              Works with your favorite apps
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Games, videos, PDFs, browsers or productivity tools: anything that
              appears on your screen.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
            <h3 className="mb-2 text-[13px] font-semibold text-slate-100">
              Basic for free · Pro for heavy use
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Start for free and upgrade to Pro when you use it every day with a
              simple license key.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3 border-t border-slate-800 pt-6 text-xs leading-relaxed text-slate-400">
        <p className="font-medium text-slate-200">
          Want to compare the Basic and Pro plans?
        </p>
        <p>
          <LocaleLink
            href="/pricing"
            className="text-cyan-300 hover:text-cyan-200"
          >
            See ScreensTranslate Pro plans
          </LocaleLink>
          .
        </p>
      </section>

      <SeoSoftwareJsonLd />
    </div>
  );
}
