import { prisma } from "@/lib/prisma";

// Rate limiting basato su una query di conteggio nel DB già presente (Postgres/Prisma),
// senza servizio esterno.
// TODO: se il traffico cresce molto, sostituire con rate limiter
// Redis/Upstash per non appesantire il DB con query di conteggio ad
// ogni submit. Per ora, ai volumi attesi in fase di lancio, va bene così.
export async function checkRateLimit(
  userId: string,
  action: "post" | "comment",
  opts: { maxRequests: number; windowMinutes: number }
): Promise<{ allowed: boolean }> {
  const windowStart = new Date(Date.now() - opts.windowMinutes * 60 * 1000);
  const count =
    action === "post"
      ? await prisma.post.count({ where: { authorId: userId, createdAt: { gte: windowStart } } })
      : await prisma.comment.count({ where: { authorId: userId, createdAt: { gte: windowStart } } });
  return { allowed: count < opts.maxRequests };
}
