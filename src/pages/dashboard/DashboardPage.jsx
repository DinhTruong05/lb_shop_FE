import { BookOpen, BookmarkMinus, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        📊 Library Dashboard
      </h2>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL BOOKS */}
        <div className="dashboard-card bg-gradient-to-br from-blue-100 to-blue-50">
          <div className="icon-wrapper bg-blue-200 text-blue-700">
            <BookOpen size={28} />
          </div>
          <p className="card-label">Total Books</p>
          <h3 className="card-value">1200</h3>
        </div>

        {/* BORROWED */}
        <div className="dashboard-card bg-gradient-to-br from-green-100 to-green-50">
          <div className="icon-wrapper bg-green-200 text-green-700">
            <BookmarkMinus size={28} />
          </div>
          <p className="card-label">Borrowed</p>
          <h3 className="card-value">310</h3>
        </div>

        {/* OVERDUE */}
        <div className="dashboard-card bg-gradient-to-br from-red-100 to-red-50">
          <div className="icon-wrapper bg-red-200 text-red-700">
            <Clock size={28} />
          </div>
          <p className="card-label">Overdue</p>
          <h3 className="card-value">15</h3>
        </div>

      </div>
    </div>
  );
}
