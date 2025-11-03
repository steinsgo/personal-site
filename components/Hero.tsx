import { useLanguage } from "@/lib/site-context";
import Link from "next/link";

const copy = {
  badge: {
    zh: "欢迎来到 Steinsgo 的温馨角落",
    en: "Welcome to Steinsgo's cozy corner",
  },
  heading: {
    zh: "Hi~ o(*￣▽￣*)ブ Steinsgo在此喵！",
    en: "Hi~ o(*￣▽￣*)ブ I'm Steinsgo!",
  },
  description: {
    zh: "这个角落储存着生活冒险、手工魔法、粉丝宇宙和闪亮创意——把这里当作一个大大的拥抱！",
    en: "This nook stores life adventures, craft magic, fandom universes, and sparkly ideas—consider this a big cuddle!",
  },
  primary: {
    zh: "窥探生活冒险",
    en: "Peek at life adventures",
  },
  secondary: {
    zh: "留下你的问候或是对 fandom 的推荐，Steinsgo 会用闪耀的回复你！",
    en: "Leave a hug in the guestbook",
  },
} as const;

export function Hero() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/40 kawaii-surface px-10 py-16 text-slate-900 dark:text-white shadow-[0_40px_120px_-60px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/20">
      <div className="pointer-events-none absolute -top-24 right-[-80px] h-72 w-72 rounded-full bg-gradient-to-br from-pink-400/40 via-amber-200/30 to-transparent blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-20 left-[-40px] h-60 w-60 rounded-full bg-gradient-to-br from-sky-400/40 via-purple-300/30 to-transparent blur-3xl sm:h-80 sm:w-80" />

      <div className="relative flex flex-col gap-6">
        <span className="badge-soft w-max bg-gradient-to-r from-pink-200 to-sky-200 text-pink-600 dark:bg-white/10 dark:text-pink-200">
          {copy.badge[language]}
        </span>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {copy.heading[language]}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-white/70">
          {copy.description[language]}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="#life" className="btn-primary">
            {copy.primary[language]}
          </Link>
          <Link href="#guestbook" className="btn-secondary">
            {copy.secondary[language]}
          </Link>
        </div>
      </div>
    </section>
  );
}
