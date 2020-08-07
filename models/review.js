const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'rating is a must'],
    min: [1, 'must be >= 1'],
    max: [5, 'must be <= 5'],
  },
  message: {
    type: String,
    required: [true, 'need a message'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Tour must belong to a tour'],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate('user');

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
