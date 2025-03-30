import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logo from "./Components/Logo";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import OtpVerification from "./Components/OtpVerification"; // OTP Verification page
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <Router>
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/image/background.jpg')" }}
      >
        <Logo />
        <Navbar />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/login"
            element={
              <GoogleOAuthProvider clientId="174028467941-gsglk91lg6efiv449h6etkunth53gpku.apps.googleusercontent.com">
                <Login />
              </GoogleOAuthProvider>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />{" "}
          {/* OTP Verification Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
