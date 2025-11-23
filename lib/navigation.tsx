import { ReactNode } from "react";

export type NavItem = {
  href: string;
  emoji: string;
  label: {
    zh: string;
    en: string;
  };
};

export type SocialLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

const githubIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.74.08-.72.08-.72 1.17.08 1.79 1.22 1.79 1.22 1.04 1.8 2.74 1.28 3.41.98.1-.77.41-1.28.74-1.58-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.2-3.09-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.75.8 1.2 1.83 1.2 3.08 0 4.46-2.69 5.43-5.26 5.71.42.36.8 1.07.8 2.16v3.2c0 .32.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"
      className="fill-current"
    />
  </svg>
);

const orcidIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path
      d="M12.02 0C5.38 0 0 5.39 0 12c0 6.61 5.38 12 12.02 12C18.64 24 24 18.61 24 12c0-6.61-5.36-12-11.98-12Zm-.04 3.29a8.7 8.7 0 1 1 0 17.4 8.7 8.7 0 0 1 0-17.4Zm-2.46 3.2v11.02h-1.6V6.5h1.6Zm5.97 3.32c1.86 0 3.15 1.27 3.15 3.12 0 1.92-1.27 3.15-3.28 3.15h-2v2.43h-1.6V9.8h3.73Zm-2.14 1.36v3.62h2.01c1.07 0 1.79-.68 1.79-1.81 0-1.15-.73-1.81-1.79-1.81h-2Z"
      className="fill-current"
    />
  </svg>
);

const xIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path
      d="M17.83 3H21l-6.86 7.85L22 21h-5.08l-3.97-4.6L8.41 21H3l7.28-8.33L2.44 3h5.17l3.6 4.24L17.83 3Zm-1.8 16h1.76L8.07 4.43H6.2L16.03 19Z"
      className="fill-current"
    />
  </svg>
);

export const navItems: NavItem[] = [
  { href: "/", label: { zh: "个人首页", en: "Home" }, emoji: "🍰" },
  { href: "/life", label: { zh: "生活日常", en: "Life" }, emoji: "🌈" },
  { href: "/skills", label: { zh: "我的技能", en: "Skills" }, emoji: "🪄" },
  { href: "/interests", label: { zh: "兴趣宇宙", en: "Interests" }, emoji: "🌌" },
  { href: "/thoughts", label: { zh: "我的脑洞", en: "Ideas" }, emoji: "💭" },
  { href: "/guestbook", label: { zh: "留言簿", en: "Guestbook" }, emoji: "📮" },
  { href: "/emotion/live", label: { zh: "情绪监管", en: "Detection" }, emoji: "📷" },
  { href: "/emotion", label: { zh: "表情识别", en: "Detection" }, emoji: "🙂" },
];

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/Steinsgo",
    label: "GitHub",
    icon: githubIcon,
  },
  {
    href: "https://orcid.org/",
    label: "ORCID",
    icon: orcidIcon,
  },
  {
    href: "https://x.com/",
    label: "X",
    icon: xIcon,
  },
];
