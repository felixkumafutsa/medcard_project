import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, CreditCard, UserCheck } from "lucide-react";
import { FiUsers, FiUserCheck, FiCreditCard, FiActivity } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    cards: 0,
    cardReads: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/stats/counts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Defensive: if backend doesn’t return expected keys
        setStats({
          patients: res.data?.patients || 0,
          doctors: res.data?.doctors || 0,
          cards: res.data?.cards || 0,
          cardReads: res.data?.cardReads || 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

    const cards = [
    { label: "Patients", value: stats.patients, icon: <FiUsers size={28} />, color: "bg-blue-600" },
    { label: "Doctors", value: stats.doctors, icon: <FiUserCheck size={28} />, color: "bg-green-600" },
    { label: "Cards", value: stats.cards, icon: <FiCreditCard size={28} />, color: "bg-indigo-600" },
    { label: "Card Reads", value: stats.cardReads, icon: <FiActivity size={28} />, color: "bg-purple-600" },
  ];


  if (!stats) {
    return <div className="p-6 text-center">Loading dashboard data...</div>;
  }

  // ✅ define chartData safely
  const chartData = [
    { name: "Patients", value: stats.patients },
    { name: "Doctors", value: stats.doctors },
    { name: "Appointments", value: stats.appointments },
  ];


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-800">
            <Users size={28} />
          </div>
          <div>
            <p className="text-gray-500">Total Patients</p>
            <p className="text-2xl font-semibold">{stats.patients}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-green-100 text-green-800">
            <CreditCard size={28} />
          </div>
          <div>
            <p className="text-gray-500">Total Cards</p>
            <p className="text-2xl font-semibold">{stats.cards}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-800">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-gray-500">Total Doctors</p>
            <p className="text-2xl font-semibold">{stats.doctors}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="patients" fill="#3B82F6" />
            <Bar dataKey="cards" fill="#10B981" />
            <Bar dataKey="doctors" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
