export default function MainHeader() {

  const name = localStorage.getItem("fullName");
  const username = localStorage.getItem("username");

  return (
    <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <h1 className="text-xl font-semibold text-blue-600 tracking-wide">
          Library Manager
        </h1>
      </div>

      {/* User info */}
      <div className="flex items-center gap-4">

        {/* Username + subtitle */}
        <div className="text-right leading-tight">
          <p className="text-gray-800 font-medium">
            Hello, {name || username || "Guest"}
          </p>
          <p className="text-sm text-gray-500">
            Logged in
          </p>
        </div>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full border"
        />

        {/* Logout button */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
}
