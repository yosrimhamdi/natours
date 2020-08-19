module.exports = (err, req, res, next) => {
  console.log(err);
  req.err = err;

  next();
};
