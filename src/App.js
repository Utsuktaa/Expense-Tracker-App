import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logo from "./Components/Logo";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import OtpVerification from "./Components/OtpVerification";
import AdminLogin from "./Components/AdminLogin"; 
import AdminDashboard from "./Components/AdminDashboard"; 
import ManageUsers from "./Components/ManageUsers";
import Reports from "./Components/Reports";
import Settings from "./Components/Settings";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image/background.jpg')" }}>

        <Logo />
        
        {/* Only render Navbar for non-admin routes */}
        <Routes>
          <Route path="/" element={<><Navbar /><Hero /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/signup" element={<><Navbar /><SignUp /></>} />
          <Route path="/forgot-password" element={<><Navbar /><ForgotPassword /></>} />
          <Route path="/otp-verification" element={<><Navbar /><OtpVerification /></>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} /> {/* Admin Login (No Navbar) */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin Dashboard (No Navbar) */}
          <Route path="/manage-users" element={<ManageUsers />} /> {/* Manage Users Page */}
          <Route path="/reports" element={<Reports />} /> {/* Reports Page */}
          <Route path="/settings" element={<Settings />} /> {/* Settings Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
