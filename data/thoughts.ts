import type { LocalizedText } from "@/data/locale";

export type Thought = {
  title: LocalizedText;
  excerpt: LocalizedText;
  date: string;
  tags: LocalizedText[];
};

export const thoughts: Thought[] = [
  {
    title: {
      zh: "把灵感碎片养成玻璃温室",
      en: "Growing an idea greenhouse from tiny notes",
    },
    excerpt: {
      zh: "把零散备忘录做成卡片，按心情贴标签，周末翻阅像给脑袋刷温泉。",
      en: "Turning messy notes into labeled cards makes weekend reviews feel like spa days for the brain.",
    },
    date: "2024-09-12",
    tags: [
      { zh: "灵感捕手", en: "inspiration" },
      { zh: "知识管理", en: "knowledge" },
    ],
  },
  {
    title: {
      zh: "写给未来三年的自己",
      en: "A letter to myself three years from now",
    },
    excerpt: {
      zh: "把生活、作品、关系拆开慢慢聊，真正的渴望就会冒泡泡。",
      en: "Break life, craft, and relationships into gentle chats and the true desires bubble up.",
    },
    date: "2024-07-03",
    tags: [
      { zh: "自我对话", en: "self-talk" },
      { zh: "写作", en: "writing" },
    ],
  },
  {
    title: {
      zh: "想要一座会呼吸的网站",
      en: "Designing a website that breathes softly",
    },
    excerpt: {
      zh: "减少视觉噪音，安排呼吸节奏，让互动像朋友递上热可可。",
      en: "Reduce noise, plan breathing room, and let interactions feel like friends offering warm cocoa.",
    },
    date: "2024-10-21",
    tags: [
      { zh: "设计感", en: "design" },
      { zh: "体验感", en: "experience" },
    ],
  },
  {
    title: {
      zh: "Next.js 和家用服务器的小恋爱",
      en: "Next.js dating a home-lab server",
    },
    excerpt: {
      zh: "研究反向代理、日志收集和自动更新，让迷你开发板也能稳稳出差。",
      en: "Experimented with reverse proxies, logging, and auto updates so the tiny dev board feels confident.",
    },
    date: "2024-08-17",
    tags: [
      { zh: "自建服务", en: "self-host" },
      { zh: "部署日记", en: "deployment" },
    ],
  },
  {
    title: {
      zh: "研究日常：让视觉模型看懂世界",
      en: "Research log: teaching vision models to read the world",
    },
    excerpt: {
      zh: "记录实验室里训练检测模型的日夜，调参像养宠物，还要把结果可视化给伙伴们看。",
      en: "Notes from the lab while training detection models—tuning feels like raising a pet, and visualization keeps the team in sync.",
    },
    date: "2025-01-12",
    tags: [
      { zh: "计算机视觉", en: "computer-vision" },
      { zh: "研究日志", en: "research" },
    ],
  },
];
