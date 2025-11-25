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

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const stripeSecret = process.env.STRIPE_SECRET_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Supabase env vars not configured");
    return NextResponse.json({ error: "SERVER_CONFIG" }, { status: 500 });
  }

  const search = new URLSearchParams({
    select: "license_key,plan,status,created_at,max_devices,payment_provider,payment_reference",
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

  const license: any = rows[0];

  // Si la licencia está asociada a Stripe, intentamos obtener
  // información básica de la suscripción (estado y próxima renovación).
  if (
    stripeSecret &&
    license.payment_provider === "stripe" &&
    license.payment_reference
  ) {
    try {
      const subRes = await fetch(
        `https://api.stripe.com/v1/subscriptions/${license.payment_reference}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${stripeSecret}`,
          },
        },
      );

      if (subRes.ok) {
        const subscription: any = await subRes.json();
        const rawCurrentPeriodEnd = subscription.current_period_end;
        const stripeStatus: string | undefined = subscription.status;

        console.log("[license-api] Stripe subscription debug", {
          id: subscription.id,
          rawCurrentPeriodEnd,
          type: typeof rawCurrentPeriodEnd,
          status: stripeStatus,
        });

        let currentPeriodEnd: number | null = null;
        if (typeof rawCurrentPeriodEnd === "number") {
          currentPeriodEnd = rawCurrentPeriodEnd;
        } else if (typeof rawCurrentPeriodEnd === "string") {
          const parsed = parseInt(rawCurrentPeriodEnd, 10);
          if (!Number.isNaN(parsed)) {
            currentPeriodEnd = parsed;
          }
        }

        // Fallback: si la suscripción no trae current_period_end,
        // intentamos deducirlo de la última factura asociada.
        if (currentPeriodEnd === null && stripeStatus === "active") {
          try {
            const invRes = await fetch(
              `https://api.stripe.com/v1/invoices?subscription=${subscription.id}&limit=1`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${stripeSecret}`,
                },
              },
            );

            if (invRes.ok) {
              const invData: any = await invRes.json();
              const invoice = Array.isArray(invData.data) ? invData.data[0] : null;
              const invoicePeriodEnd =
                invoice?.lines?.data?.[0]?.period?.end ?? invoice?.period_end;

              if (typeof invoicePeriodEnd === "number") {
                currentPeriodEnd = invoicePeriodEnd;
              }
            } else {
              console.error(
                "Failed to fetch Stripe invoices for license details",
                await invRes.text(),
              );
            }
          } catch (err) {
            console.error(
              "Error fetching Stripe invoices for license details",
              err,
            );
          }
        }

        if (currentPeriodEnd !== null) {
          license.stripe_current_period_end = new Date(
            currentPeriodEnd * 1000,
          ).toISOString();
        }

        if (stripeStatus) {
          license.stripe_status = stripeStatus;
        }
      } else {
        console.error(
          "Failed to fetch Stripe subscription for license details",
          await subRes.text(),
        );
      }
    } catch (err) {
      console.error("Error fetching Stripe subscription for license details", err);
    }
  }

  return NextResponse.json({ license });
}
