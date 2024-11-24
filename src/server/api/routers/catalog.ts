import { boards } from "@/app/types/boards";
import { CACHE_TTL } from "@/app/utils/cache";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { fetchCatalog } from "@/server/services/4chan";
import { CatalogCacheThread } from "@prisma/client";
import { z } from "zod";

const getCurrentCatalogCache = async (
  ctx: { db: any },
  board: string,
  threadNo?: number,
  skip = 0,
  take = 30,
) => {
  console.log("skip", skip);
  console.log("take", take);
  console.log("threadNo", threadNo);
  console.log("board", board);
  const catalog = await ctx.db.catalogCache.findFirst({
    where: {
      board,
    },
    include: {
      threads: {
        where: threadNo
          ? {
              no: threadNo,
            }
          : undefined,
        orderBy: {
          ordinal: "asc",
        },
        skip,
        take,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("catalog", catalog);
  return catalog;
};

export const catalogRouter = createTRPCRouter({
  getCatalogForBoard: publicProcedure
    .input(
      z.object({
        board: z.enum(boards),
        threadNo: z.number().optional(),
        skip: z.number().optional().default(0),
        take: z.number().optional().default(30),
      }),
    )
    .query(async ({ ctx, input }): Promise<CatalogCacheThread[]> => {
      const catalog = await getCurrentCatalogCache(
        ctx,
        input.board,
        input.threadNo,
        input.skip,
        input.take,
      );

      // If the catalog is older than CACHE_TTL or doesn't exist, fetch and cache new data
      if (!catalog || Date.now() - catalog.createdAt.getTime() > CACHE_TTL) {
        const newCatalog = await fetchCatalog(input.board);
        if (!newCatalog || !Array.isArray(newCatalog)) {
          return [];
        }

        if (newCatalog) {
          // Delete old cache entries if they exist
          if (catalog?.id) {
            await ctx.db.catalogCacheThread.deleteMany({
              where: {
                catalogCacheId: catalog.id,
              },
            });
          }

          // Create new cache entry
          const cached = await ctx.db.catalogCache.create({
            data: {
              board: input.board,
              createdAt: new Date(),
            },
          });

          const flattenedCatalog = newCatalog.flatMap((page, pageIndex) =>
            page.threads.map((thread, threadIndex) => ({
              catalogCacheId: cached.id,
              board: input.board,
              ordinal: pageIndex * page.threads.length + threadIndex,
              bumplimit: thread.bumplimit,
              closed: thread.closed,
              com: thread.com,
              country: thread.country,
              country_name: thread.country_name,
              filename: thread.filename,
              capcode: thread.capcode,
              semantic_url: thread.semantic_url,
              custom_spoiler: thread.custom_spoiler,
              omitted_posts: thread.omitted_posts,
              omitted_images: thread.omitted_images,
              replies: thread.replies,
              images: thread.images,
              ext: thread.ext,
              fsize: thread.fsize,
              tim: thread.tim,
              md5: thread.md5,
              w: thread.w,
              h: thread.h,
              tn_w: thread.tn_w,
              tn_h: thread.tn_h,
              filedeleted: thread.filedeleted,
              spoiler: thread.spoiler,
              time: thread.time,
              resto: thread.resto,
              id: thread.id,
              sub: thread.sub,
              imagelimit: thread.imagelimit,
              name: thread.name,
              trip: thread.trip,
              last_modified: thread.last_modified,
              m_img: thread.m_img,
              no: thread.no,
              now: thread.now,
              since4pass: thread.since4pass,
              sticky: thread.sticky,
              unique_ips: thread.unique_ips,
              tag: thread.tag,
            })),
          );

          // Create cache pages
          await ctx.db.catalogCacheThread.createMany({
            data: flattenedCatalog,
          });

          const justCached = await getCurrentCatalogCache(
            ctx,
            input.board,
            input.threadNo,
            input.skip,
            input.take,
          );
          return justCached?.threads ?? [];
        }
        return []; // Return empty array if newCatalog is null/undefined
      }

      // Safely parse cached JSON data
      return catalog.threads ?? [];
    }),
});
