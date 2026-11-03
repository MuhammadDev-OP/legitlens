export type {
  BrandEntry,
  DomainMeta,
  Locale,
  PageSignalsInput,
  ScoreInput,
  ScoreResult,
  SignalId,
  SignalResult,
  Verdict,
} from "./types/index.js";

export {
  aggregateScore,
  buildWhatsAppShareUrl,
  scoreDomain,
  scoreToVerdict,
  verdictLabel,
} from "./score.js";

export { t, supportedLocales } from "./i18n/messages.js";

export {
  IANA_RDAP_BOOTSTRAP,
  clearRdapBootstrapCache,
  fetchRdapBootstrap,
  findRdapServer,
  lookupRdap,
} from "./rdap.js";
export type { LookupRdapOptions, RdapBootstrap } from "./rdap.js";

export {
  daysBetween,
  editDistance,
  foldHomoglyphs,
  hostnameOf,
  isPunycode,
  normalizeDomain,
  registrableLabel,
} from "./utils/domain.js";

export { detectPageTextHeuristics, signalPage } from "./signals/pageSignals.js";
export { signalBrandLookalike } from "./signals/brandLookalike.js";
export { signalDomainAge } from "./signals/domainAge.js";
export { signalPhishingList } from "./signals/phishingList.js";

export { BRANDS, SHOP_TOKENS } from "./data/brands.js";
export { PHISHING_SAMPLE, PHISHING_SET } from "./data/phishing-sample.js";

export { sanitizeDisplayText, sanitizeDisplayUrl } from "./sanitize.js";

export {
  UnsafeUrlError,
  assertSafeHostname,
  assertSafeOutboundUrl,
  isBlockedIp,
  isBlockedIpv4,
  isBlockedIpv6,
  parseIpv4,
  safeFetch,
} from "./ssrf.js";
export type { AssertSafeUrlOptions, DnsResolver, SafeFetchOptions } from "./ssrf.js";
