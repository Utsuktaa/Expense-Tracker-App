import { Link } from "react-router-dom";
import { useRef } from "react";
import * as XLSX from "xlsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const dummyData = [
  { name: "John Doe", revenue: 4000, logins: 25 },
  { name: "Jane Smith", revenue: 3200, logins: 18 },
  { name: "Mike Johnson", revenue: 2750, logins: 30 },
];

const Reports = () => {
  const tableRef = useRef(null);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(dummyData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "Admin_Report.xlsx");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e293b] text-white p-6">
        <h2 className="text-2xl font-semibold mt-20 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/adminDash" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/manageuser" className="block hover:text-gray-300">
            Manage Users
          </Link>
          <Link to="/reports" className="block hover:text-gray-300 font-bold underline">
            Reports
          </Link>
          <Link to="/settings" className="block hover:text-gray-300">
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        {/* Logo + Heading */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export as Excel
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center">Reports</h2>

        {/* Chart */}
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dummyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">User Activity</h3>
          <div ref={tableRef} className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Revenue</th>
                  <th className="px-4 py-2 text-left">Logins</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">${user.revenue.toLocaleString()}</td>
                    <td className="px-4 py-2">{user.logins}</td>
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
