import { describe, expect, it } from "vitest";
import {
  detectPageTextHeuristics,
  signalPage,
} from "../src/signals/pageSignals.js";

describe("page signals", () => {
  it("flags myshopify hosts", () => {
    const signals = signalPage({
      hostname: "cool-store.myshopify.com",
    });
    expect(signals.some((s) => s.id === "myshopify_pattern")).toBe(true);
  });

  it("flags many extreme discounts", () => {
    const signals = signalPage({ extremeDiscountCount: 5 });
    expect(signals.some((s) => s.id === "extreme_discounts")).toBe(true);
  });

  it("flags missing trust pages", () => {
    const signals = signalPage({
      hasRefundPolicy: false,
      hasContact: false,
      hasAbout: true,
    });
    expect(signals.some((s) => s.id === "missing_policy_pages")).toBe(true);
  });

  it("detects risky payment and countdown from text", () => {
    const h = detectPageTextHeuristics(
      "Hurry limited time! Pay with bitcoin only. Sale ends in 10 minutes.",
    );
    expect(h.riskyPaymentWording).toBe(true);
    expect(h.countdownPressure).toBe(true);
  });
});
