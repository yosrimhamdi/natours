const express = require('express');

const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  setTourUserIds,
  updateReview,
  setFilter,
} = require('../controllers/review');

const { requireLogIn, restrictTo } = require('../controllers/authentication');

const router = express.Router({ mergeParams: true });

router.use(requireLogIn);

router
  .route('/')
  .get(setFilter, getReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .delete(restrictTo('user', 'admin'), deleteReview)
  .patch(restrictTo('user', 'admin'), updateReview);

module.exports = router;
