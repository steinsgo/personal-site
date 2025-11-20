// app/api/emotion/route.ts
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const form = await req.formData(); // 保留原始文件
  const r = await fetch('http://127.0.0.1:8000/emotion', {
    method: 'POST',
    body: form,
  });
  const buf = await r.arrayBuffer();
  const ct = r.headers.get('content-type') ?? 'application/json';
  return new Response(buf, { status: r.status, headers: { 'content-type': ct } });
}
