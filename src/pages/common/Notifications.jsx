import { useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationRead,
  getUnreadCount
} from "../../services/notificationService";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // LOAD NOTIFICATIONS
  // ============================================================

  const load = async () => {
    try {
      const data = await getMyNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // MARK AS READ
  // ============================================================

  const markRead = async (id) => {
    await markNotificationRead(id);
    load();

    // 🔔 Update bell instantly
    window.dispatchEvent(new Event("notificationUpdated"));
  };

  // ============================================================
  // MARK ALL AS READ
  // ============================================================

  const markAllAsRead = async () => {
    const unread = notifications.filter(n => !n.readStatus);

    for (let n of unread) {
      await markNotificationRead(n.notificationId);
    }

    load();
    window.dispatchEvent(new Event("notificationUpdated"));
  };

  // ============================================================
  // LOAD ON PAGE OPEN
  // ============================================================

  useEffect(() => {
    load();
  }, []);

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="page-title mb-0">Notifications</h2>

        {notifications.some(n => !n.readStatus) && (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </button>
        )}
      </div>

      {loading && <p>Loading notifications...</p>}

      {!loading && notifications.length === 0 && (
        <div className="dashboard-card text-center text-muted">
          No notifications available
        </div>
      )}

      {!loading && notifications.map(n => (
        <div
          key={n.notificationId}
          className={`dashboard-card mb-2 ${
            n.readStatus ? "" : "border-primary bg-light"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => !n.readStatus && markRead(n.notificationId)}
        >
          <div className="d-flex justify-content-between">
            <div>{n.message}</div>
            {!n.readStatus && (
              <span className="badge bg-primary">New</span>
            )}
          </div>

          <small className="text-muted">
            {new Date(n.createdAt).toLocaleString()}
          </small>
        </div>
      ))}

    </div>
  );
};

export default Notifications;