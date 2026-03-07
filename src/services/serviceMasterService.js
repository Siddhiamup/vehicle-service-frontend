// // ============================================================
// // SERVICE MASTER SERVICE (ADMIN)
// // Handles service-related backend calls
// // ============================================================

// import axios from "axios";

// // Base API URL
// const API_URL = `${import.meta.env.VITE_API_BASE_URL}/services`;
// // ============================================================
// // GET ALL SERVICES
// // Calls: GET /services/all
// // ============================================================

// export const getAllServices = async () => {
//   const token = localStorage.getItem("token");

//   const response = await axios.get(`${API_URL}/all`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };

// // ============================================================
// // ADD NEW SERVICE
// // Calls: POST /services/add
// // ============================================================

// export const addService = async (serviceData) => {
//   const token = localStorage.getItem("token");

//   const response = await axios.post(
//     `${API_URL}/add`,
//     serviceData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };


// // ============================================================
// // UPDATE SERVICE (REUSE SAME API)
// // ============================================================

// export const updateService = async (serviceId, serviceData) => {
//   const token = localStorage.getItem("token");

//   const response = await axios.put(
//     `${API_URL}/update/${serviceId}`,
//     serviceData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     }
//   );

//   return response.data;
// };

// // ============================================================
// // DELETE SERVICE
// // Calls: DELETE /services/delete/{id}
// // ============================================================

// export const deleteService = async (serviceId) => {
//   const token = localStorage.getItem("token");

//   await axios.delete(`${API_URL}/delete/${serviceId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };


import api from "./api";

// GET SERVICES
export const getAllServices = async () => {
  const response = await api.get("/services/all");
  return response.data;
};

// ADD SERVICE
export const addService = async (serviceData) => {
  const response = await api.post("/services/add", serviceData);
  return response.data;
};

// UPDATE SERVICE
export const updateService = async (serviceId, serviceData) => {
  const response = await api.put(`/services/update/${serviceId}`, serviceData);
  return response.data;
};

// DELETE SERVICE
export const deleteService = async (serviceId) => {
  await api.delete(`/services/delete/${serviceId}`);
};