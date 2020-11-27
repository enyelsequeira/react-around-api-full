/* eslint-disable quotes */
module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    quotes: [2, "double", { avoidEscape: true }],
  },
};
