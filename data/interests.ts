import type { LocalizedText } from "@/data/locale";

export type Interest = {
  title: LocalizedText;
  description: LocalizedText;
  link?: string;
};

export const interests: Interest[] = [
  {
    title: {
      zh: "音乐探索",
      en: "Music Exploration",
    },
    description: {
      zh: "沉迷于日系音乐、摇滚、乐队表演、爵士乐、吉他弹奏、钢琴旋律和 Bossa Nova 节奏，喜欢通过这些元素创造出属于自己的音乐世界",
      en: "Diving into Japanese music, rock, band performances, jazz, guitar playing, piano melodies, and Bossa Nova rhythms, enjoying the creation of personal soundscapes and sometimes humming along to the beats.",
    },
    link: "https://www.youtube.com/watch?v=hI9fjymKFlM&list=PLHIkGG3ThOG3ri8qe7rqB9ARv4HaDd7ry&index=55", // 替换为实际的 Lamp 乐队歌曲 YouTube 链接，例如 https://www.youtube.com/watch?v=dQw4w9WgXcQ
  },
  {
    title: {
      zh: "机器人爱好",
      en: "Robotics Passion",
    },
    description: {
      zh: "最近超级着迷机器人领域，正在努力学习相关知识设计能通过视觉系统连接大脑的智能机器人，梦想是造哆啦a梦",
      en: "Recently obsessed with robotics, actively learning the field, and aspiring to build a robot that connects vision systems to the brain for futuristic interactive experiences.",
    },
    link:"https://www.youtube.com/watch?v=e-nbSGRFP4Q"
  },
  {
    title: {
      zh: "甜食重度依赖",
      en: "Sweet Treats Craze",
    },
    description: {
      zh: "热爱各种甜点，尤其是巴菲、蛋糕和冰淇淋等，喜欢尝试新口味的甜食",
      en: "Crazy about sweets like parfaits, cakes, and ice creams, enjoying trying new flavors, and sometimes baking them myself to savor that melting happiness.",
    },
  },
  {
    title: {
      zh: "游戏世界",
      en: "Gaming World",
    },
    description: {
      zh: "努力成为《怪物猎人》系列的“老东西天尊”，比较喜欢玩剧情类的 Galgame",
      en: "Obsessed with the hunting adventures in Monster Hunter series and the narrative interactions in Galgames, loving to immerse in virtual worlds for stories and challenges, and sharing experiences with friends to extend the fun.",
    },
    link: "https://www.bilibili.com/video/BV1zjUFBHE5q/?spm_id_from=333.337.search-card.all.click&vd_source=d8720e6fd56359f5d75b47aa9761ea29"
  },
];
