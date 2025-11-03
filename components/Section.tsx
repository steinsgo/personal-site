'use client';

import type { LocalizedText } from "@/data/locale";
import { useLanguage } from "@/lib/site-context";
import type { ReactNode } from "react";

type MaybeLocalized = string | LocalizedText;

type SectionProps = {
  id: string;
  title: MaybeLocalized;
  description?: MaybeLocalized;
  children: ReactNode;
};

export function Section({ id, title, description, children }: SectionProps) {
  const { language } = useLanguage();

  const resolve = (value?: MaybeLocalized) => {
    if (!value) return undefined;
    return typeof value === "string" ? value : value[language];
  };

  return (
    <section id={id} className="scroll-mt-28">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {resolve(title)}
          </h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-white/70 sm:text-base">
              {resolve(description)}
            </p>
          ) : null}
        </div>
      </header>
      {children}
    </section>
  );
}
