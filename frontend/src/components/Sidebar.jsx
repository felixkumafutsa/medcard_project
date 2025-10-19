import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  IdCard,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const linkClass = (path) =>
    `flex items-center px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-blue-700 hover:text-white"
    }`;

  return (
    <div className="bg-slate-900 w-64 min-h-screen p-4 border-r border-slate-800 flex flex-col">
      <h2 className="text-2xl font-bold text-blue-500 mb-8 text-center">
        MedCard Admin
      </h2>

      <nav className="space-y-2">
        <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
        </Link>

        {/* Patients Dropdown */}
        <div>
          <button
            onClick={() => handleDropdownToggle("patients")}
            className="flex items-center justify-between w-full px-4 py-2 text-gray-300 hover:bg-blue-700 hover:text-white rounded-md"
          >
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-3" /> Patients
            </span>
            {openDropdown === "patients" ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {openDropdown === "patients" && (
            <div className="ml-8 space-y-1">
              <Link to="/patients/register" className={linkClass("/patients/register")}>
                <UserPlus className="w-4 h-4 mr-2" /> Add New
              </Link>
              <Link to="/admin/patients/view" className={linkClass("/admin/patients/view")}>
                <Users className="w-4 h-4 mr-2" /> View All
              </Link>
            </div>
          )}
        </div>

        {/* Doctors Dropdown */}
        <div>
          <button
            onClick={() => handleDropdownToggle("doctors")}
            className="flex items-center justify-between w-full px-4 py-2 text-gray-300 hover:bg-blue-700 hover:text-white rounded-md"
          >
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-3" /> Doctors
            </span>
            {openDropdown === "doctors" ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {openDropdown === "doctors" && (
            <div className="ml-8 space-y-1">
              <Link to="/admin/doctors/add" className={linkClass("/admin/doctors/add")}>
                <UserPlus className="w-4 h-4 mr-2" /> Add New
              </Link>
              <Link to="/admin/doctors/view" className={linkClass("/admin/doctors/view")}>
                <Users className="w-4 h-4 mr-2" /> View All
              </Link>
            </div>
          )}
        </div>

        {/* Cards */}
        <Link to="/admin/cards/view" className={linkClass("/admin/cards/view")}>
          <IdCard className="w-5 h-5 mr-3" /> Cards
        </Link>

        {/* Card Reads */}
        <Link to="/admin/card-reads/view" className={linkClass("/admin/card-reads/view")}>
          <FileText className="w-5 h-5 mr-3" /> Card Reads
        </Link>

        {/* Settings */}
        <Link to="/settings" className={linkClass("/settings")}>
          <Settings className="w-5 h-5 mr-3" /> Settings
        </Link>

        {/* Logout */}
        <Link to="/login" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white rounded-md mt-auto">
          <LogOut className="w-5 h-5 mr-3" /> Logout
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
