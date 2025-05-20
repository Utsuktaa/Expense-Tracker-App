import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import { useState } from "react";
import Transactions from "../Pages/Transactions";
import Homepage from "../Pages/Homepage";
import NotFound from "../Pages/NotFound";
import IncomeAndExpense from "../Pages/IncomeAndExpense";
import Layout from "../HOC/Layout";
import Profile from "../Pages/Profile";

const ProtectedRoutes = ({ updateSpentAmounts, dailySpent, weeklySpent }) => {
  const [setShowPage] = useState(true);

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="" element={<Layout />}>
        <Route path="" element={<Dashboard setShowPage={setShowPage} />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="income-and-expense"
          element={
            <IncomeAndExpense
              updateSpentAmounts={updateSpentAmounts}
              dailySpent={dailySpent}
              weeklySpent={weeklySpent}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
