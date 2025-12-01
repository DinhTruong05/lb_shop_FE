import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen shadow-sm p-4">
      <nav className="space-y-2">

        <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-200">
          📊 Dashboard
        </Link>

        <Link to="/books" className="block p-2 rounded hover:bg-gray-200">
          📚 Books
        </Link>

        <Link to="/users" className="block p-2 rounded hover:bg-gray-200">
          👤 Users
        </Link>

        <Link to="/borrow" className="block p-2 rounded hover:bg-gray-200">
          📦 Borrow Management
        </Link>

      </nav>
    </aside>
  );
}

