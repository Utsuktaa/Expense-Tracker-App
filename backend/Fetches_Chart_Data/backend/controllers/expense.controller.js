const Expense = require("../models/expense.model");

const addExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  const expense = new Expense({
    amount,
    category,
    description,
    date,
    user: req.user.userId,
  });

  try {
    //validations
    if (!category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getExpense = async (req, res) => {
  try {
    const incomes = await Expense.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addExpense, deleteExpense, getExpense };
