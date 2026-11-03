import {
  lookupRdap,
  normalizeDomain,
  type DomainMeta,
} from "@legitlens/rules";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/** Simple in-memory cache per isolate (best-effort). */
const cache = new Map<string, { expires: number; meta: DomainMeta }>();
const TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

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
  const domainParam = req.nextUrl.searchParams.get("domain");
  if (!domainParam) {
    return cors(
      NextResponse.json({ error: "Missing domain query parameter" }, { status: 400 }),
    );
  }

  let domain: string;
  try {
    domain = normalizeDomain(domainParam);
  } catch {
    return cors(NextResponse.json({ error: "Invalid domain" }, { status: 400 }));
  }

  if (!domain || !domain.includes(".")) {
    return cors(NextResponse.json({ error: "Invalid domain" }, { status: 400 }));
  }

  const hit = cache.get(domain);
  if (hit && hit.expires > Date.now()) {
    return cors(NextResponse.json(hit.meta));
  }

  const meta = await lookupRdap(domain);
  cache.set(domain, { expires: Date.now() + TTL_MS, meta });
  return cors(NextResponse.json(meta));
}
