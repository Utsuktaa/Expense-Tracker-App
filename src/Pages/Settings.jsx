import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Logo from "../Components/Logo";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const renderToggleIcon = (section) => {
    return openSection === section ? <FaChevronUp /> : <FaChevronDown />;
  };
const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <div className="mb-8">
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
              <Link
                to="/settings"
                className={`block text-base py-2 px-4 rounded transition-colors duration-200 ${
                  isActive("/settings")
                    ? "bg-gray-700 font-semibold"
                    : "hover:bg-gray-700"
                }`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-8">Settings</h2>

        <div className="bg-blue-100 p-4 rounded space-y-4">
          {[
            { key: "theme", title: "Theme" },
            { key: "expense", title: "Add/edit expense" },
            { key: "budget", title: "Budget Limit" },
            { key: "security", title: "Security" },
            { key: "export", title: "Data Export" },
            { key: "profile", title: "Profile" },
          ].map(({ key, title }) => (
            <div key={key} className="bg-gray-300 rounded">
              <button
                onClick={() => toggleSection(key)}
                className="w-full flex justify-between items-center px-6 py-3 text-lg font-medium"
              >
                {title}
                {renderToggleIcon(key)}
              </button>

              {/* Content */}
              {openSection === key && (
                <div className="bg-white px-6 py-4 space-y-3">
                  {key === "theme" && (
                    <select className="border p-2 rounded w-full">
                      <option>Light</option>
                      <option>Dark</option>
                    </select>
                  )}

                  {key === "expense" && (
                    <>
                      <input
                        type="text"
                        placeholder="Expense Name"
                        className="border p-2 rounded w-full"
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        className="border p-2 rounded w-full"
                      />
                    </>
                  )}

                  {key === "budget" && (
                    <input
                      type="number"
                      className="border p-2 rounded w-full"
                      placeholder="Enter budget"
                    />
                  )}

                  {key === "security" && (
                    <input
                      type="password"
                      placeholder="Change Password"
                      className="border p-2 rounded w-full"
                    />
                  )}

                  {key === "export" && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                      Export as CSV
                    </button>
                  )}

                  {key === "profile" && (
                    <>
                      <input
                        type="text"
                        placeholder="Username"
                        className="border p-2 rounded w-full"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded w-full"
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
