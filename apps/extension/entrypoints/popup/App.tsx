import { useEffect, useState } from "react";
import {
  buildWhatsAppShareUrl,
  sanitizeDisplayText,
  sanitizeDisplayUrl,
  type Locale,
  type ScoreResult,
  verdictLabel,
} from "@legitlens/rules";

function styleFor(verdict: ScoreResult["verdict"]): { bg: string } {
  switch (verdict) {
    case "looks_ok":
      return { bg: "var(--ok)" };
    case "high_risk":
      return { bg: "var(--risk)" };
    case "be_careful":
    default:
      return { bg: "var(--warn)" };
  }
}

export function Popup() {
  const [locale, setLocale] = useState<Locale>("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [tabUrl, setTabUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (typeof chrome === "undefined" || !chrome.tabs?.query) {
          // Demo / screenshot mode when opened outside the extension shell
          const { scoreDomain } = await import("@legitlens/rules");
          const demo = scoreDomain({
            domain: "nike-outlet-sale.shop",
            locale,
            domainMeta: {
              domain: "nike-outlet-sale.shop",
              ageDays: 10,
              createdAt: "2026-10-20T00:00:00Z",
              registrar: "Privacy Protect LLC",
              rdapOk: true,
            },
            page: {
              hostname: "nike-outlet-sale.shop",
              extremeDiscountCount: 12,
              hasRefundPolicy: false,
              hasContact: false,
              hasAbout: false,
              riskyPaymentWording: true,
              countdownPressure: true,
            },
            onPhishingList: true,
          });
          if (!cancelled) {
            setTabUrl("https://nike-outlet-sale.shop");
            setResult(demo);
            setLoading(false);
          }
          return;
        }
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id || !tab.url) {
          setError("No active tab");
          setLoading(false);
          return;
        }
        setTabUrl(tab.url);
        const cached = await chrome.runtime.sendMessage({
          type: "GET_RESULT",
          tabId: tab.id,
        });
        if (!cancelled && cached?.result) {
          setResult(cached.result as ScoreResult);
          setLoading(false);
        }
        const { injectPageScan } = await import("../../lib/injectScan");
        const page = await injectPageScan(tab.id);
        const response = await chrome.runtime.sendMessage({
          type: "ANALYZE_URL",
          url: tab.url,
          page,
          locale,
        });
        if (cancelled) return;
        if (response?.ok) {
          setResult(response.result as ScoreResult);
        } else {
          setError("Could not analyze");
        }
      } catch {
        if (!cancelled) setError("Could not analyze");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const dir = locale === "ur" || locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.02em", color: "var(--gold)" }}>
            LegitLens
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
            by Qurtuba Labs · powered by{" "}
            <a href="https://www.codinito.com" target="_blank" rel="noreferrer">
              Codinito
            </a>
          </div>
        </div>
        <select
          aria-label="Language"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          style={{
            background: "var(--ink-soft)",
            color: "var(--cream)",
            border: "1px solid #2a3142",
            padding: "4px 6px",
          }}
        >
          <option value="en">EN</option>
          <option value="ur">اردو</option>
          <option value="ar">العربية</option>
          <option value="hi">हिन्दी</option>
        </select>
      </header>

      {loading && (
        <p style={{ color: "var(--muted)", fontSize: 14 }}>Checking signals…</p>
      )}
      {error && !result && (
        <p style={{ color: "var(--terracotta)", fontSize: 13 }}>{error}</p>
      )}

      {result && (
        <>
          <section
            style={{
              background: "var(--ink-soft)",
              border: "1px solid #2a3142",
              padding: 14,
              borderLeft: `4px solid ${styleFor(result.verdict).bg}`,
            }}
          >
            <div style={{ fontSize: 12, color: "var(--muted)", wordBreak: "break-all" }}>
              {sanitizeDisplayUrl(result.domain || tabUrl) || "—"}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 20,
                fontWeight: 700,
                color: styleFor(result.verdict).bg,
              }}
            >
              {verdictLabel(result.verdict, locale)}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
              Risk score {result.score}/100 — explainable signals only
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: 13, margin: "0 0 8px", color: "var(--gold)" }}>
              Why this verdict
            </h2>
            {result.reasons.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
                No elevated risk signals from domain age, lookalikes, page cues, or
                MIT-licensed phishing lists.
              </p>
            ) : (
              <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: 13, lineHeight: 1.45 }}>
                {result.reasons.map((r) => (
                  <li key={r.id} style={{ marginBottom: 6 }}>
                    {sanitizeDisplayText(r.text, 400)}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={buildWhatsAppShareUrl(result)}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                textAlign: "center",
                textDecoration: "none",
                background: "var(--gold)",
                color: "var(--ink)",
                padding: "10px 8px",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              Ask my family
            </a>
          </div>
        </>
      )}

      <footer style={{ fontSize: 10, color: "var(--muted)", marginTop: "auto", lineHeight: 1.4 }}>
        Only the domain name is sent for age lookup (RDAP). No browsing history stored.
        Neutral wording — never “this is a scam.” AGPL-3.0.
      </footer>
    </div>
  );
}
