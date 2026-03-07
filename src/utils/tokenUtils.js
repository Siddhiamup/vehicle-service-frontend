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
