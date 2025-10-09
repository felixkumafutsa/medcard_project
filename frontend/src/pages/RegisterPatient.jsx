import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth";
import { useNavigate } from "react-router-dom";

export default function RegisterPatient() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "male",
    email: "",
    phone: "",
    cardUID: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem("medcard_token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitPatient = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Register patient
      const { data: patient } = await axios.post(
        "http://localhost:5000/api/patients/register",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2️⃣ Log card read
      await axios.post(
        "http://localhost:5000/api/card-reads",
        { cardUID: form.cardUID, patientId: patient._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Patient registered successfully!");
      setError(null);
      setForm({ fullName: "", dob: "", gender: "male", email: "", phone: "", cardUID: "" });

      // Optional: redirect to patients list
      // navigate("/patients");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-900 text-gray-100 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Register Patient</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
      <form onSubmit={submitPatient} className="space-y-3">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="text"
          name="cardUID"
          placeholder="Scan Card UID"
          value={form.cardUID}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
