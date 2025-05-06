// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/auth.route");
// const transactionRoutes = require("./routes/transaction.route");
// const connectDB = require("./db/connectDB");

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// const app = express();

// // app.use(cors());
// app.use(express.json());
// connectDB();

// app.enable("trust proxy");
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.options("http://localhost:3000", cors());

// app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const morgan = require("morgan");
// const path = require("path");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const transactionRoutes = require("./routes/transaction.route");
const incomesVsExpensesRoutes = require("./routes/incomeVsExpense.route");
// const connectDB = require("./db/connectDB");
// const router = require("./routes/routes");
// const authRouter = require("./routes/authRoutes"); // <- NEW LINE
const errorController = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const {
  getIncomesVsExpenses,
} = require("./controllers/incomeVsExpense.controller");
// const AppError = require("./utils/appError");
// const errorController = require("./controllers/errorController");

const app = express();

// dotenv.config({ path: "./env" }); // <- connecting the enviroment variables
dotenv.config(); // <- connecting the enviroment variables
// MIDLEWARES ->>
app.enable("trust proxy");

console.log("REMOTE: ", process.env.REMOTE);

// app.use(cors()); // <- CORS configuration, in case if you wanted to implemented authorization
app.use(cors({ credentials: true, origin: process.env.REMOTE })); // <- CORS configuration, in case if you wanted to implemented authorization
app.options(process.env.REMOTE, cors());

console.log(`ENV = ${process.env.NODE_ENV}`);
app.use(morgan("dev")); // <- Logs res status code and time taken

const limiter = rateLimit({
  // <- Limits the number of api calls that can be made per IP address
  max: 1000, // max number of times per windowMS
  windowMs: 60 * 60 * 1000,
  message: "!!! Too many requests from this IP, Please try again in 1 hour !!!",
});

// connectDB();

app.use("/api", limiter);
// app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);

app.use((req, res, next) => {
  // <- Serves req time and cookies

  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  if (req.cookies) console.log(req.cookies);
  next();
});

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use(express.json({ limit: "100mb" })); // <- Parses Json data
app.use(express.urlencoded({ extended: true, limit: "100mb" })); // <- Parses URLencoded data

app.use(mongoSanitize()); // <- Data Sanitization aganist NoSQL query Injection.
app.use(xss()); // <- Data Sanitization against xss

app.use(compression());

// app.use("/api/v1/auth/", authRouter); // <- NEW LINE
// app.use("/api/v1/", router);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/chart", incomesVsExpensesRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(errorController); // <- Error Handling Middleware

module.exports = app;
