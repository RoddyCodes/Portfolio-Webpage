# Portfolio Webpage

## Overview

This repository powers my public-facing portfolio and blog. The site highlights featured projects, surfaces long-form writing, and includes an interactive chess experience built with vanilla JavaScript. Everything is deployed automatically to GitHub Pages via a CI/CD workflow.

## Key Features

- **Dynamic theming:** Light/dark themes with OS preference sync, persisted user choice, and graceful clamping for the chessboard.
- **Markdown-powered blog:** Client-side rendering using Showdown with clean routing (`blog/post.html?post=slug`).
- **Interactive chess game:** Powered by Chess.js with a custom UI and animated move highlights.
- **Responsive layout:** Tailwind CSS handles spacing, typography, and component styling across viewports.
- **Accessibility touches:** Keyboard-focusable controls, aria-pressed states, and visually hidden labels for assistive tech.
- **Resume snapshot:** Objective, technical stack, experience, and leadership highlights surfaced directly on the homepage for quick scanning.
- **Toolbox logos:** Devicon-powered badges and contextual icons highlight core technologies and leadership experience.
- **Education timeline:** Refreshed badges with accurate timelines for Rutgers, NJIT, and Justice Through Code at Columbia.
- **Automated test suite:** Jest unit tests plus Playwright end-to-end coverage to protect critical user flows.

## Tech Stack

- **HTML / Tailwind CSS / Vanilla JavaScript**
- **Chess.js** for chess engine logic
- **ScrollReveal** for subtle entrance animations
- **Showdown.js** for Markdown to HTML conversion
- **GitHub Actions** for CI/CD (lint → unit tests → HTML validation → deploy)

## Getting Started

```bash
git clone https://github.com/RoddyCodes/Portfolio-Webpage.git
cd Portfolio-Webpage
npm install
npm run dev # Tailwind in watch mode
```

- Open `index.html` directly or run `npm run serve` for a local static server (`http://localhost:8080`).
- The blog post viewer (`blog/post.html`) fetches markdown files, so use `npm run serve` (or VS Code Live Server) to avoid CORS issues locally.

## Available Scripts

- `npm run dev` – Tailwind in watch mode for rapid CSS feedback.
- `npm run build` – Compile and minify Tailwind to `assets/css/output.css`.
- `npm run unit` – Jest unit tests (currently focused on the theme manager).
- `npm run e2e` – Playwright end-to-end tests against a local preview build.
- `npm run lint` – ESLint + Stylelint checks.
- `npm run validate:html` – html-validate across root and blog pages.
- `npm test` – Full suite: unit → lint → HTML validation → Playwright end-to-end.
- `npm run preview` – Build + serve for production parity.

## Directory Layout

```
assets/
    css/
        input.css        # Tailwind source (fonts + @tailwind directives)
        output.css       # Generated Tailwind build (do not edit by hand)
        styles.css       # Supplemental styles
        chess.css        # Chessboard-specific styling
    images/
        chess_images/    # Piece sprites used by the chess UI
    js/
        animations.js    # ScrollReveal configuration
        chess.js         # Chess game UI + AI move logic
        theme.js         # Dark-mode orchestration (also exported for tests)
blog/
    index.html         # Blog landing page (dynamically lists posts)
    post.html          # Post renderer routed via query string
    post.js            # Markdown fetch + Showdown rendering
    posts/             # Markdown sources (e.g., starting-masters-at-njit.md)
.github/
    workflows/         # CI/CD definitions (CI lint/test + GitHub Pages deploy)
tests/
    unit/
        theme.test.js   # Jest suite covering ThemeManager behaviour
    e2e/
        home.spec.js    # Playwright regression checks for key flows
    playwright.config.js # Shared Playwright configuration used by npm run e2e
```

## CI/CD & Quality Gates

- **CI pipeline (`.github/workflows/deploy.yml`)**
    - `npm run unit`
    - `npm run lint`
    - `npm run validate:html`
    - `npm run build`
- **PR validation (`.github/workflows/pr-validation.yml`)** runs the same checks and uploads a preview artifact.
- Lock files (`package-lock.json`) are committed for reproducible builds and cacheable installs in CI.

## Dark Mode Implementation

- Theme preference stored under `theme-preference` in `localStorage`.
- `assets/js/theme.js` exposes a `ThemeManager` with helpers used by Jest tests.
- Light/dark classes leverage Tailwind’s `darkMode: "class"` configuration.
- Inline bootstrap scripts run in `<head>` to prevent initial flash-of-unstyled content.

## Contact

- **Email:** roddyscodingservice@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/ryan-pham-385637181/
- **GitHub:** https://github.com/RoddyCodes

Thanks for checking out the project! Feel free to open an issue or reach out if you spot something that could be improved.