export function SeoSoftwareJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ScreensTranslate Pro",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Windows",
    url: "https://screenstranslate.com",
    description:
      "ScreensTranslate Pro captura una región de tu pantalla, reconoce el texto (OCR) y lo traduce en tiempo real con un overlay limpio y configurable.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      category: "Free",
      description:
        "Plan Basic gratuito con opción de actualizar a Pro para uso intensivo.",
    },
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
