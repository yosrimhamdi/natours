const Review = require('../models/review');
const { deleteOne, createOne, updateOne, getAll } = require('./factory');

const setFilter = (req, res, next) => {
  req.filter = req.params.id ? { tour: req.params.id } : {};

  next();
};

const setTourUserIds = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.tour = req.params.id;

  next();
};

const getReviews = getAll(Review);

const createReview = createOne(Review);

const updateReview = updateOne(Review);

const deleteReview = deleteOne(Review);

module.exports = {
  getReviews,
  createReview,
  deleteReview,
  setTourUserIds,
  updateReview,
  setFilter,
};
