const crypto = require('crypto');
const AppError = require('../errors/appError');
const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');
const { createToken, verifyToken } = require('../utils/jwt');
const sendMail = require('../utils/email');

const logInUser = (res, statusCode, userId) => {
  const { JWT_COOKIE_EXPIRES_IN, NODE_ENV } = process.env;

  const token = createToken({ id: userId });

  res.cookie('jwt', token, {
    expries: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    secure: NODE_ENV === 'production',
    httpOnly: true,
  });

  res.status(statusCode).json({
    status: 'success',
    message: 'logged in.',
  });
};

const signup = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  logInUser(res, 201, user._id);
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

  logInUser(res, 200, user._id);
});

const requireLogIn = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AppError('Unauthorized, please login to get access.', 401));
  }

  const { id, iat } = await verifyToken(token);

  const user = await User.findById(id).select('+password');

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

const isLoggedIn = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    const { id, iat } = await verifyToken(token);

    const user = await User.findById(id).select('+password');

    if (user) {
      const isChanged = user.isPassChangedAfterJWTcreation(iat);

      if (!isChanged) {
        res.locals.user = user;
      }
    }
  }

  next();
});

const requirePassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const { user } = req;

  if (!password) return next(new AppError('password is required', 400));

  const isValidPassword = await user.validatePassword(password);

  if (!isValidPassword) return next(new AppError('wrong password', 401));

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

  const resetToken = await user.createResetToken();

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
    await user.cancelPasswordReset();

    return next(new AppError('failed to rest password', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'check your email to get the reset link.',
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({ passwordResetToken: hashedToken });

  if (!user) return next(new AppError('invalid token.', 401));

  if (user.isExpiredResetToken()) return next(new AppError('expired token.', 401));

  await user.resetPassword(password, passwordConfirm);

  logInUser(res, 200, user._id);
});

const updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { newPassword, passwordConfirm } = req.body;

  await user.updatePassword(newPassword, passwordConfirm);

  logInUser(res, 200, user._id);
});

module.exports = {
  signup,
  login,
  requirePassword,
  requireLogIn,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  isLoggedIn,
};
