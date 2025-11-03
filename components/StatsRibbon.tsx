'use client';

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/site-context";

const COUNT_KEY = "kawaii-total-visits";
const SESSION_KEY = "kawaii-session-counted";

function formatTime(language: "zh" | "en", date: Date) {
  const locale = language === "zh" ? "zh-CN" : "en-US";
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  });
}

export function StatsRibbon() {
  const { language } = useLanguage();
  const [time, setTime] = useState<string | null>(null);
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateClock = () => {
      setTime(formatTime(language, new Date()));
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(COUNT_KEY);
      let count = Number.parseInt(stored ?? "", 10);
      if (Number.isNaN(count) || count < 1000) {
        count = 1314;
      }
      const hasCounted = window.sessionStorage.getItem(SESSION_KEY);
      if (!hasCounted) {
        count += 1;
        window.localStorage.setItem(COUNT_KEY, String(count));
        window.sessionStorage.setItem(SESSION_KEY, "yes");
      }
      setVisits(count);
    } catch (error) {
      console.warn("Failed to read visit count:", error);
      setVisits(1314);
    }
  }, []);

  const visitorLabel = language === "zh" ? "累计拜访" : "Total visitors";
  const timeLabel = language === "zh" ? "北京时间" : "Beijing Time";
  const displayTime = time ?? "--:--:--";
  const fallbackVisits = visits ?? 1314;
  const formattedVisits = fallbackVisits.toLocaleString(language === "zh" ? "zh-CN" : "en-US");

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/40 kawaii-surface px-5 py-3 text-xs font-semibold text-slate-600 shadow-[0_30px_80px_-60px_rgba(96,165,250,0.6)] backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/70">
      <div className="inline-flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-purple-400 text-white shadow-[0_12px_25px_-18px_rgba(56,189,248,0.75)]">
          ⏰
        </span>
        <span>
          {timeLabel} · {displayTime}
        </span>
      </div>
      <div className="inline-flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-amber-400 text-white shadow-[0_12px_25px_-18px_rgba(244,114,182,0.75)]">
          ♡
        </span>
        <span>
          {visitorLabel} · {formattedVisits}
        </span>
      </div>
    </section>
  );
}
