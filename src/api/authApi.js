import axiosClient from "./axiosClient";

export const authApi = {

  login: async (username, password) => {
    const res = await axiosClient.post("/auth/login", {
      username,
      password,
    });
    return res.data;
  },

  register: async (data) => {
    const res = await axiosClient.post("/auth/register", data);
    return res.data;
  },

  getProfile: async () => {
    const res = await axiosClient.get("/auth/me");
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  }
};
