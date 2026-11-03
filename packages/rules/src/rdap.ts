import type { DomainMeta } from "./types/index.js";
import { daysBetween, normalizeDomain } from "./utils/domain.js";

/** IANA RDAP DNS bootstrap. */
export const IANA_RDAP_BOOTSTRAP = "https://data.iana.org/rdap/dns.json";

export interface RdapBootstrap {
  services: Array<[string[], string[]]>;
}

let cachedBootstrap: RdapBootstrap | null = null;

export async function fetchRdapBootstrap(
  fetcher: typeof fetch = fetch,
): Promise<RdapBootstrap> {
  if (cachedBootstrap) return cachedBootstrap;
  const res = await fetcher(IANA_RDAP_BOOTSTRAP);
  if (!res.ok) throw new Error(`IANA bootstrap HTTP ${res.status}`);
  const json = (await res.json()) as RdapBootstrap;
  cachedBootstrap = json;
  return json;
}

/** Clear bootstrap cache (tests). */
export function clearRdapBootstrapCache(): void {
  cachedBootstrap = null;
}

export function findRdapServer(
  domain: string,
  bootstrap: RdapBootstrap,
): string | null {
  const host = normalizeDomain(domain);
  const labels = host.split(".");
  const tld = labels[labels.length - 1] ?? "";
  for (const [tlds, urls] of bootstrap.services) {
    if (tlds.map((t) => t.toLowerCase()).includes(tld)) {
      const base = urls[0];
      if (!base) return null;
      return base.endsWith("/") ? base : `${base}/`;
    }
  }
  return null;
}

function extractCreated(events: unknown): string | null {
  if (!Array.isArray(events)) return null;
  for (const ev of events) {
    if (
      ev &&
      typeof ev === "object" &&
      "eventAction" in ev &&
      "eventDate" in ev &&
      typeof (ev as { eventAction: unknown }).eventAction === "string" &&
      typeof (ev as { eventDate: unknown }).eventDate === "string"
    ) {
      const action = (ev as { eventAction: string }).eventAction.toLowerCase();
      if (action === "registration" || action === "registered") {
        return (ev as { eventDate: string }).eventDate;
      }
    }
  }
  // Fallback: earliest eventDate
  const dates = events
    .map((ev) =>
      ev && typeof ev === "object" && "eventDate" in ev
        ? String((ev as { eventDate: unknown }).eventDate)
        : null,
    )
    .filter((d): d is string => !!d)
    .map((d) => ({ d, t: Date.parse(d) }))
    .filter((x) => !Number.isNaN(x.t))
    .sort((a, b) => a.t - b.t);
  return dates[0]?.d ?? null;
}

function extractRegistrar(entities: unknown): string | null {
  if (!Array.isArray(entities)) return null;
  for (const ent of entities) {
    if (!ent || typeof ent !== "object") continue;
    const roles = (ent as { roles?: unknown }).roles;
    if (Array.isArray(roles) && roles.map(String).includes("registrar")) {
      const vcard = (ent as { vcardArray?: unknown }).vcardArray;
      if (Array.isArray(vcard) && Array.isArray(vcard[1])) {
        for (const row of vcard[1] as unknown[]) {
          if (
            Array.isArray(row) &&
            row[0] === "fn" &&
            typeof row[3] === "string"
          ) {
            return row[3];
          }
        }
      }
      if (typeof (ent as { handle?: unknown }).handle === "string") {
        return (ent as { handle: string }).handle;
      }
    }
  }
  return null;
}

export interface LookupRdapOptions {
  fetcher?: typeof fetch;
  /** Pre-resolved RDAP base URL (from proxy). */
  serverUrl?: string;
  bootstrap?: RdapBootstrap;
}

/**
 * Look up domain registration metadata via RDAP (no API key).
 * Prefer calling through the LegitLens edge proxy for caching.
 */
export async function lookupRdap(
  domain: string,
  opts: LookupRdapOptions = {},
): Promise<DomainMeta> {
  const host = normalizeDomain(domain);
  const fetcher = opts.fetcher ?? fetch;

  try {
    let server = opts.serverUrl ?? null;
    if (!server) {
      const bootstrap = opts.bootstrap ?? (await fetchRdapBootstrap(fetcher));
      server = findRdapServer(host, bootstrap);
    }
    if (!server) {
      return { domain: host, rdapOk: false, createdAt: null, ageDays: null };
    }

    const url = `${server}domain/${encodeURIComponent(host)}`;
    const res = await fetcher(url, {
      headers: { Accept: "application/rdap+json, application/json" },
    });
    if (!res.ok) {
      return { domain: host, rdapOk: false, createdAt: null, ageDays: null };
    }
    const json = (await res.json()) as {
      events?: unknown;
      entities?: unknown;
    };
    const createdAt = extractCreated(json.events);
    const registrar = extractRegistrar(json.entities);
    const ageDays = createdAt ? daysBetween(createdAt) : null;
    return {
      domain: host,
      createdAt,
      registrar,
      ageDays,
      rdapOk: true,
    };
  } catch {
    return { domain: host, rdapOk: false, createdAt: null, ageDays: null };
  }
}
