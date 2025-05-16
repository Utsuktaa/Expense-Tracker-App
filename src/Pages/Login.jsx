// Import required modules and components
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginWithGoogle from "../Components/LoginWithGoogle";
import Logo from "../Components/Logo";

const Login = () => {
  // State to store email and password input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Used for programmatic navigation

  // Handle input changes and update form state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Save user info and token in cookies
        document.cookie = `email=${data.email}; path=/; max-age=${
          7 * 24 * 60 * 60
        }`;
        document.cookie = `name=${data.name}; path=/; max-age=${
          7 * 24 * 60 * 60
        }`;
        document.cookie = `token=${data.token}; path=/; max-age=${
          7 * 24 * 60 * 60
        }`;

        // Redirect to homepage after login
        window.location.href = "/";
        // navigate("/"); // alternative method
      } else alert(data.message); // Show error message
    } catch (error) {
      // Handle fetch/network errors
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/background.jpg')" }}
    >
      <Logo />
      
      {/* Login form container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 bg-opacity-80"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {/* Email input field */}
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

        {/* Password input field */}
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

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-4"
        >
          Login
        </button>

        <div className="text-center mb-4">OR</div>

        {/* Google Login using OAuth */}
        <GoogleOAuthProvider clientId="174028467941-gsglk91lg6efiv449h6etkunth53gpku.apps.googleusercontent.com">
          <LoginWithGoogle />
        </GoogleOAuthProvider>

        {/* Forgot Password link */}
        <p className="text-center">
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </p>

        {/* Signup link */}
        <p className="text-center">
          Create an account?
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
