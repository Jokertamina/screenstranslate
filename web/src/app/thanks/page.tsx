import type { Metadata } from "next";
import { Brand } from "../Brand";
import { getLicenseForSession } from "../lib/getLicenseForSession";
import { CopyLicenseButton } from "../CopyLicenseButton";
import { CleanSessionQuery } from "../CleanSessionQuery";

export const metadata: Metadata = {
  title: "Gracias por tu suscripción a ScreensTranslate Pro",
  description:
    "Confirmación de pago para ScreensTranslate Pro, instrucciones básicas para activar la licencia en Windows y acceso al futuro panel de licencias.",
  alternates: {
    canonical: "/thanks",
    languages: {
      "es-ES": "/thanks",
      "en-US": "/en/thanks",
      "fr-FR": "/fr/thanks",
    },
  },
};

type ThanksPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const { session_id } = await searchParams;
  const hasSession = Boolean(session_id);
  const license = await getLicenseForSession(session_id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <CleanSessionQuery />
      
      <header className="space-y-3">
        <p className="text-[20px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          ¡Gracias por tu compra!
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Suscripción a <Brand withPro /> confirmada
        </h1>
        <div className="mb-4 rounded-xl border border-cyan-500/60 bg-cyan-500/10 px-4 py-3 text-[13px] text-cyan-100">
        <p className="text-[16px] font-semibold uppercase tracking-[0.18em] text-cyan-100/90">
          Importante
        </p>
        <p className="mt-1">
          Lee con atención esta página y guarda tu clave de licencia. La
          necesitarás para activar ScreensTranslate Pro en Windows y para
          acceder al panel de licencias.
        </p>
      </div>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Tu pago se ha procesado correctamente. Hemos creado una licencia Pro
          asociada a tu suscripción de Stripe. En la aplicación de Windows
          podrás introducir tu clave de licencia para activar todas las
          funcionalidades y también usarla para acceder al panel de licencias
          en esta web.
        </p>
        {hasSession && (
          <div className="mt-4 rounded-xl border border-cyan-500/40 bg-slate-900/60 px-4 py-3 text-sm">
            {license ? (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                  Tu clave de licencia
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <p className="font-mono text-lg text-cyan-100">
                    {license.license_key}
                  </p>
                  <CopyLicenseButton value={license.license_key} />
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  Guárdala en un lugar seguro. La necesitarás para activar la
                  aplicación y para consultar tu licencia en el panel.
                </p>
              </>
            ) : (
              <p className="text-[11px] text-slate-400">
                Estamos terminando de registrar tu licencia. Si no aparece en
                unos segundos, vuelve a abrir esta página desde el enlace de
                confirmación de Stripe.
              </p>
            )}
          </div>
        )}
      </header>

      <section className="space-y-3 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">
          ¿Qué hacer a partir de ahora?
        </h2>
        <ol className="list-decimal space-y-2 pl-4">
          <li>
            Descarga e instala <Brand withPro /> para Windows desde la página
            principal.
          </li>
          <li>
            Cuando abras la aplicación, ve a la sección de licencia e introduce
            la clave que ves arriba (puedes copiarla con el botón de copiar) o
            pégala desde el portapapeles.
          </li>
          <li>
            Si alguna vez pierdes tu clave, podrás consultarla en el panel de
            licencias de esta misma web utilizando esa misma clave para acceder.
          </li>
        </ol>
      </section>

      <section className="space-y-4 rounded-2xl border border-cyan-500/40 bg-cyan-500/5 px-4 py-4 text-[13px] leading-relaxed text-slate-100">
        <h2 className="text-sm font-semibold text-slate-100">
          Panel de licencias
        </h2>
        <p>
          Con la clave que acabas de recibir podrás acceder al panel de
          licencias. Allí podrás ver el estado de tu licencia, cuántos
          dispositivos tienes activados y abrir el portal de Stripe para cambiar
          tu método de pago o cancelar la suscripción.
        </p>
        <div>
          <a
            href="/panel"
            className="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-5 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-500/10"
          >
            Ir al panel de licencias
          </a>
        </div>
      </section>
    </div>
  );
}
