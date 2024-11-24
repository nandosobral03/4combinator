const Header = () => {
  return (
    <header className="w-full bg-[#ff6600]">
      <div className="max-w-6xl px-2 py-1">
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
