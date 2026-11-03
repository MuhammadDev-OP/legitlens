import { describe, expect, it } from "vitest";
import {
  UnsafeUrlError,
  assertSafeOutboundUrl,
  isBlockedIp,
  isBlockedIpv4,
  safeFetch,
} from "../src/ssrf.js";

describe("isBlockedIp", () => {
  it("blocks loopback, private, link-local, and metadata ranges", () => {
    expect(isBlockedIpv4("127.0.0.1")).toBe(true);
    expect(isBlockedIpv4("10.0.0.5")).toBe(true);
    expect(isBlockedIpv4("192.168.1.1")).toBe(true);
    expect(isBlockedIpv4("172.16.5.5")).toBe(true);
    expect(isBlockedIpv4("169.254.169.254")).toBe(true);
    expect(isBlockedIpv4("100.64.1.1")).toBe(true);
    expect(isBlockedIp("::1")).toBe(true);
    expect(isBlockedIp("fe80::1")).toBe(true);
    expect(isBlockedIp("fc00::1")).toBe(true);
    expect(isBlockedIp("::ffff:127.0.0.1")).toBe(true);
  });

  it("allows typical public addresses", () => {
    expect(isBlockedIpv4("8.8.8.8")).toBe(false);
    expect(isBlockedIpv4("1.1.1.1")).toBe(false);
    expect(isBlockedIp("2001:4860:4860::8888")).toBe(false);
  });
});

describe("assertSafeOutboundUrl", () => {
  it("allows https public hostnames when DNS is public", async () => {
    const url = await assertSafeOutboundUrl("https://rdap.example/domain/x", {
      resolveDns: async () => ["93.184.216.34"],
    });
    expect(url.hostname).toBe("rdap.example");
  });

  it("rejects non-http(s) schemes", async () => {
    await expect(assertSafeOutboundUrl("file:///etc/passwd")).rejects.toBeInstanceOf(
      UnsafeUrlError,
    );
    await expect(assertSafeOutboundUrl("ftp://example.com")).rejects.toBeInstanceOf(
      UnsafeUrlError,
    );
  });

  it("rejects localhost and credentials", async () => {
    await expect(assertSafeOutboundUrl("http://localhost/x")).rejects.toBeInstanceOf(
      UnsafeUrlError,
    );
    await expect(
      assertSafeOutboundUrl("https://user:pass@example.com/"),
    ).rejects.toBeInstanceOf(UnsafeUrlError);
  });

  it("rejects when DNS resolves to a private address", async () => {
    await expect(
      assertSafeOutboundUrl("https://evil.example/", {
        resolveDns: async () => ["127.0.0.1"],
      }),
    ).rejects.toBeInstanceOf(UnsafeUrlError);

    await expect(
      assertSafeOutboundUrl("https://meta.example/", {
        resolveDns: async () => ["169.254.169.254"],
      }),
    ).rejects.toBeInstanceOf(UnsafeUrlError);
  });

  it("rejects literal private IPs without DNS", async () => {
    await expect(assertSafeOutboundUrl("http://192.168.0.1/")).rejects.toBeInstanceOf(
      UnsafeUrlError,
    );
  });
});

describe("safeFetch", () => {
  it("re-checks redirects and enforces size/timeout options", async () => {
    let calls = 0;
    const fetcher: typeof fetch = async (input) => {
      calls += 1;
      const url = String(input);
      if (url.includes("start")) {
        return new Response(null, {
          status: 302,
          headers: { Location: "https://rdap.example/next" },
        });
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    // Monkey-patch global fetch for this unit test
    const original = globalThis.fetch;
    globalThis.fetch = fetcher;
    try {
      const res = await safeFetch("https://rdap.example/start", {
        resolveDns: async () => ["93.184.216.34"],
        maxBytes: 10_000,
        timeoutMs: 5_000,
      });
      expect(res.status).toBe(200);
      expect(calls).toBe(2);
      await expect(
        safeFetch("https://rdap.example/start", {
          resolveDns: async () => ["127.0.0.1"],
        }),
      ).rejects.toBeInstanceOf(UnsafeUrlError);
    } finally {
      globalThis.fetch = original;
    }
  });
});
