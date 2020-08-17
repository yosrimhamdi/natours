const AppError = require('./appError');

const routeNotFound = (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
};

module.exports = routeNotFound;
