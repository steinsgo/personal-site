import { ThoughtsPageContent } from "@/components/page-sections/ThoughtsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Idea Log | Hi~ o(￣▽￣)ブ I‘m Steinsgo ！",
  description: "Field notes of reflections and daydreams, ready to shuffle on demand.",
};

export default function ThoughtsPage() {
  return <ThoughtsPageContent />;
}
