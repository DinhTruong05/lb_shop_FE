import axiosClient from "./axiosClient";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axiosClient.post("/api/upload", formData);
  return res.data; // secure_url
};
