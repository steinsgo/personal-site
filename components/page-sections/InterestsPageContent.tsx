'use client';

import { InterestGallery } from "@/components/InterestGallery";
import { interests } from "@/data/interests";
import { useLanguage } from "@/lib/site-context";

const miniProjects = [
  {
    name: {
      zh: "城市声音图集",
      en: "Urban sound atlas",
    },
    status: "Beta",
    description: {
      zh: "把城市录音做成可视化波形，计划加入情绪与时间筛选。",
      en: "Transforming city recordings into waveforms with mood and time filters in progress.",
    },
  },
  {
    name: {
      zh: "随想折叠本",
      en: "Folded thought journal",
    },
    status: "Draft",
    description: {
      zh: "卷轴式排版配上柔柔动画，让阅读像翻可爱实体书。",
      en: "Scroll-inspired layouts plus soft animations to make reading feel like flipping a cute book.",
    },
  },
  {
    name: {
      zh: "植物识别地图",
      en: "Plant spotting map",
    },
    status: "Idea",
    description: {
      zh: "基于 Leaflet 的互动地图，记录社区散步遇到的四季植物。",
      en: "Leaflet map hosted on the home server to log seasonal plants around the neighborhood.",
    },
  },
] as const;

const heroCopy = {
  badge: {
    zh: "Playground",
    en: "Playground",
  },
  heading: {
    zh: "好奇心实验室开门啦",
    en: "Curiosity lab now open",
  },
  description: {
    zh: "我把灵感当实验，从声音、字形到互动故事，每个兴趣都做成一个小作品，欢迎一起探索新的兔子洞。",
    en: "Every spark becomes a mini experiment—sound, lettering, interactive stories. Come explore new rabbit holes with me!",
  },
} as const;

export function InterestsPageContent() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-[36px] border border-white/40 kawaii-surface px-10 py-14 text-slate-800 dark:text-white/80 shadow-[0_50px_120px_-70px_rgba(236,72,153,0.6)] backdrop-blur dark:border-white/20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500 dark:border-emerald-300/30 dark:bg-white/10 dark:text-emerald-200">
          {heroCopy.badge[language]}
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {heroCopy.heading[language]}
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-white/70 sm:text-base">
          {heroCopy.description[language]}
        </p>
      </section>

      <InterestGallery interests={interests} />

      <section className="rounded-[32px] border border-white/40 kawaii-surface p-8 text-slate-800 dark:text-white/80 shadow-[0_50px_120px_-70px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20">
        <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-2xl">
          {language === "zh" ? "进行中的微型项目" : "Mini projects in motion"}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-white/60">
          {language === "zh"
            ? "把兴趣落地成具体作品，一步步迭代成可分享的小工具。"
            : "Turning passions into shareable tools, iterating one sparkle at a time."}
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {miniProjects.map((project) => (
            <article
              key={project.name.en}
              className="flex flex-col gap-3 rounded-[26px] border border-slate-200/60 kawaii-surface p-6 shadow-[0_28px_70px_-60px_rgba(236,72,153,0.55)] dark:border-white/20"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-4xl font-semibold leading-tight tracking-tight sm:text-xl">
                  {project.name[language]}
                </h3>
                <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white dark:bg-white/20">
                  {project.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
                {project.description[language]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
