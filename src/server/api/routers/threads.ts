import { boards } from "@/app/types/boards";
import { CACHE_TTL } from "@/app/utils/cache";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { fetchThread } from "@/server/services/4chan";
import { type Prisma, type PrismaClient } from "@prisma/client";
import { z } from "zod";

const getThreadFromCache = async (
  ctx: { db: PrismaClient },
  board: string,
  threadNo: number,
) => {
  const thread = await ctx.db.threadCache.findUnique({
    where: {
      no_board: {
        no: threadNo,
        board,
      },
    },
    include: {
      responses: true,
    },
  });

  return thread;
};

export const threadsRouter = createTRPCRouter({
  getThread: publicProcedure
    .input(
      z.object({
        board: z.enum(boards),
        threadNo: z.number(),
      }),
    )
    .query(
      async ({
        ctx,
        input,
      }): Promise<Prisma.ThreadCacheGetPayload<{
        include: { responses: true };
      }> | null> => {
        const thread = await getThreadFromCache(
          ctx,
          input.board,
          input.threadNo,
        );
        // If the catalog is older than CACHE_TTL or doesn't exist, fetch and cache new data
        if (!thread || Date.now() - thread.createdAt.getTime() > CACHE_TTL) {
          const newThread = await fetchThread(input.board, input.threadNo);
          if (!newThread) {
            throw new Error("Thread not found");
          }

          if (newThread) {
            // Delete old cache entries if they exist
            if (thread?.id) {
              await ctx.db.threadCacheResponse.deleteMany({
                where: {
                  threadCacheId: thread.id,
                },
              });

              await ctx.db.threadCache.delete({
                where: {
                  id: thread.id,
                },
              });
            }

            const [op, ...replies] = newThread.posts;
            if (!op) {
              throw new Error("Thread not found");
            }

            // Create new cache entry
            await ctx.db.threadCache.create({
              data: {
                board: input.board,
                no: op.no,
                bumplimit: op.bumplimit,
                closed: op.closed,
                com: op.com,
                country: op.country,
                country_name: op.country_name,
                filename: op.filename,
                semantic_url: op.semantic_url,
                custom_spoiler: op.custom_spoiler,
                replies: op.replies,
                images: op.images,
                ext: op.ext,
                fsize: op.fsize,
                tim: op.tim ? new Date(op.tim) : undefined,
                md5: op.md5,
                w: op.w,
                h: op.h,
                tn_w: op.tn_w,
                tn_h: op.tn_h,
                filedeleted: op.filedeleted,
                spoiler: op.spoiler,
                time: op.time,
                resto: op.resto,
                id: op.id,
                sub: op.sub,
                imagelimit: op.imagelimit,
                name: op.name,
                trip: op.trip,
                m_img: op.m_img,
                now: op.now,
                since4pass: op.since4pass,
                sticky: op.sticky,
                unique_ips: op.unique_ips,
                tag: op.tag,
                responses: {
                  create: replies.map((reply) => ({
                    board: input.board,
                    no: reply.no,
                    now: reply.now,
                    name: reply.name,
                    time: reply.time,
                    capcode: reply.capcode,
                    com: reply.com,
                    filename: reply.filename,
                    ext: reply.ext,
                    w: reply.w,
                    h: reply.h,
                    tn_w: reply.tn_w,
                    tn_h: reply.tn_h,
                    filedeleted: reply.filedeleted,
                    spoiler: reply.spoiler,
                    trip: reply.trip,
                    m_img: reply.m_img,
                    since4pass: reply.since4pass,
                    unique_ips: reply.unique_ips,
                    tag: reply.tag,
                    tim: reply.tim ? new Date(reply.tim) : undefined,
                    country: reply.country,
                    country_name: reply.country_name,
                    custom_spoiler: reply.custom_spoiler,
                    fsize: reply.fsize,
                    md5: reply.md5,
                    resto: reply.resto,
                  })),
                },
              },
            });

            const justCached = await getThreadFromCache(
              ctx,
              input.board,
              input.threadNo,
            );

            return justCached!;
          }
          throw new Error("Thread not found");
        }

        // Safely parse cached JSON data
        return thread;
      },
    ),
});
