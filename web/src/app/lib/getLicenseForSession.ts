import "server-only";

export type LicenseInfo = {
  license_key: string;
  plan: string;
  status: string;
  created_at: string;
  max_devices: number | null;
};

export async function getLicenseForSession(
  sessionId?: string,
): Promise<LicenseInfo | null> {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!sessionId || !stripeSecret || !supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  // 1) Obtener la sesión de Checkout de Stripe
  const sessionRes = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
      },
      cache: "no-store",
    },
  );

  if (!sessionRes.ok) {
    console.error("Failed to fetch Stripe session", await sessionRes.text());
    return null;
  }

  const session: any = await sessionRes.json();
  const subscriptionId: string | null = (session.subscription as string) ?? null;
  const paymentRef: string = subscriptionId || session.id;

  // 2) Buscar la licencia en Supabase por payment_reference
  const search = new URLSearchParams({
    select: "license_key,plan,status,created_at,max_devices",
  });

  const url = `${supabaseUrl}/rest/v1/licenses?${search.toString()}&payment_provider=eq.stripe&payment_reference=eq.${encodeURIComponent(
    paymentRef,
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
    return null;
  }

  const rows: any[] = await licRes.json();
  if (!rows || rows.length === 0) return null;

  return rows[0] as LicenseInfo;
}
