// // ============================================================
// // JWT Utility Functions
// // Used for decoding token & extracting roles
// // ============================================================

// import { jwtDecode } from "jwt-decode";

// // ============================================================
// // Get User Role From Token
// // ============================================================

// export const getUserRole = () => {

//     const token = localStorage.getItem("token");

//     if (!token) return null;

//     const decoded = jwtDecode(token);

//     return decoded.role;
// };


// ============================================================
// TOKEN UTILITIES
// ============================================================

export const getToken = () => {
  return localStorage.getItem("token");
};

// ============================================================
// EXTRACT ROLE FROM JWT
// ============================================================
export const getUserRole = () => {

  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // 🔒 ALWAYS return ROLE_XXX
    if (payload.role) {
      return payload.role;
    }

    return null;

  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};
