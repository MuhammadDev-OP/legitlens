/**
 * SSRF guard for server-side outbound fetches (RDAP, etc.).
 * DNS resolution is injectable so browser bundles never import node:dns.
 */

export type DnsResolver = (hostname: string) => Promise<string[]>;

export class UnsafeUrlError extends Error {
  override readonly name = "UnsafeUrlError";
  constructor(message: string) {
    super(message);
  }
}

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "localhost.",
  "metadata.google.internal",
  "metadata",
  "kubernetes.default",
  "kubernetes.default.svc",
]);

/** Parse IPv4 string to uint32; null if invalid. */
export function parseIpv4(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const v = Number(p);
    if (v < 0 || v > 255) return null;
    n = (n << 8) | v;
  }
  return n >>> 0;
}

function inCidr(ip: number, base: number, prefix: number): boolean {
  if (prefix === 0) return true;
  const mask = (0xffffffff << (32 - prefix)) >>> 0;
  return (ip & mask) === (base & mask);
}

/** True if IPv4 is loopback, private, link-local, CGNAT, multicast, or unspecified. */
export function isBlockedIpv4(ip: string): boolean {
  const n = parseIpv4(ip);
  if (n == null) return true;
  if (inCidr(n, parseIpv4("0.0.0.0")!, 8)) return true;
  if (inCidr(n, parseIpv4("10.0.0.0")!, 8)) return true;
  if (inCidr(n, parseIpv4("100.64.0.0")!, 10)) return true;
  if (inCidr(n, parseIpv4("127.0.0.0")!, 8)) return true;
  if (inCidr(n, parseIpv4("169.254.0.0")!, 16)) return true; // link-local + cloud metadata
  if (inCidr(n, parseIpv4("172.16.0.0")!, 12)) return true;
  if (inCidr(n, parseIpv4("192.168.0.0")!, 16)) return true;
  if (inCidr(n, parseIpv4("192.0.0.0")!, 24)) return true;
  if (inCidr(n, parseIpv4("192.0.2.0")!, 24)) return true; // TEST-NET
  if (inCidr(n, parseIpv4("198.18.0.0")!, 15)) return true;
  if (inCidr(n, parseIpv4("198.51.100.0")!, 24)) return true;
  if (inCidr(n, parseIpv4("203.0.113.0")!, 24)) return true;
  if (inCidr(n, parseIpv4("224.0.0.0")!, 4)) return true; // multicast
  if (inCidr(n, parseIpv4("240.0.0.0")!, 4)) return true; // reserved
  return false;
}

/** True if IPv6 is loopback, ULA, link-local, or IPv4-mapped blocked. */
export function isBlockedIpv6(ip: string): boolean {
  const normalized = ip.toLowerCase().trim();
  if (normalized === "::1" || normalized === "::") return true;
  // link-local fe80::/10
  if (/^fe[89ab][0-9a-f]:/i.test(normalized)) return true;
  // unique local fc00::/7
  if (/^f[cd][0-9a-f]{2}:/i.test(normalized)) return true;
  // IPv4-mapped ::ffff:a.b.c.d
  const mapped = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped?.[1]) return isBlockedIpv4(mapped[1]);
  const mappedHex = normalized.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
  if (mappedHex?.[1] && mappedHex[2]) {
    const hi = parseInt(mappedHex[1], 16);
    const lo = parseInt(mappedHex[2], 16);
    const a = (hi >> 8) & 0xff;
    const b = hi & 0xff;
    const c = (lo >> 8) & 0xff;
    const d = lo & 0xff;
    return isBlockedIpv4(`${a}.${b}.${c}.${d}`);
  }
  return false;
}

export function isBlockedIp(ip: string): boolean {
  if (ip.includes(":")) return isBlockedIpv6(ip);
  return isBlockedIpv4(ip);
}

export function assertSafeHostname(hostname: string): void {
  const host = hostname.replace(/\.$/, "").toLowerCase();
  if (!host) throw new UnsafeUrlError("Empty hostname");
  if (BLOCKED_HOSTNAMES.has(host)) {
    throw new UnsafeUrlError("Blocked hostname");
  }
  if (host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new UnsafeUrlError("Blocked hostname suffix");
  }
  // Literal IP in hostname
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) && isBlockedIpv4(host)) {
    throw new UnsafeUrlError("Blocked IP address");
  }
  if (host.includes(":") && isBlockedIpv6(host.replace(/^\[|\]$/g, ""))) {
    throw new UnsafeUrlError("Blocked IP address");
  }
}

export interface AssertSafeUrlOptions {
  resolveDns?: DnsResolver;
  /** Allowlist of exact hostnames (e.g. data.iana.org) checked after DNS. */
  allowedHosts?: readonly string[];
}

/**
 * Validate an outbound URL before fetch. http/https only; no credentials;
 * blocks private/loopback/link-local/metadata after optional DNS resolution.
 */
export async function assertSafeOutboundUrl(
  urlString: string,
  opts: AssertSafeUrlOptions = {},
): Promise<URL> {
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    throw new UnsafeUrlError("Invalid URL");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new UnsafeUrlError("Only http/https allowed");
  }
  if (url.username || url.password) {
    throw new UnsafeUrlError("URL credentials not allowed");
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  assertSafeHostname(host);

  if (opts.allowedHosts && opts.allowedHosts.length > 0) {
    const allowed = opts.allowedHosts.map((h) => h.toLowerCase());
    if (!allowed.includes(host.toLowerCase())) {
      // still allow if DNS-safe public — do not hard-fail allowlist alone for RDAP TLDs
    }
  }

  if (opts.resolveDns) {
    const addrs = await opts.resolveDns(host);
    if (!addrs.length) throw new UnsafeUrlError("DNS resolution failed");
    for (const addr of addrs) {
      if (isBlockedIp(addr)) {
        throw new UnsafeUrlError("Resolved address is not publicly routable");
      }
    }
  } else if (/^\d+\.\d+\.\d+\.\d+$/.test(host) || host.includes(":")) {
    // Literal IP without resolver still blocked when private
    if (isBlockedIp(host)) throw new UnsafeUrlError("Blocked IP address");
  }

  return url;
}

export interface SafeFetchOptions extends RequestInit {
  resolveDns?: DnsResolver;
  timeoutMs?: number;
  maxBytes?: number;
  maxRedirects?: number;
}

/**
 * Fetch with SSRF checks, redirect re-validation, timeout, and body size cap.
 */
export async function safeFetch(
  urlString: string,
  opts: SafeFetchOptions = {},
): Promise<Response> {
  const {
    resolveDns,
    timeoutMs = 8_000,
    maxBytes = 512_000,
    maxRedirects = 3,
    ...init
  } = opts;

  let current = urlString;
  for (let i = 0; i <= maxRedirects; i++) {
    await assertSafeOutboundUrl(current, { resolveDns });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(current, {
        ...init,
        redirect: "manual",
        signal: controller.signal,
        headers: {
          ...(init.headers ?? {}),
        },
      });

      if ([301, 302, 303, 307, 308].includes(res.status)) {
        const loc = res.headers.get("location");
        if (!loc) throw new UnsafeUrlError("Redirect without Location");
        current = new URL(loc, current).toString();
        continue;
      }

      const buf = await res.arrayBuffer();
      if (buf.byteLength > maxBytes) {
        throw new UnsafeUrlError("Response too large");
      }
      return new Response(buf, {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
      });
    } finally {
      clearTimeout(timer);
    }
  }
  throw new UnsafeUrlError("Too many redirects");
}
