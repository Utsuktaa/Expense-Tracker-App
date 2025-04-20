import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Dummy data for the pie chart
const data = [
  { name: "Income", value: 1452, color: "#22c55e" },
  { name: "Expenses", value: 617.29, color: "#ef4444" },
];

function Homepage() {
  return (
    <div
      style={{
        minHeight: "100vh", // Ensure it takes full screen height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
        padding: "20px",
        overflow: "hidden", // Prevent scrollbars from showing
      }}
    >
      {/* Header */}
      <header
        style={{
          marginBottom: "20px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Welcome to Your Dashboard
        </h1>
      </header>

      {/* Pie Chart Section */}
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          flex: "1", // Allow the chart section to fill available space
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={120}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Overview Section */}
      <section
        style={{
          textAlign: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            color: "#333",
          }}
        >
          Financial Overview
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#666",
          }}
        >
          Your current balance is <strong>€13,627.71</strong>, with{" "}
          <strong>€249.00</strong> in credit card debt.
        </p>
      </section>
    </div>
  );
}

export default Homepage;
