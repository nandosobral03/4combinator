"use client";

import { useState } from "react";

export default function CORSlessImage({
  src,
  alt,
  className,
  thumbnailUrl,
  width,
  height,
  thumbnailWidth,
  thumbnailHeight,
}: {
  src: string;
  alt: string;
  className?: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Scale down thumbnail dimensions if they exceed max size
  const maxThumbnailSize = 150;
  let scaledThumbnailWidth = thumbnailWidth;
  let scaledThumbnailHeight = thumbnailHeight;

  if (thumbnailWidth && thumbnailHeight) {
    const aspectRatio = thumbnailWidth / thumbnailHeight;
    if (thumbnailWidth > maxThumbnailSize) {
      scaledThumbnailWidth = maxThumbnailSize;
      scaledThumbnailHeight = maxThumbnailSize / aspectRatio;
    }
    if (thumbnailHeight > maxThumbnailSize) {
      scaledThumbnailHeight = maxThumbnailSize;
      scaledThumbnailWidth = maxThumbnailSize * aspectRatio;
    }
  }

  const handleClick = () => {
    window.open(src, "_blank");
  };

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isHovered && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={`${className} absolute left-0 top-0 z-10 transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          width={width ?? scaledThumbnailWidth}
          height={height ?? scaledThumbnailHeight}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailUrl ?? src}
        alt={alt}
        className={`${className} cursor-pointer`}
        loading="lazy"
        width={scaledThumbnailWidth ?? width}
        height={scaledThumbnailHeight ?? height}
      />
    </div>
  );
}
