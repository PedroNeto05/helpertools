import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "target/",
      "src-tauri/gen/",
      "src-tauri/target/",
      "*.config.js",
      "*.config.ts",
      "vite.config.ts",
      "eslint.config.js",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "*.log",
      ".vscode/",
      ".idea/",
      ".DS_Store",
      "Thumbs.db",
      "*.d.ts",
      "coverage/",
      "*.tmp",
      "*.temp",
    ],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed with new JSX Transform
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  prettierConfig,
]);
