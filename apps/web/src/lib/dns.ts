import { lookup } from "node:dns/promises";
import type { DnsResolver } from "@legitlens/rules";

/** Resolve A/AAAA for SSRF checks (Node runtime only). */
export const nodeDnsResolver: DnsResolver = async (hostname) => {
  const results = await lookup(hostname, { all: true, verbatim: true });
  return results.map((r) => r.address);
};
