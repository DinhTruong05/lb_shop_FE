import { Link, useLocation } from "react-router-dom";

export default function NavLink({ icon, to, active }) {
  const { pathname } = useLocation();

  const isActive = active || pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center justify-center p-3 rounded-full transition 
      ${isActive ? "bg-primary/20 text-primary" : "text-white/60 hover:bg-primary/10 hover:text-primary"}`}
    >
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </Link>
  );
}
