import {
  lookupRdap,
  normalizeDomain,
  scoreDomain,
  type DomainMeta,
  type Locale,
  type PageSignalsInput,
  type ScoreResult,
} from "@legitlens/rules";
import { apiUrl } from "./config";

export async function fetchDomainMeta(domain: string): Promise<DomainMeta> {
  try {
    const res = await fetch(apiUrl(`/api/rdap?domain=${encodeURIComponent(domain)}`), {
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      return (await res.json()) as DomainMeta;
    }
  } catch {
    // fall through to direct RDAP (may be blocked by extension CSP / CORS)
  }
  return lookupRdap(domain);
}

export async function analyzeUrl(
  url: string,
  page?: PageSignalsInput,
  locale: Locale = "en",
): Promise<ScoreResult> {
  const domain = normalizeDomain(url);
  const domainMeta = await fetchDomainMeta(domain);
  return scoreDomain({ domain, domainMeta, page, locale });
}

export function badgeColor(verdict: ScoreResult["verdict"]): string {
  switch (verdict) {
    case "looks_ok":
      return "#1B7F5A";
    case "be_careful":
      return "#C47B2D";
    case "high_risk":
      return "#A33B2B";
    default:
      return "#9aa3b5";
  }
}

export function badgeText(verdict: ScoreResult["verdict"]): string {
  switch (verdict) {
    case "looks_ok":
      return "OK";
    case "be_careful":
      return "!";
    case "high_risk":
      return "!!";
    default:
      return "?";
  }
}
