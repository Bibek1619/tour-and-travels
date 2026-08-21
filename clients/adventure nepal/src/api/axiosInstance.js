import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // Render free tier cold starts can take 20–30s, so use a generous timeout
  timeout: import.meta.env.PROD ? 30000 : 10000,
  headers: {
    Accept: "application/json",
  },
});

// Token attach
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

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized – token expired");
      }

      if (error.response.status === 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout – server may be waking up (Render cold start), please retry");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
