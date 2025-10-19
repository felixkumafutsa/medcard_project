import React from "react";
import { Link } from "react-router-dom";
import { User, FileText, Pill } from "lucide-react";

export default function SidebarPatient() {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-blue-700 flex items-center gap-2">
        <User size={22} /> Patient Portal
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link to="/patient" className="block hover:bg-blue-700 rounded p-2 flex items-center gap-2">
          <FileText size={18} /> Dashboard
        </Link>
        <Link to="/patient/records" className="block hover:bg-blue-700 rounded p-2 flex items-center gap-2">
          <FileText size={18} /> Medical Records
        </Link>
        <Link to="/patient/prescriptions" className="block hover:bg-blue-700 rounded p-2 flex items-center gap-2">
          <Pill size={18} /> Prescriptions
        </Link>
      </nav>
    </div>
  );
}
