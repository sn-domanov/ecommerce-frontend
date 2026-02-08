import axios from "axios";

// Configure axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add response interceptor (handle 401 + refresh)
// Prevent infinite refresh loops (using single-flight pattern)
let isRefreshing = false;
let refreshPromise = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If not 401, just fail
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Avoid retrying refresh endpoint itself
    if (originalRequest.url.includes("/auth/jwt/refresh/")) {
      return Promise.reject(error);
    }

    // Avoid infinite retry loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = apiClient.post("/auth/jwt/refresh/");
      }

      await refreshPromise;
      isRefreshing = false;

      // Retry original request (cookies updated by backend)
      return apiClient(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
