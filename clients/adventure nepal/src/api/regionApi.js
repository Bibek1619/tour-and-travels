import axiosInstance from "@/api/axiosInstance";

export const createRegionApi = async (formData) => {
  const res = await axiosInstance.post("/regions", formData);
  return res.data;
};

export const getAllRegionsApi = async () => {
  const res = await axiosInstance.get("/regions");
  return res.data;
};

export const getRegionByIdApi = async (id) => {
  const res = await axiosInstance.get(`/regions/${id}`);
  return res.data;
};

export const updateRegionApi = async (id, formData) => {
  const res = await axiosInstance.put(`/regions/${id}`, formData);
  return res.data;
};

export const deleteRegionApi = async (id) => {
  const res = await axiosInstance.delete(`/regions/${id}`);
  return res.data;
};
