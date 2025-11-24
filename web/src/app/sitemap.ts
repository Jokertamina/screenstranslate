import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://screenstranslate.com";
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/como-funciona`,
      lastModified,
    },
    {
      url: `${baseUrl}/caracteristicas`,
      lastModified,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
    },
    {
      url: `${baseUrl}/guias/como-traducir-texto-en-pantalla-windows-11`,
      lastModified,
    },
    {
      url: `${baseUrl}/guias/como-traducir-captura-de-pantalla-a-texto`,
      lastModified,
    },
    // English versions
    {
      url: `${baseUrl}/en`,
      lastModified,
    },
    {
      url: `${baseUrl}/en/como-funciona`,
      lastModified,
    },
    {
      url: `${baseUrl}/en/caracteristicas`,
      lastModified,
    },
    {
      url: `${baseUrl}/en/pricing`,
      lastModified,
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified,
    },
    {
      url: `${baseUrl}/en/guias/como-traducir-texto-en-pantalla-windows-11`,
      lastModified,
    },
    {
      url: `${baseUrl}/en/guias/como-traducir-captura-de-pantalla-a-texto`,
      lastModified,
    },
    // French versions
    {
      url: `${baseUrl}/fr`,
      lastModified,
    },
    {
      url: `${baseUrl}/fr/como-funciona`,
      lastModified,
    },
    {
      url: `${baseUrl}/fr/caracteristicas`,
      lastModified,
    },
    {
      url: `${baseUrl}/fr/pricing`,
      lastModified,
    },
    {
      url: `${baseUrl}/fr/faq`,
      lastModified,
    },
    {
      url: `${baseUrl}/fr/guias/como-traducir-texto-en-pantalla-windows-11`,
      lastModified,
    },
    {
      url: `${baseUrl}/fr/guias/como-traducir-captura-de-pantalla-a-texto`,
      lastModified,
    },
  ];
}
