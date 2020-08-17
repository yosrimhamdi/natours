module.exports = (err, req, res, next) => {
  req.err = err;
  next();
};
