import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope, Users, FileText, Pill } from "lucide-react";

export default function SidebarDoctor() {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-blue-700 flex items-center gap-2">
        <Stethoscope size={22} /> Doctor Portal
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link to="/doctor" className="block hover:bg-blue-700 rounded p-2 flex items-center gap-2">
          <FileText size={18} /> Dashboard
        </Link>
        <Link to="/doctor/patients" className="block hover:bg-blue-700 rounded p-2 flex items-center gap-2">
          <Users size={18} /> My Patients
        </Link>
        <Link to="/doctor/diagnosis" className="block hover:bg-blue-700 rounded p-2 flex items-center gap-2">
          <FileText size={18} /> Add Diagnosis
        </Link>
        <Link to="/doctor/prescriptions" className="block hover:bg-blue-700 rounded p-2 flex items-center gap-2">
          <Pill size={18} /> Prescriptions
        </Link>
      </nav>
    </div>
  );
}
