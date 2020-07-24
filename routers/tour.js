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
const { protect } = require('../controllers/authentication');

const router = express.Router();

router.route('/').get(protect, getAllTours).post(createTour);
router.route('/top-5-cheap').get(aliasTop5, getAllTours);
router.route('/stats').get(getTourStats);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
