// ============================================================
// SIDEBAR COMPONENT
// Styled role-based sidebar menu
// ============================================================

import { Link } from "react-router-dom";
import { getUserRole } from "../../utils/tokenUtils";


const Sidebar = () => {

  const role = getUserRole();

  return (
    <div className="sidebar-theme p-3">

      <h5 className="text-center mb-4">MENU</h5>

      {/* CUSTOMER */}
      {role === "ROLE_CUSTOMER" && (
        <>
          <Link to="/customer-dashboard">Dashboard</Link>
          <Link to="/vehicles">My Vehicles</Link>
          <Link to="/bookings">Bookings</Link>
          <Link to="/invoices">Invoices</Link>
          <Link to="/notifications">Notifications</Link>

        </>
      )}

      {/* ADMIN */}
      {/* {role === "ROLE_ADMIN" && (
        <>
          <Link to="/admin-dashboard">Dashboard</Link>
          <Link to="/services">Service Master</Link>
          <Link to="/admin-invoices">Invoices</Link>

        </>
      )} */}
      {role === "ROLE_ADMIN" && (
        <>
          <Link to="/admin-dashboard">Dashboard</Link>
          <Link to="/services">Service Master</Link>
          <Link to="/admin/invoices">Invoices</Link>
          <Link to="/notifications">Notifications</Link>

        </>
      )}

      {/* ADVISOR */}
      {role === "ROLE_SERVICE_ADVISOR" && (
        <>
          <Link to="/advisor-dashboard">Dashboard</Link>
          <Link to="/advisor-bookings">Booking Requests</Link>
          <Link to="/notifications">Notifications</Link>

        </>
      )}

    </div>
  );
};

export default Sidebar;
