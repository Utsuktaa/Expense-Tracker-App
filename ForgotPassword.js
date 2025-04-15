import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [input, setInput] = useState(""); // For email or phone number
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`OTP sent to ${input}`);
    navigate("/otp-verification"); // Redirect to OTP verification page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 bg-opacity-80">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>

        <label className="block mb-2">Enter Email or Phone Number</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
          placeholder="Email or Phone"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-4"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
