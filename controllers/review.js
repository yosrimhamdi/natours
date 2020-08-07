const Review = require('../models/review');
const catchAsync = require('../errors/catchAsync');

const getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    data: { reviews },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  req.body.tour = req.params.id;
  const review = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { review },
  });
});

module.exports = { getReviews, createReview };
