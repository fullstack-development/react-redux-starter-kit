module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "airbnb-typescript"
  ],
  "rules": {
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-boolean-value": "off",
    "react/state-in-constructor": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/semi": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": ["**/test.tsx", "**/test.ts"] }],
    "import/order": "off",
    "import/no-internal-modules": "off",
    "no-eval": "error",
    "max-len": ["error", { "code": 120 }],
    "no-restricted-imports": ["error", "react-jss", "@material-ui/core", "@material-ui/icons", "i18next", "react-i18next"],
    "quote-props": "off",
    "no-trailing-spaces": "error",
    "no-unsafe-finally": "error",
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "no-console": "off",
    "sort-keys ": "off",
    "arrow-parens": "off",
    "spaced-comment": "error",
    "no-redeclare": "error",
    "object-curly-newline": "off",
    // one-line rule is missing in eslint
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-double"],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "no-var": "error",
    "semi": "off",
    "eqeqeq": ["error", "always"],
    "@typescript-eslint/type-annotation-spacing": ["error", { 
      "before": false,
      "after": true,
      "overrides": { "arrow": { "before": true, "after": true }} 
    }]
    // whitespace rule will provided by prettier
    // ban-keywords is missing in eslint
  },
  "globals": {
    "window": "readonly"
  }
}
