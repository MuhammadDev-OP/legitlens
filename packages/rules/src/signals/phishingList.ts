import { PHISHING_SET } from "../data/phishing-sample.js";
import type { SignalResult } from "../types/index.js";
import { normalizeDomain } from "../utils/domain.js";

export function signalPhishingList(
  domain: string,
  override?: boolean,
): SignalResult[] {
  const host = normalizeDomain(domain);
  const hit =
    override === true ||
    (override !== false &&
      (PHISHING_SET.has(host) ||
        [...PHISHING_SET].some(
          (p) => host === p || host.endsWith(`.${p}`),
        )));

  if (!hit) return [];

  return [
    {
      id: "phishing_list_hit",
      weight: 55,
      triggered: true,
      reasonKey: "reason.phishing_list_hit",
      detail: host,
    },
  ];
}
