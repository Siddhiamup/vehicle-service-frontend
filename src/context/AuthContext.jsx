// ============================================================
// Auth Context
// Stores logged in user state globally
// ============================================================

import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // ============================================================
    // Store JWT Token
    // ============================================================

    const [token, setToken] = useState(localStorage.getItem("token"));

    // ============================================================
    // LOGIN FUNCTION
    // ============================================================

    const login = (token) => {

        localStorage.setItem("token", token);
        setToken(token);
    };

    // ============================================================
    // LOGOUT FUNCTION
    // ============================================================

    const logout = () => {

        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
