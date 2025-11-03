'use client';

import Link from "next/link";
import { useLanguage } from "@/lib/site-context";
import { navItems, socialLinks } from "@/lib/navigation";
import { useEffect } from "react";

type SiteSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function SiteSidebar({ open, onClose }: SiteSidebarProps) {
  const { language } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        aria-label="Close menu overlay"
        className="flex-1 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="flex w-72 flex-col gap-6 overflow-y-auto border-l border-white/40 kawaii-surface px-6 py-8 text-slate-700 shadow-[0_40px_90px_-60px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-white/50">
              {language === "zh" ? "导航菜单" : "Navigation"}
            </span>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {language === "zh" ? "去哪儿玩呢？" : "Where to explore?"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-white dark:bg-white/10 dark:text-white/70"
          >
            {language === "zh" ? "关闭" : "Close"}
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-kawaii-sound="true"
              onClick={onClose}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-600 shadow-[0_18px_40px_-28px_rgba(236,72,153,0.45)] transition hover:-translate-y-0.5 hover:text-pink-500 dark:border-white/10 dark:bg-white/[0.08] dark:text-white/80"
            >
              <span className="text-lg">{item.emoji}</span>
              <span>{item.label[language]}</span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 border-t border-white/40 pt-4 text-xs text-slate-500 dark:border-white/15 dark:text-white/60">
          <p>{language === "zh" ? "社交角落" : "Find me online"}</p>
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/[0.7] text-slate-600 shadow-sm transition hover:text-pink-500 dark:border-white/20 dark:bg-white/10 dark:text-white/70"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
