import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { toast } from "sonner";

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

      localStorage.setItem("access_token", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res));

      toast.success("Login successful!");

      if (res.role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/reader/home");
    } catch (err) {
      console.error("Login failed", err);
      toast.error("Invalid username or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* LEFT PURPLE GLOW */}
      <div
        className="pointer-events-none absolute -left-[22%] top-[10%] 
                      w-[650px] h-[650px] rounded-full
                      bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.18),rgba(0,0,0,0))]"
      ></div>

      {/* RIGHT CYAN GLOW */}
      <div
        className="pointer-events-none absolute -right-[22%] bottom-[-10%] 
                      w-[650px] h-[650px] rounded-full
                      bg-[radial-gradient(circle_farthest-side,rgba(0,255,255,0.15),rgba(0,0,0,0))]"
      ></div>

      {/* LOGIN CARD */}
      <div
        className="relative w-full max-w-md p-10 rounded-2xl border border-white/10 
                      bg-[#121212]/80 shadow-[0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        {/* TITLE */}
        <h1 className="text-center text-white text-2xl font-bold">
          Library Admin Portal
        </h1>
        <p className="text-center text-gray-400 text-sm mt-1">
          Sign in to your account
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          {/* Username */}
          <div>
            <label className="text-gray-300 text-sm font-medium">
              Username or Email
            </label>
            <div className="relative mt-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                person
              </span>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full h-12 rounded-lg bg-[#1e1e1e] text-white pl-10 pr-4 
                           placeholder-gray-500 border border-transparent 
                           focus:border-cyan-400 focus:outline-none"
                placeholder="Enter your username or email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                lock
              </span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full h-12 rounded-lg bg-[#1e1e1e] text-white pl-10 pr-4 
                           placeholder-gray-500 border border-transparent 
                           focus:border-cyan-400 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <button
            type="button"
            className="text-xs text-cyan-300 hover:text-cyan-200 underline-offset-4 
             hover:underline transition-colors cursor-pointer p-0 bg-transparent border-0"
          >
            Forgot Password?
          </button>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 
                       shadow-[0_0_20px_rgba(0,255,255,0.4)] text-black font-semibold 
                       hover:opacity-90 transition"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <span
            className="text-cyan-300 cursor-pointer hover:text-cyan-200"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
