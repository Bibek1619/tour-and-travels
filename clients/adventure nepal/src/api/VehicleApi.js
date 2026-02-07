import axiosInstance from "@/api/axiosInstance";

export const createVehicleApi = async (data) => {
  const res = await axiosInstance.post("/vehicles", data);
  return res.data;
};
