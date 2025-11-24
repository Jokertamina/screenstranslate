"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Locale = "es" | "en" | "fr";

type Props = {
  href: string; // ruta base sin prefijo de idioma, por ejemplo "/pricing"
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

function getCurrentLocale(pathname: string): Locale {
  const first = pathname.split("/")[1];
  if (first === "en" || first === "fr") return first;
  return "es";
}

function applyLocale(baseHref: string, locale: Locale): string {
  if (!baseHref.startsWith("/")) {
    baseHref = "/" + baseHref;
  }

  if (locale === "es") {
    return baseHref;
  }

  if (baseHref === "/") {
    return `/${locale}`;
  }

  return `/${locale}${baseHref}`;
}

export function LocaleLink({ href, children, className, onClick }: Props) {
  const pathname = usePathname() || "/";
  const locale = getCurrentLocale(pathname);
  const targetHref = applyLocale(href, locale);

  return (
    <Link href={targetHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
