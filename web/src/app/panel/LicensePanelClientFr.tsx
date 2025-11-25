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

export function LicensePanelClientFr() {
  const [licenseKey, setLicenseKey] = useState("");
  const [license, setLicense] = useState<LicenseInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // Masquer automatiquement les erreurs après 15 secondes
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
      setError("Saisissez votre clé de licence.");
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
        setError("Aucune licence trouvée avec cette clé.");
        return;
      }

      if (!res.ok) {
        setLicense(null);
        setError(
          "Une erreur s’est produite lors de la recherche de votre licence. Veuillez réessayer plus tard.",
        );
        return;
      }

      const data = (await res.json()) as { license: LicenseInfo };
      setLicense(data.license);
    } catch {
      setLicense(null);
      setError(
        "Impossible de contacter le serveur. Vérifiez votre connexion puis réessayez.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleManageSubscription() {
    const key = licenseKey.trim();
    if (!key) {
      setError("Saisissez d’abord votre clé de licence.");
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
          "Aucun abonnement actif n’a été trouvé pour cette licence.",
        );
        return;
      }

      if (!res.ok) {
        setError(
          "Impossible d’ouvrir le portail d’abonnement. Veuillez réessayer plus tard.",
        );
        return;
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("La réponse du portail d’abonnement n’est pas valide.");
      }
    } catch {
      setError("Impossible d’ouvrir le portail d’abonnement.");
    } finally {
      setPortalLoading(false);
    }
  }

  async function handleDeleteConfirmed() {
    const key = licenseKey.trim();
    if (!key) {
      setError(
        "Saisissez d’abord votre clé de licence pour que nous puissions supprimer vos données.",
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
          "Votre abonnement est toujours actif. Annulez-le d’abord depuis ‘Gérer l’abonnement et les factures’, puis revenez ici pour supprimer vos données.",
        );
        return;
      }

      if (!res.ok) {
        setError(
          "Impossible de supprimer vos données pour le moment. Veuillez réessayer plus tard.",
        );
        return;
      }

      setLicense(null);
      setLicenseKey("");
      setDeleteMessage(
        "Nous avons supprimé votre licence et les appareils associés de ScreensTranslate. Vous pouvez conserver vos justificatifs de paiement dans Stripe.",
      );
    } catch {
      setError(
        "Impossible de contacter le serveur pour supprimer vos données.",
      );
    } finally {
      setDeleteLoading(false);
      setConfirmingDelete(false);
    }
  }

  function formatDate(iso: string) {
    try {
      return new Intl.DateTimeFormat("fr-FR", {
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
        return "active";
      case "revoked":
        return "désactivée";
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
      <h2 className="text-sm font-semibold text-slate-100">
        Consulter votre licence
      </h2>
      <p>
        Collez la clé de licence reçue sur la page de remerciement pour voir les
        détails de votre licence et gérer votre abonnement.
      </p>

      <form onSubmit={handleSubmit} className="mt-2 space-y-3">
        <label className="block text-xs font-medium text-slate-300">
          Clé de licence
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
            Vous êtes la seule personne à connaître cette clé. Collez-la depuis
            le presse-papiers pour éviter les erreurs.
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-5 py-2 text-xs font-medium text-cyan-100 hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:border-slate-600 disabled:text-slate-400"
        >
          {loading ? "Recherche de la licence..." : "Voir les détails de la licence"}
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
                Détails de la licence
              </p>
              <p className="mt-1 font-mono text-sm text-cyan-100">
                {license.license_key}
              </p>
            </div>
            <span className={getStatusClasses(license.status)}>
              Statut : {getStatusLabel(license.status)}
            </span>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-[12px] sm:grid-cols-2">
            <div>
              <dt className="text-slate-400">Offre</dt>
              <dd className="text-slate-100 capitalize">{license.plan}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Créée le</dt>
              <dd className="text-slate-100">{formatDate(license.created_at)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Appareils maximum</dt>
              <dd className="text-slate-100">
                {license.max_devices ?? "Aucune limite spécifique"}
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
                ? "Ouverture du portail d’abonnement..."
                : "Gérer l’abonnement et les factures"}
            </button>

            <p className="mt-3 text-slate-300">
              Depuis ici, vous accéderez au portail sécurisé de Stripe pour
              modifier votre moyen de paiement, consulter vos factures ou
              annuler votre abonnement. ScreensTranslate ne stocke pas les
              données de votre carte bancaire.
            </p>
          </div>

          <div className="mt-4 space-y-2 border-t border-slate-800 pt-3 text-[12px]">
            <p className="text-slate-400">
              Si vous avez déjà annulé votre abonnement et souhaitez seulement
              que nous supprimions vos données de ScreensTranslate, vous pouvez
              le faire ici. Votre historique de paiements dans Stripe ne sera
              pas modifié.
            </p>
            <button
              type="button"
              onClick={() => {
                const key = licenseKey.trim();
                if (!key) {
                  setError(
                    "Saisissez d’abord votre clé de licence pour que nous puissions supprimer vos données.",
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
                ? "Suppression des données..."
                : "Supprimer mes données de ScreensTranslate"}
            </button>
          </div>
        </div>
      )}
      {confirmingDelete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70">
          <div className="w-full max-w-md rounded-2xl border border-rose-500/60 bg-slate-900 px-5 py-6 text-[13px] shadow-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-300">
              Confirmer la suppression des données
            </p>
            <p className="mt-3 text-slate-100">
              Cette action supprimera votre licence et toutes les activations
              associées dans ScreensTranslate.
            </p>
            <p className="mt-2 text-[12px] text-slate-400">
              Assurez-vous d’avoir déjà annulé votre abonnement depuis
              "Gérer l’abonnement et les factures". Vos justificatifs de
              paiement et factures resteront disponibles dans votre compte
              Stripe.
            </p>
            <div className="mt-5 flex justify-end gap-3 text-[12px]">
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                disabled={deleteLoading}
                className="inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-1.5 text-xs font-medium text-slate-950 shadow-lg shadow-rose-500/40 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none"
              >
                {deleteLoading
                  ? "Suppression des données..."
                  : "Oui, supprimer mes données"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
