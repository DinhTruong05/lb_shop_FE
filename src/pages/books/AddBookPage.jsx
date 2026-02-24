import { useState } from "react";
import { createBook } from "../../api/bookApi";
import { useNavigate } from "react-router-dom";

export default function AddBookPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    pricePerDay: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn bị FormData để gửi file + text
    const data = new FormData();
    data.append("title", form.title);
    data.append("author", form.author);
    data.append("pricePerDay", form.pricePerDay);
    data.append("description", form.description);
    if (imageFile) data.append("image", imageFile);

    await createBook(data);

    alert("Book added successfully!");
    navigate("/admin/books");
  };

  const inputClass =
    "w-full rounded-xl bg-[#0f172a] border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/70";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#1b2537] p-8 rounded-2xl border border-white/10 shadow-xl">
        <h2 className="text-white text-2xl font-bold mb-6">Add New Book</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/70 text-sm">Title</label>
              <input
                name="title"
                className={inputClass}
                placeholder="Book title..."
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-white/70 text-sm">Author</label>
              <input
                name="author"
                className={inputClass}
                placeholder="Author..."
                value={form.author}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-white/70 text-sm">Price Per Day</label>
            <input
              type="number"
              min="0"
              name="pricePerDay"
              className={inputClass}
              placeholder="10"
              value={form.pricePerDay}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-white/70 text-sm">Book Cover Image</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-primary px-4 py-2 rounded-lg text-white hover:bg-primary/80 transition">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 rounded-lg object-cover border border-white/20"
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-white/70 text-sm">Description</label>
            <textarea
              name="description"
              className={`${inputClass} min-h-[120px]`}
              placeholder="Short summary..."
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-white/20 text-white/60 rounded-lg hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-primary rounded-lg text-white font-semibold hover:bg-primary/80 shadow-lg shadow-primary/20"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
