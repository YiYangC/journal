"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full border border-[var(--color-alt)] flex items-center justify-center text-xs text-[var(--color-alt)] hover:text-[var(--color-text)] hover:border-[var(--color-text)] transition-colors cursor-pointer"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "LT" : "DK"}
    </button>
  );
}
