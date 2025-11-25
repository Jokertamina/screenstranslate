import { NextRequest, NextResponse } from "next/server";

function isAuthorized(req: NextRequest): boolean {
  const token = process.env.ADMIN_DASHBOARD_TOKEN;
  if (!token) return false;
  const header = req.headers.get("x-admin-token") || "";
  const url = new URL(req.url);
  const queryToken = url.searchParams.get("admin_token") || "";
  return header === token || queryToken === token;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "SERVER_CONFIG" }, { status: 500 });
  }

  const url = new URL(req.url);
  const email = (url.searchParams.get("email") || "").trim();
  const licenseKey = (url.searchParams.get("license_key") || "").trim();
  const paymentRef = (url.searchParams.get("payment_reference") || "").trim();
  const includeActivations = url.searchParams.get("include_activations") === "1";

  if (!email && !licenseKey && !paymentRef) {
    return NextResponse.json({ error: "MISSING_FILTER" }, { status: 400 });
  }

  const search = new URLSearchParams();

  const baseSelect = [
    "id",
    "license_key",
    "email",
    "plan",
    "status",
    "daily_limit",
    "max_devices",
    "payment_provider",
    "payment_reference",
    "created_at",
    "expires_at",
  ].join(",");

  const select = includeActivations
    ? `${baseSelect},license_activations(id,device_id,device_label,app_version,created_at,last_seen_at)`
    : baseSelect;

  search.set("select", select);

  if (email) {
    search.append("email", `eq.${email}`);
  }
  if (licenseKey) {
    search.append("license_key", `eq.${licenseKey.toUpperCase()}`);
  }
  if (paymentRef) {
    search.append("payment_reference", `eq.${paymentRef}`);
  }

  search.append("order", "created_at.desc");

  const restUrl = `${supabaseUrl}/rest/v1/licenses?${search.toString()}`;

  const res = await fetch(restUrl, {
    method: "GET",
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch licenses from Supabase", text);
    return NextResponse.json({ error: "SUPABASE_ERROR" }, { status: 500 });
  }

  const rows: any[] = await res.json();

  return NextResponse.json({ licenses: rows });
}
