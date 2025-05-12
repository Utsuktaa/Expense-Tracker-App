import { Pen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const IncomeTable = ({ setIsEditMode, setFormData, setIncomes, incomes }) => {
  const token = Cookies.get("token");

  useEffect(() => {
    const getIncome = async () => {
      const response = await fetch(
        "http://localhost:5000/api/transactions/get-incomes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setIncomes(data);
    };
    getIncome();
  }, []);

  const handleDelete = async (incomeId) => {
    const response = await fetch(
      `http://localhost:5000/api/transactions/delete-income/${incomeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const newIncomes = incomes.filter((income) => income._id !== incomeId);
      setIncomes(newIncomes);
    }
  };

  return (
    <div className="overflow-x-auto mt-8">
      <h1 className="text-4xl mb-2">Income</h1>
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <thead>
          <tr className="bg-green-500 text-white text-left">
            <th className="py-3 px-4">S.No</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>

        <tbody>
          {incomes.length > 0 ? (
            incomes.map((income, index) => (
              <tr
                key={income._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{income.category}</td>
                <td className="py-2 px-4">{income.amount}</td>
                <td className="py-2 px-4">
                  {new Date(income.date).toISOString().split("T")[0]}
                </td>
                <td className="py-2 px-4">{income.description}</td>
                <td className="flex gap-2 py-2 px-4">
                  <Trash2 onClick={() => handleDelete(income._id)} />
                  <Pen
                    onClick={() => {
                      setIsEditMode(true);
                      setFormData({
                        ...income,
                        date: new Date(income.date).toISOString().split("T")[0],
                      });
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No income records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeTable;
