import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import ThreadItem from "@/app/_components/ThreadItem";
import { api } from "@/trpc/server";
import { CatalogCacheThread } from "@prisma/client";
import Link from "next/link";

const ITEMS_PER_PAGE = 30;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = params?.p ? parseInt(params.p as string) : 1;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  // TODO: Replace with actual API call to fetch /g/ threads
  const threads: CatalogCacheThread[] = await api.catalog.getCatalogForBoard({
    board: "g",
    skip,
    take: ITEMS_PER_PAGE,
  });

  return (
    <>
      <Header />
      <div className="max-w-6xl py-1">
        {threads.map((thread, index) => (
          <ThreadItem
            key={thread.no}
            thread={thread}
            index={skip + index + 1}
          />
        ))}
        {threads.length === ITEMS_PER_PAGE && (
          <div className="ml-8 mt-4">
            <Link
              href={`/?p=${page + 1}`}
              className="text-sm text-[#828282] hover:underline"
            >
              More
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
