import { useEffect, useState } from "react";
import { BookOpen, BookmarkMinus, Clock } from "lucide-react";
import { getDashboardSummary } from "../../api/dashboardApi";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    overdueBooks: 0,
  });

  const [loading, setLoading] = useState(true);

  // Gọi API khi load trang
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardSummary();
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10 text-lg">
        ⏳ Loading dashboard...
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        📊 Library Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="dashboard-card bg-gradient-to-br from-blue-100 to-blue-50">
          <div className="icon-wrapper bg-blue-200 text-blue-700">
            <BookOpen size={28} />
          </div>
          <p className="card-label">Total Books</p>
          <h3 className="card-value">{stats.totalBooks}</h3>
        </div>

        <div className="dashboard-card bg-gradient-to-br from-green-100 to-green-50">
          <div className="icon-wrapper bg-green-200 text-green-700">
            <BookmarkMinus size={28} />
          </div>
          <p className="card-label">Borrowed</p>
          <h3 className="card-value">{stats.borrowedBooks}</h3>
        </div>

        <div className="dashboard-card bg-gradient-to-br from-red-100 to-red-50">
          <div className="icon-wrapper bg-red-200 text-red-700">
            <Clock size={28} />
          </div>
          <p className="card-label">Overdue</p>
          <h3 className="card-value">{stats.overdueBooks}</h3>
        </div>

      </div>
    </div>
  );
}
