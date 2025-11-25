import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const rawKey = typeof body.license_key === "string" ? body.license_key : "";
  const licenseKey = rawKey.trim().toUpperCase();

  if (!licenseKey) {
    return NextResponse.json({ error: "LICENSE_KEY_REQUIRED" }, { status: 400 });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Supabase env vars not configured");
    return NextResponse.json({ error: "SERVER_CONFIG" }, { status: 500 });
  }

  const search = new URLSearchParams({
    select:
      "id,license_key,status,payment_provider,payment_reference,created_at,plan,max_devices",
  });

  const url = `${supabaseUrl}/rest/v1/licenses?${search.toString()}&license_key=eq.${encodeURIComponent(
    licenseKey,
  )}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch license from Supabase", await res.text());
    return NextResponse.json({ error: "SUPABASE_ERROR" }, { status: 500 });
  }

  const rows: any[] = await res.json();
  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const license = rows[0] as {
    id: string;
    status: string;
    payment_provider: string | null;
    payment_reference: string | null;
  };

  // Si la licencia viene de Stripe, comprobamos que la suscripción no sigue activa
  if (license.payment_provider === "stripe" && license.payment_reference) {
    if (!stripeSecret) {
      console.error("Missing STRIPE_SECRET_KEY for delete-data endpoint");
      return NextResponse.json({ error: "SERVER_CONFIG" }, { status: 500 });
    }

    const subRes = await fetch(
      `https://api.stripe.com/v1/subscriptions/${license.payment_reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${stripeSecret}`,
        },
      },
    );

    if (!subRes.ok) {
      console.error("Failed to fetch Stripe subscription", await subRes.text());
      return NextResponse.json({ error: "STRIPE_SUBSCRIPTION_ERROR" }, { status: 500 });
    }

    const subscription: any = await subRes.json();
    const status: string = subscription.status;
    const cancelAtPeriodEnd: boolean = Boolean(subscription.cancel_at_period_end);

    // Permitimos borrar datos si la suscripción está ya cancelada
    // o si el usuario la ha marcado para cancelar al final del periodo.
    const canDelete = status === "canceled" || cancelAtPeriodEnd;

    if (!canDelete) {
      return NextResponse.json({ error: "SUBSCRIPTION_ACTIVE" }, { status: 400 });
    }
  }

  // Borramos activaciones asociadas y la licencia en sí.
  const deleteActivationsUrl = `${supabaseUrl}/rest/v1/license_activations?license_id=eq.${encodeURIComponent(
    license.id,
  )}`;

  const delActRes = await fetch(deleteActivationsUrl, {
    method: "DELETE",
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
  });

  if (!delActRes.ok) {
    console.error(
      "Failed to delete license_activations from Supabase",
      await delActRes.text(),
    );
    return NextResponse.json({ error: "SUPABASE_DELETE_ERROR" }, { status: 500 });
  }

  const deleteLicenseUrl = `${supabaseUrl}/rest/v1/licenses?id=eq.${encodeURIComponent(
    license.id,
  )}`;

  const delLicRes = await fetch(deleteLicenseUrl, {
    method: "DELETE",
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
  });

  if (!delLicRes.ok) {
    console.error(
      "Failed to delete license from Supabase",
      await delLicRes.text(),
    );
    return NextResponse.json({ error: "SUPABASE_DELETE_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
