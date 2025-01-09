//error
const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message: err.message || "Errore interno del server.",
  });
};

module.exports = errorMiddleware;
