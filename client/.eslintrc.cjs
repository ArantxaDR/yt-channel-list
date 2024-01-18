module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "quotes": [
      "error",
      "single",
      { "allowTemplateLiterals": true }
    ],
    "quote-props": [
      "error",
      "consistent-as-needed"
    ],
    "semi": [
      "error",
      "always"
    ],
    "eqeqeq": [
      "error",
      "smart"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1
      }
    ],
    "array-bracket-newline": [
      "error", "consistent"
    ],
    "camelcase": [
      "error",
      {
        "properties": "never"
      }
    ],
    "func-style": [
      "error",
      "expression",
      { "allowArrowFunctions": true }
    ],
    "@typescript-eslint/no-explicit-any": [
      "error", { "fixToUnknown": true }
    ]
  },
}