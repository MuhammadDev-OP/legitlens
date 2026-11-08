import type { Metadata } from "next";
import { HomeJsonLd } from "@/components/JsonLd";
import { HomeShell } from "@/components/home/HomeShell";
import {
  Extension,
  Faq,
  FinalCta,
  Hero,
  How,
  OpenSource,
  Privacy,
  Signals,
  Verdicts,
} from "@/components/home/HomeSections";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./home.css";

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
      <HomeShell>
        <Hero />
        <How />
        <Signals />
        <Verdicts />
        <Privacy />
        <Extension />
        <OpenSource />
        <Faq />
        <FinalCta />
      </HomeShell>
    </>
  );
}
