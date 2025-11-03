import { SkillsPageContent } from "@/components/page-sections/SkillsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Map | Hi~ o(*￣▽￣*)ノ I'm Steinsgo!",
  description: "The evolving craft stack, ready to sprinkle sparkle on every project.",
};

export default function SkillsPage() {
  return <SkillsPageContent />;
}
