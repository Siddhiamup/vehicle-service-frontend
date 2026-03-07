// ============================================================
// AXIOS API CONFIGURATION
// Centralized API instance with JWT support
// ============================================================

import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://vehicle-service-backend-production.up.railway.app",
});

// ============================================================
// Attach JWT token to every request
// ============================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
