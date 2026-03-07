// ============================================================
// BOOKING LIST PAGE (CUSTOMER)
// ============================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookingCard from "../../../components/booking/BookingCard";
import InvoiceCard from "../../../components/invoice/InvoiceCard";
import { cancelBooking, getBookingHistory } from "../../../services/bookingService";
import { viewInvoice } from "../../../services/invoiceService";
import { getMyVehicles } from "../../../services/vehicleService";

const BookingList = () => {

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // ============================================================
  // Load Vehicles On Page Load
  // ============================================================

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const data = await getMyVehicles();
    setVehicles(data);
  };

  // ============================================================
  // Load Booking History When Vehicle Changes
  // ============================================================

  useEffect(() => {
    if (selectedVehicleId) {
      loadBookings(selectedVehicleId);
    }
  }, [selectedVehicleId]);

  const loadBookings = async (vehicleId) => {
    const data = await getBookingHistory(vehicleId);
    setBookings(data);
    setSelectedInvoice(null); // reset invoice on vehicle change
  };

  // ============================================================
  // Cancel Booking
  // ============================================================

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await cancelBooking(bookingId);
      loadBookings(selectedVehicleId);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Cancellation failed"
      );
    }
  };

  // ============================================================
  // View Invoice
  // ============================================================

  const handleViewInvoice = async (bookingId) => {
    try {
      const invoice = await viewInvoice(bookingId);
      setSelectedInvoice(invoice);
    } catch (error) {
      alert("Invoice not generated yet");
    }
  };

  return (
    <div>

      <h2 className="page-title">My Bookings</h2>

      <Link to="/bookings/create" className="btn btn-theme mb-3">
        Create Booking
      </Link>

      {/* Vehicle Selector */}
      <select
        className="form-control mb-3"
        value={selectedVehicleId}
        onChange={(e) => setSelectedVehicleId(e.target.value)}
      >
        <option value="">Select Vehicle</option>
        {vehicles.map(v => (
          <option key={v.vehicleId} value={v.vehicleId}>
            {v.vehicleNumber}
          </option>
        ))}
      </select>

      {/* Booking Cards */}
      {bookings.length === 0 && selectedVehicleId && (
        <p>No bookings found.</p>
      )}

      {bookings.map(booking => (
        <BookingCard
          key={booking.bookingId}
          booking={booking}
          onCancel={handleCancel}
          onViewInvoice={handleViewInvoice}
        />
      ))}

      {/* ================= INVOICE SECTION ================= */}
      {selectedInvoice && (
        <InvoiceCard invoice={selectedInvoice} />
      )}

    </div>
  );
};

export default BookingList;
