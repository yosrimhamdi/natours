const AppError = require('./appError');

const _handleDuplicateKeyError = (err) => {
  const message = `Duplicate field value '${err.keyValue.name}'. Please use another value.`;

  return new AppError(message, 400);
};

const _handleValidationError = (err) => {
  const { message } = err;

  return new AppError(message, 400);
};

const _handleObjectIdError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

const _sendErrorDev = (err, res) => {
  const { message, statusCode = 500, status = 'err', stack } = err;

  res.status(statusCode).json({ status, message, error: err, stack });
};

const _sendErrorProd = (err, res) => {
  //eslint-disable-next-line
  let { message, statusCode = 500, status = 'err', operational } = err;

  if (!operational) {
    console.error(err);
    message = 'Something went wrong!';
  }

  res.status(statusCode).json({ status, message });
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    return _sendErrorDev(err, res);
  }

  let newError = { ...err };

  if (err.kind) newError = _handleObjectIdError(err);
  if (newError._message) newError = _handleValidationError(err);
  if (newError.code) newError = _handleDuplicateKeyError(err);

  _sendErrorProd(newError, res);
};
