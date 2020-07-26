const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');

const updateName = catchAsync(async (req, res, next) => {
  const { newName, password } = req.body;
  const { user } = req;

  if (!password) return next(new AppError('password is required', 400));

  const isValidPassword = await user.validatePassword(password);

  if (!isValidPassword) return next(new AppError('invalid password', 401));

  await User.findByIdAndUpdate(
    user.id,
    { name: newName },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    user: 'name updated',
  });
});

const updateEmail = catchAsync(async (req, res, next) => {
  const { newEmail, password } = req.body;
  const { user } = req;

  if (!password) return next(new AppError('password is required', 400));

  const isValidPassword = await user.validatePassword(password);

  if (!isValidPassword) return next(new AppError('invalid password', 401));

  await User.findByIdAndUpdate(
    user.id,
    { email: newEmail },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    user: 'email updated',
  });
});

module.exports = { updateName, updateEmail };
