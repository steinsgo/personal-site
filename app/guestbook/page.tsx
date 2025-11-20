import { GuestbookPageContent } from "@/components/page-sections/GuestbookPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guestbook | Hi~ o(*￣▽￣*)o I'm Steinsgo!",
  description: "Leave a story, idea, or greeting to help this place grow warmer.",
};

export default function GuestbookPage() {
  return <GuestbookPageContent />;
}
