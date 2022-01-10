const ErrorResponse = require("../utilis/errorResponse");

// Custom error middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err);
  //Log to console for developer
  //   console.log(err.stack.blue);

  //Mongoose bad ID
  console.log(err);
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;

    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value is entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation Check
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
