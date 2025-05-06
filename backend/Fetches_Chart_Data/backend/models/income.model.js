const { Schema, model, Types } = require("mongoose");

const IncomeSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);
const Income = model("Income", IncomeSchema);
module.exports = Income;
