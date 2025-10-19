import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//Auth pages
import Login from "./pages/Login";
import { RequireAuth } from "./auth";
import RoleRoute from "./routes/RoleRoute";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import ViewPatients from "./pages/admin/ViewPatients";
import AddCard from "./pages/admin/AddCard";
import ViewCards from "./pages/admin/ViewCards";
import CardDetails from "./pages/admin/CardDetails";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientsList from "./pages/doctor/PatientsList";

// Patient pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import MedicalRecords from "./pages/patient/MedicalRecords";

export default function App() {
  return (
    <>
      {/* ✅ Global Toast Notification Handler */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: { background: "#10B981", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#10B981" },
          },
          error: {
            style: { background: "#EF4444", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#EF4444" },
          },
        }}
      />

      {/* ✅ Your App Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <RoleRoute role="admin">
                <AdminLayout />
              </RoleRoute>
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="view-patients" element={<ViewPatients />} />
          <Route path="add-card" element={<AddCard />} />
          <Route path="view-cards" element={<ViewCards />} />
          <Route path="card/:id" element={<CardDetails />} />
        </Route>

        {/* ================= DOCTOR ROUTES ================= */}
        <Route
          path="/doctor"
          element={
            <RequireAuth>
              <RoleRoute role="doctor">
                <DoctorLayout />
              </RoleRoute>
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="patients" element={<PatientsList />} />
        </Route>

        {/* ================= PATIENT ROUTES ================= */}
        <Route
          path="/patient"
          element={
            <RequireAuth>
              <RoleRoute role="patient">
                <PatientLayout />
              </RoleRoute>
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="records" element={<MedicalRecords />} />
        </Route>
      </Routes>
    </>
  );
}
