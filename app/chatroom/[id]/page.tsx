"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Msg = {
  id: string;
  roomId: string;
  kind: "text" | "image";
  text: string | null;
  imageUrl: string | null;
  createdAt: string;
  user: { username: string };
};

export default function ChatroomPage() {

  const params = useParams<{ id: string }>();
  const roomId = useMemo(() => params?.id ?? "", [params]); 
  const [items, setItems] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const afterRef = useRef(0);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const lastTs = useMemo(() => {
    const last = items[items.length - 1];
    return last ? new Date(last.createdAt).getTime() : 0;
  }, [items]);

  // 初次加载历史
 useEffect(() => {
  if (!roomId) return;

  (async () => {
    const r = await fetch(`/api/chat/messages?roomId=${encodeURIComponent(roomId)}`, {
      cache: "no-store",
    });
    const data = (await r.json()) as Msg[];
    setItems(data);

    const last = data[data.length - 1];
    afterRef.current = last ? new Date(last.createdAt).getTime() : 0;
  })().catch(() => {});
}, [roomId]);


  // SSE 实时订阅
 useEffect(() => {
  if (!roomId) return;

  const es = new EventSource(
    `/api/chat/stream?roomId=${encodeURIComponent(roomId)}&after=${afterRef.current}`,
  );

  const onMsg = (ev: MessageEvent) => {
    const raw = String(ev.data ?? "").trim();
    if (!raw) return;

    try {
      const m = JSON.parse(raw) as Msg;
      afterRef.current = Math.max(afterRef.current, new Date(m.createdAt).getTime());
      setItems((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
    } catch {
      // 忽略 ping/坏数据
    }
  };

  es.addEventListener("message", onMsg);
  return () => {
    es.removeEventListener("message", onMsg);
    es.close();
  };
}, [roomId]);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [items.length]);

 const send = async () => {
  setBusy(true);
  setErr(null);
  try {
    let kind: "text" | "image" = "text";
    let finalText = text.trim();
    let finalImageUrl: string | undefined = undefined;

    if (file) {
      kind = "image";
      setUploading(true);

      const fd = new FormData();
      fd.append("file", file);

      const up = await fetch("/api/upload", { method: "POST", body: fd });
      if (up.status === 401) throw new Error("请先登录（右上角）");
      if (!up.ok) throw new Error((await up.json().catch(() => null))?.error ?? "上传失败");

      const { url } = (await up.json()) as { url: string };
      finalImageUrl = url;
    } else {
      if (!finalText) throw new Error("请输入消息或选择图片");
    }

    const res = await fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId,
        kind,
        text: kind === "text" ? finalText : undefined,
        imageUrl: kind === "image" ? finalImageUrl : undefined,
      }),
    });

    if (res.status === 401) throw new Error("请先登录（右上角）");
    if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "发送失败");

    const created = (await res.json()) as Msg;
    afterRef.current = Math.max(afterRef.current, new Date(created.createdAt).getTime());
    setItems((prev) => (prev.some((x) => x.id === created.id) ? prev : [...prev, created]));

    setText("");
    setFile(null);
  } catch (e: any) {
    setErr(e?.message ?? String(e));
  } finally {
    setUploading(false);
    setBusy(false);
  }
};


  return (
    <div className="kawaii-surface flex h-[calc(100vh-120px)] flex-col gap-4 p-6 text-slate-800 dark:text-white/80">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Chatroom</div>
        <a className="btn-secondary px-3 py-1 text-xs" href="/chatroom">← Rooms</a>
      </div>

      <div className="flex-1 overflow-y-auto rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-inner dark:border-white/20 dark:bg-white/5">
        <div className="flex flex-col gap-3">
          {items.map((m) => (
            <div key={m.id} className="rounded-2xl bg-white/80 p-3 dark:bg-white/10">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-white/50">
                <span className="font-semibold text-slate-700 dark:text-white/80">{m.user.username}</span>
                <span>{new Date(m.createdAt).toLocaleString()}</span>
              </div>
              {m.kind === "image" && m.imageUrl ? (
                <img src={m.imageUrl} alt="img" className="mt-2 max-h-72 w-auto rounded-2xl border border-white/40" />
              ) : (
                <div className="mt-2 text-sm text-slate-700 dark:text-white/80">{m.text}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {err ? <div className="text-sm text-rose-500">{err}</div> : null}

      <div className="rounded-3xl border border-white/30 bg-white/70 p-4 backdrop-blur dark:bg-white/10">
        <div className="grid gap-2 md:grid-cols-[1fr,320px,auto]">
          <input
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-white/10"
            placeholder="输入消息…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={busy}
          />
          <input
                type="file"
                     accept="image/*"
                          className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-white/10"
                          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            disabled={busy || uploading}
                    />

          <button className="btn-primary px-4 py-2 text-sm" onClick={send} disabled={busy || uploading}>
             {uploading ? "上传中…" : busy ? "发送中…" : "发送"}
              </button>
        </div>
        <div className="mt-2 text-xs text-slate-500 dark:text-white/50">
          登录后才能发言；SSE 会自动重连（线上连接到时限会被重置，这属于正常现象）
        </div>
      </div>
    </div>
  );
}
