import type { Interest } from "@/data/interests";
import { useLanguage } from "@/lib/site-context";
import Link from "next/link";

type InterestGalleryProps = {
  interests: Interest[];
};

export function InterestGallery({ interests }: InterestGalleryProps) {
  const { language } = useLanguage();

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {interests.map((interest) => (
        <article
          key={interest.title.en}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 kawaii-surface p-6 text-slate-500 shadow-[0_24px_70px_-60px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20"
        >
          <div className="pointer-events-none absolute -right-10 top-10 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-300/40 via-cyan-200/30 to-transparent blur-2xl dark:from-emerald-300/25 dark:via-cyan-300/20" />
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-xl">
            {interest.title[language]}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-white/70">
            {interest.description[language]}
          </p>
          {interest.link ? (
            <Link
              href={interest.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition-transform hover:translate-x-1 dark:text-emerald-300"
            >
              {language === "zh" ? "去看更多" : "Learn more"}
              <span aria-hidden>→</span>
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}
