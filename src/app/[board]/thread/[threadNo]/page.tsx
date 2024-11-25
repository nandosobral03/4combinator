import CORSlessImage from "@/app/_components/CORSlessImage";
import { type ValidBoard } from "@/app/types/boards";
import { api } from "@/trpc/server";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ board: string; threadNo: string }>;
}) {
  const awaitedParams = await params;

  const thread = await api.threads.getThread({
    board: awaitedParams.board as ValidBoard,
    threadNo: parseInt(awaitedParams.threadNo),
  });

  if (!thread) {
    return <div>Thread not found</div>;
  }

  return (
    <div className="w-full max-w-6xl py-1">
      <div className="mb-4">
        <div className="mb-1 text-[13px] text-[#828282]">
          {thread.sub && (
            <span className="font-bold text-black">{thread.sub}</span>
          )}
          <div>
            <span>{thread.name}</span>
            {thread.trip && <span> {thread.trip}</span>}
            <span> {thread.now} </span>
            <span>| {thread.responses.length} comments </span>
            {thread.images > 0 && <span>| {thread.images} images </span>}
            {thread.sticky && <span>| 📌 Pinned </span>}
            {thread.closed && <span>| 🔒 Locked</span>}
          </div>
        </div>
        <div className="flex gap-2">
          {thread.tim && thread.ext && (
            <div className="flex-shrink-0">
              <CORSlessImage
                src={`https://i.4cdn.org/${awaitedParams.board}/${thread.tim}${thread.ext}`}
                alt={thread.filename ?? "Thread image"}
                className="max-h-[300px] max-w-[300px] object-contain"
                height={thread.h!}
                width={thread.w!}
                thumbnailHeight={thread.tn_h!}
                thumbnailWidth={thread.tn_w!}
                thumbnailUrl={`https://i.4cdn.org/${awaitedParams.board}/${thread.tim}s.jpg`}
              />
            </div>
          )}
          {thread.com && (
            <div
              className="min-w-0 break-words text-[14px] leading-[1.4]"
              dangerouslySetInnerHTML={{ __html: thread.com }}
            />
          )}
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        {thread.responses.map((reply) => (
          <div key={reply.no} className="px-8" id={`p${reply.no}`}>
            <div className="mb-1 text-[13px] text-[#828282]">
              <span>{reply.name}</span>
              {reply.trip && <span> {reply.trip}</span>}
              <span> {reply.now}</span>
              <span> No.{reply.no}</span>
            </div>
            <div className="flex gap-2">
              {reply.tim && reply.ext && (
                <div className="flex-shrink-0">
                  <CORSlessImage
                    src={`https://i.4cdn.org/${awaitedParams.board}/${reply.tim}${reply.ext}`}
                    alt={reply.filename ?? "Reply image"}
                    className="max-h-[300px] max-w-[300px] object-contain"
                    height={reply.h!}
                    width={reply.w!}
                    thumbnailHeight={reply.tn_h!}
                    thumbnailWidth={reply.tn_w!}
                    thumbnailUrl={`https://i.4cdn.org/${awaitedParams.board}/${reply.tim}s.jpg`}
                  />
                </div>
              )}
              {reply.com && (
                <div
                  className="min-w-0 max-w-full overflow-auto break-words text-[14px] leading-[1.4]"
                  dangerouslySetInnerHTML={{ __html: reply.com }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
