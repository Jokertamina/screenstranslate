import type { Metadata } from "next";
import { Brand } from "../../Brand";
import { LicensePanelClientEn } from "../../panel/LicensePanelClientEn";

export const metadata: Metadata = {
  title: "ScreensTranslate Pro license panel",
  description:
    "License panel for ScreensTranslate Pro. Check your license status and open the Stripe portal to manage your subscription.",
  alternates: {
    canonical: "/en/panel",
    languages: {
      "en-US": "/en/panel",
      "es-ES": "/panel",
      "fr-FR": "/fr/panel",
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PanelPageEn() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          License panel
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          <Brand withPro /> licenses
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          From this panel you can check the status of your ScreensTranslate Pro
          license and open the Stripe portal to manage your subscription. You
          just need the key you received on the confirmation page.
        </p>
      </header>

      <LicensePanelClientEn />
    </div>
  );
}
