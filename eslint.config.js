import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020, // or a higher version
        sourceType: "module", // or "commonjs" if applicable
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } },
  pluginJs.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": pluginTs,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      "react/react-in-jsx-scope": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  pluginReact.configs.flat.recommended,
];