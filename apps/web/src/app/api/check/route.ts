import {
  lookupRdap,
  normalizeDomain,
  scoreDomain,
  UnsafeUrlError,
} from "@legitlens/rules";
import { NextRequest, NextResponse } from "next/server";
import { createRdapFetcher } from "@/lib/rdapFetch";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { checkBodySchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const rl = rateLimit(`check:${clientKey(req)}`, { limit: 30, windowMs: 60_000 });
  if (!rl.ok) {
    const res = NextResponse.json({ error: "Too many requests" }, { status: 429 });
    res.headers.set("Retry-After", String(rl.retryAfterSec));
    return res;
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = checkBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const domain = normalizeDomain(parsed.data.url);
    if (!domain.includes(".") || domain.length > 253) {
      return NextResponse.json({ error: "Invalid URL or domain" }, { status: 400 });
    }
    const domainMeta = await lookupRdap(domain, { fetcher: createRdapFetcher() });
    const result = scoreDomain({
      domain,
      domainMeta,
      locale: parsed.data.locale ?? "en",
    });
    return NextResponse.json({ result });
  } catch (e) {
    if (e instanceof UnsafeUrlError) {
      return NextResponse.json({ error: "Lookup blocked" }, { status: 400 });
    }
    return NextResponse.json({ error: "Check failed" }, { status: 502 });
  }
}
