'use client';

import { useState, useRef, useEffect, type PointerEvent as ReactPointerEvent } from "react";
import { useLanguage } from "@/lib/site-context";

const easterImages = [
  {
    src: "/images/easter-1.png",
    alt: {
      zh: "小猫研究员",
      en: "Cat researcher",
    },
  },
  {
    src: "/images/easter-2.png",
    alt: {
      zh: "粉色电路板",
      en: "Pink circuit board",
    },
  },
  {
    src: "/images/easter-3.png",
    alt: {
      zh: "视觉实验截图",
      en: "Vision experiment screenshot",
    },
  },
] as const;

type Position = {
  x: number;
  y: number;
};

export function MagicPopup() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 40, y: 120 });
  const dragRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<{ offsetX: number; offsetY: number; dragging: boolean }>({
    offsetX: 0,
    offsetY: 0,
    dragging: false,
  });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!pointerRef.current.dragging) return;
      setPosition((prev) => {
        const nextX = event.clientX - pointerRef.current.offsetX;
        const nextY = event.clientY - pointerRef.current.offsetY;
        return {
          x: Math.max(20, Math.min(window.innerWidth - 320, nextX)),
          y: Math.max(80, Math.min(window.innerHeight - 260, nextY)),
        };
      });
    };

    const handlePointerUp = () => {
      pointerRef.current.dragging = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const togglePopup = () => {
    setOpen((prev) => !prev);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = dragRef.current;
    if (!element) return;
    pointerRef.current.dragging = true;
    pointerRef.current.offsetX = event.clientX - element.getBoundingClientRect().left;
    pointerRef.current.offsetY = event.clientY - element.getBoundingClientRect().top;
    element.setPointerCapture(event.pointerId);
  };

  return (
    <>
      <button
        type="button"
        data-kawaii-sound="true"
        onClick={togglePopup}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_25px_80px_-40px_rgba(236,72,153,0.75)] transition hover:-translate-y-1"
      >
        {open ? (language === "zh" ? "收起彩蛋 (•ᴗ•)✧" : "Hide easter egg (•ᴗ•)✧") : language === "zh" ? "打开彩蛋小窗 (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧" : "Open easter egg window (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"}
      </button>

      {open ? (
        <div
          ref={dragRef}
          onPointerDown={handlePointerDown}
          style={{ translate: `${position.x}px ${position.y}px` }}
          className="pointer-events-auto fixed z-40 flex w-[280px] cursor-grab flex-col gap-3 rounded-[28px] border border-white/60 kawaii-surface p-5 text-slate-700 shadow-[0_32px_90px_-60px_rgba(236,72,153,0.55)] backdrop-blur dark:border-white/30 dark:text-white"
        >
          <header className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-white/50">
                {language === "zh" ? "手动拖拽" : "Drag me"}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {language === "zh" ? "Steinsgo 的彩蛋盒" : "Steinsgo's easter box"}
              </h3>
            </div>
            <span className="text-xl">(≧◡≦)</span>
          </header>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
            {language === "zh"
              ? "这里收藏研究笔记、视觉模型小表情、还有等你来解锁的贴纸，拖到喜欢的位置慢慢看～"
              : "A bundle of research notes, vision model doodles, and stickers waiting to be explored. Drag me wherever you like!"}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {easterImages.map((image) => (
              <div key={image.src} className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-pink-200/80 kawaii-surface shadow-inner dark:border-pink-300/40 dark:bg-white/10">
                <img
                  src={image.src}
                  alt={image.alt[language]}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
          <ul className="flex flex-col gap-1 text-xs text-slate-500 dark:text-white/60">
            <li>{language === "zh" ? "Tips：图片占位图，请放入你自己的彩蛋图～" : "Tip: replace the placeholder images with your own easter-egg art."}</li>
            <li>{language === "zh" ? "双击彩蛋可以灵感截图 (ง •̀_•́)ง" : "Double-click the art to capture inspiration (ง •̀_•́)ง"}</li>
          </ul>
        </div>
      ) : null}
    </>
  );
}
