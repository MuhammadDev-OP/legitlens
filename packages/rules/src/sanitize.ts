/** Strip C0 controls (except tab/newline for multiline page snippets). */
function stripControls(input: string, allowWhitespace: boolean): string {
  let out = "";
  for (const ch of input) {
    const code = ch.codePointAt(0) ?? 0;
    if (allowWhitespace && (ch === "\t" || ch === "\n" || ch === "\r")) {
      out += ch;
      continue;
    }
    if (code < 0x20 || code === 0x7f) continue;
    out += ch;
  }
  return out;
}

/**
 * Sanitize text that may appear in the UI (popup, banner, /check).
 * Prefer textContent/DOM APIs for rendering; this is defense in depth.
 */
export function sanitizeDisplayText(input: unknown, maxLen = 500): string {
  if (typeof input !== "string") return "";
  const cleaned = stripControls(input, true)
    .replace(/[<>`'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, maxLen);
}

/**
 * Sanitize a URL or domain for display. Rejects dangerous schemes.
 * Returns a display-safe hostname/path string (not for navigation).
 */
export function sanitizeDisplayUrl(input: unknown, maxLen = 200): string {
  if (typeof input !== "string") return "";
  const raw = stripControls(input.trim(), false);
  if (!raw) return "";

  const lower = raw.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("blob:") ||
    lower.startsWith("file:")
  ) {
    return "";
  }

  try {
    const withProto = raw.includes("://") ? raw : `https://${raw}`;
    const u = new URL(withProto);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    const host = u.hostname.replace(/\.$/, "");
    const path = u.pathname === "/" ? "" : u.pathname;
    const display = `${host}${path}${u.search}`.replace(/[<>`'"]/g, "");
    return display.slice(0, maxLen);
  } catch {
    // Fallback: allow bare host-like strings
    const safe = raw.replace(/[<>`'"\\\s]/g, "");
    if (!/^[a-z0-9._:-]+$/i.test(safe.split("/")[0] ?? "")) return "";
    return safe.slice(0, maxLen);
  }
}
