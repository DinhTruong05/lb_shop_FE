import axiosClient from "./axiosClient";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axiosClient.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // secure_url
};
