import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    // Redirect to respective dashboard if role mismatch
    if (userRole === "admin") return <Navigate to="/admin/dashboard" />;
    if (userRole === "doctor") return <Navigate to="/doctor/dashboard" />;
    if (userRole === "patient") return <Navigate to="/patient/dashboard" />;
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
