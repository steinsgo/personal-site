'use client';

import { Guestbook } from "@/components/Guestbook";
import { Hero } from "@/components/Hero";
import { Inspiration } from "@/components/Inspiration";
import { InterestGallery } from "@/components/InterestGallery";
import { LifeGrid } from "@/components/LifeGrid";
import { NowCard } from "@/components/NowCard";
import { Section } from "@/components/Section";
import { SkillsShowcase } from "@/components/SkillsShowcase";
import { interests } from "@/data/interests";
import { lifeMoments } from "@/data/life";
import { skills } from "@/data/skills";
import { thoughts } from "@/data/thoughts";
import { useLanguage } from "@/lib/site-context";
import Link from "next/link";

const sectionCopy = {
  life: {
    title: {
      zh: "生活日志",
      en: "Life log",
    },
    description: {
      zh: "记录生活中每一个细微的心跳与里程碑，让我的故事不断升级~",
      en: "Snapshots of tiny heartbeats and milestones that keep my story leveling up.",
    },
    cta: {
      zh: "查看完整时间线",
      en: "View the full timeline",
    },
  },
  skills: {
    title: {
      zh: "技能图谱",
      en: "Skill map",
    },
    description: {
      zh: "记录学习过程中的每个技能点滴，无限进步。",
      en: "Documenting lessons as cute skill cards so the progress bar stays glowing.",
    },
    cta: {
      zh: "探索技能手册",
      en: "Explore the skill manual",
    },
  },
  interests: {
    title: {
      zh: "兴趣爱好",
      en: "Interest lab",
    },
    description: {
      zh: "把好奇心变成一个个兴趣，不断实验和迭代想法，让灵感在宇宙中跳舞。",
      en: "Turning curiosities into tiny experiments so inspiration can disco around the galaxy.",
    },
    cta: {
      zh: "研究实验室",
      en: "Open the lab",
    },
  },
  thoughts: {
    title: {
      zh: "思维日志",
      en: "Idea log",
    },
    description: {
      zh: "记录下一次灵感闪现的瞬间，随时准备好与未来的自己对话。",
      en: "Shuffle a notebook card and keep the conversation going with future-me.",
    },
    cta: {
      zh: "阅读更多灵感记录",
      en: "Read more field notes",
    },
  },
  guestbook: {
    title: {
      zh: "留言簿",
      en: "Guestbook",
    },
    description: {
      zh: "在留言簿写下你想说的话吧！",
      en: "Drop a hello or fandom recommendation and Steinsgo will reply with sparkles!",
    },
    cta: {
      zh: "访问留言簿",
      en: "Visit the dedicated guestbook page",
    },
  },
} as const;

export default function Home() {
  const { language } = useLanguage();

const previewLimit = 4;

  return (
    <div className="flex flex-col gap-16">
      <Hero />

      <NowCard />

      <Section
        id="life"
        title={sectionCopy.life.title[language]}
        description={sectionCopy.life.description[language]}
      >
        <LifeGrid items={lifeMoments.slice(0, previewLimit)} />
        <div className="mt-8 flex justify-end">
          <Link href="/life" data-kawaii-sound="true" className="btn-secondary">
            {sectionCopy.life.cta[language]}
          </Link>
        </div>
      </Section>

      <Section
        id="skills"
        title={sectionCopy.skills.title[language]}
        description={sectionCopy.skills.description[language]}
      >
        <SkillsShowcase categories={skills.slice(0, previewLimit)} />
        <div className="mt-8 flex justify-end">
          <Link href="/skills" data-kawaii-sound="true" className="btn-secondary">
            {sectionCopy.skills.cta[language]}
          </Link>
        </div>
      </Section>

      <Section
        id="interests"
        title={sectionCopy.interests.title[language]}
        description={sectionCopy.interests.description[language]}
      >
        <InterestGallery interests={interests.slice(0, previewLimit)} />
        <div className="mt-8 flex justify-end">
          <Link href="/interests" data-kawaii-sound="true" className="btn-secondary">
            {sectionCopy.interests.cta[language]}
          </Link>
        </div>
      </Section>

      <Section
        id="thoughts"
        title={sectionCopy.thoughts.title[language]}
        description={sectionCopy.thoughts.description[language]}
      >
        <Inspiration thoughts={thoughts} />
        <div className="mt-8 flex justify-end">
          <Link href="/thoughts" data-kawaii-sound="true" className="btn-secondary">
            {sectionCopy.thoughts.cta[language]}
          </Link>
        </div>
      </Section>

      <Section
        id="guestbook"
        title={sectionCopy.guestbook.title[language]}
        description={sectionCopy.guestbook.description[language]}
      >
        <Guestbook />
        <div className="mt-8 flex justify-end">
          <Link href="/guestbook" data-kawaii-sound="true" className="btn-secondary">
            {sectionCopy.guestbook.cta[language]}
          </Link>
        </div>
      </Section>
    </div>
  );
}
