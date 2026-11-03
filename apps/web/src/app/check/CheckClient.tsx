"use client";

import { useState, useTransition } from "react";
import {
  sanitizeDisplayText,
  sanitizeDisplayUrl,
  type Locale,
  type ScoreResult,
} from "@legitlens/rules";

const verdictCopy: Record<string, string> = {
  looks_ok: "Looks OK",
  be_careful: "Be careful",
  high_risk: "High risk",
};

export function CheckClient() {
  const [url, setUrl] = useState("");
  const [locale, setLocale] = useState<Locale>("en");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, locale }),
        });
        const data = (await res.json()) as { result?: ScoreResult; error?: string };
        if (!res.ok || !data.result) {
          setResult(null);
          setError(data.error ?? "Check failed");
          return;
        }
        setResult(data.result);
      } catch {
        setError("Network error");
      }
    });
  }

  return (
    <div className="check-panel">
      <form className="check-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="url"
          required
          placeholder="https://example.com or example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="URL or domain to check"
        />
        <select
          aria-label="Language"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          style={{
            background: "var(--ink)",
            color: "var(--cream)",
            border: "1px solid var(--line)",
            padding: "0.8rem",
          }}
        >
          <option value="en">English</option>
          <option value="ur">اردو</option>
          <option value="ar">العربية</option>
          <option value="hi">हिन्दी</option>
        </select>
        <button type="submit" disabled={pending}>
          {pending ? "Checking…" : "Check"}
        </button>
      </form>

      {error && (
        <p style={{ color: "var(--risk)", marginTop: "1rem" }} role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className={`verdict-block ${result.verdict}`} role="status">
          <div style={{ fontSize: "0.85rem", color: "var(--cream-dim)" }}>
            {sanitizeDisplayUrl(result.domain) || "—"}
          </div>
          <div style={{ fontSize: "1.6rem", fontFamily: "var(--font-display)", marginTop: 4 }}>
            {verdictCopy[result.verdict] ?? sanitizeDisplayText(result.verdict, 40)}
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--cream-dim)" }}>
            Score {result.score}/100
          </div>
          {result.reasons.length > 0 ? (
            <ul className="reasons">
              {result.reasons.map((r) => (
                <li key={r.id}>{sanitizeDisplayText(r.text, 400)}</li>
              ))}
            </ul>
          ) : (
            <p style={{ marginBottom: 0, color: "var(--cream-dim)" }}>
              No elevated risk signals from the rules we ship.
            </p>
          )}
        </div>
      )}

      <p style={{ fontSize: "0.8rem", color: "var(--cream-dim)", marginBottom: 0, marginTop: "1rem" }}>
        Privacy: only the domain is sent for RDAP age lookup. We do not store browsing
        history.
      </p>
    </div>
  );
}
