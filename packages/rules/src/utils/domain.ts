/** Strip protocol, path, port, and leading www. */
export function normalizeDomain(input: string): string {
  let s = input.trim().toLowerCase();
  try {
    if (s.includes("://")) {
      s = new URL(s).hostname;
    } else if (s.includes("/") || s.includes("?")) {
      s = new URL(`https://${s}`).hostname;
    }
  } catch {
    s = s.split("/")[0] ?? s;
  }
  s = s.replace(/:\d+$/, "");
  if (s.startsWith("www.")) s = s.slice(4);
  // Strip trailing dot
  if (s.endsWith(".")) s = s.slice(0, -1);
  return s;
}

/** Extract registrable-ish label without public-suffix lib (good enough for v1). */
export function registrableLabel(domain: string): string {
  const parts = normalizeDomain(domain).split(".").filter(Boolean);
  if (parts.length <= 2) return parts[0] ?? domain;
  // Handle common dual TLDs like co.uk, com.pk
  const dual = new Set(["co", "com", "org", "net", "gov", "ac"]);
  const secondLast = parts[parts.length - 2];
  if (secondLast && dual.has(secondLast) && parts.length >= 3) {
    return parts[parts.length - 3] ?? domain;
  }
  return parts[parts.length - 2] ?? domain;
}

/** Full hostname without www. */
export function hostnameOf(domain: string): string {
  return normalizeDomain(domain);
}

/** Levenshtein distance. */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0),
  );
  for (let i = 0; i <= m; i++) dp[i]![0] = i;
  for (let j = 0; j <= n; j++) dp[0]![j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(
        (dp[i - 1]![j] ?? 0) + 1,
        (dp[i]![j - 1] ?? 0) + 1,
        (dp[i - 1]![j - 1] ?? 0) + cost,
      );
    }
  }
  return dp[m]![n] ?? 0;
}

/** Common homoglyph map (latin lookalikes). */
const HOMOGLYPHS: Record<string, string> = {
  "0": "o",
  "1": "l",
  "3": "e",
  "5": "s",
  "7": "t",
  "@": "a",
  "$": "s",
  "¡": "i",
  "і": "i", // cyrillic
  "ӏ": "l",
  "а": "a",
  "е": "e",
  "о": "o",
  "р": "p",
  "с": "c",
  "у": "y",
  "х": "x",
  "ԁ": "d",
  "ɡ": "g",
  "ⅼ": "l",
  "ⅿ": "m",
  "ｎ": "n",
  "ｒ": "r",
  "ｓ": "s",
  "ｗ": "w",
};

export function foldHomoglyphs(s: string): string {
  return [...s.toLowerCase()].map((ch) => HOMOGLYPHS[ch] ?? ch).join("");
}

export function isPunycode(domain: string): boolean {
  return normalizeDomain(domain)
    .split(".")
    .some((label) => label.startsWith("xn--"));
}

export function daysBetween(isoDate: string, now = new Date()): number | null {
  const created = new Date(isoDate);
  if (Number.isNaN(created.getTime())) return null;
  const ms = now.getTime() - created.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export function stripShopTokens(label: string): string {
  return label.replace(
    /[-_]?(outlet|sale|shop|store|official|deals|discount|clearance|factory|warehouse|online|mart|buy|cheap|promo|vip)/gi,
    "",
  );
}
