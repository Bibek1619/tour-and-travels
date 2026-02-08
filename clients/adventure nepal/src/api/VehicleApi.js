import axiosInstance from "@/api/axiosInstance";

export const createVehicleApi = async (formData) => {
  const res = await axiosInstance.post("/vehicles", formData); // formData object
  return res.data;
};
