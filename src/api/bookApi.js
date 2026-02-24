import axiosClient from "./axiosClient";

// Lấy toàn bộ sách
export const getAllBooks = async () => {
  const res = await axiosClient.get("/books");
  return res.data;
};

// Lấy sách theo ID
export const getBookById = async (id) => {
  const res = await axiosClient.get(`/books/${id}`);
  return res.data;
};

// Thêm sách
export const createBook = async (payload) => {
  const res = await axiosClient.post("/books", payload);
  return res.data;
};

// Cập nhật sách
export const updateBook = async (id, formData) => {
    const res = await axiosClient.put(`/books/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };

// Xóa sách
export const deleteBook = async (id) => {
  const res = await axiosClient.delete(`/books/${id}`);
  return res.data;
};
