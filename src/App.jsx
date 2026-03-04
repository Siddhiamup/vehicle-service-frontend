// ============================================================
// Main Routing Configuration
// ============================================================

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdvisorDashboard from "./pages/advisor/AdvisorDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";

// Advisor Pages
import AdvisorBookings from "./pages/advisor/AdvisorBookings";

// Layout
import MainLayout from "./components/layout/MainLayout";

// Route Protection
import ProtectedRoute from "./routes/ProtectedRoute";

// Vehicle
import AddVehicle from "./pages/customer/vehicles/AddVehicle";
import EditVehicle from "./pages/customer/vehicles/EditVehicle";
import VehicleList from "./pages/customer/vehicles/VehicleList";

// Booking (Customer)
import BookingList from "./pages/customer/booking/BookingList";
import CreateBooking from "./pages/customer/booking/CreateBooking";

// Unauthorized Page
const Unauthorized = () => <h2>Unauthorized Access</h2>;

//admin invoice
import AdminInvoiceList from "./pages/admin/invoices/AdminInvoiceList";

//ServiceMaster tab
import AddService from "./pages/admin/services/AddService";
import EditService from "./pages/admin/services/EditService";
import ServiceList from "./pages/admin/services/ServiceList";

// customer invoice
import InvoiceList from "./pages/customer/invoices/InvoiceList";

//notifications
import Notifications from "./pages/common/Notifications";

//cards navigation
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= CUSTOMER ================= */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <MainLayout>
                <CustomerDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <MainLayout>
                <VehicleList />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/add"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <MainLayout>
                <AddVehicle />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <MainLayout>
                <EditVehicle />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <MainLayout>
                <BookingList />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings/create"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <MainLayout>
                <CreateBooking />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* CUSTOMER → INVOICES */}
        <Route
          path="/invoices"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <MainLayout>
                <InvoiceList />
              </MainLayout>
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <MainLayout>
                <AdminDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/admin-invoices"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <MainLayout>
                <AdminInvoiceList />
              </MainLayout>
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/admin/invoices"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <MainLayout>
                <AdminInvoiceList />
              </MainLayout>
            </ProtectedRoute>
          }
        />


        {/* ================= ADVISOR ================= */}
        <Route
          path="/advisor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SERVICE_ADVISOR"]}>
              <MainLayout>
                <AdvisorDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/advisor-bookings"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SERVICE_ADVISOR"]}>
              <MainLayout>
                <AdvisorBookings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= MISC ================= */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/login" />} />

// ============================================================
        // ADMIN → SERVICE MASTER
        // ============================================================

        <Route
          path="/services"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <MainLayout>
                <ServiceList />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/add"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <MainLayout>
                <AddService />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <MainLayout>
                <EditService />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={[
              "ROLE_CUSTOMER",
              "ROLE_ADMIN",
              "ROLE_SERVICE_ADVISOR"
            ]}>
              <MainLayout>
                <Notifications />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* cards navigation */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <MainLayout>
                <AdminUsers />
              </MainLayout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <MainLayout>
                <AdminBookings />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
