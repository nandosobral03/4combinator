import Link from "next/link";
import { type FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="mt-6 border-t border-[#ff6600] bg-[#f6f6ef] py-4 text-sm">
      <div className="mx-auto max-w-6xl px-2">
        <nav className="flex flex-wrap gap-x-2 text-[#828282]">
          <Link href="/guidelines" className="hover:underline">
            Guidelines
          </Link>
          <span>|</span>
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
          <span>|</span>
          <Link href="/lists" className="hover:underline">
            Lists
          </Link>
          <span>|</span>
          <Link href="/api" className="hover:underline">
            API
          </Link>
          <span>|</span>
          <Link href="/security" className="hover:underline">
            Security
          </Link>
          <span>|</span>
          <Link href="/legal" className="hover:underline">
            Legal
          </Link>
          <span>|</span>
          <Link href="/apply" className="hover:underline">
            Apply to YC
          </Link>
          <span>|</span>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
