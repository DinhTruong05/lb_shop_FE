import { useState } from "react";
import { authApi } from "../../api/authApi";
import { uploadApi } from "../../api/uploadApi"; // ⭐ API upload riêng
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: "",       // ⭐ Lưu URL từ server
    role: "READER",   // ⭐ ALWAYS READER
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  // Gen input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ⭐ Upload file avatar → lấy URL từ server
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview ảnh
    setPreview(URL.createObjectURL(file));

    try {
      const url = await uploadApi.uploadAvatar(file);
      console.log("🔥 Avatar uploaded URL:", url);

      setForm((prev) => ({
        ...prev,
        avatar: url,
        role: "READER",
      }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload avatar failed!");
    }
  };

  // Submit form đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🔥 FORM SUBMIT:", form);

      await authApi.register(form);

      alert("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-md border">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="mb-4 text-red-500 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label className="font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* ⭐ Upload Avatar */}
          <div>
            <label className="font-medium">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="input"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20 rounded-full mt-2 object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
