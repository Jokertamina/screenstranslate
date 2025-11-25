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

export function LicensePanelClientEn() {
  const [licenseKey, setLicenseKey] = useState("");
  const [license, setLicense] = useState<LicenseInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // Auto-hide errors after 15 seconds
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
      setError("Please enter your license key.");
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
        setError("We couldn’t find any license with that key.");
        return;
      }

      if (!res.ok) {
        setLicense(null);
        setError(
          "An error occurred while searching for your license. Please try again later.",
        );
        return;
      }

      const data = (await res.json()) as { license: LicenseInfo };
      setLicense(data.license);
    } catch {
      setLicense(null);
      setError(
        "We couldn’t contact the server. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleManageSubscription() {
    const key = licenseKey.trim();
    if (!key) {
      setError("Enter your license key first.");
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
        setError("We couldn’t find an active subscription for this license.");
        return;
      }

      if (!res.ok) {
        setError(
          "We couldn’t open the subscription portal. Please try again later.",
        );
        return;
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("The response from the subscription portal is not valid.");
      }
    } catch {
      setError("We couldn’t open the subscription portal.");
    } finally {
      setPortalLoading(false);
    }
  }

  async function handleDeleteConfirmed() {
    const key = licenseKey.trim();
    if (!key) {
      setError("Enter your license key first so we can remove your data.");
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
          "Your subscription is still active. First cancel it from ‘Manage subscription and invoices’, then come back here to remove your data.",
        );
        return;
      }

      if (!res.ok) {
        setError(
          "We couldn’t remove your data at this moment. Please try again later.",
        );
        return;
      }

      setLicense(null);
      setLicenseKey("");
      setDeleteMessage(
        "We’ve removed your license and associated devices from ScreensTranslate. You can still keep your payment receipts in Stripe.",
      );
    } catch {
      setError(
        "We couldn’t contact the server to remove your data. Please try again.",
      );
    } finally {
      setDeleteLoading(false);
      setConfirmingDelete(false);
    }
  }

  function formatDate(iso: string) {
    try {
      return new Intl.DateTimeFormat("en-US", {
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
        return "disabled";
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
      <h2 className="text-sm font-semibold text-slate-100">Check your license</h2>
      <p>
        Paste the license key you received on the thank you page to see the
        details of your license and manage your subscription.
      </p>

      <form onSubmit={handleSubmit} className="mt-2 space-y-3">
        <label className="block text-xs font-medium text-slate-300">
          License key
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
            Only you know this key. Paste it from the clipboard to avoid
            typos.
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-5 py-2 text-xs font-medium text-cyan-100 hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:border-slate-600 disabled:text-slate-400"
        >
          {loading ? "Searching license..." : "View license details"}
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
                License details
              </p>
              <p className="mt-1 font-mono text-sm text-cyan-100">
                {license.license_key}
              </p>
            </div>
            <span className={getStatusClasses(license.status)}>
              Status: {getStatusLabel(license.status)}
            </span>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-[12px] sm:grid-cols-2">
            <div>
              <dt className="text-slate-400">Plan</dt>
              <dd className="text-slate-100 capitalize">{license.plan}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Created</dt>
              <dd className="text-slate-100">{formatDate(license.created_at)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Max devices</dt>
              <dd className="text-slate-100">
                {license.max_devices ?? "No specific limit"}
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
                ? "Opening subscription portal..."
                : "Manage subscription and invoices"}
            </button>

            <p className="mt-3 text-slate-300">
              From here you&apos;ll go to the secure Stripe portal to change your
              payment method, review your invoices or cancel your subscription.
              ScreensTranslate does not store your card details.
            </p>
          </div>

          <div className="mt-4 space-y-2 border-t border-slate-800 pt-3 text-[12px]">
            <p className="text-slate-400">
              If you&apos;ve already cancelled your subscription and just want us to
              remove your data from ScreensTranslate, you can do it here. Your
              payment history in Stripe will not be modified.
            </p>
            <button
              type="button"
              onClick={() => {
                const key = licenseKey.trim();
                if (!key) {
                  setError(
                    "Enter your license key first so we can remove your data.",
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
                ? "Removing data..."
                : "Delete my data from ScreensTranslate"}
            </button>
          </div>
        </div>
      )}
      {confirmingDelete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70">
          <div className="w-full max-w-md rounded-2xl border border-rose-500/60 bg-slate-900 px-5 py-6 text-[13px] shadow-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-300">
              Confirm data deletion
            </p>
            <p className="mt-3 text-slate-100">
              This action will delete your license and all associated
              activations from ScreensTranslate.
            </p>
            <p className="mt-2 text-[12px] text-slate-400">
              Make sure you&apos;ve already cancelled your subscription from
              "Manage subscription and invoices". Your payment receipts and
              invoices will remain available in your Stripe account.
            </p>
            <div className="mt-5 flex justify-end gap-3 text-[12px]">
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                disabled={deleteLoading}
                className="inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-1.5 text-xs font-medium text-slate-950 shadow-lg shadow-rose-500/40 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none"
              >
                {deleteLoading ? "Removing data..." : "Yes, delete my data"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
