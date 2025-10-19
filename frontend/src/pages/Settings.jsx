import React from "react";

export default function Settings() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email Notifications</label>
          <input type="checkbox" className="mr-2" />
          <span className="text-sm">Enable email notifications</span>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Account Privacy</label>
          <select className="border p-2 rounded">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
