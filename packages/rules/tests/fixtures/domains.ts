import type { ScoreInput } from "../../src/types/index.js";

/** Known-good domains — expect looks_ok (or very low score) without phishing override. */
export const GOOD: ScoreInput[] = [
  {
    domain: "nike.com",
    domainMeta: {
      domain: "nike.com",
      createdAt: "1995-01-01T00:00:00Z",
      ageDays: 10000,
      registrar: "MarkMonitor Inc.",
      rdapOk: true,
    },
    page: {
      hostname: "www.nike.com",
      hasRefundPolicy: true,
      hasContact: true,
      hasAbout: true,
      extremeDiscountCount: 0,
      riskyPaymentWording: false,
      countdownPressure: false,
    },
    onPhishingList: false,
  },
  {
    domain: "wikipedia.org",
    domainMeta: {
      domain: "wikipedia.org",
      createdAt: "2001-01-13T00:00:00Z",
      ageDays: 9000,
      registrar: "MarkMonitor Inc.",
      rdapOk: true,
    },
    onPhishingList: false,
  },
  {
    domain: "daraz.pk",
    domainMeta: {
      domain: "daraz.pk",
      createdAt: "2012-06-01T00:00:00Z",
      ageDays: 4500,
      registrar: "PKNIC",
      rdapOk: true,
    },
    onPhishingList: false,
  },
];

/** Suspicious / bad fixtures — expect be_careful or high_risk. */
export const BAD: ScoreInput[] = [
  {
    domain: "nike-outlet-sale.shop",
    domainMeta: {
      domain: "nike-outlet-sale.shop",
      createdAt: "2026-10-20T00:00:00Z",
      ageDays: 10,
      registrar: "Privacy Protect LLC",
      rdapOk: true,
    },
    page: {
      hostname: "nike-outlet-sale.shop",
      extremeDiscountCount: 12,
      hasRefundPolicy: false,
      hasContact: false,
      hasAbout: false,
      riskyPaymentWording: true,
      countdownPressure: true,
      pageText: "Hurry! Sale ends in 00:05:00. Pay with bitcoin only. 90% OFF",
    },
    onPhishingList: true,
  },
  {
    domain: "paypal-secure-login.tk",
    domainMeta: {
      domain: "paypal-secure-login.tk",
      ageDays: 5,
      createdAt: "2026-10-28T00:00:00Z",
      rdapOk: true,
    },
    onPhishingList: true,
  },
  {
    domain: "cool-sneakers-xyz.myshopify.com",
    domainMeta: {
      domain: "cool-sneakers-xyz.myshopify.com",
      ageDays: 14,
      createdAt: "2026-10-15T00:00:00Z",
      rdapOk: true,
    },
    page: {
      hostname: "cool-sneakers-xyz.myshopify.com",
      isMyshopifyOrNewStore: true,
      extremeDiscountCount: 8,
      hasRefundPolicy: false,
      hasContact: false,
      hasAbout: false,
    },
    onPhishingList: false,
  },
  {
    domain: "xn--pple-43d.com",
    domainMeta: {
      domain: "xn--pple-43d.com",
      ageDays: 20,
      rdapOk: true,
    },
    onPhishingList: false,
  },
];
