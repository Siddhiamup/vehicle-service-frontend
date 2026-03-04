import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import AdvisorBookingCard from "../../components/booking/AdvisorBookingCard";
import { getDailyBookings, updateBookingStatus } from "../../services/bookingService";

const COLORS = ["#0d6efd", "#ffc107", "#198754"];

const AdvisorDashboard = () => {

  const navigate = useNavigate(); // ✅ Added

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [bookings, setBookings] = useState([]);

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

  const total = bookings.length;
  const booked = bookings.filter(b => b.status === "BOOKED").length;
  const inProgress = bookings.filter(b => b.status === "IN_PROGRESS").length;
  const completed = bookings.filter(b => b.status === "COMPLETED").length;

  const barData = [
    { name: "Booked", value: booked },
    { name: "In Progress", value: inProgress },
    { name: "Completed", value: completed }
  ];

  const pieData = barData.filter(d => d.value > 0);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      loadBookings();
    } catch {
      alert("Failed to update booking status");
    }
  };

  return (
    <div>

      <h2 className="page-title">Service Advisor Dashboard</h2>

      <input
        type="date"
        className="form-control mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* ================= SUMMARY CARDS ================= */}
      <div className="row mb-4">

        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/advisor-bookings")}
          >
            <h6>Total Bookings</h6>
            <h3>{total}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/advisor-bookings")}
          >
            <h6>Booked</h6>
            <h3>{booked}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/advisor-bookings")}
          >
            <h6>In Progress</h6>
            <h3>{inProgress}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/advisor-bookings")}
          >
            <h6>Completed</h6>
            <h3>{completed}</h3>
          </div>
        </div>

      </div>

      {/* ================= CHARTS ================= */}
      <div className="row mb-5">

        <div className="col-md-6">
          <div className="dashboard-card">
            <h6 className="mb-3">Booking Status</h6>
            <BarChart width={400} height={300} data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0d6efd" />
            </BarChart>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card">
            <h6 className="mb-3">Today’s Workload</h6>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

      </div>

      {bookings.length === 0 && <p>No bookings for selected date.</p>}

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

export default AdvisorDashboard;