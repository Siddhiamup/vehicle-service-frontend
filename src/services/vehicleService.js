// ============================================================
// VEHICLE API SERVICE
// ============================================================

// import api from "../api/axiosConfig";
import api from "./api";

// ============================================================
// ADD VEHICLE
// ============================================================

export const addVehicle = async (vehicleData) => {

    const response = await api.post("/vehicles/add", vehicleData);

    return response.data;
};

// ============================================================
// GET MY VEHICLES
// ============================================================

export const getMyVehicles = async () => {

    const response = await api.get("/vehicles/my");

    return response.data;
};

// ============================================================
// DELETE VEHICLE
// ============================================================

export const deleteVehicle = async (vehicleId) => {

    const response = await api.delete(`/vehicles/${vehicleId}`);

    return response.data;
};

// ============================================================
// UPDATE VEHICLE
// ============================================================

export const updateVehicle = async (vehicleId, vehicleData) => {

    const response = await api.put(
        `/vehicles/update/${vehicleId}`,
        vehicleData
    );

    return response.data;
};
