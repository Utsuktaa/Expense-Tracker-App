import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(""); // State for OTP input
  // Remove the following line if you don't need `isOtpVerified` for now
  // const [isOtpVerified, setIsOtpVerified] = useState(false); 
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") { // Assuming "123456" as a test OTP
      alert("OTP verified successfully!");
      navigate("/login"); // Redirect to login page after OTP is verified
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
      <form className="bg-white p-8 rounded-lg shadow-md w-96 bg-opacity-80">
        <h2 className="text-3xl font-bold mb-6 text-center">Enter OTP</h2>

        <label className="block mb-2">OTP</label>
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          required
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter OTP"
        />
        <button
          type="button"
          onClick={handleVerifyOtp}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-4"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
