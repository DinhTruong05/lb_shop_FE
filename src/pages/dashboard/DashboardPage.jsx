import { useEffect, useState } from "react";

import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import QuickActionButton from "../../components/QuickActionButton";
import ReaderListItem from "../../components/ReaderListItem";

import {
  getDashboardSummary,
  getRentalPerformance,
  getTopReaders,
  getTopCategories,
  getRevenueStats,
} from "../../api/dashboardApi";

export default function DashboardPage() {
  // ====== STATE ======
  const [summary, setSummary] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    overdueBooks: 0,
    monthlyRevenue: 0,
    totalBooksChange: "+0",
    borrowedChangeToday: "0",
    overdueChange: "0",
    monthlyRevenueChange: "0%",
  });

  const [rentalData, setRentalData] = useState([]);
  const [topReaders, setTopReaders] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]); // [{ name, count }]
  const [revenueStats, setRevenueStats] = useState([]);   // [{ label, value }]

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ====== FETCH DATA ======
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          summaryRes,
          rentalRes,
          topReadersRes,
          categoryRes,
          revenueRes,
        ] = await Promise.all([
          getDashboardSummary(),
          getRentalPerformance(),
          getTopReaders(),
          getTopCategories(),
          getRevenueStats(),
        ]);

        setSummary((prev) => ({
          ...prev,
          ...(summaryRes || {}),
        }));

        setRentalData(rentalRes || []);
        setTopReaders(topReadersRes || []);
        setCategoryStats(categoryRes || []);
        setRevenueStats(revenueRes || []);
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err);
        setError("Có lỗi khi tải dữ liệu dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ====== CHART CALC (Revenue) ======
  const chartWidth = 300;
  const chartHeight = 150;
  const chartPadding = 20;

  const maxRevenue =
    revenueStats.length > 0
      ? Math.max(...revenueStats.map((p) => p.value))
      : 1;

  const stepX =
    revenueStats.length > 1
      ? (chartWidth - 2 * chartPadding) / (revenueStats.length - 1)
      : 0;

  const revenuePoints = revenueStats
    .map((point, index) => {
      const x = chartPadding + index * stepX;
      const y =
        chartHeight -
        chartPadding -
        (point.value / maxRevenue) * (chartHeight - 2 * chartPadding);

      return `${x},${y}`;
    })
    .join(" ");

  // ====== CHART CALC (Categories) ======
  const maxCategoryCount =
    categoryStats.length > 0
      ? Math.max(...categoryStats.map((c) => c.count))
      : 1;

  // ====== LOADING / ERROR ======
  if (loading) {
    return <p className="text-white text-lg mt-6">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <p className="text-red-400 text-lg mt-6">
        {error}
      </p>
    );
  }

  // ====== UI ======
  return (
    <div className="grid grid-cols-12 gap-8">
      {/* LEFT COLUMN */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Books"
            value={summary.totalBooks}
            change={summary.totalBooksChange || "+0"}
            positive
          />
          <StatCard
            title="Borrowed"
            value={summary.borrowedBooks}
            change={
              summary.borrowedChangeToday
                ? `${summary.borrowedChangeToday} today`
                : "0 today"
            }
          />
          <StatCard
            title="Overdue"
            value={summary.overdueBooks}
            change={summary.overdueChange || "+0"}
          />
          <StatCard
            title="Monthly Revenue"
            value={
              typeof summary.monthlyRevenue === "number"
                ? `$${summary.monthlyRevenue.toLocaleString()}`
                : summary.monthlyRevenue || "$0"
            }
            change={summary.monthlyRevenueChange || "+0%"}
            positive
          />
        </div>

        {/* Rental Table */}
        <div className="bg-[#1b2537] rounded p-6 border border-white/10">
          <div className="flex justify-between mb-4">
            <h2 className="text-white text-xl font-bold">Rental Performance</h2>
            <a href="#" className="text-primary text-sm font-semibold">
              View All
            </a>
          </div>

          {rentalData.length === 0 ? (
            <p className="text-white/60 text-sm">
              Chưa có dữ liệu thuê sách.
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-white/60 border-b border-white/10">
                  <th className="py-3 px-4 text-sm text-left">Book Title</th>
                  <th className="py-3 px-4 text-sm text-left">Member</th>
                  <th className="py-3 px-4 text-sm text-left">Due Date</th>
                  <th className="py-3 px-4 text-sm text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {rentalData.map((row, i) => (
                  <tr
                    key={i}
                    className="text-white/90 border-b border-white/10"
                  >
                    <td className="py-4 px-4">{row.title}</td>
                    <td className="py-4 px-4">{row.member}</td>
                    <td className="py-4 px-4">{row.dueDate}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Bar Chart - Top Categories */}
        <div className="bg-[#1b2537] rounded p-6 border border-white/10">
          <p className="text-white text-xl font-bold">Top Categories</p>
          <p className="text-white/60 text-sm mb-6">Last 30 Days</p>

          {categoryStats.length === 0 ? (
            <p className="text-white/60 text-sm">
              Chưa có dữ liệu thể loại.
            </p>
          ) : (
            <div className="grid grid-flow-col gap-6 items-end text-center">
              {categoryStats.map((cat) => {
                const height = 30 + (cat.count / maxCategoryCount) * 70; // 30–100px

                return (
                  <div key={cat.name}>
                    <div
                      className="w-6 mx-auto bg-primary rounded-t"
                      style={{ height: `${height}px` }}
                    ></div>
                    <p className="text-white/60 text-xs mt-2">{cat.name}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Line Chart - Revenue */}
        <div className="bg-[#1b2537] rounded p-6 border border-white/10">
          <p className="text-white text-xl font-bold">Revenue</p>
          <p className="text-white/60 text-sm mb-4">Last 4 weeks</p>

          {revenueStats.length === 0 ? (
            <p className="text-white/60 text-sm">
              Chưa có dữ liệu doanh thu.
            </p>
          ) : (
            <>
              <div className="h-40">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  width="100%"
                  height="100%"
                >
                  {/* Đường line chính */}
                  <polyline
                    points={revenuePoints}
                    stroke="#3c83f6"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </div>

              <div className="flex justify-between text-white/60 text-xs mt-2">
                {revenueStats.map((p) => (
                  <p key={p.label}>{p.label}</p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-12 lg:col-span-4 space-y-8">
        {/* Top Readers */}
        <div className="bg-[#1b2537] rounded p-6 border border-white/10">
          <h2 className="text-white text-xl font-bold mb-4">Top Readers</h2>

          {topReaders.length === 0 ? (
            <p className="text-white/60 text-sm">
              Chưa có dữ liệu người đọc.
            </p>
          ) : (
            <ul className="space-y-4">
              {topReaders.map((item) => (
                <ReaderListItem key={item.rank} {...item} />
              ))}
            </ul>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1b2537] rounded p-6 border border-white/10">
          <h2 className="text-white text-xl font-bold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-2 gap-4">
            <QuickActionButton icon="book" label="Add Book" />
            <QuickActionButton icon="person_add" label="Add Member" />
            <QuickActionButton icon="add_card" label="New Rental" />
            <QuickActionButton icon="lab_profile" label="Report" />
          </div>
        </div>
      </div>
    </div>
  );
}
