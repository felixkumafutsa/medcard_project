import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setPatients(patients.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Registered Patients</h1>
        <button
          onClick={() => navigate("/admin/add-card")}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add New Patient
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        {loading ? (
          <p className="text-gray-700">Loading Patients...</p>
        ) : cards.length === 0 ? (
          <p className="text-gray-700">No patients found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm md:text-base text-gray-800">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Card UID</th>
                  <th className="border px-4 py-2 text-left">Patient</th>
                  <th className="border px-4 py-2 text-left">Description</th>
                  <th className="border px-4 py-2 text-left">Created At</th>
                  <th className="border px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{card.card_uid}</td>
                    <td className="border px-4 py-2">
                      {card.patient ? card.patient.name : "Unassigned"}
                    </td>
                    <td className="border px-4 py-2">{card.description}</td>
                    <td className="border px-4 py-2">
                      {new Date(card.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-900 text-white rounded hover:bg-blue-700"
                        onClick={() =>
                          alert(`Viewing details for card: ${card.card_uid}`)
                        }
                      >
                        View
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(patient._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
