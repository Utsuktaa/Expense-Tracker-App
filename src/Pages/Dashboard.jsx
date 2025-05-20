import BarChartComponent from "../Components/BarChart";
import BudgetTracker from "../Components/BudgetTracker";

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
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Bar Chart on Top */}
        <BarChartComponent />

        {/* Budget Tracker Below */}
        <BudgetTracker />
      </div>
    </div>
  );
};

export default Dashboard;
