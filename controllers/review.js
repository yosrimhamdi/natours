const Review = require('../models/review');
const catchAsync = require('../errors/catchAsync');

const getReviews = catchAsync(async (req, res, next) => {
  const filter = req.params.id ? { tour: req.params.id } : {};

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
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
