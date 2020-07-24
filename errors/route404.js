const AppError = require('./appError');

const route404 = (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
};

module.exports = route404;
