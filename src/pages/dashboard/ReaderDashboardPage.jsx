import SideNavBar from "../../components/SideNavBar";
import TopNavBar from "../../components/TopNavBar";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import QuickActionButton from "../../components/QuickActionButton";


export default function ReaderDashboardPage() {

  // Sample data (sẽ thay bằng API BE)
  const walletBalance = 120000; // VND
  const activeRentals = [
    { title: "Atomic Habits", dueDate: "2024-08-12", status: "On Loan" },
    { title: "The Hobbit", dueDate: "2024-08-04", status: "Due Soon" },
  ];

  const recentHistory = [
    { title: "1984", returned: "2024-07-15" },
    { title: "Harry Potter", returned: "2024-07-08" },
  ];

  return (
    <div className="flex min-h-screen">
      <SideNavBar />

      <main className="flex-1 p-8">
        <TopNavBar />

        <div className="grid grid-cols-12 gap-8 mt-8">

          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* Wallet Balance */}
            <div className="bg-[#1b2537] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold">My Wallet</h2>

              <p className="text-white text-4xl font-bold mt-4">
                {walletBalance.toLocaleString()} <span className="text-primary text-2xl">VND</span>
              </p>

              <button className="mt-4 px-5 py-3 bg-primary rounded-lg text-white font-semibold hover:bg-primary/80">
                Top-up Wallet
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard title="Books Borrowed" value="12" change="+4 this month" positive />
              <StatCard title="Books Returned" value="45" change="+2 this week" positive />
              <StatCard title="Overdue Books" value="1" change="+1" />
              <StatCard title="Wishlist" value="18" change="Updated" positive />
            </div>

            {/* Active Rentals */}
            <div className="bg-[#1b2537] rounded p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-4">Active Rentals</h2>

              <table className="w-full">
                <thead>
                  <tr className="text-white/60 border-b border-white/10">
                    <th className="py-3 px-4 text-sm">Book Title</th>
                    <th className="py-3 px-4 text-sm">Due Date</th>
                    <th className="py-3 px-4 text-sm">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {activeRentals.map((item, i) => (
                    <tr key={i} className="text-white/90 border-b border-white/10">
                      <td className="py-4 px-4">{item.title}</td>
                      <td className="py-4 px-4">{item.dueDate}</td>
                      <td className="py-4 px-4">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Borrow History */}
            <div className="bg-[#1b2537] rounded p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-4">Recent History</h2>

              <ul className="space-y-4">
                {recentHistory.map((item, i) => (
                  <li key={i} className="text-white/80">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-white/50 text-sm ml-2">Returned: {item.returned}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-4 space-y-8">

            {/* Quick Actions */}
            <div className="bg-[#1b2537] rounded p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-4">Quick Actions</h2>

              <div className="grid grid-cols-2 gap-4">
                <QuickActionButton icon="search" label="Browse Books" />
                <QuickActionButton icon="favorite" label="Wishlist" />
                <QuickActionButton icon="history" label="Borrow History" />
                <QuickActionButton icon="account_balance_wallet" label="Top-up" />
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
