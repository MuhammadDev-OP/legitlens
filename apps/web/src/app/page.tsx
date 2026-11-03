import Link from "next/link";
import type { Metadata } from "next";
import { HomeJsonLd, HOME_FAQ } from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Check if a website is legit or a scam — free open-source checker",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "LegitLens — is this website legit?",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: ["/og.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <section className="hero" aria-label="LegitLens">
        <div className="hero-plane" aria-hidden />
        <div className="hero-inner">
          <h1>LegitLens</h1>
          <p className="tagline">Is this website legit — or should you be careful?</p>
          <p className="support">
            Free fake online shop checker and scam-link second opinion. Explainable
            signals in English &amp; Urdu — by Qurtuba Labs · powered by Codinito. No
            accounts, no fake stats.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/check">
              Check if a website is safe
            </Link>
            <a
              className="btn btn-ghost"
              href="https://github.com/MuhammadDev-OP/legitlens"
              target="_blank"
              rel="noreferrer"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="why">
        <h2>Why people ask “is this a scam?”</h2>
        <p className="lead">
          Fake shops clone brands, rush checkout with countdown timers, and vanish after
          payment. LegitLens helps you pause with transparent signals — not fearmongering
          and not invented testimonials.
        </p>
        <ul className="reasons">
          <li>
            <strong>Check if a website is safe</strong> using domain age (RDAP), brand
            lookalikes, and local page cues
          </li>
          <li>
            <strong>Fake online shop checker</strong> patterns: outlet domains, extreme
            discounts, missing policies, crypto-only wording
          </li>
          <li>
            <strong>Privacy-first:</strong> only the domain leaves your browser for age
            lookup — page HTML stays local
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>How it works</h2>
        <p className="lead">
          Every scoring rule lives in this open-source repo. Verdicts stay neutral: Looks
          OK / Be careful / High risk — never “this is a scam.”
        </p>
        <ul className="reasons">
          <li>Domain age &amp; registrar via RDAP (IANA bootstrap, no API key)</li>
          <li>Brand lookalikes, homoglyphs, punycode, and brand+shop word patterns</li>
          <li>On-page cues in the extension (DOM only)</li>
          <li>MIT-licensed phishing lists only (never OpenPhish or Google Safe Browsing)</li>
        </ul>
      </section>

      <section className="section" id="faq">
        <h2>FAQ — website legit &amp; scam checks</h2>
        <p className="lead">
          Honest answers for searches like “is this website legit” and “check if a website
          is safe.” No fabricated ratings.
        </p>
        <div className="guide-prose">
          {HOME_FAQ.map((item) => (
            <div key={item.question} style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.35rem" }}>{item.question}</h3>
              <p style={{ marginTop: 0 }}>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Guides</h2>
        <p className="lead">Short reading before you trust a checkout page.</p>
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
