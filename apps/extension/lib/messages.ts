import type { Locale, PageSignalsInput } from "@legitlens/rules";

export type ExtensionMessage =
  | { type: "PAGE_SCAN"; page: PageSignalsInput }
  | { type: "GET_RESULT"; tabId: number }
  | { type: "ANALYZE_URL"; url: string; page?: PageSignalsInput; locale?: Locale };

const MESSAGE_TYPES = new Set(["PAGE_SCAN", "GET_RESULT", "ANALYZE_URL"]);

/** Only accept messages from this extension (never from web pages / other extensions). */
export function isTrustedSender(sender: chrome.runtime.MessageSender): boolean {
  if (!sender.id || sender.id !== chrome.runtime.id) return false;
  // Reject exotic frames spoofing without an extension origin
  if (sender.url) {
    try {
      const u = new URL(sender.url);
      if (u.protocol === "chrome-extension:") {
        return u.hostname === chrome.runtime.id || u.host === chrome.runtime.id;
      }
      // Content scripts: URL is the page URL; sender.id already verified.
      if (u.protocol === "http:" || u.protocol === "https:") return true;
    } catch {
      return false;
    }
  }
  // Extension pages (popup) may omit url in some browsers
  return true;
}

export function parseMessage(raw: unknown): ExtensionMessage | null {
  if (!raw || typeof raw !== "object") return null;
  const msg = raw as Record<string, unknown>;
  if (typeof msg.type !== "string" || !MESSAGE_TYPES.has(msg.type)) return null;

  if (msg.type === "PAGE_SCAN") {
    if (!msg.page || typeof msg.page !== "object") return null;
    return { type: "PAGE_SCAN", page: msg.page as PageSignalsInput };
  }
  if (msg.type === "GET_RESULT") {
    if (typeof msg.tabId !== "number" || !Number.isInteger(msg.tabId) || msg.tabId < 0) {
      return null;
    }
    return { type: "GET_RESULT", tabId: msg.tabId };
  }
  if (msg.type === "ANALYZE_URL") {
    if (typeof msg.url !== "string" || msg.url.length > 2048) return null;
    return {
      type: "ANALYZE_URL",
      url: msg.url,
      page: msg.page as PageSignalsInput | undefined,
      locale: msg.locale as Locale | undefined,
    };
  }
  return null;
}

/** ANALYZE_URL / GET_RESULT only from extension pages (popup), not content scripts. */
export function isExtensionPageSender(sender: chrome.runtime.MessageSender): boolean {
  if (!isTrustedSender(sender)) return false;
  if (!sender.url) return true;
  try {
    return new URL(sender.url).protocol === "chrome-extension:";
  } catch {
    return false;
  }
}
