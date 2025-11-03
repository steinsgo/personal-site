import type { LocalizedText } from "@/data/locale";

export type NowCard = {
  season: LocalizedText;
  location: LocalizedText;
  vibe: LocalizedText;
  focus: LocalizedText[];
  soundtrack: {
    title: LocalizedText;
    artist: LocalizedText;
  };
  moodboard: LocalizedText;
};

export const nowCard: NowCard = {
  season: {
    zh: "2024 秋季",
    en: "Autumn 2024",
  },
  location: {
    zh: "杭州·江边工作室",
    en: "Hangzhou - riverside studio loft",
  },
  vibe: {
    zh: "让生活、手作和宅宅实验在同一节奏里跳舞。",
    en: "Keeping life, craft, and tinkering dancing to the same rhythm.",
  },
  focus: [
    {
      zh: "为自建服务器调试监控小精灵脚本",
      en: "Tuning monitoring sprites for the self-hosted server",
    },
    {
      zh: "整理全站的萌萌设计语言与组件库",
      en: "Polishing the kawaii site design language and component library",
    },
    {
      zh: "筹备线下声音漫步工作坊：一起听城市唱歌",
      en: "Preparing an offline sound-walk workshop to let the city sing together",
    },
  ],
  soundtrack: {
    title: {
      zh: "City Light Sketch",
      en: "City Light Sketch",
    },
    artist: {
      zh: "Saeglopur Remix - Sigur Ros",
      en: "Saeglopur Remix - Sigur Ros",
    },
  },
  moodboard: {
    zh: "柔柔电子 + 细雨采样，编码时像在排练动漫主题曲。",
    en: "Soft electronic layers plus drizzle samples make coding feel like rehearsing an anime theme song.",
  },
};
