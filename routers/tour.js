const express = require('express');
const {
  getAllTours,
  getTourById,
  uploadTourImages,
  resizeAndSaveTourImageOnFs,
  createTour,
  updateTour,
  deleteTour,
  aliasTop5,
  getTourStats,
} = require('../controllers/tour');

const reviewRouter = require('./review');

const { requireLogIn, restrictTo } = require('../controllers/authentication');

const router = express.Router();

router.use('/:id/reviews', reviewRouter);

router
  .route('/')
  .get(getAllTours)
  .post(
    requireLogIn,
    restrictTo('admin'),
    uploadTourImages,
    resizeAndSaveTourImageOnFs,
    createTour
  );

router.route('/top-5-cheap').get(aliasTop5, getAllTours);

router.route('/stats').get(getTourStats);

router
  .route('/:id')
  .get(getTourById)
  .patch(requireLogIn, restrictTo('admin'), updateTour)
  .delete(requireLogIn, restrictTo('admin'), deleteTour);

module.exports = router;
