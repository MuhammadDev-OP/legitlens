# Security Policy

LegitLens is open source: assume adversaries can read every line. We design for that — no secrets in the tree, minimal extension privileges, SSRF-safe server fetches, and explainable local scoring.

## Supported versions

| Version | Supported |
| --- | --- |
| 1.x | Yes |

## Reporting a vulnerability

**Do not** open a public issue for security flaws (XSS, SSRF, privilege escalation, supply-chain, spoofed verdicts that hide risk, etc.).

Use **[GitHub Private Vulnerability Advisories](https://github.com/MuhammadDev-OP/legitlens/security/advisories/new)** on this repository (preferred).

If that is unavailable, contact the maintainer privately via GitHub: [@MuhammadDev-OP](https://github.com/MuhammadDev-OP).

Include:

- Affected package (`packages/rules`, `apps/extension`, `apps/web`, CI)
- Steps to reproduce
- Impact assessment

You should receive an acknowledgement within **7 days**.

Product false positives / false negatives are **not** security reports — use the issue templates.

## Recommended repository settings (maintainer)

Muhammad should enable on `main` (GitHub → Settings → Branches):

- Require a pull request before merging
- Require status checks: `lint · typecheck · test · build`, CodeQL, gitleaks
- Require branches to be up to date
- Do not allow force pushes or deletions on `main`
- Restrict who can push to `main`

Also enable Dependabot alerts + security updates, and secret scanning / push protection if available on the plan.

## Threat model (v1)

| Asset | Threat | Mitigation |
| --- | --- | --- |
| User browsing context | Malicious page abuses extension messaging | Sender `chrome.runtime.id` checks; typed message parsing; popup-only for ANALYZE_URL |
| User privacy | History / page content exfiltration | Page DOM scored locally; **only the domain** sent for RDAP; no telemetry/analytics |
| Extension integrity | XSS via banner / popup | No `innerHTML` with untrusted data; `textContent`/DOM APIs; CSP `script-src 'self'`; sanitize display helpers |
| Extension privilege | Over-broad host access | No `<all_urls>` required host permission; `activeTab` + `scripting` for on-demand scan; optional hosts for checkout banner; narrow host permission for RDAP API origin only |
| Web `/api/*` | SSRF via RDAP redirect / DNS rebinding | `assertSafeOutboundUrl` + DNS resolution; block private/loopback/link-local/metadata; http(s) only; redirect re-check; timeouts & size caps |
| Web `/api/*` | Abuse / DoS | Zod input validation; in-memory rate limits; generic errors (no stack traces) |
| Supply chain | Malicious Action or dependency | Lockfile committed; Actions pinned to commit SHAs; least-privilege `permissions:`; Dependabot; CodeQL; `pnpm audit`; OpenSSF Scorecard; gitleaks |
| Secrets | Leaked tokens in git | No app secrets required for v1 RDAP; `.env*` gitignored; gitleaks in CI |

Out of scope for v1 hardening: multi-tenant authenticated APIs (there are none), payment card handling (none), Safari.

## Extension permissions (justification)

| Permission | Why |
| --- | --- |
| `activeTab` | Read the current tab URL and inject a one-shot page scan when the user opens the popup — without standing `<all_urls>` access. |
| `scripting` | Inject the local DOM scanner on the active tab under `activeTab`. |
| `storage` | Session cache of the last score for the toolbar badge (no sync, no cloud). |
| `host_permissions` → RDAP API origin only | Call LegitLens `/api/rdap` (domain string only). Configured via `WXT_API_BASE` (default `http://localhost:3000`). |
| `optional_host_permissions` → `http(s)://*/*` | **Optional.** Enables the checkout warning content script. Not required for popup checks. |

There is **no** remote code execution path, **no** `eval`, and **no** telemetry.

## Privacy reminder

Only the **domain name** leaves the browser (RDAP age lookup via the edge/Node proxy). Page HTML, cookies, and form fields stay local. See `/privacy`.
