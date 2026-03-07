// ============================================================
// Axios Global Configuration
// Handles Base URL & JWT Token Attachment
// ============================================================

import axios from "axios";

// ============================================================
// Create Axios Instance
// ============================================================

const api = axios.create({

    // Backend base URL
    baseURL: "https://vehicle-service-backend-production.up.railway.app",

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
