// ============================================================
// CUSTOMER DASHBOARD UI
// ============================================================

// const CustomerDashboard = () => {

//     return (

//         <div>

//             <h2 className="page-title">Customer Dashboard</h2>

//             <div className="row">

//                 {/* Vehicles Card */}
//                 <div className="col-md-4">
//                     <div className="dashboard-card">
//                         <h5>My Vehicles</h5>
//                         <p>Manage your registered vehicles.</p>
//                     </div>
//                 </div>

//                 {/* Booking Card */}
//                 <div className="col-md-4">
//                     <div className="dashboard-card">
//                         <h5>Service Booking</h5>
//                         <p>Book vehicle servicing slots.</p>
//                     </div>
//                 </div>

//                 {/* Invoice Card */}
//                 <div className="col-md-4">
//                     <div className="dashboard-card">
//                         <h5>Invoices</h5>
//                         <p>View and download invoices.</p>
//                     </div>
//                 </div>

//             </div>

//         </div>
//     );
// };

// export default CustomerDashboard;

// ============================================================
// CUSTOMER DASHBOARD
// Cards + Charts + Summary Analytics
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis, YAxis
} from "recharts";

import { getBookingHistory } from "../../services/bookingService";
import { getMyInvoices } from "../../services/invoiceService";
import { getMyVehicles } from "../../services/vehicleService";

const COLORS = ["#0d6efd", "#ffc107", "#198754", "#dc3545"];

const CustomerDashboard = () => {

  // ============================================================
  // STATE
  // ============================================================

  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();


  // ============================================================
  // LOAD ALL DATA
  // ============================================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const vehicleData = await getMyVehicles();
      setVehicles(vehicleData);

      // Load bookings for all vehicles
      let allBookings = [];
      for (let v of vehicleData) {
        const data = await getBookingHistory(v.vehicleId);
        allBookings = [...allBookings, ...data];
      }
      setBookings(allBookings);

      const invoiceData = await getMyInvoices();
      setInvoices(invoiceData);

    } catch {
      alert("Failed to load dashboard data");
    }
  };

  // ============================================================
  // CALCULATED METRICS
  // ============================================================

  const totalBookings = bookings.length;

  const activeBookings = bookings.filter(
    b => b.status === "BOOKED" || b.status === "IN_PROGRESS"
  ).length;

  const completedBookings = bookings.filter(
    b => b.status === "COMPLETED"
  ).length;

  const totalSpent = invoices.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );

  // ============================================================
  // CHART DATA
  // ============================================================

  const statusChartData = [
    { name: "Booked", value: bookings.filter(b => b.status === "BOOKED").length },
    { name: "In Progress", value: bookings.filter(b => b.status === "IN_PROGRESS").length },
    { name: "Completed", value: bookings.filter(b => b.status === "COMPLETED").length },
    { name: "Cancelled", value: bookings.filter(b => b.status === "CANCELLED").length }
  ].filter(d => d.value > 0);

  const serviceUsage = {};

  bookings.forEach(b => {
    const serviceName = b.service?.serviceName || "Unknown";

    serviceUsage[serviceName] =
      (serviceUsage[serviceName] || 0) + 1;
  });

  const serviceChartData = Object.keys(serviceUsage).map(key => ({
    name: key,
    value: serviceUsage[key]
  }));

  // ============================================================
  // UI
  // ============================================================

  return (
    <div>

      <h2 className="page-title">Customer Dashboard</h2>

      {/* ===================== SUMMARY CARDS ===================== */}
      <div className="row mb-4">

        {/* My Vehicles */}
        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/vehicles")}
          >
            <h6>My Vehicles</h6>
            <h3>{vehicles.length}</h3>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/bookings")}
          >
            <h6>Total Bookings</h6>
            <h3>{totalBookings}</h3>
          </div>
        </div>

        {/* Active Services */}
        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/bookings")}
          >
            <h6>Active Services</h6>
            <h3>{activeBookings}</h3>
          </div>
        </div>

        {/* Total Spent */}
        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/invoices")}
          >
            <h6>Total Spent</h6>
            <h3>₹ {totalSpent}</h3>
          </div>
        </div>

      </div>

      {/* ===================== CHARTS ===================== */}
      <div className="row mb-5">

        {/* PIE CHART */}
        <div className="col-md-6">
          <div className="dashboard-card">
            <h6 className="mb-3">Booking Status</h6>

            <PieChart width={400} height={300}>
              <Pie
                data={statusChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {statusChartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="col-md-6">
          <div className="dashboard-card">
            <h6 className="mb-3">Service Usage</h6>

            <BarChart width={400} height={300} data={serviceChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#198754" />
            </BarChart>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CustomerDashboard;
