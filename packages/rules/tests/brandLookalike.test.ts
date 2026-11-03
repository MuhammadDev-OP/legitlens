import { describe, expect, it } from "vitest";
import { signalBrandLookalike } from "../src/signals/brandLookalike.js";
import { editDistance, foldHomoglyphs, isPunycode } from "../src/utils/domain.js";

describe("brand lookalike signals", () => {
  it("detects brand + shop tokens", () => {
    const signals = signalBrandLookalike("nike-outlet-sale.shop");
    expect(signals.some((s) => s.id === "brand_extra_words")).toBe(true);
  });

  it("allows official brand domains", () => {
    expect(signalBrandLookalike("nike.com")).toHaveLength(0);
    expect(signalBrandLookalike("www.apple.com")).toHaveLength(0);
  });

  it("flags punycode hosts", () => {
    const signals = signalBrandLookalike("xn--pple-43d.com");
    expect(isPunycode("xn--pple-43d.com")).toBe(true);
    expect(signals.some((s) => s.id === "punycode")).toBe(true);
  });

  it("edit distance catches typosquats", () => {
    expect(editDistance("paypai", "paypal")).toBeLessThanOrEqual(2);
    const signals = signalBrandLookalike("paypai.com");
    expect(
      signals.some((s) => s.id === "brand_lookalike" || s.id === "homoglyph"),
    ).toBe(true);
  });

  it("homoglyph digits fold into brand matches", () => {
    const signals = signalBrandLookalike("paypa1.com");
    expect(signals.some((s) => s.id === "homoglyph")).toBe(true);
  });

  it("folds homoglyphs", () => {
    expect(foldHomoglyphs("рaypal")).toContain("paypal".slice(1)); // cyrillic р → p
    expect(foldHomoglyphs("g00gle")).toBe("google");
  });
});
