"use client";

import { useLanguage } from "@/lib/site-context";
import { FormEvent, useEffect, useMemo, useState } from "react";

const MAX_ENTRIES = 50;

type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  isAnonymous: boolean;
  authorPublicId: string | null;
  replies: any[]; // 先不展示回复，预留字段避免崩溃
};

type Me = { id: string; username: string } | null;

const anonymousLabels = {
  zh: {
    displayName: "匿名访客",
    badge: "匿名",
  },
  en: {
    displayName: "Secret Mochi",
    badge: "Anon",
  },
} as const;

export function Guestbook() {
  const { language } = useLanguage();
  const [me, setMe] = useState<Me>(null);

  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [message, setMessage] = useState("");
  const [postAsAnonymous, setPostAsAnonymous] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const t = (zh: string, en: string) => (language === "zh" ? zh : en);
  const anonymousLabel = anonymousLabels[language];

  // 读取当前登录状态
  useEffect(() => {
    async function loadMe() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data = (await res.json()) as { id: string | null; username?: string };
        if (data.id) {
          setMe({ id: data.id, username: data.username ?? "user" });
        } else {
          setMe(null);
        }
      } catch {
        setMe(null);
      }
    }
    void loadMe();
  }, []);

  // 加载留言列表
  useEffect(() => {
    let cancelled = false;

    async function loadEntries() {
      setIsLoading(true);
      setLoadError(false);
      try {
        const res = await fetch("/api/guestbook", { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = (await res.json()) as GuestbookEntry[];
        if (!cancelled) {
          const normalized = data
            .slice(0, MAX_ENTRIES)
            .map((e) => ({
              ...e,
              replies: Array.isArray(e.replies) ? e.replies : [],
            }));
          setEntries(normalized);
        }
      } catch (err) {
        console.error("load guestbook failed", err);
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadEntries();
    return () => {
      cancelled = true;
    };
  }, []);

  const isSubmitDisabled = useMemo(() => {
    if (isSubmitting) return true;
    return !message.trim();
  }, [isSubmitting, message]);

  const resetComposer = () => {
    setMessage("");
    setPostAsAnonymous(false);
    setFormError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = message.trim();
    if (!text) {
      setFormError(
        t("留言内容也要写满满噢 (ฅ´ω`ฅ)", "Please add your message before posting. (ฅ´ω`ฅ)"),
      );
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          anonymous: postAsAnonymous,
        }),
      });

      if (res.status === 401) {
        setFormError(
          t(
            "还没有登录哦，请先右上角【注册 / 登录】再来留言～",
            "You’re not signed in yet. Use the top-right sign-in first.",
          ),
        );
        return;
      }

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        setFormError(
          payload?.error ??
            t("留言暂时没有发出去，再点一次看看吧 (。>﹏<。)", "Couldn't post right now. Try again in a moment? (。>﹏<。)"),
        );
        return;
      }

      const created = (await res.json()) as GuestbookEntry;
      const normalized = {
        ...created,
        replies: Array.isArray(created.replies) ? created.replies : [],
      };
      setEntries((prev) => [normalized, ...prev].slice(0, MAX_ENTRIES));
      resetComposer();
    } catch (error) {
      console.error("submit guestbook failed", error);
      setFormError(
        t("网络魔法失败了，再按一次按钮看看 (。>﹏<。)", "Network hiccup. Please try sending again! (。>﹏<。)"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const placeholderMessage =
    language === "zh"
      ? "写下想对未来的我或路过的小伙伴说的话吧～"
      : "Share a story, a thought, or a sprinkle of encouragement for future visitors.";

  return (
    <div className="kawaii-surface flex flex-col gap-6 p-6 text-slate-800 dark:text-white/80">
      {/* 顶部：登录状态提示（真正的登录按钮在右上角 Header 里） */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-white/60">
        {me ? (
          <span>
            {t("当前已登录：", "Signed in as ")}
            <span className="font-semibold">{me.username}</span>
          </span>
        ) : (
          <span>
            {t(
              "还没有登录～ 在右上角点击【注册 / 登录】后，就可以在这里留下你的痕迹啦。",
              "Not signed in yet. Use the top-right sign-in to leave your note here.",
            )}
          </span>
        )}
        {postAsAnonymous && (
          <span className="ml-2 rounded-full bg-pink-100/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-500 dark:bg-pink-400/20 dark:text-pink-200">
            {anonymousLabel.badge}
          </span>
        )}
      </div>

      {/* 留言表单 */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-[260px,1fr]">
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-white/70">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-pink-400 focus:ring-pink-200 dark:border-white/40 dark:bg-white/10"
                checked={postAsAnonymous}
                onChange={(event) => {
                  setPostAsAnonymous(event.target.checked);
                }}
                disabled={isSubmitting}
              />
              {language === "zh"
                ? "我要低调，以匿名身份亮相 ✧(≖ ◡ ≖✿)"
                : "Post as an anonymous mochi ✧(≖ ◡ ≖✿)"}
            </label>
          </div>
          <label className="flex h-full flex-col gap-2 text-sm font-medium text-slate-600 dark:text-white/70">
            {language === "zh" ? "留言" : "Message"}
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                if (formError) setFormError(null);
              }}
              placeholder={placeholderMessage}
              className="h-full min-h-[180px] rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/20 dark:bg-white/10 dark:text-white/80"
              maxLength={500}
              required
              disabled={isSubmitting}
            />
          </label>
        </div>
        {formError ? <p className="text-sm text-rose-500">{formError}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            data-kawaii-sound="true"
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitDisabled}
            aria-busy={isSubmitting}
          >
            {language === "zh" ? "发布留言 (ฅ´ω`ฅ)" : "Post message (ฅ´ω`ฅ)"}
          </button>
          <button
            type="button"
            data-kawaii-sound="true"
            className="btn-secondary"
            onClick={resetComposer}
            disabled={isSubmitting}
          >
            {language === "zh" ? "重新打草稿" : "Clear form"}
          </button>
        </div>
      </form>

      {/* 列表区域 */}
      {loadError ? (
        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/80 p-3 text-sm text-rose-600 shadow-inner dark:border-rose-300/30 dark:bg-rose-200/10 dark:text-rose-200">
          {t(
            "留言板有点害羞，稍后再刷新试试看 (╥﹏╥)",
            "Guestbook is feeling shy. Try refreshing in a bit (╥﹏╥)",
          )}
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <p className="text-sm text-slate-500 dark:text-white/60">
            {t("少女正在整理过往的留言中……", "Gathering sparkly notes...")}
          </p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-white/60">
            {t("还没有留言，成为第一位撒花的小伙伴吧！", "No entries yet. Leave the first sparkly note!")}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_45px_-35px_rgba(236,72,153,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_55px_-36px_rgba(236,72,153,0.6)] dark:border-white/20 dark:bg-white/10"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-semibold text-slate-800 dark:text-white">
                        {entry.name}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-white/40">
                        <time className="uppercase tracking-[0.28em]">
                          {new Date(entry.createdAt).toLocaleDateString(
                            language === "zh" ? "zh-CN" : "en-CA",
                          )}
                        </time>
                        {entry.isAnonymous ? (
                          <span className="rounded-full bg-pink-100/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-500 dark:bg-pink-400/20 dark:text-pink-200">
                            {anonymousLabel.badge}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
                    {entry.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
