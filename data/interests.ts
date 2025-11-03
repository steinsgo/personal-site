import type { LocalizedText } from "@/data/locale";

export type Interest = {
  title: LocalizedText;
  description: LocalizedText;
  link?: string;
};

export const interests: Interest[] = [
  {
    title: {
      zh: "偷听城市心跳",
      en: "Eavesdropping on the city heartbeat",
    },
    description: {
      zh: "收集街头风声、公交广播和咖啡机滋滋声，再和合成器混音做成萌萌配乐。",
      en: "Collects breeze, bus chimes, and espresso hisses, remixing them with synths into cute city soundtracks.",
    },
    link: "https://citiesandmemory.com/",
  },
  {
    title: {
      zh: "手写字体小剧场",
      en: "Hand-lettering theater",
    },
    description: {
      zh: "研究笔画结构，在 iPad 上做自定义字体，让标题都带着乙女心。",
      en: "Studies stroke structure and builds custom iPad typefaces so every heading sparkles with charm.",
    },
    link: "https://www.fontsinuse.com/",
  },
  {
    title: {
      zh: "微型互动糖果屋",
      en: "Mini interactive candy house",
    },
    description: {
      zh: "用 p5.js 和 three.js 做小玩具，让文章里可以边玩边理解脑洞。",
      en: "Builds p5.js and three.js toys so readers can poke ideas while reading.",
    },
  },
  {
    title: {
      zh: "城市植物寻宝图",
      en: "Urban plant treasure map",
    },
    description: {
      zh: "沿路标记四季植物，用 Leaflet 做地图，散步就像开箱惊喜。",
      en: "Marks seasonal plants with Leaflet so every walk becomes an unboxing adventure.",
    },
    link: "https://leafletjs.com/",
  },
];
