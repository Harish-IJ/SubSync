// function (<information happened before the req>, <request>, <response>, <what to happen next>)
const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    // Type of Error
    // Mongoose bad ObjectID
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicare key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
      error = new Error(message);
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({ success: false, error: error.message || "Internal Server Error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
