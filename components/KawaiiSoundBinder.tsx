'use client';

import { useEffect, useRef } from "react";

export function KawaiiSoundBinder() {
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const play = () => {
      let context = contextRef.current;
      if (!context) {
        context = new AudioContext();
        contextRef.current = context;
      }
      if (context.state === "suspended") {
        void context.resume();
      }
      const osc = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.18);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      osc.connect(gain).connect(context.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    };

    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-kawaii-sound]");
      if (!el) return;
      play();
    };

    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return null;
}
