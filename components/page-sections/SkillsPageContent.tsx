'use client';

import { useLanguage } from "@/lib/site-context";
import { skills } from "@/data/skills";
import { skillVideos } from "@/data/videos";
import { SkillsShowcase } from "@/components/SkillsShowcase";

const focusCards = [
  {
    title: {
      zh: "性能与体验双修ing",
      en: "Blending performance and experience",
    },
    detail: {
      zh: "为自建服务器做性能体检，搭配观测面板，让小主机也能跑得超顺。",
      en: "Benchmarking the self-hosted server and wiring observability so the tiny board stays snappy.",
    },
    action: {
      zh: "部署 Edge 缓存 + ISR 混合方案",
      en: "Deploying edge caching plus ISR",
    },
  },
  {
    title: {
      zh: "创作小工具开荒中",
      en: "Crafting creative helper tools",
    },
    detail: {
      zh: "把灵感卡片、模板管理、声音采样做成可爱的网页工具，准备和朋友一起玩。",
      en: "Building web helpers for inspiration cards, template magic, and sound samples to share with friends.",
    },
    action: {
      zh: "上线即时预览和邀请机制",
      en: "Roll out live preview and invite flow",
    },
  },
  {
    title: {
      zh: "组件库养成计划",
      en: "Nurturing a human-first component library",
    },
    detail: {
      zh: "用语义、可达性、互动反馈重新搭建站点组件，形成自己的 Design System。",
      en: "Rebuilding components with semantics, accessibility, and micro-interactions to form my own design system.",
    },
    action: {
      zh: "撰写设计令牌 & 指南",
      en: "Documenting tokens & guidelines",
    },
  },
] as const;

const heroCopy = {
  badge: {
    zh: "Craft & Stack",
    en: "Craft & Stack",
  },
  heading: {
    zh: "技能手册：持续进化的个人开发栈",
    en: "Skill manual for the projects I cherish",
  },
  description: {
    zh: "这份地图记录了我常用的工具、正在打磨的能力，以及保持热情的小仪式。工程、创意编码、自建服务与计算机视觉研究在这里串联。",
    en: "This map tracks the tools I reach for, the skills I polish, and the rituals that keep experiments joyful—engineering, creative coding, self-hosting, and computer vision research intertwined.",
  },
} as const;

export function SkillsPageContent() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-[36px] border border-white/40 kawaii-surface px-10 py-14 text-slate-800 dark:text-white/80 shadow-[0_50px_120px_-70px_rgba(236,72,153,0.6)] backdrop-blur dark:border-white/20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-sky-500 dark:border-sky-300/30 dark:bg-white/10 dark:text-sky-200">
          {heroCopy.badge[language]}
        </div>
        <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
          {heroCopy.heading[language]}
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-white/70 sm:text-base">
          {heroCopy.description[language]}
        </p>
      </section>

      <SkillsShowcase categories={skills} />

      <section className="grid gap-6 rounded-[32px] border border-white/40 kawaii-surface p-8 text-slate-800 dark:text-white/80 shadow-[0_50px_120px_-70px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20 md:grid-cols-3">
        {focusCards.map((focus) => (
          <article
            key={focus.title.en}
            className="flex flex-col gap-4 rounded-[26px] border border-slate-200/60 kawaii-surface p-6 shadow-[0_28px_70px_-60px_rgba(236,72,153,0.55)] dark:border-white/20"
          >
            <span className="badge-soft bg-emerald-100 text-emerald-700 dark:bg-white/10 dark:text-emerald-200">
              {focus.title[language]}
            </span>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
              {focus.detail[language]}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500 dark:text-emerald-300">
              {focus.action[language]}
            </p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-6 rounded-[32px] border border-white/40 kawaii-surface p-8 text-slate-800 dark:text-white/80 shadow-[0_50px_120px_-70px_rgba(96,165,250,0.45)] backdrop-blur dark:border-white/20">
        <header className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {language === "zh" ? "技能视频小剧场" : "Skill video spotlight"}
          </h2>
          <p className="text-sm text-slate-600 dark:text-white/70">
            {language === "zh"
              ? "把最近的研究、动效练习和创作流程做成短片，用视频讲故事。"
              : "Short clips covering research, motion practice, and creative pipelines—because sometimes video tells the story best."}
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {skillVideos.map((video) => (
            <article
              key={video.youtubeId}
              className="flex flex-col gap-3 rounded-[26px] border border-slate-200/60 kawaii-surface p-4 shadow-[0_24px_60px_-45px_rgba(147,197,253,0.6)] dark:border-white/20"
            >
              <div className="aspect-video overflow-hidden rounded-2xl border border-white/40 shadow-inner">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title[language]}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {video.title[language]}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
                {video.description[language]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
