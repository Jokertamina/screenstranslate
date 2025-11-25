import { NextRequest, NextResponse } from "next/server";

function mapDeepLLang(code: string | null | undefined): string {
  const mapping: Record<string, string> = {
    auto: "auto",
    en: "EN",
    es: "ES",
    fr: "FR",
    de: "DE",
    it: "IT",
    pt: "PT",
    ja: "JA",
    ko: "KO",
    zh: "ZH",
  };

  if (!code) return "EN";
  const lower = code.toLowerCase();
  return mapping[lower] ?? lower.toUpperCase();
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const texts = Array.isArray(body.texts) ? (body.texts as unknown[]) : [];
  const source = typeof body.source === "string" ? body.source : "auto";
  const target = typeof body.target === "string" ? body.target : "es";

  if (!texts.length || texts.some((t) => typeof t !== "string")) {
    return NextResponse.json({ error: "INVALID_TEXTS" }, { status: 400 });
  }

  const authKey = process.env.DEEPL_AUTH_KEY;
  if (!authKey) {
    console.error("DEEPL_AUTH_KEY is not configured");
    return NextResponse.json({ error: "SERVER_CONFIG" }, { status: 500 });
  }

  let deeplUrl = process.env.DEEPL_API_URL;
  if (!deeplUrl) {
    const useFree = (process.env.DEEPL_API_FREE ?? "1") !== "0";
    deeplUrl = useFree
      ? "https://api-free.deepl.com/v2/translate"
      : "https://api.deepl.com/v2/translate";
  }

  const params = new URLSearchParams();
  params.append("auth_key", authKey);

  for (const t of texts as string[]) {
    params.append("text", t);
  }

  const targetLang = mapDeepLLang(target);
  const sourceLang = mapDeepLLang(source);

  params.append("target_lang", targetLang);
  if (sourceLang.toLowerCase() !== "auto") {
    params.append("source_lang", sourceLang);
  }

  let deeplResp: Response;
  try {
    deeplResp = await fetch(deeplUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
  } catch (err) {
    console.error("Error calling DeepL API", err);
    return NextResponse.json({ error: "TRANSLATION_UPSTREAM" }, { status: 502 });
  }

  if (!deeplResp.ok) {
    const text = await deeplResp.text();
    console.error("DeepL API error", deeplResp.status, text.slice(0, 500));
    return NextResponse.json({ error: "TRANSLATION_UPSTREAM" }, { status: 502 });
  }

  let payload: any;
  try {
    payload = await deeplResp.json();
  } catch (err) {
    console.error("Failed to parse DeepL response as JSON", err);
    return NextResponse.json({ error: "TRANSLATION_UPSTREAM" }, { status: 502 });
  }

  const translations = Array.isArray(payload.translations)
    ? payload.translations.map((item: any) => String(item?.text ?? ""))
    : null;

  if (!translations || translations.length !== texts.length) {
    console.error(
      "Unexpected DeepL response shape",
      JSON.stringify(payload).slice(0, 500),
    );
    return NextResponse.json({ error: "TRANSLATION_UPSTREAM" }, { status: 502 });
  }

  return NextResponse.json({ translations });
}
