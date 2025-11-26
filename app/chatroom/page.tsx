"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Room = {
  id: string;
  name: string;
  tag: string | null;
  createdBy: string;
  messageCount: number;
  last: null | { kind: string; text: string | null; createdAt: string };
};

export default function ChatroomListPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const r = await fetch("/api/chat/rooms", { cache: "no-store" });
    const data = (await r.json()) as Room[];
    setRooms(data);
  };

  useEffect(() => { void load(); }, []);

  const create = async () => {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/chat/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tag }),
      });
      if (res.status === 401) throw new Error("请先登录（右上角）");
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "创建失败");
      setName(""); setTag("");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="kawaii-surface flex flex-col gap-6 p-6 text-slate-800 dark:text-white/80">
      <div className="rounded-3xl border border-white/30 bg-white/70 p-5 shadow-sm backdrop-blur dark:bg-white/10">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold">创建聊天室</div>
            <input
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-white/10"
              placeholder="房间名（2-40）"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={busy}
              maxLength={40}
            />
          </div>
          <input
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-white/10"
            placeholder="标签（可选）"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            disabled={busy}
            maxLength={20}
          />
          <button className="btn-primary px-4 py-2 text-sm" onClick={create} disabled={busy}>
            {busy ? "创建中…" : "创建"}
          </button>
          {err ? <span className="text-sm text-rose-500">{err}</span> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rooms.map((r) => (
          <Link
            key={r.id}
            href={`/chatroom/${r.id}`}
            className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-[0_18px_45px_-35px_rgba(236,72,153,0.35)] transition hover:-translate-y-0.5 dark:border-white/20 dark:bg-white/10"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-base font-semibold">{r.name}</div>
              <div className="text-xs text-slate-500 dark:text-white/50">{r.messageCount} msgs</div>
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-white/50">
              {r.tag ? `#${r.tag} · ` : ""}by {r.createdBy}
            </div>
            <div className="mt-3 text-sm text-slate-600 dark:text-white/70">
              {r.last ? (r.last.kind === "image" ? "🖼️ [image]" : r.last.text) : "还没有消息，来当第一个发言的人。"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
