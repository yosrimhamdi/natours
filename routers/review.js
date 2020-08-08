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

const router = express.Router({ mergeParams: true });

router.route('/').get(setFilter, getReviews).post(setTourUserIds, createReview);

router.route('/:id').get(getReview).delete(deleteReview).patch(updateReview);

module.exports = router;
