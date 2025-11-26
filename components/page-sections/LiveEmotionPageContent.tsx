'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/site-context';
import s from './live.module.css';

type EmoTop   = { label: string; prob: number };
type FaceRes  = { bbox: number[]; label: string; prob: number; top3: EmoTop[] };
type ApiRes   = { num_faces: number; results: FaceRes[] };
type CamDev   = { deviceId: string; label: string };

const copy = {
  badge:    { zh: 'Emotion Lab', en: 'Emotion Lab' },
  heading:  { zh: '实时表情识别', en: 'Live Facial Expression' },
  desc:     { zh: '点击开始授权摄像头，按设定帧率抽帧到后端推理并在视频上叠加检测框。', en: 'Grant camera access; we sample frames to the backend and draw results.' },
  start:    { zh: '开始', en: 'Start' },
  stop:     { zh: '停止', en: 'Stop' },
  device:   { zh: '摄像头', en: 'Camera' },
  fps:      { zh: 'FPS', en: 'FPS' },
  note:     { zh: '说明：仅用于本地演示；帧经 /api/emotion 代理到 FastAPI，本机处理。', en: 'Note: local demo only; frames go to /api/emotion (FastAPI) and are processed locally.' },
} as const;

export default function LiveEmotionPageContent() {
  const { language } = useLanguage();

  const videoRef   = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const captureRef = useRef<HTMLCanvasElement | null>(null);

  const timerRef   = useRef<number | null>(null);
  const inFlight   = useRef<boolean>(false);

  const [running, setRunning] = useState(false);
  const [fps, setFps] = useState(4);
  const [err, setErr] = useState<string | null>(null);
  const [devices, setDevices] = useState<CamDev[]>([]);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  // 列出摄像头设备
  const refreshDevices = async () => {
    // 如果还没授权，先做一次最小化的 getUserMedia 来触发授权
  try {
    // 已有流就不重复触发授权
    const hasStream = !!(videoRef.current?.srcObject as MediaStream | null);
    if (!hasStream) {
      const tmp = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      tmp.getTracks().forEach(t => t.stop());
    }
  } catch {
    // 用户拒绝也无妨，之后 start() 会再处理
  }
    const list = await navigator.mediaDevices.enumerateDevices();
    const cams = list.filter(d => d.kind === 'videoinput')
                     .map((d, i) => ({ deviceId: d.deviceId, label: d.label || `Camera ${i+1}` }));
    setDevices(cams);
    if (!deviceId && cams[0]) setDeviceId(cams[0].deviceId);
  };

  // 启动/停止
    const start = async () => {
    try {
      setErr(null);
      await refreshDevices();
      const v = videoRef.current!;
    // 约束优先级：选中的 deviceId → facingMode:user → 任意可用
    const chosenId = (deviceId && deviceId !== 'default' && deviceId !== '') ? deviceId : undefined;

    const tryOnce = (c: MediaStreamConstraints) =>
      navigator.mediaDevices.getUserMedia(c);

    let stream: MediaStream | null = null;
    try {
      if (chosenId) {
        stream = await tryOnce({ video: { deviceId: { exact: chosenId }, width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
      }
    } catch (e) {
      // ignore, fallback below
    }
    if (!stream) {
      try {
        stream = await tryOnce({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
      } catch (e) {
        // ignore, fallback below
      }
    }
    if (!stream) {
      // 最宽松：只要有视频就行
      stream = await tryOnce({ video: true, audio: false });
    }

    v.srcObject = stream;
    await v.play();
    setRunning(true);
    startLoop();
    setErr(null);
  } catch (e: any) {
    setErr(`无法获取摄像头：${e?.name || ''} ${e?.message || e}`);
    setRunning(false);
  }
};
    // 下拉切换设备
    const onDeviceChange = async (id: string) => {
    setDeviceId(id);
    if (running) {
    stop();
    // 给浏览器一点时间释放上一个流
    setTimeout(() => { start(); }, 150);
  }
};

  const stop = () => {
    setRunning(false);
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    const v = videoRef.current;
    const s = v?.srcObject as MediaStream | null;
    s?.getTracks().forEach(t => t.stop());
    if (v) v.srcObject = null;
    const ctx = overlayRef.current?.getContext('2d');
    if (ctx && overlayRef.current) ctx.clearRect(0,0,overlayRef.current.width, overlayRef.current.height);
  };

  // 抓帧 → /api/emotion → 画框
  const tick = async () => {
    if (!running || inFlight.current) return;
    const v = videoRef.current, cap = captureRef.current, ov = overlayRef.current;
    if (!v || !cap || !ov || v.readyState < 2) return;

    // 限制尺寸与压缩质量
    const w = v.videoWidth, h = v.videoHeight;
    const targetW = 640, scale = targetW / w;
    const cw = Math.round(targetW), ch = Math.round(h * scale);

    cap.width = cw; cap.height = ch;
    const cctx = cap.getContext('2d')!;
    cctx.drawImage(v, 0, 0, cw, ch);

    inFlight.current = true;
    cap.toBlob(async (blob) => {
      try {
        if (!blob) throw new Error('toBlob failed');
        const fd = new FormData(); fd.append('file', blob, 'frame.jpg');
        const r = await fetch('/api/emotion', { method: 'POST', body: fd });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j: ApiRes = await r.json();
        drawOverlay(j);
      } catch (e: any) {
        setErr(`推理失败：${e?.message ?? e}`);
      } finally {
        inFlight.current = false;
      }
    }, 'image/jpeg', 0.7);
  };

  const startLoop = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    const interval = Math.max(1000 / fps, 80);
    timerRef.current = window.setInterval(tick, interval);
  };

  useEffect(() => { if (running) startLoop(); }, [fps]); // 调整 FPS 重新节流
  useEffect(() => () => stop(), []); // 卸载清理

  // 画叠加
  const drawOverlay = (res: ApiRes) => {
    const v = videoRef.current!, ov = overlayRef.current!;
    const dpr = window.devicePixelRatio || 1;

    const displayW = v.clientWidth || v.videoWidth;
    const displayH = v.clientHeight || v.videoHeight;

    ov.style.width = `${displayW}px`;
    ov.style.height = `${displayH}px`;
    ov.width = Math.round(displayW * dpr);
    ov.height = Math.round(displayH * dpr);

    const ctx = ov.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, displayW, displayH);
    ctx.lineWidth = 2;
    ctx.font = '14px ui-sans-serif, system-ui';

    const sx = displayW / v.videoWidth;
    const sy = displayH / v.videoHeight;

    res.results.forEach(f => {
      const [x1,y1,x2,y2] = f.bbox;
      const rx = x1*sx, ry = y1*sy, rw = (x2-x1)*sx, rh = (y2-y1)*sy;

      ctx.strokeStyle = '#22aaff';
      ctx.fillStyle   = 'rgba(34,170,255,0.16)';
      ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.stroke(); ctx.fill();

      const text = `${f.label} ${(f.prob*100).toFixed(1)}%`;
      const pad = 6, th = 22, tw = ctx.measureText(text).width + pad*2;
      const tx = rx, ty = Math.max(ry - th, 0);
      ctx.fillStyle = '#22aaff'; ctx.fillRect(tx, ty, tw, th);
      ctx.fillStyle = '#fff';    ctx.fillText(text, tx + pad, ty + 16);
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-[36px] border border-white/40 kawaii-surface px-10 py-14 text-slate-800 dark:text-white/80 shadow-[0_50px_120px_-70px_rgba(34,170,255,0.45)] backdrop-blur dark:border-white/20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-sky-600 dark:border-sky-300/30 dark:bg-white/10 dark:text-sky-200">
          {copy.badge[language]}
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {copy.heading[language]}
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-white/70 sm:text-base">
          {copy.desc[language]}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <label className="text-sm">
            {copy.device[language]}：
            <select
              className="ml-2 rounded-lg border px-2 py-1"
              value={deviceId ?? ''}
              onChange={(e) => onDeviceChange(e.target.value)}
                onClick={refreshDevices}
                    >
              {devices.map(d => (<option key={d.deviceId} value={d.deviceId}>{d.label}</option>))}
            </select>
          </label>

          <label className="text-sm">
            {copy.fps[language]}：
            <input type="range" min={2} max={10} value={fps}
              onChange={e=>setFps(parseInt(e.target.value))}
              className="ml-2 align-middle" />
            <span className="ml-2">{fps}</span>
          </label>

          <button onClick={running ? stop : start} className="btn-primary">
            {running ? copy.stop[language] : copy.start[language]}
          </button>

          {err && <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">{err}</span>}
        </div>
      </section>

      <section>
        <div className={s.videoWrap}>
          <video ref={videoRef} playsInline muted className={s.video}/>
          <canvas ref={overlayRef} className={s.overlay}/>
          <canvas ref={captureRef} className={s.capture}/>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-white/60">{copy.note[language]}</p>
      </section>
    </div>
  );
}
