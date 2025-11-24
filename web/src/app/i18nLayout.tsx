"use client";

import { usePathname } from "next/navigation";

type Locale = "es" | "en" | "fr";

type NavTexts = {
  home: string;
  howItWorks: string;
  features: string;
  pricing: string;
  faq: string;
  ctaDownload: string;
};

type FooterTexts = {
  privacy: string;
  terms: string;
  support: string;
  guideScreenText: string;
  guideScreenshot: string;
};

export type LayoutTexts = {
  locale: Locale;
  nav: NavTexts;
  footer: FooterTexts;
};

function detectLocale(pathname: string): Locale {
  const first = pathname.split("/")[1];
  if (first === "en" || first === "fr") return first;
  return "es";
}

function getTexts(locale: Locale): LayoutTexts {
  if (locale === "en") {
    return {
      locale,
      nav: {
        home: "Home",
        howItWorks: "How it works",
        features: "Features",
        pricing: "Pricing",
        faq: "FAQ",
        ctaDownload: "Download for Windows",
      },
      footer: {
        privacy: "Privacy policy",
        terms: "Terms of use",
        support: "Support",
        guideScreenText: "Guide: translate on-screen text",
        guideScreenshot: "Guide: translate screenshot to text",
      },
    };
  }

  if (locale === "fr") {
    return {
      locale,
      nav: {
        home: "Accueil",
        howItWorks: "Comment ça marche",
        features: "Fonctionnalités",
        pricing: "Tarifs",
        faq: "FAQ",
        ctaDownload: "Télécharger pour Windows",
      },
      footer: {
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
        support: "Support",
        guideScreenText: "Guide : traduire le texte à l'écran",
        guideScreenshot: "Guide : traduire une capture en texte",
      },
    };
  }

  // Español por defecto
  return {
    locale,
    nav: {
      home: "Inicio",
      howItWorks: "Cómo funciona",
      features: "Características",
      pricing: "Planes",
      faq: "FAQ",
      ctaDownload: "Descargar para Windows",
    },
    footer: {
      privacy: "Política de privacidad",
      terms: "Términos de uso",
      support: "Soporte",
      guideScreenText: "Guía: traducir texto en pantalla",
      guideScreenshot: "Guía: traducir captura a texto",
    },
  };
}

export function useLayoutTexts(): LayoutTexts {
  const pathname = usePathname() || "/";
  const locale = detectLocale(pathname);
  return getTexts(locale);
}
