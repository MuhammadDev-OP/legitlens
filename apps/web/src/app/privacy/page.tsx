import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "LegitLens privacy promise: no browsing history stored; only the domain name is sent for RDAP lookup.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="page-section guide-prose container" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <h1 style={{ color: "var(--gold)" }}>Privacy</h1>
      <p>
        <strong>LegitLens</strong> is built to give you a second opinion without watching
        you. This is the promise for the browser extension and the free web checker.
      </p>
      <h2>What leaves your device</h2>
      <ul>
        <li>
          <strong>Only the domain name</strong> is sent to look up registration age via
          RDAP (through our edge proxy / cache, or directly to public RDAP servers).
        </li>
        <li>
          Page content is scored <strong>locally in the content script</strong> (DOM only).
          We do not upload page HTML, screenshots, cookies, or form fields.
        </li>
      </ul>
      <h2>What we do not store</h2>
      <ul>
        <li>No browsing history.</li>
        <li>No accounts, no tracking pixels, no advertising IDs.</li>
        <li>No sale of data — there is nothing to sell.</li>
      </ul>
      <h2>Caching</h2>
      <p>
        Domain age responses may be cached briefly on the edge so repeated checks for the
        same domain are faster and kinder to public RDAP servers. Cache entries are domain
        metadata only.
      </p>
      <h2>Contact</h2>
      <p>
        Questions: open an issue on{" "}
        <a href="https://github.com/MuhammadDev-OP/legitlens">GitHub</a>. Project by
        Muhammad Bangash · Qurtuba Labs · powered by{" "}
        <a href="https://www.codinito.com">Codinito</a>.
      </p>
    </section>
  );
}
