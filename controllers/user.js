const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');

const updateName = catchAsync(async (req, res, next) => {
  const { newName } = req.body;
  const { user } = req;

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
  const { newEmail } = req.body;
  const { user } = req;

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

const deleteMe = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const { user } = req;

  if (!password) return next(new AppError('password is required', 400));

  const isValidPassword = await user.validatePassword(password);

  if (!isValidPassword) return next(new AppError('wrong password', 401));

  await User.findByIdAndDelete(user.id);

  res.status(204).json({
    status: 'success',
    message: 'deleted',
  });
});

module.exports = { updateName, updateEmail, deleteMe };
