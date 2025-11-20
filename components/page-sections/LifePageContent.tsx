'use client';

import { LifeTimeline } from "@/components/LifeTimeline";
import { lifeMoments } from "@/data/life";
import { useLanguage } from "@/lib/site-context";
import Link from "next/link";

const heroCopy = {
  badge: {
    zh: "Life Stream",
    en: "Life Stream",
  },
  heading: {
    zh: "生活碎片",
    en: "Life fragments collected with intention",
  },
  description: {
    zh: "我把生活映射成微小的坐标。它们可能安静，但汇聚在一起便形成了我的节奏——早晨的咖啡、街头的猫咪、完成任务时的微笑。",
    en: "I map life into tiny coordinates. They may be quiet, but together they create my rhythm——morning coffee, street cats, the grin of finishing a quest.",
  },
  primary: {
    zh: "跳转到技能图谱",
    en: "Jump to skill map",
  },
  secondary: {
    zh: "查看我的兴趣爱好",
    en: "Visit the interest lab",
  },
} as const;

export function LifePageContent() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-[36px] border border-white/40 kawaii-surface px-10 py-14 text-slate-800 dark:text-white/80 shadow-[0_50px_120px_-70px_rgba(236,72,153,0.6)] backdrop-blur dark:border-white/20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200/60 bg-pink-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-pink-500 dark:border-pink-300/30 dark:bg-white/10 dark:text-pink-200">
          {heroCopy.badge[language]}
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {heroCopy.heading[language]}
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-white/70 sm:text-base">
          {heroCopy.description[language]}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/skills" data-kawaii-sound="true" className="btn-primary">
            {heroCopy.primary[language]}
          </Link>
          <Link href="/interests" data-kawaii-sound="true" className="btn-secondary">
            {heroCopy.secondary[language]}
          </Link>
        </div>
      </section>

      <LifeTimeline items={lifeMoments} />
    </div>
  );
}
