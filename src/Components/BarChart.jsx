import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dummy data for the bar chart
const data = [
  { name: 'January', income: 1000, expenses: 500 },
  { name: 'February', income: 1500, expenses: 800 },
  { name: 'March', income: 2000, expenses: 1000 },
  { name: 'April', income: 2500, expenses: 1200 },
  { name: 'May', income: 3000, expenses: 1500 },
];

const BarChartComponent = () => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Monthly Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
