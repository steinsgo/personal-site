'use client';

import { useThemeMode } from "@/lib/site-context";
import { useMemo } from "react";

const sunIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden focusable="false">
    <path
      d="M12 4.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-.5A.75.75 0 0 1 12 6V4.5Zm0 13a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75V17.5Zm7.5-5.5a.75.75 0 0 1-.75.75H17.25a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.5Zm-13 0a.75.75 0 0 1-.75.75H4.25a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.5ZM6.22 6.22a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06L6.22 7.28a.75.75 0 0 1 0-1.06Zm9.44 9.44a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06ZM17.72 7.28a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm-9.44 9.44a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
      className="fill-current"
    />
  </svg>
);

const moonIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden focusable="false">
    <path
      d="M20.146 15.803a.75.75 0 0 0-.93-.316 7 7 0 0 1-9.703-7.9.75.75 0 0 0-.925-.92 8.5 8.5 0 1 0 10.946 10.946.75.75 0 0 0-.388-1.81Z"
      className="fill-current"
    />
  </svg>
);

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeMode();

  const label = useMemo(() => (theme === "day" ? "Switch to Night" : "Switch to Day"), [theme]);

  return (
    <button
      type="button" data-kawaii-sound="true"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 rounded-full border border-slate-200/60 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/40 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/70 dark:hover:text-white"
      aria-label={label}
    >
      {theme === "day" ? sunIcon : moonIcon}
      <span>{theme === "day" ? "Day" : "Night"}</span>
    </button>
  );
}
