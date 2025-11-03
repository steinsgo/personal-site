'use client';

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/site-context";

const STORAGE_KEY = "personal-site-guestbook";
const MAX_ENTRIES = 50;
const MAX_REPLIES = 10;

type GuestbookReply = {
  id: string;
  from: string;
  message: string;
  createdAt: string;
};

type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  replies: GuestbookReply[];
};

type ReplyDraft = {
  name: string;
  message: string;
};

function createId() {
  try {
    return crypto.randomUUID();
  } catch (error) {
    return `gb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

export function Guestbook() {
  const { language } = useLanguage();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, ReplyDraft>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const normalised = parsed
          .filter((item): item is GuestbookEntry => {
            return (
              item &&
              typeof item.name === "string" &&
              typeof item.message === "string" &&
              typeof item.createdAt === "string"
            );
          })
          .map((item) => ({
            id: typeof item.id === "string" ? item.id : createId(),
            name: item.name,
            message: item.message,
            createdAt: item.createdAt,
            replies: Array.isArray(item.replies)
              ? item.replies
                  .filter((reply) =>
                    reply &&
                    typeof reply.id === "string" &&
                    typeof reply.from === "string" &&
                    typeof reply.message === "string" &&
                    typeof reply.createdAt === "string"
                  )
              : [],
          }));
        setEntries(normalised.slice(0, MAX_ENTRIES));
      }
    } catch (err) {
      console.warn("Failed to read guestbook entries:", err);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (err) {
      console.warn("Failed to persist guestbook entries:", err);
    }
  }, [entries]);

  const isSubmitDisabled = useMemo(
    () => name.trim().length === 0 || message.trim().length === 0,
    [name, message],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextName = name.trim();
    const nextMessage = message.trim();

    if (!nextName || !nextMessage) {
      setError(
        language === "zh"
          ? "先写下昵称和想说的悄悄话嘛～"
          : "Please fill in both fields before submitting.",
      );
      return;
    }

    const entry: GuestbookEntry = {
      id: createId(),
      name: nextName,
      message: nextMessage.slice(0, 300),
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setEntries((prev) => [entry, ...prev].slice(0, MAX_ENTRIES));
    setName("");
    setMessage("");
    setError(null);
  };

  const handleReplyChange = (entryId: string, field: keyof ReplyDraft, value: string) => {
    setReplyDrafts((prev) => ({
      ...prev,
      [entryId]: {
        name: field === "name" ? value : prev[entryId]?.name ?? "",
        message: field === "message" ? value : prev[entryId]?.message ?? "",
      },
    }));
  };

  const handleReplySubmit = (entryId: string) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id !== entryId) return entry;
        const draft = replyDrafts[entryId];
        const replyName = draft?.name?.trim();
        const replyMessage = draft?.message?.trim();
        if (!replyName || !replyMessage) {
          return entry;
        }
        const reply: GuestbookReply = {
          id: createId(),
          from: replyName,
          message: replyMessage.slice(0, 240),
          createdAt: new Date().toISOString(),
        };
        const nextReplies = [reply, ...entry.replies].slice(0, MAX_REPLIES);
        return {
          ...entry,
          replies: nextReplies,
        };
      }),
    );
    setReplyDrafts((prev) => ({
      ...prev,
      [entryId]: { name: "", message: "" },
    }));
  };

  const placeholderName = language === "zh" ? "怎么称呼你比较萌？" : "What should I call you?";
  const placeholderMessage =
    language === "zh"
      ? "分享今天的小故事、喜欢的番剧或对站子的建议吧～"
      : "Share a story, an idea, or anything sweet for future visitors.";

  return (
    <div className="card-frosted flex flex-col gap-6 p-6 text-slate-800 dark:text-white/80">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2 sm:grid-cols-[240px,1fr]">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-white/70">
            {language === "zh" ? "昵称" : "Name"}
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={placeholderName}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 dark:border-white/20 dark:bg-white/10 dark:text-white/80"
              maxLength={20}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-white/70">
            {language === "zh" ? "留言" : "Message"}
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={placeholderMessage}
              className="h-28 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 dark:border-white/20 dark:bg-white/10 dark:text-white/80"
              maxLength={300}
              required
            />
          </label>
        </div>
        {error ? <p className="text-sm text-rose-500">{error}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button type="submit" data-kawaii-sound="true" className="btn-primary" disabled={isSubmitDisabled}>
            {language === "zh" ? "发送小纸条 (´｡• ᵕ •｡`)" : "Post message (´｡• ᵕ •｡`)"}
          </button>
          <button
            type="button"
            data-kawaii-sound="true" className="btn-secondary"
            onClick={() => {
              setName("");
              setMessage("");
              setError(null);
            }}
          >
            {language === "zh" ? "清空重写" : "Clear form"}
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {entries.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-white/60">
            {language === "zh"
              ? "还没有小纸条，快来当第一位撒花的访客吧～"
              : "No entries yet. Leave the first sparkly note!"}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {entries.map((entry) => {
              const replyDraft = replyDrafts[entry.id] ?? { name: "", message: "" };
              return (
                <li
                  key={entry.id}
                  className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-[0_18px_45px_-35px_rgba(236,72,153,0.45)] dark:border-white/20 dark:bg-white/10"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-slate-800 dark:text-white">{entry.name}</span>
                      <time className="text-xs uppercase tracking-[0.28em] text-slate-400 dark:text-white/40">
                        {new Date(entry.createdAt).toLocaleDateString(
                          language === "zh" ? "zh-CN" : "en-CA",
                        )}
                      </time>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
                      {entry.message}
                    </p>
                    {entry.replies.length > 0 ? (
                      <div className="flex flex-col gap-2 rounded-2xl border border-white/60 bg-white/70 p-3 text-xs text-slate-600 shadow-inner dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                        {entry.replies.map((reply) => (
                          <div key={reply.id} className="flex flex-col gap-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-slate-800 dark:text-white">
                                {reply.from}
                              </span>
                              <time className="text-[10px] uppercase tracking-[0.32em] text-slate-400 dark:text-white/40">
                                {new Date(reply.createdAt).toLocaleDateString(
                                  language === "zh" ? "zh-CN" : "en-CA",
                                )}
                              </time>
                            </div>
                            <p>{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-pink-200/70 bg-pink-50/60 p-3 text-xs dark:border-pink-300/40 dark:bg-white/10 dark:text-white/80">
                      <p className="font-semibold text-pink-600 dark:text-pink-200">
                        {language === "zh"
                          ? "想回复这条留言吗？留下你的名字吧 (づ｡◕‿‿◕｡)づ"
                          : "Want to reply? Drop your name and a hug (づ｡◕‿‿◕｡)づ"}
                      </p>
                      <div className="grid gap-2 sm:grid-cols-[160px,1fr]">
                        <input
                          type="text"
                          value={replyDraft.name}
                          onChange={(event) => handleReplyChange(entry.id, "name", event.target.value)}
                          placeholder={language === "zh" ? "昵称 / Name" : "Name"}
                          className="rounded-xl border border-white/60 bg-white px-3 py-2 text-slate-700 shadow-inner focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 dark:border-white/20 dark:bg-white/10 dark:text-white/80"
                          maxLength={18}
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={replyDraft.message}
                            onChange={(event) => handleReplyChange(entry.id, "message", event.target.value)}
                            placeholder={language === "zh" ? "回复内容" : "Your reply"}
                            className="flex-1 rounded-xl border border-white/60 bg-white px-3 py-2 text-slate-700 shadow-inner focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 dark:border-white/20 dark:bg-white/10 dark:text-white/80"
                            maxLength={240}
                          />
                          <button
                            type="button"
                            onClick={() => handleReplySubmit(entry.id)}
                            data-kawaii-sound="true" className="rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_28px_-18px_rgba(236,72,153,0.6)] transition hover:-translate-y-0.5"
                          >
                            {language === "zh" ? "回复" : "Reply"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
