const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const connectDB = require("./db/connectDB");

connectDB();

// Catching uncaught exception ->>
process.on("unCaughtException", (err) => {
  // console.log(UNCAUGHT EXCEPTION -> ${err.name} - ${err.message});
  console.log("App SHUTTING DOWN...");
  process.exit(1); // <- Then will shut down the server.
});

// Starting Server ->>
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  // console.log(App running at port, ${port}, "...");
});

// Catching unHandleled Rejections ->
process.on("unhandledRejection", (err) => {
  // console.log(UNHANDELLED REJECTION -> ${err.name} - ${err.message});
  console.log(err);
  console.log("App SHUTTING DOWN...");
  server.close(() => {
    // <- This will first terminate all requests

    process.exit(1); // <- Then will shut down the server.
  });
});
