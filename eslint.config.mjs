import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"

export default tseslint.config({
  files: ["**/*.ts"],
  ignores: ["dist/*", "types/*"],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    eslintPluginPrettier,
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "curly": "error",
    "default-case-last": "error",
    "eqeqeq": ["error", "always", { null: "ignore" }],
    "id-length": ["error", { min: 2 }],
    "no-duplicate-imports": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-implicit-coercion": "error",
    "no-inline-comments": "error",
    "no-labels": "error",
    "no-lonely-if": "error",
    "no-multi-str": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-new": "error",
    "no-nonoctal-decimal-escape": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow-restricted-names": "error",
    "no-template-curly-in-string": "error",
    "no-underscore-dangle": "error",
    "no-unreachable-loop": "error",
    "no-useless-computed-key": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "operator-assignment": "error",
    "prefer-const": "error",
    "prefer-exponentiation-operator": "error",
    "prefer-object-has-own": "error",
    "prefer-object-spread": "error",
    "prefer-regex-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "radix": "error",
    "sort-imports": "error",
    "symbol-description": "error",
    "yoda": "error",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-invalid-this": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unsafe-type-assertion": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-useless-empty-export": "error",
    "@typescript-eslint/prefer-destructuring": "error",
    "@typescript-eslint/prefer-promise-reject-errors": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allow: [{ name: ["Error", "URL", "URLSearchParams"], from: "lib" }],
        allowAny: true,
        allowBoolean: true,
        allowNullish: true,
        allowNumber: true,
        allowRegExp: true,
      },
    ],
  },
})
