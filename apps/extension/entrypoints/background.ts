import {
  analyzeUrl,
  badgeColor,
  badgeText,
} from "../lib/analyze";
import type { PageSignalsInput, ScoreResult } from "@legitlens/rules";

export default defineBackground(() => {
  async function setBadge(tabId: number, result: ScoreResult) {
    await chrome.action.setBadgeBackgroundColor({
      tabId,
      color: badgeColor(result.verdict),
    });
    await chrome.action.setBadgeText({ tabId, text: badgeText(result.verdict) });
    await chrome.storage.session.set({ [`result:${tabId}`]: result });
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type === "PAGE_SCAN" && sender.tab?.id != null && sender.tab.url) {
      const tabId = sender.tab.id;
      const page = message.page as PageSignalsInput;
      analyzeUrl(sender.tab.url, page)
        .then(async (result) => {
          await setBadge(tabId, result);
          sendResponse({ ok: true, result });
        })
        .catch((err: unknown) => {
          sendResponse({
            ok: false,
            error: err instanceof Error ? err.message : "analyze failed",
          });
        });
      return true;
    }

    if (message?.type === "GET_RESULT") {
      const tabId = message.tabId as number;
      chrome.storage.session.get(`result:${tabId}`).then((data) => {
        sendResponse({ result: data[`result:${tabId}`] ?? null });
      });
      return true;
    }

    if (message?.type === "ANALYZE_URL") {
      analyzeUrl(message.url as string, message.page as PageSignalsInput | undefined, message.locale)
        .then((result) => sendResponse({ ok: true, result }))
        .catch((err: unknown) =>
          sendResponse({
            ok: false,
            error: err instanceof Error ? err.message : "analyze failed",
          }),
        );
      return true;
    }

    return undefined;
  });
});
