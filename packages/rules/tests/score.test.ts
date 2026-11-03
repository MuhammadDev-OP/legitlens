import { describe, expect, it } from "vitest";
import {
  buildWhatsAppShareUrl,
  scoreDomain,
  scoreToVerdict,
  verdictLabel,
} from "../src/index.js";
import { BAD, GOOD } from "./fixtures/domains.js";

describe("scoreToVerdict", () => {
  it("maps thresholds neutrally", () => {
    expect(scoreToVerdict(0)).toBe("looks_ok");
    expect(scoreToVerdict(24)).toBe("looks_ok");
    expect(scoreToVerdict(25)).toBe("be_careful");
    expect(scoreToVerdict(54)).toBe("be_careful");
    expect(scoreToVerdict(55)).toBe("high_risk");
    expect(scoreToVerdict(100)).toBe("high_risk");
  });
});

describe("scoreDomain fixtures", () => {
  it("scores known-good domains as looks_ok", () => {
    for (const input of GOOD) {
      const result = scoreDomain(input);
      expect(result.verdict, result.domain).toBe("looks_ok");
      expect(result.score).toBeLessThan(25);
    }
  });

  it("scores known-bad domains as be_careful or high_risk", () => {
    for (const input of BAD) {
      const result = scoreDomain(input);
      expect(
        ["be_careful", "high_risk"],
        `${result.domain} score=${result.score}`,
      ).toContain(result.verdict);
      expect(result.reasons.length).toBeGreaterThan(0);
    }
  });

  it("explains every triggered signal with a reason string", () => {
    const result = scoreDomain(BAD[0]!);
    for (const signal of result.signals.filter((s) => s.triggered)) {
      const reason = result.reasons.find((r) => r.id === signal.id);
      expect(reason?.text.length).toBeGreaterThan(10);
      expect(reason?.text.toLowerCase()).not.toContain("scam");
      expect(reason?.text.toLowerCase()).not.toMatch(/\bis a scam\b/);
    }
  });

  it("localizes Urdu reasons", () => {
    const result = scoreDomain({ ...BAD[0]!, locale: "ur" });
    expect(result.locale).toBe("ur");
    expect(verdictLabel(result.verdict, "ur")).toBe("زیادہ خطرہ");
    expect(result.reasons[0]?.text.length).toBeGreaterThan(5);
  });

  it("builds Ask-my-family WhatsApp link", () => {
    const result = scoreDomain(BAD[0]!);
    const url = buildWhatsAppShareUrl(result);
    expect(url.startsWith("https://wa.me/?text=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("nike-outlet-sale.shop");
  });
});
