"use client";

import { useState, FormEvent } from "react";

type Activation = {
  id: string;
  device_id: string;
  device_label: string | null;
  app_version: string | null;
  created_at: string;
  last_seen_at: string;
};

type License = {
  id: string;
  license_key: string;
  email: string | null;
  plan: string;
  status: string;
  daily_limit: number | null;
  max_devices: number | null;
  payment_provider: string | null;
  payment_reference: string | null;
  created_at: string;
  expires_at: string | null;
  license_activations?: Activation[];
};

export default function AdminLicensesPage() {
  const [adminToken, setAdminToken] = useState("");
  const [email, setEmail] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [licenses, setLicenses] = useState<License[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    const token = adminToken.trim();
    if (!token) {
      setError("Introduce el token de administrador para continuar.");
      return;
    }

    if (!email.trim() && !licenseKey.trim() && !paymentRef.trim()) {
      setError("Introduce al menos un filtro (email, licencia o referencia de pago).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (email.trim()) params.set("email", email.trim());
      if (licenseKey.trim()) params.set("license_key", licenseKey.trim());
      if (paymentRef.trim()) params.set("payment_reference", paymentRef.trim());
      params.set("include_activations", "1");

      const res = await fetch(`/api/admin/licenses?${params.toString()}`, {
        headers: {
          "x-admin-token": token,
        },
      });

      if (res.status === 401) {
        setLicenses(null);
        setError("Token de administrador no válido.");
        return;
      }

      if (!res.ok) {
        setLicenses(null);
        setError("No se han podido cargar las licencias. Revisa la configuración del servidor.");
        return;
      }

      const data = (await res.json()) as { licenses: License[] };
      setLicenses(data.licenses || []);
    } catch (err) {
      console.error(err);
      setLicenses(null);
      setError("Error inesperado al consultar las licencias.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteActivation(licenseId: string, activationId: string) {
    const token = adminToken.trim();
    if (!token) return;

    const confirmDelete = window.confirm(
      "¿Seguro que quieres liberar esta activación? El usuario tendrá que volver a activar la licencia en ese dispositivo.",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/admin/license-activations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ activation_id: activationId }),
      });

      if (!res.ok) {
        alert("No se ha podido eliminar la activación. Revisa los logs del servidor.");
        return;
      }

      setLicenses((prev) => {
        if (!prev) return prev;
        return prev.map((lic) => {
          if (lic.id !== licenseId) return lic;
          const activations = lic.license_activations || [];
          return {
            ...lic,
            license_activations: activations.filter((a) => a.id !== activationId),
          };
        });
      });
    } catch (err) {
      console.error(err);
      alert("Error inesperado al eliminar la activación.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 lg:px-6 lg:py-14">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Admin
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Panel de licencias y activaciones
        </h1>
        <p className="max-w-2xl text-xs leading-relaxed text-slate-300">
          Usa este panel solo como administrador para buscar licencias por email, clave
          de licencia o referencia de pago y gestionar activaciones de dispositivos.
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
        <form
          onSubmit={handleSearch}
          className="grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end"
        >
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-200">
                Token de administrador
              </label>
              <input
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400"
                placeholder="Pega aquí ADMIN_DASHBOARD_TOKEN"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400"
                  placeholder="usuario@ejemplo.com"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-200">
                  Clave de licencia
                </label>
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-200">
                  Referencia de pago
                </label>
                <input
                  type="text"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400"
                  placeholder="Stripe subscription/session ID"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2 text-xs font-medium text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Buscando licencias..." : "Buscar licencias"}
            </button>
            <p className="text-[11px] text-slate-400">
              Debes establecer la variable de entorno <code>ADMIN_DASHBOARD_TOKEN</code>
              y pegar su valor aquí.
            </p>
          </div>
        </form>

        {error && (
          <p className="text-xs text-red-400">
            {error}
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-100">Resultados</h2>
        {!licenses && !loading && (
          <p className="text-xs text-slate-500">
            Introduce un token y algún filtro para ver las licencias asociadas.
          </p>
        )}
        {licenses && licenses.length === 0 && !loading && (
          <p className="text-xs text-slate-400">No se han encontrado licencias.</p>
        )}

        {licenses && licenses.length > 0 && (
          <div className="space-y-4">
            {licenses.map((license) => (
              <article
                key={license.id}
                className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-1">
                    <p className="font-mono text-[11px] text-cyan-200">
                      {license.license_key}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      {license.email || "(sin email)"}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Plan: <span className="uppercase">{license.plan}</span> · Estado: {" "}
                      <span className="uppercase">{license.status}</span>
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <p>
                      Creada: {new Date(license.created_at).toLocaleString()}
                    </p>
                    {license.expires_at && (
                      <p>
                        Caduca: {new Date(license.expires_at).toLocaleString()}
                      </p>
                    )}
                    <p>
                      Dispositivos máx.: {license.max_devices ?? "-"} · Límite diario: {" "}
                      {license.daily_limit === null ? "sin límite" : license.daily_limit}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="text-[11px] font-semibold text-slate-100">
                      Activaciones de dispositivos
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {license.license_activations?.length || 0} activaciones registradas
                    </p>
                  </div>

                  {license.license_activations &&
                  license.license_activations.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto border-collapse text-[11px]">
                        <thead>
                          <tr className="border-b border-slate-800 text-left text-slate-400">
                            <th className="px-2 py-1 font-medium">Dispositivo</th>
                            <th className="px-2 py-1 font-medium">Versión app</th>
                            <th className="px-2 py-1 font-medium">Primera vez</th>
                            <th className="px-2 py-1 font-medium">Última vez</th>
                            <th className="px-2 py-1 font-medium text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {license.license_activations.map((act) => (
                            <tr key={act.id} className="border-b border-slate-800/60">
                              <td className="px-2 py-1 text-slate-200">
                                <div className="flex flex-col">
                                  <span className="text-[11px] font-medium">
                                    {act.device_label || "(sin nombre)"}
                                  </span>
                                  <span className="font-mono text-[10px] text-slate-400">
                                    {act.device_id}
                                  </span>
                                </div>
                              </td>
                              <td className="px-2 py-1 text-slate-300">
                                {act.app_version || "-"}
                              </td>
                              <td className="px-2 py-1 text-slate-400">
                                {new Date(act.created_at).toLocaleString()}
                              </td>
                              <td className="px-2 py-1 text-slate-400">
                                {new Date(act.last_seen_at).toLocaleString()}
                              </td>
                              <td className="px-2 py-1 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteActivation(license.id, act.id)}
                                  className="rounded-full border border-red-500/70 px-3 py-1 text-[10px] font-medium text-red-200 hover:bg-red-500/10"
                                >
                                  Liberar activación
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      Esta licencia aún no tiene activaciones registradas.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
