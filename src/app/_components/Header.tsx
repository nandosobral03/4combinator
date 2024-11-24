"use client";

import { usePathname } from "next/navigation";
import { boards, ValidBoard } from "../types/boards";

const Header = () => {
  const pathname = usePathname();
  const board = boards.includes(pathname?.split("/")[1] as ValidBoard)
    ? pathname?.split("/")[1]
    : undefined;

  return (
    <header className="w-full bg-[#ff6600]">
      <div className="mx-auto max-w-6xl px-2 py-1">
        <nav className="flex items-center gap-1 text-[13px]">
          <span className="font-bold">
            <a href="/" className="hover:underline">
              4combinator
            </a>
          </span>
          <span className="px-1">|</span>
          {board ? (
            <a href={`/${board}`} className="hover:underline">
              /{board}/
            </a>
          ) : (
            <span className="text-xs">A work safe 4chan interface</span>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
