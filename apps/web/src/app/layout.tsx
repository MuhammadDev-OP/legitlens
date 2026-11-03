import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, Noto_Nastaliq_Urdu } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const body = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const urdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LegitLens — by Qurtuba Labs · powered by Codinito",
    template: "%s · LegitLens",
  },
  description:
    "Free open-source anti-scam & fake-shop checker. A second opinion before you pay — explainable signals, EN + UR. By Qurtuba Labs · powered by Codinito.",
  metadataBase: new URL("https://legitlens.vercel.app"),
  openGraph: {
    title: "LegitLens",
    description: "Check a shop or link before you pay. Free · open source · AGPL-3.0",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${urdu.variable}`}>
      <body
        style={{
          ["--font-display" as string]: "var(--font-fraunces), Georgia, serif",
          ["--font-body" as string]: "var(--font-source-serif), Georgia, serif",
        }}
      >
        <div className="container">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
