import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { setToken } from "./services_api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("medcard_token");
    const storedUser = localStorage.getItem("medcard_user");
    if (token && storedUser) {
      setToken(token);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  function login(userObj, token) {
    localStorage.setItem("medcard_token", token);
    localStorage.setItem("medcard_user", JSON.stringify(userObj));
    setToken(token);
    setUser(userObj);
  }

  function logout() {
    localStorage.removeItem("medcard_token");
    localStorage.removeItem("medcard_user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        Checking session...
      </div>
    );

  if (!user)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}
