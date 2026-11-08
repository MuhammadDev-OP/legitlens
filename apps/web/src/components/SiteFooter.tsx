import Link from "next/link";
import { Icon } from "./Icon";

const GITHUB = "https://github.com/MuhammadDev-OP/legitlens";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link className="brand" href="/">
            <Icon id="logo" className="brand__mark" />
            <span className="brand__name">LegitLens</span>
          </Link>
          <p className="credit">
            by Qurtuba Labs · powered by{" "}
            <a href="https://www.codinito.com" target="_blank" rel="noreferrer">
              Codinito
            </a>
          </p>
          <p className="footer__note">
            Neutral wording only (“signals suggest caution”). Not legal advice. A second
            opinion, not a guarantee.
          </p>
        </div>
        <nav className="footer__cols" aria-label="Footer">
          <div>
            <h3>Product</h3>
            <Link href="/check">Check a link</Link>
            <a href="/#extension">Extension</a>
            <a href="/#verdicts">Verdicts</a>
          </div>
          <div>
            <h3>Guides</h3>
            <Link href="/guides/is-website-legit">Is this website legit?</Link>
            <Link href="/guides/fake-shopify-stores">Fake Shopify stores</Link>
            <Link href="/guides/urdu" hrefLang="ur" lang="ur" className="ur-inline">
              اردو گائیڈ
            </Link>
          </div>
          <div>
            <h3>Project</h3>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link href="/privacy">Privacy</Link>
            <a href={`${GITHUB}/blob/main/SECURITY.md`} target="_blank" rel="noreferrer">
              Security
            </a>
          </div>
        </nav>
      </div>
      <div className="container footer__base">
        <span>LegitLens · Qurtuba Labs · AGPL-3.0</span>
        <span className="mono">English + Urdu</span>
      </div>
    </footer>
  );
}
