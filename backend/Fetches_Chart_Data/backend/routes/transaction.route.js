const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense.controller");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income.controller");
const verifyToken = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.use(verifyToken);
router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
