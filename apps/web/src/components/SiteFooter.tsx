export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        <strong style={{ color: "var(--gold)" }}>LegitLens</strong> — free &amp; open
        source (AGPL-3.0). Portfolio showcase by Muhammad Bangash · Qurtuba Labs · powered
        by{" "}
        <a href="https://www.codinito.com" target="_blank" rel="noreferrer">
          Codinito
        </a>
        .
      </p>
      <p style={{ marginBottom: 0 }}>
        Neutral wording only (“signals suggest caution”). Not legal advice. Phishing data
        from MIT-licensed Phishing.Database &amp; destroylist — never OpenPhish or Google
        Safe Browsing.
      </p>
    </footer>
  );
}
