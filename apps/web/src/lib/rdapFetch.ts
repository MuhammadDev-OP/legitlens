import { safeFetch, type DnsResolver } from "@legitlens/rules";
import { nodeDnsResolver } from "./dns";

/** SSRF-safe fetcher for RDAP / IANA bootstrap (Node runtime). */
export function createRdapFetcher(resolveDns: DnsResolver = nodeDnsResolver): typeof fetch {
  return async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    return safeFetch(url, {
      ...(init ?? {}),
      resolveDns,
      timeoutMs: 8_000,
      maxBytes: 512_000,
      maxRedirects: 3,
    });
  };
}
