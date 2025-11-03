'use client';

import type { LocalizedText } from "@/data/locale";
import { useLanguage } from "@/lib/site-context";
import type { ReactNode } from "react";

type MaybeLocalized = string | LocalizedText;

type SectionProps = {
  id: string;
  title: MaybeLocalized;
  description?: MaybeLocalized;
  badge?: MaybeLocalized;
  icon?: MaybeLocalized;
  children: ReactNode;
};

export function Section({ id, title, description, badge, icon, children }: SectionProps) {
  const { language } = useLanguage();

  const resolve = (value?: MaybeLocalized) => {
    if (!value) return undefined;
    return typeof value === "string" ? value : value[language];
  };

  const resolvedBadge = resolve(badge);
  const resolvedIcon = resolve(icon);

  return (
    <section id={id} className="scroll-mt-28">
      <header className="relative mb-8 overflow-hidden rounded-[32px] border border-white/40 kawaii-surface p-6 text-slate-800 shadow-[0_45px_100px_-70px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20 dark:text-white/80">
        <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-200/45 via-sky-200/35 to-transparent blur-3xl dark:from-emerald-200/20 dark:via-sky-200/20" />
        <div className="pointer-events-none absolute -right-12 top-0 h-48 w-48 rounded-full bg-gradient-to-br from-pink-300/45 via-purple-200/35 to-transparent blur-3xl dark:from-pink-300/20 dark:via-purple-200/20" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            {resolvedBadge ? (
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-pink-200/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-pink-500 dark:border-pink-300/40 dark:bg-white/10 dark:text-pink-200">
                <span className="text-[10px] sm:text-xs">{resolvedBadge}</span>
              </span>
            ) : null}
            <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-3xl">
              {resolve(title)}
            </h2>
            {description ? (
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-white/70 sm:text-base">
                {resolve(description)}
              </p>
            ) : null}
          </div>

          {resolvedIcon ? (
            <span className="hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/50 bg-white/70 text-3xl shadow-inner dark:border-white/20 dark:bg-white/10 sm:inline-flex">
              {resolvedIcon}
            </span>
          ) : null}
        </div>
      </header>
      {children}
    </section>
  );
}
