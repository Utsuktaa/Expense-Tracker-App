import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Components/Logo";
import Cookies from "js-cookie";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user-details")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Fetch users error:", err));
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const updateUser = () => {
    if (!newUser.name || !newUser.email) return;

    axios
      .put(`http://localhost:5000/api/user-details/user/${editUserId}`, {
        name: newUser.name,
        email: newUser.email,
      })
      .then((res) => {
        setUsers(
          users.map((user) =>
            user._id === editUserId
              ? { ...user, name: newUser.name, email: newUser.email }
              : user
          )
        );
        setNewUser({ name: "", email: "" });
        setIsEditing(false);
      })
      .catch((err) => console.error("Update error:", err));
  };

  const clearForm = () => {
    setNewUser({ name: "", email: "" });
    setIsEditing(false);
    setEditUserId(null);
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/api/user-details/user/${id}`)
      .then((res) => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleEdit = (user) => {
    setNewUser({ name: user.name, email: user.email });
    setEditUserId(user._id);
    setIsEditing(true);
  };
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
              {/* Logout Button */}
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

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

        {/* Edit User */}
        {isEditing && (
          <div className="bg-white p-4 rounded shadow mb-6 flex items-center gap-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-1/4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-1/4"
            />
            <button
              onClick={updateUser}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Update User
            </button>

            <button
              onClick={clearForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Clear
            </button>
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
