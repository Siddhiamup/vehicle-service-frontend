// ============================================================
// SERVICE ADVISOR DASHBOARD
// ============================================================

import { useEffect, useState } from "react";
import AdvisorBookingCard from "../../components/booking/AdvisorBookingCard";
import {
    getDailyBookings,
    updateBookingStatus
} from "../../services/bookingService";

const AdvisorBookings = () => {

  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // ============================================================
  // Load Daily Bookings
  // ============================================================

  const loadBookings = async () => {
    try {
      const data = await getDailyBookings(date);
      setBookings(data);
    } catch {
      alert("Failed to load bookings");
    }
  };

  useEffect(() => {
    loadBookings();
  }, [date]);

  // ============================================================
  // Update Booking Status
  // ============================================================

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      loadBookings();
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div>

      <h2 className="page-title">Advisor Dashboard</h2>

      {/* Date Picker */}
      <input
        type="date"
        className="form-control mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Booking List */}
      {bookings.length === 0 && (
        <p>No bookings for selected date.</p>
      )}

      {bookings.map(booking => (
        <AdvisorBookingCard
          key={booking.bookingId}
          booking={booking}
          onStatusUpdate={handleStatusUpdate}
        />
      ))}

    </div>
  );
};

export default AdvisorBookings;
