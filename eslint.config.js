import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/.next/**",
      "**/.output/**",
      "**/.wxt/**",
      "**/node_modules/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["apps/extension/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        chrome: "readonly",
        defineBackground: "readonly",
        defineContentScript: "readonly",
        browser: "readonly",
      },
    },
  },
);
