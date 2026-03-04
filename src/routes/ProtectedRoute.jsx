// ============================================================
// Protected Route Component
// Restricts access based on login & role
// ============================================================

import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/tokenUtils";

const ProtectedRoute = ({ children, allowedRoles }) => {

    const role = getUserRole();

    // ============================================================
    // If user not logged in
    // ============================================================

    if (!role) {
        return <Navigate to="/login" />;
    }

    // ============================================================
    // If role not allowed
    // ============================================================

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
