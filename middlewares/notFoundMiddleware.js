//not found
const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    error: "404 Not Found",
    message: `La route ${req.originalUrl} non esiste.`,
  });
};

module.exports = notFoundMiddleware;
