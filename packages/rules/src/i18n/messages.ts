import type { Locale } from "../types/index.js";

type MessageCatalog = Record<string, string>;

const en: MessageCatalog = {
  "verdict.looks_ok": "Looks OK",
  "verdict.be_careful": "Be careful",
  "verdict.high_risk": "High risk",
  "reason.domain_age_very_new":
    "This domain was registered very recently ({ageDays} days ago). New shops can be legitimate, but signals suggest caution.",
  "reason.domain_age_new":
    "This domain is relatively new ({ageDays} days old). Consider verifying the seller before paying.",
  "reason.domain_age_unknown":
    "We could not confirm how long this domain has been registered.",
  "reason.brand_lookalike":
    "The domain name closely resembles a well-known brand ({brand}). Signals suggest caution.",
  "reason.homoglyph":
    "The domain uses lookalike characters that may impersonate {brand}.",
  "reason.punycode":
    "This domain uses internationalized (punycode) characters that can hide lookalike names.",
  "reason.brand_extra_words":
    "The domain combines a brand name ({brand}) with extra shop-like words. Signals suggest caution.",
  "reason.myshopify_pattern":
    "This looks like a newly created or default storefront pattern (for example myshopify). Verify the seller carefully.",
  "reason.extreme_discounts":
    "Many items show extreme discounts (70%+). That can be a pressure tactic — compare prices elsewhere.",
  "reason.missing_policy_pages":
    "Common trust pages (refund, contact, or about) were hard to find on this site.",
  "reason.risky_payment_wording":
    "The page emphasizes bank transfer or crypto-only payment. Prefer protected payment methods when possible.",
  "reason.countdown_pressure":
    "Countdown or urgency messaging was detected. Take your time before paying.",
  "reason.phishing_list_hit":
    "This domain appears on a community phishing list we bundle. Treat it with high caution.",
  "reason.registrar_privacy":
    "Registrar details are limited or privacy-protected — normal for many sites, but note it.",
  "privacy.promise":
    "Only the domain name is sent for age lookup. We do not store browsing history.",
  "share.whatsapp":
    "I checked {domain} with LegitLens: {verdict}. Reasons: {reasons}. What do you think?",
  "cta.continue_anyway": "Continue anyway",
  "cta.ask_family": "Ask my family",
  "cta.check_link": "Check a link",
};

const ur: MessageCatalog = {
  "verdict.looks_ok": "ٹھیک لگتا ہے",
  "verdict.be_careful": "احتیاط کریں",
  "verdict.high_risk": "زیادہ خطرہ",
  "reason.domain_age_very_new":
    "یہ ڈومین بہت حال ہی میں رجسٹر ہوئی ہے ({ageDays} دن پہلے)۔ نئی دکان جائز بھی ہو سکتی ہے، مگر اشارے احتیاط کا مشورہ دیتے ہیں۔",
  "reason.domain_age_new":
    "یہ ڈومین نسبتاً نئی ہے ({ageDays} دن پرانی)۔ ادائیگی سے پہلے بیچنے والے کی تصدیق کریں۔",
  "reason.domain_age_unknown":
    "ہم اس ڈومین کی عمر کی تصدیق نہیں کر سکے۔",
  "reason.brand_lookalike":
    "ڈومین کا نام ایک مشہور برانڈ ({brand}) سے بہت ملتا جلتا ہے۔ اشارے احتیاط کا مشورہ دیتے ہیں۔",
  "reason.homoglyph":
    "ڈومین میں ملتے جلتے حروف استعمال ہوئے ہیں جو {brand} کی نقل کر سکتے ہیں۔",
  "reason.punycode":
    "یہ ڈومین بین الاقوامی (punycode) حروف استعمال کرتی ہے جو ملتے جلتے نام چھپا سکتے ہیں۔",
  "reason.brand_extra_words":
    "ڈومین برانڈ ({brand}) کے ساتھ اضافی دکان جیسے الفاظ جوڑتی ہے۔ اشارے احتیاط کا مشورہ دیتے ہیں۔",
  "reason.myshopify_pattern":
    "یہ نئی یا ڈیفالٹ اسٹور فرنٹ جیسی لگتی ہے (مثلاً myshopify)۔ بیچنے والے کی اچھی طرح تصدیق کریں۔",
  "reason.extreme_discounts":
    "بہت سی اشیاء پر انتہائی رعایت (70%+) دکھائی گئی ہے۔ یہ دباؤ کی حکمت عملی ہو سکتی ہے — قیمتیں کہیں اور موازنہ کریں۔",
  "reason.missing_policy_pages":
    "اس سائٹ پر عام اعتماد والے صفحے (واپسی، رابطہ، یا تعارف) تلاش کرنا مشکل تھا۔",
  "reason.risky_payment_wording":
    "صفحہ بینک ٹرانسفر یا صرف کرپٹو ادائیگی پر زور دیتا ہے۔ ممکن ہو تو محفوظ ادائیگی کے طریقے استعمال کریں۔",
  "reason.countdown_pressure":
    "کاؤنٹ ڈاؤن یا فوری کارروائی کا پیغام ملا۔ ادائیگی سے پہلے سوچ لیں۔",
  "reason.phishing_list_hit":
    "یہ ڈومین ہماری شامل کمیونٹی فشنگ فہرست میں ہے۔ اسے زیادہ احتیاط سے دیکھیں۔",
  "reason.registrar_privacy":
    "رجسٹرار کی تفصیلات محدود یا پرائیویسی سے محفوظ ہیں — بہت سی سائٹس کے لیے عام ہے، مگر نوٹ کریں۔",
  "privacy.promise":
    "عمر معلوم کرنے کے لیے صرف ڈومین نام بھیجا جاتا ہے۔ ہم براؤزنگ ہسٹری محفوظ نہیں کرتے۔",
  "share.whatsapp":
    "میں نے LegitLens سے {domain} چیک کیا: {verdict}۔ وجوہات: {reasons}۔ آپ کیا سمجھتے ہیں؟",
  "cta.continue_anyway": "پھر بھی جاری رکھیں",
  "cta.ask_family": "خاندان سے پوچھیں",
  "cta.check_link": "لنک چیک کریں",
};

/** Arabic (RTL-ready strings for later v1 polish). */
const ar: MessageCatalog = {
  "verdict.looks_ok": "يبدو جيداً",
  "verdict.be_careful": "كن حذراً",
  "verdict.high_risk": "مخاطرة عالية",
  "reason.domain_age_very_new":
    "تم تسجيل هذا النطاق مؤخراً جداً (قبل {ageDays} يوماً). المتاجر الجديدة قد تكون شرعية، لكن الإشارات تقترح الحذر.",
  "reason.domain_age_new":
    "هذا النطاق جديد نسبياً ({ageDays} يوماً). تحقق من البائع قبل الدفع.",
  "reason.domain_age_unknown": "تعذر تأكيد عمر تسجيل هذا النطاق.",
  "reason.brand_lookalike":
    "اسم النطاق يشبه علامة تجارية معروفة ({brand}). الإشارات تقترح الحذر.",
  "reason.homoglyph":
    "يستخدم النطاق أحرفاً متشابهة قد تنتحل صفة {brand}.",
  "reason.punycode":
    "يستخدم هذا النطاق أحرفاً دولية (punycode) قد تخفي أسماءً متشابهة.",
  "reason.brand_extra_words":
    "يجمع النطاق اسم علامة ({brand}) مع كلمات متجر إضافية. الإشارات تقترح الحذر.",
  "reason.myshopify_pattern":
    "يبدو هذا كواجهة متجر جديدة أو افتراضية (مثل myshopify). تحقق من البائع بعناية.",
  "reason.extreme_discounts":
    "العديد من العناصر تظهر خصومات كبيرة (أكثر من 70٪). قد تكون وسيلة ضغط — قارن الأسعار في أماكن أخرى.",
  "reason.missing_policy_pages":
    "صفحات الثقة الشائعة (الاسترجاع أو الاتصال أو من نحن) صعب العثور عليها في هذا الموقع.",
  "reason.risky_payment_wording":
    "تُبرز الصفحة التحويل البنكي أو الدفع بالعملات الرقمية فقط. فضّل طرق دفع محمية إن أمكن.",
  "reason.countdown_pressure":
    "تم رصد رسالة عدّ تنازلي أو استعجال. خذ وقتك قبل الدفع.",
  "reason.phishing_list_hit":
    "يظهر هذا النطاق في قائمة تصيد مجتمعية نضمّنها. تعامل معه بحذر شديد.",
  "reason.registrar_privacy":
    "تفاصيل المسجّل محدودة أو محمية بالخصوصية — أمر شائع لكثير من المواقع، لكن لاحظ ذلك.",
  "privacy.promise":
    "يُرسل اسم النطاق فقط لمعرفة العمر. لا نخزن سجل التصفح.",
  "share.whatsapp":
    "فحصت {domain} عبر LegitLens: {verdict}. الأسباب: {reasons}. ما رأيك؟",
  "cta.continue_anyway": "المتابعة على أي حال",
  "cta.ask_family": "اسأل عائلتي",
  "cta.check_link": "تحقق من رابط",
};

const hi: MessageCatalog = {
  "verdict.looks_ok": "ठीक लगता है",
  "verdict.be_careful": "सावधान रहें",
  "verdict.high_risk": "उच्च जोखिम",
  "reason.domain_age_very_new":
    "यह डोमेन बहुत हाल में पंजीकृत हुआ है ({ageDays} दिन पहले)। नई दुकानें वैध भी हो सकती हैं, पर संकेत सावधानी का सुझाव देते हैं।",
  "reason.domain_age_new":
    "यह डोमेन अपेक्षाकृत नया है ({ageDays} दिन पुराना)। भुगतान से पहले विक्रेता की पुष्टि करें।",
  "reason.domain_age_unknown": "हम इस डोमेन की आयु की पुष्टि नहीं कर सके।",
  "reason.brand_lookalike":
    "डोमेन नाम एक प्रसिद्ध ब्रांड ({brand}) से बहुत मिलता-जुलता है। संकेत सावधानी का सुझाव देते हैं।",
  "reason.homoglyph":
    "डोमेन में मिलते-जुलते अक्षर हैं जो {brand} की नकल कर सकते हैं।",
  "reason.punycode":
    "यह डोमेन अंतरराष्ट्रीय (punycode) अक्षरों का उपयोग करता है जो मिलते-जुलते नाम छिपा सकते हैं।",
  "reason.brand_extra_words":
    "डोमेन ब्रांड ({brand}) के साथ अतिरिक्त दुकान जैसे शब्द जोड़ता है। संकेत सावधानी का सुझाव देते हैं।",
  "reason.myshopify_pattern":
    "यह नई या डिफ़ॉल्ट स्टोरफ्रंट जैसी लगती है (जैसे myshopify)। विक्रेता की अच्छी तरह जाँच करें।",
  "reason.extreme_discounts":
    "कई वस्तुओं पर अत्यधिक छूट (70%+) दिखाई गई है। यह दबाव की रणनीति हो सकती है — कीमतें कहीं और तुलना करें।",
  "reason.missing_policy_pages":
    "इस साइट पर सामान्य विश्वास पृष्ठ (रिफंड, संपर्क, या परिचय) खोजना कठिन था।",
  "reason.risky_payment_wording":
    "पेज बैंक ट्रांसफ़र या केवल क्रिप्टो भुगतान पर ज़ोर देता है। संभव हो तो सुरक्षित भुगतान विधियाँ चुनें।",
  "reason.countdown_pressure":
    "काउंटडाउन या जल्दी करने वाला संदेश मिला। भुगतान से पहले सोच लें।",
  "reason.phishing_list_hit":
    "यह डोमेन हमारी शामिल सामुदायिक फ़िशिंग सूची में है। इसे अधिक सावधानी से देखें।",
  "reason.registrar_privacy":
    "रजिस्ट्रार विवरण सीमित या गोपनीयता-संरक्षित हैं — कई साइटों के लिए सामान्य है, पर नोट करें।",
  "privacy.promise":
    "आयु जानने के लिए केवल डोमेन नाम भेजा जाता है। हम ब्राउज़िंग इतिहास संग्रहीत नहीं करते।",
  "share.whatsapp":
    "मैंने LegitLens से {domain} जाँचा: {verdict}। कारण: {reasons}। आप क्या सोचते हैं?",
  "cta.continue_anyway": "फिर भी जारी रखें",
  "cta.ask_family": "परिवार से पूछें",
  "cta.check_link": "लिंक जाँचें",
};

const catalogs: Record<Locale, MessageCatalog> = { en, ur, ar, hi };

export function t(
  key: string,
  locale: Locale = "en",
  params?: Record<string, string | number>,
): string {
  const catalog = catalogs[locale] ?? catalogs.en;
  let text = catalog[key] ?? catalogs.en[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}

export function verdictLabel(verdict: string, locale: Locale = "en"): string {
  return t(`verdict.${verdict}`, locale);
}

export const supportedLocales: Locale[] = ["en", "ur", "ar", "hi"];
