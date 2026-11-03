import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

export default defineConfig({
  vite: () => ({
    plugins: [react()],
    optimizeDeps: {
      include: ["@legitlens/rules"],
    },
  }),
  manifest: {
    name: "LegitLens",
    description:
      "Free anti-scam & fake-shop checker — by Qurtuba Labs · powered by Codinito. Signals suggest caution before you pay.",
    version: "1.0.0",
    permissions: ["activeTab", "storage", "scripting"],
    host_permissions: ["https://*/*", "http://*/*"],
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
