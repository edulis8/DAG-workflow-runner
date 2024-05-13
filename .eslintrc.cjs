module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["wesbos/typescript"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "@typescript-eslint/no-unsafe-argument": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,  
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-unsafe-call": 0,
    "react/jsx-no-bind": 0,
    "react/prop-types": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
