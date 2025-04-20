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
        backgroundColor: "#ffffff",
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
        }}
      >
        <Summary />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Wallet />
        </div>
        <div style={{ marginTop: "20px" }}>
          <BarChartComponent />
        </div>
      </div>

      {/* <Transactions/ > */}
      <IncomeExpenseForm />
    </div>
  );
};

export default Dashboard;
