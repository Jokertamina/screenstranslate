import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../../Brand";

const faqs = [
  {
    question: "Do I need an account to use ScreensTranslate Pro?",
    answer: (
      <>
        No. The Basic plan is designed to be used without a mandatory account.
        For the Pro plan you only need a license key to activate <Brand withPro />.
      </>
    ),
  },
  {
    question: "What is the difference between Basic and Pro?",
    answer:
      "Basic includes a limited number of translations per day and is aimed at occasional use. Pro is designed for daily use, with more capacity and advanced features.",
  },
  {
    question: "Does ScreensTranslate Pro send my screenshots to a server?",
    answer: (
      <>
        The capture is processed on your machine to extract the text. Only the
        recognized text may be sent to the configured translation provider (for
        example, DeepL).
      </>
    ),
  },
  {
    question: "Can I change the keyboard shortcut?",
    answer:
      "Yes. In the configuration window you can choose the key combination that best fits your applications and games.",
  },
  {
    question: "Will it work with my usual applications and websites?",
    answer:
      "ScreensTranslate Pro is designed to work on top of any visible window: productivity apps, browsers, video players, games, PDFs and more.",
  },
  {
    question: "What happens if I reinstall Windows or change computer?",
    answer: (
      <>
        Your Pro license can be active on several devices at the same time (by
        default up to 3). If you reinstall Windows or switch to a new PC, just
        install ScreensTranslate Pro, enter your key and it will use one of
        those slots. If you ever reach the device limit and need to free old
        activations, contact support and we&apos;ll help you adjust them.
      </>
    ),
  },
];

const faqJsonLdEn = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need an account to use ScreensTranslate Pro?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. The Basic plan is designed to be used without a mandatory account. For the Pro plan you only need a license key to activate ScreensTranslate Pro.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Basic and Pro?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Basic includes a limited number of translations per day and is aimed at occasional use. Pro is designed for daily use, with more capacity and advanced features.",
      },
    },
    {
      "@type": "Question",
      name: "Does ScreensTranslate Pro send my screenshots to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The capture is processed on your machine to extract the text. Only the recognized text may be sent to the configured translation provider (for example, DeepL).",
      },
    },
    {
      "@type": "Question",
      name: "Can I change the keyboard shortcut?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. In the configuration window you can choose the key combination that best fits your applications and games.",
      },
    },
    {
      "@type": "Question",
      name: "Will it work with my usual applications and websites?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ScreensTranslate Pro is designed to work on top of any visible window: productivity apps, browsers, video players, games, PDFs and more.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I reinstall Windows or change computer?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Your Pro license can be active on several devices at the same time (by default up to 3). If you reinstall Windows or switch to a new PC, just install ScreensTranslate Pro, enter your key and it will use one of those slots. If you ever reach the device limit and need to free old activations, contact support and we&apos;ll help you adjust them.",
      },
    },
  ],
} as const;

export const metadata: Metadata = {
  title: "ScreensTranslate Pro – Frequently Asked Questions",
  description:
    "Answers to the most common questions about ScreensTranslate Pro: installation, licenses, screenshot privacy and daily use on Windows.",
  alternates: {
    canonical: "/en/faq",
    languages: {
      "en-US": "/en/faq",
      "es-ES": "/faq",
      "fr-FR": "/fr/faq",
    },
  },
};

export default function FAQPageEn() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-16 space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          FAQ
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Frequently Asked Questions
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          We answer the most common questions about installing, licensing and
          using <Brand withPro /> every day.
        </p>
      </header>

      <section className="space-y-4">
        {faqs.map((item) => (
          <article
            key={item.question}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm"
          >
            <h2 className="mb-1 text-[14px] font-semibold text-slate-100">
              {item.question}
            </h2>
            <p className="text-[13px] leading-relaxed text-slate-300">
              {item.answer}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 space-y-3 border-t border-slate-800 pt-6 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          Try it with your own content
        </h2>
        <p>
          The best way to answer questions is to use <Brand withPro /> on the
          documents, applications and websites you work with every day. In a few
          minutes you&apos;ll see if it fits your workflow.
        </p>
        <div className="pt-1">
          <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
            Download ScreensTranslate Pro for Windows
          </button>
        </div>
        <div className="space-y-2 text-xs text-slate-400">
          <p className="font-medium text-slate-300">
            Related resources:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Link href="/en/pricing">See ScreensTranslate Pro plans</Link>
            </li>
            <li>
              <a
                href="/guias/como-traducir-texto-en-pantalla-windows-11"
                className="text-cyan-300 hover:text-cyan-200"
              >
                How to translate on-screen text in Windows 11 (guide in Spanish)
              </a>
            </li>
            <li>
              <a
                href="/guias/como-traducir-captura-de-pantalla-a-texto"
                className="text-cyan-300 hover:text-cyan-200"
              >
                How to translate a screenshot to text (guide in Spanish)
              </a>
            </li>
          </ul>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLdEn) }}
      />
    </div>
  );
}
