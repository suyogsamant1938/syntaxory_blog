export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log the full error for developers
  console.error(`[Error] ${statusCode}: ${err.message}`);
  if (err.stack && process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    error: statusCode === 500 ? "Internal Server Error" : err.message,
    status: statusCode
  });
};
