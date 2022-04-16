/**
 * @type {import('eslint/lib/shared/types').ConfigData}
 */
module.exports = {
    env: {
        browser: true,
        es2020: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
    ],
    rules: {
        "@typescript-eslint/no-empty-function": [
            "error",
            { allow: ["constructors", "arrowFunctions"] },
        ],
        "@typescript-eslint/explicit-function-return-type": [
            "error",
            { allowExpressions: true, allowHigherOrderFunctions: true },
        ],
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
    },
};
