import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayoutShell } from "./ClientLayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScreensTranslate Pro – Traductor de texto en pantalla para Windows",
  description:
    "ScreensTranslate Pro captura una región de tu pantalla, reconoce el texto (OCR) y lo traduce en tiempo real con un overlay limpio y configurable.",
  metadataBase: new URL("https://screenstranslate.com"),
  keywords: [
    "ScreensTranslate Pro",
    "traductor de pantalla",
    "traducir texto en pantalla",
    "traducir imagen a texto",
    "OCR en pantalla",
    "traducir capturas de pantalla",
    "traductor para juegos",
    "traducir subtítulos de vídeo",
    "traducir PDF en pantalla",
    "traductor instantáneo para Windows",
  ],
  openGraph: {
    title: "ScreensTranslate Pro – Traductor de texto en pantalla para Windows",
    description:
      "Traduce en segundos el texto que ves en tu pantalla (juegos, vídeos, PDFs, webs o documentos) con un simple atajo de teclado.",
    url: "https://screenstranslate.com",
    siteName: "ScreensTranslate Pro",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </body>
    </html>
  );
}
