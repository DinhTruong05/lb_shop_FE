// src/api/dashboardApi.js
import axiosClient from "./axiosClient";

// Gọi API lấy dữ liệu dashboard
export const getDashboardSummary = async () => {
  const res = await axiosClient.get("/api/dashboard/summary");
  return res.data;
};
