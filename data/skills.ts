import type { LocalizedText } from "@/data/locale";

export type SkillCategory = {
  title: LocalizedText;
  highlight: LocalizedText;
  items: LocalizedText[];
};

export const skills: SkillCategory[] = [
  {
    title: {
      zh: "前端React",
      en: "Frontend sparkle wand",
    },
    highlight: {
      zh: "前端设计",
      en: "Ship fast, stay adorable, stay vision-savvy",
    },
    items: [
      {
        zh: "React 伙伴：Next.js App Router、React Query、Zustand",
        en: "React buddies: Next.js App Router, React Query, Zustand",
      },
      {
        zh: "样式魔法：Tailwind、Framer Motion、CSS Modules",
        en: "Styling magic: Tailwind, Framer Motion, CSS Modules",
      },
      {
        zh: "小工具箱：Vite、Turbopack、Vitest、Playwright",
        en: "Toolbox: Vite, Turbopack, Vitest, Playwright",
      },
      {
        zh: "组件美学：可访问性 + 设计令牌 + Storybook",
        en: "Component aesthetics: accessibility, design tokens, Storybook",
      },
      {
        zh: "计算机视觉上手：OpenCV + PyTorch Lightning 微调与特征可视化",
        en: "Computer vision stack: OpenCV plus PyTorch Lightning fine-tuning with feature visualizations",
      },
    ],
  },
  {
    title: {
      zh: "创意代码游乐园",
      en: "Creative coding playground",
    },
    highlight: {
      zh: "故事和互动都要甜",
      en: "Stories and interactions stay sweet",
    },
    items: [
      {
        zh: "长阅读排版 + 沉浸式体验画廊",
        en: "Long-form layouts and immersive experience galleries",
      },
      {
        zh: "Three.js + GLSL 做轻盈 3D 粉粉特效",
        en: "Three.js + GLSL for airy 3D sparkles",
      },
      {
        zh: "Figma 组件花园配套多主题皮肤",
        en: "Figma component garden with multi-theme outfits",
      },
      {
        zh: "内容创作：随笔、播客、城市灵感小卡",
        en: "Content craft: essays, podcasts, urban inspiration cards",
      },
    ],
  },
  {
    title: {
      zh: "后端与部署召唤术",
      en: "Backend & deployment summoning",
    },
    highlight: {
      zh: "自建服务器小剧场",
      en: "Home-lab experiments in progress",
    },
    items: [
      {
        zh: "Node.js + Fastify 写轻量 API 和留言板服务",
        en: "Node.js + Fastify for lightweight APIs and guestbook services",
      },
      {
        zh: "SQLite + PlanetScale 让数据随时打包游走",
        en: "SQLite + PlanetScale keep data portable and happy",
      },
      {
        zh: "Docker Compose 指挥家庭开发板合奏",
        en: "Docker Compose orchestrates the home dev board",
      },
      {
        zh: "GitHub Actions 负责 CI/CD 小精灵",
        en: "GitHub Actions takes care of CI/CD sprites",
      },
    ],
  },
  {
    title: {
      zh: "学习节奏心电图",
      en: "Learning rhythm heartbeat",
    },
    highlight: {
      zh: "公开迭代好开心",
      en: "Iterate in public with sparkles",
    },
    items: [
      {
        zh: "深入：Web 性能体检 + 视觉模型评估指标",
        en: "Deep dive: web performance diagnostics plus vision model metrics",
      },
      {
        zh: "探索：用 Rust 做 CLI 小助手",
        en: "Explore: crafting Rust CLI helpers",
      },
      {
        zh: "热爱：把声音设计和可视化结合",
        en: "Passion: blending sound design with generative visuals",
      },
      {
        zh: "仪式感：每周可爱复盘 + 分享",
        en: "Ritual: weekly kawaii retros and sharing",
      },
    ],
  },
];
