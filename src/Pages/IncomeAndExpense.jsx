import React, { useEffect } from "react";
import IncomeExpenseForm from "../Components/IncomeExpenseForm";
import IncomeTable from "../Components/IncomeTable";
import ExpenseTable from "../Components/ExpenseTable";
import { useState } from "react";

export const initialState = {
  amount: "",
  date: new Date().toISOString().split("T")[0],
  description: "",
  category: "",
};

const IncomeAndExpense = () => {
  const [formData, setFormData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  return (
    <div className="flex gap-4 items-start">
      {/* Left side: Tables */}
      <div className="flex-grow space-y-4">
        <IncomeTable
          setIsEditMode={setIsEditMode}
          setFormData={setFormData}
          setIncomes={setIncomes}
          incomes={incomes}
        />
        <ExpenseTable setExpenses={setExpenses} expenses={expenses} />
      </div>

      {/* Right side: Form */}
      <div>
        <IncomeExpenseForm
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          formData={formData}
          setFormData={setFormData}
          setIncomes={setIncomes}
          setExpenses={setExpenses}
          incomes={incomes}
          expenses={expenses}
        />
      </div>
    </div>
  );
};

export default IncomeAndExpense;
