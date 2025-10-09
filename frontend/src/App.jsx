import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import CardLogs from "./pages/CardLogs";
import Login from "./pages/Login";
import  RegisterPatient from "./pages/RegisterPatient";
import { AuthProvider } from "./auth";
import RequireAuth from "./components/RequireAuth";
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen bg-gray-900 text-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Topbar />
            <div className="p-4 overflow-y-auto flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/patients"
                  element={
                    <RequireAuth>
                      <Patients />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/logs"
                  element={
                    <RequireAuth>
                      <CardLogs />
                    </RequireAuth>
                  }
                />

                <Route
                  path="/patients/register"
                  element={
                    <RequireAuth>
                      <RegisterPatient />
                    </RequireAuth>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
