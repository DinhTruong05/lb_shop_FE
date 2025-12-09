import { Outlet } from "react-router-dom";
import ReaderHeader from "../common/ReaderHeader"; 
// (hoặc component header riêng nếu bro muốn)

export default function ReaderLayout() {
  return (
    <div className="min-h-screen bg-background-dark text-text-primary-dark">
      
      {/* HEADER (reader homepage UI style) */}
      <ReaderHeader />

      {/* MAIN CONTENT */}
      <main className="px-4 sm:px-10 md:px-20 lg:px-40 py-10">
        <Outlet />
      </main>
    </div>
  );
}
