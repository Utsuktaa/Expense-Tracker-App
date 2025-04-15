import { useState } from "react";
import Navbar from "./Navbar";
import Overview from "./Overview";
import Accounts from "./Accounts";
import Budgets from "./Budgets";
import Transactions from "./Transactions";
import FinancialCharts from "./FinancialCharts";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Income', value: 1452, color: '#22c55e' },
  { name: 'Expenses', value: Math.round(617.29), color: '#ef4444' } 
];

const balanceData = [
  { date: "Apr 1", balance: 11000 },
  { date: "Apr 8", balance: 11500 },
  { date: "Apr 15", balance: 12000 },
  { date: "Apr 22", balance: 12500 },
  { date: "May 1", balance: 13000 },
  { date: "May 10", balance: 14000 }
];

function Homepage() {
  const [showPage, setShowPage] = useState(true);
  
  // Using isOtpVerified to avoid ESLint warning
  const isOtpVerified = false;
  if (isOtpVerified) {
    console.log("OTP Verified Successfully!");
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Navbar setShowPage={setShowPage} />
      <div className="flex-1 p-8">
        {showPage ? (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">Summary</h3>
                <p>Balance: <span className="text-green-600 font-bold">€13,627.71</span></p>
                <p>Credit Cards: <span className="text-red-600 font-bold">-€249.00</span></p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                <h3 className="text-xl font-bold mb-2">This Month</h3>
                <PieChart width={250} height={250}>
                  <Pie data={data} dataKey="value" outerRadius={90}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">Balance</h3>
                <ResponsiveContainer width="100%" height={170}>
                  <LineChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Overview />
            <Accounts />
            <FinancialCharts />
            <Budgets />
            <Transactions />
          </>
        ) : (
          <h2 className="text-center text-2xl font-bold mt-8">Click "Dashboard" to enter</h2>
        )}
      </div>
    </div>
  );
}

export default Homepage;
