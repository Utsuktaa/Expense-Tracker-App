import { useState } from "react";
import Cookies from "js-cookie";
const initialState = {
  amount: "",
  date: new Date().toISOString().split("T")[0],
  description: "",
  category: "",
};

export default function IncomeExpenseForm() {
  const [type, setType] = useState("income"); // 'income' or 'expense'
  const token = Cookies.get("token");

  const [formData, setFormData] = useState(initialState);

  const categories = [
    "Salary",
    "Freelance",
    "Food",
    "Transport",
    "Shopping",
    "Utilities",
    "Entertainment",
    "Rent",
    "Gas",
    "Taxes",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "income") {
      const response = await fetch(
        "http://localhost:5000/api/transactions/add-income",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setFormData(initialState);
        const data = await response.json();
        alert(data.message);
      }
    } else if (type === "expense") {
      const response = await fetch(
        "http://localhost:5000/api/transactions/add-expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setFormData(initialState);
        const data = await response.json();
        alert(data.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl p-6">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setType("income")}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            type === "income" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setType("expense")}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            type === "expense" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Expense
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded-md font-semibold text-white transition ${
            type === "income"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </form>
    </div>
  );
}
