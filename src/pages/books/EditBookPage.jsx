import { useEffect, useState } from "react";
import { getBookById, updateBook } from "../../api/bookApi";
import { uploadImage } from "../../api/uploadApi";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    pricePerDay: "",
    description: "",
    image: "",
  });

  const [file, setFile] = useState(null);       // file mới (nếu có)
  const [preview, setPreview] = useState(null); // preview ảnh mới
  const [loading, setLoading] = useState(false);

  // Load thông tin sách
  useEffect(() => {
    getBookById(id).then((data) => {
      setForm(data);
      setPreview(null); // reset preview
    });
  }, [id]);

  // Khi nhập text
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Khi chọn file ảnh mới
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);

    // Preview ảnh mới
    if (f) {
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.image; // mặc định là ảnh cũ

      // Nếu có chọn file mới → upload Cloudinary
      if (file) {
        imageUrl = await uploadImage(file);
      }

      // Gửi form-data update book
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("pricePerDay", form.pricePerDay);
      formData.append("description", form.description);
      formData.append("oldImage", form.image);
      if (file) formData.append("image", file);

      await updateBook(id, formData);

      alert("Cập nhật thành công!");
      navigate("/books");

    } catch (err) {
      console.error("Update error:", err);
      alert("Có lỗi khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">✏️ Chỉnh sửa sách</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Tên sách */}
        <div>
          <label>Tên sách:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* Tác giả */}
        <div>
          <label>Tác giả:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            name="author"
            value={form.author}
            onChange={handleChange}
          />
        </div>

        {/* Ảnh */}
        <div>
          <label>Ảnh sách:</label>
          <input
            type="file"
            className="w-full border p-2 rounded"
            onChange={handleFileChange}
          />

          <div className="mt-3">
            <p className="font-semibold mb-1">Ảnh hiện tại:</p>
            <img
              src={form.image}
              alt="old"
              className="w-40 h-40 object-cover rounded border"
            />

            {preview && (
              <>
                <p className="font-semibold mt-3 mb-1">Ảnh mới (preview):</p>
                <img
                  src={preview}
                  alt="new preview"
                  className="w-40 h-40 object-cover rounded border"
                />
              </>
            )}
          </div>
        </div>

        {/* Giá */}
        <div>
          <label>Giá thuê / ngày:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            name="pricePerDay"
            value={form.pricePerDay}
            onChange={handleChange}
          />
        </div>

        {/* Mô tả */}
        <div>
          <label>Mô tả:</label>
          <textarea
            className="w-full border p-2 rounded"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>

      </form>
    </div>
  );
}
