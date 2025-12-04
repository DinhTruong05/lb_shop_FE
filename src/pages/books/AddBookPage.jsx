import { useState } from "react";
import { createBook } from "../../api/bookApi";
import { uploadImage } from "../../api/uploadApi";
import { useNavigate } from "react-router-dom";

export default function AddBookPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    pricePerDay: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);

    // ⭐ Preview ảnh
    if (f) {
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Vui lòng chọn ảnh!");
      return;
    }

    setLoading(true);

    try {
      // 1) Upload file lên Cloudinary
      const imageUrl = await uploadImage(file);

      // 2) Tạo sách
      await createBook({
        ...form,
        image: imageUrl,
        pricePerDay: Number(form.pricePerDay),
      });

      alert("Thêm sách thành công!");
      navigate("/books");

    } catch (err) {
      console.error("Error creating book:", err);
      alert("Lỗi khi thêm sách!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">➕ Thêm Sách Mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TÊN SÁCH */}
        <input
          type="text"
          name="title"
          placeholder="Tên sách"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* TÁC GIẢ */}
        <input
          type="text"
          name="author"
          placeholder="Tác giả"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        {/* FILE ẢNH */}
        <div>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={handleFileChange}
            required
          />

          {/* ⭐ Hiển thị preview ảnh */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 w-40 h-40 object-cover rounded border"
            />
          )}
        </div>

        {/* GIÁ THUÊ */}
        <input
          type="number"
          name="pricePerDay"
          placeholder="Giá thuê / ngày"
          className="w-full border p-2 rounded"
          required
          min={1000}
          onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
        />

        {/* MÔ TẢ */}
        <textarea
          name="description"
          placeholder="Mô tả..."
          rows="4"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Đang tải ảnh..." : "Thêm Sách"}
        </button>

      </form>
    </div>
  );
}
