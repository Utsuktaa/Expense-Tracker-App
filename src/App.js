// App.js - This is the main application component that renders the homepage layout.

import { useState } from "react";
import Logo from "./Components/Logo"; // Importing the Logo component
import Navbar from "./Components/Navbar"; // Importing the Navbar component
import Intro from "./Components/Intro"; // Importing the Intro section component
import SignUp from "./Components/SignUp"; // Importing the SignUp modal component
import Login from "./Components/Login"; // Importing the Login modal component

const App = () => {
  // State variables to control the visibility of SignUp and Login modals
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    // Main container with full-screen background image
    <div className="relative w-full h-screen bg-cover bg-center" 
         style={{ backgroundImage: "url('/image/background.jpg')" }}>
      
      {/* Logo component - Displays the app logo */}
      <Logo />

      {/* Navbar component - Contains Sign Up and Login buttons */}
      <Navbar setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} />

      {/* Intro component - Displays the introductory section */}
      <Intro />
      
      {/* SignUp modal - Displays when showSignUp is true */}
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}

      {/* Login modal - Displays when showLogin is true */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      
    </div>
  );
};

export default App;
