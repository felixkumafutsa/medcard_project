import React, { useEffect, useState } from "react";
import API from "../services_api";
export default function Patients() {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    API.get("/patients")
      .then((r) => setPatients(r.data))
      .catch(() => setPatients([]));
  }, []);
  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">Patients</h1>
      <table className="min-w-full bg-gray-800 rounded">
        <thead>
          <tr className="text-left bg-gray-700">
            <th className="p-2">Name</th>
            <th className="p-2">DOB</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id} className="border-t border-gray-700">
              <td className="p-2">
                {p.firstName} {p.lastName}
              </td>
              <td className="p-2">
                {p.dob ? new Date(p.dob).toLocaleDateString() : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
