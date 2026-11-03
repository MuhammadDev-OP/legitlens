/** Verdict labels — neutral, non-defamatory. */
export type Verdict = "looks_ok" | "be_careful" | "high_risk";

export type Locale = "en" | "ur" | "ar" | "hi";

export type SignalId =
  | "domain_age"
  | "registrar_privacy"
  | "brand_lookalike"
  | "homoglyph"
  | "punycode"
  | "brand_extra_words"
  | "myshopify_pattern"
  | "extreme_discounts"
  | "missing_policy_pages"
  | "risky_payment_wording"
  | "countdown_pressure"
  | "phishing_list_hit";

export interface SignalResult {
  id: SignalId;
  /** Weighted contribution to risk score (0–100 scale contribution). */
  weight: number;
  /** True when this signal fired. */
  triggered: boolean;
  /** i18n key for the human-readable reason. */
  reasonKey: string;
  /** Optional interpolated values for the reason string. */
  reasonParams?: Record<string, string | number>;
  /** Extra debug detail (not shown to users by default). */
  detail?: string;
}

export interface DomainMeta {
  /** Registrable / hostname without protocol. */
  domain: string;
  /** Creation date ISO string from RDAP, if known. */
  createdAt?: string | null;
  /** Registrar name from RDAP, if known. */
  registrar?: string | null;
  /** Age in days derived from createdAt. */
  ageDays?: number | null;
  /** Whether RDAP lookup succeeded. */
  rdapOk?: boolean;
}

export interface PageSignalsInput {
  /** Hostname of the page (may differ from shopfront domain). */
  hostname?: string;
  /** True if URL/host matches *.myshopify.com or similar new-store patterns. */
  isMyshopifyOrNewStore?: boolean;
  /** Count of items advertising ≥70% off. */
  extremeDiscountCount?: number;
  /** Whether refund / returns policy link or page was found. */
  hasRefundPolicy?: boolean;
  /** Whether contact page/link was found. */
  hasContact?: boolean;
  /** Whether about page/link was found. */
  hasAbout?: boolean;
  /** Bank-transfer or crypto-only payment wording detected. */
  riskyPaymentWording?: boolean;
  /** Countdown / urgency pressure UI detected. */
  countdownPressure?: boolean;
  /** Raw page text snippet used for payment/countdown heuristics (optional). */
  pageText?: string;
}

export interface ScoreInput {
  domain: string;
  domainMeta?: DomainMeta;
  page?: PageSignalsInput;
  /** Override phishing list membership (tests). */
  onPhishingList?: boolean;
  /** Locale for reason strings. */
  locale?: Locale;
}

export interface ScoreResult {
  domain: string;
  /** 0 (safe) – 100 (highest risk). */
  score: number;
  verdict: Verdict;
  signals: SignalResult[];
  /** Triggered signals only, with localized reason strings. */
  reasons: Array<{
    id: SignalId;
    text: string;
    weight: number;
  }>;
  locale: Locale;
}

export interface BrandEntry {
  name: string;
  /** Domains the brand actually owns / uses. */
  domains: string[];
  /** Extra tokens often used in lookalike shops. */
  aliases?: string[];
}
