import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Get token from cookie (or wherever you store it)
  const token = Cookies.get("token");

  useEffect(() => {
    const savedName = Cookies.get("name") || "";
    const savedEmail = Cookies.get("email") || "";
    setName(savedName);
    setEmail(savedEmail);
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      // Update cookies
      Cookies.set("name", name, { expires: 7 });
      Cookies.set("email", email, { expires: 7 });

      toast.success("Profile updated!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (!currentPassword || !newPassword) {
      toast.error("Please fill out all password fields.");
      return;
    }

    try {
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update password");

      toast.success("Password updated!");

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Edit Profile
      </h2>

      {/* Profile Info Form */}
      <form onSubmit={handleProfileSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors mb-10"
        >
          Save Changes
        </button>
      </form>

      {/* Password Change Form */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Change Password
      </h3>
      <form onSubmit={handlePasswordSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="currentPassword">
            Current Password:
          </label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="newPassword">
            New Password:
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">
            Confirm New Password:
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default Profile;
