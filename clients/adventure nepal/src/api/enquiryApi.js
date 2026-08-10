import axiosInstance from "./axiosInstance";

export const createEnquiryApi = async (formData) => {
  const res = await axiosInstance.post("/enquiries", formData);
  return res.data;
};

export const getAllEnquiriesApi = async (params) => {
  const res = await axiosInstance.get("/enquiries", { params });
  return res.data;
};

export const getEnquiryByIdApi = async (id) => {
  const res = await axiosInstance.get(`/enquiries/${id}`);
  return res.data;
};

export const updateEnquiryApi = async (id, formData) => {
  const res = await axiosInstance.put(`/enquiries/${id}`, formData);
  return res.data;
};

export const deleteEnquiryApi = async (id) => {
  const res = await axiosInstance.delete(`/enquiries/${id}`);
  return res.data;
};
