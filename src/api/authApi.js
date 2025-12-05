import axiosClient from "./axiosClient";

export const authApi = {
  // LOGIN
  login: async (username, password) => {
    const res = await axiosClient.post("/api/auth/login", {
      username,
      password,
    });
    return res.data;
  },

  // REGISTER ⭐ NEW
  register: async (data) => {
    const res = await axiosClient.post("/api/auth/register", data);
    return res.data;
  },

  // GET PROFILE
  getProfile: async () => {
    const res = await axiosClient.get("/api/auth/me");
    return res.data;
  },
};
