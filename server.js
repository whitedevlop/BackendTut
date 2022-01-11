const express = require("express");
const dotenv = require("dotenv");
// bringing middleware logger to server.js
// const logger = require("./middleware/logger");

// bringing morgan logger
const morgan = require("morgan");
const colors = require("colors");

// Bringing errorHandler
const errorHandler = require("./middleware/error"); 

const connectDB = require("./config/db");

//LOAD ENV VARS
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

// Calling errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

// // Handled and unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`);

//   // Close and exit process
//   server.close(() => process.exit(1));
// });