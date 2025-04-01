// Navbar.js - This component renders the navigation bar with Sign Up and Login buttons.

const Navbar = ({ setShowSignUp, setShowLogin }) => {
  return (
    // Container div for positioning the navigation bar at the top-right
    <div className="absolute top-5 right-5 flex gap-3 text-gray-700">

      {/* Sign Up button - Opens the sign-up modal when clicked */}
      <button
        className="px-4 py-2 rounded-lg font-semibold text-sm h-10 flex items-center text-black"
        onClick={() => setShowSignUp(true)}
      >
        Sign Up
      </button>

      {/* Login button - Opens the login modal when clicked */}
      <button
        className="px-4 py-2 border rounded-lg font-semibold text-sm h-10 flex items-center text-black"
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>
      
    </div>
  );
};

export default Navbar;
