import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";
import GoogleSignUp from "../Components/GoogleSignUp";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Sign Up Data:", formData);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        // console.log
        alert(data.message);
      }
    } catch (error) {}
  };

  const handleGoogleSignUp = () => {
    alert("Google Sign Up Clicked!");
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/background.jpg')" }}
    >
      <Logo />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 bg-opacity-80"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
          placeholder="Your Name"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
          placeholder="Your Email"
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-6"
          placeholder="Your Password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-4"
        >
          Sign Up
        </button>

        <div className="text-center mb-4">OR</div>

        <GoogleOAuthProvider clientId="931347685047-es5og9c0land051gpbm4qqc3cfnq576r.apps.googleusercontent.com">
          <GoogleSignUp />
        </GoogleOAuthProvider>

        <p className="text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
