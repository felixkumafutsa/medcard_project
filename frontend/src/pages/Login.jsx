import React, { useState, useContext } from "react";
import API from "../services_api";
import { AuthContext } from "../auth";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data.user, data.token);
      navigate("/");
    } catch (e) {
      setErr(e.response?.data?.message || e.message);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-primary text-center">
          Login
        </h1>
        <form onSubmit={submit}>
          <input
            className="w-full p-2 mb-3 rounded bg-gray-700 text-gray-100"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 mb-3 rounded bg-gray-700 text-gray-100"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-primary text-white py-2 rounded hover:bg-indigo-500"
            type="submit"
          >
            Sign In
          </button>
        </form>
        {err && <div className="text-red-400 mt-2">{err}</div>}
      </div>
    </div>
  );
}
