const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');

const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: { users },
  });
});

module.exports = { getUsers };
