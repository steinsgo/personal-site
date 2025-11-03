import type { SkillCategory } from "@/data/skills";
import { useLanguage } from "@/lib/site-context";

type SkillsShowcaseProps = {
  categories: SkillCategory[];
};

export function SkillsShowcase({ categories }: SkillsShowcaseProps) {
  const { language } = useLanguage();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {categories.map((category) => (
        <article
          key={category.title.en}
          className="card-frosted flex flex-col gap-5 p-6 text-slate-500 transition-transform hover:-translate-y-1 hover:shadow-[0_32px_80px_-60px_rgba(236,72,153,0.55)] dark:text-white/80"
        >
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-xl">
              {category.title[language]}
            </h1>
            <span className="badge-soft bg-sky-100 text-sky-700 dark:bg-white/10 dark:text-sky-200">
              {category.highlight[language]}
            </span>
          </div>
          <ul className="grid gap-2 text-sm text-slate-600 dark:text-white/70">
            {category.items.map((item) => (
              <li key={item.en} className="flex items-baseline gap-2">
                <span className="text-pink-400">✦</span>
                <span>{item[language]}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
