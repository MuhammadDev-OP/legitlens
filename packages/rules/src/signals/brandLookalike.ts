import { BRANDS, SHOP_TOKENS } from "../data/brands.js";
import type { SignalResult } from "../types/index.js";
import {
  editDistance,
  foldHomoglyphs,
  hostnameOf,
  isPunycode,
  normalizeDomain,
  registrableLabel,
  stripShopTokens,
} from "../utils/domain.js";

function isOfficialDomain(domain: string): boolean {
  const host = hostnameOf(domain);
  return BRANDS.some((b) =>
    b.domains.some((d) => host === d || host.endsWith(`.${d}`)),
  );
}

export function signalBrandLookalike(domain: string): SignalResult[] {
  const results: SignalResult[] = [];
  const host = normalizeDomain(domain);
  if (isOfficialDomain(host)) return results;

  if (isPunycode(host)) {
    results.push({
      id: "punycode",
      weight: 20,
      triggered: true,
      reasonKey: "reason.punycode",
      detail: host,
    });
  }

  const label = registrableLabel(host);
  const folded = foldHomoglyphs(label);
  const stripped = stripShopTokens(folded).replace(/[-_]/g, "");

  for (const brand of BRANDS) {
    const names = [brand.name, ...(brand.aliases ?? [])].map((n) =>
      n.toLowerCase().replace(/[^a-z0-9]/g, ""),
    );

    for (const name of names) {
      if (!name || name.length < 3) continue;

      // Exact brand as subdomain / label with extra shop words: nike-outlet-sale
      const hasBrandToken = label.includes(name) || folded.includes(name);
      const hasShopToken = SHOP_TOKENS.some(
        (t) => label.includes(t) || host.includes(t),
      );
      if (hasBrandToken && hasShopToken && !isOfficialDomain(host)) {
        results.push({
          id: "brand_extra_words",
          weight: 30,
          triggered: true,
          reasonKey: "reason.brand_extra_words",
          reasonParams: { brand: brand.name },
          detail: `${host} ~ ${name}+shop-token`,
        });
        break;
      }

      // Homoglyph after folding
      if (folded !== label.toLowerCase() && (folded === name || stripped === name)) {
        results.push({
          id: "homoglyph",
          weight: 40,
          triggered: true,
          reasonKey: "reason.homoglyph",
          reasonParams: { brand: brand.name },
          detail: `${label} folded=${folded}`,
        });
        break;
      }

      // Close edit distance on registrable label (typosquatting)
      const target = stripped || folded;
      if (target.length >= 4) {
        const dist = editDistance(target, name);
        const threshold = name.length <= 5 ? 1 : 2;
        if (dist > 0 && dist <= threshold) {
          results.push({
            id: "brand_lookalike",
            weight: 28,
            triggered: true,
            reasonKey: "reason.brand_lookalike",
            reasonParams: { brand: brand.name },
            detail: `editDistance(${target},${name})=${dist}`,
          });
          break;
        }
      }
    }
    if (results.some((r) => r.id === "brand_extra_words" || r.id === "homoglyph" || r.id === "brand_lookalike")) {
      break;
    }
  }

  return results;
}
