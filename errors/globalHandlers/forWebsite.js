const { NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { statusCode = 500, operational } = req.err;
  let { message } = req.err;

  if (NODE_ENV === 'production' && !operational) {
    message = 'try again later.';
  }

  res.status(statusCode).render('error', { title: 'Erorr', message });
};
