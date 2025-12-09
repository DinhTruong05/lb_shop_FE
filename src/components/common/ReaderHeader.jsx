import { Link } from "react-router-dom";

export default function ReaderHeader() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-surface-dark/50 px-4 py-4 font-display">

      {/* LEFT LOGO */}
      <div className="flex items-center gap-3">
        <span className="text-accent-blue font-extrabold text-xl">📚</span>
        <h2 className="text-text-primary-dark text-lg font-bold">
          Library System
        </h2>
      </div>

      {/* MENU */}
      <nav className="hidden md:flex items-center gap-9 text-text-primary-dark">
        <Link to="/reader/home" className="hover:text-accent-blue transition">
          Home
        </Link>

        <Link to="/reader/dashboard" className="hover:text-accent-blue transition">
          Dashboard
        </Link>

        <Link to="/reader/rentals" className="hover:text-accent-blue transition">
          Rentals
        </Link>

        <Link to="/reader/profile" className="hover:text-accent-blue transition">
          Profile
        </Link>
      </nav>

      {/* AVATAR */}
      <div className="hidden md:flex items-center gap-2">
        <span className="font-medium text-sm text-text-primary-dark mr-2">
          Alex Reader
        </span>

        <div
          className="bg-center bg-cover rounded-full size-10"
          style={{
            backgroundImage:
              "url('https://i.pravatar.cc/100?img=15')",
          }}
        ></div>
      </div>

    </header>
  );
}
