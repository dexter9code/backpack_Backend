module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || `Error`;

  if (req.originalUrl.startsWith("/backpack")) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render("error", {
      title: `Something went Wrong`,
    });
  }
};
