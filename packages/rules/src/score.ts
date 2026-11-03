import { t, verdictLabel } from "./i18n/messages.js";
import { signalBrandLookalike } from "./signals/brandLookalike.js";
import { signalDomainAge } from "./signals/domainAge.js";
import { signalPage } from "./signals/pageSignals.js";
import { signalPhishingList } from "./signals/phishingList.js";
import type {
  Locale,
  ScoreInput,
  ScoreResult,
  SignalResult,
  Verdict,
} from "./types/index.js";
import { normalizeDomain } from "./utils/domain.js";

export function scoreToVerdict(score: number): Verdict {
  if (score >= 55) return "high_risk";
  if (score >= 25) return "be_careful";
  return "looks_ok";
}

export function aggregateScore(signals: SignalResult[]): number {
  const total = signals
    .filter((s) => s.triggered)
    .reduce((sum, s) => sum + s.weight, 0);
  return Math.min(100, Math.round(total));
}

export function scoreDomain(input: ScoreInput): ScoreResult {
  const domain = normalizeDomain(input.domain);
  const locale: Locale = input.locale ?? "en";

  const signals: SignalResult[] = [
    ...signalDomainAge(
      input.domainMeta
        ? { ...input.domainMeta, domain: input.domainMeta.domain || domain }
        : undefined,
    ),
    ...signalBrandLookalike(domain),
    ...signalPage(input.page),
    ...signalPhishingList(domain, input.onPhishingList),
  ];

  // Deduplicate by id — keep highest weight
  const byId = new Map<string, SignalResult>();
  for (const s of signals) {
    const prev = byId.get(s.id);
    if (!prev || s.weight > prev.weight) byId.set(s.id, s);
  }
  const unique = [...byId.values()];
  const score = aggregateScore(unique);
  const verdict = scoreToVerdict(score);

  const reasons = unique
    .filter((s) => s.triggered)
    .sort((a, b) => b.weight - a.weight)
    .map((s) => ({
      id: s.id,
      text: t(s.reasonKey, locale, s.reasonParams),
      weight: s.weight,
    }));

  return {
    domain,
    score,
    verdict,
    signals: unique,
    reasons,
    locale,
  };
}

export function buildWhatsAppShareUrl(result: ScoreResult): string {
  const verdict = verdictLabel(result.verdict, result.locale);
  const reasons = result.reasons
    .slice(0, 3)
    .map((r) => r.text)
    .join(" · ");
  const text = t("share.whatsapp", result.locale, {
    domain: result.domain,
    verdict,
    reasons: reasons || "—",
  });
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export { verdictLabel };
