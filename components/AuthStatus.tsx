"use client";

import { useLanguage } from "@/lib/site-context";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Me = { id: string; username: string } | null;

type Mode = "idle" | "login";

export function AuthStatus() {
  const { language } = useLanguage();
  const [me, setMe] = useState<Me>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("idle");

  const t = (zh: string, en: string) => (language === "zh" ? zh : en);

  const refreshMe = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshMe();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setMe(null);
  };

  return (
    <>
      <div className="flex items-center gap-3 text-xs">
        {!loading && me && (
          <span className="hidden text-slate-500/80 dark:text-white/60 sm:inline">
            {t("已登录：", "Signed in as ")}
            <span className="font-semibold">{me.username}</span>
          </span>
        )}
        {me ? (
          <button
            type="button"
            className="btn-secondary px-3 py-1 text-xs"
            onClick={handleLogout}
          >
            {t("退出", "Sign out")}
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary px-4 py-1.5 text-xs"
            onClick={() => setMode("login")}
          >
            {t("注册 / 登录", "Sign up / Sign in")}
          </button>
        )}
      </div>

      <AuthDialog
        open={mode === "login"}
        onClose={() => setMode("idle")}
        onAuthed={(user) => {
          setMe(user);
          setMode("idle");
        }}
      />
    </>
  );
}

// —— 弹窗 —— //
function AuthDialog({
  open,
  onClose,
  onAuthed,
}: {
  open: boolean;
  onClose: () => void;
  onAuthed: (me: { id: string; username: string }) => void;
}) {
  const { language } = useLanguage();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const t = (zh: string, en: string) => (language === "zh" ? zh : en);

  if (!open) return null;

  const handleSubmit = async () => {
    const u = login.trim();
    const p = password.trim();
    if (u.length < 3 || u.length > 24 || p.length < 8) {
      setError(
        t("用户名 3~24 位，密码至少 8 位", "Username 3–24 chars, password ≥ 8"),
      );
      return;
    }

    setBusy(true);
    setError(null);
    setMsg(null);

    try {
      // 先尝试登录
      let res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: u, password: p }),
      });

      if (res.status === 404) {
        // 用户不存在 -> 尝试注册
        res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: u, password: p }),
        });
        if (!res.ok) {
          const payload = (await res.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(
            payload?.error ?? t("注册失败", "Registration failed"),
          );
        }
        const data = (await res.json()) as { id: string; username: string };
        setMsg(t("注册成功并已登录 ✓", "Registered & signed in ✓"));
        onAuthed(data);
        return;
      }

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? t("登录失败", "Login failed"));
      }

      const data = (await res.json()) as { id: string; username: string };
      setMsg(t("登录成功 ✓", "Signed in ✓"));
      onAuthed(data);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  // 真正的弹窗内容：全屏白色蒙层 + 中间卡片
  const content = (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      {/* 整页白色磨砂蒙层 */}
      <div
        className="absolute inset-0 bg-white/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* 弹窗卡片本体 */}
      <div className="relative z-10 w-[min(92vw,440px)] rounded-3xl border border-white/40 bg-white/95 p-5 shadow-2xl dark:border-white/30 dark:bg-slate-900/90">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {t("注册 / 登录", "Sign up / Sign in")}
          </h3>
          <button
            type="button"
            className="rounded px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 dark:text-white/60 dark:hover:bg-white/10"
            onClick={onClose}
            disabled={busy}
          >
            {t("关闭", "Close")}
          </button>
        </div>

        <div className="space-y-3">
          <label className="flex flex-col gap-2 text-sm">
            {t("用户名（3-24）", "Username (3–24)")}
            <input
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-white/10"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setError(null);
                setMsg(null);
              }}
              maxLength={24}
              disabled={busy}
              placeholder={t("怎么称呼你呀？", "What should I call you?")}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            {t("密码（至少 8 位）", "Password (≥ 8)")}
            <input
              type="password"
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-white/10"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
                setMsg(null);
              }}
              maxLength={72}
              disabled={busy}
              placeholder={t("设置你的登录密码", "Create your password")}
            />
            <span className="text-xs text-slate-400 dark:text-white/40">
              {t(
                "第一次使用这个用户名会自动注册；以后用同一密码就是登录。",
                "First time with this name? We’ll register; next time it logs you in.",
              )}
            </span>
          </label>

          {error && (
            <div className="rounded bg-rose-100 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          )}
          {msg && (
            <div className="rounded bg-emerald-100 px-3 py-2 text-sm text-emerald-700">
              {msg}
            </div>
          )}

          <div className="mt-1 flex justify-end gap-2">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={busy}
            >
              {t("取消", "Cancel")}
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
              disabled={busy}
            >
              {busy ? t("处理中…", "Working…") : t("确定", "Confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 用 Portal 把内容挂到 <body>，不再受导航栏布局影响
  if (typeof document === "undefined") {
    // SSR 时简单返回内容，客户端会用 portal 接管
    return content;
  }
  return createPortal(content, document.body);
}
