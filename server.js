const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
// bringing middleware logger to server.js
// const logger = require("./middleware/logger");

// bringing morgan logger
const morgan = require("morgan");
const colors = require("colors");

// file i.e. image upload
const fileupload = require("express-fileupload");

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
const auth = require("./routes/auth");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// file uploading
app.use(fileupload());

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

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
