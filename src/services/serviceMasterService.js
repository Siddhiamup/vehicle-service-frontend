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