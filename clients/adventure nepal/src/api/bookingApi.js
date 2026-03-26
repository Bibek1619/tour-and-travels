import axiosInstance from "./axiosInstance";

export const createBookingApi = async (bookingData) => {
  const res = await axiosInstance.post("/bookings", bookingData);
  return res.data;
};

export const getAllBookingsApi = async (params) => {
  const res = await axiosInstance.get("/bookings", { params });
  return res.data;
};

export const getBookingByIdApi = async (id) => {
  const res = await axiosInstance.get(`/bookings/${id}`);
  return res.data;
};

export const updateBookingStatusApi = async (id, status) => {
  const res = await axiosInstance.patch(`/bookings/${id}/status`, { status });
  return res.data;
};

export const deleteBookingApi = async (id) => {
  const res = await axiosInstance.delete(`/bookings/${id}`);
  return res.data;
};

export const getRecentBookingsApi = async (limit = 10) => {
  const res = await axiosInstance.get("/bookings/recent", { params: { limit } });
  return res.data;
};
