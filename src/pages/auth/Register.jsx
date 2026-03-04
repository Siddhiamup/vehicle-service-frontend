// ============================================================
// REGISTER PAGE
// Premium Glass + Animated Border UI
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
import { registerUser } from "../../services/authService";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "CUSTOMER"
    });

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await registerUser(formData);
            alert("Registration Successful");
            navigate("/login");
        } catch {
            alert("Registration Failed");
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                {/* LOGO */}
                {/* <div className="auth-logo">
                    <img src={logo} alt="Logo" />
                </div> */}

                <h4 className="text-center mb-4">Create Your Account</h4>

                <form onSubmit={handleRegister}>

                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            name="name"
                            className="form-control auth-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control auth-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 password-wrapper">
                        <label>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control auth-input"
                            value={formData.password}
                            onChange={handleChange}
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
                        Register
                    </button>

                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>

            </div>

        </div>
    );
};

export default Register;