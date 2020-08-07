const express = require('express');
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  aliasTop5,
  getTourStats,
} = require('../controllers/tour');

const { createReview } = require('../controllers/review');

const { requireLogIn, restrictTo } = require('../controllers/authentication');

const router = express.Router();

router.route('/').get(requireLogIn, getAllTours).post(createTour);
router.route('/top-5-cheap').get(aliasTop5, getAllTours);
router.route('/stats').get(getTourStats);
router
  .route('/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(requireLogIn, restrictTo('admin'), deleteTour);

router.route('/:id/reviews').post(requireLogIn, restrictTo('user'), createReview);

module.exports = router;
