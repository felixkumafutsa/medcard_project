import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddCard() {
  const [cardUID, setCardUID] = useState("");
  const [description, setDescription] = useState("");

  // Poll backend every 2 seconds to get last scanned UID
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/cards/last-scanned"
        );
        if (res.data && res.data.uid) setCardUID(res.data.uid);
      } catch (error) {
        console.error("Error fetching last scanned UID:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardUID) {
      toast.error("Please scan a card first!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/cards/register", {
        uid: cardUID,
        description,
      });
      toast.success("✅ Card successfully registered!");
      setCardUID("");
      setDescription("");
    } catch (error) {
      console.error("Error adding card:", error);
      toast.error(
        error.response?.data?.message ||
          "Error adding card. Card may already exist."
      );
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Card</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-2">Scanned Card UID:</label>
          <input
            type="text"
            value={cardUID}
            onChange={(e) => setCardUID(e.target.value)}
            placeholder="Scan the RFID card..."
            className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
            readOnly
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Description (optional):
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter card description"
            className="w-full px-3 py-2 border rounded-md  text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register Card
        </button>
      </form>
    </div>
  );
}
