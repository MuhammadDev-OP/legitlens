import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ویب سائٹ چیک کرنے کی اردو گائیڈ",
  description:
    "آن لائن خریداری سے پہلے ڈومین کی عمر، جعلی برانڈ نام، ادائیگی کے طریقے اور دباؤ والی رعایتیں کیسے دیکھیں — LegitLens اردو گائیڈ۔",
  alternates: { canonical: "/guides/urdu", languages: { ur: "/guides/urdu", en: "/guides/is-website-legit" } },
  openGraph: {
    locale: "ur_PK",
    title: "ویب سائٹ چیک کرنے کی اردو گائیڈ",
    images: ["/og.png"],
  },
};

export default function GuideUrduPage() {
  return (
    <article
      className="page-section guide-prose locale-ur container"
      style={{ borderTop: "none", paddingTop: "2rem" }}
      lang="ur"
      dir="rtl"
    >
      <h1>ویب سائٹ چیک کرنے کی آسان گائیڈ</h1>
      <p>
        LegitLens آپ کو ادائیگی سے پہلے ایک دوسری رائے دیتا ہے۔ ہم کبھی یہ نہیں کہتے کہ
        ”یہ دھوکہ ہے“ — صرف واضح اشارے دکھاتے ہیں تاکہ آپ احتیاط سے فیصلہ کریں۔
      </p>
      <h2>ڈومین کتنی پرانی ہے؟</h2>
      <p>
        بہت نئی ڈومین والی دکانیں کبھی کبھار جائز ہوتی ہیں، مگر بہت سے جعلی اسٹور جلد بنتے
        اور غائب ہو جاتے ہیں۔ بڑی رقم بھیجنے سے پہلے عمر ضرور دیکھیں۔
      </p>
      <h2>برانڈ سے ملتے جلتے نام</h2>
      <p>
        مشہور برانڈ کے ساتھ <em>outlet</em> یا <em>sale</em> جیسے الفاظ والی سائٹس پر خاص
        احتیاط کریں۔ اصل کمپنی کی معروف ویب سائٹ استعمال کریں۔
      </p>
      <h2>ادائیگی اور دباؤ</h2>
      <p>
        صرف بینک ٹرانسفر یا کرپٹو، اور تیز کاؤنٹ ڈاؤن، دباؤ ڈالنے کے طریقے ہو سکتے ہیں۔
        کارڈ یا معروف ادائیگی سروسز ترجیح دیں جن میں خریدار کی حفاظت ہو۔
      </p>
      <p>
        اب آزمائیں: <Link href="/check">لنک چیک کریں</Link>۔
      </p>
    </article>
  );
}
