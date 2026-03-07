// // ============================================================
// // AXIOS API CONFIGURATION
// // Centralized API instance with JWT support
// // ============================================================

// import axios from "axios";

// // Create axios instance
// const api = axios.create({
//   baseURL: "https://vehicle-service-backend-production.up.railway.app",
// });

// // ============================================================
// // Attach JWT token to every request
// // ============================================================

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;


// src/services/api.js

import axios from "axios";

// ============================================================
// Create Axios Instance
// ============================================================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
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