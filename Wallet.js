import React from 'react';

const Wallet = () => {
  return (
    <div style={{
      width: '48%',
      backgroundColor: '#f9fafb',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }}>
      <h3>Wallet</h3>
      <p><strong>Available Funds:</strong> €10,000.00</p>
      <p><strong>Last Deposit:</strong> €1,500.00</p>
    </div>
  );
};

export default Wallet;
