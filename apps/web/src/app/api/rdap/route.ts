import {
  lookupRdap,
  normalizeDomain,
  UnsafeUrlError,
  type DomainMeta,
} from "@legitlens/rules";
import { NextRequest, NextResponse } from "next/server";
import { createRdapFetcher } from "@/lib/rdapFetch";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { rdapQuerySchema } from "@/lib/validation";

/** Node runtime required for DNS-based SSRF checks. */
export const runtime = "nodejs";

const cache = new Map<string, { expires: number; meta: DomainMeta }>();
const TTL_MS = 1000 * 60 * 60 * 6;

function cors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Accept, Content-Type");
  res.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return res;
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

export async function GET(req: NextRequest) {
  const rl = rateLimit(`rdap:${clientKey(req)}`, { limit: 60, windowMs: 60_000 });
  if (!rl.ok) {
    const res = NextResponse.json({ error: "Too many requests" }, { status: 429 });
    res.headers.set("Retry-After", String(rl.retryAfterSec));
    return cors(res);
  }

  const parsed = rdapQuerySchema.safeParse({
    domain: req.nextUrl.searchParams.get("domain") ?? "",
  });
  if (!parsed.success) {
    return cors(NextResponse.json({ error: "Invalid domain" }, { status: 400 }));
  }

  let domain: string;
  try {
    domain = normalizeDomain(parsed.data.domain);
  } catch {
    return cors(NextResponse.json({ error: "Invalid domain" }, { status: 400 }));
  }

  if (!domain || !domain.includes(".") || domain.length > 253) {
    return cors(NextResponse.json({ error: "Invalid domain" }, { status: 400 }));
  }

  const hit = cache.get(domain);
  if (hit && hit.expires > Date.now()) {
    return cors(NextResponse.json(hit.meta));
  }

  try {
    const meta = await lookupRdap(domain, { fetcher: createRdapFetcher() });
    cache.set(domain, { expires: Date.now() + TTL_MS, meta });
    return cors(NextResponse.json(meta));
  } catch (e) {
    if (e instanceof UnsafeUrlError) {
      return cors(NextResponse.json({ error: "Lookup blocked" }, { status: 400 }));
    }
    return cors(NextResponse.json({ error: "Lookup failed" }, { status: 502 }));
  }
}
