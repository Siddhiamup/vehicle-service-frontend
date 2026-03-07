// ============================================================
// BOOKING API SERVICE
// ============================================================

// import api from "../api/axiosConfig";
import api from "./api";

// ============================================================
// CREATE BOOKING
// ============================================================

export const createBooking = async (vehicleId, serviceId, bookingData) => {
  const response = await api.post(
    `/bookings/create/${vehicleId}/${serviceId}`,
    bookingData
  );
  return response.data;
};

// ============================================================
// GET BOOKING HISTORY BY VEHICLE
// ============================================================

export const getBookingHistory = async (vehicleId) => {
  const response = await api.get(`/bookings/history/${vehicleId}`);
  return response.data;
};

// ============================================================
// CANCEL BOOKING
// ============================================================

export const cancelBooking = async (bookingId) => {
  const response = await api.patch(`/bookings/cancel/${bookingId}`);
  return response.data;
};

// ============================================================
// GET ALL SERVICES
// ============================================================

export const getAllServices = async () => {
  const response = await api.get("/services/all");
  return response.data;
};

// ============================================================
// ADVISOR → GET DAILY BOOKINGS
// ============================================================

export const getDailyBookings = async (date) => {
  const response = await api.get(`/bookings/dashboard/${date}`);
  return response.data;
};

// ============================================================
// ADVISOR → UPDATE BOOKING STATUS
// ============================================================

export const updateBookingStatus = async (bookingId, status) => {
  const response = await api.patch(
    `/bookings/updateStatus/${bookingId}?status=${status}`
  );
  return response.data;
};
