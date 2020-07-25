const crypto = require('crypto');
const AppError = require('../errors/appError');
const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');
const { createToken, verifyToken } = require('../utils/jwt');
const sendMail = require('../utils/email');

const signup = catchAsync(async (req, res) => {
  // 1- create a user
  const user = await User.create(req.body);

  // 2- login user
  const token = createToken({ id: user._id });

  res.status(201).json({
    status: 'success',
    token,
    data: { user },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1- Check if email and password exist
  if (!(email && password)) {
    return next(new AppError('please provide email and password.', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  // 2- Check if user exists && password is correct
  if (!user) {
    return next(new AppError('wrong email or password', 401));
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return next(new AppError('wrong email or password', 401));
  }

  // 3- send token to client
  const token = createToken({ id: user._id });

  res.status(200).json({ status: 'success', token });
});

const protect = catchAsync(async (req, res, next) => {
  // 1- Getting token and check of it's there
  let token = req.headers.authorization;

  if (token.startsWith('Bearer ')) {
    token = token.substring(7);
  } else {
    return next(new AppError('Unauthorized, please login to get access.', 401));
  }

  // 2- token verification
  const { id, iat } = await verifyToken(token);

  const user = await User.findById(id);

  // 3- check if the user still exists
  if (!user) {
    return next(
      new AppError('user has been deleted. please sign up to grant access.', 401)
    );
  }

  const isChanged = user.isPassChangedAfterJWTcreation(iat);

  // 4- Check if user changed password after the token was issued
  if (isChanged) {
    return next(
      new AppError(
        'password changed after JWT creation, please login to grant access.',
        401
      )
    );
  }

  // => GRANT ACCESS TO PROTECTED ROUTE
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
  // 1- get user based on posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('invalid email.', 404));
  }

  // 2- Generate the random reset token
  const resetToken = await user.createResetToken();

  // 3- send it to user email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${resetToken}`;

  const message = `submit a PATCH request with new password and passwordConfirm to: ${resetURL}`;

  try {
    await sendMail({
      to: user.email,
      subject: 'reset password link (valid for 10min).',
      message,
    });
  } catch (err) {
    user.cancelPasswordReset();

    return next(new AppError('failed to rest password', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'check your email to get the reset link.',
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  // 1- get user based on token(crypt it and compare).
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  // 2- if there is a user the and token has not expired set new Password.
  const user = await User.findOne({ passwordResetToken: hashedToken });

  if (!user) return next(new AppError('invalid token.', 401));

  if (user.isExpiredResetToken()) return next(new AppError('expired token.', 401));

  user.resetPassword(password, passwordConfirm);

  // 3- update passwordChangedAt prop. (auto using .pre('save'))

  // 4- log user in (set JWT);
  res.status(200).json({
    status: 'success',
    token: createToken({ id: user._id }),
  });
});

module.exports = {
  signup,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
};
