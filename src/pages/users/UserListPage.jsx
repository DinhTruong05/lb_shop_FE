import { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";
import { Link } from "react-router-dom";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  /* =============================
     LOAD USERS
  ============================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await userApi.getAllUsers();
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* =============================
     DELETE USER
  ============================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setDeletingId(id);
      await userApi.deleteUser(id);

      // Remove user from state
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete user error:", err);
      alert("Failed to delete user !");
    } finally {
      setDeletingId(null);
    }
  };

  /* =============================
     LOADING UI
  ============================= */
  if (loading) {
    return (
      <div className="bg-[#1b2537] p-6 rounded-xl border border-white/10">
        <p className="text-white text-center py-10">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1b2537] p-6 rounded-xl border border-white/10">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">👥 Users Management</h2>

        <Link
          to="/admin/users/add"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
        >
          + Add User
        </Link>
      </div>

      {/* EMPTY STATE */}
      {users.length === 0 && (
        <p className="text-white/60 text-center py-8">No users found.</p>
      )}

      {/* TABLE */}
      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-white border-collapse">
            <thead>
              <tr className="text-white/60 border-b border-white/10">
                <th className="py-3 px-4 text-left">Avatar</th>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left w-[180px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users
                .filter((u) => u.role !== "ADMIN")
                .map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    {/* AVATAR */}
                    <td className="py-3 px-4">
                      <img
                        src={u.avatar || `https://i.pravatar.cc/100?u=${u.id}`}
                        className="w-10 h-10 rounded-full border border-white/10 object-cover"
                        alt="avatar"
                      />
                    </td>

                    {/* FULL NAME */}
                    <td className="py-3 px-4">{u.fullName}</td>

                    {/* USERNAME */}
                    <td className="py-3 px-4">{u.username}</td>

                    {/* EMAIL */}
                    <td className="py-3 px-4">{u.email}</td>

                    {/* ROLE */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          u.role === "ADMIN"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-purple-500/20 text-purple-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-4">
                        <Link
                          to={`/admin/users/${u.id}`}
                          className="text-primary hover:underline"
                        >
                          View
                        </Link>

                        <Link
                          to={`/admin/users/edit/${u.id}`}
                          className="text-yellow-400 hover:underline"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(u.id)}
                          className="text-red-400 hover:underline disabled:opacity-40"
                          disabled={deletingId === u.id}
                        >
                          {deletingId === u.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
