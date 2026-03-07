// ============================================================
// Authentication API Service
// Handles Login & Register API calls
// ============================================================

import api from "./api";

// ============================================================
// LOGIN API
// ============================================================

export const loginUser = async (loginData) => {

    const response = await api.post("/auth/login", loginData);

    return response.data;
};

// ============================================================
// REGISTER API
// ============================================================

export const registerUser = async (registerData) => {

    const response = await api.post("/auth/register", registerData);

    return response.data;
};
