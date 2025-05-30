import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert("Login Successful! OTP Sent.");
    navigate("/otp-verification"); // Redirect to OTP page after login
  };

  const responseGoogle = (authResult) => {
    try {
      if (authResult.code) {
        console.log(authResult.code);
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleGoogleLogin = () => {
  //   alert("Google login clicked!");
  //   // Implement your Google login logic here
  // };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/your-background-image.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 bg-opacity-80"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

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
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-4"
        >
          Login
        </button>

        <div className="text-center mb-4">OR</div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full border rounded-lg p-2 hover:bg-gray-200 mb-4"
        >
          <img
            src="/image/google.png"
            alt="Google Logo"
            className="w-5 h-5 mr-3"
          />
          Login with Google
        </button>

        <p className="text-center">
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </p>

        <p className="text-center">
          Create an account?{" "}
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
