'use client';
import React, { useEffect, useRef, useState } from 'react';

type EmoTop = { label: string; prob: number };
type FaceRes = {
  bbox: number[]; label: string; prob: number;
  top3: EmoTop[]; probs: Record<string, number>;
};
type ApiRes = { num_faces: number; results: FaceRes[] };

export default function EmotionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [res, setRes] = useState<ApiRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f); setRes(null); setErr(null);
    setImgURL(f ? URL.createObjectURL(f) : null);
  };

  const onSubmit = async () => {
    if (!file) return;
    setLoading(true); setErr(null);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const r = await fetch('/api/emotion', { method: 'POST', body: fd });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json() as ApiRes;
      setRes(j);
    } catch (e: any) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  };

  // 叠加绘制
  useEffect(() => {
    const img = imgRef.current, canvas = canvasRef.current;
    if (!img || !canvas || !res) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const dw = img.clientWidth, dh = img.clientHeight;
      canvas.style.width = `${dw}px`;
      canvas.style.height = `${dh}px`;
      canvas.width = Math.round(dw * dpr);
      canvas.height = Math.round(dh * dpr);

      const ctx = canvas.getContext('2d')!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, dw, dh);
      ctx.lineWidth = 2;
      ctx.font = '14px ui-sans-serif, system-ui, -apple-system';

      const nw = img.naturalWidth, nh = img.naturalHeight;
      const sx = dw / nw, sy = dh / nh;

      res.results.forEach(f => {
        const [x1,y1,x2,y2] = f.bbox;
        const rx = x1 * sx, ry = y1 * sy, rw = (x2-x1) * sx, rh = (y2-y1) * sy;
        ctx.strokeStyle = '#00baff';
        ctx.fillStyle = 'rgba(0,186,255,0.15)';
        ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.stroke(); ctx.fill();

        const text = `${f.label} ${(f.prob*100).toFixed(1)}%`;
        const pad = 4, th = 20, tw = ctx.measureText(text).width + pad*2;
        ctx.fillStyle = '#00baff';
        ctx.fillRect(rx, Math.max(ry - th, 0), tw, th);
        ctx.fillStyle = '#fff';
        ctx.fillText(text, rx + pad, Math.max(ry - th/2 + 5, 12));
      });
    };

    if (img.complete) draw(); else img.onload = draw;
  }, [res, imgURL]);

  return (
    <div style={{maxWidth: 860, margin: '40px auto', padding: 16}}>
      <h1 style={{fontSize: 28, fontWeight: 700}}>表情识别 Demo</h1>
      <p>上传一张包含人脸的图片，展示每张脸的 Top-3 表情概率与检测框。</p>

      <input type="file" accept="image/*" onChange={onChange} />
      <button onClick={onSubmit} disabled={!file || loading}
        style={{marginLeft: 12, padding: '6px 14px', borderRadius: 8}}>
        {loading ? '分析中…' : '开始分析'}
      </button>

      <div style={{position:'relative', marginTop:16}}>
        {imgURL && (
          <>
            <img ref={imgRef} src={imgURL} alt="preview"
                 style={{maxWidth:'100%', borderRadius:8, display:'block'}} />
            <canvas ref={canvasRef}
                    style={{position:'absolute', inset:0, pointerEvents:'none', borderRadius:8}} />
          </>
        )}
      </div>

      {err && <pre style={{color:'crimson', whiteSpace:'pre-wrap'}}>{err}</pre>}

      {res && (
        <div style={{marginTop: 24}}>
          <h2>检测到人脸：{res.num_faces} 张</h2>
          {res.results.map((f, i) => (
            <div key={i} style={{border:'1px solid #ddd', padding:12, borderRadius:8, marginTop:12}}>
              <div><b>Face {i+1}</b> — 预测：{f.label}（{(f.prob*100).toFixed(1)}%）</div>
              <div style={{marginTop:8}}>
                {f.top3.map(t => (
                  <div key={t.label} style={{display:'flex', alignItems:'center', gap:8}}>
                    <div style={{width:90}}>{t.label}</div>
                    <div style={{flex:1, background:'#eee', borderRadius:6}}>
                      <div style={{width:`${(t.prob*100).toFixed(1)}%`, height:12, borderRadius:6, background:'#666'}}/>
                    </div>
                    <div style={{width:56, textAlign:'right'}}>{(t.prob*100).toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
