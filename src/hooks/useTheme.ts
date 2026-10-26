
import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "safal-portfolio-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch {
    // Continue with the system preference if storage is unavailable.
  }

  return getSystemTheme();
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [hasUserPreference, setHasUserPreference] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      return savedTheme === "light" || savedTheme === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (hasUserPreference) {
      return;
    }

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: light)",
    );

    function handleSystemThemeChange(event: MediaQueryListEvent) {
      setThemeState(event.matches ? "light" : "dark");
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange,
      );
    };
  }, [hasUserPreference]);

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme);
    setHasUserPreference(true);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The selected theme still works for the current session.
    }
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return { theme, setTheme, toggleTheme };
}
