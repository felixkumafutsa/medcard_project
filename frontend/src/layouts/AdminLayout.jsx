import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  CreditCard,
  PlusCircle,
  ListChecks,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

// Import the logo properly
import medcardLogo from "../assets/medcard-logo.jpeg";

// Example: useAuth hook to get logged-in admin
import { useAuth } from "../auth"; // adjust path based on your auth context

export default function AdminLayout() {
  const [openPatients, setOpenPatients] = useState(false);
  const [openCards, setOpenCards] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth(); // Assume `user` has {name, avatar}

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-blue-900 text-gray-100 w-64 z-50 md:relative md:translate-x-0 flex flex-col shadow-xl`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center px-6 py-4 border-b border-blue-800">
          <img src={medcardLogo} alt="MedCard Logo" className="w-10 h-10 mr-2" />
          <span className="text-xl font-semibold hidden md:block">MedCard</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link
            to="/admin/dashboard"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <LayoutDashboard className="mr-3" size={20} />
            Dashboard
          </Link>

          {/* Manage Patients */}
          <div>
            <button
              onClick={() => setOpenPatients(!openPatients)}
              className="flex justify-between items-center w-full px-3 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <span className="flex items-center">
                <Users className="mr-3" size={20} />
                Manage Patients
              </span>
              {openPatients ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {openPatients && (
              <div className="ml-8 mt-1 space-y-1">
                <Link
                  to="/admin/add-patient"
                  className="flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
                >
                  <UserPlus className="mr-2" size={16} />
                  Add Patient
                </Link>
                <Link
                  to="/admin/view-patients"
                  className="flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
                >
                  <UserCheck className="mr-2" size={16} />
                  View Patients
                </Link>
              </div>
            )}
          </div>

          {/* Manage Cards */}
          <div>
            <button
              onClick={() => setOpenCards(!openCards)}
              className="flex justify-between items-center w-full px-3 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <span className="flex items-center">
                <CreditCard className="mr-3" size={20} />
                Manage Cards
              </span>
              {openCards ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {openCards && (
              <div className="ml-8 mt-1 space-y-1">
                <Link
                  to="/admin/add-card"
                  className="flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
                >
                  <PlusCircle className="mr-2" size={16} />
                  Add Card
                </Link>
                <Link
                  to="/admin/view-cards"
                  className="flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
                >
                  <ListChecks className="mr-2" size={16} />
                  View Cards
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/admin/settings"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Settings className="mr-3" size={20} />
            Settings
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-red-400 transition"
          >
            <LogOut className="mr-3" size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-blue-900"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>

          {/* Profile Info */}
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="Admin"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <span className="font-medium text-gray-700">{user?.name || "Admin"}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
