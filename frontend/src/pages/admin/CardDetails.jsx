import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignMode, setAssignMode] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  // Fetch card details
  useEffect(() => {
    fetchCard();
  }, [id]);

  const fetchCard = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cards/${id}`);
      setCard(res.data.card);
    } catch (err) {
      toast.error("Failed to load card details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch patients when in assign mode
  useEffect(() => {
    if (assignMode) {
      axios
        .get("http://localhost:5000/api/patients")
        .then((res) => setPatients(res.data))
        .catch(() => toast.error("Failed to fetch patients"));
    }
  }, [assignMode]);

  // Assign patient to this card
  const handleAssignPatient = async () => {
    if (!selectedPatient) return toast.error("Select a patient first!");

    try {
      await axios.put(`http://localhost:5000/api/cards/${id}/assign`, {
        patientId: selectedPatient,
      });
      toast.success("Patient assigned successfully");
      setAssignMode(false);
      fetchCard();
    } catch (error) {
      toast.error("Failed to assign patient");
      console.error(error);
    }
  };

  // Deactivate card
  const handleDeactivate = async () => {
    if (!window.confirm("Are you sure you want to deactivate this card?")) return;

    try {
      await axios.put(`http://localhost:5000/api/cards/${id}/deactivate`);
      toast.success("Card deactivated successfully");
      fetchCard();
    } catch (error) {
      toast.error("Failed to deactivate card");
      console.error(error);
    }
  };

  // Reactivate card
  const handleReactivate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/cards/${id}/activate`);
      toast.success("Card reactivated successfully");
      fetchCard();
    } catch (error) {
      toast.error("Failed to reactivate card");
      console.error(error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading card details...</div>;
  if (!card) return <div className="text-center py-10">Card not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-blue-50 shadow-md rounded-lg">
        
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Card Details</h1>

      <div className="mb-6  text-blue-900">
        <p><strong>Card UID:</strong> {card.card_uid}</p>
        <p><strong>Description:</strong> {card.description}</p>
        <p><strong>Status:</strong>{" "}
          {card.isActive ? (
            <span className="text-green-600 font-semibold">Active</span>
          ) : (
            <span className="text-red-600 font-semibold">Deactivated</span>
          )}
        </p>
        {card.patient ? (
          <p><strong>Assigned to:</strong> {card.patient.name}</p>
        ) : (
          <p><strong>Assigned to:</strong> Not assigned</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        {!assignMode && card.isActive && (
          <button
            onClick={() => setAssignMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Assign Patient
          </button>
        )}
        {card.isActive ? (
          <button
            onClick={handleDeactivate}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Deactivate Card
          </button>
        ) : (
          <button
            onClick={handleReactivate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Reactivate Card
          </button>
        )}
      </div>

      {/* Assign Patient Mode */}
      {assignMode && (
        <div className="bg-gray-100 p-4 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Assign Patient</h2>
          <select
            className="w-full p-2 border rounded mb-3"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="">-- Select Patient --</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
          <div className="flex gap-3">
            <button
              onClick={handleAssignPatient}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm Assignment
            </button>
            <button
              onClick={() => setAssignMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
