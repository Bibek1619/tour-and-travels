import axiosInstance from "@/api/axiosInstance";

export const createVehicleApi = async (formData) => {
  const res = await axiosInstance.post("/vehicles", formData); // formData object
  return res.data;
};


export const getAllVehiclesApi =async ()=>{
  const res=await axiosInstance.get("/vehicles");
  return res.data;

}
