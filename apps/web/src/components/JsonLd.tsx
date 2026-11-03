import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const faq = [
  {
    question: "How can I check if a website is legit?",
    answer:
      "Look at domain age, whether the name impersonates a known brand, missing refund or contact pages, extreme discounts, and pressure tactics. LegitLens scores these signals and shows plain-language reasons — it never invents reviews or download counts.",
  },
  {
    question: "Is this a scam checker that labels shops as scams?",
    answer:
      "No. LegitLens uses neutral wording such as Looks OK, Be careful, and High risk, with reasons like “signals suggest caution.” That protects honest small shops from defamatory labels while still warning you.",
  },
  {
    question: "How do I check if a website is safe before paying?",
    answer:
      "Paste the link into LegitLens /check or use the browser extension. We look up domain registration age via RDAP, compare lookalike brands, and (in the extension) scan the page locally. Only the domain name is sent for age lookup.",
  },
  {
    question: "Can LegitLens spot a fake online shop?",
    answer:
      "It flags common fake-shop patterns: brand+outlet domains, very new registrations, myshopify-style hosts, crypto-only or bank-transfer pressure, and hits on MIT-licensed phishing lists. It is a second opinion, not a guarantee.",
  },
  {
    question: "Is LegitLens free and open source?",
    answer:
      "Yes. The extension and web checker are free under AGPL-3.0. There are no accounts, no paid tiers in v1, and no invented user statistics.",
  },
];

export function HomeJsonLd() {
  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BrowserApplication",
    applicationSubCategory: "SecurityApplication",
    operatingSystem: "Web, Chrome, Chromium, Firefox",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    author: {
      "@type": "Organization",
      name: "Qurtuba Labs",
      url: "https://www.codinito.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Qurtuba Labs",
    },
    license: "https://www.gnu.org/licenses/agpl-3.0.html",
    isAccessibleForFree: true,
    featureList: [
      "Domain age via RDAP",
      "Brand lookalike detection",
      "Local page-signal scan",
      "MIT-licensed phishing list indicators",
      "English and Urdu explanations",
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    // Point people at the tool UI — we deliberately do not publish per-domain URLs.
    potentialAction: {
      "@type": "ViewAction",
      target: `${SITE_URL}/check`,
      name: "Check if a website is safe",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}

export const HOME_FAQ = faq;
