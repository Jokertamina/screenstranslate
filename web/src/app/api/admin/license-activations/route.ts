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
  const licenseId = (url.searchParams.get("license_id") || "").trim();

  if (!licenseId) {
    return NextResponse.json({ error: "LICENSE_ID_REQUIRED" }, { status: 400 });
  }

  const search = new URLSearchParams({
    select: "id,license_id,device_id,app_version,created_at,last_seen_at",
  });

  search.append("license_id", `eq.${licenseId}`);
  search.append("order", "last_seen_at.desc");

  const restUrl = `${supabaseUrl}/rest/v1/license_activations?${search.toString()}`;

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
    console.error("Failed to fetch activations from Supabase", text);
    return NextResponse.json({ error: "SUPABASE_ERROR" }, { status: 500 });
  }

  const rows: any[] = await res.json();

  return NextResponse.json({ activations: rows });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "SERVER_CONFIG" }, { status: 500 });
  }

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const activationId = body?.activation_id ? String(body.activation_id).trim() : "";
  const licenseId = body?.license_id ? String(body.license_id).trim() : "";
  const deviceId = body?.device_id ? String(body.device_id).trim() : "";

  if (!activationId && !(licenseId && deviceId)) {
    return NextResponse.json({ error: "MISSING_FILTER" }, { status: 400 });
  }

  const search = new URLSearchParams();

  if (activationId) {
    search.append("id", `eq.${activationId}`);
  } else {
    search.append("license_id", `eq.${licenseId}`);
    search.append("device_id", `eq.${deviceId}`);
  }

  const restUrl = `${supabaseUrl}/rest/v1/license_activations?${search.toString()}`;

  const res = await fetch(restUrl, {
    method: "DELETE",
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to delete activation in Supabase", text);
    return NextResponse.json({ error: "SUPABASE_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
