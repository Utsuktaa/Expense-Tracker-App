import { Routes, Route } from "react-router-dom";
import NotFound from "../Pages/NotFound";

import AdminLogin from "../Pages/AdminLogin";
import AdminDashboard from "../Pages/AdminDashboard";
import ManageUsers from "../Pages/ManageUser";
import Reports from "../Pages/Reports";
import Settings from "../Pages/Settings";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<AdminDashboard />} />
      <Route path="manageuser" element={<ManageUsers />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
};

export default ProtectedRoutes;
