const Tour = require('../models/tour');
const Distructure = require('../utils/distructure');
const catchAsync = require('../errors/catchAsync');
const { createOne, updateOne, deleteOne } = require('./factory');

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

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  aliasTop5,
  getTourStats,
};
