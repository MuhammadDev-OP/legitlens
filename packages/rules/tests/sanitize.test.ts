import { describe, expect, it } from "vitest";
import { sanitizeDisplayText, sanitizeDisplayUrl } from "../src/sanitize.js";

describe("sanitizeDisplayText", () => {
  it("strips angle brackets and control characters", () => {
    expect(sanitizeDisplayText("<script>alert(1)</script>")).toBe("scriptalert(1)/script");
    expect(sanitizeDisplayText("ok\u0000domain")).toBe("okdomain");
  });

  it("truncates long strings", () => {
    expect(sanitizeDisplayText("a".repeat(1000), 20)).toHaveLength(20);
  });

  it("returns empty for non-strings", () => {
    expect(sanitizeDisplayText(null)).toBe("");
    expect(sanitizeDisplayText(12 as unknown as string)).toBe("");
  });
});

describe("sanitizeDisplayUrl", () => {
  it("accepts http(s) hosts for display", () => {
    expect(sanitizeDisplayUrl("https://nike-outlet-sale.shop/path")).toBe(
      "nike-outlet-sale.shop/path",
    );
    expect(sanitizeDisplayUrl("example.com")).toBe("example.com");
  });

  it("rejects dangerous schemes", () => {
    expect(sanitizeDisplayUrl("javascript:alert(1)")).toBe("");
    expect(sanitizeDisplayUrl("data:text/html,hi")).toBe("");
    expect(sanitizeDisplayUrl("file:///etc/passwd")).toBe("");
  });

  it("strips quotes and brackets from display", () => {
    expect(sanitizeDisplayUrl('https://ex.com/"onclick=')).not.toContain('"');
  });
});
