import { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../../api/bookApi";
import { Link } from "react-router-dom";

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================
  // Fetch Books
  // =====================
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn chắc chắn xoá sách này?")) return;
    await deleteBook(id);
    fetchBooks();
  };

  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  return (
    <div className="bg-[#1b2537] p-6 rounded-xl border border-white/10">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">📚 Books Management</h2>

        <Link
          to="/admin/books/add"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
        >
          + Add Book
        </Link>
      </div>

      {/* Empty */}
      {books.length === 0 && (
        <p className="text-white/60 text-center py-8">
          Không có sách nào trong hệ thống.
        </p>
      )}

      {/* Table */}
      {books.length > 0 && (
        <table className="w-full text-white">
          <thead>
            <tr className="text-white/60 border-b border-white/10">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Author</th>
              <th className="py-3 px-4 text-left">Price/Day</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((b) => (
              <tr
                key={b.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="py-3 px-4">{b.title}</td>
                <td className="py-3 px-4">{b.author}</td>
                <td className="py-3 px-4">{b.pricePerDay} $</td>

                <td className="py-3 px-4 flex items-center gap-2">
                  <Link
                    to={`/admin/books/${b.id}`}
                    className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 
               hover:bg-blue-500/20 transition"
                  >
                    View
                  </Link>

                  <Link
                    to={`/admin/books/edit/${b.id}`}
                    className="px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-400 
               hover:bg-yellow-500/20 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="px-3 py-1 rounded-md bg-red-500/10 text-red-400 
               hover:bg-red-500/20 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
