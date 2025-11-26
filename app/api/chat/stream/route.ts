import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const enc = new TextEncoder();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function pack(event: string, data: unknown, id?: string) {
  let s = "";
  if (id) s += `id: ${id}\n`;
  s += `event: ${event}\n`;
  s += `data: ${JSON.stringify(data)}\n\n`; // ✅ 关键：必须有空行结束事件
  return enc.encode(s);
}


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  if (!roomId) return new Response("missing roomId", { status: 400 });

  // after=毫秒时间戳，用于断线重连继续拉
  const after = Number(searchParams.get("after") ?? "0");
  let cursorTime = Number.isFinite(after) ? new Date(after) : new Date(0);

  // ✅ 关键：同一个 cursorTime 内已经推送过的消息 id，避免 gte 带来的重复
  let seenAtCursor = new Set<string>();

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(enc.encode("retry: 2000\n\n"));
      controller.enqueue(enc.encode(`event: ready\ndata: {}\n\n`));

      let lastPing = Date.now();

      while (!req.signal.aborted) {
        await sleep(500); // 想更“实时”可以 200～500

        const news = await prisma.chatMessage.findMany({
          where: {
            roomId,
            createdAt: { gte: cursorTime }, // ✅ 不用 gt，避免同一秒漏消息
          },
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          take: 200,
          include: { user: { select: { username: true } } },
        });

        if (news.length) {
          for (const m of news) {
            const t = m.createdAt.getTime();
            const ct = cursorTime.getTime();

            // 游标跨到新时间戳：推进 cursorTime，并清空去重集合
            if (t > ct) {
              cursorTime = m.createdAt;
              seenAtCursor = new Set<string>();
            }

            // 同一时间戳内：已推送过就跳过（防止 gte 重复）
            if (m.createdAt.getTime() === cursorTime.getTime() && seenAtCursor.has(m.id)) {
              continue;
            }

            controller.enqueue(
              pack(
                "message",
                {
                  id: m.id,
                  roomId: m.roomId,
                  kind: m.kind,
                  text: m.text,
                  imageUrl: m.imageUrl,
                  createdAt: m.createdAt,
                  user: { username: m.user.username },
                },
                m.id,
              ),
            );

            seenAtCursor.add(m.id);
          }
        } else if (Date.now() - lastPing > 15000) {
          controller.enqueue(enc.encode(`: ping ${Date.now()}\n\n`));
          lastPing = Date.now();
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
//我自己买了godady的域名，然后我有一台可以跑的服务器这样可以吗