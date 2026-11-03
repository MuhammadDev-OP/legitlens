import { looksLikeCheckout, scanPageDom } from "../lib/pageScan";
import type { ScoreResult } from "@legitlens/rules";

const BANNER_ID = "legitlens-warning-banner";

function removeBanner() {
  document.getElementById(BANNER_ID)?.remove();
}

function showBanner(result: ScoreResult) {
  removeBanner();
  if (result.verdict === "looks_ok") return;
  if (!looksLikeCheckout()) return;

  const banner = document.createElement("div");
  banner.id = BANNER_ID;
  banner.setAttribute("role", "alert");
  banner.style.cssText = [
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
  ].join(";");

  const verdictColor =
    result.verdict === "high_risk" ? "#E8A598" : "#F0C674";

  const left = document.createElement("div");
  left.innerHTML = `<strong style="color:${verdictColor}">LegitLens</strong>
    <span style="opacity:.85"> — signals suggest caution on <em>${result.domain}</em>
    (${result.verdict.replace("_", " ")}). ${result.reasons[0]?.text ?? ""}</span>`;

  const actions = document.createElement("div");
  actions.style.cssText = "display:flex;gap:8px;flex-shrink:0";

  const continueBtn = document.createElement("button");
  continueBtn.textContent = "Continue anyway";
  continueBtn.style.cssText =
    "background:transparent;border:1px solid #C9A227;color:#F5E6C8;padding:6px 12px;cursor:pointer;border-radius:2px";
  continueBtn.onclick = () => removeBanner();

  const askBtn = document.createElement("button");
  askBtn.textContent = "Ask my family";
  askBtn.style.cssText =
    "background:#C9A227;border:none;color:#1A1F2B;padding:6px 12px;cursor:pointer;border-radius:2px;font-weight:600";
  askBtn.onclick = () => {
    const text = encodeURIComponent(
      `I checked ${result.domain} with LegitLens: ${result.verdict}. ${result.reasons
        .slice(0, 2)
        .map((r) => r.text)
        .join(" ")} What do you think?`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  actions.append(askBtn, continueBtn);
  banner.append(left, actions);
  document.documentElement.appendChild(banner);
}

export default defineContentScript({
  matches: ["http://*/*", "https://*/*"],
  runAt: "document_idle",
  main() {
    const page = scanPageDom();
    chrome.runtime.sendMessage({ type: "PAGE_SCAN", page }, (response) => {
      if (chrome.runtime.lastError) return;
      if (response?.ok && response.result) {
        showBanner(response.result as ScoreResult);
      }
    });
  },
});
