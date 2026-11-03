import type { Metadata } from "next";
import { CheckClient } from "./CheckClient";
import { SITE_URL } from "@/lib/site";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * /check is the tool UI (indexable).
 * Any domain-bearing query (?url= / ?domain=) is noindex to avoid thin per-domain pages.
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const sp = await searchParams;
  const hasDomainQuery = Boolean(sp.url || sp.domain);

  if (hasDomainQuery) {
    return {
      title: "Check result",
      robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
      alternates: { canonical: `${SITE_URL}/check` },
    };
  }

  return {
    title: "Check if a website is safe — free link checker",
    description:
      "Paste a shop URL or domain. Free fake online shop and scam-signal checker with explainable reasons. No accounts. No fake reviews.",
    alternates: { canonical: "/check" },
    openGraph: {
      title: "LegitLens link checker",
      description: "Check if a website is legit before you pay.",
      url: `${SITE_URL}/check`,
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default function CheckPage() {
  return (
    <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <h1 style={{ marginTop: 0, color: "var(--gold)" }}>Check if a website is safe</h1>
      <p className="lead">
        Paste a shop URL or domain. LegitLens scores explainable signals and returns Looks
        OK / Be careful / High risk — never a defamatory “scam” label, and never invented
        trust scores.
      </p>
      <CheckClient />
    </section>
  );
}
