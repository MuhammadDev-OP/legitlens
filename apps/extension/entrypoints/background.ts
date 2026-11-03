import {
  analyzeUrl,
  badgeColor,
  badgeText,
} from "../lib/analyze";
import {
  isExtensionPageSender,
  isTrustedSender,
  parseMessage,
} from "../lib/messages";
import type { ScoreResult } from "@legitlens/rules";
import { sanitizeDisplayText } from "@legitlens/rules";

export default defineBackground(() => {
  async function setBadge(tabId: number, result: ScoreResult) {
    await chrome.action.setBadgeBackgroundColor({
      tabId,
      color: badgeColor(result.verdict),
    });
    await chrome.action.setBadgeText({ tabId, text: badgeText(result.verdict) });
    await chrome.storage.session.set({ [`result:${tabId}`]: result });
  }

  chrome.runtime.onMessage.addListener((raw, sender, sendResponse) => {
    if (!isTrustedSender(sender)) {
      sendResponse({ ok: false, error: "Unauthorized" });
      return false;
    }

    const message = parseMessage(raw);
    if (!message) {
      sendResponse({ ok: false, error: "Invalid message" });
      return false;
    }

    if (message.type === "PAGE_SCAN") {
      if (sender.tab?.id == null || !sender.tab.url) {
        sendResponse({ ok: false, error: "Missing tab" });
        return false;
      }
      const tabId = sender.tab.id;
      const tabUrl = sender.tab.url;
      analyzeUrl(tabUrl, message.page)
        .then(async (result) => {
          await setBadge(tabId, result);
          sendResponse({ ok: true, result });
        })
        .catch(() => {
          sendResponse({ ok: false, error: "Analyze failed" });
        });
      return true;
    }

    if (message.type === "GET_RESULT") {
      if (!isExtensionPageSender(sender)) {
        sendResponse({ ok: false, error: "Unauthorized" });
        return false;
      }
      chrome.storage.session.get(`result:${message.tabId}`).then((data) => {
        sendResponse({ result: data[`result:${message.tabId}`] ?? null });
      });
      return true;
    }

    if (message.type === "ANALYZE_URL") {
      if (!isExtensionPageSender(sender)) {
        sendResponse({ ok: false, error: "Unauthorized" });
        return false;
      }
      analyzeUrl(message.url, message.page, message.locale)
        .then((result) => sendResponse({ ok: true, result }))
        .catch(() => sendResponse({ ok: false, error: "Analyze failed" }));
      return true;
    }

    sendResponse({
      ok: false,
      error: sanitizeDisplayText("Unhandled", 40),
    });
    return false;
  });
});
