import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
    alert("Sign Up Successful!");
    navigate("/login");
  };

  const handleGoogleSignUp = () => {
    alert("Google Sign Up Clicked!");
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-black/50 bg-cover bg-center"
      style={{ backgroundImage: "url('/your-background-image.jpg')" }}
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

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="flex items-center justify-center w-full border rounded-lg p-2 hover:bg-gray-200 mb-4"
        >
          <img
            src="/image/google.png"
            alt="Google Logo"
            className="w-5 h-5 mr-3"
          />
          Sign Up with Google
        </button>

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
