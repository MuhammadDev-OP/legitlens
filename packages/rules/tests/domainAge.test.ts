import { describe, expect, it } from "vitest";
import { signalDomainAge } from "../src/signals/domainAge.js";

describe("signalDomainAge", () => {
  it("flags very new domains (<30 days)", () => {
    const signals = signalDomainAge({
      domain: "newshop.example",
      ageDays: 7,
      rdapOk: true,
    });
    expect(signals[0]?.triggered).toBe(true);
    expect(signals[0]?.weight).toBeGreaterThanOrEqual(30);
    expect(signals[0]?.reasonKey).toBe("reason.domain_age_very_new");
  });

  it("flags new domains (<90 days) with lower weight", () => {
    const signals = signalDomainAge({
      domain: "newer.example",
      ageDays: 60,
      rdapOk: true,
    });
    expect(signals[0]?.reasonKey).toBe("reason.domain_age_new");
    expect(signals[0]?.weight).toBeLessThan(30);
  });

  it("does not flag mature domains", () => {
    const signals = signalDomainAge({
      domain: "old.example",
      ageDays: 2000,
      rdapOk: true,
    });
    expect(signals.filter((s) => s.id === "domain_age")).toHaveLength(0);
  });

  it("notes unknown age when RDAP failed", () => {
    const signals = signalDomainAge({
      domain: "unknown.example",
      rdapOk: false,
    });
    expect(signals[0]?.reasonKey).toBe("reason.domain_age_unknown");
  });
});
