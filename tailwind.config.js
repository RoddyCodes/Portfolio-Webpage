// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // This scans index.html in the root folder
    "./blog/**/*.html", // This scans all .html files in the blog folder and any of its subfolders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
