// ============================================================
// ADVISOR BOOKING CARD
// ============================================================

import { generateInvoice } from "../../services/invoiceService";

const AdvisorBookingCard = ({ booking, onStatusUpdate }) => {

  // ============================================================
  // Status badge styling
  // ============================================================
  const getStatusClass = (status) => {
    switch (status) {
      case "BOOKED": return "badge bg-primary";
      case "IN_PROGRESS": return "badge bg-warning text-dark";
      case "COMPLETED": return "badge bg-success";
      case "CANCELLED": return "badge bg-danger";
      default: return "badge bg-secondary";
    }
  };

  // ============================================================
  // Generate Invoice
  // ============================================================
  const handleGenerateInvoice = async () => {
    if (!window.confirm("Generate invoice for this booking?")) return;

    try {
      await generateInvoice(booking.bookingId);
      alert("Invoice generated successfully");
    } catch (error) {
      alert(
        typeof error.response?.data === "string"
          ? error.response.data
          : "Invoice generation failed"
      );
    }
  };

  return (
    <div className="dashboard-card mb-3">

      <h5>
        {booking.vehicle.vehicleNumber}
        <span className={`ms-3 ${getStatusClass(booking.status)}`}>
          {booking.status}
        </span>
      </h5>

      <p><strong>Service:</strong> {booking.service.serviceName}</p>
      <p><strong>Date:</strong> {booking.bookingDate}</p>
      <p><strong>Slot:</strong> {booking.slot}</p>

      {/* Start Service */}
      <button
        className="btn btn-warning me-2"
        disabled={booking.status !== "BOOKED"}
        onClick={() =>
          onStatusUpdate(booking.bookingId, "IN_PROGRESS")
        }
      >
        Start Service
      </button>

      {/* Complete Service */}
      <button
        className="btn btn-success me-2"
        disabled={booking.status !== "IN_PROGRESS"}
        onClick={() =>
          onStatusUpdate(booking.bookingId, "COMPLETED")
        }
      >
        Complete Service
      </button>

      {/* Generate Invoice */}
      <button
        className="btn btn-theme mt-2"
        disabled={booking.status !== "COMPLETED"}
        onClick={handleGenerateInvoice}
      >
        Generate Invoice
      </button>

    </div>
  );
};

export default AdvisorBookingCard;
