import React from "react";

const Summary = () => {
  return (
    <div
      style={{
        backgroundColor: "#f1f5f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <h3>Financial Summary</h3>
      <p>
        <strong>Current Balance:</strong> Rs 0.00
      </p>

      <p>
        <strong>Total Income:</strong> Rs 0.00
      </p>
    </div>
  );
};

export default Summary;
