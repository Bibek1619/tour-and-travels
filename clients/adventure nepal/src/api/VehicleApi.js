import axiosInstance from "@/api/axiosInstance";

export const createVehicleApi = async (formData) => {
  const res = await axiosInstance.post("/vehicles", formData);
  return res.data;
};

export const getAllVehiclesApi = async () => {
  const res = await axiosInstance.get("/vehicles");
  return res.data;
};

export const getVehicleByIdApi = async (id) => {
  const res = await axiosInstance.get(`/vehicles/${id}`);
  return res.data;
};

export const updateVehicleApi = async (id, formData) => {
  const res = await axiosInstance.put(`/vehicles/${id}`, formData);
  return res.data;
};

export const deleteVehicleApi = async (id) => {
  const res = await axiosInstance.delete(`/vehicles/${id}`);
  return res.data;
};
