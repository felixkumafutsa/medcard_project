import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarDoctor from "../../components/SidebarDoctor";
import PatientsList from "./PatientsList";
import AddDiagnosis from "./AddDiagnosis";
import Prescriptions from "./Prescriptions";

export default function DoctorDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarDoctor />
      <div className="flex-1 p-6">
        <Routes>
          <Route
            path="/"
            element={
              <h2 className="text-2xl font-bold text-blue-700">Doctor Dashboard</h2>
            }
          />
          <Route path="patients" element={<PatientsList />} />
          <Route path="diagnosis" element={<AddDiagnosis />} />
          <Route path="prescriptions" element={<Prescriptions />} />
        </Routes>
      </div>
    </div>
  );
}
