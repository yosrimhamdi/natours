const express = require('express');

const { getReviews, createReview } = require('../controllers/review');
const { requireLogIn, restrictTo } = require('../controllers/authentication');

const router = express.Router({ mergeParams: true });

router.route('/').get(getReviews).post(requireLogIn, restrictTo('user'), createReview);

module.exports = router;
