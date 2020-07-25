const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');

const updateMe = (req, res, next) => {
  const { newName, newEamil } = req.body;
};

module.exports = { updateMe };
