export default function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;

  // Log error with context
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.error(err.stack);

  // Handle known error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Default error response
  res.status(statusCode).json({
    error: err.message,
    path: req.originalUrl,
    method: req.method,
  });
}