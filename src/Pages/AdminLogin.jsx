import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",  
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for admin credentials
    if (formData.username === "admin" && formData.password === "1234") {
      
      navigate("/adminDash"); // Redirect to Admin Dashboard
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div
    className="flex items-center justify-center h-screen bg-black/50 bg-cover bg-center"

     >
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 bg-opacity-80">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>

        {/* Username input instead of email */}
        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
          placeholder="Username"
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-6"
          placeholder="Password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
