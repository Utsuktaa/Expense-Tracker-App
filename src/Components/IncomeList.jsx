import { useState, useEffect } from "react";
import IncomeExpenseForm from "./IncomeExpenseForm";

function IncomeList() {
  const [incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      const response = await fetch(
        "http://localhost:5000/api/transactions/get-incomes"
      );
      const data = await response.json();
      setIncomes(data.incomes);
    };

    fetchIncomes();
  }, []);

  const handleEditClick = (income) => {
    setSelectedIncome(income);
  };

  return (
    <div>
      {/* List of incomes with edit button */}
      {incomes.map((income) => (
        <div
          key={income._id}
          className="flex justify-between items-center mb-4"
        >
          <span>
            {income.source}: ${income.amount}
          </span>
          <button
            onClick={() => handleEditClick(income)}
            className="px-2 py-1 bg-blue-500 text-white rounded-full"
          >
            <i className="fa fa-pencil"></i>
          </button>
        </div>
      ))}

      <IncomeExpenseForm
        selectedIncome={selectedIncome}
        setSelectedIncome={setSelectedIncome}
        setIncomes={setIncomes}
      />
    </div>
  );
}

export default IncomeList;
