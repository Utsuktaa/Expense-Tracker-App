import { BrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import PublicRoutes from "./Routes/PublicRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const [dailySpent, setDailySpent] = useState(0);
  const [weeklySpent, setWeeklySpent] = useState(0);

  const updateSpentAmounts = () => {
    fetch("http://localhost:5000/api/transactions/get-expense-summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDailySpent(data.dailySpent);
        setWeeklySpent(data.weeklySpent);
      })
      .catch((err) => {
        console.error("Failed to fetch budget summary:", err.message);
      });
  };

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        {token ? (
          role === "admin" ? (
            <AdminRoutes />
          ) : (
            <ProtectedRoutes
              dailySpent={dailySpent}
              weeklySpent={weeklySpent}
              updateSpentAmounts={updateSpentAmounts}
            />
          )
        ) : (
          <PublicRoutes />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
