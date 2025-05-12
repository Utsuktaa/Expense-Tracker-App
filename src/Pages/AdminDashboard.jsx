// import { useNavigate, Link } from "react-router-dom";
// import Logo from "../Components/Logo";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   // Handle logout and redirect to home page
//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="admin-dashboard" style={{ backgroundColor: "#F5F5F5" }}>
//       <div className="flex">
//         {/* Sidebar */}
//         <div className="w-64 bg-gray-800 text-white min-h-screen p-6 relative">
//           {/* Logo (Clicking it redirects to home page) */}
//           <Logo />

//           {/* Sidebar Navigation */}
//           <h2 className="text-2xl font-semibold mt-20 mb-6">Admin Panel</h2>
//           <ul>
//             <li>
//               <Link
//                 to="/adminDash"
//                 className="block text-lg py-2 px-4 hover:bg-gray-700"
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/manageuser"
//                 className="block text-lg py-2 px-4 hover:bg-gray-700"
//               >
//                 Manage Users
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/reports"
//                 className="block text-lg py-2 px-4 hover:bg-gray-700"
//               >
//                 Reports
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/settings"
//                 className="block text-lg py-2 px-4 hover:bg-gray-700"
//               >
//                 Settings
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           <h1 className="text-4xl font-bold text-center mb-4">
//             Admin Dashboard
//           </h1>

//           {/* Dashboard Stats */}
//           <div className="grid grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded shadow-md">
//               <h2 className="text-2xl font-semibold">Total Users</h2>
//               <p className="text-lg mt-2">1,234</p>
//             </div>
//             <div className="bg-white p-6 rounded shadow-md">
//               <h2 className="text-2xl font-semibold">Total Revenue</h2>
//               <p className="text-lg mt-2">$12,345.67</p>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="mt-8">
//             <h2 className="text-2xl font-semibold">Recent Activity</h2>
//             <ul className="mt-4">
//               <li className="p-4 border-b">User John Doe logged in</li>
//               <li className="p-4 border-b">User Jane Smith updated profile</li>
//               <li className="p-4 border-b">New report generated</li>
//             </ul>
//           </div>

//           {/* Logout Button */}
//           <div className="text-center mt-6">
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// Import React Router utilities for navigation and linking
import { useNavigate, Link } from "react-router-dom";

// Import React hooks and axios for fetching data
import { useEffect, useState } from "react";
import axios from "axios";

// Import the Logo component
import Logo from "../Components/Logo";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State for dynamic data
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activityLog, setActivityLog] = useState([]);

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("/api/admin/dashboard"); // Adjust if needed
        setTotalUsers(res.data.totalUsers);
        setTotalRevenue(res.data.totalRevenue);
        setActivityLog(res.data.recentActivity); // Array of strings
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle logout and redirect to home page
  const handleLogout = () => {
    navigate("/"); // Redirect to home on logout
  };

  return (
    // Wrapper div with light background color
    <div className="admin-dashboard" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="flex">
        {/* Sidebar Section */}
        <div className="w-64 bg-gray-800 text-white min-h-screen p-6 relative">
          {/* Logo */}
          <Logo />

          {/* Sidebar Navigation Heading */}
          <h2 className="text-2xl font-semibold mt-20 mb-6">Admin Panel</h2>

          {/* Navigation Links */}
          <ul>
            <li>
              <Link
                to="/adminDash"
                className="block text-lg py-2 px-4 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/manageuser"
                className="block text-lg py-2 px-4 hover:bg-gray-700"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className="block text-lg py-2 px-4 hover:bg-gray-700"
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block text-lg py-2 px-4 hover:bg-gray-700"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Dashboard Title */}
          <h1 className="text-4xl font-bold text-center mb-4">
            Admin Dashboard
          </h1>

          {/* Quick Stats Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Total Users */}
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-semibold">Total Users</h2>
              <p className="text-lg mt-2">{totalUsers}</p>
            </div>

            {/* Total Revenue */}
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-semibold">Total Revenue</h2>
              <p className="text-lg mt-2">Rs {totalRevenue}</p>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            <ul className="mt-4">
              {activityLog.length === 0 ? (
                <li className="p-4 border-b text-gray-500 italic">
                  No activity yet.
                </li>
              ) : (
                activityLog.map((entry, index) => (
                  <li key={index} className="p-4 border-b">
                    {entry}
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Logout Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
