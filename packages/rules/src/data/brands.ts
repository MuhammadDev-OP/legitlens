import type { BrandEntry } from "../types/index.js";

/**
 * Curated high-value brands for lookalike detection.
 * Not a full Tranco dump — a focused subset suitable for v1 shipping size.
 * Domains listed are commonly associated with the brand for allowlisting.
 */
export const BRANDS: BrandEntry[] = [
  { name: "Nike", domains: ["nike.com"], aliases: ["nike"] },
  { name: "Adidas", domains: ["adidas.com"], aliases: ["adidas"] },
  { name: "Apple", domains: ["apple.com", "icloud.com"], aliases: ["apple", "iphone"] },
  { name: "Amazon", domains: ["amazon.com", "amazon.co.uk", "amzn.to"], aliases: ["amazon", "amzn"] },
  { name: "Microsoft", domains: ["microsoft.com", "office.com", "live.com"], aliases: ["microsoft", "xbox"] },
  { name: "Google", domains: ["google.com", "youtube.com", "gmail.com"], aliases: ["google", "gmail"] },
  { name: "PayPal", domains: ["paypal.com"], aliases: ["paypal"] },
  { name: "Shopify", domains: ["shopify.com"], aliases: ["shopify"] },
  { name: "Meta", domains: ["meta.com", "facebook.com", "instagram.com", "whatsapp.com"], aliases: ["facebook", "instagram", "meta", "whatsapp"] },
  { name: "Netflix", domains: ["netflix.com"], aliases: ["netflix"] },
  { name: "Spotify", domains: ["spotify.com"], aliases: ["spotify"] },
  { name: "Samsung", domains: ["samsung.com"], aliases: ["samsung"] },
  { name: "Sony", domains: ["sony.com", "playstation.com"], aliases: ["sony", "playstation"] },
  { name: "DHL", domains: ["dhl.com"], aliases: ["dhl"] },
  { name: "FedEx", domains: ["fedex.com"], aliases: ["fedex"] },
  { name: "UPS", domains: ["ups.com"], aliases: ["ups"] },
  { name: "Chase", domains: ["chase.com"], aliases: ["chase"] },
  { name: "HSBC", domains: ["hsbc.com"], aliases: ["hsbc"] },
  { name: "Daraz", domains: ["daraz.pk", "daraz.com"], aliases: ["daraz"] },
  { name: "JazzCash", domains: ["jazzcash.com.pk"], aliases: ["jazzcash"] },
  { name: "Easypaisa", domains: ["easypaisa.com.pk"], aliases: ["easypaisa"] },
  { name: "Gucci", domains: ["gucci.com"], aliases: ["gucci"] },
  { name: "Louis Vuitton", domains: ["louisvuitton.com"], aliases: ["louisvuitton", "lv"] },
  { name: "Rolex", domains: ["rolex.com"], aliases: ["rolex"] },
  { name: "Zara", domains: ["zara.com"], aliases: ["zara"] },
  { name: "H&M", domains: ["hm.com"], aliases: ["hm", "handm"] },
  { name: "Shein", domains: ["shein.com"], aliases: ["shein"] },
  { name: "AliExpress", domains: ["aliexpress.com"], aliases: ["aliexpress", "ali"] },
  { name: "eBay", domains: ["ebay.com"], aliases: ["ebay"] },
  { name: "Walmart", domains: ["walmart.com"], aliases: ["walmart"] },
];

/** Shop-like tokens often appended to brand names in fake storefronts. */
export const SHOP_TOKENS = [
  "outlet",
  "sale",
  "shop",
  "store",
  "official",
  "deals",
  "discount",
  "clearance",
  "factory",
  "warehouse",
  "online",
  "mart",
  "buy",
  "cheap",
  "promo",
  "vip",
];
