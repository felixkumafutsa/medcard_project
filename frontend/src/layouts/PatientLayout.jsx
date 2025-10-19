import React from "react";

export default function PatientLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white">
        <h2 className="text-lg font-bold p-4">Patient Dashboard</h2>
        <nav>
          <ul>
            <li>
              <a href="/patient/dashboard" className="block p-4 hover:bg-gray-700">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/patient/records" className="block p-4 hover:bg-gray-700">
                Medical Records
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
