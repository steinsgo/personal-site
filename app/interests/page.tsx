import { InterestsPageContent } from "@/components/page-sections/InterestsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interest Lab | Hi~ o(*￣▽￣*)o I'm Steinsgo!",
  description: "Curated sparks, tiny experiments, and playground projects that keep curiosity glowing.",
};

export default function InterestsPage() {
  return <InterestsPageContent />;
}
