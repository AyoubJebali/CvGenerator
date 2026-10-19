"use client";

import { useEffect, useState } from "react";

type ThemeName = "curatorlight" | "curatordark";

const STORAGE_KEY = "cvgen-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>("curatorlight");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored === "curatorlight" || stored === "curatordark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme: ThemeName = prefersDark ? "curatordark" : "curatorlight";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeName = theme === "curatorlight" ? "curatordark" : "curatorlight";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-lg bg-surface-container-high px-3 py-1.5 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container-highest"
      aria-label="Toggle theme"
    >
      {theme === "curatorlight" ? "Dark mode" : "Light mode"}
    </button>
  );
}
