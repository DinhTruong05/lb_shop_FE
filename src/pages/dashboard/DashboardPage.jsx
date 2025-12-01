export default function DashboardPage() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">📊 Library Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">

        <div className="p-4 bg-blue-100 rounded">
          <p className="text-gray-600">Total Books</p>
          <h3 className="text-xl font-bold">1200</h3>
        </div>

        <div className="p-4 bg-green-100 rounded">
          <p className="text-gray-600">Borrowed</p>
          <h3 className="text-xl font-bold">310</h3>
        </div>

        <div className="p-4 bg-red-100 rounded">
          <p className="text-gray-600">Overdue</p>
          <h3 className="text-xl font-bold">15</h3>
        </div>

      </div>
    </div>
  );
}
