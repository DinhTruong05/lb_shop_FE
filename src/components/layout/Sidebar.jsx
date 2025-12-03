import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: "📊", to: "/dashboard" },
  { name: "Books", icon: "📘", to: "/books" },
  { name: "Users", icon: "👥", to: "/users" },
  { name: "Borrow Management", icon: "📦", to: "/borrow" }
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm">
      <div className="text-center py-6 text-blue-600 font-bold text-xl tracking-wide">
        📚 Library Manager
      </div>

      <nav className="mt-4">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 transition 
              ${isActive ? "border-l-4 border-blue-600 bg-blue-50 text-blue-700 font-semibold" : ""}`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
