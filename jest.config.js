/* eslint-env node */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/__tests__"],
  collectCoverageFrom: ["assets/js/theme.js"],
  coverageDirectory: "coverage",
  reporters: ["default"],
};