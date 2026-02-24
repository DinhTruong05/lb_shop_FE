import axiosClient from "./axiosClient";

export const uploadApi = {
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.post("/upload/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data; // URL trả về
  }
};
