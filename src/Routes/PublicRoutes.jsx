import { Routes, Route } from "react-router-dom";
import Hero from "../Pages/Hero";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import OtpVerification from "../Pages/OtpVerification";
import ForgotPassword from "../Pages/ForgotPassword";
import NotFound from "../Pages/NotFound";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Hero />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="otp-verification" element={<OtpVerification />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default PublicRoutes;
