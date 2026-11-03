import type { PageSignalsInput } from "@legitlens/rules";

/**
 * Run the DOM scanner in the active tab via chrome.scripting (activeTab).
 * Avoids standing host permissions for popup-driven checks.
 */
export async function injectPageScan(tabId: number): Promise<PageSignalsInput | undefined> {
  try {
    const injectionResults = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const text = (document.body?.innerText ?? "").slice(0, 200_000);
        const hrefs = [...document.querySelectorAll("a[href]")]
          .map((a) => {
            const el = a as HTMLAnchorElement;
            return (el.pathname + (el.textContent ?? "")).toLowerCase();
          })
          .join(" ");
        const hasRefundPolicy =
          /refund|return|returns|exchange/.test(hrefs) ||
          /refund|return policy|returns/.test(text.toLowerCase());
        const hasContact =
          /contact|support|help/.test(hrefs) ||
          /contact us|customer support/.test(text.toLowerCase());
        const hasAbout =
          /about|our-story|who-we-are/.test(hrefs) || /about us|our story/.test(text.toLowerCase());
        const discountMatches =
          text.match(/(\d{2,3})\s*%\s*off|save\s*(\d{2,3})\s*%|-\s*(\d{2,3})\s*%/gi) ?? [];
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
          ) || !!document.querySelector("[class*='countdown'], [id*='countdown'], .timer");
        const hostname = location.hostname;
        return {
          hostname,
          isMyshopifyOrNewStore:
            /\.myshopify\.com$/i.test(hostname) ||
            /^(shop|store|new)-?[a-z0-9]{4,}\./i.test(hostname),
          extremeDiscountCount,
          hasRefundPolicy,
          hasContact,
          hasAbout,
          riskyPaymentWording,
          countdownPressure,
          pageText: text.slice(0, 20_000),
        };
      },
    });
    return injectionResults[0]?.result as PageSignalsInput | undefined;
  } catch {
    return undefined;
  }
}
