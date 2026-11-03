import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

const apiBase =
  (process.env.WXT_API_BASE as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:3000";

let apiOrigin = "http://localhost:3000";
try {
  apiOrigin = new URL(apiBase).origin;
} catch {
  apiOrigin = "http://localhost:3000";
}

export default defineConfig({
  vite: () => ({
    plugins: [react()],
    optimizeDeps: {
      include: ["@legitlens/rules"],
    },
    build: {
      // No eval / remote code in extension bundles
      target: "es2022",
    },
  }),
  manifest: {
    name: "LegitLens",
    description:
      "Free anti-scam & fake-shop checker — by Qurtuba Labs · powered by Codinito. Signals suggest caution before you pay.",
    version: "1.0.0",
    // Minimal MV3 permissions — see SECURITY.md for justification of each.
    permissions: ["activeTab", "storage", "scripting"],
    // Only the LegitLens RDAP/check proxy (never browsing <all_urls>).
    host_permissions: [`${apiOrigin}/*`],
    // Optional: grant to enable the checkout warning banner on websites.
    optional_host_permissions: ["http://*/*", "https://*/*"],
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'; base-uri 'self';",
    },
    action: {
      default_title: "LegitLens",
    },
    icons: {
      "16": "icon/16.png",
      "32": "icon/32.png",
      "48": "icon/48.png",
      "128": "icon/128.png",
    },
  },
});
