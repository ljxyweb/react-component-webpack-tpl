const mappedModule = "<rootDir>/dist/index.js";
module.exports = {
  testRunner: "jest-circus/runner",
  restoreMocks: true,
  globals: {
    __DEV__: true
  },
  moduleNameMapper: {
    "^react-library$": mappedModule
  },
  modulePaths: ["<rootDir>/node_modules"],
  testMatch: ["__tests__/**/*-test.js"],
  testURL: "http://localhost/"
};
