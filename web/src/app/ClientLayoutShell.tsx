"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useState } from "react";
import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LocaleLink } from "./LocaleLink";
import { useLayoutTexts } from "./i18nLayout";
import { DownloadButton } from "./DownloadButton";

export function ClientLayoutShell({ children }: { children: ReactNode }) {
  const texts = useLayoutTexts();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700/70 bg-slate-900/80 text-slate-200 hover:bg-slate-800 md:hidden"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span className="sr-only">Menú</span>
              <div className="space-y-0.5">
                <span
                  className={`block h-0.5 w-4 rounded bg-current transition-transform ${
                    isMobileMenuOpen ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 rounded bg-current transition-opacity ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 rounded bg-current transition-transform ${
                    isMobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>

            <div className="flex items-center gap-2">
              <Image
                src="/logo-screenstranslate.svg"
                alt="ScreensTranslate Pro logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg"
                priority
              />
              <span className="text-sm font-semibold tracking-tight">
                <Brand withPro />
              </span>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-200 md:flex">
            <LocaleLink href="/" className="hover:text-white">
              {texts.nav.home}
            </LocaleLink>
            <LocaleLink
              href="/como-funciona"
              className="hover:text-white"
            >
              {texts.nav.howItWorks}
            </LocaleLink>
            <LocaleLink
              href="/caracteristicas"
              className="hover:text-white"
            >
              {texts.nav.features}
            </LocaleLink>
            <LocaleLink href="/pricing" className="hover:text-white">
              {texts.nav.pricing}
            </LocaleLink>
            <LocaleLink href="/faq" className="hover:text-white">
              {texts.nav.faq}
            </LocaleLink>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <DownloadButton variant="nav" />
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <nav className="border-b border-white/5 bg-slate-950/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-sm text-slate-200">
            <LocaleLink
              href="/"
              className="py-1 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {texts.nav.home}
            </LocaleLink>
            <LocaleLink
              href="/como-funciona"
              className="py-1 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {texts.nav.howItWorks}
            </LocaleLink>
            <LocaleLink
              href="/caracteristicas"
              className="py-1 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {texts.nav.features}
            </LocaleLink>
            <LocaleLink
              href="/pricing"
              className="py-1 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {texts.nav.pricing}
            </LocaleLink>
            <LocaleLink
              href="/faq"
              className="py-1 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {texts.nav.faq}
            </LocaleLink>
          </div>
        </nav>
      )}

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/5 bg-slate-950/90 py-6 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-4 md:flex-row lg:px-6">
          <span>
            © {new Date().getFullYear()} <Brand withPro />
          </span>
          <div className="flex flex-wrap gap-4 text-[11px]">
            <a href="#" className="hover:text-slate-300">
              {texts.footer.privacy}
            </a>
            <a href="#" className="hover:text-slate-300">
              {texts.footer.terms}
            </a>
            <a href="#" className="hover:text-slate-300">
              {texts.footer.support}
            </a>
            <LocaleLink
              href="/guias/como-traducir-texto-en-pantalla-windows-11"
              className="hover:text-slate-300"
            >
              {texts.footer.guideScreenText}
            </LocaleLink>
            <LocaleLink
              href="/guias/como-traducir-captura-de-pantalla-a-texto"
              className="hover:text-slate-300"
            >
              {texts.footer.guideScreenshot}
            </LocaleLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
