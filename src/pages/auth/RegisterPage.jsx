import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { toast } from "sonner";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await authApi.register({
        fullName: form.fullName,
        email: form.email,
        username: form.username,
        password: form.password,
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="bg-background-dark min-h-screen flex items-center justify-center p-6 font-display">

      <div className="w-full max-w-md flex flex-col items-center gap-8">

        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-4xl text-primary">local_library</span>
          <h1 className="text-white text-2xl font-bold">Library System</h1>
        </div>

        {/* Card */}
        <div className="w-full flex flex-col gap-8 rounded-xl bg-[#101723] p-8 border border-white/10 shadow-xl">

          {/* Title */}
          <div className="flex flex-col gap-2">
            <p className="text-white text-3xl font-black tracking-tight">Create Your Account</p>
            <p className="text-[#90a7cb] text-base">Join the Library System to manage rentals and more.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Full Name */}
            <label className="flex flex-col flex-1">
              <p className="text-white text-sm font-medium mb-2">Full Name</p>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="h-12 bg-[#223149] text-white rounded-lg p-3 placeholder-[#90a7cb]
                           focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder="Enter your full name"
              />
            </label>

            {/* Email */}
            <label className="flex flex-col flex-1">
              <p className="text-white text-sm font-medium mb-2">Email Address</p>
              <div className="flex">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="h-12 bg-[#223149] text-white rounded-l-lg flex-1 p-3
                             placeholder-[#90a7cb] focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="Enter your email address"
                />
                <div className="bg-[#223149] px-3 flex items-center rounded-r-lg text-[#90a7cb]">
                  <span className="material-symbols-outlined">mail</span>
                </div>
              </div>
            </label>

            {/* Username */}
            <label className="flex flex-col flex-1">
              <p className="text-white text-sm font-medium mb-2">Username</p>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="h-12 bg-[#223149] text-white rounded-lg p-3 placeholder-[#90a7cb]
                           focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder="Choose a username"
              />
            </label>

            {/* Password */}
            <label className="flex flex-col flex-1">
              <p className="text-white text-sm font-medium mb-2">Password</p>
              <div className="flex">
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="h-12 bg-[#223149] text-white rounded-l-lg flex-1 p-3 
                             placeholder-[#90a7cb] focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="bg-[#223149] px-3 flex items-center rounded-r-lg text-[#90a7cb]"
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </label>

            {/* Confirm Password */}
            <label className="flex flex-col flex-1">
              <p className="text-white text-sm font-medium mb-2">Confirm Password</p>
              <div className="flex">
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="h-12 bg-[#223149] text-white rounded-l-lg flex-1 p-3 
                             placeholder-[#90a7cb] focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="bg-[#223149] px-3 flex items-center rounded-r-lg text-[#90a7cb]"
                >
                  <span className="material-symbols-outlined">visibility_off</span>
                </button>
              </div>
            </label>

            {/* Password strength indicator */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-white text-sm">Password Strength</p>
                <p className="text-primary text-sm font-bold">Weak</p>
              </div>
              <div className="h-2 bg-[#314668] rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="h-12 rounded-lg bg-primary text-white font-bold 
                         shadow-[0_0_15px_rgba(60,131,246,0.5)]
                         hover:shadow-[0_0_25px_rgba(60,131,246,0.7)]"
            >
              Register
            </button>

            <p className="text-[#90a7cb] text-sm text-center">
              Already have an account?{" "}
              <span className="text-primary cursor-pointer hover:text-primary/80"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
