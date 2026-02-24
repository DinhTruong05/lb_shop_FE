import axiosClient from "./axiosClient";

export const userApi = {
  // =============================
  // GET ALL USERS
  // =============================
  getAllUsers: async () => {
    const res = await axiosClient.get("/admin/users");
    return res.data;
  },

  // =============================
  // GET USER DETAIL
  // =============================
  getUserById: async (id) => {
    const res = await axiosClient.get(`/admin/users/${id}`);
    return res.data;
  },

  // =============================
  // CREATE NEW USER
  // =============================
  createUser: async (data) => {
    // data có thể là JSON hoặc FormData
    const res = await axiosClient.post("/admin/users", data, {
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return res.data;
  },

  // =============================
  // UPDATE USER
  // =============================
  updateUser: async (id, data) => {
    const res = await axiosClient.put(`/admin/users/${id}`, data, {
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return res.data;
  },

  // =============================
  // DELETE USER
  // =============================
  deleteUser: async (id) => {
    const res = await axiosClient.delete(`/admin/users/${id}`);
    return res.data;
  },
};
