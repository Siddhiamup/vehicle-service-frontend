import api from "./api";

// ============================================================
// GET MY NOTIFICATIONS
// ============================================================

export const getMyNotifications = async () => {
  const res = await api.get("/notifications/my");
  return res.data;
};

// ============================================================
// MARK AS READ
// ============================================================

export const markNotificationRead = async (id) => {
  await api.patch(`/notifications/read/${id}`);
};

// ============================================================
// UNREAD COUNT
// ============================================================

export const getUnreadCount = async () => {
  const res = await api.get("/notifications/unread-count");
  return res.data;
};
