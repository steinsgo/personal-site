'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/lib/site-context';
import s from './emotion.module.css';

type EmoTop = { label: string; prob: number };
type FaceRes = { bbox: number[]; label: string; prob: number; top3: EmoTop[]; probs: Record<string, number>; };
type ApiRes = { num_faces: number; results: FaceRes[] };

const copy = {
  badge: { zh: 'Emotion Lab', en: 'Emotion Lab' },
  heading: { zh: '表情识别', en: 'Facial Expression' },
  desc: {
    zh: '上传一张含人脸的图片，我们返回每张脸的 Top-3 概率并在图上叠加检测框。',
    en: 'Upload a face image. We return Top-3 probabilities per face and draw boxes.'
  },
  action: { zh: '开始分析', en: 'Analyze' },
  download: { zh: '下载带框图片', en: 'Download annotated' },
  reset: { zh: '重置', en: 'Reset' },
  none: { zh: '未检测到人脸', en: 'No face detected' },
  disclaimer: {
    zh: '免责声明：表情≠情绪，数值仅表示模型在该类别上的置信度。',
    en: 'Disclaimer: expressions ≠ emotions; values are model confidences only.'
  }
} as const;

export default function EmotionPageContent() {
  const { language } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [res, setRes] = useState<ApiRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);

  const tidy = useMemo(() => {
    if (!res) return null;
    return { ...res, results: res.results.map(f => ({ ...f, top3: [...f.top3].sort((a,b)=>b.prob-a.prob) })) };
  }, [res]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f); setRes(null); setErr(null);
    setImgURL(f ? URL.createObjectURL(f) : null);
  };

  const onAnalyze = async () => {
    if (!file) return;
    setLoading(true); setErr(null);
    try {
      const fd = new FormData(); fd.append('file', file);
      const r = await fetch('/api/emotion', { method: 'POST', body: fd });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setRes(await r.json());
    } catch (e:any) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  };

  const drawOverlay = () => {
    const img = imgRef.current, canvas = overlayRef.current;
    if (!img || !canvas || !res) return;
    const dpr = window.devicePixelRatio || 1;
    const dw = img.clientWidth, dh = img.clientHeight;
    canvas.style.width = `${dw}px`; canvas.style.height = `${dh}px`;
    canvas.width = Math.round(dw*dpr); canvas.height = Math.round(dh*dpr);

    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,dw,dh);
    ctx.lineWidth = 2; ctx.font = '14px ui-sans-serif, system-ui';

    const sx = dw / img.naturalWidth, sy = dh / img.naturalHeight;

    res.results.forEach(f=>{
      const [x1,y1,x2,y2] = f.bbox;
      const rx=x1*sx, ry=y1*sy, rw=(x2-x1)*sx, rh=(y2-y1)*sy;
      ctx.strokeStyle='#22aaff'; ctx.fillStyle='rgba(34,170,255,0.16)';
      ctx.beginPath(); ctx.rect(rx,ry,rw,rh); ctx.stroke(); ctx.fill();

      const text = `${f.label} ${(f.prob*100).toFixed(1)}%`;
      const pad=6, th=24, tw=ctx.measureText(text).width+pad*2;
      const tx=rx, ty=Math.max(ry-th,0);
      ctx.fillStyle='#22aaff'; ctx.fillRect(tx,ty,tw,th);
      ctx.fillStyle='#fff'; ctx.fillText(text, tx+pad, ty+16);
    });
  };

  useEffect(() => {
    if (!imgRef.current) return;
    if (imgRef.current.complete) drawOverlay(); else imgRef.current.onload = drawOverlay;
    const ro = new ResizeObserver(drawOverlay);
    const el = imgRef.current; el && ro.observe(el);
    return () => ro.disconnect();
  }, [tidy, imgURL]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDownload = () => {
    if (!imgRef.current || !res) return;
    const img = imgRef.current, c = document.createElement('canvas'), ctx = c.getContext('2d')!;
    c.width = img.naturalWidth; c.height = img.naturalHeight; ctx.drawImage(img,0,0);
    ctx.lineWidth = Math.max(2, Math.round(c.width/600));
    ctx.font = `${Math.max(14, Math.round(c.width/60))}px ui-sans-serif, system-ui`;
    res.results.forEach(f=>{
      const [x1,y1,x2,y2]=f.bbox;
      ctx.strokeStyle='#22aaff'; ctx.fillStyle='rgba(34,170,255,0.16)';
      ctx.beginPath(); ctx.rect(x1,y1,x2-x1,y2-y1); ctx.stroke(); ctx.fill();
      const text=`${f.label} ${(f.prob*100).toFixed(1)}%`, pad=6, th=Math.max(22,Math.round(c.height/40)), tw=ctx.measureText(text).width+pad*2;
      const tx=x1, ty=Math.max(y1-th,0);
      ctx.fillStyle='#22aaff'; ctx.fillRect(tx,ty,tw,th);
      ctx.fillStyle='#fff'; ctx.fillText(text, tx+pad, ty+th-6);
    });
    const a=document.createElement('a'); a.href=c.toDataURL('image/png'); a.download='emotion_annotated.png'; a.click();
  };

  const onReset = () => { setFile(null); setRes(null); setErr(null); setImgURL(null); };

  return (
    <div className="flex flex-col gap-12">
      {/* Hero 区块 —— 复用你站点的风格 */}
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
          <input type="file" accept="image/*" onChange={(e)=>onChange(e)} />
          <button onClick={onAnalyze} disabled={!file || loading} className="btn-primary">
            {loading ? '…' : copy.action[language]}
          </button>
          <button onClick={onDownload} disabled={!res} className="btn-secondary">
            {copy.download[language]}
          </button>
          <button onClick={onReset} disabled={!file && !res} className="btn-secondary">
            {copy.reset[language]}
          </button>
          {res && res.num_faces===0 && (
            <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
              {copy.none[language]}
            </span>
          )}
        </div>
      </section>

      {/* 预览 + 叠加 */}
      <section>
        <div className={s.previewWrap}>
          {imgURL && (
            <>
              <img ref={imgRef} src={imgURL} alt="preview" className={s.previewImg}/>
              <canvas ref={overlayRef} className={s.overlay}/>
            </>
          )}
        </div>

        {err && <div className="mt-3 text-rose-700 text-sm">{err}</div>}

        {tidy && (
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 dark:border-white/20 dark:bg-white/10">
              检测到人脸：<b>{tidy.num_faces}</b> 张
            </div>

            {tidy.results.map((f,i)=>(
              <div key={i} className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 dark:border-white/20 dark:bg-white/10">
                <div className="mb-2 font-semibold">Face {i+1} — 预测：{f.label}（{(f.prob*100).toFixed(1)}%）</div>
                {f.top3.map(t=>(
                  <div key={t.label} className={s.row}>
                    <div className={s.caption}>{t.label}</div>
                    <div className={s.bar}><div className={s.fill} style={{width:`${t.prob*100}%`}}/></div>
                    <div className={s.perc}>{(t.prob*100).toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            ))}
            <div className="text-xs text-slate-500 dark:text-white/60">{copy.disclaimer[language]}</div>
          </div>
        )}
      </section>
    </div>
  );
}
