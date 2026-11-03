import {
  lookupRdap,
  normalizeDomain,
  scoreDomain,
  type Locale,
} from "@legitlens/rules";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { url?: string; locale?: Locale };
    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json({ error: "url is required" }, { status: 400 });
    }
    const domain = normalizeDomain(body.url);
    if (!domain.includes(".")) {
      return NextResponse.json({ error: "Invalid URL or domain" }, { status: 400 });
    }
    const domainMeta = await lookupRdap(domain);
    const result = scoreDomain({
      domain,
      domainMeta,
      locale: body.locale ?? "en",
    });
    return NextResponse.json({ result });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Check failed" },
      { status: 500 },
    );
  }
}
