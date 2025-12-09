import { useEffect, useState } from "react";

import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import QuickActionButton from "../../components/QuickActionButton";
import ReaderListItem from "../../components/ReaderListItem";

import { getDashboardSummary } from "../../api/dashboardApi";

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    overdueBooks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error("❌ Error fetching dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const rentalData = [
    { title: "The Midnight Library", member: "Alex Johnson", dueDate: "2024-08-15", status: "On Loan" },
    { title: "Project Hail Mary", member: "Maria Garcia", dueDate: "2024-07-28", status: "Overdue" },
    { title: "Dune", member: "Chen Wei", dueDate: "2024-08-05", status: "On Loan" },
    { title: "Klara and the Sun", member: "Fatima", dueDate: "2024-07-30", status: "Due Soon" },
  ];

  const topReaders = [
    { rank: 1, name: "Angela Reed", books: 32, avatarUrl: "https://i.pravatar.cc/300?img=8" },
    { rank: 2, name: "Brandon Wallace", books: 28, avatarUrl: "https://i.pravatar.cc/300?img=10" },
    { rank: 3, name: "Cynthia Lopez", books: 25, avatarUrl: "https://i.pravatar.cc/300?img=12" },
  ];

  if (loading) {
    return <p className="text-white text-lg mt-6">Loading dashboard...</p>;
  }

  return (
    <div className="grid grid-cols-12 gap-8">

      {/* LEFT COLUMN */}
      <div className="col-span-12 lg:col-span-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Total Books" value={summary.totalBooks} change="+12 this month" positive />
          <StatCard title="Borrowed" value={summary.borrowedBooks} change="-2 today" />
          <StatCard title="Overdue" value={summary.overdueBooks} change="+1" />
          <StatCard title="Monthly Revenue" value="$5,432" change="+10.1%" positive />
        </div>

        {/* Rental Table */}
        <div className="bg-[#1b2537] rounded p-6 border border-white/10">
          <div className="flex justify-between mb-4">
            <h2 className="text-white text-xl font-bold">Rental Performance</h2>
            <a href="#" className="text-primary text-sm font-semibold">View All</a>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-white/60 border-b border-white/10">
                <th className="py-3 px-4 text-sm">Book Title</th>
                <th className="py-3 px-4 text-sm">Member</th>
                <th className="py-3 px-4 text-sm">Due Date</th>
                <th className="py-3 px-4 text-sm">Status</th>
              </tr>
            </thead>

            <tbody>
              {rentalData.map((row, i) => (
                <tr key={i} className="text-white/90 border-b border-white/10">
                  <td className="py-4 px-4">{row.title}</td>
                  <td className="py-4 px-4">{row.member}</td>
                  <td className="py-4 px-4">{row.dueDate}</td>
                  <td className="py-4 px-4"><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar Chart */}
        <div className="bg-[#1b2537] rounded p-6 border border-white/10">
          <p className="text-white text-xl font-bold">Top Categories</p>
          <p className="text-white/60 text-sm mb-6">Last 30 Days</p>

          <div className="grid grid-flow-col gap-6 items-end text-center">
            <div>
              <div className="w-6 mx-auto bg-primary rounded-t" style={{ height: "50px" }}></div>
              <p className="text-white/60 text-xs mt-2">Fiction</p>
            </div>
            <div>
              <div className="w-6 mx-auto bg-primary rounded-t" style={{ height: "20px" }}></div>
              <p className="text-white/60 text-xs mt-2">Sci-fi</p>
            </div>
            <div>
              <div className="w-6 mx-auto bg-primary rounded-t" style={{ height: "90px" }}></div>
              <p className="text-white/60 text-xs mt-2">Mystery</p>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-[#1b2537] rounded p-6 border border-white/10">
          <p className="text-white text-xl font-bold">Revenue</p>
          <p className="text-white/60 text-sm mb-4">Last 4 weeks</p>

          <div className="h-40">
            <svg viewBox="0 0 300 150" width="100%" height="100%">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3c83f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3c83f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M0 120 Q50 20 100 60 T200 40 T300 120 V150 H0 Z"
                fill="url(#chartGradient)"
              />

              <path
                d="M0 120 Q50 20 100 60 T200 40 T300 120"
                stroke="#3c83f6"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>

          <div className="flex justify-between text-white/60 text-xs mt-2">
            <p>Week 1</p>
            <p>Week 2</p>
            <p>Week 3</p>
            <p>Week 4</p>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-12 lg:col-span-4 space-y-8">

        <div className="bg-[#1b2537] rounded p-6 border border-white/10">
          <h2 className="text-white text-xl font-bold mb-4">Top Readers</h2>
          <ul className="space-y-4">
            {topReaders.map((item) => (
              <ReaderListItem key={item.rank} {...item} />
            ))}
          </ul>
        </div>

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
