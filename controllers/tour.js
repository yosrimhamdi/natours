const Tour = require('../models/tour');
const Distructure = require('../utils/distructure');
const catchAsync = require('../errors/catchAsync');
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
  console.log(req.query);
  const { filter, fields, page, limit, sort } = new Distructure(req.query);

  const query = Tour.find(filter)
    .select(fields)
    .skip((page - 1) * 10)
    .limit(limit)
    .sort(sort);

  const tours = await query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const getTourById = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError(`tour not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

const createTour = catchAsync(async (req, res) => {
  const tour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { tour },
  });
});

const updateTour = catchAsync(async (req, res, next) => {
  const updatedTour = await Tour.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTour) {
    return next(new AppError(`tour not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: { tour: updatedTour },
  });
});

const deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError(`tour not found with id ${req.params.id}`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

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

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  aliasTop5,
  getTourStats,
};
