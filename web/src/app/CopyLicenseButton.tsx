"use client";

import { useState } from "react";

type CopyLicenseButtonProps = {
  value: string;
};

export function CopyLicenseButton({ value }: CopyLicenseButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Si falla el portapapeles, no hacemos nada especial
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/60 text-xs text-cyan-100 hover:bg-cyan-500/10"
      aria-label={copied ? "Licencia copiada" : "Copiar licencia"}
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path
            d="M4 10.5L8 14.5L16 5.5"
            className="fill-none stroke-current"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <rect
            x="4"
            y="4"
            width="9"
            height="9"
            rx="1"
            className="fill-none stroke-current"
            strokeWidth="1.4"
          />
          <rect
            x="7"
            y="7"
            width="9"
            height="9"
            rx="1"
            className="fill-none stroke-current"
            strokeWidth="1.4"
          />
        </svg>
      )}
    </button>
  );
}
