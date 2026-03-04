// ============================================================
// NAVBAR COMPONENT
// Styled using project theme
// ============================================================

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();
        navigate("/login");
    };

    return (
        <div className="navbar-theme p-3 d-flex justify-content-between align-items-center">

            <h4 className="m-0">🚗 Vehicle Service Portal</h4>

            <button
                className="btn btn-theme"
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>
    );
};

export default Navbar;
