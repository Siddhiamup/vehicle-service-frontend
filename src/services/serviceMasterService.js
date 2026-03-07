// ============================================================
// SERVICE MASTER SERVICE (ADMIN)
// Handles service-related backend calls
// ============================================================

import axios from "axios";

// Base API URL
const API_URL = "https://vehicle-service-backend-production.up.railway.app/services";

// ============================================================
// GET ALL SERVICES
// Calls: GET /services/all
// ============================================================

export const getAllServices = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ============================================================
// ADD NEW SERVICE
// Calls: POST /services/add
// ============================================================

export const addService = async (serviceData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/add`,
    serviceData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ============================================================
// UPDATE SERVICE (REUSE SAME API)
// ============================================================

export const updateService = async (serviceId, serviceData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/update/${serviceId}`,
    serviceData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};

// ============================================================
// DELETE SERVICE
// Calls: DELETE /services/delete/{id}
// ============================================================

export const deleteService = async (serviceId) => {
  const token = localStorage.getItem("token");

  await axios.delete(`${API_URL}/delete/${serviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
