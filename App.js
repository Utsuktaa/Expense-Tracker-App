import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import OtpVerification from "./Components/OtpVerification";
import BarChart from "./Components/BarChart";
import Wallet from "./Components/Wallet";
import Summary from "./Components/Summary";

function App() {
  const [showPage, setShowPage] = useState(true);

  return (
    <BrowserRouter>
      <div style={{
        position: "relative",
        backgroundImage: showPage ? "url('/image/background.jpg')" : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: 'flex',
        flexDirection: 'row',
      }}>
        {/* White overlay on landing page */}
        {showPage && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // lightens any dark image
            zIndex: 0
          }} />
        )}

        {/* Routes section - keep content above overlay */}
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <Routes>
            <Route path="/" element={<Hero />} />

            <Route path="/homepage" element={
              <div style={{ display: "flex", height: "100vh", width: "100%", backgroundColor: "#ffffff" }}>
                {/* Sidebar */}
                <div style={{
                  width: '250px',
                  backgroundColor: '#2f3542',
                  position: 'fixed',
                  height: '100vh',
                  color: '#fff',
                  padding: '20px',
                  top: 0,
                  zIndex: 2,
                }}>
                  <Navbar setShowPage={setShowPage} />
                </div>

                {/* Main Content */}
                <div style={{
                  marginLeft: '250px',
                  flex: 1,
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <Summary />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Wallet />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <BarChart />
                  </div>
                </div>
              </div>
            } />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
