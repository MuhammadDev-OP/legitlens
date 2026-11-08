import Link from "next/link";
import { Icon } from "@/components/Icon";
import { HOME_FAQ } from "@/components/JsonLd";
import { VerdictCards } from "./VerdictCards";
import {
  GITHUB,
  GITHUB_CONTRIBUTING,
  GITHUB_INSTALL,
  PAY_BRAND,
  PAY_DOMAIN,
  SHOP_DOMAIN,
  SHOP_NAME,
} from "./examples";

const COUNTDOWN_SOURCE =
  "/\\b(hurry|only\\s*\\d+\\s*left|sale\\s*ends?\\s*in|limited\\s*time|expires?\\s*in|countdown|act\\s*now|last\\s*chance|flash\\s*sale)\\b/i";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow" />
        <div className="hero__geo" />
        <div className="hero__beam" />
      </div>
      <div className="container hero__inner">
        <p className="eyebrow-pill">
          <span className="dot" />
          Free &amp; open source <span className="sep">·</span> AGPL-3.0 <span className="sep">·</span>{" "}
          English +{" "}
          <span lang="ur" className="ur-inline">
            اردو
          </span>
        </p>
        <h1 id="hero-title" className="hero__title">
          Is this website legit?
          <br />
          <em className="serif">
            Know
            <svg className="know-line" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 9 C 50 3, 120 2, 197 7" />
            </svg>
          </em>{" "}
          before you pay.
        </h1>
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__sub">
              A free scam and fake-shop checker for your browser. Every signal comes with a
              plain-language reason — and <strong>only the domain ever leaves your device.</strong>
            </p>
            <form className="check" action="/check" method="get" role="search" aria-label="Check a website">
              <label className="sr-only" htmlFor="url">
                Website address to check
              </label>
              <div className="check__field">
                <Icon id="i-globe" className="ico check__globe" />
                <input
                  id="url"
                  name="url"
                  type="text"
                  inputMode="url"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder={`Paste a link, e.g. ${PAY_DOMAIN}`}
                />
                <kbd className="check__kbd" aria-hidden="true">
                  ⌘V
                </kbd>
              </div>
              <button className="btn btn--gold btn--lg" type="submit">
                Check
                <Icon id="i-arrow" />
              </button>
            </form>
            <ul className="hero__facts" aria-label="Promises">
              <li>
                <Icon id="i-lock" />
                Only the domain leaves your browser
              </li>
              <li>
                <Icon id="i-eye-off" />
                No history, accounts, ads or telemetry
              </li>
              <li>
                <Icon id="i-scale" />
                Neutral verdicts — never “this is a scam”
              </li>
            </ul>
          </div>

          <figure
            className="scan glass"
            aria-label={`Example scan of fictional shop ${SHOP_DOMAIN}, which lands on Be careful`}
          >
            <div className="scan__chrome">
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <div className="scan__url" data-spot="url">
                <Icon id="i-globe" />
                <span className="mono">{SHOP_DOMAIN}</span>
              </div>
              <span className="tag-example">Example</span>
            </div>
            <div className="scan__body">
              <div className="shop" aria-hidden="true">
                <div className="shop__nav">
                  <span className="shop__logo" data-spot="logo">
                    {SHOP_NAME}&nbsp;OUTLET
                  </span>
                  <span className="sk w40" />
                  <span className="sk w20" />
                  <span className="shop__cart" />
                </div>
                <div className="shop__banner" data-spot="sale">
                  <b>MEGA SALE · 75% OFF SITEWIDE</b>
                  <span className="shop__timer">
                    Ends in <span className="mono js-countdown">00:09:59</span>
                  </span>
                </div>
                <div className="shop__grid">
                  <div className="shop__item">
                    <div className="shop__img" />
                    <span className="shop__price">
                      <s>$189</s> $47
                    </span>
                  </div>
                  <div className="shop__item">
                    <div className="shop__img s2" />
                    <span className="shop__price">
                      <s>$240</s> $59
                    </span>
                  </div>
                  <div className="shop__item">
                    <div className="shop__img s3" />
                    <span className="shop__price">
                      <s>$160</s> $39
                    </span>
                  </div>
                </div>
                <div className="shop__foot">
                  <span>Shipping</span>
                  <span>FAQ</span>
                  <span className="shop__missing" data-spot="refund">
                    Refund policy
                  </span>
                </div>
              </div>
              <div className="lens" aria-hidden="true">
                <div className="lens__ring" />
                <div className="lens__handle" />
              </div>
            </div>
            <ul className="scan__signals" aria-label="Signals found">
              <li className="sig is-found" data-sig="0">
                <Icon id="i-clock" />
                <span className="sig__k">Domain age</span>
                <span className="sig__v">9 days</span>
              </li>
              <li className="sig is-found" data-sig="1">
                <Icon id="i-copy" />
                <span className="sig__k">Lookalike</span>
                <span className="sig__v">of a known brand</span>
              </li>
              <li className="sig is-found" data-sig="2">
                <Icon id="i-tag" />
                <span className="sig__k">Discount</span>
                <span className="sig__v">75% off sitewide</span>
              </li>
              <li className="sig is-found" data-sig="3">
                <Icon id="i-file-x" />
                <span className="sig__k">Trust pages</span>
                <span className="sig__v">No refund page</span>
              </li>
            </ul>
            <div className="scan__verdict">
              <div className="meter" aria-hidden="true">
                <svg viewBox="0 0 120 66">
                  <path className="meter__track ok" d="M10 60 A50 50 0 0 1 32 19" />
                  <path className="meter__track warn" d="M35 17 A50 50 0 0 1 82 14" />
                  <path className="meter__track risk" d="M85 16 A50 50 0 0 1 110 60" />
                  <g className="meter__needle">
                    <line x1="60" y1="60" x2="60" y2="20" />
                    <circle cx="60" cy="60" r="4" />
                  </g>
                </svg>
              </div>
              <div className="scan__verdict-text">
                <span className="pill pill--warn">
                  <Icon id="i-alert" />
                  Be careful{" "}
                  <span lang="ur" className="ur-inline">
                    احتیاط کریں
                  </span>
                </span>
                <p className="scan__reason">Signals suggest caution — verify the seller before you pay.</p>
              </div>
              <button className="replay" type="button" aria-label="Replay scan animation">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p id="scan-status" className="sr-only" role="status" />
            <figcaption className="sr-only">
              Animated example: a lens scans the fictional shop {SHOP_DOMAIN} and finds four signals,
              then shows the verdict Be careful. Not a real store.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function How() {
  return (
    <section className="section" id="how" aria-labelledby="how-title">
      <div className="container">
        <header className="sec-head">
          <p className="eyebrow">
            <span>01</span>How it works
          </p>
          <h2 id="how-title" data-split>
            A second opinion in three quiet steps.
          </h2>
          <p className="sec-lead" data-reveal>
            No sign-up, no dashboard. LegitLens reads the same clues a careful friend would — then
            tells you which ones it found and why they matter.
          </p>
        </header>
        <ol className="steps">
          <li className="step glass" data-reveal>
            <span className="step__n mono">01</span>
            <div className="step__art" aria-hidden="true">
              <div className="mini-input">
                <Icon id="i-globe" />
                <span className="mono">{PAY_DOMAIN}</span>
                <span className="caret" />
              </div>
              <div className="mini-cursor">
                <Icon id="i-cursor" />
              </div>
            </div>
            <h3>Visit or paste</h3>
            <p>
              Open a shop with the extension on, or paste any link into the web checker at{" "}
              <Link className="mono" href="/check">
                /check
              </Link>
              .
            </p>
          </li>
          <li className="step glass" data-reveal>
            <span className="step__n mono">02</span>
            <div className="step__art" aria-hidden="true">
              <div className="mini-rows">
                <span>
                  <i className="ok" />
                  Domain age · RDAP
                </span>
                <span>
                  <i className="ok" />
                  Brand lookalikes
                </span>
                <span>
                  <i className="ok" />
                  Page cues · local DOM
                </span>
                <span>
                  <i className="ok" />
                  Phishing lists · MIT
                </span>
              </div>
            </div>
            <h3>Signals checked locally</h3>
            <p>
              Page cues are read inside your browser. Only the domain name goes out, for a
              registration-age lookup.
            </p>
          </li>
          <li className="step glass" data-reveal>
            <span className="step__n mono">03</span>
            <div className="step__art" aria-hidden="true">
              <div className="mini-verdict">
                <span className="pill pill--warn pill--sm">Be careful</span>
                <span className="mini-line" />
                <span className="mini-line s" />
              </div>
            </div>
            <h3>Explainable verdict</h3>
            <p>Looks OK, Be careful or High risk — each with the human-readable reasons behind it, in English or Urdu.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}

export function Signals() {
  return (
    <section className="section" id="signals" aria-labelledby="signals-title">
      <div className="container">
        <header className="sec-head">
          <p className="eyebrow">
            <span>02</span>Signals
          </p>
          <h2 id="signals-title" data-split>
            The tells fake shops can’t easily hide.
          </h2>
          <p className="sec-lead" data-reveal>
            Four families of open, testable rules. Each one adds weight to the score and a sentence
            to the explanation.
          </p>
        </header>
        <div className="bento">
          <article className="card glass card--age" data-reveal>
            <div className="card__head">
              <Icon id="i-clock" />
              <h3>Domain age &amp; registrar</h3>
              <span className="src mono">RDAP · IANA bootstrap</span>
            </div>
            <p>
              Very new domains weigh more. We look up registration date and registrar through RDAP —
              no API key, no tracking.
            </p>
            <div className="age" aria-hidden="true">
              <div className="age__axis">
                <span className="age__tick" style={{ ["--x" as string]: "0%" }}>
                  2016
                </span>
                <span className="age__tick" style={{ ["--x" as string]: "20%" }}>
                  2018
                </span>
                <span className="age__tick" style={{ ["--x" as string]: "40%" }}>
                  2020
                </span>
                <span className="age__tick" style={{ ["--x" as string]: "60%" }}>
                  2022
                </span>
                <span className="age__tick" style={{ ["--x" as string]: "80%" }}>
                  2024
                </span>
                <span className="age__tick" style={{ ["--x" as string]: "100%" }}>
                  2026
                </span>
              </div>
              <div className="age__track">
                <div className="age__bar age__bar--old">
                  <span className="mono">example-established.com</span>
                </div>
                <div className="age__bar age__bar--new">
                  <span className="mono">{SHOP_DOMAIN}</span>
                </div>
                <span className="age__flag">
                  <b className="mono">9 days</b> registered 27 Oct 2026
                </span>
              </div>
              <dl className="age__rdap mono">
                <div>
                  <dt>events.registration</dt>
                  <dd>2026-10-27</dd>
                </div>
                <div>
                  <dt>registrar</dt>
                  <dd>Example Registrar, Inc.</dd>
                </div>
              </dl>
            </div>
            <p className="card__eg">Example domains, illustrative dates.</p>
          </article>

          <article className="card glass card--glyph" data-reveal>
            <div className="card__head">
              <Icon id="i-copy" />
              <h3>Brand lookalikes</h3>
              <span className="src mono">edit distance · homoglyphs · punycode</span>
            </div>
            <p>
              One swapped letter is all it takes. We compare against a bundled brand list and flag
              near-misses.
            </p>
            <div className="glyph" aria-hidden="true">
              <div className="glyph__row">
                <span className="glyph__lbl mono">brand</span>
                <span className="glyph__word mono">
                  zy<b className="g-src">l</b>o
                </span>
              </div>
              <div className="glyph__row is-sus">
                <span className="glyph__lbl mono">visited</span>
                <span className="glyph__word mono">
                  zy
                  <b className="g-swap">
                    <i className="g-l">l</i>
                    <i className="g-1">1</i>
                  </b>
                  o<em>-secure-login.shop</em>
                </span>
              </div>
              <div className="glyph__meta mono">
                <span>
                  edit distance <b>1</b>
                </span>
                <span>l → 1 homoglyph</span>
                <span>+ shop words</span>
              </div>
            </div>
            <ul className="chips" aria-label="Lookalike checks">
              <li className="mono">xn--punycode</li>
              <li className="mono">brand + “outlet”</li>
              <li className="mono">rn → m</li>
              <li className="mono">0 → o</li>
            </ul>
            <p className="card__eg">
              Illustration only. {PAY_BRAND} is a fictional payment brand, not a listed one.
            </p>
          </article>

          <article className="card glass card--press" data-reveal>
            <div className="card__head">
              <Icon id="i-tag" />
              <h3>Pressure tactics</h3>
            </div>
            <p>70%+ discounts across many items and countdown urgency are classic rush-to-pay cues.</p>
            <div className="press" aria-hidden="true">
              <div className="press__price">
                <s className="mono">$189.00</s>
                <b className="mono">$47.00</b>
                <span className="press__off">−75%</span>
              </div>
              <div className="press__timer">
                <span>Sale ends in</span>
                <b className="mono js-countdown2">09:59</b>
              </div>
              <div className="press__thr">
                <span className="press__thr-bar">
                  <i />
                </span>
                <span className="mono">flag at 70%+</span>
              </div>
            </div>
          </article>

          <article className="card glass card--lists" data-reveal>
            <div className="card__head">
              <Icon id="i-list" />
              <h3>Phishing lists</h3>
            </div>
            <p>Community lists, MIT-licensed only — bundled, so checks don’t phone home.</p>
            <ul className="lists">
              <li>
                <Icon id="i-check" className="ico ok" />
                <span>Phishing.Database</span>
                <span className="lic mono">MIT</span>
              </li>
              <li>
                <Icon id="i-check" className="ico ok" />
                <span>destroylist</span>
                <span className="lic mono">MIT</span>
              </li>
              <li className="no">
                <Icon id="i-x" />
                <span>OpenPhish · Google Safe Browsing</span>
                <span className="lic mono">never</span>
              </li>
            </ul>
          </article>

          <article className="card glass card--cues" data-reveal>
            <div className="card__head">
              <Icon id="i-file-x" />
              <h3>Page cues</h3>
              <span className="src mono">content script · DOM only</span>
            </div>
            <div className="cues">
              <div className="cue">
                <span className="cue__k">Trust pages</span>
                <span className="cue__v">
                  <b className="x">Refund</b>
                  <b className="x">Contact</b>
                  <b className="y">About</b>
                </span>
              </div>
              <div className="cue">
                <span className="cue__k">Storefront</span>
                <span className="cue__v mono">store-x7k2a.myshopify.com</span>
              </div>
              <div className="cue">
                <span className="cue__k">Payment</span>
                <span className="cue__v">
                  <b className="x">Bank transfer only</b>
                  <b className="x">Crypto only</b>
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Verdicts() {
  return (
    <section className="section" id="verdicts" aria-labelledby="verdicts-title">
      <div className="container">
        <header className="sec-head">
          <p className="eyebrow">
            <span>03</span>Verdicts
          </p>
          <h2 id="verdicts-title" data-split>
            Three calm answers. Never a label.
          </h2>
          <p className="sec-lead" data-reveal>
            Honest small shops deserve fairness, and you deserve a warning. So LegitLens never says
            “this is a scam” — it says what it saw, in your language.
          </p>
        </header>
        <VerdictCards />
      </div>
    </section>
  );
}

export function Privacy() {
  return (
    <section className="section section--privacy" id="privacy" aria-labelledby="privacy-title">
      <div className="container">
        <header className="sec-head sec-head--center">
          <p className="eyebrow">
            <span>04</span>Privacy
          </p>
          <h2 id="privacy-title" data-split>
            Your page stays home. Only the name goes out.
          </h2>
          <p className="sec-lead" data-reveal>
            The page is scanned inside your browser. The single thing that travels is the domain
            string — so we can ask the registry how old it is.
          </p>
        </header>
        <div className="flow" data-reveal>
          <div className="flow__box flow__browser glass">
            <div className="flow__title">
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              Your browser
            </div>
            <ul className="flow__local">
              <li>
                <Icon id="i-lock" />
                Page text &amp; DOM<span>stays local</span>
              </li>
              <li>
                <Icon id="i-lock" />
                Cart &amp; checkout form<span>stays local</span>
              </li>
              <li>
                <Icon id="i-lock" />
                Browsing history<span>never stored</span>
              </li>
              <li>
                <Icon id="i-lock" />
                Cookies &amp; logins<span>never read</span>
              </li>
            </ul>
            <div className="flow__engine">
              <Icon id="i-cpu" />
              <div>
                <b>Scoring engine</b>
                <span className="mono">packages/rules · runs here</span>
              </div>
            </div>
            <div className="flow__out">
              <span className="mono">{PAY_DOMAIN}</span>
              <span className="flow__out-lbl">the only thing sent</span>
            </div>
          </div>
          <div className="flow__wire" aria-hidden="true">
            <svg className="wire wire--h" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet">
              <path className="wire__ghost" d="M0 176 C 110 176, 150 70, 320 70" />
              <path className="wire__ghost" d="M320 110 C 170 110, 130 206, 0 206" />
              <path className="wire__path wire__out" d="M0 176 C 110 176, 150 70, 320 70" />
              <path className="wire__path wire__back" d="M320 110 C 170 110, 130 206, 0 206" />
              <g className="packet packet--out">
                <rect x="-58" y="-13" width="116" height="26" rx="13" />
                <text x="0" y="4.5" textAnchor="middle">
                  domain only
                </text>
              </g>
              <g className="packet packet--back">
                <rect x="-52" y="-13" width="104" height="26" rx="13" />
                <text x="0" y="4.5" textAnchor="middle">
                  age: 9 days
                </text>
              </g>
            </svg>
            <svg className="wire wire--v" viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet">
              <path className="wire__ghost" d="M80 0 C 80 80, 80 120, 80 200" />
              <path className="wire__ghost" d="M160 200 C 160 120, 160 80, 160 0" />
              <path className="wire__path wire__out" d="M80 0 C 80 80, 80 120, 80 200" />
              <path className="wire__path wire__back" d="M160 200 C 160 120, 160 80, 160 0" />
              <g className="packet packet--out">
                <rect x="-50" y="-13" width="100" height="26" rx="13" />
                <text x="0" y="4.5" textAnchor="middle">
                  domain only
                </text>
              </g>
              <g className="packet packet--back">
                <rect x="-48" y="-13" width="96" height="26" rx="13" />
                <text x="0" y="4.5" textAnchor="middle">
                  age: 9 days
                </text>
              </g>
            </svg>
          </div>
          <div className="flow__box flow__server glass">
            <div className="flow__title">
              <Icon id="i-globe" />
              RDAP lookup
            </div>
            <div className="srv">
              <span className="mono">/api/rdap</span>
              <small>cache + SSRF guard</small>
            </div>
            <div className="srv">
              <span className="mono">IANA bootstrap</span>
              <small>finds the right registry</small>
            </div>
            <div className="srv">
              <span className="mono">TLD RDAP server</span>
              <small>returns registration date &amp; registrar</small>
            </div>
            <p className="flow__none">No accounts · No ads · No telemetry</p>
          </div>
        </div>
        <ul className="promises">
          <li data-reveal>
            <b>Only the domain name</b> is sent for RDAP age lookup.
          </li>
          <li data-reveal>
            <b>Page DOM is scanned locally</b> in the content script — nothing else is uploaded.
          </li>
          <li data-reveal>
            <b>No browsing history stored.</b> No accounts. No ads. No telemetry.
          </li>
        </ul>
        <p className="sec-lead" data-reveal style={{ marginTop: "1.5rem" }}>
          The full promise is on the <Link href="/privacy">privacy page</Link>.
        </p>
      </div>
    </section>
  );
}

export function Extension() {
  return (
    <section className="section" id="extension" aria-labelledby="ext-title">
      <div className="container ext">
        <header className="sec-head ext__head">
          <p className="eyebrow">
            <span>05</span>Browser extension
          </p>
          <h2 id="ext-title" data-split>
            A quiet guard at checkout.
          </h2>
          <p className="sec-lead" data-reveal>
            The Manifest V3 extension badges the toolbar, raises a banner on checkout pages, and
            lets you ask someone you trust before you pay.
          </p>
          <ul className="ext__list">
            <li data-reveal>
              <span className="ext__ico">
                <Icon id="logo" />
              </span>
              <div>
                <b>Toolbar badge</b>
                <span>OK, ! or !! at a glance, coloured by verdict.</span>
              </div>
            </li>
            <li data-reveal>
              <span className="ext__ico">
                <Icon id="i-alert" />
              </span>
              <div>
                <b>Checkout banner</b>
                <span>Optional, with your permission — reasons plus “Continue anyway”.</span>
              </div>
            </li>
            <li data-reveal>
              <span className="ext__ico">
                <Icon id="i-wa" />
              </span>
              <div>
                <b>Ask my family</b>
                <span>Share the verdict and reasons on WhatsApp in one tap.</span>
              </div>
            </li>
            <li data-reveal>
              <span className="ext__ico">
                <Icon id="i-lock" />
              </span>
              <div>
                <b>Minimal permissions</b>
                <span className="mono">activeTab · storage · scripting</span>
              </div>
            </li>
          </ul>
          <a className="btn btn--ghost" href={GITHUB_INSTALL} data-reveal target="_blank" rel="noreferrer">
            Load it from source
            <Icon id="i-arrow" />
          </a>
        </header>

        <div
          className="browser"
          data-reveal
          role="img"
          aria-label={`Mockup of the LegitLens extension on a fictional checkout for ${SHOP_DOMAIN}`}
        >
          <div className="browser__win glass">
            <div className="browser__tabs">
              <span className="dots">
                <i />
                <i />
                <i />
              </span>
              <span className="browser__tab">Outlet Store — Checkout</span>
            </div>
            <div className="browser__bar">
              <span className="browser__nav">‹ ›</span>
              <span className="browser__url mono">
                {SHOP_DOMAIN}/checkout <em>example</em>
              </span>
              <span className="browser__ext">
                <svg>
                  <use href="#logo" />
                </svg>
                <b className="badge">!</b>
              </span>
            </div>
            <div className="browser__page">
              <div className="banner">
                <Icon id="i-alert" />
                <p>
                  <b>LegitLens · Be careful</b> Signals suggest caution before you pay on this
                  checkout.
                </p>
                <span className="banner__btns">
                  <span className="b-ghost">See reasons</span>
                  <span className="b-ghost">Continue anyway</span>
                </span>
              </div>
              <div className="checkout">
                <div className="checkout__form">
                  <span className="ck-label">Contact</span>
                  <span className="ck-input" />
                  <span className="ck-label">Shipping address</span>
                  <span className="ck-input" />
                  <span className="ck-input half" />
                  <span className="ck-label">Payment</span>
                  <span className="ck-pay">
                    <b>Bank transfer only</b>
                    <small>card payments unavailable</small>
                  </span>
                </div>
                <div className="checkout__sum">
                  <span className="ck-row">
                    <i />
                    <span className="sk w60" />
                    <span className="mono">$47</span>
                  </span>
                  <span className="ck-row">
                    <i />
                    <span className="sk w50" />
                    <span className="mono">$59</span>
                  </span>
                  <span className="ck-total">
                    <span>Total</span>
                    <b className="mono">$106</b>
                  </span>
                  <span className="ck-btn">Pay now</span>
                </div>
              </div>
            </div>
          </div>

          <div className="popup glass">
            <div className="popup__head">
              <Icon id="logo" className="brand__mark" />
              <b>LegitLens</b>
              <span className="mono">{SHOP_DOMAIN}</span>
            </div>
            <span className="pill pill--warn">
              <Icon id="i-alert" />
              Be careful
            </span>
            <ul>
              <li>This domain was registered very recently (9 days ago).</li>
              <li>Many items show extreme discounts (70%+).</li>
              <li>The page emphasizes bank transfer or crypto-only payment.</li>
            </ul>
            <div className="popup__btns">
              <span className="p-wa">
                <Icon id="i-wa" />
                Ask my family
              </span>
              <span className="p-ghost">Continue anyway</span>
            </div>
            <small className="popup__priv">
              <Icon id="i-lock" />
              Only the domain name is sent for age lookup.
            </small>
          </div>

          <div className="wa">
            <div className="wa__head">
              <span className="wa__av">A</span>
              <div>
                <b>Family</b>
                <small>WhatsApp</small>
              </div>
            </div>
            <div className="wa__bubble">
              I checked {SHOP_DOMAIN} with LegitLens: Be careful. Reasons: very new domain (9 days),
              70%+ discounts, bank-transfer-only payment. What do you think?
              <span className="wa__time">now ✓✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OpenSource() {
  return (
    <section className="section" id="open-source" aria-labelledby="os-title">
      <div className="container">
        <header className="sec-head">
          <p className="eyebrow">
            <span>06</span>Open source
          </p>
          <h2 id="os-title" data-split>
            Don’t trust us. Read the rules.
          </h2>
          <p className="sec-lead" data-reveal>
            Every weight and every reason lives in <span className="mono">packages/rules</span> under
            AGPL-3.0. If a rule is unfair, you can see it — and fix it.
          </p>
        </header>
        <div className="os">
          <div className="os__code glass" data-reveal>
            <div className="os__file">
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="mono">packages/rules/src/signals/pageSignals.ts</span>
            </div>
            <pre className="code mono" tabIndex={0} aria-label="Excerpt from pageSignals.ts">
              <code>
                <span className="c-k">const</span> <span className="c-v">COUNTDOWN</span> ={"\n"}
                <span className="c-s">{"  " + COUNTDOWN_SOURCE}</span>;{"\n\n"}
                <span className="c-k">const</span> <span className="c-v">missing</span>:{" "}
                <span className="c-t">string</span>[] = [];{"\n"}
                <span className="c-k">if</span> (page.hasRefundPolicy === <span className="c-k">false</span>)
                missing.push(<span className="c-s">&quot;refund&quot;</span>);{"\n"}
                <span className="c-k">if</span> (page.hasContact === <span className="c-k">false</span>)
                missing.push(<span className="c-s">&quot;contact&quot;</span>);{"\n"}
                <span className="c-k">if</span> (page.hasAbout === <span className="c-k">false</span>)
                missing.push(<span className="c-s">&quot;about&quot;</span>);{"\n"}
                <span className="c-k">if</span> (missing.length &gt;= <span className="c-n">2</span>) {"{"}
                {"\n"}
                {"  "}results.push({"{"}
                {"\n"}
                {"    "}id: <span className="c-s">&quot;missing_policy_pages&quot;</span>,{"\n"}
                {"    "}weight: <span className="c-n">12</span> + missing.length *{" "}
                <span className="c-n">2</span>,{"\n"}
                {"    "}triggered: <span className="c-k">true</span>,{"\n"}
                {"    "}reasonKey: <span className="c-s">&quot;reason.missing_policy_pages&quot;</span>,
                {"\n"}
                {"    "}detail: <span className="c-s">`missing=${"{"}missing.join(&quot;,&quot;){"}"}`</span>,
                {"\n"}
                {"  "}
                {"}"});{"\n"}
                {"}"}
              </code>
            </pre>
          </div>
          <div className="os__side">
            <div className="os__card glass" data-reveal>
              <span className="os__big">AGPL-3.0</span>
              <p>Free in v1. No accounts, no paid tiers — just rules you can read.</p>
            </div>
            <div className="os__card glass" data-reveal>
              <pre className="tree mono" aria-label="Monorepo layout">
                apps/extension <span>WXT · MV3 · React popup</span>
                {"\n"}
                apps/web <span>Next.js · /check · /api/rdap</span>
                {"\n"}
                packages/rules <span>scoring engine + Vitest</span>
              </pre>
            </div>
          </div>
        </div>
        <ul className="ci" aria-label="Security and quality checks in CI" data-reveal>
          <li>
            <Icon id="i-check" />
            <b>CI</b>
            <span>lint · typecheck · test · build</span>
          </li>
          <li>
            <Icon id="i-check" />
            <b>CodeQL</b>
            <span>push, PR + weekly</span>
          </li>
          <li>
            <Icon id="i-check" />
            <b>Gitleaks</b>
            <span>secret scan</span>
          </li>
          <li>
            <Icon id="i-check" />
            <b>Scorecard</b>
            <span>OpenSSF</span>
          </li>
          <li>
            <Icon id="i-check" />
            <b>pnpm audit</b>
            <span>fail on high+</span>
          </li>
        </ul>
        <div className="os__cta" data-reveal>
          <a className="btn btn--gold btn--lg" href={GITHUB} target="_blank" rel="noreferrer">
            <Icon id="i-github" />
            View on GitHub
          </a>
          <a className="btn btn--ghost btn--lg" href={GITHUB_CONTRIBUTING} target="_blank" rel="noreferrer">
            Contribute a rule
          </a>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq">
        <header className="sec-head">
          <p className="eyebrow">
            <span>07</span>FAQ
          </p>
          <h2 id="faq-title" data-split>
            Honest answers.
          </h2>
          <p className="sec-lead" data-reveal>
            Still unsure? Read the code, or open an issue on GitHub.
          </p>
        </header>
        <div className="faq__list">
          {HOME_FAQ.map((item, index) => (
            <details key={item.question} data-reveal open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final" aria-labelledby="final-title">
      <div className="final__glow" aria-hidden="true" />
      <div className="container final__inner">
        <Icon id="logo" className="final__mark" />
        <h2 id="final-title" data-split>
          Pause. Check. <span className="gold">Then pay.</span>
        </h2>
        <p className="sec-lead">Free, open source, and private by design. Paste a link or load the extension.</p>
        <div className="final__btns">
          <Link className="btn btn--gold btn--lg" href="/check">
            Check a link
            <Icon id="i-arrow" />
          </Link>
          <a className="btn btn--ghost btn--lg" href={GITHUB} target="_blank" rel="noreferrer">
            <Icon id="i-github" />
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
