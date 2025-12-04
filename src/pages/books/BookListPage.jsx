import { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../../api/bookApi";
import { Link } from "react-router-dom";

export default function BookListPage() {
  const [books, setBooks] = useState([]);

  // Load danh sách sách
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getAllBooks();
    setBooks(data);
  };

  // Delete book
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa sách này?")) return;

    await deleteBook(id);

    // Cập nhật lại list mà không reload trang
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📚 Danh sách sách</h2>

        <Link
          to="/books/add"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Thêm sách
        </Link>
      </div>

      {/* Grid hiển thị sách */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border p-3 rounded bg-white shadow hover:shadow-lg transition"
          >
            <Link to={`/books/${book.id}`}>
              <img
                src={book.image}
                className="w-full h-48 object-cover rounded"
              />

              <p className="mt-2 font-semibold line-clamp-2">{book.title}</p>

              <p className="text-blue-600 font-bold">
                {book.pricePerDay.toLocaleString()}đ / ngày
              </p>
            </Link>

            <div className="flex justify-between mt-3">
              <Link
                to={`/books/edit/${book.id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(book.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
