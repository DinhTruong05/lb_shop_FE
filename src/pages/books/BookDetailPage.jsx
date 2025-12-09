import { useEffect, useState } from "react";
import { getBookById } from "../../api/bookApi";
import { useParams, useNavigate } from "react-router-dom";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookById(id).then(setBook);
  }, [id]);

  if (!book) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-[#1b2537] p-6 rounded-xl border border-white/10 text-white">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/admin/books")}
        className="mb-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 
                   transition font-medium"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Back to Book List
      </button>

      <h2 className="text-3xl font-bold">{book.title}</h2>
      <p className="text-white/70 mt-2">{book.author}</p>

      <img src={book.image} className="w-48 rounded-lg my-4" />

      <p className="mt-4">{book.description}</p>

      <p className="mt-4 font-bold text-primary text-xl">
        {book.pricePerDay} $ / day
      </p>
    </div>
  );
}
