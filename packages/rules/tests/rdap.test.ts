import { describe, expect, it } from "vitest";
import {
  clearRdapBootstrapCache,
  findRdapServer,
  lookupRdap,
  type RdapBootstrap,
} from "../src/rdap.js";

const bootstrap: RdapBootstrap = {
  services: [
    [["com", "net"], ["https://rdap.example/"]],
    [["shop"], ["https://rdap.shop.test"]],
  ],
};

describe("RDAP helpers", () => {
  it("resolves bootstrap servers by TLD", () => {
    expect(findRdapServer("nike.com", bootstrap)).toBe("https://rdap.example/");
    expect(findRdapServer("foo.shop", bootstrap)).toBe("https://rdap.shop.test/");
    expect(findRdapServer("foo.unknown", bootstrap)).toBeNull();
  });

  it("parses RDAP JSON via injected fetcher (no live network)", async () => {
    clearRdapBootstrapCache();
    const fetcher: typeof fetch = async (input) => {
      const url = String(input);
      if (url.includes("iana.org")) {
        return new Response(JSON.stringify(bootstrap), { status: 200 });
      }
      return new Response(
        JSON.stringify({
          events: [
            { eventAction: "registration", eventDate: "2020-01-15T00:00:00Z" },
          ],
          entities: [
            {
              roles: ["registrar"],
              vcardArray: ["vcard", [["fn", {}, "text", "Example Registrar"]]],
            },
          ],
        }),
        { status: 200 },
      );
    };

    const meta = await lookupRdap("example.com", { fetcher, bootstrap });
    expect(meta.rdapOk).toBe(true);
    expect(meta.createdAt).toContain("2020-01-15");
    expect(meta.registrar).toBe("Example Registrar");
    expect(meta.ageDays).toBeGreaterThan(100);
  });
});
