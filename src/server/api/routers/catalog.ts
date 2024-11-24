import { boards } from "@/app/types/boards";
import { CACHE_TTL } from "@/app/utils/cache";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Catalog, fetchCatalog } from "@/server/services/4chan";
import { z } from "zod";

export const catalogRouter = createTRPCRouter({
  getCatalogForBoard: publicProcedure
    .input(
      z.object({
        board: z.enum(boards),
        page: z.number().optional().default(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const catalog = await ctx.db.catalogCache.findFirst({
        where: {
          board: input.board,
        },
        include: {
          page: {
            where: {
              page: input.page,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // If the catalog is older than CACHE_TTL or doesn't exist, fetch and cache new data
      if (!catalog || Date.now() - catalog.createdAt.getTime() > CACHE_TTL) {
        const newCatalog = await fetchCatalog(input.board);
        if (!newCatalog || !Array.isArray(newCatalog)) {
          return [];
        }

        if (newCatalog) {
          // Delete old cache entries if they exist
          if (catalog?.id) {
            await ctx.db.catalogCachePage.deleteMany({
              where: {
                catalogId: catalog.id,
              },
            });
            await ctx.db.catalogCache.delete({
              where: {
                id: catalog.id,
              },
            });
          }

          const newCatalogWithCorrectPageNumbers = newCatalog
            .map((page, i) => ({
              ...page,
              page: Math.floor(i / 2) + 1,
            }))
            .reduce(
              (acc, page) => {
                const entry = acc[page.page];
                if (entry) {
                  entry.threads.push(...page.threads);
                } else {
                  acc[page.page] = page;
                }
                return acc;
              },
              {} as Record<number, Catalog>,
            );

          // Create new cache entry
          const cached = await ctx.db.catalogCache.create({
            data: {
              board: input.board,
              createdAt: new Date(),
            },
          });

          // Create cache pages
          await ctx.db.catalogCachePage.createMany({
            data: Object.values(newCatalogWithCorrectPageNumbers).map(
              (page) => ({
                catalogId: cached.id,
                page: page.page,
                threads: JSON.stringify(page.threads),
              }),
            ),
          });

          const pageThreads =
            newCatalogWithCorrectPageNumbers[input.page]?.threads;
          return Array.isArray(pageThreads) ? pageThreads : [];
        }
        return []; // Return empty array if newCatalog is null/undefined
      }

      // Safely parse cached JSON data
      try {
        const cachedThreads = catalog?.page?.[0]?.threads;
        if (!cachedThreads) return [];

        const parsedThreads = JSON.parse(cachedThreads);
        return Array.isArray(parsedThreads) ? parsedThreads : [];
      } catch (error) {
        console.error("Error parsing cached threads:", error);
        return [];
      }
    }),
});
