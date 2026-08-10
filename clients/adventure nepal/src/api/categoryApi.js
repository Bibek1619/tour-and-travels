import axiosInstance from "./axiosInstance";

export const getAllCategoriesApi = async () => {
  const res = await axiosInstance.get("/categories");
  return res.data;
};

export const getCategoryByIdApi = async (id) => {
  const res = await axiosInstance.get(`/categories/${id}`);
  return res.data;
};

export const updateCategoryApi = async (id, formData) => {
  const res = await axiosInstance.put(`/categories/${id}`, formData);
  return res.data;
};

export const createCategoryApi = async (formData) => {
  const res = await axiosInstance.post("/categories", formData);
  return res.data;
};

export const deleteCategoryApi = async (id) => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
};
