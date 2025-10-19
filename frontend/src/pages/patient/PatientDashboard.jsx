import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarPatient from "../../components/SidebarPatient";
import MedicalRecords from "./MedicalRecords";
import Prescriptions from "./Prescriptions";

export default function PatientDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarPatient />
      <div className="flex-1 p-6">
        <Routes>
          <Route
            path="/"
            element={
              <h2 className="text-2xl font-bold text-blue-700">Patient Dashboard</h2>
            }
          />
          <Route path="records" element={<MedicalRecords />} />
          <Route path="prescriptions" element={<Prescriptions />} />
        </Routes>
      </div>
    </div>
  );
}
