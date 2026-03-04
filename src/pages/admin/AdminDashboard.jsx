// ============================================================
// ADMIN DASHBOARD
// Displays system analytics, summary cards & charts
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboardStats } from "../../services/adminDashboardService";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const AdminDashboard = () => {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ Moved to top (correct placement)

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getAdminDashboardStats();
      setStats(data);
    } catch {
      alert("Failed to load admin dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  const bookingChartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Bookings", value: stats.totalBookings }
  ];

  const revenueChartData = [
    { name: "Revenue", value: stats.totalRevenue },
    { name: "Pending", value: stats.pendingPayments }
  ];

  const COLORS = ["#0d6efd", "#dc3545"];

  return (
    <div>
      <h2 className="page-title">Admin Dashboard</h2>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="row">

        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/admin/users")}
          >
            <h6>Total Users</h6>
            <h3>{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/admin/bookings")}
          >
            <h6>Total Bookings</h6>
            <h3>{stats.totalBookings}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/admin/invoices")}
          >
            <h6>Total Revenue</h6>
            <h3>₹ {stats.totalRevenue}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="dashboard-card clickable-card"
            onClick={() => navigate("/admin/invoices")}
          >
            <h6>Pending Payments</h6>
            <h3>{stats.pendingPayments}</h3>
          </div>
        </div>

      </div>

      {/* ================= CHARTS ================= */}
      <div className="row mt-4">

        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 className="mb-3">Users vs Bookings</h5>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0d6efd" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 className="mb-3">Revenue Overview</h5>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {revenueChartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;