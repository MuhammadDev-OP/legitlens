import { z } from "zod";

const localeSchema = z.enum(["en", "ur", "ar", "hi"]).default("en");

/** Domain or URL input — length-capped; normalized later. */
export const domainInputSchema = z
  .string()
  .trim()
  .min(1)
  .max(255)
  .refine((v) => !/[\s<>'"`]/.test(v), { message: "Invalid characters" })
  .refine((v) => !/^(javascript|data|file|blob|vbscript):/i.test(v), {
    message: "Unsupported scheme",
  });

export const checkBodySchema = z.object({
  url: domainInputSchema,
  locale: localeSchema.optional(),
});

export const rdapQuerySchema = z.object({
  domain: domainInputSchema,
});
