import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { toast } from "sonner";
import "../../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authApi.login(form.username, form.password);

      console.log("Login Response: ", res);

      localStorage.setItem("access_token", res.accessToken);
      localStorage.setItem("role", res.role);
      localStorage.setItem("fullName", res.fullName);


      toast.success("Đăng nhập thành công!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">

      {/* LEFT SIDE */}
      <div className="login-left">
        <img src="/images/thuvien.jpg" className="login-left-img" alt="travel" />

        <div className="login-left-overlay">
          <h2 className="login-left-title">Library Hub</h2>
          <p className="login-left-desc">
            Find peace in every page.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-box">

          <h2 className="login-title">Welcome</h2>
          <p className="login-subtitle">Login with Email</p>

          <div className="mb-4">
            <label className="login-label">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="login-input"
              placeholder="Enter username"
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label className="login-label">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="login-input"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Processing..." : "Login"}
          </button>

          <p className="login-register">
            Don’t have an account? <span>Register now</span>
          </p>
        </form>
      </div>
    </div>
  );
}
