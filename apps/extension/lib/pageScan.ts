import type { PageSignalsInput } from "@legitlens/rules";

/** DOM-only page scan — nothing is uploaded except domain via RDAP. */
export function scanPageDom(doc: Document = document): PageSignalsInput {
  const hostname = location.hostname;
  const text = (doc.body?.innerText ?? "").slice(0, 200_000);
  const hrefs = [...doc.querySelectorAll("a[href]")]
    .map((a) => ((a as HTMLAnchorElement).pathname + a.textContent).toLowerCase())
    .join(" ");

  const hasRefundPolicy =
    /refund|return|returns|exchange|واپسی|رجوع/.test(hrefs) ||
    /refund|return policy|returns/.test(text.toLowerCase());
  const hasContact =
    /contact|support|help|رابطہ/.test(hrefs) || /contact us|customer support/.test(text.toLowerCase());
  const hasAbout =
    /about|our-story|who-we-are|تعارف|ہمارے/.test(hrefs) ||
    /about us|our story/.test(text.toLowerCase());

  const discountMatches = text.match(/(\d{2,3})\s*%\s*off|save\s*(\d{2,3})\s*%|-\s*(\d{2,3})\s*%/gi) ?? [];
  const extremeDiscountCount = discountMatches.filter((m) => {
    const n = parseInt(m.replace(/\D/g, ""), 10);
    return n >= 70;
  }).length;

  const riskyPaymentWording =
    /\b(wire\s*transfer|bank\s*transfer|pay\s*with\s*(btc|bitcoin|crypto|usdt)|crypto\s*only|bitcoin\s*only)\b/i.test(
      text,
    );
  const countdownPressure =
    /\b(hurry|only\s*\d+\s*left|sale\s*ends?\s*in|limited\s*time|expires?\s*in|countdown|act\s*now|last\s*chance)\b/i.test(
      text,
    ) || !!doc.querySelector("[class*='countdown'], [id*='countdown'], .timer");

  const isMyshopifyOrNewStore =
    /\.myshopify\.com$/i.test(hostname) ||
    /^(shop|store|new)-?[a-z0-9]{4,}\./i.test(hostname);

  return {
    hostname,
    isMyshopifyOrNewStore,
    extremeDiscountCount,
    hasRefundPolicy,
    hasContact,
    hasAbout,
    riskyPaymentWording,
    countdownPressure,
    pageText: text.slice(0, 20_000),
  };
}

export function looksLikeCheckout(doc: Document = document): boolean {
  const path = location.pathname.toLowerCase();
  const text = (doc.body?.innerText ?? "").toLowerCase().slice(0, 50_000);
  return (
    /checkout|cart|payment|billing|place-order|آڈر|ادائیگی/.test(path) ||
    /proceed to checkout|place order|complete purchase|pay now/.test(text)
  );
}
