"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const NoSSRSpan = dynamic(() => import("./NoSSRSpan"), { ssr: false });

import { CatalogCacheThread } from "@prisma/client";
import ThreadImagePopover from "./ThreadImagePopover";

interface ThreadItemProps {
  thread: CatalogCacheThread;
  index: number;
}

const ThreadItem = ({ thread, index }: ThreadItemProps) => {
  const [showPopover, setShowPopover] = useState(false);

  const imageUrl =
    thread.tim && thread.ext
      ? `https://i.4cdn.org/${thread.board}/${thread.tim}${thread.ext}`
      : null;

  const thumbnailUrl =
    thread.tim && thread.ext
      ? `https://i.4cdn.org/${thread.board}/${thread.tim}s.jpg`
      : null;

  return (
    <div className="flex gap-1 py-[5px] text-[13px] leading-[15px]">
      <div className="w-[1.5em] text-right text-[#828282]">{index}.</div>
      <div>
        <div className="flex items-baseline">
          <div className="relative">
            <a
              href={`/${thread.board}/thread/${thread.no}`}
              className="visited:text-[#828282]"
              suppressHydrationWarning
              onMouseEnter={() => setShowPopover(true)}
              onMouseLeave={() => setShowPopover(false)}
            >
              {thread.sub || <NoSSRSpan com={thread.com ?? ""} />}
            </a>
            {showPopover && thumbnailUrl && (
              <ThreadImagePopover
                imageUrl={imageUrl}
                thumbnailUrl={thumbnailUrl}
                filename={thread.filename}
                ext={thread.ext}
              />
            )}
          </div>
          {thread.sub && (
            <a
              href={`https://news.ycombinator.com/from?site=${thread.sub}`}
              className="ml-1 text-[#828282] hover:underline"
            >
              ({thread.sub})
            </a>
          )}
        </div>
        <div className="text-[#828282]">
          <a href={`/user/${thread.name}`} className="hover:underline">
            {thread.name}
          </a>{" "}
          <a
            href={`/item/${thread.no}`}
            className="hover:underline"
            suppressHydrationWarning
          >
            {getTimeAgo(thread.time)}
          </a>{" "}
          |{" "}
          <a href={`/item/${thread.no}`} className="hover:underline">
            {thread.replies ?? 0} comments
          </a>
          {thread.images > 0 && (
            <>
              {" "}
              | <span>{thread.images} images</span>
            </>
          )}
          | <span>{thread.unique_ips} posters </span>
        </div>
      </div>
    </div>
  );
};

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 24) {
    return `${Math.floor(hours / 24)} days ago`;
  }
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  return `${seconds} seconds ago`;
}

export default ThreadItem;
