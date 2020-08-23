const multer = require('multer');
const sharp = require('sharp');
const slugify = require('slugify');
const mkdirp = require('mkdirp');

const Tour = require('../models/tour');
const Distructure = require('../utils/distructure');
const catchAsync = require('../errors/catchAsync');
const { createOne, updateOne, deleteOne } = require('./factory');
const AppError = require('../errors/appError');

const aliasTop5 = (req, res, next) => {
  req.query = {
    limit: 5,
    sort: 'price,-ratingsAverage',
    page: 1,
  };

  next();
};

const getAllTours = catchAsync(async (req, res) => {
  const { filter, fields, page, limit, sort } = new Distructure(req.query);

  const tours = await Tour.find(filter)
    .select(fields)
    .skip((page - 1) * 10)
    .limit(limit)
    .sort(sort);

  res.status(200).json({
    status: 'success',
    results: tours.length,
    tours,
  });
});

const getTourById = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    tour,
  });
});

const createTour = createOne(Tour);

const updateTour = updateOne(Tour);

const deleteTour = deleteOne(Tour);

const getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        maxPrice: { $max: '$price' },
        minxPrice: { $min: '$price' },
        avgPrice: { $avg: '$price' },
        numTours: { $sum: 1 },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  let err = null;
  const isImage = file.mimetype.startsWith('image');

  if (!isImage) {
    err = new AppError('not image.');
  }

  cb(err, isImage);
};

const upload = multer({ storage, fileFilter });

const uploadTourImages = upload.fields([
  { name: 'images', maxCount: 3 },
  { name: 'imageCover', maxCount: 1 },
]);

const resizeAndSaveTourImageOnFs = catchAsync(async (req, res, next) => {
  const {
    imageCover: [imageCover],
    images,
  } = req.files;

  const path = `public/img/tours/${slugify(req.body.name, { lower: true })}`;

  await mkdirp(path);

  await sharp(imageCover.buffer).toFormat('jpeg').toFile(`${path}/cover.jpeg`);

  images.forEach(async ({ buffer }, i) => {
    await sharp(buffer)
      .toFormat('jpeg')
      .toFile(`${path}/img-${i + 1}.jpeg`);
  });

  next();
});

module.exports = {
  getAllTours,
  getTourById,
  uploadTourImages,
  resizeAndSaveTourImageOnFs,
  createTour,
  updateTour,
  deleteTour,
  aliasTop5,
  getTourStats,
};
