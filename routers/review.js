const express = require('express');

const {
  getReviews,
  createReview,
  deleteReview,
  setTourUserIds,
  updateReview,
} = require('../controllers/review');
const { requireLogIn, restrictTo } = require('../controllers/authentication');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getReviews)
  .post(requireLogIn, restrictTo('user'), setTourUserIds, createReview);

router.route('/:id').delete(deleteReview).patch(updateReview);

module.exports = router;
