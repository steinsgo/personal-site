import type { LocalizedText } from "@/data/locale";

export type LifeEvent = {
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  location?: LocalizedText;
  highlight?: LocalizedText;
};

export const lifeMoments: LifeEvent[] = [
  {
    title: {
      zh: "搬到江边的小秘密基地",
      en: "Moved into my riverside secret base",
    },
    description: {
      zh: "把钱塘江的晨跑当成魔力充电，每周都要记录咖啡香、街头猫咪和亮晶晶的河面。",
      en: "Morning jogs by the Qiantang have become magic recharge sessions filled with coffee aromas, street cats, and sparkling water.",
    },
    date: "2024.09",
    location: {
      zh: "杭州",
      en: "Hangzhou",
    },
    highlight: {
      zh: "江风打卡",
      en: "River breeze check-ins",
    },
  },
  {
    title: {
      zh: "第一次完成半程马拉松",
      en: "Finished my first half marathon",
    },
    description: {
      zh: "早起训练 + 自制能量棒 = 成就感爆棚！冲线那刻真的想抱住全世界。",
      en: "Early-morning training plus homemade energy bars equaled massive joy—even wanted to hug the whole world at the finish line.",
    },
    date: "2023.11",
    location: {
      zh: "厦门",
      en: "Xiamen",
    },
    highlight: {
      zh: "给汗水点个赞",
      en: "High-five the sweat",
    },
  },
  {
    title: {
      zh: "第 100 篇软萌技术手记",
      en: "Published the 100th soft-tech journal",
    },
    description: {
      zh: "把 Next.js、Three.js、Tailwind 的实验做成卡片，像堆积乐高一样慢慢搭建宇宙。",
      en: "Turned Next.js, Three.js, and Tailwind experiments into collectible cards—building a mini universe like stacking pastel LEGO.",
    },
    date: "2024.04",
    highlight: {
      zh: "知识泡泡",
      en: "Knowledge bubbles",
    },
  },
  {
    title: {
      zh: "周末创作派对上线",
      en: "Weekend creative party launched",
    },
    description: {
      zh: "和朋友玩声音、插画和故事游戏，最后办了迷你展，每个人都笑到停不下来。",
      en: "Invited friends for sound, illustration, and story jams that ended with a grinning mini showcase.",
    },
    date: "2024.07",
    highlight: {
      zh: "好友增益 buff",
      en: "Friendship buff",
    },
  },
];
