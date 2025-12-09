import NavLink from "./NavLink";
import LogoIcon from "./LogoIcon";
import { authApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function SideNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout();
    navigate("/login");
  };
  console.log("authApi:", authApi);

  return (
    <aside className="w-24 bg-[#101722] p-4 flex flex-col items-center justify-between sticky top-0 h-screen">
      <div className="flex flex-col items-center gap-10">
        <LogoIcon />

        {/* NAVIGATION ICONS */}
        <nav className="flex flex-col items-center gap-4">
          <NavLink icon="dashboard" to="/admin/dashboard" />
          <NavLink icon="auto_stories" to="/admin/books" />
          <NavLink icon="groups" to="/admin/users" />
          <NavLink icon="receipt_long" to="/admin/rentals" />
          <NavLink icon="pie_chart" to="/admin/statistics" />
        </nav>
      </div>

      {/* SETTINGS & LOGOUT */}
      <div className="flex flex-col items-center gap-4">
        <NavLink icon="settings" to="/settings" />

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="
                  flex items-center justify-center
                  w-12 h-12
                  rounded-xl
                  bg-white/5
                  hover:bg-white/10
                  transition-all
                  text-gray-300 hover:text-white
                "
        >
          <span className="material-symbols-outlined text-3xl">logout</span>
        </button>
      </div>
    </aside>
  );
}
