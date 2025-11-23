'use client';

import { useEffect, useState } from 'react';
import AuthModal from './AuthModal';

export default function AuthButton() {
  const [me, setMe] = useState<{id: string|null; username?: string}>({ id: null });
  const [open, setOpen] = useState(false);

  const refreshMe = async () => {
    const j = await fetch('/api/me', { cache: 'no-store' }).then(r=>r.json());
    setMe(j);
  };

  useEffect(() => { refreshMe(); }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    await refreshMe();
  };

  return (
    <div className="flex items-center gap-2">
      {me.id ? (
        <>
          <span className="text-sm text-zinc-600 dark:text-zinc-300">已登录：<b>{me.username}</b></span>
          <button className="rounded bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800" onClick={logout}>退出</button>
        </>
      ) : (
        <button className="rounded bg-zinc-900 px-3 py-1 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900" onClick={()=>setOpen(true)}>登录 / 注册</button>
      )}
      <AuthModal open={open} onClose={()=>setOpen(false)} onAuthed={()=>refreshMe()} />
    </div>
  );
}
