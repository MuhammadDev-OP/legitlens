import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-label="LegitLens">
        <div className="hero-plane" aria-hidden />
        <div className="hero-inner">
          <h1>LegitLens</h1>
          <p className="tagline">A second opinion before you pay.</p>
          <p className="support">
            Free anti-scam &amp; fake-shop checker — browser extension and web link
            checker. Explainable signals in English &amp; Urdu. by Qurtuba Labs · powered
            by Codinito.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/check">
              Check a link
            </Link>
            <a
              className="btn btn-ghost"
              href="https://github.com/MuhammadDev-OP/legitlens"
              target="_blank"
              rel="noreferrer"
            >
              Install from source
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>How it works</h2>
        <p className="lead">
          Only the domain name ever leaves your browser (for RDAP age lookup). Every
          scoring rule lives in this repo — weighted, explainable, never “this is a scam.”
        </p>
        <ul className="reasons">
          <li>Domain age &amp; registrar via RDAP (IANA bootstrap, no API key)</li>
          <li>Brand lookalikes, homoglyphs, punycode, and brand+shop word patterns</li>
          <li>On-page cues: myshopify patterns, extreme discounts, missing trust pages</li>
          <li>MIT-licensed phishing lists only (Phishing.Database, destroylist)</li>
        </ul>
      </section>

      <section className="section">
        <h2>Guides</h2>
        <p className="lead">Short, practical reading before you trust a checkout page.</p>
        <ul className="reasons">
          <li>
            <Link href="/guides/is-website-legit">How to tell if a website is legit</Link>
          </li>
          <li>
            <Link href="/guides/fake-shopify-stores">Spotting fake Shopify stores</Link>
          </li>
          <li>
            <Link href="/guides/urdu" className="locale-ur" hrefLang="ur">
              ویب سائٹ چیک کرنے کی اردو گائیڈ
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
