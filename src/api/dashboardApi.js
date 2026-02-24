// src/api/dashboardApi.js
import axiosClient from "./axiosClient";

const BASE_URL = "/dashboard";

// 🟦 1. Lấy summary dashboard
export const getDashboardSummary = async () => {
  const res = await axiosClient.get(`${BASE_URL}/summary`);
  return res.data;
};

// 🟦 2. Lấy danh sách sách đang mượn (Rental Performance)
export const getRentalPerformance = async () => {
  const res = await axiosClient.get(`${BASE_URL}/rentals`);
  return res.data;
};

// 🟦 3. Lấy top 3 người mượn sách nhiều nhất
export const getTopReaders = async () => {
  const res = await axiosClient.get(`${BASE_URL}/top-readers`);
  return res.data;
};

// 🟦 4. Lấy thống kê thể loại sách 30 ngày gần nhất
export const getTopCategories = async () => {
  const res = await axiosClient.get(`${BASE_URL}/top-categories`);
  return res.data;
};

// 🟦 5. Lấy dữ liệu revenue 4 tuần
export const getRevenueStats = async () => {
  const res = await axiosClient.get(`${BASE_URL}/revenue`);
  return res.data;
};
