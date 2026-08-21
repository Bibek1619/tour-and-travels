import axios from "axios";
const axiosInstance =axios.create({
    // baseURL:"http://localhost:5000/api",
    baseURL:"https://tour-and-travels-k3qk.onrender.com/api",

    timeout:10000,
    headers:{
       Accept:"application/json",


    },

});

//token attach
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Optional: logout user automatically
        console.warn("Unauthorized – token expired");
      }

      if (error.response.status === 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;