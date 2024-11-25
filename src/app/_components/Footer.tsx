import Link from "next/link";
import { type FC } from "react";
import { boards } from "../types/boards";

const Footer: FC = () => {
  return (
    <footer className="mt-6 border-t border-[#ff6600] bg-[#f6f6ef] py-4 text-sm">
      <div className="mx-auto max-w-6xl px-2">
        <nav className="flex flex-wrap items-center gap-x-2 text-[#828282]">
          {boards.map((board) => (
            <Link key={board} href={`/${board}`} className="hover:underline">
              /{board}/
            </Link>
          ))}
          <div className="ml-auto text-[#828282]">
            <p>
              © {new Date().getFullYear()} 4combinator. All rights reserved.
            </p>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
