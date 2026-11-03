import type { Metadata } from "next";
import { CheckClient } from "./CheckClient";

export const metadata: Metadata = {
  title: "Check a link",
  description:
    "Free web checker — domain age, brand lookalikes, page signals, MIT phishing lists. Neutral verdicts by LegitLens.",
};

export default function CheckPage() {
  return (
    <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <h1 style={{ marginTop: 0, color: "var(--gold)" }}>Check a link</h1>
      <p className="lead">
        Paste a shop URL or domain. LegitLens scores explainable signals and returns Looks
        OK / Be careful / High risk — never a defamatory “scam” label.
      </p>
      <CheckClient />
    </section>
  );
}
