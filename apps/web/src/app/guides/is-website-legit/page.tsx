import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to tell if a website is legit",
  description:
    "Practical checks before you pay online: domain age, brand lookalikes, policies, payment methods, and pressure tactics. Free guide from LegitLens.",
  alternates: { canonical: "/guides/is-website-legit" },
  keywords: ["is this website legit", "check if a website is safe", "website scam signs"],
  openGraph: {
    title: "How to tell if a website is legit",
    images: ["/og.png"],
  },
};

export default function GuideLegitPage() {
  return (
    <article className="page-section guide-prose container" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <h1>How to tell if a website is legit</h1>
      <p>
        No single clue proves a shop is honest or dishonest. LegitLens stacks several{" "}
        <em>signals</em> so you can pause — especially on unfamiliar storefronts.
      </p>
      <h2>1. Domain age</h2>
      <p>
        Brand-new domains can be real launches, but many short-lived scam shops appear and
        vanish quickly. Check registration age (RDAP / WHOIS) before a large payment.
      </p>
      <h2>2. Lookalike names</h2>
      <p>
        Watch for brand names with extra words (<code>nike-outlet-sale.shop</code>),
        swapped letters, or unusual characters. Prefer the brand’s known domain.
      </p>
      <h2>3. Trust pages &amp; payments</h2>
      <p>
        Refund, contact, and about pages should be easy to find. Prefer card processors
        with buyer protection over bank-transfer or crypto-only checkouts.
      </p>
      <h2>4. Pressure</h2>
      <p>
        Extreme site-wide discounts and countdown timers are common urgency tricks. Compare
        prices on a known retailer.
      </p>
      <p>
        Try it: <Link href="/check">Check a link with LegitLens</Link>.
      </p>
    </article>
  );
}
