import axiosInstance from "./axiosInstance";

export const createDailyRouteApi = async (formData) => {
  const res = await axiosInstance.post("/daily-routes", formData);
  return res.data;
};

export const getAllDailyRoutesApi = async (params) => {
  const res = await axiosInstance.get("/daily-routes", { params });
  return res.data;
};

export const getDailyRouteByIdApi = async (id) => {
  const res = await axiosInstance.get(`/daily-routes/${id}`);
  return res.data;
};

export const updateDailyRouteApi = async (id, formData) => {
  const res = await axiosInstance.put(`/daily-routes/${id}`, formData);
  return res.data;
};

export const deleteDailyRouteApi = async (id) => {
  const res = await axiosInstance.delete(`/daily-routes/${id}`);
  return res.data;
};
