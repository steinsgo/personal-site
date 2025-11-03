import { useLanguage } from "@/lib/site-context";
import type { LifeEvent } from "@/data/life";

type LifeTimelineProps = {
  items: LifeEvent[];
};

export function LifeTimeline({ items }: LifeTimelineProps) {
  const { language } = useLanguage();

  return (
    <div className="relative flex flex-col gap-12">
      <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-pink-300 via-slate-200 to-transparent md:left-1/2 md:-translate-x-px dark:from-pink-400/60 dark:via-white/20" />
      {items.map((event, index) => {
        const isEven = index % 2 === 0;
        return (
          <article
            key={`${event.title.en}-${event.date}`}
            className={`relative flex flex-col gap-4 rounded-[28px] border border-white/40 kawaii-surface p-8 text-slate-800 shadow-[0_40px_100px_-60px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20 md:w-[calc(50%-36px)] ${
              isEven ? "md:self-start md:mr-auto md:translate-x-[-18px]" : "md:self-end md:ml-auto md:translate-x-[18px]"
            }`}
          >
            <span className="badge-soft w-max bg-gradient-to-r from-pink-200 to-purple-200 text-pink-600 dark:from-pink-300/40 dark:to-purple-400/40 dark:text-pink-200">
              {event.date}
            </span>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {event.title[language]}
              </h3>
              {event.location ? (
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/50">
                  {event.location[language]}
                </p>
              ) : null}
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
              {event.description[language]}
            </p>
            {event.highlight ? (
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600 dark:bg-white/10 dark:text-pink-200">
                  {event.highlight[language]}
                </span>
              </div>
            ) : null}
            <span
              aria-hidden
              className={`absolute top-8 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-sky-400 shadow-lg dark:border-white/40 ${
                isEven
                  ? "left-[calc(100%+20px)] md:left-auto md:right-[-44px]"
                  : "right-[calc(100%+20px)] md:left-[-44px]"
              }`}
            />
          </article>
        );
      })}
    </div>
  );
}
