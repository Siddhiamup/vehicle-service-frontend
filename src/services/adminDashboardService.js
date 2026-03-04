// ============================================================
// ADMIN DASHBOARD SERVICE
// Handles admin analytics APIs
// ============================================================

import api from "./api";

// ============================================================
// GET ADMIN DASHBOARD STATS
// ============================================================
// Calls: GET /admin/dashboard/stats
// Returns summary numbers for dashboard cards
// ============================================================

export const getAdminDashboardStats = async () => {
  const response = await api.get("/admin/dashboard/stats");
  return response.data;
  
};
