import ThreadItem from "@/app/_components/ThreadItem";
import { boards, ValidBoard } from "@/app/types/boards";
import { api } from "@/trpc/server";
import { CatalogCacheThread } from "@prisma/client";
import Link from "next/link";

const ITEMS_PER_PAGE = 30;

export default async function Page({
  params,
  searchParams,
}: {
  params: { board: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const awaitedParams = await params;
  const board = awaitedParams.board as ValidBoard;
  const queryParams = await searchParams;
  const page = queryParams?.p ? parseInt(queryParams.p as string) : 1;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  if (!boards.includes(board)) {
    return <div>Board not found</div>;
  }

  const threads: CatalogCacheThread[] = await api.catalog.getCatalogForBoard({
    board,
    skip,
    take: ITEMS_PER_PAGE,
  });

  return (
    <div className="max-w-6xl py-1">
      {threads.map((thread, index) => (
        <ThreadItem key={thread.no} thread={thread} index={skip + index + 1} />
      ))}
      {threads.length === ITEMS_PER_PAGE && (
        <div className="ml-6">
          <Link
            href={`/${board}?p=${page + 1}`}
            className="text-sm text-[#828282] hover:underline"
          >
            More
          </Link>
        </div>
      )}
    </div>
  );
}
