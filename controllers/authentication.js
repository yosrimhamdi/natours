const AppError = require('../errors/appError');
const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');
const { createToken, verifyToken } = require('../utils/jwt');
const sendMail = require('../utils/email');

const signup = catchAsync(async (req, res) => {
  // const { name, email, password, passwordConfirm } = req.body;

  // const user = await User.create({ name, email, password, passwordConfirm });
  const user = await User.create(req.body);

  const token = createToken({ id: user._id });

  res.status(201).json({
    status: 'success',
    token,
    data: { user },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return next(new AppError('please provide email and password.', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('wrong email or password', 401));
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return next(new AppError('wrong email or password', 401));
  }

  const token = createToken({ id: user._id });

  res.status(200).json({ status: 'success', token });
});

const protect = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization;

  if (token.startsWith('Bearer ')) {
    token = token.substring(7);
  } else {
    return next(new AppError('Unauthorized, please login to get access.', 401));
  }

  const { id, iat } = await verifyToken(token);

  const user = await User.findById(id);

  if (!user) {
    return next(
      new AppError('user has been deleted. please sign up to grant access.', 401)
    );
  }

  const isChanged = user.isPassChangedAfterJWTcreation(iat);

  if (isChanged) {
    return next(
      new AppError(
        'password changed after JWT creation, please login to grant access.',
        401
      )
    );
  }

  req.user = user;

  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    const { role: userRole } = req.user;

    const allowed = roles.includes(userRole);

    if (!allowed) {
      return next(new AppError('You have no permission to perfom this action.', 403));
    }

    next();
  };
};

const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('invalid email.', 404));
  }

  const resetToken = user.createResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

  const message = `submit a PATCH request with new password and passwordConfirm to: ${resetURL}`;

  try {
    await sendMail({
      to: user.email,
      subject: 'reset password link (valid for 10min).',
      message,
    });
  } catch (err) {
    user.cancelPasswordReset();

    await user.save({ validateBeforeSave: false });

    return next(new AppError('failed to rest password', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'check your email',
  });
});

const resetPassword = (req, res, next) => {};

module.exports = {
  signup,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
};
