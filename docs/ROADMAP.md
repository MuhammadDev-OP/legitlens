# Roadmap & good first issues

LegitLens v1 ships the monorepo, explainable scoring, extension + web checker, EN/UR, and AGPL docs. Below is the near-term backlog — perfect for first-time contributors.

## Good first issues (10+)

1. **Refresh MIT phishing sample** — script to sync a trimmed allowlist from Phishing.Database / destroylist into `packages/rules` with NOTICE attribution.
2. **More brand aliases** — add regional brands (PK/MENA/EU) to `brands.ts` with official domain allowlists + tests.
3. **Improve Urdu copy** — native review of `i18n/messages.ts` UR strings for natural phrasing.
4. **RTL polish (AR)** — ensure popup + `/check` flip layout cleanly for Arabic.
5. **Public suffix awareness** — integrate a small PSL helper so `registrableLabel` handles more multi-part TLDs.
6. **Checkout banner i18n** — wire content-script banner strings through the same message catalog.
7. **Dark/light landing illustration** — replace README SVG placeholders with real screenshots + a short demo GIF.
8. **Firefox Android smoke notes** — document temporary add-on install quirks in README.
9. **Guide: “bank transfer red flags”** — fourth SEO guide page with neutral tone.
10. **Score breakdown UI** — show per-signal weights in the popup behind a “details” disclosure.
11. **Playwright smoke for `/check`** — one happy-path e2e against mocked RDAP.
12. **Badge colourblind-safe shapes** — add letter marks beyond colour alone for toolbar badge.
13. **Homoglyph table expansion** — more Cyrillic/Greek confusables with unit tests.
14. **Contributing GIF** — 30s screen capture of `pnpm dev:extension` load-unpacked flow.

## Later (post-v1)

- Chrome / Firefox store listing (maintainer-run; unpaid portfolio project)
- Optional Safari (out of scope for v1)
- Community translations beyond EN/UR/AR/HI
- Better edge cache (KV) for RDAP without storing browsing history

## Non-goals

- Paid tiers or accounts
- Invented download / user statistics
- Google Safe Browsing / OpenPhish ingestion
