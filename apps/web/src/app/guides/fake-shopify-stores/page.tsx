import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spotting fake Shopify stores",
  description:
    "How clone storefronts reuse themes, myshopify URLs, and huge discounts — and what to verify before checkout. Fake online shop checker guide.",
  alternates: { canonical: "/guides/fake-shopify-stores" },
  keywords: ["fake shopify store", "fake online shop checker", "myshopify scam"],
  openGraph: {
    title: "Spotting fake Shopify stores",
    images: ["/og.png"],
  },
};

export default function GuideShopifyPage() {
  return (
    <article className="section guide-prose" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <h1>Spotting fake Shopify stores</h1>
      <p>
        Shopify makes it easy to launch a real business — and easy for copycats to spin up
        a polished theme in minutes. A Shopify-powered shop is not automatically safe or
        unsafe; look at the signals around it.
      </p>
      <h2>Default / myshopify hostnames</h2>
      <p>
        Stores still on <code>*.myshopify.com</code> may be brand new or unfinished. Ask
        why they have not moved to a custom domain if they claim to be a major brand.
      </p>
      <h2>Theme clones &amp; stock photos</h2>
      <p>
        Identical layouts, stolen product photos, and “90% off everything” banners often
        travel together. Search an image or product name to see if it belongs elsewhere.
      </p>
      <h2>Policies you cannot find</h2>
      <p>
        Missing refund or contact details is a yellow flag — especially with prepaid or
        irreversible payment methods.
      </p>
      <p>
        <Link href="/check">Run a LegitLens check</Link> or read{" "}
        <Link href="/guides/is-website-legit">how to tell if a website is legit</Link>.
      </p>
    </article>
  );
}
