import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center h-screen bg-black/40 text-white">

      {/* Top-right corner for Login and Signup */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <Link to="/login" className="text-white hover:text-blue-400 font-semibold">
          Login
        </Link>
        <Link to="/signup" className="text-white hover:text-blue-400 font-semibold">
          Sign Up
        </Link>
      </div>

      {/* Application Name */}
      <h1 className="text-6xl font-bold">
        <span className="text-[#000000]">XpenseS</span>
      </h1>

      {/* Descriptions */}
      <p className="text-[#000000] text-xl mt-4 font-semibold">
        <i>Track Your Expenses – The "X" represents growth and better financial control.</i>
      </p>
      <p className="text-[#000000] text-xl mt-4 font-semibold">
        <i>Multiply Your Savings – The "S" represents savings.</i>
      </p>

      {/* Home Button */}
      <Link
        to="/Homepage"
        className="mt-8 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Home
      </Link>
    </div>
  );
};

export default Hero;
