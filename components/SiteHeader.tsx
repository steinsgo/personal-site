'use client';

import { AuthStatus } from "@/components/AuthStatus";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SiteSidebar } from "@/components/SiteSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { socialLinks } from "@/lib/navigation";
import { useLanguage } from "@/lib/site-context";
import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const { language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-4 z-50 flex flex-wrap items-center justify-between gap-4 rounded-[36px] border border-white/50 kawaii-surface px-6 py-4 text-sm text-slate-700 shadow-[0_40px_120px_-60px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-kawaii-sound="true"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/70 text-lg text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-pink-500 dark:border-white/20 dark:bg-white/10 dark:text-white/80"
            aria-label={language === "zh" ? "打开导航侧栏" : "Open navigation sidebar"}
          >
            ☰
          </button>
          <Link
            href="/"
            data-kawaii-sound="true"
            className="text-xl font-semibold leading-tight tracking-tight sm:text-xl"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-sky-400 text-sm text-white shadow-[0_18px_40px_-25px_rgba(236,72,153,0.8)]">
              SG
            </span>
            &nbsp;&nbsp;
            <span className="text-xl font-semibold leading-tight tracking-tight sm:text-xl">
              Steinsgo's Website
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-2 py-1 text-xs font-semibold text-slate-500 shadow-[0_18px_50px_-40px_rgba(96,165,250,0.8)] dark:border-white/20 dark:bg-white/10 dark:text-white/70">
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-kawaii-sound="true"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white hover:text-pink-500 dark:hover:bg-white/20"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-2 sm:hidden">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <AuthStatus />
      </header>

      <SiteSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
