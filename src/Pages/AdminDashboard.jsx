import React, { useEffect, useState } from "react";
import ConfirmModal from "../Components/ConfirmModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaFilm,
  FaMusic,
  FaShoppingCart,
  FaBus,
  FaGasPump,
  FaHouseUser,
  FaTools,
} from "react-icons/fa";
import { TbTaxEuro } from "react-icons/tb";
import Logo from "../Components/Logo";
import { Cell } from "recharts";
import { FaUsers } from "react-icons/fa";
import { useLocation } from "react-router-dom";

// Icons for categories
const getCategoryIcon = (category) => {
  switch (category) {
    case "Food":
      return (
        <FaUtensils
          style={{ marginRight: "8px", fontSize: "24px", color: "E3E7AF" }}
        />
      ); // orange
    case "Entertainment":
      return (
        <FaFilm
          style={{ marginRight: "8px", fontSize: "24px", color: "#A2A77F" }}
        />
      ); // indigo
    case "Music":
      return (
        <FaMusic
          style={{ marginRight: "8px", fontSize: "24px", color: "#EFF1C5" }}
        />
      ); // pink
    case "Shopping":
      return (
        <FaShoppingCart
          style={{ marginRight: "8px", fontSize: "24px", color: "#B97375" }}
        />
      ); // green
    case "Transport":
      return (
        <FaBus
          style={{ marginRight: "8px", fontSize: "24px", color: "#696D4A" }}
        />
      ); // blue
    case "Taxes":
      return (
        <TbTaxEuro
          style={{ marginRight: "8px", fontSize: "24px", color: "#4D7EA8" }}
        />
      ); // yellow
    case "Gas":
      return (
        <FaGasPump
          style={{ marginRight: "8px", fontSize: "24px", color: "#8789C0" }}
        />
      ); // red
    case "Rent":
      return (
        <FaHouseUser
          style={{ marginRight: "8px", fontSize: "24px", color: "#CE7B91" }}
        />
      ); // violet
    case "Utilities":
      return (
        <FaTools
          style={{ marginRight: "8px", fontSize: "24px", color: "#896978" }}
        />
      ); // teal
    default:
      return null;
  }
};

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [categorySpending, setCategorySpending] = useState([]);

  useEffect(() => {
    const fetchCategorySpending = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/spending-category"
        );
        setCategorySpending(res.data);
      } catch (err) {
        console.error("Failed to fetch category spending:", err);
      }
    };
    fetchCategorySpending();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard"
        );
        setTotalUsers(res.data.totalUsers);
        setTotalRevenue(res.data.totalRevenue);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    window.location.href = "/";
  };
  const filteredCategorySpending = categorySpending.filter(
    (item) => item._id !== "Salary"
  );
  const categoryColors = {
    Food: "#E3E7AF",
    Entertainment: "#A2A77F",
    Music: "#EFF1C5",
    Shopping: "#B97375",
    Transport: "#696D4A",
    Taxes: "#4D7EA8",
    Gas: "#8789C0",
    Rent: "#CE7B91",
    Utilities: "#896978",
  };

  const coloredCategorySpending = filteredCategorySpending.map((item) => ({
    ...item,
    fill: categoryColors[item._id] || "#a1a1aa", // default gray
  }));
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleSignOut = () => {
    setShowConfirm(true);
  };

  const confirmSignOut = () => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    window.location.href = "/";
  };
  return (
    <div className="admin-dashboard" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="admin-dashboard bg-gray-100 min-h-screen flex">
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
                {/* Logout Button */}
                <div className="w-full">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left text-base py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                  {showConfirm && (
                    <ConfirmModal
                      message="Are you sure you want to log out?"
                      onConfirm={confirmSignOut}
                      onCancel={() => setShowConfirm(false)}
                    />
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            Admin Dashboard
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-3 justify-items-center items-center">
            {/* Total Users */}
            <div className="bg-gradient-to-r from-gray-800 to-slate-800 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between w-full sm:w-96 lg:w-[300px] min-w-[300px]">
              <div>
                <h2 className="text-2xl font-semibold">Total Users</h2>
                <p className="text-3xl mt-2 font-bold">{totalUsers}</p>
              </div>
              <div className="text-2xl opacity-100 flex justify-center items-center">
                <FaUsers className="text-5xl" />
              </div>
            </div>
          </div>

          {/* Spending Breakdown */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Spending by Category
            </h2>
            <div style={{ marginTop: "30px" }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={coloredCategorySpending}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="_id"
                    tick={({ x, y, payload }) => {
                      const category = payload.value;
                      return (
                        <g transform={`translate(${x},${y + 10})`}>
                          <foreignObject x={-30} y={0} width={60} height={60}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {getCategoryIcon(category)}
                            </div>
                          </foreignObject>
                        </g>
                      );
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalAmount">
                    {coloredCategorySpending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
