'use client';

import { useLanguage } from "@/lib/site-context";
import Link from "next/link";

const footerCopy = {
  tagline: {
    zh: "Crafting stories - Collecting sparks - Building quietly",
    en: "Crafting stories - Collecting sparks - Building quietly",
  },
  description: {
    zh: "我相信个人网站应该像有温度的花园——偶尔生长、偶尔修剪，保持真诚和可爱。如果你也喜欢这样的节奏，欢迎常来玩。",
    en: "A personal site should feel like a warm garden—growing, pruning, staying honest. If that rhythm speaks to you, drop by often!",
  },
  sections: {
    life: {
      zh: "最新冒险",
      en: "Recent life",
    },
    skills: {
      zh: "技能地图",
      en: "Skill map",
    },
    guestbook: {
      zh: "留言簿",
      en: "Guestbook",
    },
  },
} as const;

export function SiteFooter() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 flex flex-col gap-6 rounded-[32px] border border-white/40 kawaii-surface px-8 py-10 text-sm text-slate-500 shadow-[0_32px_90px_-60px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20  dark:text-white/70">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-slate-700 dark:text-white/80">
            {language === "zh" ? `版权所有 ${year} Steinsgo 小站` : `Copyright ${year} Steinsgo`}
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400 dark:text-white/40">
            {footerCopy.tagline[language]}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 dark:text-white/70">
          <Link href="/life" className="transition hover:text-slate-900 dark:hover:text-white">
            {footerCopy.sections.life[language]}
          </Link>
          <Link href="/skills" className="transition hover:text-slate-900 dark:hover:text-white">
            {footerCopy.sections.skills[language]}
          </Link>
          <Link href="/guestbook" className="transition hover:text-slate-900 dark:hover:text-white">
            {footerCopy.sections.guestbook[language]}
          </Link>
          <Link
            href="https://github.com/Steinsgo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-slate-900 dark:hover:text-white"
          >
            GitHub
          </Link>
        </div>
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-white/70">
        {footerCopy.description[language]}
      </p>
    </footer>
  );
}
