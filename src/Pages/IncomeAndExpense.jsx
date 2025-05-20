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

const IncomeAndExpense = ({
  updateSpentAmounts, 
  dailySpent,
  weeklySpent,
  dailyBudget,
  weeklyBudget,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [type, setType] = useState("income");

  return (
    <div className="flex gap-4 items-start">
      {/* Left side: Tables */}
      <div className="flex-grow space-y-4">
        <IncomeTable
          setIsEditMode={setIsEditMode}
          setFormData={setFormData}
          setIncomes={setIncomes}
          incomes={incomes}
          setType={setType}
        />
        <ExpenseTable
          setExpenses={setExpenses}
          expenses={expenses}
          setIsEditMode={setIsEditMode}
          setFormData={setFormData}
          setType={setType}
        />
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
          type={type}
          setType={setType}
          updateSpentAmounts={updateSpentAmounts}
        />
      </div>
    </div>
  );
};

export default IncomeAndExpense;
