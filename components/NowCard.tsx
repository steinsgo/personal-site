import { nowCard } from "@/data/now";
import { useLanguage } from "@/lib/site-context";

export function NowCard() {
  const { language } = useLanguage();

  return (
    <section className="grid gap-6 rounded-[32px] border border-white/40 kawaii-surface p-8 text-slate-800 dark:text-white/80 shadow-[0_40px_100px_-60px_rgba(236,72,153,0.55)] backdrop-blur md:grid-cols-[1.2fr_1fr] dark:border-white/20 dark:text-white/80">
      <div className="flex flex-col gap-4">
        <span className="badge-soft bg-slate-900/90 text-white dark:bg-white/10 dark:text-pink-200">
          {nowCard.season[language]}
        </span>
        <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-3xl">
          {language === "zh" ? "现在 - 我专注的内容" : "Now - what I am focused on"}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
          {nowCard.vibe[language]}
        </p>
        <dl className="grid gap-2 text-sm text-slate-600 dark:text-white/70">
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">
              {language === "zh" ? "当前位置" : "Location"}
            </dt>
            <dd>{nowCard.location[language]}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">
              {language === "zh" ? "专注" : "Focus"}
            </dt>
            <dd>
              <ul className="mt-2 list-disc pl-5">
                {nowCard.focus.map((item) => (
                  <li key={item.en} className="mb-1">
                    {item[language]}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-col justify-between rounded-[28px] border border-slate-200/60 kawaii-surface p-6 shadow-[0_32px_80px_-60px_rgba(236,72,153,0.45)] dark:border-white/20">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">
            {language === "zh" ? "原声带" : "Soundtrack"}
          </p>
          <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            {nowCard.soundtrack.title[language]}
          </h3>
          <p className="text-sm text-slate-500 dark:text-white/60">
            {nowCard.soundtrack.artist[language]}
          </p>
        </div>
        <div className="mt-6 h-32 rounded-2xl bg-gradient-to-br from-violet-400/60 via-blue-400/50 to-emerald-300/50 p-4 text-white shadow-inner dark:from-violet-500/40 dark:via-sky-500/35 dark:to-emerald-400/35">
          <p className="text-xs uppercase tracking-[0.42em]">
            Moodboard
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            {nowCard.moodboard[language]}
          </p>
        </div>
      </div>
    </section>
  );
}
