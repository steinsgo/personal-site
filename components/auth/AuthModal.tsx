'use client';

import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onAuthed?: (user: { id: string; username: string }) => void;
};

export default function AuthModal({ open, onClose, onAuthed }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [login, setLogin] = useState('');       // 登录用：用户名或邮箱
  const [username, setUsername] = useState(''); // 注册用：用户名
  const [email, setEmail] = useState('');       // 注册可选
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setErr(null);
      setBusy(false);
      setPassword('');
    }
  }, [open]);

  const doLogin = async () => {
    setBusy(true); setErr(null);
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      if (!r.ok) throw new Error((await r.json())?.error || `HTTP ${r.status}`);
      const u = await r.json();
      onAuthed?.(u);
      onClose();
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  const doRegister = async () => {
    setBusy(true); setErr(null);
    try {
      const r = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email: email || undefined, password }),
      });
      if (!r.ok) throw new Error((await r.json())?.error || `HTTP ${r.status}`);
      const u = await r.json();
      onAuthed?.(u);
      onClose();
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="w-[min(92vw,460px)] rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{mode === 'login' ? '登录' : '注册'}</h2>
          <button onClick={onClose} className="rounded px-2 py-1 text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">关闭</button>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            className={`rounded px-3 py-1 text-sm ${mode === 'login' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800'}`}
            onClick={() => setMode('login')}
          >登录</button>
          <button
            className={`rounded px-3 py-1 text-sm ${mode === 'register' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800'}`}
            onClick={() => setMode('register')}
          >注册</button>
        </div>

        {mode === 'login' ? (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm">用户名或邮箱</label>
              <input className="w-full rounded border px-3 py-2" value={login} onChange={e=>setLogin(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm">密码</label>
              <input className="w-full rounded border px-3 py-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            {err && <div className="rounded bg-rose-100 px-3 py-2 text-sm text-rose-700">{err}</div>}
            <button
              className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
              disabled={busy || !login || !password}
              onClick={doLogin}
            >{busy ? '登录中…' : '登录'}</button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm">用户名（3-24）</label>
              <input className="w-full rounded border px-3 py-2" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm">邮箱（可选）</label>
              <input className="w-full rounded border px-3 py-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm">密码（8-72）</label>
              <input className="w-full rounded border px-3 py-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            {err && <div className="rounded bg-rose-100 px-3 py-2 text-sm text-rose-700">{err}</div>}
            <button
              className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
              disabled={busy || !username || !password || username.length < 3 || password.length < 8}
              onClick={doRegister}
            >{busy ? '注册中…' : '注册并登录'}</button>
          </div>
        )}

        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
          匿名仅指“对外展示为匿名”，仍需登录以保障可删除与滥用追责。
        </p>
      </div>
    </div>
  );
}
