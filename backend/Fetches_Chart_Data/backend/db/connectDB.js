const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connection Successful");
  } catch (error) {
    console.log("DB Connection Error");
  }
};

module.exports = connectDB;
