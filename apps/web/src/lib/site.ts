/** Canonical public site origin (override with NEXT_PUBLIC_SITE_URL). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://legitlens.vercel.app";

export const SITE_NAME = "LegitLens";
export const SITE_TAGLINE = "Check if a website is safe before you pay";
export const SITE_DESCRIPTION =
  "Free open-source tool to check if a website is legit or a fake online shop. Explainable signals for scam and phishing risk — never fake reviews. By Qurtuba Labs · powered by Codinito.";

export const DEFAULT_KEYWORDS = [
  "is this website legit",
  "is this a scam",
  "check if a website is safe",
  "fake online shop checker",
  "scam website checker",
  "phishing link checker",
  "browser extension anti scam",
  "fake shopify store",
] as const;
