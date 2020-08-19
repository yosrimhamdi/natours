module.exports = (err, req, res, next) => {
  console.error(err);
  req.err = err;

  next();
};
