import axiosInstance from "./axiosInstance";

export const createAdventureApi = async (formData) => {
  const res = await axiosInstance.post("/adventures", formData);
  return res.data;
};

export const getAllAdventuresApi = async (params) => {
  const res = await axiosInstance.get("/adventures", { params });
  return res.data;
};

export const getAdventureBySlugApi = async (slug) => {
  const res = await axiosInstance.get(`/adventures/slug/${slug}`);
  return res.data;
};

export const getAdventureByIdApi = async (id) => {
  const res = await axiosInstance.get(`/adventures/${id}`);
  return res.data;
};

export const updateAdventureApi = async (id, formData) => {
  const res = await axiosInstance.put(`/adventures/${id}`, formData);
  return res.data;
};

export const deleteAdventureApi = async (id) => {
  const res = await axiosInstance.delete(`/adventures/${id}`);
  return res.data;
};
