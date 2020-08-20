const multer = require('multer');

const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');
const { deleteOne, getAll, getOne } = require('./factory');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];

    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const error = file.mimetype.startsWith('image')
    ? null
    : new AppError('not an image, please provide an image.', 400);

  cb(error, file.mimetype.startsWith('image'));
};

const upload = multer({ storage, fileFilter });

const updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  const { email, name } = req.body;
  const { user } = req;

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    { email, name },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    user: updatedUser,
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

const setParamsId = (req, res, next) => {
  req.params.id = req.user._id;

  next();
};

const uploadUserPhoto = upload.single('photo');

const getUsers = getAll(User);

const getUser = getOne(User);

const deleteUser = deleteOne(User);

module.exports = {
  getUser,
  getUsers,
  updateMe,
  deleteMe,
  deleteUser,
  setParamsId,
  uploadUserPhoto,
};
