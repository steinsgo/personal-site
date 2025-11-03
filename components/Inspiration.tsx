'use client';

import { useEffect, useMemo, useState } from "react";
import type { Thought } from "@/data/thoughts";
import { useLanguage } from "@/lib/site-context";

type InspirationProps = {
  thoughts: Thought[];
};

export function Inspiration({ thoughts }: InspirationProps) {
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (thoughts.length <= 1) return;
    setIndex((prev) => {
      if (thoughts.length === 1) return prev;
      let next = Math.floor(Math.random() * thoughts.length);
      if (next === prev) {
        next = (next + 1) % thoughts.length;
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thoughts.length]);

  useEffect(() => {
    if (index >= thoughts.length && thoughts.length > 0) {
      setIndex(0);
    }
  }, [index, thoughts.length]);

  const current = useMemo(() => thoughts[index] ?? null, [index, thoughts]);

  const handleShuffle = () => {
    if (thoughts.length === 0) return;
    setIndex((prev) => {
      if (thoughts.length === 1) return prev;
      let next = Math.floor(Math.random() * thoughts.length);
      if (next === prev) {
        next = (next + 1) % thoughts.length;
      }
      return next;
    });
  };

  if (!current) {
    return null;
  }

  return (
    <div className="card-frosted flex flex-col gap-4 p-6 text-slate-800 dark:text-white/80">
      <span className="badge-soft bg-purple-100 text-purple-700 dark:bg-white/10 dark:text-purple-200">
        {language === "zh" ? "今日灵感闪闪" : "Idea of the moment"}
      </span>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{current.title[language]}</h3>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">{current.excerpt[language]}</p>
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400 dark:text-white/50">
        <time>{current.date}</time>
        <div className="flex flex-wrap gap-2">
          {current.tags.map((tag) => (
            <span
              key={tag.en}
              className="rounded-full bg-slate-100 px-2 py-1 text-slate-500 dark:bg-white/10 dark:text-white/60"
            >
              #{tag[language]}
            </span>
          ))}
        </div>
      </div>
      <div>
        <button type="button" onClick={handleShuffle} className="btn-secondary">
          {language === "zh" ? "再换一个灵感" : "Shuffle another idea"}
        </button>
      </div>
    </div>
  );
}
