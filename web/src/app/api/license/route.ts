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

  const license = rows[0];

  return NextResponse.json({ license });
}
