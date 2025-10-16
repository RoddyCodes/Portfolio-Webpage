/* eslint-env node */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests/unit"],
  collectCoverageFrom: ["assets/js/theme.js"],
  coverageDirectory: "coverage",
  reporters: ["default"],
};