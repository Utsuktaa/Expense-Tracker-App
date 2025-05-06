const Income = require("../models/income.model");

const addIncome = async (req, res) => {
  const { amount, category, description, date } = req.body;

  const income = new Income({
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
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    await Income.findByIdAndDelete(id);
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addIncome, deleteIncome, getIncomes };
