import axiosInstance from "./axiosInstance";

export const getDashboardStatsApi = async () => {
  const res = await axiosInstance.get("/stats/dashboard");
  return res.data;
};

export const getRevenueStatsApi = async (period = "month") => {
  const res = await axiosInstance.get("/stats/revenue", { params: { period } });
  return res.data;
};

export const getPopularToursApi = async (limit = 5) => {
  const res = await axiosInstance.get("/stats/popular-tours", { params: { limit } });
  return res.data;
};
