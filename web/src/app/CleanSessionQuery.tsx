"use client";

import { useEffect } from "react";

export function CleanSessionQuery() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("session_id")) {
        url.searchParams.delete("session_id");
        window.history.replaceState(null, "", url.toString());
      }
    } catch {
      // Ignorar errores silenciosamente
    }
  }, []);

  return null;
}
