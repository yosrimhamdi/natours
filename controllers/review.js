const Review = require('../models/review');
const { getOne, getAll, deleteOne, createOne, updateOne } = require('./factory');

const setFilter = (req, res, next) => {
  req.filter = req.params.id ? { tour: req.params.id } : {};

  next();
};

const setTourUserIds = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.tour = req.params.id;

  next();
};

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
};
