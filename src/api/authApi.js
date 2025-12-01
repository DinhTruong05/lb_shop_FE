import axiosClient from "./axiosClient";

export const authApi = {
  login: async (username, password) => {
    const res = await axiosClient.post("/auth/login", {
      username,
      password,
    });
    return res.data;
  },

  getProfile: async () => {
    const res = await axiosClient.get("/auth/me");
    return res.data;
  },
};
