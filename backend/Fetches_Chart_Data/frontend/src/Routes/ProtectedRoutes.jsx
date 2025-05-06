import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import { useState } from "react";
import Transactions from "../Pages/Transactions";
import NotFound from "../Pages/NotFound";
import IncomeAndExpense from "../Pages/IncomeAndExpense";
import Layout from "../HOC/Layout";
import AdminLogin from "../Pages/AdminLogin";
import AdminDashboard from "../Pages/AdminDashboard";
import ManageUsers from "../Pages/ManageUser";
import Reports from "../Pages/Reports";
import Settings from "../Pages/Settings";

const ProtectedRoutes = () => {
  const [showPage, setShowPage] = useState(true);

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="" element={<Layout />}>
        <Route path="" element={<Dashboard setShowPage={setShowPage} />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="income-and-expense" element={<IncomeAndExpense />} />
      </Route>
      <Route path="admin" element={<AdminLogin />} />
      <Route path="adminDash" element={<AdminDashboard />} />
      <Route path="manageuser" element={<ManageUsers />} />
      <Route path="reports" element= {<Reports />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
};

export default ProtectedRoutes;
