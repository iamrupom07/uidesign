module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "warn",
  },
};
