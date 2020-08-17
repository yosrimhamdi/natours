const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const createToken = payload => {
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return token;
};

const verifyToken = token => {
  return promisify(jwt.verify)(token, process.env.JWT_SECRET);
};
module.exports = { createToken, verifyToken };
