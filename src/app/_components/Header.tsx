const Header = () => {
  return (
    <header className="bg-[#ff6600]">
      <div className="mx-auto max-w-6xl px-2 py-1">
        <nav className="flex items-center gap-1 text-[13px]">
          <span className="font-bold">
            <a href="/" className="hover:underline">
              /g/ news
            </a>
          </span>
          <span className="px-1">|</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
