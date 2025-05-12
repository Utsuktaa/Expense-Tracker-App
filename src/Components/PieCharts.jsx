import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Cookies from "js-cookie";

const PieCharts = () => {
  const token = Cookies.get("token");
  const [thisMonthIncomeVsExpense, setThisMonthIncomeVsExpense] = useState([]);
  useEffect(() => {
    const getThisMonthIncomeVsExpense = async () => {
      const response = await fetch(
        "http://localhost:5000/api/chart/thisMonthIncomeVsExpense",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setThisMonthIncomeVsExpense(data);
    };
    getThisMonthIncomeVsExpense();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
      <h3 className="text-xl font-bold mb-2">This Month</h3>
      <PieChart width={250} height={250}>
        <Pie data={thisMonthIncomeVsExpense} dataKey="value" outerRadius={90}>
          {thisMonthIncomeVsExpense?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieCharts;
