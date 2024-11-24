import type { Thread } from "../types";

interface ThreadItemProps {
  thread: Thread;
  index: number;
}

const getFirstLine = (text: string) => {
  return text ? (text.split("<br>")[0] ?? "") : "";
};

const ThreadItem = ({ thread, index }: ThreadItemProps) => {
  return (
    <div className="flex gap-1 py-[5px] text-[13px] leading-[15px]">
      <div className="w-[1.5em] text-right text-[#828282]">{index}.</div>
      <div>
        <div className="flex items-baseline">
          <a href={`/thread/${thread.no}`} className="visited:text-[#828282]">
            {thread.sub || (
              <span
                dangerouslySetInnerHTML={{
                  __html: getFirstLine(thread.com ?? ""),
                }}
              />
            )}
          </a>
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
          <a href={`/user/${thread.by}`} className="hover:underline">
            {thread.by}
          </a>{" "}
          <a href={`/item/${thread.no}`} className="hover:underline">
            {getTimeAgo(thread.time)}
          </a>{" "}
          |{" "}
          <a href={`/item/${thread.no}`} className="hover:underline">
            {thread.replies ?? 0} comments
          </a>
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
