import type { Metadata } from "next";
import { Brand } from "../../Brand";
import { getLicenseForSession } from "../../lib/getLicenseForSession";
import { CopyLicenseButton } from "../../CopyLicenseButton";
import { CleanSessionQuery } from "../../CleanSessionQuery";

export const metadata: Metadata = {
  title: "Thank you for your ScreensTranslate Pro subscription",
  description:
    "Payment confirmation for ScreensTranslate Pro, basic instructions to activate your license on Windows and access the license panel.",
  alternates: {
    canonical: "/en/thanks",
    languages: {
      "en-US": "/en/thanks",
      "es-ES": "/thanks",
      "fr-FR": "/fr/thanks",
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

type ThanksPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function ThanksPageEn({
  searchParams,
}: ThanksPageProps) {
  const { session_id } = await searchParams;
  const hasSession = Boolean(session_id);
  const license = await getLicenseForSession(session_id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16 space-y-8">
      <CleanSessionQuery />

      <header className="space-y-3">
        <p className="text-[20px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Thank you for your purchase
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
          Subscription to <Brand withPro /> confirmed
        </h1>
        <div className="mb-4 rounded-xl border border-cyan-500/60 bg-cyan-500/10 px-4 py-3 text-[13px] text-cyan-100">
          <p className="text-[16px] font-semibold uppercase tracking-[0.18em] text-cyan-100/90">
            Important
          </p>
          <p className="mt-1">
            Please read this page carefully and keep your license key. You&apos;ll
            need it to activate ScreensTranslate Pro on Windows and to access
            the license panel.
          </p>
        </div>
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-200">
          Your payment has been processed successfully. We&apos;ve created a Pro
          license linked to your Stripe subscription. In the Windows app you can
          enter your license key to unlock all features and also use it to
          access the license panel on this website.
        </p>
        {hasSession && (
          <div className="mt-4 rounded-xl border border-cyan-500/40 bg-slate-900/60 px-4 py-3 text-sm">
            {license ? (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                  Your license key
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <p className="font-mono text-lg text-cyan-100">
                    {license.license_key}
                  </p>
                  <CopyLicenseButton value={license.license_key} />
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  Store it in a safe place. You&apos;ll need it to activate the app
                  and to look up your license in the panel.
                </p>
              </>
            ) : (
              <p className="text-[11px] text-slate-400">
                We&apos;re finishing the registration of your license. If it doesn&apos;t
                appear within a few seconds, open this page again from the
                Stripe confirmation link.
              </p>
            )}
          </div>
        )}
      </header>

      <section className="space-y-3 text-[13px] leading-relaxed text-slate-300">
        <h2 className="text-sm font-semibold text-slate-100">What to do next</h2>
        <ol className="list-decimal space-y-2 pl-4">
          <li>
            Download and install <Brand withPro /> for Windows from the
            homepage.
          </li>
          <li>
            When you open the app, go to the license section and enter the key
            you see above (you can copy it with the copy button) or paste it
            from the clipboard.
          </li>
          <li>
            If you ever lose your key, you&apos;ll be able to look it up in the
            license panel on this website using that same key to access it.
          </li>
        </ol>
      </section>

      <section className="space-y-4 rounded-2xl border border-cyan-500/40 bg-cyan-500/5 px-4 py-4 text-[13px] leading-relaxed text-slate-100">
        <h2 className="text-sm font-semibold text-slate-100">License panel</h2>
        <p>
          With the key you have just received you&apos;ll be able to access the
          license panel. There you can see the status of your license, how many
          devices you have activated and open the Stripe portal to change your
          payment method or cancel your subscription.
        </p>
        <div>
          <a
            href="/en/panel"
            className="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-5 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-500/10"
          >
            Go to the license panel
          </a>
        </div>
      </section>
    </div>
  );
}
