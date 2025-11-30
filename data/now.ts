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
    zh: "2025 冬季",
    en: "Winter 2025",
  },
  location: {
    zh: "珠海-横琴",
    en: "Zhuhai-Hengqin",
  },
  vibe: {
    zh: "努力活着，永远不死",
    en: "Trying to live, never die",
  },
  focus: [
    {
      zh: "正在实践小车加自动避障功能...(或者让它实现3d建图?)",
      en: " Implementing obstacle avoidance for my small car...(or let it do 3D mapping?)",
    },
    {
      zh: "计算机视觉图像恢复方法研究--超分辨率、去噪声",
      en: " Research on computer vision image restoration methods--super-resolution, denoising",
    },
    {
      zh: "努力申请研究生中",
      en: " Working hard on applying for graduate school",
    },
  ],
  soundtrack: {
    title: {
      zh: "每日推荐",
      en: " Daily Recommendation",
    },
    artist: {
      zh: "気になるあの娘 - 相対性理論",
      en: " Kininaru Anoko - Sōtaisei Riron",
    },
  },
  moodboard: {
    zh: " ふつう ふつう わりと普通       ぐるぐるぐるぐるぐるぐるぐるぐる",
    en: "Don't   STOP   to  SPIN        ぐるぐるぐるぐるぐるぐるぐるぐる",
  },
};
