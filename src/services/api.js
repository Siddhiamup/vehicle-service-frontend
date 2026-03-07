import axios from "axios";

// ============================================================
// Create Axios Instance
// ============================================================

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://vehicle-service-backend-production.up.railway.app"
});
// ============================================================
// Automatically Attach JWT Token
// ============================================================

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  // Do not attach token for auth endpoints
  if (token && !config.url.includes("/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default api;