import MainHeader from "./MainHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <MainHeader />

        <main className="p-4 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
