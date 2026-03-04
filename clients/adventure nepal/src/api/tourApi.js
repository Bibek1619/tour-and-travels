import axiosInstance from "./axiosInstance";

export const createTourApi = async (formData) => {
  const res = await axiosInstance.post("/tours", formData);
  return res.data;
};

export const getAllToursApi = async (params) => {
  const res = await axiosInstance.get("/tours", { params });
  return res.data;
};

export const updateTourApi = async (id, formData) => {
  const res = await axiosInstance.put(`/tours/${id}`, formData);
  return res.data;
};

export const deleteTourApi = async (id) => {
  const res = await axiosInstance.delete(`/tours/${id}`);
  return res.data;
};