import type { LocalizedText } from "@/data/locale";

export type SkillVideo = {
  title: LocalizedText;
  description: LocalizedText;
  youtubeId: string;
};

export const skillVideos: SkillVideo[] = [
  {
    title: {
      zh: "计算机视觉研究速写本",
      en: "Computer vision research sketchbook",
    },
    description: {
      zh: "记录视觉模型调参与实验结果的过程，让大家看看研究日常～",
      en: "A peek at model tuning sessions and experiment results—sharing my research routine!",
    },
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: {
      zh: "动效与交互小练习",
      en: "Micro-interaction playground",
    },
    description: {
      zh: "展示如何给界面加上可爱的动效与音效，让点击手感更像玩游戏。",
      en: "Showing how kawaii motion and sound make every click feel like a mini game.",
    },
    youtubeId: "l482T0yNkeo",
  },
  {
    title: {
      zh: "创作工具研发日志",
      en: "Creative tooling dev log",
    },
    description: {
      zh: "把写作模板、声音采样、图形笔记串成工作流的幕后故事。",
      en: "Behind the scenes of connecting writing templates, sound sampling, and visual notes into one workflow.",
    },
    youtubeId: "C0DPdy98e4c",
  },
];
