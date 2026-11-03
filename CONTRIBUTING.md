# Contributing to LegitLens

Thanks for helping make a careful, explainable anti-scam tool. This is Muhammad Bangash’s open-source portfolio showcase under **Qurtuba Labs · powered by Codinito** — clarity and honesty beat hype.

## Ground rules

1. Read the [Code of Conduct](./CODE_OF_CONDUCT.md).
2. Keep verdict wording **neutral** (“signals suggest caution”) — never “this is a scam.”
3. Phishing data must stay **MIT-licensed** (Phishing.Database, destroylist). Do not add OpenPhish or Google Safe Browsing.
4. Prefer explainable rules in `packages/rules` with Vitest coverage over opaque heuristics.
5. Only the **domain** may leave the browser for RDAP.

## Setup

```bash
pnpm install
pnpm --filter @legitlens/rules test
pnpm --filter @legitlens/web dev
pnpm --filter @legitlens/extension dev
```

## Pull requests

- Branch from `main`; open a PR with a clear description and test notes.
- Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` before requesting review.
- New signals need: unit tests, i18n keys (EN + UR minimum), and a row in the README signals table.
- Do not invent user counts, download stats, or store badges.

## Good first issues

See [docs/ROADMAP.md](./docs/ROADMAP.md).

## Licence

By contributing, you agree your work is licensed under **AGPL-3.0** (see [LICENSE](./LICENSE)).
