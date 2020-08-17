const { NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  if (!req.originalUrl.startsWith('/api')) {
    return next();
  }

  const { statusCode = 500, status = 'error', stack, operational } = req.err;
  let { message } = req.err;

  if (NODE_ENV === 'production' && !operational) {
    message = 'something went wrong.';

    return res.status(statusCode).json({ status, message });
  }

  res.status(statusCode).json({
    status,
    message,
    stack,
    err: req.err,
  });
};
