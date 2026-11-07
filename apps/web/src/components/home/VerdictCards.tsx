"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { PAY_BRAND, PAY_DOMAIN, SHOP_DOMAIN } from "./examples";

type Lang = "en" | "ur";

type Reason = { en: string; ur: string };

const cards: Array<{
  tone: "ok" | "warn" | "risk";
  featured?: boolean;
  initial: Lang;
  label: Reason;
  meaning: string;
  reasons: Reason[];
  example: string;
}> = [
  {
    tone: "ok",
    initial: "en",
    label: { en: "Looks OK", ur: "ٹھیک لگتا ہے" },
    meaning: "No elevated risk signals from the rules we ship.",
    reasons: [
      {
        en: "Registrar details are limited or privacy-protected — normal for many sites, but note it.",
        ur: "رجسٹرار کی تفصیلات محدود یا پرائیویسی سے محفوظ ہیں — بہت سی سائٹس کے لیے عام ہے، مگر نوٹ کریں۔",
      },
    ],
    example: "e.g. a long-registered shop with refund, contact and about pages",
  },
  {
    tone: "warn",
    featured: true,
    initial: "ur",
    label: { en: "Be careful", ur: "احتیاط کریں" },
    meaning: "Signals suggest caution — verify before you pay.",
    reasons: [
      {
        en: "This domain was registered very recently (9 days ago). New shops can be legitimate, but signals suggest caution.",
        ur: "یہ ڈومین بہت حال ہی میں رجسٹر ہوئی ہے (9 دن پہلے)۔ نئی دکان جائز بھی ہو سکتی ہے، مگر اشارے احتیاط کا مشورہ دیتے ہیں۔",
      },
      {
        en: "Many items show extreme discounts (70%+). That can be a pressure tactic — compare prices elsewhere.",
        ur: "بہت سی اشیاء پر انتہائی رعایت (70%+) دکھائی گئی ہے۔ یہ دباؤ کی حکمت عملی ہو سکتی ہے — قیمتیں کہیں اور موازنہ کریں۔",
      },
    ],
    example: `e.g. ${SHOP_DOMAIN} (fictional)`,
  },
  {
    tone: "risk",
    initial: "en",
    label: { en: "High risk", ur: "زیادہ خطرہ" },
    meaning: "Multiple strong signals; treat with high caution.",
    reasons: [
      {
        en: `The domain uses lookalike characters that may impersonate ${PAY_BRAND}.`,
        ur: `ڈومین میں ملتے جلتے حروف استعمال ہوئے ہیں جو ${PAY_BRAND} کی نقل کر سکتے ہیں۔`,
      },
      {
        en: "This domain appears on a community phishing list we bundle. Treat it with high caution.",
        ur: "یہ ڈومین ہماری شامل کمیونٹی فشنگ فہرست میں ہے۔ اسے زیادہ احتیاط سے دیکھیں۔",
      },
    ],
    example: `e.g. ${PAY_DOMAIN} (fictional)`,
  },
];

function VerdictCard({
  tone,
  featured,
  initial,
  label,
  meaning,
  reasons,
  example,
}: (typeof cards)[number]) {
  const [lang, setLang] = useState<Lang>(initial);
  const icon = tone === "ok" ? "i-check" : "i-alert";

  return (
    <article
      className={`vcard glass vcard--${tone}${featured ? " is-featured" : ""}`}
      data-reveal
      data-lang={lang}
    >
      <div className="vcard__top">
        <span className={`pill pill--${tone}`}>
          <Icon id={icon} />
          <span lang={lang === "ur" ? "ur" : undefined}>{label[lang]}</span>
        </span>
        <div className="seg" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
          <button type="button" aria-pressed={lang === "ur"} lang="ur" onClick={() => setLang("ur")}>
            اردو
          </button>
        </div>
      </div>
      <p className="vcard__meaning">{meaning}</p>
      <ul className="vcard__reasons" lang={lang === "ur" ? "ur" : undefined} dir={lang === "ur" ? "rtl" : undefined}>
        {reasons.map((reason) => (
          <li key={reason.en}>{reason[lang]}</li>
        ))}
      </ul>
      <p className="vcard__eg mono">{example}</p>
    </article>
  );
}

export function VerdictCards() {
  return (
    <div className="verdicts">
      {cards.map((card) => (
        <VerdictCard key={card.tone} {...card} />
      ))}
    </div>
  );
}
