// tailwind.config.js

/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./*.html", // This scans index.html in the root folder
    "./blog/**/*.html", // This scans all .html files in the blog folder and any of its subfolders
    "./assets/js/**/*.js", // Include theme scripts for class usage
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
