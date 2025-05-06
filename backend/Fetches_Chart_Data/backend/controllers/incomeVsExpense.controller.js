const Income = require("../models/income.model");

const getStartMonthAndEndMonth = (year, month) => {
  const startMonth = new Date(year, month, 1);
  const endMonth = new Date(year, month, 31);
  return { startMonth, endMonth };
};

const getIncomesVsExpenses = async (req, res) => {
  try {
    const year = 2025;
    const totals = [];
    for (let index = 0; index < 12; index++) {
      const { startMonth, endMonth } = getStartMonthAndEndMonth(year, index);
      const incomes = await Income.find({
        user: req.user.userId,
        date: { $gte: startMonth, $lte: endMonth },
      }).select("amount date"); //fetch amount and date
      const totalIncome = incomes.reduce((accumulator, income) => {
        return accumulator + income.amount;
      }, 0);
      totals.push({
        income: totalIncome,
        name: new Date(year, index, 1).toLocaleString("default", {
          month: "long",
        }),
      });
    }
    // console.log(new Date(2025, 0, 1)); //0 - January
    res.status(200).json(totals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { getIncomesVsExpenses };
