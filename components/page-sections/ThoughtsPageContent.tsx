'use client';

import { Inspiration } from "@/components/Inspiration";
import { ThoughtNotebook } from "@/components/ThoughtNotebook";
import { thoughts } from "@/data/thoughts";
import { useLanguage } from "@/lib/site-context";

const heroCopy = {
  badge: {
    zh: "Thought Lab",
    en: "Thought Lab",
  },
  heading: {
    zh: "思维日志：留给未来自己的笔记",
    en: "Idea log: notes for future me",
  },
  description: {
    zh: "我把想法变成卡片，每个周末都会重新混合它们。偷瞄一眼，看看我最近在思考什么！",
    en: "I turn ideas into cards and remix them every weekend. Peek at one to see what my brain is bubbling about lately!",
  },
} as const;

export function ThoughtsPageContent() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-[36px] border border-white/40 kawaii-surface px-10 py-14 text-slate-800 dark:text-white/80 shadow-[0_50px_120px_-70px_rgba(236,72,153,0.6)] backdrop-blur dark:border-white/20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-purple-500 dark:border-purple-300/30 dark:bg-white/10 dark:text-purple-200">
          {heroCopy.badge[language]}
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {heroCopy.heading[language]}
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-white/70 sm:text-base">
          {heroCopy.description[language]}
        </p>
      </section>

      <Inspiration thoughts={thoughts} />

      <ThoughtNotebook thoughts={thoughts} />
    </div>
  );
}
