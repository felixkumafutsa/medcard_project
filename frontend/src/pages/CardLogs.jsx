import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CardLogs() {
  const [reads, setReads] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("medcard_token");

  const fetchReads = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/card-reads", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      });
      setReads(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchReads();
    const interval = setInterval(fetchReads, 5000); // live update every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Card Reads</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <table className="min-w-full bg-gray-800 text-gray-100 border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">UID</th>
            <th className="p-2 border">Patient</th>
            <th className="p-2 border">Scanned By</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {reads.map((r) => (
            <tr key={r._id} className="odd:bg-gray-700 even:bg-gray-600">
              <td className="p-2 border">{r.cardUID}</td>
              <td className="p-2 border">{r.patient?.fullName || "N/A"}</td>
              <td className="p-2 border">{r.readBy?.name || "Unknown"}</td>
              <td className="p-2 border">{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





 
