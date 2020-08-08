const express = require('express');

const { getReviews, createReview, deleteReview } = require('../controllers/review');
const { requireLogIn, restrictTo } = require('../controllers/authentication');

const router = express.Router({ mergeParams: true });

router.route('/').get(getReviews).post(requireLogIn, restrictTo('user'), createReview);

router.route('/:id').delete(deleteReview);

module.exports = router;
