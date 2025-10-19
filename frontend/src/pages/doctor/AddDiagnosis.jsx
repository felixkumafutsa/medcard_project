import React from "react";
export default function AddDiagnosis() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Add Diagnosis</h2>
      <form className="bg-white p-4 rounded shadow-md max-w-lg">
        <input type="text" placeholder="Patient ID" className="border p-2 w-full mb-3 rounded" />
        <textarea placeholder="Diagnosis details" className="border p-2 w-full mb-3 rounded h-24"></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Diagnosis
        </button>
      </form>
    </div>
  );
}
