import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteProviders } from "@/lib/site-context";
import { StatsRibbon } from "@/components/StatsRibbon";
import { KawaiiSoundBinder } from "@/components/KawaiiSoundBinder";
import { MagicPopup } from "@/components/MagicPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hi~ o(*￣▽￣*)ブ I'm Steinsgo!",
  description:
    "A bubbly haven for Steinsgo's adventures, skills, fandoms, and cozy experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-root-pattern antialiased text-balance`}
      >
        <SiteProviders>
          <KawaiiSoundBinder />
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-5 pb-16 pt-6 md:px-10 lg:px-16">
            <SiteHeader />
            <StatsRibbon />
            <main className="grow">{children}</main>
            <SiteFooter />
          </div>
          <MagicPopup />
        </SiteProviders>
      </body>
    </html>
  );
}
