import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { initialState } from "../Pages/IncomeAndExpense";
import { toast } from "react-hot-toast";

export default function IncomeExpenseForm({
  isEditMode,
  formData,
  setFormData,
  setIncomes,
  setExpenses,
  incomes,
  expenses,
  setIsEditMode,
  type,
  setType,
  updateSpentAmounts,
}) {
  const token = Cookies.get("token");

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
    try {
      if (isEditMode === false) {
        const response = await fetch(
          `http://localhost:5000/api/transactions/${
            type === "income" ? "add-income" : "add-expense"
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to add transaction");
        }

        const data = await response.json();

        type === "income"
          ? setIncomes((prevData) => [data.income, ...prevData])
          : setExpenses((prevData) => [data.expense, ...prevData]);

        toast.success(data.message);
        setFormData(initialState);
        updateSpentAmounts();
      } else {
        const response = await fetch(
          `http://localhost:5000/api/transactions/${
            type === "income" ? "update-income" : "update-expense"
          }/${formData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to update transaction");
        }

        const data = await response.json();

        if (type === "income") {
          const newIncomes = incomes.map((income) =>
            income._id === data.updatedIncome._id ? data.updatedIncome : income
          );
          setIncomes(newIncomes);
        } else {
          const newExpenses = expenses.map((expense) =>
            expense._id === data.updatedExpense._id
              ? data.updatedExpense
              : expense
          );
          setExpenses(newExpenses);
        }

        toast.success(data.message);
        setFormData(initialState);
        updateSpentAmounts();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-80 mx-auto mt-10 bg-white shadow-xl rounded-xl p-6">
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
          {isEditMode ? "Edit" : "Add"}{" "}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
        <button
          type="button"
          className={`w-full py-2 rounded-md font-semibold text-white transition bg-gray-500 hover:bg-black-600`}
          onClick={() => {
            setIsEditMode(false);
            setFormData(initialState);
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
}
