import type { LifeEvent } from "@/data/life";
import { useLanguage } from "@/lib/site-context";

type LifeGridProps = {
  items: LifeEvent[];
};

export function LifeGrid({ items }: LifeGridProps) {
  const { language } = useLanguage();

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <article
          key={`${item.title.en}-${item.date}`}
          className="card-frosted relative flex h-full flex-col gap-4 p-6 text-slate-500 transition-transform hover:-translate-y-1 hover:shadow-[0_32px_80px_-60px_rgba(236,72,153,0.55)] dark:text-white/80"
        >
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-slate-400 dark:text-white/50">
            <span>{item.date}</span>
            {item.location ? (
              <span className="text-pink-400 dark:text-pink-200">{item.location[language]}</span>
            ) : null}
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-xl">
            {item.title[language]}
          </h1>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
            {item.description[language]}
          </p>
          {item.highlight ? (
            <div className="mt-auto flex flex-wrap gap-2 pt-4 text-xs font-medium text-pink-500 dark:text-pink-200">
              <span className="rounded-full bg-pink-50 px-3 py-1 text-pink-500 dark:bg-white/10 dark:text-pink-200">
                {item.highlight[language]}
              </span>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
