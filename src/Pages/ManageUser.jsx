import { useState } from "react";
import { Link } from "react-router-dom"; // assuming you're using react-router

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    if (newUser.name && newUser.email) {
      const id = users.length + 1;
      setUsers([...users, { id, ...newUser }]);
      setNewUser({ name: "", email: "" });
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e293b] text-white p-6">
        <h2 className="text-2xl font-semibold mt-20 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/adminDash" className="block hover:text-gray-300">Dashboard</Link>
          <Link to="/manageuser" className="block hover:text-gray-300 font-bold underline">Manage Users</Link>
          <Link to="/reports" className="block hover:text-gray-300">Reports</Link>
          <Link to="/settings" className="block hover:text-gray-300">Settings</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

        {/* Add User */}
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
            onClick={addUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>

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
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-3">{user.id}</td>
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => {
                        const name = prompt("Enter new name", user.name);
                        const email = prompt("Enter new email", user.email);
                        if (name && email) updateUser(user.id, { name, email });
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
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
