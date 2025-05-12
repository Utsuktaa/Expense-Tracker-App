import { useState } from "react";
import Overview from "../Components/Overview";
import Budgets from "../Components/Budgets";
import Accounts from "../Components/Accounts";
import FinancialCharts from "../Components/FinancialCharts";

import PieChart from "../Components/PieCharts";
import LineChart from "../Components/LineCharts";

function Transactions() {
  const [showPage, setShowPage] = useState(true);

  // Using isOtpVerified to avoid ESLint warning
  const isOtpVerified = false;
  if (isOtpVerified) {
    console.log("OTP Verified Successfully!");
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* <Navbar setShowPage={setShowPage} /> */}
      <div
        className="p-8"
        //  className="flex-1 p-8 ml-[250px]"
      >
        {showPage ? (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">Summary</h3>
                <p>
                  Balance:{" "}
                  <span className="text-green-600 font-bold">Rs. 0</span>
                </p>
                <p>
                  Credit Cards:{" "}
                  <span className="text-red-600 font-bold">Rs. 0</span>
                </p>
              </div>
              <PieChart />
              <LineChart />
            </div>
            <Overview />
            <Accounts />
            <FinancialCharts />
            <Budgets />
            {/* <Transactions /> */}
          </>
        ) : (
          <h2 className="text-center text-2xl font-bold mt-8">
            Click "Dashboard" to enter
          </h2>
        )}
      </div>
    </div>
  );
}

export default Transactions;
