import axiosInstance from "./axiosInstance";

export const createReviewApi = async (formData) => {
  const res = await axiosInstance.post("/reviews", formData);
  return res.data;
};

export const getReviewsByTourApi = async (tourId, params) => {
  const res = await axiosInstance.get(`/reviews/tour/${tourId}`, { params });
  return res.data;
};

export const getAllReviewsApi = async (params) => {
  const res = await axiosInstance.get("/reviews", { params });
  return res.data;
};

export const updateReviewApi = async (id, formData) => {
  const res = await axiosInstance.put(`/reviews/${id}`, formData);
  return res.data;
};

export const deleteReviewApi = async (id) => {
  const res = await axiosInstance.delete(`/reviews/${id}`);
  return res.data;
};
