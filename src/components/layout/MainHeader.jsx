export default function MainHeader() {
  return (
    <header className="h-14 bg-white shadow flex items-center px-4 justify-between">
      <h1 className="text-xl font-semibold text-blue-600">
        📚 Library Manager
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">Hello, Librarian</span>
        <button className="px-3 py-1 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>
    </header>
  );
}
