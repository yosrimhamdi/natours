const Review = require('../models/review');
const catchAsync = require('../errors/catchAsync');
const { deleteOne, createOne, updateOne } = require('./factory');

const getReviews = catchAsync(async (req, res, next) => {
  const filter = req.params.id ? { tour: req.params.id } : {};

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});

const setTourUserIds = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.tour = req.params.id;

  next();
};

const createReview = createOne(Review);

const updateReview = updateOne(Review);

const deleteReview = deleteOne(Review);

module.exports = { getReviews, createReview, deleteReview, setTourUserIds, updateReview };
