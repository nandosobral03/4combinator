import Link from "next/link";
import { boards } from "./types/boards";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-2">
      <div className="mb-6">
        <h1 className="mb-3 text-xl font-bold">Welcome to 4combinator</h1>
        <p className="mb-2 text-[13px] leading-5">
          4combinator is a read-only interface for selected 4chan boards,
          featuring a Hacker News-inspired UI designed for a work safe browsing
          experience.
        </p>
        <p className="text-[13px] leading-5">
          This is an unofficial client that provides a simplified way to browse
          4chan content. No account is required, and you cannot post or interact
          with the content.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-lg font-bold">Available Boards</h2>
        <div className="flex flex-wrap gap-2">
          {boards.map((board) => (
            <Link
              key={board}
              href={`/${board}`}
              className="inline-block rounded bg-[#f6f6ef] px-3 py-1 text-[13px] hover:bg-[#f0f0e8]"
            >
              /{board}/
            </Link>
          ))}
        </div>
      </div>

      <div className="text-[13px] text-gray-600">
        <p className="mb-2">
          Note: This is a personal project created for educational purposes. All
          content is fetched from 4chan&apos;s API and temporarily cached to
          avoid rate limiting.
        </p>
        <p>
          Built with Next.js and Tailwind CSS.
          <a
            href="https://github.com/nandosobral03/4combinator"
            className="ml-1 text-[#ff6600] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
