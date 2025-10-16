/* global module, process */

const STORAGE_KEY = "theme-preference";
const DARK = "dark";
const LIGHT = "light";

const safeAccess = (fn) => {
  try {
    return fn();
  } catch (error) {
    if (
      typeof process !== "undefined" &&
      process.env &&
      process.env.NODE_ENV === "test"
    ) {
      throw error;
    }
    return undefined;
  }
};

function getStoredTheme(storage = window.localStorage) {
  return safeAccess(() => storage.getItem(STORAGE_KEY));
}

function storeTheme(theme, storage = window.localStorage) {
  safeAccess(() => storage.setItem(STORAGE_KEY, theme));
  return theme;
}

function clearStoredTheme(storage = window.localStorage) {
  safeAccess(() => storage.removeItem(STORAGE_KEY));
}

function prefersDark(media = window.matchMedia) {
  if (typeof media !== "function") {
    return false;
  }
  const query = media("(prefers-color-scheme: dark)");
  return !!(query && query.matches);
}

function resolveTheme({ storage = window.localStorage, media = window.matchMedia } = {}) {
  const stored = getStoredTheme(storage);
  if (stored === DARK || stored === LIGHT) {
    return stored;
  }
  return prefersDark(media) ? DARK : LIGHT;
}

function applyTheme(theme, root = document.documentElement) {
  if (!root) {
    return theme;
  }
  const isDark = theme === DARK;
  root.classList.toggle(DARK, isDark);
  root.setAttribute("data-theme", theme);
  return theme;
}

function setTheme(theme, { storage = window.localStorage, root = document.documentElement } = {}) {
  storeTheme(theme, storage);
  return applyTheme(theme, root);
}

function toggleTheme({
  storage = window.localStorage,
  root = document.documentElement,
  media = window.matchMedia,
} = {}) {
  const current = resolveTheme({ storage, media });
  const next = current === DARK ? LIGHT : DARK;
  return setTheme(next, { storage, root });
}

function updateToggleVisuals(toggle, theme) {
  if (!toggle) return;
  toggle.setAttribute("aria-pressed", String(theme === DARK));
  const label = toggle.querySelector("[data-theme-label]");
  if (label) {
    label.textContent = theme === DARK ? "Dark" : "Light";
  }
  const lightIcon = toggle.querySelector('[data-theme-icon="light"]');
  const darkIcon = toggle.querySelector('[data-theme-icon="dark"]');
  if (lightIcon) {
    lightIcon.classList.toggle("hidden", theme === DARK);
  }
  if (darkIcon) {
    darkIcon.classList.toggle("hidden", theme !== DARK);
  }
}

function initThemeToggle({
  toggleSelector = "[data-theme-toggle]",
  storage = window.localStorage,
  root = document.documentElement,
  media = window.matchMedia,
} = {}) {
  const toggle = document.querySelector(toggleSelector);
  const initialTheme = resolveTheme({ storage, media });
  applyTheme(initialTheme, root);
  updateToggleVisuals(toggle, initialTheme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const nextTheme = toggleTheme({ storage, root, media });
      updateToggleVisuals(toggle, nextTheme);
    });
  }

  let mql;
  if (typeof media === "function") {
    try {
      mql = media("(prefers-color-scheme: dark)");
    } catch (error) {
      mql = null;
    }
  }

  if (mql && typeof mql.addEventListener === "function") {
    mql.addEventListener("change", (event) => {
      const stored = getStoredTheme(storage);
      if (stored === DARK || stored === LIGHT) {
        return; // Respect explicit user choice
      }
      const updatedTheme = event.matches ? DARK : LIGHT;
      applyTheme(updatedTheme, root);
      updateToggleVisuals(toggle, updatedTheme);
    });
  }

  return {
    theme: initialTheme,
  };
}

const ThemeManager = {
  STORAGE_KEY,
  DARK,
  LIGHT,
  getStoredTheme,
  storeTheme,
  clearStoredTheme,
  prefersDark,
  resolveTheme,
  applyTheme,
  setTheme,
  toggleTheme,
  updateToggleVisuals,
  initThemeToggle,
};

if (typeof window !== "undefined") {
  window.ThemeManager = ThemeManager;
  if (document.readyState !== "loading") {
    ThemeManager.initThemeToggle();
  } else {
    document.addEventListener("DOMContentLoaded", () => ThemeManager.initThemeToggle());
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = ThemeManager;
}
