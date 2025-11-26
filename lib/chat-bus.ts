// lib/chat-bus.ts
export type ChatWireMsg = {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  kind: "text" | "image";
  text?: string | null;
  imageUrl?: string | null;
  createdAt: string;
};

type Listener = (msg: ChatWireMsg) => void;

const g = globalThis as unknown as {
  __chatBus?: {
    rooms: Map<string, Set<Listener>>;
  };
};

export const chatBus =
  g.__chatBus ??
  (g.__chatBus = {
    rooms: new Map<string, Set<Listener>>(),
  });

export function subscribeRoom(roomId: string, fn: Listener) {
  let set = chatBus.rooms.get(roomId);
  if (!set) {
    set = new Set();
    chatBus.rooms.set(roomId, set);
  }
  set.add(fn);
  return () => {
    set!.delete(fn);
    if (set!.size === 0) chatBus.rooms.delete(roomId);
  };
}

export function publishRoom(roomId: string, msg: ChatWireMsg) {
  const set = chatBus.rooms.get(roomId);
  if (!set) return;
  for (const fn of set) fn(msg);
}
