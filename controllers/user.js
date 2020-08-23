const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');
const { deleteOne, getAll, getOne } = require('./factory');

const getUsers = getAll(User);

const getUser = getOne(User);

const deleteUser = deleteOne(User);

const updateSettings = catchAsync(async (req, res, next) => {
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

const setParamsId = (req, res, next) => {
  req.params.id = req.user._id;

  next();
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  let err = null;
  const isImage = file.mimetype.startsWith('image');

  if (!isImage) {
    err = new AppError('Not an image. Please provide an image.', 400);
  }

  cb(err, isImage);
};

const upload = multer({ storage, fileFilter });

const uploadUserPhoto = upload.single('photo');

const removePreviousImageOnFs = (req, res, next) => {
  if (req.user.photo !== 'default.jpg') {
    const path = `public/img/users/${req.user.photo}`;

    fs.unlink(path, err => {
      if (err) {
        return next(new AppError('unexpected error.', 500));
      }
    });
  }

  next();
};

const resizeAndSaveToDisk = catchAsync(async (req, res, next) => {
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const savePhotoOnUserRecord = catchAsync(async (req, res, next) => {
  await req.user.updatePhoto(req.file.filename);

  res.status(200).json({ status: 'success', photo: req.user.photo });
});

module.exports = {
  getUser,
  getUsers,
  updateSettings,
  deleteUser,
  setParamsId,
  uploadUserPhoto,
  removePreviousImageOnFs,
  resizeAndSaveToDisk,
  savePhotoOnUserRecord,
};
