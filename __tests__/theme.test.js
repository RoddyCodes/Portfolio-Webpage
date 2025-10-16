/* eslint-env node, jest */

const ThemeManager = require("../assets/js/theme");

const {
  DARK,
  LIGHT,
  STORAGE_KEY,
  resolveTheme,
  applyTheme,
  toggleTheme,
  getStoredTheme,
  clearStoredTheme,
  initThemeToggle,
} = ThemeManager;

const createMatchMediaMock = (initialMatches = false) => {
  let listener;
  const mediaQueryList = {
    matches: initialMatches,
    addEventListener: jest.fn((event, callback) => {
      if (event === "change") {
        listener = callback;
      }
    }),
    removeEventListener: jest.fn((event) => {
      if (event === "change") {
        listener = null;
      }
    }),
    dispatch(matches) {
      this.matches = matches;
      if (listener) {
        listener({ matches });
      }
    },
  };

  const matcher = jest.fn(() => mediaQueryList);
  matcher.mql = mediaQueryList;
  return matcher;
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = "";
  document.documentElement.removeAttribute("data-theme");
  document.body.innerHTML = "";
  const matcher = createMatchMediaMock(false);
  window.matchMedia = matcher;
});

describe("ThemeManager", () => {
  test("resolveTheme prefers stored theme", () => {
    localStorage.setItem(STORAGE_KEY, DARK);
    const theme = resolveTheme();
    expect(theme).toBe(DARK);
  });

  test("resolveTheme falls back to system preference", () => {
    const matcher = createMatchMediaMock(true);
    window.matchMedia = matcher;
    const theme = resolveTheme();
    expect(theme).toBe(DARK);
  });

  test("applyTheme toggles root classes and data attribute", () => {
  applyTheme(DARK);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.getAttribute("data-theme")).toBe(DARK);
    applyTheme(LIGHT);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.getAttribute("data-theme")).toBe(LIGHT);
  });

  test("toggleTheme switches theme and persists choice", () => {
    const next = toggleTheme();
    expect([DARK, LIGHT]).toContain(next);
    const stored = getStoredTheme();
    expect(stored).toBe(next);
  });

  test("initThemeToggle wires up toggle button and respects clicks", () => {
    document.body.innerHTML = `
      <button data-theme-toggle aria-pressed="false">
        <span data-theme-icon="light"></span>
        <span data-theme-icon="dark" class="hidden"></span>
        <span data-theme-label>Light</span>
      </button>
    `;

    const matcher = createMatchMediaMock(false);
    window.matchMedia = matcher;

    initThemeToggle();

    const toggle = document.querySelector("[data-theme-toggle]");
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    toggle.click();
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    expect(getStoredTheme()).toBe(DARK);
    expect(toggle.querySelector('[data-theme-icon="light"]').classList.contains("hidden")).toBe(true);
    expect(toggle.querySelector('[data-theme-icon="dark"]').classList.contains("hidden")).toBe(false);
  });

  test("system theme changes apply when user has no stored preference", () => {
    document.body.innerHTML = '<button data-theme-toggle></button>';
    const matcher = createMatchMediaMock(true);
    window.matchMedia = matcher;
    initThemeToggle();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    matcher.mql.dispatch(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  test("stored preference overrides future system changes", () => {
    document.body.innerHTML = '<button data-theme-toggle></button>';
    const matcher = createMatchMediaMock(false);
    window.matchMedia = matcher;
    initThemeToggle();
    const toggle = document.querySelector("[data-theme-toggle]");
    toggle.click(); // Persist dark mode
    expect(getStoredTheme()).toBe(DARK);
    matcher.mql.dispatch(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    clearStoredTheme();
  });
});
