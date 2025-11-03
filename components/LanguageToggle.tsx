'use client';

import { useLanguage } from "@/lib/site-context";

const langs: Array<{ code: "zh" | "en"; label: string }> = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/60 bg-white/60 p-1 text-xs font-semibold text-slate-600 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] transition dark:border-white/30 dark:bg-white/5 dark:text-white/80">
      {langs.map((item) => (
        <button
          key={item.code}
          type="button" data-kawaii-sound="true"
          onClick={() => setLanguage(item.code)}
          className={`rounded-full px-2.5 py-1 transition ${
            language === item.code
              ? "bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 text-white shadow-[0_16px_30px_-22px_rgba(168,85,247,0.8)]"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
