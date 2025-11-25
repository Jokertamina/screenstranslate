import type { Metadata } from "next";
import { Brand } from "../Brand";
import { LicensePanelClient } from "./LicensePanelClient";

export const metadata: Metadata = {
  title: "Panel de licencias de ScreensTranslate Pro",
  description:
    "Panel inicial de licencias para ScreensTranslate Pro. Próximamente podrás consultar tus licencias y su estado introduciendo tu clave.",
  alternates: {
    canonical: "/panel",
    languages: {
      "es-ES": "/panel",
      "en-US": "/en/panel",
      "fr-FR": "/fr/panel",
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PanelPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Panel de licencias
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Licencias de <Brand withPro />
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Desde este panel puedes consultar el estado de tu licencia de
          ScreensTranslate Pro y acceder al portal de Stripe para gestionar tu
          suscripción. Solo necesitas la clave que has recibido en la página de
          confirmación.
        </p>
      </header>

      <LicensePanelClient />
    </div>
  );
}
