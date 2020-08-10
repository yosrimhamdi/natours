const Review = require('../models/review');
const { getOne, getAll, deleteOne, createOne, updateOne } = require('./factory');
const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');

const setFilter = (req, res, next) => {
  req.filter = req.params.id ? { tour: req.params.id } : {};

  next();
};

const setTourUserIds = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.tour = req.params.id;

  next();
};

const hasAReviewOnCurrentTour = catchAsync(async (req, res, next) => {
  const { user, tour } = req.body;

  const review = await Review.findOne({ user, tour });

  if (review) {
    return next(
      new AppError(
        'you have already made a review on this tour, try to update or delete it.',
        403
      )
    );
  }

  next();
});

const getReview = getOne(Review);

const getReviews = getAll(Review);

const createReview = createOne(Review);

const updateReview = updateOne(Review);

const deleteReview = deleteOne(Review);

module.exports = {
  getReview,
  getReviews,
  createReview,
  deleteReview,
  setTourUserIds,
  updateReview,
  setFilter,
  hasAReviewOnCurrentTour,
};
