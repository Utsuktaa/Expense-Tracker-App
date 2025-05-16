import BarChartComponent from "../Components/BarChart";
import IncomeExpenseForm from "../Components/IncomeExpenseForm";
import Summary from "../Components/Summary";
import Wallet from "../Components/Wallet";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f8f9fa", // light gray background
      }}
    >
      {/* Sidebar */}
      {/* <div style={{
                     width: '250px',
                     backgroundColor: '#2f3542',
                     position: 'fixed',
                     height: '100vh',
                     color: '#fff',
                     padding: '20px',
                     top: 0,
                     zIndex: 2,
                   }}> */}
      {/* <Navbar setShowPage={setShowPage} /> */}
      {/* </div> */}

      {/* Main Content */}
      <div
        style={{
          // marginLeft: "250px",
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Summary
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Wallet
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <BarChartComponent />
        </div>
      </div>

      {/* Income/Expense Form */}
      <div
        style={{
          width: "300px",
          backgroundColor: "#ffffff",
          padding: "20px",
          margin: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <IncomeExpenseForm />
      </div>
    </div>
  );
};

export default Dashboard;
