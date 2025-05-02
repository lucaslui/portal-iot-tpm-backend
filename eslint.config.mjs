import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
    { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
    { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
    {
        rules: {
            "strict-boolean-expressions": "off",
            "comma-spacing": "off",
            "return-await": "off",
            "method-signature-style": "off",
            "consistent-type-definitions": "off"
        },
    },
    tseslint.configs.recommended,
]);