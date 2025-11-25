// @ts-nocheck
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LICENSE_SHARED_SECRET = Deno.env.get("LICENSE_SHARED_SECRET") || "";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

interface ActivatePayload {
  license_key?: string;
  device_id?: string;
  app_version?: string;
  device_label?: string;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return json({ success: false, message: "Method not allowed" }, 405);
  }

  // AutorizaciÃ³n bÃ¡sica mediante secreto compartido
  if (LICENSE_SHARED_SECRET) {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (token !== LICENSE_SHARED_SECRET) {
      return json({ success: false, message: "Unauthorized" }, 401);
    }
  }

  let body: ActivatePayload;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, message: "Invalid JSON" }, 400);
  }

  const licenseKey = (body.license_key || "").trim();
  const deviceId = (body.device_id || "").trim();
  const appVersion = (body.app_version || "unknown").trim();
  const deviceLabel = (body.device_label || "").trim();

  if (!licenseKey || !deviceId) {
    return json(
      { success: false, message: "license_key y device_id son obligatorios" },
      400,
    );
  }

  // Buscar licencia
  const { data: license, error: licError } = await supabase
    .from("licenses")
    .select("*")
    .eq("license_key", licenseKey)
    .single();

  if (licError || !license) {
    return json({ success: false, message: "Licencia no encontrada" }, 404);
  }

  if (license.status !== "active") {
    return json({ success: false, message: "Licencia no activa" }, 403);
  }

  if (license.expires_at && new Date(license.expires_at) < new Date()) {
    return json({ success: false, message: "Licencia caducada" }, 403);
  }

  // Comprobar nÃºmero de dispositivos ya activados
  const { data: activations, error: actError } = await supabase
    .from("license_activations")
    .select("*")
    .eq("license_id", license.id);

  if (actError) {
    console.error("Error reading activations", actError);
    return json({ success: false, message: "Error interno" }, 500);
  }

  const maxDevices: number = license.max_devices ?? 3;
  const alreadyActivated = activations?.find((a: any) => a.device_id === deviceId);

  if (!alreadyActivated && activations && activations.length >= maxDevices) {
    return json({
      success: false,
      message: "Se ha alcanzado el nÃºmero mÃ¡ximo de dispositivos para esta licencia",
    }, 403);
  }

  // Upsert activaciÃ³n para este device
  const { error: upsertError } = await supabase
    .from("license_activations")
    .upsert({
      license_id: license.id,
      device_id: deviceId,
      app_version: appVersion,
      device_label: deviceLabel || null,
      last_seen_at: new Date().toISOString(),
    }, {
      onConflict: "license_id,device_id",
    });

  if (upsertError) {
    console.error("Error upserting activation", upsertError);
    return json({ success: false, message: "Error al registrar la activaciÃ³n" }, 500);
  }

  const plan: string = license.plan || "pro";
  const dailyLimit: number | null =
    license.daily_limit === null ? null : license.daily_limit;

  return json({
    success: true,
    message: "Licencia activada correctamente",
    plan,
    daily_limit: dailyLimit,
    max_devices: maxDevices,
    expires_at: license.expires_at,
    status: license.status,
    email: license.email ?? null,
    app_version: appVersion,
  });
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

