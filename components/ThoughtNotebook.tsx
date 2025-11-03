import { useLanguage } from "@/lib/site-context";
import type { Thought } from "@/data/thoughts";

type ThoughtNotebookProps = {
  thoughts: Thought[];
};

export function ThoughtNotebook({ thoughts }: ThoughtNotebookProps) {
  const { language } = useLanguage();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {thoughts.map((thought) => (
        <article
          key={thought.title.en}
          className="relative flex flex-col gap-4 rounded-[28px] border border-slate-200/60 kawaii-surface p-7 text-slate-800 shadow-[0_28px_80px_-60px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="badge-soft bg-purple-100 text-purple-700 dark:bg-white/10 dark:text-purple-200">
              {thought.date}
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-400 dark:text-white/50">
              {thought.tags.map((tag) => (
                <span
                  key={tag.en}
                  className="rounded-full bg-slate-100 px-2 py-1 text-slate-500 dark:bg-white/10 dark:text-white/60"
                >
                  #{tag[language]}
                </span>
              ))}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {thought.title[language]}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
            {thought.excerpt[language]}
          </p>
          <span
            aria-hidden
            className="absolute -top-4 right-6 inline-flex rounded-full border border-white/70 bg-gradient-to-br from-purple-400 to-rose-300 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white dark:border-white/50"
          >
            {language === "zh" ? "NOTE" : "NOTE"}
          </span>
        </article>
      ))}
    </div>
  );
}
