import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Cookies from "js-cookie";

const BarChartComponent = () => {
  const token = Cookies.get("token");
  const [incomeVsExpense, setIncomesVsExpense] = useState([]);

  useEffect(() => {
    const getIncomeVsExpense = async () => {
      const response = await fetch(
        "http://localhost:5000/api/chart/incomeVsExpense",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setIncomesVsExpense(data);
    };
    getIncomeVsExpense();
  }, []);
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Monthly Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={incomeVsExpense}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#22c55e" />
          <Bar dataKey="expenses" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
