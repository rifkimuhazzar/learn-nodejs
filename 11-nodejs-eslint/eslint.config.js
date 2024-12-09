export default [
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
      "require-await": "error",
    },
    files: ["src/**/*.js"],
    ignores: ["src/person.js"],
  },
];
