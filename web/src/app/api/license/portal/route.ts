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

  if (!stripeSecret || !supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Stripe or Supabase env vars");
    return NextResponse.json({ error: "SERVER_CONFIG" }, { status: 500 });
  }

  // 1) Buscar licencia en Supabase para obtener payment_reference
  const search = new URLSearchParams({
    select: "license_key,plan,status,created_at,max_devices,payment_provider,payment_reference",
  });

  const url = `${supabaseUrl}/rest/v1/licenses?${search.toString()}&license_key=eq.${encodeURIComponent(
    licenseKey,
  )}`;

  const licRes = await fetch(url, {
    method: "GET",
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
    cache: "no-store",
  });

  if (!licRes.ok) {
    console.error("Failed to fetch license from Supabase", await licRes.text());
    return NextResponse.json({ error: "SUPABASE_ERROR" }, { status: 500 });
  }

  const rows: any[] = await licRes.json();
  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const license = rows[0] as {
    status: string;
    payment_provider: string | null;
    payment_reference: string | null;
  };

  if (license.payment_provider !== "stripe" || !license.payment_reference) {
    return NextResponse.json({ error: "NO_STRIPE_SUBSCRIPTION" }, { status: 400 });
  }

  const subscriptionId = license.payment_reference;

  // 2) Obtener el customer desde la suscripción de Stripe
  const subRes = await fetch(
    `https://api.stripe.com/v1/subscriptions/${subscriptionId}`,
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
  const customerId: string | undefined = subscription.customer as string | undefined;

  if (!customerId) {
    console.error("Stripe subscription has no customer");
    return NextResponse.json({ error: "NO_CUSTOMER" }, { status: 500 });
  }

  // 3) Crear sesión del Stripe Customer Portal
  const form = new URLSearchParams({
    customer: customerId,
    return_url: `${req.nextUrl.origin}/panel`,
  });

  const portalRes = await fetch(
    "https://api.stripe.com/v1/billing_portal/sessions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    },
  );

  if (!portalRes.ok) {
    console.error("Failed to create Stripe billing portal session", await portalRes.text());
    return NextResponse.json({ error: "PORTAL_ERROR" }, { status: 500 });
  }

  const portalSession: any = await portalRes.json();

  return NextResponse.json({ url: portalSession.url });
}
