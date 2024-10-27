import typescriptEslint from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const baseConfig = [
    ...compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
            "react-hooks": fixupPluginRules(reactHooks),
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.node,
                ...globals.jest,
            },
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "module",
        },
        settings: {
            react: {
                pragma: "React",
                version: "detect",
            },
        },
        rules: {
            "react/jsx-uses-react": "off",
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
];


const tsOverrides = {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
    },
};

export default [...baseConfig, tsOverrides];
