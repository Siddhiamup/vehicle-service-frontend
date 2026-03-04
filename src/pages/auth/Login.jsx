// ============================================================
// LOGIN PAGE
// Premium Glass + Animated Border UI
// ============================================================

import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const token = await loginUser({ email, password });
            login(token);

            const decoded = jwtDecode(token);
            const role = decoded.role;

            if (role === "ROLE_CUSTOMER") {
                navigate("/customer-dashboard");
            } else if (role === "ROLE_ADMIN") {
                navigate("/admin-dashboard");
            } else if (role === "ROLE_SERVICE_ADVISOR") {
                navigate("/advisor-dashboard");
            }

        } catch {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                {/* LOGO */}
                {/* <div className="auth-logo">
                    <img src={logo} alt="Logo" />
                </div> */}

                <h4 className="text-center mb-4">
                    Login to Your Account
                </h4>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 password-wrapper">
                        <label>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>

                    <button className="btn btn-theme w-100 mt-2">
                        Login
                    </button>

                </form>

                <div className="auth-footer">
                    <p>
                        Don’t have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </div>

            </div>

        </div>
    );
};

export default Login;