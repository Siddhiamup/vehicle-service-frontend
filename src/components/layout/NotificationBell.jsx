import { useEffect, useState, useRef } from "react";
import {
  getUnreadCount,
  getMyNotifications,
  markNotificationRead
} from "../../services/notificationService";

const NotificationBell = () => {

  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ============================================================
  // LOAD COUNT
  // ============================================================

  const loadCount = async () => {
    try {
      const data = await getUnreadCount();
      setCount(data);
    } catch (err) {
      console.error("Failed to load count");
    }
  };

  // ============================================================
  // LOAD NOTIFICATIONS
  // ============================================================

  const loadNotifications = async () => {
    try {
      const data = await getMyNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications");
    }
  };

  // ============================================================
  // MARK AS READ
  // ============================================================

  const markRead = async (id) => {
    await markNotificationRead(id);
    loadNotifications();
    loadCount();
  };

  // ============================================================
  // TOGGLE DROPDOWN
  // ============================================================

  const toggleDropdown = () => {
    setOpen(!open);
    if (!open) {
      loadNotifications();
      loadCount();
    }
  };

  // ============================================================
  // AUTO REFRESH
  // ============================================================

  useEffect(() => {
    loadCount();

    const interval = setInterval(() => {
      loadCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ============================================================
  // CLOSE ON OUTSIDE CLICK
  // ============================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current &&
          !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="position-relative"
      ref={dropdownRef}
      style={{ cursor: "pointer" }}
    >

      {/* 🔔 Bell */}
      <div onClick={toggleDropdown}>
        🔔
        {count > 0 && (
          <span className="badge bg-danger ms-1">
            {count}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="card shadow position-absolute mt-2"
          style={{
            width: "320px",
            right: 0,
            zIndex: 1000
          }}
        >
          <div className="card-header fw-bold">
            Notifications
          </div>

          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {notifications.length === 0 && (
              <div className="p-3 text-muted">
                No notifications
              </div>
            )}

            {notifications.slice(0, 10).map(n => (
              <div
                key={n.notificationId}
                className={`p-3 border-bottom ${
                  n.readStatus ? "" : "bg-light"
                }`}
                onClick={() => !n.readStatus && markRead(n.notificationId)}
              >
                <div style={{ fontSize: "14px" }}>
                  {n.message}
                </div>
                <small className="text-muted">
                  {new Date(n.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default NotificationBell;