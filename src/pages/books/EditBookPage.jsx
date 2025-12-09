import { useEffect, useState } from "react";
import { getBookById, updateBook } from "../../api/bookApi";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    pricePerDay: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    getBookById(id).then((data) => setForm(data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (const key in form) {
      if (key !== "image") payload.append(key, form[key]);
    }
    
    if (imageFile) {
      payload.append("image", imageFile); // Chỉ gửi nếu có file mới
    }
    

    await updateBook(id, payload);
    alert("Updated!");
    navigate("/admin/books");
  };

  return (
    <div className="bg-[#1b2537] p-8 rounded-2xl border border-white/10 text-white">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6">Edit Book</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* GRID 2 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TITLE */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full h-12 rounded-lg bg-[#0f172a] border border-white/10 
                        px-4 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
              placeholder="Enter book title"
            />
          </div>

          {/* AUTHOR */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Author</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full h-12 rounded-lg bg-[#0f172a] border border-white/10 
                        px-4 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
              placeholder="Enter author name"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Price per Day
            </label>
            <input
              name="pricePerDay"
              value={form.pricePerDay}
              onChange={handleChange}
              className="w-full h-12 rounded-lg bg-[#0f172a] border border-white/10 
                        px-4 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
              placeholder="10000"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Book Image
            </label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                         file:border-0 file:bg-primary file:text-white 
                         hover:file:bg-primary/80 cursor-pointer"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full h-32 rounded-lg bg-[#0f172a] border border-white/10 
                      px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
            placeholder="Enter description"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-6">
          {/* CANCEL BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/admin/books")}
            className="px-6 py-3 rounded-lg 
             bg-[#292b4d] text-white 
             border border-white/10
             hover:bg-[#353765] 
             transition-all"
          >
            Cancel
          </button>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold 
             hover:bg-primary/80 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
