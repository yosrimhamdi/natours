const express = require('express');

const {
  getReviews,
  createReview,
  deleteReview,
  setTourUserIds,
  updateReview,
} = require('../controllers/review');

const router = express.Router({ mergeParams: true });

router.route('/').get(getReviews).post(setTourUserIds, createReview);

router.route('/:id').delete(deleteReview).patch(updateReview);

module.exports = router;
