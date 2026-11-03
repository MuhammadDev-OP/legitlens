/**
 * Sample phishing-domain entries for offline scoring & tests.
 *
 * Production builds should refresh from MIT-licensed sources only:
 *   - https://github.com/Phishing-Database/Phishing.Database (MIT)
 *   - https://github.com/phishdestroy/destroylist (MIT)
 *
 * DO NOT ingest OpenPhish or Google Safe Browsing — their licence terms
 * forbid this redistribution / use pattern.
 *
 * These are synthetic / illustrative hostnames for CI (no live fetch).
 * Real list sync is documented in docs/ROADMAP.md and NOTICE.
 */
export const PHISHING_SAMPLE: readonly string[] = Object.freeze([
  "paypal-secure-login.tk",
  "appleid-verify-account.xyz",
  "amazon-account-update.buzz",
  "nike-outlet-sale.shop",
  "microsoft-security-alert.top",
  "chase-online-verify.click",
  "netflix-billing-update.icu",
  "dhl-package-hold.work",
  "instagram-help-center.site",
  "gucci-official-outlet.store",
]);

export const PHISHING_SET: ReadonlySet<string> = new Set(
  PHISHING_SAMPLE.map((d) => d.toLowerCase()),
);
