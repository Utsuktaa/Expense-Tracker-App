import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Cookies from "js-cookie";

const LineCharts = () => {
  const token = Cookies.get("token");
  const [eachDayIncomeAndExpense, setEachDayIncomeAndExpense] = useState([]);
  useEffect(() => {
    const getEachDayIncomeAndExpense = async () => {
      const response = await fetch(
        "http://localhost:5000/api/chart/eachDayIncomeAndExpense",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const balanceData = await response.json();
      setEachDayIncomeAndExpense(balanceData);
    };
    getEachDayIncomeAndExpense();
  }, []);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-2">Balance</h3>
      <ResponsiveContainer width="100%" height={170}>
        <LineChart data={eachDayIncomeAndExpense}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;
