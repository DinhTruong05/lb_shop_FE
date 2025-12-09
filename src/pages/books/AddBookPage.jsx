import { useState } from "react";
import { createBook } from "../../api/bookApi";
import { useNavigate } from "react-router-dom";

export default function AddBookPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    image: "",
    description: "",
    pricePerDay: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBook(form);

    alert("Book added!");
    navigate("/admin/books");
  };

  return (
    <div className="bg-[#1b2537] p-6 rounded-xl border border-white/10">
      <h2 className="text-white text-2xl font-bold mb-4">Add New Book</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="form-input" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input className="form-input" name="author" placeholder="Author" value={form.author} onChange={handleChange} />
        <input className="form-input" name="pricePerDay" placeholder="Price per day" value={form.pricePerDay} onChange={handleChange} />
        <input className="form-input" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <textarea className="form-input h-28" name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>

        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80">
          Add Book
        </button>
      </form>
    </div>
  );
}
