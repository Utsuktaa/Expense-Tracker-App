import { useState, useEffect } from "react";
import axios from "axios";
import PieChart from "../Components/PieCharts";
import LineChart from "../Components/LineCharts";
import Cookies from "js-cookie";
import { FaMoneyBillAlt } from "react-icons/fa"; // Import Font Awesome icon
function Transactions() {
  const [showPage, setShowPage] = useState(true);
  const [userBalance, setUserBalance] = useState([]);
  const token = Cookies.get("token");

  // Fetch balance data when the component mounts
  useEffect(() => {
    if (!token) return; // If no token, don't make the API call

    // Fetch balance data from the backend with authorization
    fetch("http://localhost:5000/api/transactions/balance-by-day", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token in Authorization header
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized"); // Handle unauthorized error
        }
        return res.json();
      })
      .then((data) => {
        // Set balance data in the state
        setUserBalance(data);
      })
      .catch((err) => {
        console.error("Failed to fetch balance data:", err.message);
      });
  }, [token]);

  return (
    <div className="flex bg-gradient-to-r min-h-screen overflow-hidden">
      <div className="container mx-auto p-8">
        {showPage ? (
          <>
            {/* Top Row: Summary and PieChart side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                className="bg-gradient-to-r from-gray-800 to-slate-800 text-white p-6 bg-white rounded-xl shadow-lg  hover:shadow-xl transition-all duration-300 ease-in-out"
                style={{ height: "350px" }}
              >
                <div className="flex flex-col items-center justify-center mb-6">
                  <FaMoneyBillAlt className="text-6xl text-green-500 mb-4" />{" "}
                  {/* Larger icon size */}
                  <h3 className="text-5xl font-semibold text-white">Balance</h3>
                </div>
                {/* Display the most recent balance */}
                <p className="text-5xl font-bold text-white text-center">
                  <span className="text-green-500">Rs. </span>
                  {userBalance.length > 0
                    ? userBalance[userBalance.length - 1].balance
                    : 0}
                </p>
              </div>
              {/* Pie Chart Section */}
              <div
                className="bg-gradient-to-r from-gray-800 to-slate-800  p-6 rounded-xl shadow-md overflow-hidden"
                style={{ height: "350px" }}
              >
                <PieChart />
              </div>
            </div>

            {/* Bottom Row: LineChart */}
            <div
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden"
              style={{ height: "600px" }}
            >
              <LineChart />
            </div>
          </>
        ) : (
          <h2 className="text-center text-3xl font-bold text-gray-700 mt-8">
            Click "Dashboard" to enter
          </h2>
        )}
      </div>
    </div>
  );
}

export default Transactions;
