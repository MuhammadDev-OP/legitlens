import { looksLikeCheckout, scanPageDom } from "../lib/pageScan";
import { sanitizeDisplayText, sanitizeDisplayUrl, type ScoreResult } from "@legitlens/rules";

const BANNER_ID = "legitlens-warning-banner";

function removeBanner() {
  document.getElementById(BANNER_ID)?.remove();
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: Partial<HTMLElementTagNameMap[K]> & { styleText?: string },
  children?: Array<Node | string>,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (props) {
    const { styleText, ...rest } = props;
    Object.assign(node, rest);
    if (styleText) node.style.cssText = styleText;
  }
  if (children) {
    for (const child of children) {
      node.append(typeof child === "string" ? document.createTextNode(child) : child);
    }
  }
  return node;
}

/** Build the checkout caution banner with textContent only (no innerHTML). */
function showBanner(result: ScoreResult) {
  removeBanner();
  if (result.verdict === "looks_ok") return;
  if (!looksLikeCheckout()) return;

  const domain = sanitizeDisplayUrl(result.domain) || "this site";
  const reason = sanitizeDisplayText(result.reasons[0]?.text ?? "", 280);
  const verdict = sanitizeDisplayText(result.verdict.replaceAll("_", " "), 40);
  const verdictColor = result.verdict === "high_risk" ? "#E8A598" : "#F0C674";

  const brand = el("strong", { styleText: `color:${verdictColor}` }, ["LegitLens"]);
  const body = el("span", { styleText: "opacity:.85" }, [
    " — signals suggest caution on ",
    el("em", {}, [domain]),
    ` (${verdict}). ${reason}`,
  ]);
  const left = el("div", {}, [brand, body]);

  const continueBtn = el("button", {
    type: "button",
    styleText:
      "background:transparent;border:1px solid #C9A227;color:#F5E6C8;padding:6px 12px;cursor:pointer;border-radius:2px",
  }, ["Continue anyway"]);
  continueBtn.addEventListener("click", () => removeBanner());

  const askBtn = el("button", {
    type: "button",
    styleText:
      "background:#C9A227;border:none;color:#1A1F2B;padding:6px 12px;cursor:pointer;border-radius:2px;font-weight:600",
  }, ["Ask my family"]);
  askBtn.addEventListener("click", () => {
    const text = encodeURIComponent(
      `I checked ${domain} with LegitLens: ${verdict}. ${sanitizeDisplayText(
        result.reasons
          .slice(0, 2)
          .map((r) => r.text)
          .join(" "),
        400,
      )} What do you think?`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  });

  const actions = el("div", {
    styleText: "display:flex;gap:8px;flex-shrink:0",
  }, [askBtn, continueBtn]);

  const banner = el("div", {
    id: BANNER_ID,
    role: "alert",
    styleText: [
      "position:fixed",
      "top:0",
      "left:0",
      "right:0",
      "z-index:2147483647",
      "font-family:Georgia,'Times New Roman',serif",
      "background:#1A1F2B",
      "color:#F5E6C8",
      "border-bottom:3px solid #C9A227",
      "padding:12px 16px",
      "display:flex",
      "gap:12px",
      "align-items:center",
      "justify-content:space-between",
      "flex-wrap:wrap",
      "box-shadow:0 4px 24px rgba(0,0,0,.35)",
    ].join(";"),
  }, [left, actions]);

  document.documentElement.appendChild(banner);
}

export default defineContentScript({
  // Injected only after the user grants optional host permissions (see SECURITY.md).
  matches: ["http://*/*", "https://*/*"],
  runAt: "document_idle",
  main() {
    const page = scanPageDom();
    // Cap pageText before messaging — only local signals; domain leaves via RDAP.
    if (page.pageText && page.pageText.length > 20_000) {
      page.pageText = page.pageText.slice(0, 20_000);
    }
    chrome.runtime.sendMessage({ type: "PAGE_SCAN", page }, (response) => {
      if (chrome.runtime.lastError) return;
      if (response?.ok && response.result) {
        showBanner(response.result as ScoreResult);
      }
    });
  },
});
