import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import Logo from "../Components/Logo";
import Cookies from "js-cookie";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [userData, setUserData] = useState([]);
  const tableRef = useRef(null);
  const location = useLocation();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) return; // If no token, stop the request

    const fetchData = async () => {
      try {
        const res = await axios.get("/api/reports/all-users-balances", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the request header
          },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch report data:", err.response || err);
      }
    };

    fetchData();
  }, [token]);

  const exportToExcel = () => {
    const simplifiedData = userData.map((user) => ({
      Name: user.name,
      Balance: user.totalBalance,
    }));

    const ws = XLSX.utils.json_to_sheet(simplifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "User Balances");
    XLSX.writeFile(wb, "User_Balances_Report.xlsx");
  };

  const isActive = (path) => location.pathname === path;
  const handleLogout = () => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <div className="mb-20">
          <Logo />
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`block text-base py-2 px-4 rounded transition-colors duration-200 ${
                  isActive("/")
                    ? "bg-gray-700 font-semibold"
                    : "hover:bg-gray-700"
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/manageuser"
                className={`block text-base py-2 px-4 rounded transition-colors duration-200 ${
                  isActive("/manageuser")
                    ? "bg-gray-700 font-semibold"
                    : "hover:bg-gray-700"
                }`}
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className={`block text-base py-2 px-4 rounded transition-colors duration-200 ${
                  isActive("/reports")
                    ? "bg-gray-700 font-semibold"
                    : "hover:bg-gray-700"
                }`}
              >
                Reports
              </Link>
            </li>
            <li>
              <div className="w-full">
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-base py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-8 space-y-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export as Excel
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center">Reports</h2>

        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Balance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalBalance" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">User Balances</h3>
          <div ref={tableRef} className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Total Balance (Rs)</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">
                      {user.totalBalance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
