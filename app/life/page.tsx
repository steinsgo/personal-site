import { LifePageContent } from "@/components/page-sections/LifePageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life Log | Hi~ o(*￣▽￣*)ノ I'm Steinsgo!",
  description: "Life markers, big and small, mapped along the timeline that keeps my story glowing.",
};

export default function LifePage() {
  return <LifePageContent />;
}
