"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

type LicenseInfo = {
  license_key: string;
  plan: string;
  status: string;
  created_at: string;
  max_devices: number | null;
  payment_provider?: string | null;
  payment_reference?: string | null;
};

export function LicensePanelClient() {
  const [licenseKey, setLicenseKey] = useState("");
  const [license, setLicense] = useState<LicenseInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // Oculta automáticamente los mensajes de error después de 15 segundos
  useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => {
      setError(null);
    }, 15000);
    return () => clearTimeout(id);
  }, [error]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const key = licenseKey.trim();
    if (!key) {
      setError("Introduce tu clave de licencia.");
      setLicense(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/license", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ license_key: key }),
      });

      if (res.status === 404) {
        setLicense(null);
        setError("No hemos encontrado ninguna licencia con esa clave.");
        return;
      }

      if (!res.ok) {
        setLicense(null);
        setError(
          "Ha ocurrido un error al buscar tu licencia. Inténtalo de nuevo más tarde.",
        );
        return;
      }

      const data = (await res.json()) as { license: LicenseInfo };
      setLicense(data.license);
    } catch {
      setLicense(null);
      setError(
        "No se ha podido contactar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleManageSubscription() {
    const key = licenseKey.trim();
    if (!key) {
      setError("Introduce primero tu clave de licencia.");
      return;
    }

    setPortalLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/license/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ license_key: key }),
      });

      if (res.status === 404) {
        setError(
          "No hemos encontrado una suscripción activa asociada a esta licencia.",
        );
        return;
      }

      if (!res.ok) {
        setError(
          "No se ha podido abrir el portal de suscripción. Inténtalo de nuevo más tarde.",
        );
        return;
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("La respuesta del portal de suscripción no es válida.");
      }
    } catch {
      setError("No se ha podido abrir el portal de suscripción.");
    } finally {
      setPortalLoading(false);
    }
  }

  async function handleDeleteConfirmed() {
    const key = licenseKey.trim();
    if (!key) {
      setError(
        "Introduce primero tu clave de licencia para poder eliminar tus datos.",
      );
      setConfirmingDelete(false);
      return;
    }

    setDeleteLoading(true);
    setError(null);
    setDeleteMessage(null);

    try {
      const res = await fetch("/api/license/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ license_key: key }),
      });

      const data = (await res.json()) as { error?: string };

      if (res.status === 400 && data.error === "SUBSCRIPTION_ACTIVE") {
        setError(
          "Tu suscripción sigue activa. Primero cancélala desde 'Gestionar suscripción y facturas' y, después, vuelve aquí para eliminar tus datos.",
        );
        return;
      }

      if (!res.ok) {
        setError(
          "No se han podido eliminar tus datos en este momento. Inténtalo de nuevo más tarde.",
        );
        return;
      }

      setLicense(null);
      setLicenseKey("");
      setDeleteMessage(
        "Hemos eliminado tu licencia y los dispositivos asociados de ScreensTranslate. Puedes conservar tus justificantes de pago en Stripe.",
      );
    } catch {
      setError(
        "No se ha podido contactar con el servidor para eliminar tus datos.",
      );
    } finally {
      setDeleteLoading(false);
      setConfirmingDelete(false);
    }
  }

  function formatDate(iso: string) {
    try {
      return new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case "active":
        return "activa";
      case "revoked":
        return "desactivada";
      default:
        return status;
    }
  }

  function getStatusClasses(status: string) {
    const base =
      "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium";

    switch (status) {
      case "active":
        return `${base} bg-emerald-500/15 text-emerald-200 border border-emerald-400/60`;
      case "revoked":
        return `${base} bg-rose-500/15 text-rose-200 border border-rose-400/60`;
      default:
        return `${base} bg-slate-800 text-slate-100`;
    }
  }

  return (
    <section className="space-y-4 text-[13px] leading-relaxed text-slate-300">
      <h2 className="text-sm font-semibold text-slate-100">Consulta tu licencia</h2>
      <p>
        Pega la clave de licencia que has recibido en la página de gracias para
        ver los detalles de tu licencia y gestionar tu suscripción.
      </p>

      <form onSubmit={handleSubmit} className="mt-2 space-y-3">
        <label className="block text-xs font-medium text-slate-300">
          Clave de licencia
          <input
            type="text"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
          <span>
            Solo tú conoces esta clave. Pégala desde el portapapeles para evitar
            errores.
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-5 py-2 text-xs font-medium text-cyan-100 hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:border-slate-600 disabled:text-slate-400"
        >
          {loading ? "Buscando licencia..." : "Ver detalles de la licencia"}
        </button>
      </form>

      {error && (
        <div className="mt-2 rounded-md border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
          {error}
        </div>
      )}
      {deleteMessage && !error && (
        <div className="mt-2 rounded-md border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-100">
          {deleteMessage}
        </div>
      )}

      {license && (
        <div className="mt-4 space-y-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                Detalles de la licencia
              </p>
              <p className="mt-1 font-mono text-sm text-cyan-100">
                {license.license_key}
              </p>
            </div>
            <span className={getStatusClasses(license.status)}>
              Estado: {getStatusLabel(license.status)}
            </span>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-[12px] sm:grid-cols-2">
            <div>
              <dt className="text-slate-400">Plan</dt>
              <dd className="text-slate-100 capitalize">{license.plan}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Creada</dt>
              <dd className="text-slate-100">{formatDate(license.created_at)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Dispositivos máximos</dt>
              <dd className="text-slate-100">
                {license.max_devices ?? "Sin límite específico"}
              </dd>
            </div>
          </dl>

          <div className="mt-4 space-y-2 border-t border-slate-800 pt-3 text-[15px]">
            <button
              type="button"
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none"
            >
              {portalLoading
                ? "Abriendo portal de suscripción..."
                : "Gestionar suscripción y facturas"}
            </button>

            <p className="mt-3 text-slate-300">
              Desde aquí accederás al portal seguro de Stripe para cambiar tu
              método de pago, revisar tus facturas o cancelar tu suscripción
              cuando quieras. ScreensTranslate no almacena los datos de tu
              tarjeta.
            </p>
          </div>

          <div className="mt-4 space-y-2 border-t border-slate-800 pt-3 text-[12px]">
            <p className="text-slate-400">
              Si ya has cancelado tu suscripción y solo quieres que eliminemos
              tus datos de ScreensTranslate, puedes hacerlo desde aquí.
            </p>
            <button
              type="button"
              onClick={() => {
                const key = licenseKey.trim();
                if (!key) {
                  setError(
                    "Introduce primero tu clave de licencia para poder eliminar tus datos.",
                  );
                  return;
                }
                setConfirmingDelete(true);
                setError(null);
                setDeleteMessage(null);
              }}
              disabled={deleteLoading}
              className="inline-flex items-center justify-center rounded-full border border-rose-500/70 px-5 py-2 text-xs font-medium text-rose-200 hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:border-slate-600 disabled:text-slate-400"
            >
              {deleteLoading
                ? "Eliminando datos..."
                : "Eliminar mis datos de ScreensTranslate"}
            </button>
          </div>
        </div>
      )}
      {confirmingDelete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70">
          <div className="w-full max-w-md rounded-2xl border border-rose-500/60 bg-slate-900 px-5 py-6 text-[13px] shadow-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-300">
              Confirmar eliminación de datos
            </p>
            <p className="mt-3 text-slate-100">
              Esta acción eliminará tu licencia y todas las activaciones
              asociadas en ScreensTranslate.
            </p>
            <p className="mt-2 text-[12px] text-slate-400">
              Asegúrate de que ya has cancelado tu suscripción desde
              "Gestionar suscripción y facturas". Tus justificantes de pago y
              facturas seguirán disponibles en tu cuenta de Stripe.
            </p>
            <div className="mt-5 flex justify-end gap-3 text-[12px]">
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                disabled={deleteLoading}
                className="inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-1.5 text-xs font-medium text-slate-950 shadow-lg shadow-rose-500/40 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none"
              >
                {deleteLoading ? "Eliminando datos..." : "Sí, eliminar mis datos"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
