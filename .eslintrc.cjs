module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "@electron-toolkit/eslint-config-ts/recommended"
  ],
  rules: {
    "prefer-const": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    
  }
};
