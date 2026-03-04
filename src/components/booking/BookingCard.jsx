// ============================================================
// BOOKING CARD COMPONENT (CUSTOMER)
// ============================================================

const BookingCard = ({ booking, onCancel, onViewInvoice }) => {

  // ============================================================
  // Status Badge Styling
  // ============================================================
  const getStatusClass = (status) => {
    switch (status) {
      case "BOOKED":
        return "badge bg-primary";
      case "IN_PROGRESS":
        return "badge bg-warning text-dark";
      case "COMPLETED":
        return "badge bg-success";
      case "CANCELLED":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="dashboard-card mb-3">

      <h5>
        {booking.vehicle?.vehicleNumber || "Vehicle Not Available"}
        <span className={`ms-3 ${getStatusClass(booking.status)}`}>
          {booking.status}
        </span>
      </h5>

      <p>
        <strong>Service:</strong>{" "}
        {booking.service?.serviceName || "Service Not Available"}
      </p>      <p><strong>Date:</strong> {booking.bookingDate}</p>
      <p><strong>Slot:</strong> {booking.slot}</p>

      {/* ========================================================
          Cancel Booking (ONLY when BOOKED)
         ======================================================== */}
      <button
        className="btn btn-danger me-2"
        disabled={booking.status !== "BOOKED"}
        onClick={() => {
          if (!window.confirm("Are you sure you want to cancel this booking?")) return;
          onCancel(booking.bookingId);
        }}
      >
        Cancel Booking
      </button>

      {/* ========================================================
          View Invoice (ONLY when COMPLETED)
         ======================================================== */}
      <button
        className="btn btn-outline-primary"
        disabled={booking.status !== "COMPLETED"}
        onClick={() => onViewInvoice(booking.bookingId)}
      >
        View Invoice
      </button>

    </div>
  );
};

export default BookingCard;
