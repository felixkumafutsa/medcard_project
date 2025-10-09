import React from "react";
export default function Dashboard() {
  const stats = [
    { name: "Total Patients", value: 120 },
    { name: "Card Reads", value: 345 },
    { name: "Active Cards", value: 80 },
  ];
  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded shadow">
            <p className="text-gray-400">{s.name}</p>
            <h2 className="text-3xl font-bold">{s.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
