import type { PageSignalsInput, SignalResult } from "../types/index.js";

const RISK_PAYMENT =
  /\b(wire\s*transfer|bank\s*transfer|only\s*(crypto|bitcoin|btc|usdt|ethereum)|pay\s*with\s*(btc|bitcoin|crypto|usdt)|crypto\s*only|western\s*union|moneygram)\b/i;

const COUNTDOWN =
  /\b(hurry|only\s*\d+\s*left|sale\s*ends?\s*in|limited\s*time|expires?\s*in|countdown|act\s*now|last\s*chance|flash\s*sale)\b/i;

const MYSHOPIFY = /\.myshopify\.com$/i;

export function detectPageTextHeuristics(pageText: string): Partial<PageSignalsInput> {
  return {
    riskyPaymentWording: RISK_PAYMENT.test(pageText),
    countdownPressure: COUNTDOWN.test(pageText),
  };
}

export function signalPage(page?: PageSignalsInput): SignalResult[] {
  if (!page) return [];
  const results: SignalResult[] = [];

  const hostname = page.hostname ?? "";
  const isMyshopify =
    page.isMyshopifyOrNewStore === true ||
    MYSHOPIFY.test(hostname) ||
    /^(shop|store|new)-?[a-z0-9]{4,}\./i.test(hostname);

  if (isMyshopify) {
    results.push({
      id: "myshopify_pattern",
      weight: 15,
      triggered: true,
      reasonKey: "reason.myshopify_pattern",
      detail: hostname,
    });
  }

  const discountCount = page.extremeDiscountCount ?? 0;
  if (discountCount >= 3) {
    results.push({
      id: "extreme_discounts",
      weight: Math.min(25, 10 + discountCount * 2),
      triggered: true,
      reasonKey: "reason.extreme_discounts",
      reasonParams: { count: discountCount },
      detail: `extremeDiscountCount=${discountCount}`,
    });
  }

  const missing: string[] = [];
  if (page.hasRefundPolicy === false) missing.push("refund");
  if (page.hasContact === false) missing.push("contact");
  if (page.hasAbout === false) missing.push("about");
  if (missing.length >= 2) {
    results.push({
      id: "missing_policy_pages",
      weight: 12 + missing.length * 2,
      triggered: true,
      reasonKey: "reason.missing_policy_pages",
      detail: `missing=${missing.join(",")}`,
    });
  }

  let risky = page.riskyPaymentWording === true;
  let countdown = page.countdownPressure === true;
  if (page.pageText) {
    const h = detectPageTextHeuristics(page.pageText);
    risky = risky || !!h.riskyPaymentWording;
    countdown = countdown || !!h.countdownPressure;
  }

  if (risky) {
    results.push({
      id: "risky_payment_wording",
      weight: 22,
      triggered: true,
      reasonKey: "reason.risky_payment_wording",
    });
  }

  if (countdown) {
    results.push({
      id: "countdown_pressure",
      weight: 10,
      triggered: true,
      reasonKey: "reason.countdown_pressure",
    });
  }

  return results;
}
