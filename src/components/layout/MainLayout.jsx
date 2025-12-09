import { Outlet } from "react-router-dom";
import SideNavBar from "../SideNavBar";
import TopNavBar from "../TopNavBar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      {/* LEFT SIDEBAR */}
      <SideNavBar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <TopNavBar />

        {/* RENDER PAGE */}
        <div className="mt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
