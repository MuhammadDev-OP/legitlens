import type { DomainMeta, SignalResult } from "../types/index.js";
import { daysBetween, normalizeDomain } from "../utils/domain.js";

/** Very new: < 30 days. New: < 90 days. */
export function signalDomainAge(meta?: DomainMeta): SignalResult[] {
  const results: SignalResult[] = [];
  if (!meta || meta.ageDays == null) {
    if (meta?.createdAt) {
      const age = daysBetween(meta.createdAt);
      if (age != null) {
        return signalDomainAge({ ...meta, ageDays: age });
      }
    }
    if (meta && meta.rdapOk === false) {
      results.push({
        id: "domain_age",
        weight: 8,
        triggered: true,
        reasonKey: "reason.domain_age_unknown",
        detail: "RDAP lookup failed or returned no creation date",
      });
    }
    return results;
  }

  const ageDays = meta.ageDays;
  if (ageDays < 30) {
    results.push({
      id: "domain_age",
      weight: 35,
      triggered: true,
      reasonKey: "reason.domain_age_very_new",
      reasonParams: { ageDays },
      detail: `domain=${normalizeDomain(meta.domain)} ageDays=${ageDays}`,
    });
  } else if (ageDays < 90) {
    results.push({
      id: "domain_age",
      weight: 18,
      triggered: true,
      reasonKey: "reason.domain_age_new",
      reasonParams: { ageDays },
      detail: `domain=${normalizeDomain(meta.domain)} ageDays=${ageDays}`,
    });
  }

  if (meta.registrar && /privacy|whoisguard|redacted|proxy/i.test(meta.registrar)) {
    results.push({
      id: "registrar_privacy",
      weight: 3,
      triggered: true,
      reasonKey: "reason.registrar_privacy",
      detail: meta.registrar,
    });
  }

  return results;
}
