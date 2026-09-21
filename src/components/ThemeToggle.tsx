"use client";

import React, { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_EVENT = "themechange";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

// Read the theme the pre-hydration script already applied to <html>.
function getSnapshot(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// The server (and first client render) assumes dark until the store hydrates.
function getServerSnapshot(): "light" | "dark" {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const applyTheme = (next: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — the choice simply won't persist */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canAnimate =
      "startViewTransition" in document && !prefersReduced;

    if (!canAnimate) {
      applyTheme(next);
      return;
    }

    // Grow the new theme from the toggle button as a circular wipe.
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${e.clientX}px`);
    root.style.setProperty("--vt-y", `${e.clientY}px`);
    (
      document as Document & {
        startViewTransition: (cb: () => void) => void;
      }
    ).startViewTransition(() => applyTheme(next));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-md text-muted hover:text-ink hover:bg-raised border border-transparent hover:border-line transition-colors focus-ring"
    >
      {isDark ? (
        <Sun className="w-[18px] h-[18px]" />
      ) : (
        <Moon className="w-[18px] h-[18px]" />
      )}
    </button>
  );
}
