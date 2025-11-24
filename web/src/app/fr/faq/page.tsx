import type { Metadata } from "next";
import { Brand } from "../../Brand";

const faqs = [
  {
    question: "Ai-je besoin d'un compte pour utiliser ScreensTranslate Pro ?",
    answer: (
      <>
        Non. Le plan Basic est conçu pour être utilisé sans compte obligatoire.
        Pour le plan Pro, vous aurez seulement besoin d'une clé de licence pour
        activer <Brand withPro />.
      </>
    ),
  },
  {
    question: "Quelle est la différence entre Basic et Pro ?",
    answer:
      "Basic inclut un nombre limité de traductions par jour et convient à un usage occasionnel. Pro est pensé pour un usage quotidien, avec plus de capacité et des fonctionnalités avancées.",
  },
  {
    question: "ScreensTranslate Pro envoie-t-il mes captures sur un serveur ?",
    answer: (
      <>
        La capture est traitée sur votre ordinateur pour extraire le texte. Seul
        le texte reconnu peut être envoyé au fournisseur de traduction
        configuré (par exemple DeepL).
      </>
    ),
  },
  {
    question: "Puis-je changer le raccourci clavier ?",
    answer:
      "Oui. Dans la fenêtre de configuration, vous pouvez choisir la combinaison de touches qui s'adapte le mieux à vos applications et jeux.",
  },
  {
    question: "Fonctionnera-t-il avec mes applications et sites habituels ?",
    answer:
      "ScreensTranslate Pro est conçu pour fonctionner au-dessus de n'importe quelle fenêtre visible : applications de productivité, navigateurs, lecteurs vidéo, jeux, PDFs et plus encore.",
  },
  {
    question: "Que se passe-t-il si je réinstalle Windows ou change d'ordinateur ?",
    answer:
      "Votre licence Pro est associée à un appareil. Si vous changez de machine, vous pourrez gérer les activations depuis le futur panneau web ou en contactant le support.",
  },
];

const faqJsonLdFr = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ai-je besoin d'un compte pour utiliser ScreensTranslate Pro ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Non. Le plan Basic est conçu pour être utilisé sans compte obligatoire. Pour le plan Pro, vous aurez seulement besoin d'une clé de licence pour activer ScreensTranslate Pro.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence entre Basic et Pro ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Basic inclut un nombre limité de traductions par jour et convient à un usage occasionnel. Pro est pensé pour un usage quotidien, avec plus de capacité et des fonctionnalités avancées.",
      },
    },
    {
      "@type": "Question",
      name: "ScreensTranslate Pro envoie-t-il mes captures sur un serveur ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "La capture est traitée sur votre ordinateur pour extraire le texte. Seul le texte reconnu peut être envoyé au fournisseur de traduction configuré (par exemple DeepL).",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je changer le raccourci clavier ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Oui. Dans la fenêtre de configuration, vous pouvez choisir la combinaison de touches qui s'adapte le mieux à vos applications et jeux.",
      },
    },
    {
      "@type": "Question",
      name: "Fonctionnera-t-il avec mes applications et sites habituels ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ScreensTranslate Pro est conçu pour fonctionner au-dessus de n'importe quelle fenêtre visible : applications de productivité, navigateurs, lecteurs vidéo, jeux, PDFs et plus encore.",
      },
    },
    {
      "@type": "Question",
      name: "Que se passe-t-il si je réinstalle Windows ou change d'ordinateur ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Votre licence Pro est associée à un appareil. Si vous changez de machine, vous pourrez gérer les activations depuis le futur panneau web ou en contactant le support.",
      },
    },
  ],
} as const;

export const metadata: Metadata = {
  title: "Questions fréquentes sur ScreensTranslate Pro",
  description:
    "Nous répondons aux questions les plus fréquentes sur ScreensTranslate Pro : installation, licences, confidentialité des captures et usage quotidien sous Windows.",
  alternates: {
    canonical: "/fr/faq",
    languages: {
      "fr-FR": "/fr/faq",
      "es-ES": "/faq",
      "en-US": "/en/faq",
    },
  },
};

export default function FAQFr() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 lg:py-16 space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          FAQ
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Questions fréquentes
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Nous répondons aux questions les plus courantes sur l'installation,
          les licences et l'utilisation quotidienne de <Brand withPro />.
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
          Testez-le avec vos propres contenus
        </h2>
        <p>
          La meilleure façon de répondre aux questions est d'utiliser <Brand
            withPro
          /> sur les documents, applications et sites que vous utilisez chaque
          jour. En quelques minutes, vous verrez s'il s'intègre à votre flux de
          travail.
        </p>
        <div className="pt-1">
          <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
            Télécharger ScreensTranslate Pro pour Windows
          </button>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLdFr) }}
      />
    </div>
  );
}
