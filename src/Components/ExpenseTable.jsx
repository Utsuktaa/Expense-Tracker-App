import React from "react";
import { Pen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ExpenseTable = ({
  setIsEditMode,
  setFormData,
  setExpenses,
  expenses,
  setType,
}) => {
  const token = Cookies.get("token");

  useEffect(() => {
    const getExpense = async () => {
      const response = await fetch(
        "http://localhost:5000/api/transactions/get-expenses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setExpenses(data);
    };
    getExpense();
  }, []);

  const handleDelete = async (expenseId) => {
    const response = await fetch(
      `http://localhost:5000/api/transactions/delete-expense/${expenseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const newExpenses = expenses.filter(
        (expense) => expense._id !== expenseId
      );
      setExpenses(newExpenses);
    }
  };
  return (
    <div className="overflow-x-auto mt-8">
      <h1 className="text-4xl mb-2">Expenses</h1>
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <thead>
          <tr className="bg-red-500 text-white text-left">
            <th className="py-3 px-4">S.No</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4"></th>

            <th />
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <tr
                key={expense._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{expense.category}</td>
                <td className="py-2 px-4">{expense.amount}</td>
                <td className="py-2 px-4">
                  {new Date(expense.date).toISOString().split("T")[0]}
                </td>
                <td className="py-2 px-4">{expense.description}</td>

                <td className="flex gap-2 py-2 px-4">
                  <Trash2 onClick={() => handleDelete(expense._id)} />
                  <Pen
                    onClick={() => {
                      setIsEditMode(true);
                      setType("expense");
                      setFormData({
                        ...expense,
                        date: new Date(expense.date)
                          .toISOString()
                          .split("T")[0],
                      });
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No expense records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
