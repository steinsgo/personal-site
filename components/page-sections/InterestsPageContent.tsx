'use client';

import { InterestGallery } from "@/components/InterestGallery";
import { interests } from "@/data/interests";
import { useLanguage } from "@/lib/site-context";

export const miniProjects = [
  {
    name: {
      zh: "Radiohead 歌曲翻唱",
      en: "Radiohead Song Cover",
    },
    status: "Idea",
    description: {
      zh: "计划在河边录制 Radiohead 歌曲的翻唱版本",
      en: "Planning to record a cover of a Radiohead song by the river, blending in natural sounds like flowing water and birdsong for a unique atmospheric feel.",
    },
  },
  {
    name: {
      zh: "日本圣地巡礼",
      en: "Japan Holy Sites Pilgrimage",
    },
    status: "Plan",
    description: {
      zh: "计划前往日本，参观动漫、音乐或文化相关的圣地，记录旅程中的照片、视频和心得，制作成个人旅行日志。",
      en: "Planning a trip to Japan to visit holy sites related to anime, music, or culture, documenting the journey with photos, videos, and personal reflections into a travel log.",
    },
  },
  {
    name: {
      zh: "视觉机器人项目",
      en: "Visual Robot Project",
    },
    status: "Plan",
    description: {
      zh: "继续开发一个能通过视觉系统连接大脑的智能机器人，探索实时图像处理和AI互动功能，目标是实现更自然的机器人-人类交流。",
      en: "Continuing to develop a smart robot that connects vision systems to the brain, exploring real-time image processing and AI interactions, aiming for more natural robot-human communication.",
    },
  },
] as const;

const heroCopy = {
  badge: {
    zh: "Playground",
    en: "Playground",
  },
  heading: {
    zh: "我的兴趣爱好介绍",
    en: "Curiosity lab now open",
  },
  description: {
    zh: "我把灵感当实验，从声音调制到机器人组装，每个兴趣都有一段特别经历，欢迎一起探索Music和Robotics的世界！",
    en: "Every spark becomes a mini experiment—sound and robotic design. Come explore new rabbit holes with me!",
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
          {language === "zh" ? "进行中的想法" : "Mini projects in motion"}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-white/60">
          {language === "zh"
            ? "把兴趣落地成具体作品，一步步分享我的实践过程。"
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
