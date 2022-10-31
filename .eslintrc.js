module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2020: true,
    "react-native/react-native": true,
  },
  extends: [
    "google",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
    requireConfigFile: "false",
    babelOptions: { configFile: "./babel.config.js" },
  },
  plugins: ["react", "react-native", "prettier"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "no-console": 0,
    "require-jsdoc": 0,
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      createClass: "createReactClass",
      pragma: "React",
      version: "detect",
      flowVersion: "0.53",
    },
    propWrapperFunctions: [
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
    ],
    linkComponents: ["Hyperlink", { name: "Link", linkAttribute: "to" }],
  },
};
