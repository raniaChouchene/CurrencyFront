import globals from "globals";
import * as pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["**/src/Interfaces/*.tsx"],
    ignores: ["**/node_modules/", "**/src/tests/"],
  },
  {
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
