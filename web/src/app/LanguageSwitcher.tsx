"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const locales = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
] as const;

type Locale = (typeof locales)[number]["code"];

function getCurrentLocale(pathname: string): Locale {
  const first = pathname.split("/")[1];
  if (first === "en" || first === "fr") return first;
  return "es";
}

function buildHref(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  const first = segments[1];
  const isLocalized = first === "en" || first === "fr";

  if (target === "es") {
    if (isLocalized) {
      const rest = "/" + segments.slice(2).join("/");
      return rest === "/" ? "/" : rest;
    }
    return pathname || "/";
  }

  if (isLocalized) {
    segments[1] = target;
    const joined = segments.join("/");
    return joined === "" ? "/" : joined;
  }

  return `/${target}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const current = getCurrentLocale(pathname);

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/60 px-1 py-[2px] text-[11px]">
      {locales.map((locale) => {
        const href = buildHref(pathname, locale.code);
        const active = locale.code === current;
        return (
          <Link
            key={locale.code}
            href={href}
            className={
              "rounded-full px-2 py-[2px] transition " +
              (active
                ? "bg-cyan-400 text-slate-950"
                : "text-slate-300 hover:text-white hover:bg-slate-800")
            }
          >
            {locale.label}
          </Link>
        );
      })}
    </div>
  );
}
