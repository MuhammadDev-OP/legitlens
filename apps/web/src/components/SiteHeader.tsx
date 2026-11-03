import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="brand">
        <Link href="/" className="brand-name" style={{ textDecoration: "none" }}>
          LegitLens
        </Link>
        <span className="brand-sub">
          by Qurtuba Labs · powered by{" "}
          <a href="https://www.codinito.com" target="_blank" rel="noreferrer">
            Codinito
          </a>
        </span>
      </div>
      <nav className="nav" aria-label="Primary">
        <Link href="/check">Check a link</Link>
        <Link href="/guides/is-website-legit">Guides</Link>
        <Link href="/privacy">Privacy</Link>
        <a
          href="https://github.com/MuhammadDev-OP/legitlens"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
