'use client';

import { Guestbook } from "@/components/Guestbook";
import { useLanguage } from "@/lib/site-context";

const heroCopy = {
  badge: {
    zh: "Guestbook",
    en: "Guestbook",
  },
  heading: {
    zh: "留言簿拥抱：留给未来访客的笔记",
    en: "Guestbook hugs: notes for future visitors",
  },
  description: {
    zh: "留言簿拥抱：留给未来访客的笔记",
    en: "Notes stay in your browser for now; once the self-hosted server is live, every word will be archived. Share anything to make this corner warmer!",
  },
} as const;

export function GuestbookPageContent() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-[36px] border border-white/40 kawaii-surface px-10 py-14 text-slate-800 dark:text-white/80 shadow-[0_50px_120px_-70px_rgba(236,72,153,0.6)] backdrop-blur dark:border-white/20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 dark:border-white/20 dark:bg-white/10 dark:text-white/70">
          {heroCopy.badge[language]}
        </div>
        <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
          {heroCopy.heading[language]}
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-white/70 sm:text-base">
          {heroCopy.description[language]}
        </p>
      </section>

      <Guestbook />
    </div>
  );
}
