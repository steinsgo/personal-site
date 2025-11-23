import type { Metadata } from "next";
import EmotionPageContent from "@/components/page-sections/EmotionPageContent";

export const metadata: Metadata = {
  title: "Emotion | Steinsgo",
  description: "Upload an image to detect faces and estimate facial expressions.",
};

export default function EmotionPage() {
  return <EmotionPageContent />;
}
