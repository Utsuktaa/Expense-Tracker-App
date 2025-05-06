const {
  getIncomesVsExpenses,
} = require("../controllers/incomeVsExpense.controller");

const verifyToken = require("../middlewares/auth.middleware");

const router = require("express").Router();
router.use(verifyToken);
router.get("/incomeVsExpense", getIncomesVsExpenses);
module.exports = router;
