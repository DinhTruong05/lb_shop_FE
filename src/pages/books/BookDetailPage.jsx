import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../api/bookApi";


export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookById(id).then(setBook);
  }, [id]);

  if (!book) return <p>Đang tải...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex gap-6">
        <img
          src={book.image}
          alt={book.title}
          className="w-60 h-80 object-cover rounded shadow"
        />

        <div>
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <p className="text-gray-700 mt-2">Tác giả: {book.author}</p>

          <p className="text-2xl text-blue-600 font-bold mt-4">
            {book.pricePerDay.toLocaleString()}đ / ngày
          </p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {book.description}
          </p>

          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Thuê ngay
          </button>
        </div>
      </div>
    </div>
  );
}
