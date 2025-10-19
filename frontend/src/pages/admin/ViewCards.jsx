import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ViewCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cards");
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/cards/${cardId}`);
      toast.success("Card deleted successfully");
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-gray-600">Loading cards...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Registered RFID Cards</h2>
        <Link
          to="/admin/add-card"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md"
        >
          + Add New Card
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Card UID</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cards.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No cards registered yet
                </td>
              </tr>
            ) : (
              cards.map((card, index) => (
                <tr
                  key={card._id}
                  className="border-b hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-3  text-blue-700">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-blue-700">
                    {card.card_uid}
                  </td>
                  <td className="px-4 py-3  text-blue-700">{card.description}</td>
                  <td className="px-4 py-3  text-blue-700">
                    {card.patient ? card.patient.name : "Unassigned"}
                  </td>
                  <td className="px-4 py-3  text-blue-700">
                    {new Date(card.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/card/${card._id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => deleteCard(card._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
