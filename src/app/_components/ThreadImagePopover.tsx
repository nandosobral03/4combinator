interface ThreadImagePopoverProps {
  imageUrl: string | null;
  thumbnailUrl: string;
  filename: string | null;
  ext: string | null;
}

const ThreadImagePopover = ({
  imageUrl,
  thumbnailUrl,
  filename,
  ext,
}: ThreadImagePopoverProps) => {
  return (
    <div className="absolute left-0 top-full z-50 mt-2 rounded-lg bg-white p-2 shadow-lg">
      <picture>
        <source
          srcSet={imageUrl ?? undefined}
          type={`image/${ext?.slice(1)}`}
        />
        <img
          src={thumbnailUrl}
          alt={filename ?? "Thread image"}
          className="max-h-[300px] max-w-[300px] object-contain"
          loading="lazy"
        />
      </picture>
      <div className="mt-1 text-xs text-gray-600">
        {filename}
        {ext}
      </div>
    </div>
  );
};

export default ThreadImagePopover;
